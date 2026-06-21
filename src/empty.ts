import { isPlainObject } from "./objects.js";

/**
 * `true` when a value holds nothing:
 * - `null` / `undefined`
 * - empty string
 * - empty array
 * - empty `Map` / `Set`
 * - plain object with no own enumerable keys
 *
 * Numbers, booleans, functions, dates, and other non-container values are
 * **never** empty (unlike lodash, which calls every non-collection empty).
 *
 * ```ts
 * isEmpty("");           // true
 * isEmpty([]);           // true
 * isEmpty({});           // true
 * isEmpty(new Set());    // true
 * isEmpty(0);            // false
 * isEmpty({ a: 1 });     // false
 * ```
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string" || Array.isArray(value)) return value.length === 0;
  if (value instanceof Map || value instanceof Set) return value.size === 0;
  if (isPlainObject(value)) return Object.keys(value).length === 0;
  return false;
}

/** `true` for a non-empty string (after no trimming). Narrows to `string`. */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

/** `true` for a non-empty array. Narrows to a tuple with at least one element. */
export function isNonEmptyArray<T>(value: readonly T[]): value is [T, ...T[]] {
  return value.length > 0;
}
