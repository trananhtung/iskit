import { describe, it, expect } from "vitest";
import {
  isObject,
  isArray,
  isPlainObject,
  isDate,
  isRegExp,
  isMap,
  isSet,
  isError,
  isPromise,
} from "../src/index.js";

describe("object guards", () => {
  it("isObject excludes null", () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(true);
    expect(isObject(null)).toBe(false);
    expect(isObject(1)).toBe(false);
  });

  it("isArray", () => {
    expect(isArray([])).toBe(true);
    expect(isArray({})).toBe(false);
  });

  it("isPlainObject distinguishes plain from class/array/etc.", () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({ a: 1 })).toBe(true);
    expect(isPlainObject(Object.create(null))).toBe(true);
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject(new Date())).toBe(false);
    expect(isPlainObject(new Map())).toBe(false);
    expect(isPlainObject(null)).toBe(false);
    class Foo {}
    expect(isPlainObject(new Foo())).toBe(false);
  });

  it("isDate requires a valid time", () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate(new Date("invalid"))).toBe(false);
    expect(isDate(Date.now())).toBe(false); // a number, not a Date
  });

  it("isRegExp / isMap / isSet / isError", () => {
    expect(isRegExp(/x/)).toBe(true);
    expect(isMap(new Map())).toBe(true);
    expect(isSet(new Set())).toBe(true);
    expect(isError(new Error("x"))).toBe(true);
    expect(isError(new TypeError("x"))).toBe(true);
    expect(isError({ message: "x" })).toBe(false);
  });

  it("isPromise accepts promises and thenables", () => {
    expect(isPromise(Promise.resolve())).toBe(true);
    expect(isPromise({ then: () => {} })).toBe(true);
    expect(isPromise({ then: 1 })).toBe(false);
    expect(isPromise({})).toBe(false);
  });
});
