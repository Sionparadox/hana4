const arr1 = [100, 200, 300, 400, 500, 600, 700];
for (let key in arr1) {
  console.log(key, arr1[key]);
}

console.log("-------------------------");

const obj = { name: "Kim", addr: "Yongsan", level: 1, role: 9, receive: false };
for (let key in obj) {
  console.log(key, obj[key]);
}
console.log("");
for (let v of Object.values(obj)) {
  console.log(v);
}
Object.defineProperty(obj, "level", { enumerable: false });
Object.defineProperty(obj, "role", { writable: false });
console.log("-------------------------");

function makeObjectFromArray(arr) {
  let ret = {};
  // for (let i of arr) {
  //   [, ...ret[i[0]]] = i;
  // }
  for (let [k, ...v] of arr) {
    ret[k] = v;
  }

  return ret;
}

function makeArrayFromObject(obj) {
  let ans = [];
  for (let k in obj) {
    ans.push([k, ...obj[k]]);
  }
  return ans;
}
const before = [
  ["A", 10, 20],
  ["B", 30, 40],
  ["C", 50, 60, 70],
];
const after = makeObjectFromArray(before);
console.log("makeObjectFromArray: ", after);
console.log("makeArrayFromObject: ", makeArrayFromObject(after));

console.log("-------------------------");
function shallowCopyObject(obj) {
  const ret = {};
  for (let k in obj) {
    ret[k] = obj[k];
  }
  return ret;
}

// function copyObject(obj) {
//   const ret = {};
//   for (let k in obj) {
//     if (obj && typeof obj[k] === "object") {
//       let newObj = copyObject(obj[k]);
//       ret[k] = newObj;
//     } else ret[k] = obj[k];
//   }
//   return ret;
// }

function isObject(obj) {
  return obj && typeof obj === "object";
}

function copyObject(obj) {
  if (!isObject(obj)) return obj;
  const ret = {};
  for (let k of Reflect.ownKeys(obj)) {
    ret[k] = copyObject(obj[k]);
  }
  return ret;
}

const kim = { nid: 3, nm: "Kim", addr: { city: "Pusan" } };
const newKim = copyObject(kim);
newKim.addr.city = "Daegu";
console.log(kim.addr.city !== newKim.addr.city);

// const park = {
//   nid: 5,
//   nm: "park",
//   addr: { country: { birth: "Korea", live: "Japan" }, city: "Pusan" },
// };
// const newPark = copyObject(park);
// newPark.addr.country.live = "America";
// console.log(park.addr.country.live !== newPark.addr.country.live);
