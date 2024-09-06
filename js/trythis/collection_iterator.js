import assert from 'assert';

class Collection {
  #arr = [];
  constructor(...args) {
    this.#isQueue()
      ? this.#arr.push(...args.toReversed())
      : this.#arr.push(...args);
  }

  //   [Symbol.iterator]() {
  //     let idx = 0;
  //     const arr = this.toArray();
  //     return {
  //       next: () => ({ value: this.#arr[idx++], done: this.length < idx }),
  //       //next: () => ({ value: arr[idx++], done: this.length < idx }),
  //     };
  //   }

  *[Symbol.iterator]() {
    for (let i = 0; i < this.length; i += 1) {
      yield this.#arr[i];
    }
  }

  iterator() {
    return this[Symbol.iterator]();
  }

  get _arr() {
    return this.#arr;
  }
  push(...args) {
    this.#arr.push(...args);
    return this.#arr;
  }

  get peek() {
    return this.#arr.at(-1);
  }
  get poll() {
    return this.#arr.pop();
  }

  remove() {
    return this.poll;
  }

  toArray() {
    return this.#arr;
  }

  #isQueue() {
    return this instanceof Queue;
  }

  get length() {
    return this.#arr.length;
    //return this.isEmpty() ? 0 : this.#arr.length;
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
    this._arr.unshift(...args.reverse());
    return this._arr;
  }
  dequeue() {
    return this._arr.pop();
  }
}

const stack = new Stack(1, 2, 3, 4);
const queue = new Queue(1, 2);
queue.enqueue(5, 6);

assert.deepStrictEqual([...stack], stack.toArray());
assert.deepStrictEqual([...queue], queue.toArray());
stack.push(5);

const itStack = stack[Symbol.iterator]();
const stackArr = [...stack.toArray()];
assert.deepStrictEqual(itStack.next(), {
  value: stackArr.shift(),
  done: false,
});
assert.deepStrictEqual(itStack.next(), {
  value: stackArr.shift(),
  done: false,
});
assert.deepStrictEqual(itStack.next(), {
  value: stackArr.shift(),
  done: false,
});
assert.deepStrictEqual(itStack.next(), {
  value: stackArr.shift(),
  done: false,
});
assert.deepStrictEqual(itStack.next(), {
  value: stackArr.shift(),
  done: false,
});
assert.deepStrictEqual(itStack.next(), {
  value: undefined,
  done: true,
});

const itQueue = queue.iterator();
const queueArr = [...queue.toArray()];
assert.deepStrictEqual(itQueue.next(), {
  value: queueArr.shift(),
  done: false,
});
assert.deepStrictEqual(itQueue.next(), {
  value: queueArr.shift(),
  done: false,
});
assert.deepStrictEqual(itQueue.next(), {
  value: queueArr.shift(),
  done: false,
});
assert.deepStrictEqual(itQueue.next(), {
  value: queueArr.shift(),
  done: false,
});
assert.deepStrictEqual(itQueue.next(), {
  value: undefined,
  done: true,
});
