import {
  CAMEL_CASE,
  type CamelCaseName,
  type CapitalizationDelimitedCaseName,
  type IsCamelCase,
  isCamelCase,
  isCapitalizationDelimitedCaseName,
  type IsPascalCase,
  isPascalCase,
  PASCAL_CASE,
  type PascalCaseName,
} from "./capitalization-delimited-cases.ts";
import {
  type IsLowerCase,
  isLowerCase,
  isNonDelimitedCaseName,
  type IsUpperCase,
  isUpperCase,
  LOWER_CASE,
  type LowerCaseName,
  type NonDelimitedCaseName,
  UPPER_CASE,
  type UpperCaseName,
} from "./non-delimited-cases.ts";
import {
  type IsKebabCase,
  isKebabCase,
  type IsSnakeCase,
  isSnakeCase,
  isSymbolDelimitedCaseName,
  KEBAB_CASE,
  type KebabCaseName,
  SNAKE_CASE,
  type SnakeCaseName,
  type SymbolDelimitedCaseName,
} from "./symbol-delimited-cases.ts";

export type CaseName =
  | NonDelimitedCaseName
  | SymbolDelimitedCaseName
  | CapitalizationDelimitedCaseName;

export function isCaseName(caseName: string): caseName is CaseName {
  return (
    isNonDelimitedCaseName(caseName) ||
    isSymbolDelimitedCaseName(caseName) ||
    isCapitalizationDelimitedCaseName(caseName)
  );
}

export type DetectCaseName<String extends string> = String extends ""
  ? undefined
  : IsSnakeCase<String> extends true ? SnakeCaseName
  : IsKebabCase<String> extends true ? KebabCaseName
  : IsCamelCase<String> extends true ? CamelCaseName
  : IsPascalCase<String> extends true ? PascalCaseName
  : IsLowerCase<String> extends true ? LowerCaseName
  : IsUpperCase<String> extends true ? UpperCaseName
  : undefined;

function _detectCaseName(string: string): CaseName | undefined {
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

export function detectCaseName<String extends string>(
  string: String,
): DetectCaseName<String> {
  // deno-lint-ignore no-explicit-any
  return _detectCaseName(string) as any;
}
