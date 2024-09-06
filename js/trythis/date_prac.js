const d1 = new Date('1970-01-01');
console.log(`🚀 ~ d1:`, d1);
const d2 = new Date('1970-01-02');
console.log(`🚀 ~ d2:`, d2);
const diff = d2.getTime() - d1.getTime();
console.log(diff / 1000);

const rand = (s, e) => s + Math.floor((e - s + 1) * Math.random());
const thisMonth = new Date();
const lastDate = new Date(thisMonth.getFullYear(), thisMonth.getMonth() + 1, 0);
const noDuplicationRandArr = (s, e, n) => {
  if (e - s + 1 < n) return Array(n).fill(0);
  const ret = [];
  do {
    const r = rand(s, e);
    if (!ret.includes(r)) ret.push(r);
  } while (ret.length !== n);
  return ret;
};
const randDate = noDuplicationRandArr(1, lastDate.getDate(), 5)
  .map((d) => new Date(thisMonth.setDate(d)))
  .sort((a, b) => (a > b ? -1 : 1));
console.log(randDate);

const DAYS = '일월화수목금토';
const d = new Date();
const nextYear = new Date();
nextYear.setDate(d.getDate() + 365);
console.log(`내년 오늘은 ${DAYS[nextYear.getDay()]}요일 입니다.`);

const next100 = new Date();
next100.setDate(d.getDate() + 100);
console.log(
  `오늘부터 100일 후는 ${next100.getFullYear()}년 ${next100.getMonth()}월 ${next100.getDate()}일 입니다.`
);
