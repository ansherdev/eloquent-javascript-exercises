const retry = (fn) => {};

class MultiUnitFailure extends Error {}

const primitiveMultiply = (a, b) => {
  if (Math.random() < 0.2) {
    return a * b;
  }

  throw new MultiUnitFailure("Klunk");
};

const reliableMultiply = (a, b) => {
  let isError = false;

  do {
    try {
      return primitiveMultiply(a, b);
    } catch (error) {
      if (error instanceof MultiUnitFailure) {
        console.log('error');
        isError = true;
      }
    }
  } while (isError);
};

console.log(reliableMultiply(2, 2));
