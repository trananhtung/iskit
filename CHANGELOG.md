# Changelog

All notable changes to this project are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-06-22

### Added

- Primitive guards: `isString`, `isNumber` (excludes `NaN`), `isInteger`,
  `isBoolean`, `isBigInt`, `isSymbol`, `isFunction`, `isNull`, `isUndefined`,
  `isNil`, `isDefined` (narrows `NonNullable<T>`), `isPrimitive`.
- Object guards: `isObject`, `isArray`, `isPlainObject` (excludes arrays,
  `Map`/`Set`, class instances), `isDate` (valid time), `isRegExp`, `isMap`,
  `isSet`, `isError`, `isPromise` (thenables).
- Emptiness: `isEmpty` (containers + nullish only), `isNonEmptyString`,
  `isNonEmptyArray` (narrows to `[T, ...T[]]`).
- Every predicate is a narrowing TypeScript type guard.
- ESM + CJS builds, types, and CI across Node 18 / 20 / 22.
