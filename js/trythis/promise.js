const depthTimer = (idx) =>
  new Promise((resolve, reject) => {
    if (idx <= 3) {
      setTimeout(() => {
        console.log(`depth${idx} ${new Date()}`);
        resolve(idx + 1);
      }, idx * 1000);
    } else reject('Already 3-Depth!!');
  });

depthTimer(1)
  .then((idx) => depthTimer(idx))
  .then((idx) => depthTimer(idx))
  .then((idx) => depthTimer(idx))
  .catch((err) => console.log(err));
