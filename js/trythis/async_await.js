import assert from 'assert';
// const afterTime = (sec) =>
//   new Promise((resolve) => setTimeout(resolve, sec * 1000, sec));

// const odds = [1, 2, 3].filter(async (val) => {
//   const r = await afterTime(val);
//   return r % 2 === 1;
// });

// const rrr = (await Promise.all([1, 2, 3].map(afterTime))).filter((n) => n % 2);
// console.log(`🚀 ~ rrr:`, rrr);

// async function sleep(n) {
//   await new Promise((resolve) => setTimeout(resolve, n * 1000));
// }
// console.log('11', new Date());
// await sleep(2);
// console.log('22', new Date());

const promiseAll = async (promises) => {
  const results = [];
  let idx = 0;
  for (const promise of promises) {
    promise.catch((err) => err);
  }
  for (const promise of promises) {
    results[idx++] = await promise;
  }
  return results;
};

const vals = [1, 2, 3];
const randTime = (val) =>
  new Promise((resolve) => {
    setTimeout(resolve, Math.random() * 1000, val);
  });

promiseAll([randTime(1), randTime(2), randTime(3)])
  .then((arr) => {
    console.table(arr);
    assert.deepStrictEqual(arr, vals);
  })
  .catch(console.error);

try {
  const array = await [randTime(11), Promise.reject('RRR'), randTime(33)];
  await promiseAll(array).then((array) => {
    console.log('여긴 과연 호출될까?!');
  });
} catch (error) {
  console.log('reject!!!!!!>>', error);
}
