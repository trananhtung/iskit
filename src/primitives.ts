/** `true` for strings. */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}

/** `true` for real numbers — **excludes `NaN`** so a pass is always usable. */
export function isNumber(value: unknown): value is number {
  return typeof value === "number" && !Number.isNaN(value);
}

/** `true` for safe integers. */
export function isInteger(value: unknown): value is number {
  return Number.isInteger(value);
}

/** `true` for booleans. */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

/** `true` for `bigint`. */
export function isBigInt(value: unknown): value is bigint {
  return typeof value === "bigint";
}

/** `true` for symbols. */
export function isSymbol(value: unknown): value is symbol {
  return typeof value === "symbol";
}

/** `true` for any callable. */
export function isFunction(value: unknown): value is (...args: never[]) => unknown {
  return typeof value === "function";
}

/** `true` only for `null`. */
export function isNull(value: unknown): value is null {
  return value === null;
}

/** `true` only for `undefined`. */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

/** `true` for `null` or `undefined`. */
export function isNil(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

/** `true` for everything except `null`/`undefined`; narrows away nullability. */
export function isDefined<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

/** `true` for primitives (string, number, boolean, bigint, symbol, null, undefined). */
export function isPrimitive(
  value: unknown,
): value is string | number | boolean | bigint | symbol | null | undefined {
  return value === null || (typeof value !== "object" && typeof value !== "function");
}
