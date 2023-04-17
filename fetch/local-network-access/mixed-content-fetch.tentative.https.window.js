// META: script=/common/utils.js
// META: script=resources/support.sub.js
//
// Spec: https://wicg.github.io/local-network-access
//
// These tests verify that secure contexts can fetch non-secure subresources
// from more local address spaces, avoiding mixed context checks, as long as
// they specify a valid `targetAddressSpace` fetch option that matches the
// target server's address space.

setup(() => {
  // Making sure we are in a secure context, as expected.
  assert_true(window.isSecureContext);
});

// Given `addressSpace`, returns the other three possible IP address spaces.
function otherAddressSpaces(addressSpace) {
  switch (addressSpace) {
    case "loopback": return ["unknown", "local", "public"];
    case "local": return ["unknown", "loopback", "public"];
    case "public": return ["unknown", "loopback", "local"];
  }
}

// Generates tests of `targetAddressSpace` for the given (source, target)
// address space pair, expecting fetches to succeed iff `targetAddressSpace` is
// correct.
//
// Scenarios exercised:
//
//  - cors mode:
//    - missing targetAddressSpace option
//    - incorrect targetAddressSpace option (x3, see `otherAddressSpaces()`)
//    - failed preflight
//    - success
//    - success with PUT method (non-"simple" request)
//  - no-cors mode:
//    - success
//
function makeTests({ source, target }) {
  const sourceServer = Server.get("https", source);
  const targetServer = Server.get("http", target);

  const makeTest = ({
    fetchOptions,
    targetBehavior,
    name,
    expected
  }) => {
    promise_test_parallel(t => fetchTest(t, {
      source: { server: sourceServer },
      target: {
        server: targetServer,
        behavior: targetBehavior,
      },
      fetchOptions,
      expected,
    }), `${sourceServer.name} to ${targetServer.name}: ${name}.`);
  };

  makeTest({
    name: "missing targetAddressSpace",
    targetBehavior: {
      preflight: PreflightBehavior.success(token()),
      response: ResponseBehavior.allowCrossOrigin(),
    },
    expected: FetchTestResult.FAILURE,
  });

  const correctAddressSpace = targetServer.addressSpace;

  for (const targetAddressSpace of otherAddressSpaces(correctAddressSpace)) {
    makeTest({
      name: `wrong targetAddressSpace "${targetAddressSpace}"`,
      targetBehavior: {
        preflight: PreflightBehavior.success(token()),
        response: ResponseBehavior.allowCrossOrigin(),
      },
      fetchOptions: { targetAddressSpace },
      expected: FetchTestResult.FAILURE,
    });
  }

  makeTest({
    name: "failed preflight",
    targetBehavior: {
      preflight: PreflightBehavior.failure(),
      response: ResponseBehavior.allowCrossOrigin(),
    },
    fetchOptions: { targetAddressSpace: correctAddressSpace },
    expected: FetchTestResult.FAILURE,
  });

  makeTest({
    name: "success",
    targetBehavior: {
      preflight: PreflightBehavior.success(token()),
      response: ResponseBehavior.allowCrossOrigin(),
    },
    fetchOptions: { targetAddressSpace: correctAddressSpace },
    expected: FetchTestResult.SUCCESS,
  });

  makeTest({
    name: "PUT success",
    targetBehavior: {
      preflight: PreflightBehavior.success(token()),
      response: ResponseBehavior.allowCrossOrigin(),
    },
    fetchOptions: {
      targetAddressSpace: correctAddressSpace,
      method: "PUT",
    },
    expected: FetchTestResult.SUCCESS,
  });

  makeTest({
    name: "no-cors success",
    targetBehavior: {
      preflight: PreflightBehavior.success(token()),
      response: ResponseBehavior.allowCrossOrigin(),
    },
    fetchOptions: {
      targetAddressSpace: correctAddressSpace,
      mode: "no-cors",
    },
    expected: FetchTestResult.OPAQUE,
  });
}

