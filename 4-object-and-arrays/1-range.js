export const sum = (numbers) => {
  let result = 0;

  for (let i = 0; i < numbers.length; i++) {
    result += numbers[i];
  }

  return result;
};

export const sumReduce = (numbers) => {
  return numbers.reduce((accumulator, currentValue) => {
    return (accumulator += currentValue);
  }, 0);
};

export const range = (start, end, step = 1) => {
  const ranges = [];

  const condition = (i) => (start < end ? i <= end : i >= end);
  const count = (i) => (start < end ? i + step : i - step);

  for (let i = start; condition(i); i = count(i)) {
    ranges.push(i);
  }

  return ranges;
};
