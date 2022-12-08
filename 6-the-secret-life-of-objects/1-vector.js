class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(vec) {
    this.x += vec.x;
    this.y += vec.y;
  }

  minus(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
  }

  get length() {
    return Math.sqrt(Math.pow(this.x, 2) * Math.pow(this.y, 2));
  }
}

const vector = new Vec(5, 8);
