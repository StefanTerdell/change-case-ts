import { CaseName } from "./cases.ts";
import { ChangeStringCase, changeStringCase } from "./string.ts";

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
  Tuple extends unknown[],
  FromCase extends CaseName,
  ToCase extends CaseName,
>(
  tuple: Tuple,
  fromCase: FromCase,
  toCase: ToCase,
): ChangeTupleCase<Tuple, FromCase, ToCase> {
  return tuple.map((item) =>
    typeof item === "string" ? changeStringCase(item, fromCase, toCase) : item
  ) as ChangeTupleCase<Tuple, FromCase, ToCase>;
}
