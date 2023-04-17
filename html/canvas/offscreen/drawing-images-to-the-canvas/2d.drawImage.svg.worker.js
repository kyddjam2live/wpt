// META: timeout=long
// DO NOT EDIT! This test has been generated by /html/canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.drawImage.svg
// Description:drawImage() of an SVG image
// Note:

importScripts("/resources/testharness.js");
importScripts("/html/canvas/resources/canvas-tests.js");

var t = async_test("drawImage() of an SVG image");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var canvas = new OffscreenCanvas(100, 50);
var ctx = canvas.getContext('2d');

fetch('/images/green.svg')
  .then(response => response.blob())
    .then(blob => {
      createImageBitmap(blob)
        .then(bitmap => {
        ctx.drawImage(bitmap, 0, 0);
        _assertPixelApprox(canvas, 50,25, 0,255,0,255, 2);
    });
});
t.done();

});
done();
