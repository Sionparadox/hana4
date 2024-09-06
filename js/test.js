// const regexp = /senior|coding/gi;
// if (regexp.test('JS Coding')) console.log('OK3');
// console.log(regexp.lastIndex);
// if (regexp.test('Junior Developer')) console.log('OK1');
// console.log(regexp.lastIndex);
// if (regexp.test('Senior Developer')) console.log('OK2');
// console.log(regexp.lastIndex);
// if (regexp.test('JavaScript Coding')) console.log('OK4');
// console.log(regexp.lastIndex);

const temp1 = [];
const temp2 = [];
for (let i = '가'.charCodeAt(); i <= '하'.charCodeAt(); i += 588) {
  temp1.push(i);
}
for (let i = 'ㄱ'.charCodeAt(); i <= 'ㅎ'.charCodeAt(); i += 1) {
  temp2.push(String.fromCharCode(i));
}

console.log(temp1);
console.log(temp2);
