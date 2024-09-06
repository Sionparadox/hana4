import assert from 'assert';

const total = { price: 45000, vat: 4500 };
const fmt = (txts, price) => {
  let arrPrice = [];
  price
    .toString()
    .split('')
    .reverse()
    .forEach((a, i) => {
      arrPrice.push(a);
      if (i % 3 === 2) arrPrice.push(',');
    });
  return txts[0] + arrPrice.reverse().join('').padStart(9) + txts[1];
  //   return txts[0] + price.toLocaleString().padStart(9) + txts[1];
};

console.log(fmt`주문합계: ${total.price}원`);
console.log(fmt`세액합계: ${total.vat}원`);

console.log('----------------------------------');
const NUMSTR = '영일이삼사오육칠팔구';
const isEndJaum = (word) => {
  const lastLetter = word.at(-1);
  if (lastLetter.match(/[ㄱ-ㅎ136780LMNRlmnr]/)) return true;
  else if (lastLetter.match(/[ㅏ-ㅣ]/)) return false;
  return (
    word.replace(/[A-Za-z0-9\s]/g, '가').charCodeAt(word.length - 1) % 28 !== 16
  );
};
assert.equal(isEndJaum('아지오'), false);
assert.equal(isEndJaum('북한강'), true);
assert.equal(isEndJaum('뷁'), true);
assert.equal(isEndJaum('강원도'), false);
assert.equal(isEndJaum('바라당'), true);
assert.equal(isEndJaum('ㅜㅜ'), false);
assert.equal(isEndJaum('케잌'), true);
assert.equal(isEndJaum('점수 A'), false);
assert.equal(isEndJaum('알파벳L'), true);
assert.equal(isEndJaum('24'), false);
assert.equal(isEndJaum('23'), true);

console.log('2-1 Pass!');

const iga = (word) => (isEndJaum(word) ? '이' : '가');
const eunun = (word) => (isEndJaum(word) ? '은' : '는');
const eulul = (word) => (isEndJaum(word) ? '을' : '를');
assert.strictEqual(`고성군${iga('고성군')}`, '고성군이');
assert.strictEqual(`고성군${eunun('고성군')}`, '고성군은');
assert.strictEqual(`고성군${eulul('고성군')}`, '고성군을');
assert.strictEqual(`성동구${iga('성동구')}`, '성동구가');
assert.strictEqual(`성동구${eunun('성동구')}`, '성동구는');
assert.strictEqual(`성동구${eulul('성동구')}`, '성동구를');
console.log('2-2 Pass!');
console.log('----------------------------------');
const s = [
  '강원도 고성군',
  '고성군 토성면',
  '토성면 북면',
  '북면',
  '김1수',
  'ㅇㅈㄷㅅㅌ',
];

const INITLETTER = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
const searchByKoreanInitialSound = (arr, initS) => {
  const regArr = initS.split('').map((a) => {
    if (!isNaN(a)) return a.charCodeAt() - 48;
    const startIdx = INITLETTER.indexOf(a) * 588 + 44032;
    const endLet = String.fromCharCode(startIdx + 587);
    return `[${a}${String.fromCharCode(startIdx)}-${endLet}]`;
  });
  const check = new RegExp(`${regArr.join('')}`, 'g');
  return s.filter((a) => a.match(check));
};
console.log(searchByKoreanInitialSound(s, 'ㄱㅅㄱ'));
console.log(searchByKoreanInitialSound(s, 'ㅌㅅㅁ'));
console.log(searchByKoreanInitialSound(s, 'ㅂㅁ'));
console.log(searchByKoreanInitialSound(s, 'ㅍㅁ'));
console.log(searchByKoreanInitialSound(s, 'ㄱ1ㅅ'));
console.log(searchByKoreanInitialSound(s, 'ㅇㅈㄷ'));

console.log('----------------------------------');
const upperToLower = (str) => {
  return str.replace(/[A-Z]/g, (c) => c.toLowerCase());
};
const swapCase = (str) =>
  str.replace(/[A-Za-z]/g, (c) =>
    c.match(/[A-Z]/) ? c.toLowerCase() : c.toUpperCase()
  );

assert.equal(
  upperToLower('Senior Coding Learning JS'),
  'senior coding learning js'
);
console.log('4-1 Pass!');

assert.equal(
  swapCase('Senior Coding Learning JS'),
  'sENIOR cODING lEARNING js'
);
assert.equal(swapCase('Hanaro 4 Class'), 'hANARO 4 cLASS');
assert.equal(swapCase('HeLLo WoRLd'), 'hEllO wOrlD');
console.log('4-2 Pass!');
console.log('----------------------------------');
const telfmt = (ts) => {
  const temp = ts.replace(/(02|0\d{2}|\d{4})(\d{3,4})/g, '$1-$2');
  return temp.split('-')[1].length <= 4
    ? temp
    : temp.replace(/(\D\d{3,4})(\d{4})/, '$1-$2');
};
// const telfmt2 = (ts) => {
//   return ts.replace(/(02|0\d{2}|\d{4})(\d{3,4})(\d{4})?/g, '$1-$2-$3');
// };
// console.log(telfmt2('15771577'));
assert.strictEqual(telfmt('0101234567'), '010-123-4567');
assert.strictEqual(telfmt('01012345678'), '010-1234-5678');
assert.strictEqual(telfmt('0212345678'), '02-1234-5678');
assert.strictEqual(telfmt('021234567'), '02-123-4567');
assert.strictEqual(telfmt('0331234567'), '033-123-4567');
assert.strictEqual(telfmt('15771577'), '1577-1577');
assert.strictEqual(telfmt('07012341234'), '070-1234-1234');
console.log('4-3 Pass!');
console.log('----------------------------------');
