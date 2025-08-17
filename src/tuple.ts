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

export type DetectCaseNameFromTuple<Tuple extends unknown[]> =
  DetectSingleCaseNameFromTuple<Tuple>;

// This nearly killed me. Thank you for your attention to this matter.
type DetectSingleCaseNameFromTuple<
  Tuple extends unknown[],
  Prev extends CaseName | undefined = undefined,
> = Tuple extends [infer Head, ...infer Tail extends unknown[]]
  /* Head exists */ ? Head extends string
    /* Head is string */ ? DetectCaseNameFromString<Head> extends
      infer Head extends CaseName
      /* Head is a CaseName */ ? Prev extends Head | undefined
        /* Prev is undefined or same as Head */ ? DetectSingleCaseNameFromTuple<
          Tail,
          Head
        > // Continue with Head
      /* Prev is set and not the same as head */ : Prev extends
        NonDelimitedCaseName
        /* Prev is non-delimited */ ? Head extends NonDelimitedCaseName
          /* Head is also non-delimited */ ? undefined // Exit out due to conflict
        /* Head is delimited */ : DetectSingleCaseNameFromTuple<Tail, Head> // Continue with Head as the only delimited case
      /* Prev is delimited */ : Head extends NonDelimitedCaseName
        /* Head is non-delimited */ ? DetectSingleCaseNameFromTuple<Tail, Prev> // Continue with Prev as the only delimited case
      /* Head is also delimited */ : undefined // Exit out due to conflict
    /* Head is not a CaseName */ : DetectSingleCaseNameFromTuple<Tail, Prev> // Continue with Prev
  /* Head is not a string */ : DetectSingleCaseNameFromTuple<Tail, Prev> // Continue with Prev
  /* Head does not exist (tuple empty) */ : Prev; // Exit out with Prev;

export function detectCaseNameFromTuple<const Tuple extends unknown[]>(
  tuple: Tuple,
): DetectCaseNameFromTuple<Tuple> {
  // deno-lint-ignore no-explicit-any
  return _detectCaseNameFromTuple(tuple) as any;
}

function _detectCaseNameFromTuple(
  tuple: unknown[],
): CaseName | undefined {
  let found: CaseName | undefined = undefined;

  for (const item of tuple) {
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

export type ChangeTupleCase<
  Tuple extends unknown[],
  FromCase extends CaseName,
  ToCase extends CaseName,
> = ChangeTupleCaseAcc<Tuple, FromCase, ToCase, []>;

type ChangeTupleCaseAcc<
  Tuple extends unknown[],
  FromCase extends CaseName,
  ToCase extends CaseName,
  Acc extends unknown[] = [],
> = Tuple extends [infer Head, ...infer Tail extends unknown[]]
  ? Head extends string ? ChangeTupleCaseAcc<
      Tail,
      FromCase,
      ToCase,
      [...Acc, ChangeStringCase<Head, FromCase, ToCase>]
    >
  : ChangeTupleCaseAcc<Tail, FromCase, ToCase, [...Acc, Head]>
  : Acc;

export function changeTupleCase<
  const Tuple extends unknown[],
  const ToCase extends CaseName,
>(
  tuple: Tuple,
  toCase: ToCase,
): DetectCaseNameFromTuple<Tuple> extends infer FromCase extends CaseName
  ? ChangeTupleCase<Tuple, FromCase, ToCase>
  : Tuple;
export function changeTupleCase<
  const Tuple extends unknown[],
  const FromCase extends CaseName,
  const ToCase extends CaseName,
>(
  tuple: Tuple,
  fromCase: FromCase,
  toCase: ToCase,
): ChangeTupleCase<Tuple, FromCase, ToCase>;
export function changeTupleCase(
  tuple: unknown[],
  ...props: [CaseName, CaseName] | [CaseName]
) {
  const toCase = props.length === 2 ? props[1] : props[0];
  const fromCase = props.length === 2
    ? props[0]
    : detectCaseNameFromTuple(tuple);

  if (fromCase === undefined) {
    return tuple;
  }

  return tuple.map((item) =>
    typeof item === "string" ? changeStringCase(item, fromCase, toCase) : item
  );
}
