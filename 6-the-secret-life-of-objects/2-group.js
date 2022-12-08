class Group {
  get length() {
    return Object.keys(this).length;
  }

  add(value) {
    if (!this.has(value)) {
      this[this.length] = value;
    }
  }

  delete(value) {
    const index = Object.values(this).findIndex((current) => current === value);

    if (index !== -1) {
      delete this[index];
    }
  }

  has(value) {
    return Object.values(this).some((current) => current === value);
  }

  [Symbol.iterator]() {
    return new GroupIterator(this);
  }

  static from(iterable) {
    const group = new Group();

    if (iterable.length === 0) {
      return group;
    }

    for (const element of iterable) {
      group.add(element);
    }

    return group;
  }
}

class GroupIterator {
  constructor(group) {
    this.index = 0;
    this.group = group;
  }

  next() {
    if (this.index === this.group.length) {
      return { done: true };
    }

    const value = this.group[this.index];

    this.index++;

    return { value, done: false };
  }
}

const group = new Group();

const groupFromArray = Group.from([1, 2, 3]);

for (const element of groupFromArray) {
  console.log(element);
}
