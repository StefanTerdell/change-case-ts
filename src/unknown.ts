import type { CaseName } from "./cases.ts";
import { changeTupleCase } from "./index.ts";
import {
  type ChangeKeysCase,
  changeKeysCase,
  type ChangeTupleCase,
} from "./lib.ts";
import {
  type DetectCaseNameFromKeys,
  detectCaseNameFromKeys,
} from "./object.ts";
import {
  type ChangeStringCase,
  changeStringCase,
  type DetectCaseNameFromString,
  detectCaseNameFromString,
} from "./string.ts";
import {
  type DetectCaseNameFromTuple,
  detectCaseNameFromTuple,
} from "./tuple.ts";
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

export type DetectCaseName<Value> = Value extends string
  ? DetectCaseNameFromString<Value>
  : Value extends readonly unknown[] ? DetectCaseNameFromTuple<Writeable<Value>>
  : Value extends { [key: string]: unknown } ? DetectCaseNameFromKeys<Value>
  : undefined;

export function detectCaseName<const Value>(
  value: Value,
): DetectCaseName<Value>;
export function detectCaseName(
  value: unknown,
): CaseName | undefined {
  if (!value) {
    return undefined;
  }

  if (typeof value === "string") {
    return detectCaseNameFromString(value);
  }

  if (Array.isArray(value)) {
    return detectCaseNameFromTuple(value);
  }

  if (typeof value === "object" && value !== null) {
    // deno-lint-ignore no-explicit-any
    return detectCaseNameFromKeys(value as any);
  }

  return undefined;
}

export function changeCase<const Value, const ToCase extends CaseName>(
  value: Value,
  toCase: ToCase,
): DetectCaseName<Value> extends infer FromCase extends CaseName
  ? ChangeCase<Value, FromCase, ToCase>
  : Value;
export function changeCase<
  const Value,
  const FromCase extends CaseName,
  const ToCase extends CaseName,
>(
  value: Value,
  fromCase: FromCase,
  toCase: ToCase,
): ChangeCase<Value, FromCase, ToCase>;
export function changeCase(
  value: unknown,
  ...props: [CaseName, CaseName] | [CaseName]
) {
  if (!value) {
    return value;
  }

  const toCase = props.length === 2 ? props[1] : props[0];
  const fromCase = props.length === 2 ? props[0] : detectCaseName(value);

  if (fromCase === undefined) {
    return value;
  }

  if (typeof value === "string") {
    return changeStringCase(value, fromCase, toCase);
  }

  if (Array.isArray(value)) {
    return changeTupleCase(value, fromCase, toCase);
  }

  if (typeof value === "object") {
    return changeKeysCase(
      value as { [key: string]: unknown },
      fromCase,
      toCase,
    );
  }

  return value;
}
