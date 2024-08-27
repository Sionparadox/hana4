function f() {
  console.log("f>> ", this.name);
}
f();
f.bind({ name: "bind" })();
f.call({ name: "call" });
f.apply({ name: "apply" });

const f2 = f;
console.log(f === f2);
const f3 = f.bind({ name: "bind" });
f3();
console.log(f.bind({ name: "bind" }) === f3);

globalThis.id = 100;

const obj = {
  id: 1,
  f1: function () {
    console.log("f1>> ", this.id);
  },
  f2: () => console.log("f2>> ", this.id), //화살표 함수를 갖고있는 곳의 scope의 this : module
};

obj.f1(); //f1.bind(obj)();
obj.f2(); //f2();
const of1 = obj.f1;
console.log(of1 === obj.f1);
const of2 = obj.f2;
console.log(of2 === obj.f2);

of1(); //function object로 호출됨 -> this가 없음
of2();
