for (let i = 0.1; i <= 1; i += 0.1) {
  console.log(Math.round(i * 10) / 10);
}
console.log("------------------------");

for (let i = 1; i <= 10; i += 1) {
  if (!Number.isInteger(Math.sqrt(i))) {
    console.log(i, Math.sqrt(i).toFixed(3));
  }
}
console.log("------------------------");

function printIrr(n) {
  do {
    console.log(n, Math.sqrt(n).toFixed(3));
    n += 1;
  } while (!Number.isInteger(Math.sqrt(n)));
}

printIrr(9);
console.log("------------------------");

const today = new Date();
const WEEK_NAMES = "일월화수목금토";
console.log("오늘은 " + WEEK_NAMES[today.getDay()] + "요일입니다.");
console.log("------------------------");

function addPoints(a, b) {
  let t = Math.max(a.toString().length, b.toString().length) - 2;
  let ret = (a + b).toFixed(t);
  console.log(ret);
  return ret;
}

addPoints(0.21354, 0.1); // 0.31354
addPoints(0.14, 0.28); // 0.42
addPoints(0.34, 0.226); // 0.566
console.log("------------------------");
