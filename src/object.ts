import type { CaseName } from "./cases.ts";
import { type ChangeStringCase, changeStringCase } from "./string.ts";
import type { UnionToTuple } from "./utils.ts";

export type ChangeObjectCase<
  Object extends { [key: string]: unknown },
  FromCase extends CaseName,
  ToCase extends CaseName,
> = UnionToTuple<keyof Object> extends infer Keys extends string[]
  ? BuildObjectChangedKeys<Object, ChangeKeysCase<Keys, FromCase, ToCase>>
  : Object;

export function changeObjectCase<
  Object extends { [key: string]: unknown },
  FromCase extends CaseName,
  ToCase extends CaseName,
>(
  object: Object,
  fromCase: FromCase,
  toCase: ToCase,
): ChangeObjectCase<Object, FromCase, ToCase> {
  return Object.keys(object).reduce((acc: Record<string, unknown>, key) => {
    acc[changeStringCase(key, fromCase, toCase)] = object[key as keyof Object];
    return acc;
  }, {}) as ChangeObjectCase<Object, FromCase, ToCase>;
}

type ChangeKeysCase<
  Keys extends string[],
  FromCase extends CaseName,
  ToCase extends CaseName,
  Acc extends { prevKey: Keys[number]; newKey: string }[] = [],
> = Keys extends [infer Head extends string, ...infer Tail extends string[]]
  ? ChangeKeysCase<
    Tail,
    FromCase,
    ToCase,
    [
      ...Acc,
      { prevKey: Head; newKey: ChangeStringCase<Head, FromCase, ToCase> },
    ]
  >
  : Acc;

type BuildObjectChangedKeys<
  SourceObject extends { [key: string]: unknown },
  ChangedKeys extends { prevKey: keyof SourceObject; newKey: string }[],
  Acc extends { [key: string]: unknown } = { [key: string]: unknown },
> = ChangedKeys extends [
  {
    prevKey: infer FromKey extends keyof SourceObject;
    newKey: infer ToKey extends string;
  },
  ...infer Tail extends { prevKey: keyof SourceObject; newKey: string }[],
] ? BuildObjectChangedKeys<
    SourceObject,
    Tail,
    Acc & { [Key in ToKey]: SourceObject[FromKey] }
  >
  : Acc;
