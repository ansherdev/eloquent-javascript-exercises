import { describe, expect, test } from "@jest/globals";
import { reverse, reverseInPlace } from "./2-reverse";

describe("4-object-and-arrays/2-reverse.js (reverse)", () => {
  const testArray = [1, 2, 3];

  test("[1, 2, 3] => equal [3, 2, 1]", () => {
    expect(reverse(testArray)).toEqual([3, 2, 1]);
  });

  test("is new array", () => {
    expect(reverse(testArray)).not.toBe(testArray);
  });
});

describe("4-object-and-arrays/2-reverse.js (reverseInPlace)", () => {
  const testArray = [1, 2, 3];

  test("[1, 2, 3] => equal [3, 2, 1]", () => {
    expect(reverseInPlace(testArray)).toEqual([3, 2, 1]);
  });

  test("is same array", () => {
    expect(reverseInPlace(testArray)).toBe(testArray);
  });
});
