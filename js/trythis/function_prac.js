const once = (f) => {
  let called = false;
  let onTimer = false;
  return function (...args) {
    if (called & !onTimer) {
      onTimer = true;
      setTimeout(function () {
        onTimer = false;
        called = false;
      }, 1000);
    }
    if (called || onTimer) return;
    called = true;
    return f.bind(this)(...args); //f.apply(this, args);  f.call(this, ...args);
  };
};

function fivePart(x, y) {
  return `fivePart ${x}, ${y}, id: ${this.id}`;
}
const fn = once(fivePart.bind({ id: 11 }));
console.log(fn(1, 2));
console.log(fn(7, 8));
const fn2 = once(fivePart);
console.log(fn2.bind({ id: 22 })(3, 4));

function Test() {
  let cnt = 0;
  const intl = setInterval(() => {
    // widx += 2; // side-effect!
    console.log(fn(1, 2));
    if ((cnt += 1) === 50) clearInterval(intl);
  }, 100);
}
// Test();
console.log('-------------------------------------');

const before = () => console.log('before....');
const after = () => console.log('after...');

const someFn = (name, greeting) => console.log(`${greeting}, ${name}`);
const someFn2 = (id, nickname, email, level) =>
  console.log(`${id}/${nickname}/${email}/${level}`);

const template =
  (f) =>
  (...args) => {
    before();
    const ret = f(...args);
    after();
    return ret;
  };

const temp = template(someFn); // before → someFn → after 실행
const temp2 = template(someFn2); // before → someFn2 → after 실행

temp('sico', 'hello');
temp2(1, 'sico', 'sico@gmail.com', 5);
console.log('square of 7 =', template((n) => n ** 2)(7));
console.log('-------------------------------------');

const weeks = ['일', '월', '화', '수', '목', '금', '토'];
const getNextWeek = () => {
  let widx = -1;
  return () => {
    widx += 1;
    if (widx >= weeks.length) widx = 0;
    return `${weeks[widx]}요일`;
  };
};

const ans = getNextWeek();

// let cnt = 0;
// const intl = setInterval(() => {
//   // widx += 2; // side-effect!
//   console.log('call', cnt, ans());
//   if ((cnt += 1) === 8) clearInterval(intl);
// }, 1000);

console.log('-------------------------------------');

function getDiffMillis(dt1, dt2) {
  const d1 = new Date(dt1);
  const d2 = new Date(dt2);
  const { getTime: getTime1 } = d1;
  const { getTime: getTime2 } = d2;
  return Math.abs(getTime1.bind(d1)() - getTime2.apply(d2));
}
console.log(getDiffMillis('2021-01-01', '2021-01-02'));

console.log('-------------------------------------');

class Dog {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  fn() {
    return 'FN';
  }

  static sfn() {
    return 'SFN';
  }
}

const lucy = new Dog('Lucy');
const { sfn } = Dog;
const { name: aa, fn: fnnn, getName } = lucy;

console.log(aa, sfn(), fnnn(), getName); // ?
console.log(getName.call(lucy)); //
