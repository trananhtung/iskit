import { describe, it, expect } from "vitest";
import { isEmpty, isNonEmptyString, isNonEmptyArray } from "../src/index.js";

describe("isEmpty", () => {
  it("is true for nullish and empty containers", () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty("")).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty(new Map())).toBe(true);
    expect(isEmpty(new Set())).toBe(true);
  });

  it("is false for non-empty containers", () => {
    expect(isEmpty(" ")).toBe(false);
    expect(isEmpty([0])).toBe(false);
    expect(isEmpty({ a: 1 })).toBe(false);
    expect(isEmpty(new Map([["a", 1]]))).toBe(false);
    expect(isEmpty(new Set([1]))).toBe(false);
  });

  it("is false for non-container values (unlike lodash)", () => {
    expect(isEmpty(0)).toBe(false);
    expect(isEmpty(42)).toBe(false);
    expect(isEmpty(false)).toBe(false);
    expect(isEmpty(() => {})).toBe(false);
    expect(isEmpty(new Date())).toBe(false);
  });
});

describe("isNonEmptyString / isNonEmptyArray", () => {
  it("isNonEmptyString", () => {
    expect(isNonEmptyString("x")).toBe(true);
    expect(isNonEmptyString("")).toBe(false);
    expect(isNonEmptyString(1)).toBe(false);
  });

  it("isNonEmptyArray narrows to a non-empty tuple", () => {
    const arr: number[] = [1, 2];
    expect(isNonEmptyArray(arr)).toBe(true);
    if (isNonEmptyArray(arr)) {
      const first: number = arr[0]; // no `| undefined`
      expect(first).toBe(1);
    }
    expect(isNonEmptyArray([])).toBe(false);
  });
});
