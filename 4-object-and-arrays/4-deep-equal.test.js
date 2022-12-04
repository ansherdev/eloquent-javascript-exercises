import { describe, expect, test } from "@jest/globals";
import { deepEqual } from "./4-deep-equal";

describe("4-object-and-arrays/4-deep-equal.js", () => {
  test('{ value: 1, name: "", address: 0 } equal { value: 1, name: "", address: 0 }', () => {
    expect(
      deepEqual(
        { value: 1, name: "", address: 0 },
        { value: 1, name: "", address: 0 }
      )
    ).toBeTruthy();
  });

  test('{ value: 1, name: "", address: { test: "1" } } NOT equal { value: 1, name: "", address: 0 }', () => {
    expect(
      deepEqual(
        { value: 1, name: "", address: { test: "1" } },
        { value: 1, name: "", address: 0 }
      )
    ).toBeFalsy();
  });
});
