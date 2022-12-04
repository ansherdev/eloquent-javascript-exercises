const testArray = [1, 2, 3];

const testList = {
  value: 1,
  rest: {
    value: 2,
    rest: {
      value: 3,
      rest: {
        value: 4,
        rest: null,
      },
    },
  },
};

const arrayToList = (arr) => {
  let list = null;

  for (let i = arr.length - 1; i >= 0; i--) {
    list = {
      value: arr[i],
      rest: list,
    };
  }

  return list;
};

const listToArray = (list) => {
  const arr = [];

  for (let node = list; node !== null; node = node.rest) {
    arr.push(node.value);
  }

  return arr;
};

const prepend = (value, list) => {
  return { value, rest: list };
};

const nth = (list, position) => {
  let counter = 0;
  let value;

  for (let node = list; node !== null; node = node.rest) {
    if (position === counter) {
      value = node.value;
      break;
    }

    counter++;
  }

  return value;
};

const nthRecursive = (list, position, counter = 0) => {
  if (list === null) {
    return;
  }

  if (position === counter) {
    return list.value;
  }

  return nthRecursive(list.rest, position, counter + 1);
};

/* book solution */
const nthRecursiveImproved = (list, position) => {
  if (list === null) {
    return;
  }

  if (position === 0) {
    return list.value;
  }

  return nthRecursiveImproved(list.rest, position - 1);
};

console.log("arrayToList", arrayToList(testArray));
console.log("listToArray", listToArray(testList));
console.log("prepend", prepend(10, arrayToList([1, 2, 3, 4])));
console.log("nth", nth(arrayToList([1, 2, 3, 4]), 1));
console.log("nthRecursive", nthRecursive(arrayToList([1, 2, 3, 4]), 1));
console.log(
  "nthRecursiveImproved",
  nthRecursiveImproved(arrayToList([1, 2, 3, 4]), 1)
);
