class PGroup {
  get length() {
    return Object.keys(this).length;
  }

  add(value) {
    const group = PGroup.from(this);

    if (!group.has(value)) {
      group[group.length] = value;
    }

    return group;
  }

  delete(value) {
    const group = PGroup.from(this);

    const index = Object.values(group).findIndex(
      (current) => current === value
    );

    if (index !== -1) {
      delete group[index];
    }

    return group;
  }

  has(value) {
    return Object.values(this).some((current) => current === value);
  }

  [Symbol.iterator]() {
    return new PGroupIterator(this);
  }

  static from(iterable) {
    const group = new PGroup();

    if (iterable.length === 0) {
      return group;
    }

    for (const element of iterable) {
      if (!group.has(element)) {
        group[group.length] = element;
      }
    }

    return group;
  }
}

class PGroupIterator {
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

const firstGroup = PGroup.from([1, 2, 3]);
const secondGroup = firstGroup.add(4);
const thirdGroup = secondGroup.delete(2);

console.log("firstGroup", firstGroup);
console.log("secondGroup", secondGroup);
console.log("thirdGroup", thirdGroup);
