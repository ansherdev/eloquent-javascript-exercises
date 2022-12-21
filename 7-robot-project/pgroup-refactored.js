class PGroup {
  constructor(members) {
    this.members = [...members];
  }

  add(value) {
    if (this.has(value)) {
      return this;
    }

    return new PGroup(this.members.concat([value]));
  }

  delete(value) {
    const members = this.members.filter((member) => member !== value);
    return new PGroup(members);
  }

  has(value) {
    return this.members.some((member) => member === value);
  }

  static get empty() {
    return new PGroup([]);
  }
}

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");
