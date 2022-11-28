import { describe, expect, test } from "@jest/globals";
import { min_v1, min_v2 } from "./1-minimum";

describe("3-functions/1-minimum.js (min_v1)", () => {
  test("(0, 10): 0 is minimum", () => {
    expect(min_v1(0, 10)).toBe(0);
  });

  test("(0, -10): -10 is minimum ", () => {
    expect(min_v1(0, -10)).toBe(-10);
  });

  test("(25, 25): 25 is minimum ", () => {
    expect(min_v1(25, 25)).toBe(25);
  });
});

describe("3-functions/1-minimum.js (min_v2)", () => {
  test("(0, 10): 0 is minimum", () => {
    expect(min_v2(0, 10)).toBe(0);
  });

  test("(0, -10): -10 is minimum ", () => {
    expect(min_v2(0, -10)).toBe(-10);
  });

  test("([no_args]): Infinity is minimum", () => {
    expect(min_v2()).toBe(Infinity);
  });

  test("(undefined, 45): 45 is minimum ", () => {
    expect(min_v2(undefined, 45)).toBe(45);
  });

  test("(80, undefined): 80 is minimum ", () => {
    expect(min_v2(80)).toBe(80);
  });

  test("(15, 35): 15 is minimum ", () => {
    expect(min_v2(15, 35)).toBe(15);
  });

  test("(-74, 146): -74 is minimum ", () => {
    expect(min_v2(-74, 146)).toBe(-74);
  });
});