// Generates tests for the given (source, target) address space pair expecting
// that `targetAddressSpace` cannot be used to bypass mixed content.
//
// Scenarios exercised:
//
// - wrong `targetAddressSpace` (x3, see `otherAddressSpaces()`)
// - correct `targetAddressSpace`
//
function makeNoBypassTests({ source, target }) {
  const sourceServer = Server.get("https", source);
  const targetServer = Server.get("http", target);

  const prefix = `${sourceServer.name} to ${targetServer.name}: `;

  const correctAddressSpace = targetServer.addressSpace;
  for (const targetAddressSpace of otherAddressSpaces(correctAddressSpace)) {
    promise_test_parallel(t => fetchTest(t, {
      source: { server: sourceServer },
      target: {
        server: targetServer,
        behavior: {
          preflight: PreflightBehavior.success(token()),
          response: ResponseBehavior.allowCrossOrigin(),
        },
      },
      fetchOptions: { targetAddressSpace },
      expected: FetchTestResult.FAILURE,
    }), prefix + `wrong targetAddressSpace "${targetAddressSpace}".`);
  }

  promise_test_parallel(t => fetchTest(t, {
    source: { server: sourceServer },
    target: {
      server: targetServer,
      behavior: {
        preflight: PreflightBehavior.success(token()),
        response: ResponseBehavior.allowCrossOrigin(),
      },
    },
    fetchOptions: { targetAddressSpace: correctAddressSpace },
    expected: FetchTestResult.FAILURE,
  }), prefix + 'not a local network request.');
}

// Source: loopback secure context.
//
// Fetches to the loopback and local address spaces cannot use
// `targetAddressSpace` to bypass mixed content, as they are not otherwise
// blocked by Local Network Access.

makeNoBypassTests({ source: "loopback", target: "loopback" });
makeNoBypassTests({ source: "loopback", target: "local" });
makeNoBypassTests({ source: "loopback", target: "public" });

// Source: local secure context.
//
// Fetches to the loopback address space requires the right `targetAddressSpace`
// option, as well as a successful preflight response carrying a PNA-specific
// header.
//
// Fetches to the local address space cannot use `targetAddressSpace` to
// bypass mixed content, as they are not otherwise blocked by Local Network
// Access.

makeTests({ source: "local", target: "loopback" });

makeNoBypassTests({ source: "local", target: "local" });
makeNoBypassTests({ source: "local", target: "public" });

// Source: public secure context.
//
// Fetches to the loopback and local address spaces require the right
// `targetAddressSpace` option, as well as a successful preflight response
// carrying a PNA-specific header.

makeTests({ source: "public", target: "loopback" });
makeTests({ source: "public", target: "local" });

makeNoBypassTests({ source: "public", target: "public" });

// These tests verify that documents fetched from the `loopback` address space
// yet carrying the `treat-as-public-address` CSP directive are treated as if
// they had been fetched from the `public` address space.

promise_test_parallel(
    t => fetchTest(t, {
      source: {
        server: Server.HTTPS_LOCAL,
        treatAsPublic: true,
      },
      target: {
        server: Server.HTTP_LOCAL,
        behavior: {
          preflight: PreflightBehavior.optionalSuccess(token()),
          response: ResponseBehavior.allowCrossOrigin(),
        },
      },
      fetchOptions: {targetAddressSpace: 'local'},
      expected: FetchTestResult.FAILURE,
    }),
    'https-treat-as-public to http-loopback: wrong targetAddressSpace "local".');

promise_test_parallel(t => fetchTest(t, {
  source: {
    server: Server.HTTPS_LOCAL,
    treatAsPublic: true,
  },
  target: {
    server: Server.HTTP_LOCAL,
    behavior: {
      preflight: PreflightBehavior.optionalSuccess(token()),
      response: ResponseBehavior.allowCrossOrigin(),
    },
  },
  fetchOptions: { targetAddressSpace: "loopback" },
  expected: FetchTestResult.SUCCESS,
}), "https-treat-as-public to http-loopback: success.");

promise_test_parallel(t => fetchTest(t, {
  source: {
    server: Server.HTTPS_LOCAL,
    treatAsPublic: true,
  },
  target: {
    server: Server.HTTP_PRIVATE,
    behavior: {
      preflight: PreflightBehavior.success(token()),
      response: ResponseBehavior.allowCrossOrigin(),
    },
  },
  fetchOptions: { targetAddressSpace: "loopback" },
  expected: FetchTestResult.FAILURE,
}), 'https-treat-as-public to http-local: wrong targetAddressSpace "loopback".');

promise_test_parallel(t => fetchTest(t, {
  source: {
    server: Server.HTTPS_LOCAL,
    treatAsPublic: true,
  },
  target: {
    server: Server.HTTP_PRIVATE,
    behavior: {
      preflight: PreflightBehavior.success(token()),
      response: ResponseBehavior.allowCrossOrigin(),
    },
  },
  fetchOptions: { targetAddressSpace: "local" },
  expected: FetchTestResult.SUCCESS,
}), "https-treat-as-public to http-local: success.");
