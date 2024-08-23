console.log("-----------1번-------------");
function f1(user) {
  console.log(user.id, user.name);
}

function f2({ id, name }) {
  console.log(id, name);
}

const f3 = ({ id, name }) => console.log(id, name);

const hong = { id: 1, name: "Hong" };
const lee = { id: 2, name: "Lee" };
f1(hong);
f2(lee);
f3(hong);

console.log("-----------2번-------------");
const user = { id: 1, name: "Hong", passwd: "xxx", addr: "Seoul" };

const { id, name, addr } = user;
const { passwd, ...userInfo } = user;
console.log(`🚀 ~ userInfo:`, userInfo);

console.log("-----------3번-------------");
const arr = [[{ id: 1 }], [{ id: 2 }, { id: 3 }]];
const [[{ id: id1 }], [{ id: id2 }, { id: id3 }]] = arr;
console.log(id1, id2, id3);

console.log("-----------4번-------------");
function getValueExceptInitial(k) {
  const { [k]: val } = user;
  const [, ...ans] = typeof val === "string" ? val : [, ""];
  return ans.join("");
}
console.log(getValueExceptInitial("name")); // 'ong'
console.log(getValueExceptInitial("passwd")); // 'yz'
console.log(getValueExceptInitial("addr")); // 'eoul'

console.log("-----------5번-------------");
function getDiffMillis(dt1, dt2) {
  const d1 = new Date(dt1);
  const d2 = new Date(dt2);
  const { getTime: getTime1 } = d1;
  const { getTime: getTime2 } = d2;
  return getTime1.bind(d1)() - getTime2.bind(d2)();
}
console.log(getDiffMillis("2021-01-01", "2021-01-02"));
