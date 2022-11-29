import { describe, expect, test } from "@jest/globals";
import { isEven } from "./2-recursion";

describe("3-functions/2-recursion.js", () => {
  test("50 is even", () => {
    expect(isEven(50)).toBeTruthy();
  });

  test("75 is NOT even", () => {
    expect(isEven(75)).toBeFalsy();
  });

  test("-1 is NOT even", () => {
    expect(isEven(-1)).toBeFalsy();
  });

  test("-2 is even", () => {
    expect(isEven(-2)).toBeTruthy();
  });
});
