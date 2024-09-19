const rand = (s, e) => s + Math.floor((e - s + 1) * Math.random());
const randtime = new Promise((resolve) => {
  const sec = rand(1, 4) * 500;
  setTimeout(() => resolve(sec), sec);
});

const randTime = () =>
  new Promise((resolve) => {
    const sec = rand(1, 4) * 500;
    setTimeout(() => {
      console.log('sec=', sec);
      resolve(sec);
    }, sec);
  });

Promise.allSettled([randTime(1), Promise.reject('Error!'), randTime(2)])
  .then(console.table)
  .catch(console.error);
