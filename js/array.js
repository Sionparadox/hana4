const hong = { id: 1, name: 'Hongi' };
const kim = { id: 2, name: 'Kim' };
const lee = { id: 3, name: 'Lee' };
const park = { id: 4, name: 'Parki' };

//const users = [hong, kim, lee, park];
const users = [kim, hong, park, lee];
const find3 = (a) => a.id === 3;

const findId = (i) => (a) => a.id === i;

const idxId2 = users.findIndex((a) => a.id == 2);
//console.log(`🚀 ~ idxId2:`, idxId2);

const arr = [1, 2, 3, 4, 5];

const isOdd = (n) => n % 2 !== 0;

arr.forEach((a) => console.log(isOdd(a)));

const kim2 = users.find((user) => user.name === 'Kim');
//console.log(`🚀 ~ kim2:`, kim2);

const hong2 = users.findLast((user) => user.name === 'Hongi');
//console.log(`🚀 ~ hong2:`, hong2);

const hasIUsers = users.filter((user) => user.name.includes('i'));
console.log(`🚀 ~ hasIUsers:`, hasIUsers);
const names = users.map((a) => a.name);
console.log(`🚀 ~ names:`, names);

function isPrime(n) {
  if (n == 1) return false;
  for (let i = 2; i < Math.floor(Math.sqrt(n)) + 1; i += 1) {
    if (n % i == 0) return false;
  }
  return true;
}
const hasPrime = (arr) => arr.some((a) => isPrime(a));

const narr = [20, 5, 6, 7, 110];
const ans = hasPrime(narr);
console.log(`🚀 ~ ans:`, ans);

const primeNumbers = (arr) => console.log(arr.filter((a) => isPrime(a)));

primeNumbers(narr);

console.log(users.sort((a, b) => (a.name > b.name ? 1 : -1)));
