import {
  isLowerCase,
  isUpperCase,
  type LowerToUpperCaseCharMap,
  lowerToUpperCaseCharMap,
  type StringToLowerCase,
  type UpperToLowerCaseCharMap,
  upperToLowerCaseCharMap,
} from "./non-delimited-cases.ts";
import type {
  CharToUpperCase,
  IsLowerCase,
  IsUpperCase,
} from "./non-delimited-cases.ts";

export const CAMEL_CASE = "camelCase";
export type CamelCaseName = typeof CAMEL_CASE;

export function isCamelCaseName(caseName: string): caseName is CamelCaseName {
  return caseName === (CAMEL_CASE satisfies CamelCaseName);
}

export const PASCAL_CASE = "PascalCase";
export type PascalCaseName = typeof PASCAL_CASE;

export function isPascalCaseName(caseName: string): caseName is PascalCaseName {
  return caseName === (PASCAL_CASE satisfies PascalCaseName);
}

export type CapitalizationDelimitedCaseName = CamelCaseName | PascalCaseName;

export function isCapitalizationDelimitedCaseName(
  caseName: string,
): caseName is CapitalizationDelimitedCaseName {
  return isCamelCaseName(caseName) || isPascalCaseName(caseName);
}

export type IsCapitalizationDelimitedCase<String extends string> =
  IsLowerCase<String> extends true ? false
    : IsUpperCase<String> extends true ? false
    : CapitalizationDelimitedCaseToWords<String>["length"] extends
      infer Length extends number
      ? Length extends 0 ? false : Length extends 1 ? false : true
    : false;

export function isCapitalizationDelimitedCase<String extends string>(
  string: String,
): IsCapitalizationDelimitedCase<String> {
  return !isLowerCase(string) && !isUpperCase(string) &&
    // deno-lint-ignore no-explicit-any
    capitalizationDelimitedStringToWords(string).length > 1 as any;
}

type CapitalizationDelimitedCaseToWords<
  String extends string,
  Words extends string[] = [],
  Acc extends string = "",
> = String extends `${infer Head extends string}${infer Tail extends string}`
  ? Head extends keyof UpperToLowerCaseCharMap
    ? CapitalizationDelimitedCaseToWords<
      Tail,
      Acc extends "" ? Words : [...Words, StringToLowerCase<Acc>],
      Head
    >
  : CapitalizationDelimitedCaseToWords<Tail, Words, `${Acc}${Head}`>
  : Acc extends "" ? Words
  : [...Words, StringToLowerCase<Acc>];

function capitalizationDelimitedStringToWords<String extends string>(
  string: String,
): CapitalizationDelimitedCaseToWords<String> {
  const { words, word } = Array.from(string).reduce(
    (acc: { words: string[]; word: string }, char) => {
      if (char === char.toLocaleUpperCase() && acc.word.length) {
        acc.words.push(acc.word.toLocaleLowerCase());
        acc.word = char;
      } else {
        acc.word += char;
      }

      return acc;
    },
    { words: [], word: "" },
  );

  if (word.length) {
    words.push(word.toLocaleLowerCase());
  }

  return words as PascalCaseToWords<String>;
}

export type IsCamelCase<String extends string> = String extends
  `${keyof LowerToUpperCaseCharMap}${string}`
  ? IsCapitalizationDelimitedCase<String>
  : false;

export function isCamelCase<String extends string>(
  string: String,
): IsCamelCase<String> {
  return string[0] in lowerToUpperCaseCharMap &&
    // deno-lint-ignore no-explicit-any
    isCapitalizationDelimitedCase(string) as any;
}

export type CamelCaseToWords<String extends string> =
  CapitalizationDelimitedCaseToWords<String>;

export function camelCaseToWords<String extends string>(
  string: String,
): CamelCaseToWords<String> {
  return capitalizationDelimitedStringToWords(string);
}

export type IsPascalCase<String extends string> = String extends
  `${keyof UpperToLowerCaseCharMap}${string}`
  ? IsCapitalizationDelimitedCase<String>
  : false;

export function isPascalCase<String extends string>(
  string: String,
): IsPascalCase<String> {
  return string[0] in upperToLowerCaseCharMap &&
    // deno-lint-ignore no-explicit-any
    isCapitalizationDelimitedCase(string) as any;
}

export type PascalCaseToWords<S extends string> =
  CapitalizationDelimitedCaseToWords<S>;

export function pascalCaseToWords<String extends string>(
  string: String,
): PascalCaseToWords<String> {
  return capitalizationDelimitedStringToWords(string);
}

export type WordsToCamelCase<
  Words extends string[],
  Acc extends string = "",
> = Words extends [infer Head extends string, ...infer Tail extends string[]]
  ? WordsToCamelCase<
    Tail,
    Acc extends "" ? Head
      : `${Acc}${Head extends
        `${infer WordHead extends string}${infer WordTail extends string}`
        ? `${CharToUpperCase<WordHead>}${StringToLowerCase<WordTail>}`
        : Head}`
  >
  : Acc;

export function wordsToCamelCase<const Words extends string[]>(
  words: Words,
): WordsToCamelCase<Words> {
  return (
    words.length
      ? `${words[0].toLocaleLowerCase()}${wordsToPascalCase(words.slice(1))}`
      : ""
  ) as WordsToCamelCase<Words>;
}

export type WordsToPascalCase<
  Words extends string[],
  Acc extends string = "",
> = Words extends [infer Head extends string, ...infer Tail extends string[]]
  ? WordsToCamelCase<
    Tail,
    `${Acc}${Head extends
      `${infer WordHead extends string}${infer WordTail extends string}`
      ? `${CharToUpperCase<WordHead>}${StringToLowerCase<WordTail>}`
      : Head}`
  >
  : Acc;

export function wordsToPascalCase<const Words extends string[]>(
  words: Words,
): WordsToPascalCase<Words> {
  return (
    words.length
      ? words.reduce(
        (acc, word) =>
          `${acc}${
            ((word) => (word.length
              ? `${word[0].toLocaleUpperCase()}${
                word.slice(1).toLocaleLowerCase()
              }`
              : ""))(word)
          }`,
        "",
      )
      : ""
  ) as WordsToPascalCase<Words>;
}
