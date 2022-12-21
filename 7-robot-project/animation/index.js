// test: no
import { roads } from "../constants/roads.js";
import { mailRoute } from "../constants/mailRoute.js";

/* ----------------------------------------------------- */
/* -----------------1.BUILD ROADS GRAPH----------------- */
/* ----------------------------------------------------- */
function buildGraph(edges) {
  let graph = Object.create(null);

  const addEdge = (from, to) => {
    if (!graph[from]) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  };

  for (const [from, to] of edges.map((road) => road.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }

  return graph;
}

const roadGraph = buildGraph(roads);

/* 1.1. create helper for randomize */
function randomPick(ways) {
  let choice = Math.floor(Math.random() * ways.length);

  return ways[choice];
}

/* ----------------------------------------------------- */
/* ------------------2.VILLAGE STATE-------------------- */
/* ----------------------------------------------------- */
class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  /* 2.1 create robot move to destination method  */
  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    }

    let parcels = this.parcels.map((parcel) => {
      if (parcel.place !== this.place) {
        return parcel;
      }

      return { place: destination, address: parcel.address };
    });

    parcels = parcels.filter((parcel) => parcel.place !== parcel.address);

    return new VillageState(destination, parcels);
  }

  /* 2.2 initial random parcels state */
  static random(parcelCount = 5) {
    let parcels = [];

    for (let i = 0; i < parcelCount; i++) {
      let address = randomPick(Object.keys(roadGraph));
      let place;

      do {
        place = randomPick(Object.keys(roadGraph));
      } while (place === address);

      parcels.push({ place, address });
    }

    return new VillageState("Post Office", parcels);
  }
}

/* ----------------------------------------------------- */
/* -----------------3.RUN ROBOT FUNCTION---------------- */
/* ----------------------------------------------------- */
function runRobot(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length === 0) {
      return turn;
    }

    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
  }
}

/* ----------------------------------------------------- */
/* --------------------4.RANDOM ROBOT------------------- */
/* ----------------------------------------------------- */
function randomRobot(state) {
  return {
    name: "Random Robot",
    direction: randomPick(roadGraph[state.place]),
  };
}

runRobot(VillageState.random(), randomRobot);

/* ----------------------------------------------------- */
/* --------------------5.ROUTE ROBOT-------------------- */
/* ----------------------------------------------------- */
function routeRobot(_, memory) {
  if (memory && memory.length === 0) {
    memory = mailRoute;
  }

  return {
    name: "Route Robot",
    direction: memory[0],
    memory: memory.slice(1),
  };
}

runRobot(VillageState.random(), routeRobot, mailRoute);

/* ----------------------------------------------------- */
/* ----------------6.GOAL ORIENTED ROBOT---------------- */
/* ----------------------------------------------------- */
function findRoute(graph, from, to) {
  let work = [{ at: from, route: [] }];

  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];

    for (let place of graph[at]) {
      if (place === to) {
        return route.concat(place);
      }

      if (!work.some((w) => w.at === place)) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
}

