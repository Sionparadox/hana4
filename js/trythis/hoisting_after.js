"use strict";
var gg;
let bb;
function f1(x, y) {
  var gg;
  let bb;
  var zz;
  // function f2(t, u) {
  //   console.log(t, "`inner`", xx, zz);
  // }
  function f2(t, u, v) {
    console.log(t, "`inner2`", xx, zz);
  }
  //----------------
  x = 1;
  y = 2;
  gg = 11;
  bb = 22;
  console.log("f1>", gg, bb, zz, f2, f2.length);
  f2("* first"); //
  {
    const xx = 99;
    function f2(t) {
      console.log(t, "`nested`", xx, zz);
    }
    f2("* nest-first");
    zz = 88;
  }
  zz = 800;
  console.log("🚀  gg:", gg);
  f2("* second");
}
function f2(g) {
  console.log(g, "global f2>", gg, bb, xx, kk);
}
let xx;
var kk;

//---------------------------------
gg = 1;
bb = 2;
xx = 9;
if (gg > 0) {
  const yy = 9;
  kk = 33;
}
f1(1, 2);
console.log("kkkkk>>", kk);
f2("* third");
