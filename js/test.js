// a100 = Array.from({ length: 100 }, (_, i) => i + 1);
// //console.log(a100);

// function Range(a, n) {
//   ret = Array.from({ length: n - 1 }, (_, i) => i + a);
//   return ret;
// }

//console.log(Range(1, 3));
//console.log(Range(5, 20));

// arr = Array.from({ length: 5 }, (_, i) => i + 1);
// const sum = arr.reduce((s, a) => (s += a));
// console.log(sum);

// arr.reduce((s, a) => (s += a), 0);

const objs = [{ id: 1 }, { name: 'Hong' }, { addr: 'Seoul', id: 5 }];
ans = objs.reduce((acc, o) => ({ ...acc, ...o }));
console.log(ans);
