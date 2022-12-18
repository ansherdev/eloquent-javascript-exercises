import { roads } from "./constants/roads.js";
import { mailRoute } from "./constants/mailRoute.js";

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

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

function runRobot(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length === 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }

    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;

    console.log(`Moved to ${action.direction}`);
  }
}

function randomPick(ways) {
  let choice = Math.floor(Math.random() * ways.length);

  return ways[choice];
}

function randomRobot(state) {
  return { direction: randomPick(roadGraph[state.place]) };
}

runRobot(VillageState.random(), randomRobot);

function routeRobot(_, memory) {
  if (memory && memory.length === 0) {
    memory = mailRoute;
  }

  return { direction: memory[0], memory: memory.slice(1) };
}

function findRoute(graph, from, to) {
  let work = [{ at: from, route: [] }];

  for (let place of graph[at]) {
    if (place === to) {
      return routeRobot.concat(place);
    }
    if (!work.some((w) => w.at === place)) {
      work.push({ at: place, route: routeRobot.concat(place) });
    }
  }
}

runRobot(VillageState.random(), routeRobot);
