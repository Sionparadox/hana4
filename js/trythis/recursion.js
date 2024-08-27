function addTo100(n) {
  return n === 100 ? 100 : n + addTo100(n + 1);
}

console.log(addTo100(1));

function addTo100TCO(a, sum = 0) {
  if (a === 100) return sum + 100;

  return addTo100TCO(a + 1, sum + a);
}

console.log("addTo100TCO : ", addTo100TCO(1, 0));

console.log("------------------------------");

function makeArray(n) {
  return n === 1 ? [1] : [...makeArray(n - 1), n];
}
function makeReverseArray(n) {
  return n === 1 ? [1] : [n, ...makeReverseArray(n - 1)];
}

console.log("정방향");
console.log(makeArray(13));
console.log("역방향");
console.log(makeReverseArray(11));

console.log("------------------------------");

function makeArrayTCO(n, arr = []) {
  const t = [n, ...arr];
  if (n === 1) return t;
  return makeArrayTCO(n - 1, t);
}

function makeReverseArrayTCO(n, arr = []) {
  if (n === 1) return [...arr, 1];
  return makeReverseArrayTCO(n - 1, [...arr, n]);
}

console.log("makeArrayTCO : ", makeArrayTCO(5));
console.log("makeReverseArrayTCO : ", makeReverseArrayTCO(5));

console.log("-----------------------------");

function loopFibonacci(n) {
  let a = 0;
  let b = 1;
  for (let i = 1; i < n; i += 1) [a, b] = [b, a + b];
  return b;
}

function recursiveFibonacci(n) {
  if (n <= 1) return n;
  return recursiveFibonacci(n - 1) + recursiveFibonacci(n - 2);
}

const memoizedTable = {};
function memoizedFibonacci(n) {
  if (n <= 1) return n;
  return (
    memoizedTable[n] ||
    (memoizedTable[n] = memoizedFibonacci(n - 2) + memoizedFibonacci(n - 1))
  );
}

const memoized = (fn) => {
  const mdTable = {};
  return (k) => mdTable[k] ?? (mdTable[k] = fn(k));
};

const mdFibonacci = memoized(function f(n) {
  if (n <= 1) return n;
  return f(n - 1) + f(n - 2);
});

console.log("loop : ", loopFibonacci(15));
console.log("recursive : ", recursiveFibonacci(15));
console.log("memoized1 : ", memoizedFibonacci(15));
console.log("memoized2 : ", mdFibonacci(15));

//
