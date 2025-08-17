import type { CaseName } from "./cases.ts";
import { type ChangeStringCase, changeStringCase } from "./string.ts";
import {
  type DetectCaseNameFromTuple,
  detectCaseNameFromTuple,
} from "./tuple.ts";
import type { UnionToTuple } from "./utils.ts";

export type DetectCaseNameFromKeys<Object extends { [key: string]: unknown }> =
  DetectCaseNameFromTuple<UnionToTuple<keyof Object>>;

export function detectCaseNameFromKeys<
  Object extends { [key: string]: unknown },
>(object: Object): DetectCaseNameFromKeys<Object> {
  // deno-lint-ignore no-explicit-any
  return detectCaseNameFromTuple(Object.keys(object)) as any;
}

export type ChangeKeysCase<
  Object extends { [key: string]: unknown },
  FromCase extends CaseName,
  ToCase extends CaseName,
> = UnionToTuple<keyof Object> extends infer Keys extends string[]
  ? BuildObjectFromKeyTuple<Object, ChangeKeyTupleCase<Keys, FromCase, ToCase>>
  : Object;

export function changeKeysCase<
  const Object extends { [key: string]: unknown },
  const ToCase extends CaseName,
>(
  object: Object,
  toCase: ToCase,
): DetectCaseNameFromKeys<Object> extends infer FromCase extends CaseName
  ? ChangeKeysCase<Object, FromCase, ToCase>
  : Object;
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
