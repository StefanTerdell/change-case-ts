import {
  type ChangeArrayCase,
  changeArrayCase,
  type DetectCaseNameFromArray,
  detectCaseNameFromArray,
} from "./array.ts";
import type { CaseName } from "./cases.ts";
import {
  type ChangeKeysCase,
  changeKeysCase,
  type DetectCaseNameFromKeys,
  detectCaseNameFromKeys,
} from "./object.ts";
import {
  type ChangeStringCase,
  changeStringCase,
  type DetectCaseNameFromString,
  detectCaseNameFromString,
} from "./string.ts";
import type { Writeable } from "./utils.ts";

/** Attempts to identify the common CaseName of a provided type. */
export type DetectCaseName<Value> = Value extends string
  ? DetectCaseNameFromString<Value>
  : Value extends readonly unknown[] ? DetectCaseNameFromArray<Writeable<Value>>
  : Value extends object ? DetectCaseNameFromKeys<Value>
  : undefined;

/** Attempts to identify the common CaseName of a provided value. */
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
    return detectCaseNameFromArray(value);
  }

  if (typeof value === "object" && value !== null) {
    // deno-lint-ignore no-explicit-any
    return detectCaseNameFromKeys(value as any);
  }

  return undefined;
}

/** Changes the case of a provided type. */
export type ChangeCase<
  Value,
  ToCase extends CaseName,
  FromCase extends CaseName,
> = Value extends string ? ChangeStringCase<Value, ToCase, FromCase>
  : Value extends readonly unknown[]
    ? ChangeArrayCase<Writeable<Value>, ToCase, FromCase>
  : Value extends { [key: string]: unknown }
    ? ChangeKeysCase<Value, ToCase, FromCase>
  : Value;

// overload
/** Changes the case of a provided value. */
export function changeCase<const Value, const ToCase extends CaseName>(
  value: Value,
  toCase: ToCase,
): DetectCaseName<Value> extends infer FromCase extends CaseName
  ? ChangeCase<Value, ToCase, FromCase>
  : Value;

// overload
/** Changes the case of a provided value. */
export function changeCase<
  const Value,
  const ToCase extends CaseName,
  const FromCase extends CaseName,
>(
  value: Value,
  toCase: ToCase,
  fromCase: FromCase,
): ChangeCase<Value, ToCase, FromCase>;

// impl
export function changeCase(
  value: unknown,
  toCase: CaseName,
  fromCase: CaseName | undefined = detectCaseName(value),
) {
  if (!value) {
    return value;
  }

  if (fromCase === undefined || toCase === fromCase) {
    return value;
  }

  if (typeof value === "string") {
    return changeStringCase(value, toCase, fromCase);
  }

  if (Array.isArray(value)) {
    return changeArrayCase(value, toCase, fromCase);
  }

  if (typeof value === "object") {
    return changeKeysCase(
      value as { [key: string]: unknown },
      toCase,
      fromCase,
    );
  }

  return value;
}
