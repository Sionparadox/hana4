const myName: string = 'Sion';
const myAge: number = 26;
console.log(`Hello, ${myName}!`);
console.log(`${myAge} years old!`);

let x: number | string;
x = 1;
console.log(x);
x = 'asdf';
console.log(x);
const len = x.length;
console.log('----------------------------');
type Member = {
  name: string;
  spend: number[];
  addr: string;
  discountRate: number;
};
type Guest = {
  name: string;
  spend: number;
  age: number;
};
const member: Member = {
  name: 'hong',
  spend: [1000, 30000, 50000],
  addr: 'yong',
  discountRate: 0.1,
};
const guest: Guest = {
  name: 'kim',
  spend: 5500,
  age: 28,
};

const who = Math.random() > 0.5 ? member : guest;

let totalAmount: number;
totalAmount =
  typeof who.spend !== 'number'
    ? who.spend.reduce((s, c) => s + c, 0)
    : who.spend;

// who.spend.reduce((s, c) => s + c, 0); // Error!!
