const map = { one: true, two: true, hasOwnProperty: true };

const result = Object.getPrototypeOf(map).hasOwnProperty.call(map, "one");
console.log("result", result);
