// DO NOT EDIT! This test has been generated by /html/canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.shadow.offset.positiveX
// Description:Shadows can be offset with positive x
// Note:

importScripts("/resources/testharness.js");
importScripts("/html/canvas/resources/canvas-tests.js");

var t = async_test("Shadows can be offset with positive x");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var canvas = new OffscreenCanvas(100, 50);
var ctx = canvas.getContext('2d');

ctx.fillStyle = '#f00';
ctx.fillRect(0, 0, 100, 50);
ctx.fillStyle = '#0f0';
ctx.shadowColor = '#0f0';
ctx.shadowOffsetX = 50;
ctx.fillRect(0, 0, 50, 50);
_assertPixel(canvas, 25,25, 0,255,0,255);
_assertPixel(canvas, 75,25, 0,255,0,255);
t.done();

});
done();
