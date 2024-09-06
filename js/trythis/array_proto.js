import assert from 'assert';

Object.defineProperties(Array.prototype, {
  firstObject: {
    get() {
      return this[0];
    },
    set(value) {
      this[0] = value;
    },
  },
  lastObject: {
    get() {
      return this.at(-1);
    },
    set(value) {
      this[this.length - 1] = value;
    },
  },
});

Array.prototype.mapBy = function (prop) {
  return this.map((a) => a[prop]);
};
Array.prototype.filterBy = function (prop, value, isIncludes = false) {
  const cb = isIncludes
    ? (a) => a[prop]?.includes(value)
    : (a) => a[prop] === value;
  return this.filter(cb);
};

Array.prototype.rejectBy = function (prop, value, isIncludes = false) {
  const cb = isIncludes
    ? (a) => !a[prop]?.includes(value)
    : (a) => a[prop] !== value;
  return this.filter(cb);
};

Array.prototype.findBy = function (prop, value) {
  return this.find((a) => a[prop] === value);
};

Array.prototype.sortBy = function (prop) {
  const [k, direction = 'asc'] = prop?.split(':');
  const dir = direction.toLowerCase() === 'asc' ? 1 : -1;
  return this.sort((a, b) => (a[k] > b[k] ? dir : -dir));
};

const arr = [1, 2, 3, 4, 5];
const hong = { id: 1, name: 'Hong' };
const kim = { id: 2, name: 'Kim' };
const lee = { id: 3, name: 'Lee' };
const users = [hong, lee, kim];

assert.deepStrictEqual(users.mapBy('id'), [1, 3, 2]);
assert.deepStrictEqual(users.mapBy('name'), ['Hong', 'Lee', 'Kim']);
assert.deepStrictEqual(users.filterBy('id', 2), [kim]);
assert.deepStrictEqual(users.rejectBy('id', 2), [hong, lee]);
assert.deepStrictEqual(users.findBy('name', 'Kim'), kim);
assert.deepStrictEqual(users.sortBy('name'), [hong, kim, lee]);
assert.deepStrictEqual(users.sortBy('name:desc'), [lee, kim, hong]);
assert.deepStrictEqual(arr.firstObject, 1);
assert.deepStrictEqual(arr.lastObject, 5);
assert.deepStrictEqual(users.firstObject, lee);
assert.deepStrictEqual(users.lastObject, hong);
users.firstObject = kim;
assert.deepStrictEqual(users.firstObject, kim);
users.lastObject = lee;
assert.deepStrictEqual(users.lastObject, lee);

function uniq() {
  Array.prototype.uniqBy = function (prop) {
    if (!prop && prop !== 0) return [...new Set(this)];
    return [...new Set(this.map((a) => a[prop]))];
  };
  const hong = { id: 1, name: 'Hong', dept: 'HR' };
  const kim = { id: 2, name: 'Kim', dept: 'Server' };
  const lee = { id: 3, name: 'Lee', dept: 'Front' };
  const park = { id: 4, name: 'Park', dept: 'HR' };
  const ko = { id: 7, name: 'Ko', dept: 'Server' };
  const loon = { id: 6, name: 'Loon', dept: 'Sales' };
  const choi = { id: 5, name: 'Choi', dept: 'Front' };
  const users = [hong, kim, lee, park, ko, loon, choi];
  users.uniqBy('dept');
  assert.deepStrictEqual(users.uniqBy('dept'), [
    'HR',
    'Server',
    'Front',
    'Sales',
  ]);

  const arr = [1, 2, 2, 3, 4, 5, 6, 5];
  assert.deepStrictEqual(arr.uniqBy(), [...new Set(arr)]);
}
uniq();
