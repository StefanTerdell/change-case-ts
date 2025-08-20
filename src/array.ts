/**
 * This module contains functions and types to change the cases of items within tuples and arrays
 *
 * @module
 */

import type { CaseName } from "./cases.ts";
import {
  isNonDelimitedCaseName,
  type NonDelimitedCaseName,
} from "./non-delimited-cases.ts";
import {
  type ChangeStringCase,
  changeStringCase,
  type DetectCaseNameFromString,
  detectCaseNameFromString,
} from "./string.ts";
import type { UnionToTuple } from "./utils.ts";

/* Attempts to extract a common CaseName for the string literal types within a tuple or array type. Returns 'undefined' if more than one CaseName is identified, except if one of them is a non-delimited case (upper or lower) and the only other one is not.
 *
 * @example
 * ```typescript
 * const case: DetectCaseNameFromArray<[123, "foo-bar", "baz"]> = "kebab-case";
 * ```
*/
export type DetectCaseNameFromArray<Array extends unknown[]> = number extends
  Array["length"]
  ? Array extends (infer Item)[] ? DetectCaseNameFromTuple<UnionToTuple<Item>>
  : undefined
  : DetectCaseNameFromTuple<Array>;

// THIS DAMN WELL NEARLY KILLED ME. THANK YOU FOR YOUR ATTENTION TO THIS MATTER.
type DetectCaseNameFromTuple<
  Tuple extends unknown[],
  Prev extends CaseName | undefined = undefined,
> = Tuple extends [infer Head, ...infer Tail extends unknown[]]
  /* Head exists */ ? Head extends string
    /* Head is string */ ? DetectCaseNameFromString<Head> extends
      infer Head extends CaseName
      /* Head is a CaseName */ ? Prev extends Head | undefined
        /* Prev is undefined or same as Head */ ? DetectCaseNameFromTuple<
          Tail,
          Head
        > // Continue with Head
      /* Prev is set and not the same as head */ : Prev extends
        NonDelimitedCaseName
        /* Prev is non-delimited */ ? Head extends NonDelimitedCaseName
          /* Head is also non-delimited */ ? undefined // Exit out due to conflict
        /* Head is delimited */ : DetectCaseNameFromTuple<Tail, Head> // Continue with Head as the only delimited case
      /* Prev is delimited */ : Head extends NonDelimitedCaseName
        /* Head is non-delimited */ ? DetectCaseNameFromTuple<Tail, Prev> // Continue with Prev as the only delimited case
      /* Head is also delimited */ : undefined // Exit out due to conflict
    /* Head is not a CaseName */ : DetectCaseNameFromTuple<Tail, Prev> // Continue with Prev
  /* Head is not a string */ : DetectCaseNameFromTuple<Tail, Prev> // Continue with Prev
  /* Head does not exist (tuple empty) */ : Prev; // Exit out with Prev;

/* Attempts to extract a common CaseName for the string literals within a tuple or array. Returns 'undefined' if more than one CaseName is identified, except if one of them is a non-delimited case (upper or lower) and the only other one is not.
 *
 * @example
 * ```typescript
 * detectCaseNameFromArray([123, "foo-bar", "baz"]) satisfies "kebab-case";
 * ```
*/
export function detectCaseNameFromArray<const Array extends unknown[]>(
  array: Array,
): DetectCaseNameFromArray<Array> | undefined {
  let found: CaseName | undefined = undefined;

  for (const item of array) {
    if (typeof item === "string") {
      const curr = detectCaseNameFromString(item);

      if (curr !== undefined) {
        if (found === undefined) {
          found = curr;
        } else if (found !== curr) {
          if (isNonDelimitedCaseName(found)) {
            if (isNonDelimitedCaseName(curr)) {
              return undefined;
            } else {
              found = curr;
            }
          } else if (!isNonDelimitedCaseName(curr)) {
            return undefined;
          }
        }
      }
    }
  }

  return found;
}

/** Changes the case of the items within a string literal union array or tuple type */
export type ChangeArrayCase<
  Array extends unknown[],
  FromCase extends CaseName,
  ToCase extends CaseName,
> = number extends Array["length"]
  ? Array extends (infer Item)[]
    ? (ChangeTupleCase<UnionToTuple<Item>, FromCase, ToCase>[number])[]
  : Array
  : ChangeTupleCase<Array, FromCase, ToCase>;

type ChangeTupleCase<
  Tuple extends unknown[],
  FromCase extends CaseName,
  ToCase extends CaseName,
  Acc extends unknown[] = [],
> = Tuple extends [infer Head, ...infer Tail extends unknown[]]
  ? Head extends string ? ChangeTupleCase<
      Tail,
      FromCase,
      ToCase,
      [...Acc, ChangeStringCase<Head, FromCase, ToCase>]
    >
  : ChangeTupleCase<Tail, FromCase, ToCase, [...Acc, Head]>
  : Acc;

// overload
/** Translates the cases of any string literals within an array-like value (tuple or array). The current case will be auto-detected if possible. */
export function changeArrayCase<
  const Array extends unknown[],
  const ToCase extends CaseName,
>(
  array: Array,
  toCase: ToCase,
): DetectCaseNameFromArray<Array> extends infer FromCase extends CaseName
  ? ChangeArrayCase<Array, FromCase, ToCase>
  : Array;

// overload
/** Translates the cases of any string literals within an array-like value (tuple or array) from one provided case to another. */
export function changeArrayCase<
  const Array extends unknown[],
  const FromCase extends CaseName,
  const ToCase extends CaseName,
>(
  array: Array,
  fromCase: FromCase,
  toCase: ToCase,
): ChangeArrayCase<Array, FromCase, ToCase>;

// impl
export function changeArrayCase(
  array: unknown[],
  ...props: [fromCase: CaseName, toCase: CaseName] | [toCase: CaseName]
) {
  const toCase = props.length === 2 ? props[1] : props[0];
  const fromCase = props.length === 2
    ? props[0]
    : detectCaseNameFromArray(array);

  if (fromCase === undefined) {
    return array;
  }

  return array.map((item) =>
    typeof item === "string" ? changeStringCase(item, fromCase, toCase) : item
  );
}
