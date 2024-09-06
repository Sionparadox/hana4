const REVERSE = '\x1b[7m';
const RESET = '\x1b[0m';

const now = new Date('2024-10-11');
function getCalendar(d) {
  const nowYear = d.getFullYear();
  const nowMonth = d.getMonth();
  const nowDate = d.getDate();
  const startDate = new Date(nowYear, nowMonth, 1);
  const lastDate = new Date(nowYear, nowMonth + 1, 0);
  const DAYS = '일월화수목금토';
  const startDay = startDate.getDay();
  const headline = `${nowMonth + 1}월`.padStart(8, ' ') + `  ${nowYear}`;
  console.log(headline);
  const top = '일 월 화 수 목 금 토';
  console.log(top);
  let output = '';

  for (let i = 1 - startDay; i <= lastDate.getDate(); i++) {
    if (i < 1) {
      output += '   ';
      continue;
    }
    if (i === nowDate) output += REVERSE;
    output += (i + '').padStart(2, ' ');
    if (i === nowDate) output += RESET;
    output += ' ';
    if ((i + startDay) % 7 == 0) output += '\n';
  }
  return output;
}

console.log(getCalendar(now));
