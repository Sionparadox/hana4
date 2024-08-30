// const isPrime = (n) => {
//   for (let i = 2; i < Math.floor(Math.sqrt(n)) + 1; i += 1) {
//     if (n % i == 0) return false;
//   }
//   return true;
// };

// function isPrime(n) {
//   if (n == 1) return false;
//   arr = Array.from({ length: Math.floor(Math.sqrt(n)) }, (_, i) => i + 2);
//   return arr.every((a) => n % a != 0);
// }

// const isPrime = (n) => {
//   if (n == 1) return false;
//   return Array.from(
//     { length: Math.floor(Math.sqrt(n)) },
//     (_, i) => i + 2
//   ).every((a) => n % a != 0);
// };

const isPrime = (n) =>
  n === 1
    ? false
    : Array.from({ length: Math.sqrt(n) - 1 }, (_, i) => i + 2).every(
        (a) => n % a !== 0
      );

const hasPrime = (arr) => arr.some(isPrime);

const narr = [2, 3, 4, 70, 11];
const ans = hasPrime(narr);
console.log(`🚀 ~ ans:`, ans);

const primeNumbers = (arr) => console.log(arr.filter(isPrime));

primeNumbers(narr);
