/**
 * This module contains functions and types to change the cases of object keys
 *
 * @module
 */

import type { CaseName } from "./cases.ts";
import { type ChangeStringCase, changeStringCase } from "./string.ts";
import {
  type DetectCaseNameFromArray,
  detectCaseNameFromArray,
} from "./array.ts";
import {
  type DeepKeyOf,
  deepKeyOf,
  type UnionToTuple,
  type Writeable,
} from "./utils.ts";

/** Attempts to identify the shared CaseName of the keys of an object type and return a CaseName. Returns 'undefined' if more than one CaseName is identified, except if one of them is a non-delimited case (upper or lower) and the only other one is not.
 *
 * @example
 * ```typescript
 * const case: DetectCaseNameFromKeys<{ fooBar: 0, baz: 0 }> = "camelCase";
 * ```
 */
export type DetectCaseNameFromKeys<
  Object extends object,
> = DetectCaseNameFromArray<
  UnionToTuple<
    DeepKeyOf<Object>
  >
>;

/** Attempts to identify the shared CaseName of the keys of a given object and return a CaseName. Returns 'undefined' if more than one CaseName is identified, except if one of them is a non-delimited case (upper or lower) and the only other one is not.
 *
 * @example
 * ```typescript
 * detectCaseNameFromKeys({ fooBar: 0, baz: 0 }) satisfies "camelCase";
 * ```
 */
export function detectCaseNameFromKeys<
  const Object extends object,
>(object: Object): DetectCaseNameFromKeys<Object> {
  return detectCaseNameFromArray(
    deepKeyOf(object),
    // deno-lint-ignore no-explicit-any
  ) as any;
}

/** Deeply changes the keys (property names) of records within an object type (including arrays and tuples) */
export type ChangeKeysCase<
  Object extends object,
  ToCase extends CaseName,
  FromCase extends CaseName,
> = Object extends unknown[] ? BuildArray<Object, ToCase, FromCase>
  : Object extends Record<PropertyKey, unknown> ? BuildObject<
      Object,
      ToCase,
      FromCase
    >
  : Object;

type BuildItem<Item, ToCase extends CaseName, FromCase extends CaseName> =
  Item extends object ? ChangeKeysCase<
      Item extends readonly unknown[] ? Writeable<Item> : Item,
      ToCase,
      FromCase
    >
    : Item;

type BuildObject<
  SourceObject extends Record<PropertyKey, unknown>,
  ToCase extends CaseName,
  FromCase extends CaseName,
  Keys extends unknown[] = UnionToTuple<keyof SourceObject>,
  Acc = unknown,
> = Keys extends [
  infer Head extends PropertyKey,
  ...infer Tail extends unknown[],
] ? BuildObject<
    SourceObject,
    ToCase,
    FromCase,
    Tail,
    {
      [
        Key in
          | (Head extends string ? ChangeStringCase<Head, ToCase, FromCase>
            : Head)
          | keyof Acc
      ]: Key extends keyof Acc ? Acc[Key] : BuildItem<
        SourceObject[Head],
        ToCase,
        FromCase
      >;
    }
  >
  : Acc;

type BuildArray<
  SourceArray extends unknown[],
  ToCase extends CaseName,
  FromCase extends CaseName,
> = number extends SourceArray["length"] ? (
    BuildItem<SourceArray[number], ToCase, FromCase>
  )[]
  : BuildTuple<SourceArray, ToCase, FromCase>;

type BuildTuple<
  SourceTuple extends unknown[],
  ToCase extends CaseName,
  FromCase extends CaseName,
  Acc extends unknown[] = [],
> = SourceTuple extends [infer Head, ...infer Tail extends unknown[]]
  ? BuildTuple<
    Tail,
    ToCase,
    FromCase,
    [
      ...Acc,
      BuildItem<Head, ToCase, FromCase>,
    ]
  >
  : Acc;

// overload
/** Translates the keys within an object. The current case will be auto-detected if possible. */
export function changeKeysCase<
  Object extends object,
  const ToCase extends CaseName,
>(
  object: Object,
  toCase: ToCase,
): DetectCaseNameFromKeys<Object> extends infer FromCase extends CaseName
  ? ChangeKeysCase<Object, ToCase, FromCase>
  : Object;

// overload
/** Translates the keys within an object from one provided case to another */
export function changeKeysCase<
  Object extends object,
  const ToCase extends CaseName,
  const FromCase extends CaseName,
>(
  object: Object,
  toCase: ToCase,
  fromCase: FromCase,
): ChangeKeysCase<Object, ToCase, FromCase>;

// impl
export function changeKeysCase(
  object: object,
  toCase: CaseName,
  fromCase: CaseName | undefined = detectCaseNameFromKeys(object),
) {
  if (fromCase === undefined || toCase === fromCase) {
    return object;
  }

  if (Array.isArray(object)) {
    return object.map((item) =>
      typeof item === "object" ? changeKeysCase(item, toCase, fromCase) : item
    );
  }

  if (object === null) {
    return object;
  }

  return Object.keys(object).reduce((acc: Record<string, unknown>, key) => {
    const item = object[key as keyof typeof object];

    acc[changeStringCase(key, toCase, fromCase)] = typeof item === "object"
      ? changeKeysCase(item, toCase, fromCase)
      : item;

    return acc;
  }, {});
}
