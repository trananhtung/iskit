import { describe, it, expect } from "vitest";
import {
  isString,
  isNumber,
  isInteger,
  isBoolean,
  isBigInt,
  isSymbol,
  isFunction,
  isNull,
  isUndefined,
  isNil,
  isDefined,
  isPrimitive,
} from "../src/index.js";

describe("primitive guards", () => {
  it("isString", () => {
    expect(isString("")).toBe(true);
    expect(isString("x")).toBe(true);
    expect(isString(1)).toBe(false);
    expect(isString(new String("x"))).toBe(false); // boxed is not a string primitive
  });

  it("isNumber excludes NaN", () => {
    expect(isNumber(0)).toBe(true);
    expect(isNumber(-1.5)).toBe(true);
    expect(isNumber(NaN)).toBe(false);
    expect(isNumber(Infinity)).toBe(true);
    expect(isNumber("1")).toBe(false);
  });

  it("isInteger", () => {
    expect(isInteger(5)).toBe(true);
    expect(isInteger(5.5)).toBe(false);
    expect(isInteger(NaN)).toBe(false);
  });

  it("isBoolean / isBigInt / isSymbol", () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(0)).toBe(false);
    expect(isBigInt(1n)).toBe(true);
    expect(isBigInt(1)).toBe(false);
    expect(isSymbol(Symbol())).toBe(true);
  });

  it("isFunction", () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(class {})).toBe(true);
    expect(isFunction({})).toBe(false);
  });

  it("isNull / isUndefined / isNil / isDefined", () => {
    expect(isNull(null)).toBe(true);
    expect(isNull(undefined)).toBe(false);
    expect(isUndefined(undefined)).toBe(true);
    expect(isNil(null)).toBe(true);
    expect(isNil(undefined)).toBe(true);
    expect(isNil(0)).toBe(false);
    expect(isDefined(0)).toBe(true);
    expect(isDefined(null)).toBe(false);
  });

  it("isPrimitive", () => {
    expect(isPrimitive("x")).toBe(true);
    expect(isPrimitive(1)).toBe(true);
    expect(isPrimitive(null)).toBe(true);
    expect(isPrimitive(undefined)).toBe(true);
    expect(isPrimitive(Symbol())).toBe(true);
    expect(isPrimitive({})).toBe(false);
    expect(isPrimitive([])).toBe(false);
    expect(isPrimitive(() => {})).toBe(false);
  });

  it("narrows types (compile + runtime)", () => {
    const v: string | number = "hi" as string | number;
    if (isString(v)) expect(v.toUpperCase()).toBe("HI");
    const w: number | undefined = 5 as number | undefined;
    if (isDefined(w)) expect(w + 1).toBe(6);
  });
});
