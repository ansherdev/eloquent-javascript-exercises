/* my solution */
const min_v1 = (a, b) => (a < b ? a : b);

const min_v2 = (a, b) => {
  if (a === undefined && b === undefined) return Infinity;
  if (a === undefined || b === undefined) return a || b;

  return a < b ? a : b;
};

module.exports = { min_v1, min_v2 };
