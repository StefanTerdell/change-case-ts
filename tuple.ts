import { Cases } from "./cases.ts";
import { ChangeStringCase } from "./string.ts";

export type ChangeTupleCase<
  Tuple extends unknown[],
  FromCase extends Cases,
  ToCase extends Cases,
> = ChangeTupleCaseAcc<Tuple, FromCase, ToCase, []>;

type ChangeTupleCaseAcc<
  Tuple extends unknown[],
  FromCase extends Cases,
  ToCase extends Cases,
  Acc extends unknown[] = [],
> = Tuple extends [infer Head, ...infer Tail extends unknown[]]
  ? Head extends string
    ? ChangeTupleCaseAcc<
        Tail,
        FromCase,
        ToCase,
        [...Acc, ChangeStringCase<Head, FromCase, ToCase>]
      >
    : ChangeTupleCaseAcc<Tail, FromCase, ToCase, [...Acc, Head]>
  : Acc;
