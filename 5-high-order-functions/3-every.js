export const every = (arr, test) => {
  for (const element of arr) {
    if (!test(element)) return false;
  }

  return true;
};

console.log(every([1, 3], (n) => n % 2 !== 0));
