const WEEKS = '일월화수목금토일';
const getNextWeek = () => {
  let widx = -1;
  return () => {
    //alert('Clicked');
    widx += 1;
    if (widx >= WEEKS.length) widx = 0;
    return `${WEEKS[widx]}요일`;
  };
};

const nextWeekFunction = {
  kor: getNextWeek(),
  math: getNextWeek(),
};
const setWeek = (subject) => {
  document.getElementById(subject).innerText = nextWeekFunction[subject]();
};
window.addEventListener('load', () => {
  document.getElementById('btnKor').addEventListener('click', () => {
    setWeek('kor');
  });
});
