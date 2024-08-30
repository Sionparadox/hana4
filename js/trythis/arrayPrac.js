const assert = require('assert');
const arr = [1, 2, 3, 4];

function push(arr, ...args) {
  return [...arr, ...args];
}

function pop(arr, k = 1) {
  return k == 1 ? arr.at(-1) : arr.slice(-1 * k);
}

function unshift(arr, ...args) {
  return [...args, ...arr];
}

function shift(arr, k = 1) {
  return arr.slice(k);
}
assert.deepStrictEqual(push(arr, 5, 6), [1, 2, 3, 4, 5, 6]);
assert.deepStrictEqual(pop(arr), 4);
assert.deepStrictEqual(pop(arr, 2), [3, 4]); // 2개 팝(꺼내 줘)!
assert.deepStrictEqual(unshift(arr, 0), [0, 1, 2, 3, 4]);
assert.deepStrictEqual(unshift(arr, 7, 8), [7, 8, 1, 2, 3, 4]);
assert.deepStrictEqual(shift(arr), [2, 3, 4]);
assert.deepStrictEqual(shift(arr, 2), [3, 4]);
assert.deepStrictEqual(arr, [1, 2, 3, 4]);
console.log('Ex1 Correct!');
console.log('------------------------------------------------');

const Hong = { id: 1, name: 'Hong' };
const Kim = { id: 2, name: 'Kim' };
const Lee = { id: 3, name: 'Lee' };
const users = [Hong, Kim, Lee];

function deleteArray(arr, ...args) {
  if (args.length === 1) {
    return arr.slice(0, args[0]);
  } else if (!isNaN(args[0])) {
    return [...arr.slice(0, args[0]), ...arr.slice(args[1])];
  } else {
    const idx = arr.findIndex((a) => a[args[0]] === args[1]);
    return [...arr.slice(0, idx), ...arr.slice(idx + 1)];
  }
}

assert.deepStrictEqual(deleteArray(arr, 2), [1, 2]);
assert.deepStrictEqual(deleteArray(arr, 1, 3), [1, 4]);
assert.deepStrictEqual(arr, [1, 2, 3, 4]);

assert.deepStrictEqual(deleteArray(users, 2), [Hong, Kim]);
assert.deepStrictEqual(deleteArray(users, 1, 2), [Hong, Lee]);
assert.deepStrictEqual(deleteArray(users, 'id', 2), [Hong, Lee]);
assert.deepStrictEqual(deleteArray(users, 'name', 'Lee'), [Hong, Kim]);
console.log('Ex2 Correct!');

console.log('------------------------------------------------');

const hong = { id: 1, name: 'Hong' };
const choi = { id: 5, name: 'Choi' };
const kim = { id: 2, name: 'kim' };
const lee = { id: 3, name: 'Lee' };
const park = { id: 4, name: 'Park' };
const users2 = [kim, lee, park];

function pureAddUser(arr, obj) {
  return [...arr, obj];
}

function pureChangeUser(arr, obj1, obj2) {
  const idx = arr.indexOf(obj1);
  return [...arr.slice(0, idx), obj2, ...arr.slice(idx + 1)];
}

function pureRemoveUser(arr, obj) {
  const idx = arr.indexOf(obj);
  return [...arr.slice(0, idx), ...arr.slice(idx + 1)];
}

assert.deepStrictEqual(deleteArray(users, 2), [Hong, Kim]);
assert.deepStrictEqual(deleteArray(users, 1, 2), [Hong, Lee]);
assert.deepStrictEqual(deleteArray(users, 'id', 2), [Hong, Lee]);
assert.deepStrictEqual(deleteArray(users, 'name', 'Lee'), [Hong, Kim]);
console.log('Ex3 Correct!');

console.log('------------------------------------------------');

const arr4 = [1, 2, 3, true];
const ret1 = arr4.map((a) => `${a}`);
console.log(ret1);

const classNames = (...args) =>
  args.filter((a) => a).reduce((acc, a) => `${acc}${a ? ' ' : ''}${a}`);
const ret2 = classNames('', 'a b', 'c', 'd', '', 'e'); // cf. cls
assert.strictEqual(ret2, 'a b c d e');
console.log('Ex4 Correct!');

console.log('------------------------------------------------');

const reduce = (arr, fn, initValue = arr.shift()) => {
  let ret = initValue;
  for (const i of arr) {
    ret = fn(ret, i);
  }

  return ret;
};
console.log(reduce([1, 2, 3, 4, 5], (a, b) => a + b, 0)); // 15면 통과!
console.log(reduce([1, 2, 3], (a, b) => a + b, 0)); // 6이면 통과!
console.log(reduce([1, 2, 3, 4, 5], (a, b) => a * b, 1)); // 120이면 통과!
console.log(reduce([2, 2, 2], (a, b) => a * b)); // 8이면 통과!
console.log(reduce([3, 3, 3], (a, b) => a * b, 0));
console.log('Ex5 Correct!');

console.log('------------------------------------------------');

const square = (a) => a ** 2;
const sqrt = (a) => Math.sqrt(a);
const cube = (a) => a ** 3;

