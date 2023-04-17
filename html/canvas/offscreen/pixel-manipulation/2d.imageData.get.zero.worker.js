// DO NOT EDIT! This test has been generated by /html/canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.imageData.get.zero
// Description:getImageData() throws INDEX_SIZE_ERR if size is zero
// Note:

importScripts("/resources/testharness.js");
importScripts("/html/canvas/resources/canvas-tests.js");

var t = async_test("getImageData() throws INDEX_SIZE_ERR if size is zero");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var canvas = new OffscreenCanvas(100, 50);
var ctx = canvas.getContext('2d');

assert_throws_dom("INDEX_SIZE_ERR", function() { ctx.getImageData(1, 1, 10, 0); });
assert_throws_dom("INDEX_SIZE_ERR", function() { ctx.getImageData(1, 1, 0, 10); });
assert_throws_dom("INDEX_SIZE_ERR", function() { ctx.getImageData(1, 1, 0, 0); });
assert_throws_dom("INDEX_SIZE_ERR", function() { ctx.getImageData(1, 1, 0.1, 10); });
assert_throws_dom("INDEX_SIZE_ERR", function() { ctx.getImageData(1, 1, 10, 0.99); });
assert_throws_dom("INDEX_SIZE_ERR", function() { ctx.getImageData(1, 1, -0.1, 10); });
assert_throws_dom("INDEX_SIZE_ERR", function() { ctx.getImageData(1, 1, 10, -0.99); });
t.done();

});
done();
