console.log("-----------1번-----------");

for (let i = 0.1; i <= 1; i += 0.1) {
  console.log(+i.toFixed(1));
}

console.log("-----------2번-----------");

for (let i = 1; i <= 10; i += 1) {
  if (Math.sqrt(i) % 1) {
    console.log(i, Math.sqrt(i).toFixed(3));
  }
}

console.log("-----------3번-----------");

function printIrr(n) {
  do {
    console.log(n, Math.sqrt(n).toFixed(3));
    n += 1;
  } while (!Number.isInteger(Math.sqrt(n)));
}

printIrr(9);

console.log("-----------4번-----------");

const today = new Date();
const WEEK_NAMES = "일월화수목금토";
console.log("오늘은 " + WEEK_NAMES[today.getDay()] + "요일입니다.");
console.log("오늘은 ${WEEK_NAMES[today.getDay()]}요일입니다.");

console.log("-----------5번-----------");
function addPoints(a, b) {
  const ai = Math.floor(a);
  const bi = Math.floor(b);
  a -= ai;
  b -= bi;
  const t = Math.max(a.toString().length, b.toString().length) - 2;
  let ret = ai + bi + parseFloat((a + b).toFixed(t));

  console.log(ret);
  return ret;
}

addPoints(2.21354, 3.1); // 0.31354
addPoints(0.14, 200.28); // 0.42
addPoints(0.34, 0.226); // 0.566
console.log("------------------------");
