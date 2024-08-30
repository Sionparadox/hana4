// function once(f) {
//   let done = false;
//   return function (x, y) {
//     console.log(this);
//     if (!done) {
//       done = true;
//       return f.bind(this)(x, y);
//     } else return;
//   };
// }

// function onc(f) {
//   let done = false;
//   return function () {
//     if (!done) {
//       done = true;
//       return;
//     } else return;
//   };
// }

// const fn = once((x, y) => `금일 운행금지 차량은 끝번호 ${x}, ${y}입니다!`);
// console.log(fn(1, 6)); // 금일 운행금지 차량은 끝번호 1, 6입니다!
// console.log(fn(2, 7)); // undefined
// console.log(fn(3, 8)); // undefined

// function fivePart(x, y) {
//   return `fivePart ${x}, ${y}, id: ${this.id}`;
// }
// const fn = once(fivePart.bind({ id: 11 }));
// console.log(fn(1, 2));
// const fn2 = once(fivePart);
// console.log(fn2.bind({ id: 22 })(3, 4));

const weeks = ['일', '월', '화', '수', '목', '금', '토'];
const getNextWeek = () => {
  let widx = -1;
  return function () {
    widx += 1; // side-effect!
    if (widx >= weeks.length) widx = 0;
    return `${weeks[widx]}요일`;
  };
};

const day = getNextWeek();
let cnt = 0;
const intl = setInterval(() => {
  // widx += 2; // side-effect!
  console.log('call', cnt, day());
  if ((cnt += 1) === 8) clearInterval(intl);
}, 1000);
