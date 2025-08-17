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
import { type DeepKeyOf, deepKeyOf, type UnionToTuple } from "./utils.ts";

/** Attempts to identify the shared CaseName of the keys of an object type and return a CaseName. Returns 'undefined' if more than one CaseName is identified, except if one of them is a non-delimited case (upper or lower) and the only other one is not.
 *
 * @example
 * ```typescript
 * const case: DetectCaseNameFromKeys({ fooBar: 0, baz: 0 }) = "camelCase";
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
  Object extends object,
>(object: Object): DetectCaseNameFromKeys<Object> {
  return detectCaseNameFromArray(
    deepKeyOf(object),
    // deno-lint-ignore no-explicit-any
  ) as any;
}

export type ChangeKeysCase<
  Object extends object,
  FromCase extends CaseName,
  ToCase extends CaseName,
> = Object extends unknown[] ? BuildArray<Object, FromCase, ToCase>
  : Object extends Record<PropertyKey, unknown> ? BuildObject<
      Object,
      FromCase,
      ToCase
    >
  : Object;

type BuildItem<Item, FromCase extends CaseName, ToCase extends CaseName> =
  | ChangeKeysCase<Extract<Item, object>, FromCase, ToCase>
  | Exclude<Item, object>;

type BuildObject<
  SourceObject extends Record<PropertyKey, unknown>,
  FromCase extends CaseName,
  ToCase extends CaseName,
  Keys extends unknown[] = UnionToTuple<keyof SourceObject>,
  Acc extends object = object,
> = Keys extends [
  infer Head extends PropertyKey,
  ...infer Tail extends unknown[],
] ? BuildObject<
    SourceObject,
    FromCase,
    ToCase,
    Tail,
    & Acc
    & {
      [
        Key in Head extends string ? ChangeStringCase<Head, FromCase, ToCase>
          : Head
      ]: BuildItem<
        SourceObject[Head],
        FromCase,
        ToCase
      >;
    }
  >
  : Acc;

type BuildArray<
  SourceArray extends unknown[],
  FromCase extends CaseName,
  ToCase extends CaseName,
> = number extends SourceArray["length"] ? (
    BuildItem<SourceArray[number], FromCase, ToCase>
  )[]
  : BuildTuple<SourceArray, FromCase, ToCase>;

type BuildTuple<
  SourceTuple extends unknown[],
  FromCase extends CaseName,
  ToCase extends CaseName,
  Acc extends unknown[] = [],
> = SourceTuple extends [infer Head, ...infer Tail extends unknown[]]
  ? BuildTuple<
    Tail,
    FromCase,
    ToCase,
    [
      ...Acc,
      BuildItem<Head, FromCase, ToCase>,
    ]
  >
  : Acc;

// overload
/** Translates the keys within an object. The current case will be auto-detected if possible. */
export function changeKeysCase<
  Object extends object,
  ToCase extends CaseName,
>(
  object: Object,
  toCase: ToCase,
): DetectCaseNameFromKeys<Object> extends infer FromCase extends CaseName
  ? ChangeKeysCase<Object, FromCase, ToCase>
  : Object;

// overload
/** Translates the keys within an object from one provided case to another */
export function changeKeysCase<
  Object extends object,
  FromCase extends CaseName,
  ToCase extends CaseName,
>(
  object: Object,
  fromCase: FromCase,
  toCase: ToCase,
): ChangeKeysCase<Object, FromCase, ToCase>;

// impl
export function changeKeysCase(
  object: object,
  ...props: [CaseName, CaseName] | [CaseName]
) {
  const toCase = props.length === 2 ? props[1] : props[0];
  const fromCase = props.length === 2
    ? props[0]
    : detectCaseNameFromKeys(object);

  if (fromCase === undefined) {
    return object;
  }

  if (Array.isArray(object)) {
    return object.map((item) =>
      typeof item === "object" ? changeKeysCase(item, fromCase, toCase) : item
    );
  }

  if (object === null) {
    return object;
  }

  return Object.keys(object).reduce((acc: Record<string, unknown>, key) => {
    const item = object[key as keyof typeof object];

    acc[changeStringCase(key, fromCase, toCase)] = typeof item === "object"
      ? changeKeysCase(item, fromCase, toCase)
      : item;

    return acc;
  }, {});
}
