import assert from 'assert';
const depthTimer = (idx) =>
  new Promise((resolve, reject) => {
    if (idx <= 3) {
      setTimeout(() => {
        console.log(`depth${idx} ${new Date()}`);
        resolve(idx + 1);
      }, idx * 1000);
    } else reject('Already 3-Depth!!');
  });

// depthTimer(1)
//   .then((idx) => depthTimer(idx))
//   .then((idx) => depthTimer(idx))
//   .then((idx) => depthTimer(idx))
//   .catch((err) => console.log(err));
console.log('-------------------------------------');

const promiseFn = (id = 1) =>
  new Promise((resolve, reject) => {
    console.log('id>>', id);
    if (id < 7) resolve(id + 1);
    reject(new Error('어디로?' + id));
  });

promiseFn(1)
  .then((res) => {
    console.log('res1>>', res);
    promiseFn(res);
  })
  .then((res) => {
    res ? console.log('res2>>', res) : new Error(res);
  })
  .catch((err) => console.log('Error!!>>', err));

//console.log('-------------------------------------');
const promiseAll = (promises) =>
  new Promise((resolve, reject) => {
    const results = [];
    let idx = 0;
    for (let promise of promises) {
      promise
        .then((a) => {
          results[idx] = a;
          if (++idx === promises.length) resolve(results);
        })
        .catch(reject);
    }
  });

const vals = [1, 2, 3];
const randTime = (val) =>
  new Promise((resolve) => {
    setTimeout(resolve, Math.random() * 1000, val);
  });

promiseAll([randTime(1), randTime(2), randTime(3)])
  .then((arr) => {
    console.log(arr);
    console.table(arr);
    assert.deepStrictEqual(arr, vals);
  })
  .catch(console.error);

promiseAll([randTime(11), Promise.reject('RRR'), randTime(33)])
  .then((array) => {
    console.log('여긴 과연 호출될까?!');
  })
  .catch((error) => {
    console.log('reject!!!!!!>>', error);
  });
