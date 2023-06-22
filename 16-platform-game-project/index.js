const levelPlan01 = `
..........................
..#....................#..
..#..................=.#..
..#............o.o.....#..
..#...........#####....#..
..#####................#..
..#...#++++++++++++++++#..
..#...##################..
..#....................#..`;

class State {
  constructor(level, actors, status) {
    this.level = level;
    this.actors = actors;
    this.status = status;
  }

  static start(level) {
    return new State(level, level.startActors, "playing");
  }

  get player() {
    return this.actors.find((actor) => actor.type === "player");
  }
}

class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(other) {
    return new Vec(this.x + other.x, this.y + other.y);
  }

  times(factor) {
    return new Vec(this.x * factor, this.y * factor);
  }
}

class Player {
  constructor(pos, speed) {
    this.pos = pos;
    this.speed = speed;
  }

  get type() {
    return "player";
  }

  static create() {
    return new Player(pos.plus(new Vec(0, -0.5), new Vec(0, 0)));
  }
}

Player.prototype.size = new Vec(0.8, 1.5);

class Lava {
  constructor(pos, speed, reset) {
    this.pos = pos;
    this.speed = speed;
    this.reset = reset;
  }

  get type() {
    return "lava";
  }

  static create(pos, char) {
    if (char === "=") {
      return new Lava(pos, new Vec(2, 0));
    } else if (char === "|") {
      return new Lava(pos, new Vec(0, 2));
    } else if ((char = "v")) {
      return new Lava(pos, new Vec(0, 3), pos);
    }
  }
}

Lava.prototype.size = new Vec(1, 1);

class Coin {
  constructor(pos, basePos, wobble) {
    this.pos = pos;
    this.basePos = basePos;
    this.wobble = wobble;
  }

  get type() {
    return "coin";
  }

  static create(pos) {
    const basePos = pos.plus(new Vec(0.2, 0.1));

    return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
  }
}

Coin.prototype.size = new Vec(0.6, 0.6);

const levelChars = {
  ".": "empty",
  "#": "wall",
  "+": "lava",
  "@": Player,
  o: Coin,
  "|": Lava,
  "=": Lava,
  v: Lava,
};

class Level {
  constructor(plan) {
    const rows = plan
      .trim()
      .split("\n")
      .map((line) => [...line]);

    this.width = rows[0].length;
    this.height = rows.length;

    this.startActors = [];

    this.rows = rows.map((row, y) => {
      return row.map((char, x) => {
        const type = levelChars[char];

        if (typeof type === "string") {
          return type;
        }

        this.startActors.push(type.create(new Vec(x, y), char));

        return "empty";
      });
    });
  }
}

const level01 = new Level(levelPlan01);
console.log("level01:", level01);

const render = (rows) => {
  const colors = {
    empty: "grey",
    wall: "black",
    lava: "orange",
  };

  rows.forEach((row) => {
    const rowEl = document.createElement("div");
    rowEl.style.display = "flex";
    rowEl.style.width = "fit-content";
    rowEl.style.height = "fit-content";
    rowEl.style.justifyContent = "flex-start";

    row.forEach((cell) => {
      const cellEl = document.createElement("div");

      (cellEl.style.display = "block"),
        (cellEl.style.width = "50px"),
        (cellEl.style.height = "50px"),
        (cellEl.style.backgroundColor = colors[cell]),
        rowEl.append(cellEl);
    });

    document.body.append(rowEl);
  });
};

render(level01.rows);
