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

export class Stack extends Collection {
  pop() {
    return this._arr.pop();
  }
}

export class Queue extends Collection {
  enqueue(...args) {
    this.push(...args);
    return this._arr;
  }
  dequeue() {
    return this._arr.shift();
  }
}
