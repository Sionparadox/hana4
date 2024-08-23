//"use strict";

var v = 10;
function f(a) {
  var v;
  function ff() {
    const b = 1;
    v = 5;
    return v;
  }

  console.log(a, v, ff(), v);
}
console.log("orgin v : ", v);
f(100);
console.log("--", v);
