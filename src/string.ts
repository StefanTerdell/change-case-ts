/**
 * Contains functions and types that translate string literals between cases and identifies their current case
 * @module
 */

import {
  CAMEL_CASE,
  type CamelCaseName,
  type IsCamelCase,
  isCamelCase,
  type IsPascalCase,
  isPascalCase,
  PASCAL_CASE,
  type PascalCaseName,
} from "./capitalization-delimited-cases.ts";
import {
  type IsLowerCase,
  isLowerCase,
  type IsUpperCase,
  isUpperCase,
  LOWER_CASE,
  type LowerCaseName,
  UPPER_CASE,
  type UpperCaseName,
} from "./non-delimited-cases.ts";
import {
  type IsKebabCase,
  isKebabCase,
  type IsSnakeCase,
  isSnakeCase,
  KEBAB_CASE,
  type KebabCaseName,
  SNAKE_CASE,
  type SnakeCaseName,
} from "./symbol-delimited-cases.ts";
import type { CaseName } from "./cases.ts";
import {
  type StringToWords,
  stringToWords,
  type WordsToString,
  wordsToString,
} from "./words.ts";

/** Translates a string literal type from one case to another */
export type ChangeStringCase<
  String extends string,
  FromCase extends CaseName,
  ToCase extends CaseName,
> = FromCase extends ToCase ? String
  : WordsToString<ToCase, StringToWords<FromCase, String>>;

// overload
/** Translates a string from one case to another. The current case will be auto-detected if possible. */
export function changeStringCase<
  const String extends string,
  const ToCase extends CaseName,
>(
  string: String,
  toCase: ToCase,
): DetectCaseNameFromString<String> extends infer FromCase extends CaseName
  ? ChangeStringCase<String, FromCase, ToCase>
  : String;

// overload
/** Translates a string from one provided case to another. */
export function changeStringCase<
  const String extends string,
  const FromCase extends CaseName,
  const ToCase extends CaseName,
>(
  string: String,
  fromCase: FromCase,
  toCase: ToCase,
): ChangeStringCase<String, FromCase, ToCase>;

// impl
export function changeStringCase(
  string: string,
  ...props: [CaseName, CaseName] | [CaseName]
) {
  const toCase = props.length === 2 ? props[1] : props[0];
  const fromCase = props.length === 2
    ? props[0]
    : detectCaseNameFromString(string);

  if (fromCase === undefined) {
    return string;
  }

  return wordsToString(
    toCase,
    stringToWords(fromCase, string),
  );
}

/** Attempts to identify the current case of a string literal type and return a CaseName. Returns 'undefined' if unsuccesfull */
export type DetectCaseNameFromString<String extends string> = "" extends String
  ? undefined
  : IsSnakeCase<String> extends true ? SnakeCaseName
  : IsKebabCase<String> extends true ? KebabCaseName
  : IsCamelCase<String> extends true ? CamelCaseName
  : IsPascalCase<String> extends true ? PascalCaseName
  : IsLowerCase<String> extends true ? LowerCaseName
  : IsUpperCase<String> extends true ? UpperCaseName
  : undefined;

function _detectCaseNameFromString(string: string): CaseName | undefined {
  if (!string) {
    return undefined;
  }

  if (isSnakeCase(string)) {
    return SNAKE_CASE;
  }

  if (isKebabCase(string)) {
    return KEBAB_CASE;
  }

  if (isCamelCase(string)) {
    return CAMEL_CASE;
  }

  if (isPascalCase(string)) {
    return PASCAL_CASE;
  }

  if (isLowerCase(string)) {
    return LOWER_CASE;
  }

  if (isUpperCase(string)) {
    return UPPER_CASE;
  }

  return undefined;
}

/** Attempts to identify the current case of a string literal and return a CaseName. Returns 'undefined' if unsuccesfull */
export function detectCaseNameFromString<const String extends string>(
  string: String,
): DetectCaseNameFromString<String> {
  // deno-lint-ignore no-explicit-any
  return _detectCaseNameFromString(string) as any;
}
