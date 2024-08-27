const user = {
  "": 1,
  " ": 1, // 'id': 1, '0y': 2 모두 OK!
  123: 1, // user[123], user['123'] OK, but user.123 is SyntaxError!!
  [12345n]: 2, // user[12345], user[12345n], user['12345'] OK, but user['12345n'] is undefined!
  true: 1, // OK  user[true]  user.true
  id: 2,
  [`name`]: "Hong", // But, `name`: 'Hong'은 SyntaxError: Unexpected template string!
  [Symbol()]: "Hong", // OK But, Symbol(): 'Hong'은 SyntaxError: Unexpected token ':'
  [`${new Date()}`]: 365, // OK! 'Sun Jul …': 365
  "my-friends": ["Han", "Kim"],
  getInfo: () => `${this.id}-${this.name}`, // OK! But, this is not user!
  getInfo() {
    return `${this.id}-${this.name}`;
  }, // OK! getInfo의 최종 <f.o>
};

console.log(user);
const keys = Reflect.ownKeys(user);
console.log(`🚀 ~ keys:`, keys);
console.log(user[keys[keys.length - 1]]);

let symbolKey;
for (let i = 0; i < keys.length; i++) {
  const typ = typeof keys[i];
  console.log(keys[i], `=>`, typ);
  if (typ === "symbol") {
    symbolKey = keys[i];
  }
}

console.log("********>", user.getInfo());
/**
 * symbol keys들을 포함한 객체의 entries를 구하는 함수
 * @param obj 객체염ㅎㅎ
 * @returns 리턴이염ㅎㅎ
 */
function entriesWithSymbol(obj) {
  if (!obj || typeof obj !== "object") return [];
  const entries = Object.entries(obj);
  const symbols = Object.getOwnPropertySymbols(obj);
  for (const sym of symbols) entries.push([sym, obj[sym]]);
  return entries;
}

console.log(entriesWithSymbol(user));
