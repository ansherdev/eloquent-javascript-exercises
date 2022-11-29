import { describe, expect, test } from "@jest/globals";
import { countChar } from "./3-bean-counting";

describe("3-functions/3-bean-counting.js", () => {
  test('"bbBB" contains 2 "b"', () => {
    expect(countChar("bbBB", "b")).toBe(2);
  });

  test('"javascript" contains 2 "a"', () => {
    expect(countChar("javascript", "a")).toBe(2);
  });
  
  test('"kakkerlak" contains 4 "k"', () => {
    expect(countChar("kakkerlak", "k")).toBe(4);
  });
});
