# iskit

> Tiny, type-safe **predicates** — `isString`, `isNumber`, `isPlainObject`, `isEmpty`, and more, all **narrowing** TypeScript type guards. **Zero dependencies**.

[![CI](https://github.com/trananhtung/iskit/actions/workflows/ci.yml/badge.svg)](https://github.com/trananhtung/iskit/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@billdaddy/iskit.svg)](https://www.npmjs.com/package/@billdaddy/iskit)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@billdaddy/iskit)](https://bundlephobia.com/package/@billdaddy/iskit)
[![types](https://img.shields.io/npm/types/@billdaddy/iskit.svg)](https://www.npmjs.com/package/@billdaddy/iskit)
[![license](https://img.shields.io/npm/l/@billdaddy/iskit.svg)](./LICENSE)

A bag of `is*` checks you write in every project — but done once, correctly, with
real **type-guard signatures** so each check narrows the type. `isNumber` rejects
`NaN`, `isPlainObject` actually means *plain*, and `isEmpty` only calls a value
empty if it's a container. **Zero dependencies**, tree-shakeable.

```ts
import { isString, isDefined, isEmpty } from "@billdaddy/iskit";

function f(x: unknown) {
  if (isString(x)) x.toUpperCase(); // x is `string`
}

users.filter(isDefined);            // drops null/undefined, type is User[]
if (isEmpty(input)) return;         // "", [], {}, Map/Set(0) → true
```

## Why iskit?

- **Everything narrows.** Each guard carries a `value is T` signature — no casts,
  works in `if`, `filter`, ternaries.
- **Sharper than `typeof`.** `isNumber` excludes `NaN`; `isDate` rejects invalid
  dates; `isPlainObject` excludes arrays, `Map`/`Set`, and class instances.
- **Sensible `isEmpty`.** Empty means an empty *container* (string, array, object,
  `Map`/`Set`) or nullish — **not** every non-collection the way lodash does.
- **Non-empty narrowing.** `isNonEmptyArray` narrows to `[T, ...T[]]`, so `arr[0]`
  loses its `| undefined`.
- **Tree-shakeable.** `sideEffects: false`, ESM + CJS, zero dependencies.

## Install

```bash
npm install @billdaddy/iskit
# or: pnpm add @billdaddy/iskit  /  yarn add @billdaddy/iskit  /  bun add @billdaddy/iskit
```

## Primitives

```ts
import {
  isString, isNumber, isInteger, isBoolean, isBigInt, isSymbol,
  isFunction, isNull, isUndefined, isNil, isDefined, isPrimitive,
} from "@billdaddy/iskit";

isNumber(NaN);    // false  (a pass is always a usable number)
isNumber(42);     // true
isNil(null);      // true   (null | undefined)
isDefined(0);     // true   (narrows away null | undefined)
isPrimitive([]);  // false
```

## Objects

```ts
import {
  isObject, isArray, isPlainObject, isDate, isRegExp,
  isMap, isSet, isError, isPromise,
} from "@billdaddy/iskit";

isPlainObject({});            // true
isPlainObject(new Date());    // false
isPlainObject(new Foo());     // false (class instance)
isDate(new Date("nope"));     // false (invalid time)
isPromise({ then() {} });     // true  (thenables count)
```

## Emptiness

```ts
import { isEmpty, isNonEmptyString, isNonEmptyArray } from "@billdaddy/iskit";

isEmpty("");          // true
isEmpty([]);          // true
isEmpty({});          // true
isEmpty(new Set());   // true
isEmpty(0);           // false  ← not a container
isEmpty({ a: 1 });    // false

isNonEmptyString(s);  // narrows to string
isNonEmptyArray(xs);  // narrows to [T, ...T[]]
```

## Pairs well with

| Need | Use |
| --- | --- |
| Assert a condition and narrow / throw | [`assertkit`](https://www.npmjs.com/package/assertkit) |
| Deep equality / clone | [`equalkit`](https://www.npmjs.com/package/equalkit) |

## License

[MIT](./LICENSE) © Tung Tran
