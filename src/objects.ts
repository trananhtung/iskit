/** `true` for non-null objects (arrays and class instances included). */
export function isObject(value: unknown): value is object {
  return value !== null && typeof value === "object";
}

/** `true` for arrays. */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

/**
 * `true` only for plain objects — created via `{}`, `new Object()`, or
 * `Object.create(null)`. Arrays, `Map`/`Set`, `Date`, and class instances are
 * excluded.
 */
export function isPlainObject(value: unknown): value is Record<PropertyKey, unknown> {
  if (value === null || typeof value !== "object") return false;
  const proto = Object.getPrototypeOf(value) as object | null;
  if (proto === null) return true;
  const Ctor =
    Object.prototype.hasOwnProperty.call(proto, "constructor") &&
    (proto as { constructor?: unknown }).constructor;
  return typeof Ctor === "function" && Ctor === Object;
}

/** `true` for `Date` instances holding a valid time. */
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

/** `true` for `RegExp`. */
export function isRegExp(value: unknown): value is RegExp {
  return value instanceof RegExp;
}

/** `true` for `Map`. */
export function isMap(value: unknown): value is Map<unknown, unknown> {
  return value instanceof Map;
}

/** `true` for `Set`. */
export function isSet(value: unknown): value is Set<unknown> {
  return value instanceof Set;
}

/** `true` for `Error` (and subclasses). */
export function isError(value: unknown): value is Error {
  return value instanceof Error;
}

/** `true` for thenables — real promises and promise-likes alike. */
export function isPromise<T = unknown>(value: unknown): value is Promise<T> {
  return (
    value instanceof Promise ||
    (value !== null &&
      (typeof value === "object" || typeof value === "function") &&
      typeof (value as { then?: unknown }).then === "function")
  );
}
