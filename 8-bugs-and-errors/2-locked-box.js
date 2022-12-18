const box = {
  locked: true,
  unlock() {
    this.locked = false;
  },
  lock() {
    this.locked = true;
  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  },
};

const withBoxUnlocked = (body) => {
  try {
    if (box.locked) {
      box.unlock();
    }

    return body();
  } catch (error) {
    console.log(error.message);
  } finally {
    if (!box.locked) {
      box.lock();
    }
  }
};

withBoxUnlocked(() => {
  box.content.push(1, 2, 3);
});

console.log("box", box);
