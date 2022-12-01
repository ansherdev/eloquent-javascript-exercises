import { describe, expect, test } from "@jest/globals";
import { range } from "./1-range";

describe("4-object-and-arrays/1-range.js", () => {
  test("range from 1 to 10: result [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]", () => {
    expect(range(1, 10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  test("range from 10 to 1: result [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]", () => {
    expect(range(10, 1)).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
  });
});
