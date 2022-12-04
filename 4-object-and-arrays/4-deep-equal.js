const isObject = (val) => typeof val === "object" && val !== null;

export const deepEqual = (a, b) => {
  if (isObject(a) && isObject(b)) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
      return false;
    }

    for (const key of keysA) {
      if (!keysB.includes(key) || !deepEqual(a[key], b[key])) {
        return false;
      }
    }

    return true;
  }

  return a === b;
};

console.log(
  deepEqual({ value: 1, name: "", address: 0 }, { value: 1, name: "" })
);
console.log(
  deepEqual(
    {
      value: 1,
      name: {
        first: "",
        second: {
          test: "1",
        },
      },
    },
    {
      value: 1,
      name: {
        first: "",
        second: {
          test: "",
        },
      },
    }
  )
);
