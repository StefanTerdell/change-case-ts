import { Cases } from "./cases";
import { ChangeStringCase } from "./string";
import { UnionToTuple } from "./utils";

export type ChangeObjectCase<
  Object extends { [key: string]: unknown },
  FromCase extends Cases,
  ToCase extends Cases,
> =
  UnionToTuple<keyof Object> extends infer Keys extends string[]
    ? BuildObjectChangedKeys<Object, ChangeKeysCase<Keys, FromCase, ToCase>>
    : Object;

type ChangeKeysCase<
  Keys extends string[],
  FromCase extends Cases,
  ToCase extends Cases,
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
  Acc extends { [key: string]: unknown } = {},
> = ChangedKeys extends [
  {
    prevKey: infer FromKey extends keyof SourceObject;
    newKey: infer ToKey extends string;
  },
  ...infer Tail extends { prevKey: keyof SourceObject; newKey: string }[],
]
  ? BuildObjectChangedKeys<
      SourceObject,
      Tail,
      Acc & { [Key in ToKey]: SourceObject[FromKey] }
    >
  : Acc;

