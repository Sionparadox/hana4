globalThis.name = "GlobalName";
this.name = "MuduleName";
// const obj = {
//   name: "ObjName",
//   bark1: function () {
//     console.log("1=", this.name);
//     const self = this; // OLD version
//     setTimeout(function () {
//       console.log("11=", self.name);
//       console.log("12=", this); // Timeout
//     }, 1000); // .bind(this)
//     console.log("xxxx");
//   },
//   bark2() {
//     // same as bark2: function() {
//     console.log("2=", this.name);
//     setTimeout(() => {
//       console.log("22=", this.name);
//     }, 1000);
//   },
//   bark3() {
//     // ⇐⇒ bark3: function() {
//     function innerFn() {
//       console.log("3 : ", this); // ?
//     }
//     innerFn();
//   },
//   bark4: () => {
//     console.log("4: ", this.name); // ?
//   }, // bark4의 소유자(obj)의 Lexical Scope의 this
// };

// obj.bark1(); // vs  var x = obj.bark1;
// obj.bark2();
// obj.bark3();
// obj.bark4();

// const expressFn = function(name) {
//   // if, 'use strict' ?
//   this.name = name;
//   console.log(this, new.target, this.name, name);
// }

// const arrowFn = (name) => {
//   this.name = name;
//   console.log(this, new.target, this.name, name);
// }

// expressFn('expfn');
// arrowFn('afn');

// const dfn = new expressFn("D");
// //const afn = new arrowFn('A'); // error!

globalThis.name = "Global Name";

const obj = {
  name: "Obj Name",
  printName() {
    console.log(this.name);
  },
};

const printName = obj.printName;
obj.printName(); // printName.bind(obj)();
printName();
