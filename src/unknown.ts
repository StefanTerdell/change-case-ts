import type { CaseName } from "./cases.ts";
import { changeTupleCase } from "./index.ts";
import {
  type ChangeKeysCase,
  changeKeysCase,
  type ChangeTupleCase,
} from "./lib.ts";
import { type ChangeStringCase, changeStringCase } from "./string.ts";
import type { Writeable } from "./utils.ts";

export type ChangeCase<
  Value,
  FromCase extends CaseName,
  ToCase extends CaseName,
> = Value extends string ? ChangeStringCase<Value, FromCase, ToCase>
  : Value extends readonly unknown[]
    ? ChangeTupleCase<Writeable<Value>, FromCase, ToCase>
  : Value extends { [key: string]: unknown }
    ? ChangeKeysCase<Value, FromCase, ToCase>
  : Value;

export function changeCase<
  const Value,
  const FromCase extends CaseName,
  const ToCase extends CaseName,
>(
  value: Value,
  fromCase: FromCase,
  toCase: ToCase,
): ChangeCase<Value, FromCase, ToCase> {
  if (typeof value === "string") {
    // deno-lint-ignore no-explicit-any
    return changeStringCase(value as "", fromCase, toCase) as any;
  }

  if (Array.isArray(value)) {
    // deno-lint-ignore no-explicit-any
    return changeTupleCase(value as [], fromCase, toCase) as any;
  }

  if (typeof value === "object" && value !== null) {
    // deno-lint-ignore no-explicit-any
    return changeKeysCase(value as any, fromCase, toCase);
  }

  // deno-lint-ignore no-explicit-any
  return value as any;
}
