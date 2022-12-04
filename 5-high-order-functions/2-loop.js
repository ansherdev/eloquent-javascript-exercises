export const loop = (n, condition, update, fn) => {
  for (let i = n; condition(i); i = update(i)) {
    fn(i);
  }
};

loop(
  1,
  (i) => i <= 10,
  (i) => i + 2,
  console.log
);
