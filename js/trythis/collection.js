import assert from 'assert';

//Stack, Queue, ArrayList
class Collection {
  #arr = [];
  constructor(...args) {
    this.#arr.push(...args);
  }
  get _arr() {
    return this.#arr;
  }
  push(...args) {
    //args.forEach((a) => this.arr.push(a));
    //this.arr = [...this.arr, ...args];
    this.#arr.push(...args);
    return this.#arr;
  }

  get peek() {
    return this.#isQueue() ? this.#arr[0] : this.#arr.at(-1);
  }
  get poll() {
    return this.#isQueue() ? this.#arr.shift() : this.#arr.pop();
  }

  remove() {
    return this.poll;
  }

  toArray() {
    return this.#isQueue() ? this.#arr.toReversed() : this.#arr;
  }

  #isQueue() {
    return this instanceof Queue;
  }

  get length() {
    return this.#arr.length();
    //return this.isEmpty() ? 0 : this.#arr.length();
  }

  clear() {
    this.#arr.length = 0;
  }
  print() {
    console.log(`<${this.constructor.name} : [${this.toArray()}]>`);
  }

  get isEmpty() {
    return !this.#arr.length;
  }
}

class Stack extends Collection {
  pop() {
    return this._arr.pop();
  }
}
class Queue extends Collection {
  enqueue(...args) {
    this.push(...args);
    return this._arr;
  }
  dequeue() {
    return this._arr.shift();
  }
}

const stack = new Stack();
assert.deepStrictEqual(stack.toArray(), []);
stack.push(3); // 추가하기
assert.deepStrictEqual(stack.toArray(), [3]);
assert.deepStrictEqual(stack.pop(), 3);
assert.deepStrictEqual(stack.toArray(), []);

const stack2 = new Stack(1, 2);

assert.deepStrictEqual(stack2.toArray(), [1, 2]);
stack2.push(2).push(3); // 추가하기
assert.deepStrictEqual(stack2.toArray(), [1, 2, 2, 3]);
console.log(stack2.pop()); // 마지막에 추가된 하나 꺼내기
assert.deepStrictEqual(stack2.toArray(), [1, 2, 2]);
stack2.push(4, 5);
assert.deepStrictEqual(stack2.toArray(), [1, 2, 2, 4, 5]);
assert.deepStrictEqual(stack2.peek, 5);
assert.deepStrictEqual(stack2.poll, 5);
assert.deepStrictEqual(stack2.toArray(), [1, 2, 2, 4]);
stack2.remove();
assert.deepStrictEqual(stack2.toArray(), [1, 2, 2]);

stack2.arr = [5, 6, 7];
assert.notDeepStrictEqual(stack2.toArray(), [5, 6, 7]);
//assert.throws();

const queue = new Queue();
assert.deepStrictEqual(queue.toArray(), []);
queue.enqueue(3); // 추가하기
assert.deepStrictEqual(queue.toArray(), [3]);
queue.enqueue(2); // 추가하기
assert.deepStrictEqual(queue.toArray(), [2, 3]);
assert.deepStrictEqual(queue.dequeue(), 3);
assert.deepStrictEqual(queue.toArray(), [2]);
queue.enqueue(5, 6); // 추가하기
assert.deepStrictEqual(queue.toArray(), [6, 5, 2]);
assert.deepStrictEqual(queue.peek, 2);
assert.deepStrictEqual(queue.poll, 2);
queue.remove();
assert.deepStrictEqual(queue.toArray(), [6]);

const queue2 = new Queue(1, 2);
assert.deepStrictEqual(queue2.toArray(), [2, 1]);

const Test = () => {
  const stack = new Stack();
  assert.deepStrictEqual(stack.toArray(), []);
  stack.push(3); // 추가하기
  assert.deepStrictEqual(stack.toArray(), [3]);
  stack.pop();
  assert.deepStrictEqual(stack.toArray(), []);

  const stackT = new Stack(...[[1], [2]]);
  assert.deepStrictEqual(stackT.toArray(), [[1], [2]]);

  // const stack2 = new Stack(1, 2);
  const stack2 = new Stack(...[1, 2]);
  assert.deepStrictEqual(stack2.toArray(), [1, 2]);
  stack2.push(2).push(3); // 추가하기
  assert.deepStrictEqual(stack2.toArray(), [1, 2, 2, 3]);
  assert.strictEqual(stack2.pop(), 3);
  // assert.deepStrictEqual(stack2.toArray(), [1, 2]);
  stack2.push(4, 5); // 추가하기
  assert.deepStrictEqual(stack2.toArray(), [1, 2, 2, 4, 5]);

  assert.strictEqual(stack2.peek, 5);
  assert.strictEqual(stack2.poll, 5);
  assert.strictEqual(stack2.remove(), 4);
  assert.deepStrictEqual(stack2.toArray(), [1, 2, 2]);

  stack2.arr = [5, 6, 7]; //error
  assert.notDeepStrictEqual(stack2.toArray(), [5, 6, 7]);
  stack2.print();

  stack2.clear();
  assert.deepStrictEqual(stack2.toArray(), []);
  assert.strictEqual(stack2.isEmpty, true);

  //--------------------------------

  const queue = new Queue();
  assert.deepStrictEqual(queue.toArray(), []);
  queue.enqueue(3); // 추가하기
  assert.deepStrictEqual(queue.toArray(), [3]);
  queue.enqueue(2); // 추가하기
  assert.deepStrictEqual(queue.toArray(), [2, 3]);
  assert.strictEqual(queue.dequeue(), 3);
  assert.deepStrictEqual(queue.toArray(), [2]);
  queue.enqueue(5, 6); // 추가하기
  assert.deepStrictEqual(queue.toArray(), [6, 5, 2]);
  queue.print();

  assert.strictEqual(queue.peek, 2); // [6, 5, 2]
  assert.strictEqual(queue.poll, 2); // [6, 5]
  assert.strictEqual(queue.remove(), 5); // [6]
  assert.deepStrictEqual(queue.toArray(), [6]);

  queue.clear();
  assert.deepStrictEqual(queue.toArray(), []);
  assert.strictEqual(queue.isEmpty, true);

  const queue2 = new Queue(1, 2);
  assert.deepStrictEqual(queue2.toArray(), [2, 1]);
  console.log('Pass!');
};

Test();
