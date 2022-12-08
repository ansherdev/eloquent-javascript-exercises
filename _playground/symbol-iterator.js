class Iterable {
  constructor(...args) {
    this.values = args;
  }

  get() {
    return this.values;
  }

  add(x) {
    return this.values.push(x);
  }

  [Symbol.iterator]() {
    const iterable = this;

    return {
      i: 0,
      next() {
        if (this.i === iterable.values.length) {
          return { done: true };
        }

        const value = iterable.values[this.i];

        this.i++;

        return { value, done: false };
      },
    };
  }
}

const iterable = new Iterable(1, 2, 3, 5, 7, 8);

for (const element of iterable) {
  console.log("element", element);
}
