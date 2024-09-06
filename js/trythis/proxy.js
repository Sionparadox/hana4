import assert from 'assert';
class Emp {
  firstName;
  lastName;
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        if (prop == 'fullName') {
          return `${target.firstName}${target.firstName ? ' ' : ''}${
            target.lastName
          }`;
        } else {
          return target[prop];
        }
      },
      set(target, prop, value) {
        if (prop == 'fullName') {
          const tmp = value?.split(' ') || [];
          target.lastName = (tmp[1] || tmp[0])?.toUpperCase();
          target.firstName = tmp[1] ? tmp[0] : target.firstName;
        } else {
          target[prop] = value;
        }
        return target;
      },
    });
  }
}

const hong = new Emp();
hong.fullName = 'Kildong Hong';
console.log(hong.fullName);
hong.fullName = 'Lee';
console.log(hong.firstName, hong.lastName);
assert.strictEqual(hong.fullName, 'Kildong LEE');
assert.deepStrictEqual(
  [hong.firstName, hong.lastName],
  'Kildong LEE'.split(' ')
);
