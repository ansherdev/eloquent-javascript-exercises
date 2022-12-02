export const reverse = (arr) => {
  const reversed = [];

  for (let i = arr.length - 1; i >= 0; i--) {
    reversed.push(arr[i]);
  }

  return reversed;
};

export const reverseInPlace = (arr) => {
  const reversed = arr;

  const temp = reverse(arr);

  for (let i = 0; i < arr.length; i++) {
    reversed[i] = temp[i];
  }

  return reversed;
};