const arr6 = [1, 2, 3, 4, 5];
const baseJobs = [square, sqrt, cube];
console.log(arr6.map((a) => baseJobs.reduce((acc, job) => job(acc), a)));

const aJobs = [square, sqrt, cube];
const bJobs = [cube, square];

const robot = (arr, jobs) =>
  arr.map((a) => jobs.reduce((acc, job) => job(acc), a));
assert.deepStrictEqual(robot(arr6, aJobs), [1, 8, 27, 64, 125]);
assert.deepStrictEqual(robot(arr6, bJobs), [1, 64, 729, 4096, 15625]);
console.log('Ex6 Correct!');

console.log('------------------------------------------------');

const range = (s, e, step = s > e ? -1 : 1) => {
  if (e == undefined && s === 0) return [0];
  if (e == undefined && s !== 0) s > 0 ? ((e = s), (s = 1)) : (e = -1);
  if (step === 0 || s === e) return [s];
  if ((s - e) * step > 0) return [];
  let minus = false;
  if (s > e) {
    minus = true;
    s *= -1;
    e *= -1;
    step *= -1;
  }
  const ret = [];

  for (let i = s; i <= e; i += step) {
    ret.push(i);
  }
  return minus ? ret.map((a) => (a *= -1)) : ret;
};

function TestEx7() {
  assert.deepStrictEqual(range(1, 10, 1), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assert.deepStrictEqual(range(1, 10, 2), [1, 3, 5, 7, 9]);
  assert.deepStrictEqual(range(1, 10), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assert.deepStrictEqual(range(10, 1), [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);

  assert.deepStrictEqual(range(5, 5, 0), [5]);
  assert.deepStrictEqual(range(1, 5, 0), [1]);
  assert.deepStrictEqual(range(5, 5, -1), [5]);
  assert.deepStrictEqual(range(5, 5), [5]);
  assert.deepStrictEqual(range(0, 0, 5), [0]);
  assert.deepStrictEqual(range(1, 5, -1), []);

  assert.deepStrictEqual(range(1, 5, 6), [1]);
  assert.deepStrictEqual(range(0, 5), [0, 1, 2, 3, 4, 5]);
  assert.deepStrictEqual(range(-3, 0), [-3, -2, -1, 0]);

  assert.deepStrictEqual(range(5, 1, 1), []);
  assert.deepStrictEqual(range(0, -1), [0, -1]);
  assert.deepStrictEqual(range(0, -3), [0, -1, -2, -3]);
  assert.deepStrictEqual(range(5, 1), [5, 4, 3, 2, 1]);
  assert.deepStrictEqual(range(10, 1, -2), [10, 8, 6, 4, 2]);

  assert.deepStrictEqual(range(5), [1, 2, 3, 4, 5]);
  assert.deepStrictEqual(range(0), [0]);
  assert.deepStrictEqual(range(0, 0), [0]);
  assert.deepStrictEqual(range(2, 1, -5), [2]);
  assert.deepStrictEqual(range(0, -1, -5), [0]);
  assert.deepStrictEqual(range(-5), [-5, -4, -3, -2, -1]);
  assert.deepStrictEqual(
    range(50),
    Array.from({ length: 50 }, (_, i) => i + 1)
  );
  assert.deepStrictEqual(
    range(1, 150, 3),
    Array.from({ length: 50 }, (_, i) => i * 3 + 1)
  );
}

TestEx7();
console.log('Ex7 Correct!');
console.log('------------------------------------------------');

// const pair = [];

// function solve(arr, N, ans = []) {
//   if (ans.length === 2 && N === 0) {
//     pair.push(ans);
//     return;
//   }
//   if (N < 0 || ans.length === 2) return;

//   for (let i = 0; i < arr.length; i += 1) {
//     solve(arr.slice(i + 1), N - arr[i], [
//       ...ans,
//       i + (ans[0] != undefined ? ans[0] + 1 : 0),
//     ]);
//   }
// }

// function keyPair(arr, N) { //O(n)
//   const vkarr = {};
//   arr.forEach((a, i) => (vkarr[a] = i));
//   for (let i = 0; i < arr.length; i += 1) {
//     if (vkarr[N - arr[i]] != undefined) return [i, vkarr[N - arr[i]]];
//   }
// }

const keyPair = (arr, n) => {
  const cache = {};
  for (let i = 0; i < arr.length; i += 1) {
    const val = arr[i];
    if (val in cache) return [cache[val], i];
    cache[n - val] = i;
  }
};
//in 연산자는 key값에 다이렉트로 접근하기 때문에 HashMap에 접근하여 O(1), includes나 indexOf는 value로 접근하기 때문에 O(n)

console.log(keyPair([1, 3, 4, 5], 7));
// assert.deepStrictEqual(keyPair([1, 3, 4, 5], 7), [1, 2]);
// assert.deepStrictEqual(keyPair([1, 4, 45, 6, 10, 8], 16), [3, 4]);
// assert.deepStrictEqual(keyPair([1, 2, 4, 3, 6], 10), [2, 4]);
// assert.deepStrictEqual(keyPair([1, 2, 3, 4, 5, 7], 9), [1, 5]);
