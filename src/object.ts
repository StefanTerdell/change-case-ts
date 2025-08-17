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
import type { UnionToTuple } from "./utils.ts";

/** Attempts to identify the shared CaseName of the keys of an object type and return a CaseName. Returns 'undefined' if more than one CaseName is identified, except if one of them is a non-delimited case (upper or lower) and the only other one is not.
 *
 * @example
 * ```typescript
 * const case: DetectCaseNameFromKeys({ fooBar: 0, baz: 0 }) = "camelCase";
 * ```
 */
export type DetectCaseNameFromKeys<Object extends { [key: string]: unknown }> =
  DetectCaseNameFromArray<UnionToTuple<keyof Object>>;

/** Attempts to identify the shared CaseName of the keys of a given object and return a CaseName. Returns 'undefined' if more than one CaseName is identified, except if one of them is a non-delimited case (upper or lower) and the only other one is not.
 *
 * @example
 * ```typescript
 * detectCaseNameFromKeys({ fooBar: 0, baz: 0 }) satisfies "camelCase";
 * ```
 */
export function detectCaseNameFromKeys<
  Object extends { [key: string]: unknown },
>(object: Object): DetectCaseNameFromKeys<Object> {
  // deno-lint-ignore no-explicit-any
  return detectCaseNameFromArray(Object.keys(object)) as any;
}

// overload
/** Translates the keys within an object. The current case will be auto-detected if possible. */
export type ChangeKeysCase<
  Object extends { [key: string]: unknown },
  FromCase extends CaseName,
  ToCase extends CaseName,
> = UnionToTuple<keyof Object> extends infer Keys extends string[]
  ? BuildObjectFromKeyTuple<Object, ChangeKeyTupleCase<Keys, FromCase, ToCase>>
  : Object;

// overload
/** Translates the keys within an object from one provided case to another */
export function changeKeysCase<
  const Object extends { [key: string]: unknown },
  const ToCase extends CaseName,
>(
  object: Object,
  toCase: ToCase,
): DetectCaseNameFromKeys<Object> extends infer FromCase extends CaseName
  ? ChangeKeysCase<Object, FromCase, ToCase>
  : Object;

// impl
export function changeKeysCase<
  const Object extends { [key: string]: unknown },
  const FromCase extends CaseName,
  const ToCase extends CaseName,
>(
  object: Object,
  fromCase: FromCase,
  toCase: ToCase,
): ChangeKeysCase<Object, FromCase, ToCase>;
export function changeKeysCase(
  object: { [key: string]: unknown },
  ...props: [CaseName, CaseName] | [CaseName]
) {
  const toCase = props.length === 2 ? props[1] : props[0];
  const fromCase = props.length === 2
    ? props[0]
    : detectCaseNameFromKeys(object);

  if (fromCase === undefined) {
    return object;
  }

  return Object.keys(object).reduce((acc: Record<string, unknown>, key) => {
    acc[changeStringCase(key, fromCase, toCase)] = object[key];
    return acc;
  }, {});
}

type ChangeKeyTupleCase<
  Keys extends string[],
  FromCase extends CaseName,
  ToCase extends CaseName,
  Acc extends { prevKey: Keys[number]; newKey: string }[] = [],
> = Keys extends [infer Head extends string, ...infer Tail extends string[]]
  ? ChangeKeyTupleCase<
    Tail,
    FromCase,
    ToCase,
    [
      ...Acc,
      { prevKey: Head; newKey: ChangeStringCase<Head, FromCase, ToCase> },
    ]
  >
  : Acc;

type BuildObjectFromKeyTuple<
  SourceObject extends { [key: string]: unknown },
  ChangedKeys extends { prevKey: keyof SourceObject; newKey: string }[],
  Acc extends { [key: string]: unknown } = { [key: string]: unknown },
> = ChangedKeys extends [
  {
    prevKey: infer FromKey extends keyof SourceObject;
    newKey: infer ToKey extends string;
  },
  ...infer Tail extends { prevKey: keyof SourceObject; newKey: string }[],
] ? BuildObjectFromKeyTuple<
    SourceObject,
    Tail,
    Acc & { [Key in ToKey]: SourceObject[FromKey] }
  >
  : Acc;
