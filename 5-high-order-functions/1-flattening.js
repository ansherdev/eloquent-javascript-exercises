export const flattening = (arr) => {
  return arr.reduce((flat, current) => {
    return flat.concat(current);
  }, []);
};

console.log(flattening([[1, 2, 3], [3, 4], [5]]));
