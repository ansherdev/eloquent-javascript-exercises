export const reverse = (arr) => {
  const reversed = [];

  for (let i = arr.length - 1; i >= 0; i--) {
    reversed.push(arr[i]);
  }

  return reversed;
};

export const reverseInPlace = (arr) => {
  const reversed = arr;
  const loopExitCondition = Math.floor(arr.length / 2);

  for (let i = 0; i < loopExitCondition; i++) {
    const temp = reversed[i];
    const j = arr.length - 1 - i;

    reversed[i] = reversed[j];
    reversed[j] = temp;
  }

  return reversed;
};
