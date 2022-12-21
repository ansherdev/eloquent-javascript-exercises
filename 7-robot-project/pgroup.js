class PGroup {
  constructor(iterable = []) {
    for (const element of iterable) {
      if (this.has(element)) {
        continue;
      }

      this[this.length] = element;
    }
  }

  get length() {
    return Object.keys(this).length;
  }

  add(value) {
    if (this.has(value)) {
      return this;
    }

    const copy = new PGroup(this);
    copy[copy.length] = value;

    return copy;
  }

  delete(value) {
    const index = Object.values(this).findIndex((current) => current === value);

    if (index === -1) {
      return this;
    }

    const copy = new PGroup(this);
    delete copy[index];

    return new PGroup(copy);
  }

  has(value) {
    return Object.values(this).some((current) => current === value);
  }

  [Symbol.iterator]() {
    return new PGroupIterator(this);
  }
}

class PGroupIterator {
  constructor(group) {
    this.index = 0;
    this.group = group;
  }

  next() {
    const keys = Object.keys(this.group);

    if (this.index === Number(keys[keys.length - 1]) + 1) {
      return { done: true };
    }

    let value;

    do {
      if (this.index >= Number(keys[keys.length])) {
        return { done: true };
      }

      value = this.group[this.index];
      this.index++;
    } while (value === undefined);

    return { value, done: false };
  }
}

const firstGroup = new PGroup([1, 2, 3, 4, 5]);
const secondGroup = firstGroup.add(4);
const thirdGroup = secondGroup.delete(3);

console.log("firstGroup", firstGroup);
console.log("secondGroup", secondGroup);
console.log("thirdGroup", thirdGroup);
