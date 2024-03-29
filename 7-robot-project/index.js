import { roads } from "./constants/roads.js";
import { mailRoute } from "./constants/mailRoute.js";

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
function efficientRobot({ place, parcels }, route = []) {
  if (route.length === 0) {
    let routes = parcels.map((parcel) => {
      if (parcel.place !== place) {
        return {
          route: findRoute(roadGraph, place, parcel.place),
          pickUp: true,
        };
      } else {
        return {
          route: findRoute(roadGraph, place, parcel.address),
          pickUp: false,
        };
      }
    });

    const score = ({ route, pickUp }) => (pickUp ? 0.5 : 0 - route.length);

    route = routes.reduce((a, b) => (score(a) > score(b) ? a : b)).route;
  }

  return { direction: route[0], memory: route.slice(1) };
}

console.log(
  compareRobots(
    { name: "Goal Oriented Robot", robot: goalOrientedRobot },
    { name: "Efficient Robot", robot: efficientRobot }
  )
);