function goalOrientedRobot({ place, parcels }, route = []) {
  if (route.length === 0) {
    let parcel = parcels[0];

    if (parcel.place !== place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }

  return {
    name: "Goal Oriented Robot",
    direction: route[0],
    memory: route.slice(1),
  };
}

runRobot(VillageState.random(), goalOrientedRobot);

/* ***************************************************** */
/* ----------------------------------------------------- */
/* ---------------------EXERCISES----------------------- */
/* ----------------------------------------------------- */
/* ***************************************************** */

/* COMPARE ROBOTS */
function compareRobots(robotStateA, robotStateB) {
  let turnsA = 0;
  let turnsB = 0;

  for (let i = 0; i < 100; i++) {
    const state = VillageState.random();

    turnsA += runRobot(state, robotStateA.robot, robotStateA.memory);
    turnsB += runRobot(state, robotStateB.robot, robotStateB.memory);
  }

  return {
    [robotStateA.name]: Math.round(turnsA / 100),
    [robotStateB.name]: Math.round(turnsB / 100),
  };
}

console.log(
  compareRobots(
    { name: "Route Robot", robot: routeRobot, memory: mailRoute },
    { name: "Goal Oriented Robot", robot: goalOrientedRobot }
  )
);

/* EFFICIENT ROBOT */
function efficientRobot() {}

(function () {
  "use strict";

  let active = null;

  const places = {
    "Alice's House": { x: 279, y: 100 },
    "Bob's House": { x: 295, y: 203 },
    Cabin: { x: 372, y: 67 },
    "Daria's House": { x: 183, y: 285 },
    "Ernie's House": { x: 50, y: 283 },
    Farm: { x: 36, y: 118 },
    "Grete's House": { x: 35, y: 187 },
    Marketplace: { x: 162, y: 110 },
    "Post Office": { x: 205, y: 57 },
    Shop: { x: 137, y: 212 },
    "Town Hall": { x: 202, y: 213 },
  };
  const placeKeys = Object.keys(places);

  const speed = 2;

  class Animation {
    constructor(worldState, robot, robotState) {
      this.worldState = worldState;
      this.robot = robot;
      this.robotState = robotState;
      this.turn = 0;

      let outer = window.__sandbox
          ? window.__sandbox.output.div
          : document.body,
        doc = outer.ownerDocument;
      this.node = outer.appendChild(doc.createElement("div"));
      this.node.style.cssText =
        "position: relative; line-height: 0.1; margin-left: 10px";
      this.map = this.node.appendChild(doc.createElement("img"));
      this.map.src = "img/village2x.png";
      this.map.style.cssText = "vertical-align: -8px";
      this.robotElt = this.node.appendChild(doc.createElement("div"));
      this.robotElt.style.cssText = `position: absolute; transition: left ${
        0.8 / speed
      }s, top ${0.8 / speed}s;`;
      let robotPic = this.robotElt.appendChild(doc.createElement("img"));
      robotPic.src = "img/robot_moving2x.gif";
      this.parcels = [];

      this.text = this.node.appendChild(doc.createElement("span"));
      this.button = this.node.appendChild(doc.createElement("button"));
      this.button.style.cssText =
        "color: white; background: #28b; border: none; border-radius: 2px; padding: 2px 5px; line-height: 1.1; font-family: sans-serif; font-size: 80%";
      this.button.textContent = "Stop";

      this.button.addEventListener("click", () => this.clicked());
      this.schedule();

      this.updateView();
      this.updateParcels();

      this.robotElt.addEventListener("transitionend", () =>
        this.updateParcels()
      );
    }

    updateView() {
      let pos = places[this.worldState.place];
      this.robotElt.style.top = pos.y - 38 + "px";
      this.robotElt.style.left = pos.x - 16 + "px";

      this.text.textContent = ` Turn ${this.turn} `;
    }

    updateParcels() {
      while (this.parcels.length) this.parcels.pop().remove();
      let heights = {};
      for (let { place, address } of this.worldState.parcels) {
        let height = heights[place] || (heights[place] = 0);
        heights[place] += 14;
        let node = document.createElement("div");
        let offset = placeKeys.indexOf(address) * 16;
        node.style.cssText =
          "position: absolute; height: 16px; width: 16px; background-image: url(img/parcel2x.png); background-position: 0 -" +
          offset +
          "px";
        if (place == this.worldState.place) {
          node.style.left = "25px";
          node.style.bottom = 20 + height + "px";
          this.robotElt.appendChild(node);
        } else {
          let pos = places[place];
          node.style.left = pos.x - 5 + "px";
          node.style.top = pos.y - 10 - height + "px";
          this.node.appendChild(node);
        }
        this.parcels.push(node);
      }
    }

    tick() {
      let { direction, memory } = this.robot(this.worldState, this.robotState);
      this.worldState = this.worldState.move(direction);
      this.robotState = memory;
      this.turn++;
      this.updateView();
      if (this.worldState.parcels.length == 0) {
        this.button.remove();
        this.text.textContent = ` Finished after ${this.turn} turns`;
        this.robotElt.firstChild.src = "img/robot_idle2x.png";
      } else {
        this.schedule();
      }
    }

    schedule() {
      this.timeout = setTimeout(() => this.tick(), 1000 / speed);
    }

    clicked() {
      if (this.timeout == null) {
        this.schedule();
        this.button.textContent = "Stop";
        this.robotElt.firstChild.src = "img/robot_moving2x.gif";
      } else {
        clearTimeout(this.timeout);
        this.timeout = null;
        this.button.textContent = "Start";
        this.robotElt.firstChild.src = "img/robot_idle2x.png";
      }
    }
  }

  window.runRobotAnimation = function (worldState, robot, robotState) {
    if (active && active.timeout != null) clearTimeout(active.timeout);
    active = new Animation(worldState, robot, robotState);
  };
})();

window.runRobotAnimation(VillageState.random(), routeRobot, mailRoute);
