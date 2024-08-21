console.log("Hello World!");

const first = "a",
  last = "Bob";
console.log(`${first}${first && " "}${last}`);

let a = 0b1010;
let b = 0b1100;
const and = a & b;
console.log("🚀 ~ and:", and.toString(2));
const or = a | b;
console.log("🚀 ~ or:", or.toString(2));
const xor = a ^ b;
console.log("🚀 ~ xor:", xor.toString(2));
console.log(a >> 1, a >>> 1, a << 1);

console.log("===============================");
const R = 1,
  W = 2,
  E = 4; // 0b001, 0b010, 0b100
let auth = parseInt("011", 2);
console.log("🚀 ~ auth:", auth);
const hasWriteAuth = !!(auth & W);
console.log("🚀 ~ hasWriteAuth:", hasWriteAuth);
const hasExeAuth = !!(auth & E);
console.log("🚀 ~ hasExeAuth:", hasExeAuth);
const hasReadAndExeAuth = !!(auth & (R | E));
console.log("🚀 ~ hasReadAndExeAuth:", hasReadAndExeAuth);
auth = auth ^ E; // XOR
console.log("🚀 ~ auth:", auth);
