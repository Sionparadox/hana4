var gg = 1;
let bb = 2;
function f1(x, y) {
  var gg = 11;
  let bb = 22;
  console.log("f1>", gg, bb, zz, f2, f2.length); // 3 f2inner2
  function f2(t, u) {
    console.log(t, "inner", xx, zz);
  }
  f2("first");
  {
    const xx = 99;
    let lll = 0;
    f2("nest-first");
    var zz = 88;
    function f2(t) {
      console.log(t, "nested", xx, zz, lll);
    }
  }

  function f2(t, u, v) {
    console.log(t, "inner2", xx, zz);
  }
  var zz = 800;
  f2("second");
}
let kk;
function f2(g) {
  console.log(g, "global f2>", gg, bb, xx, kk); // ?
}
let xx = 9;
if (gg > 0) {
  kk = 33;
  const yy = 9;
}
f1(1, 2);
console.log(kk);
f2("third"); // global f2 실행
