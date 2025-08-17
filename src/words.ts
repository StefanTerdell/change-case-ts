import type { CaseName } from "./cases.ts";
import {
  type CamelCaseName,
  type CamelCaseToWords,
  camelCaseToWords,
  isCamelCaseName,
  isPascalCaseName,
  type PascalCaseName,
  type PascalCaseToWords,
  pascalCaseToWords,
  type WordsToCamelCase,
  wordsToCamelCase,
  type WordsToPascalCase,
  wordsToPascalCase,
} from "./capitalization-delimited-cases.ts";
import {
  isLowerCaseName,
  isUpperCaseName,
  type LowerCaseName,
  type LowerCaseToWords,
  lowerCaseToWords,
  type UpperCaseName,
  type UpperCaseToWords,
  upperCaseToWords,
  type WordsToLowerCase,
  wordsToLowerCase,
  type WordsToUpperCase,
  wordsToUpperCase,
} from "./non-delimited-cases.ts";
import {
  isKebabCaseName,
  isSnakeCaseName,
  isUpperKebabCaseName,
  isUpperSnakeCaseName,
  type KebabCaseName,
  type KebabCaseToWords,
  kebabCaseToWords,
  type SnakeCaseName,
  type SnakeCaseToWords,
  snakeCaseToWords,
  type UpperKebabCaseName,
  type UpperKebabCaseToWords,
  upperKebabCaseToWords,
  type UpperSnakeCaseName,
  type UpperSnakeCaseToWords,
  upperSnakeCaseToWords,
  type WordsToKebabCase,
  wordsToKebabCase,
  type WordsToSnakeCase,
  wordsToSnakeCase,
  type WordsToUpperKebabCase,
  wordsToUpperKebabCase,
  type WordsToUpperSnakeCase,
  wordsToUpperSnakeCase,
} from "./symbol-delimited-cases.ts";

export type WordsToString<
  Case extends CaseName,
  Words extends string[],
> = Case extends LowerCaseName ? WordsToLowerCase<Words>
  : Case extends UpperCaseName ? WordsToUpperCase<Words>
  : Case extends CamelCaseName ? WordsToCamelCase<Words>
  : Case extends PascalCaseName ? WordsToPascalCase<Words>
  : Case extends SnakeCaseName ? WordsToSnakeCase<Words>
  : Case extends UpperSnakeCaseName ? WordsToUpperSnakeCase<Words>
  : Case extends KebabCaseName ? WordsToKebabCase<Words>
  : Case extends UpperKebabCaseName ? WordsToUpperKebabCase<Words>
  : WordsToStringAcc<Words>;

type WordsToStringAcc<
  Words extends string[],
  Acc extends string = "",
> = Words extends [infer Head extends string, ...infer Tail extends string[]]
  ? WordsToStringAcc<Tail, `${Acc}${Head}`>
  : Acc;

export function wordsToString<
  const Case extends CaseName,
  const Words extends string[],
>(
  caseName: Case,
  words: Words,
): WordsToString<Case, Words> {
  return (
    isUpperCaseName(caseName)
      ? wordsToUpperCase(words)
      : isLowerCaseName(caseName)
      ? wordsToLowerCase(words)
      : isSnakeCaseName(caseName)
      ? wordsToSnakeCase(words)
      : isKebabCaseName(caseName)
      ? wordsToKebabCase(words)
      : isUpperSnakeCaseName(caseName)
      ? wordsToUpperSnakeCase(words)
      : isUpperKebabCaseName(caseName)
      ? wordsToUpperKebabCase(words)
      : isCamelCaseName(caseName)
      ? wordsToCamelCase(words)
      : isPascalCaseName(caseName)
      ? wordsToPascalCase(words)
      : words.join("")
  ) as WordsToString<Case, Words>;
}

export type StringToWords<
  Case extends CaseName,
  String extends string,
> = Case extends LowerCaseName ? LowerCaseToWords<String>
  : Case extends UpperCaseName ? UpperCaseToWords<String>
  : Case extends CamelCaseName ? CamelCaseToWords<String>
  : Case extends PascalCaseName ? PascalCaseToWords<String>
  : Case extends SnakeCaseName ? SnakeCaseToWords<String>
  : Case extends UpperSnakeCaseName ? UpperSnakeCaseToWords<String>
  : Case extends KebabCaseName ? KebabCaseToWords<String>
  : Case extends UpperKebabCaseName ? UpperKebabCaseToWords<String>
  : [String];

export function stringToWords<
  const Case extends CaseName,
  const String extends string,
>(
  caseName: Case,
  string: String,
): StringToWords<Case, String> {
  return (
    isUpperCaseName(caseName)
      ? upperCaseToWords(string)
      : isLowerCaseName(caseName)
      ? lowerCaseToWords(string)
      : isSnakeCaseName(caseName)
      ? snakeCaseToWords(string)
      : isKebabCaseName(caseName)
      ? kebabCaseToWords(string)
      : isUpperSnakeCaseName(caseName)
      ? upperSnakeCaseToWords(string)
      : isUpperKebabCaseName(caseName)
      ? upperKebabCaseToWords(string)
      : isCamelCaseName(caseName)
      ? camelCaseToWords(string)
      : isPascalCaseName(caseName)
      ? pascalCaseToWords(string)
      : [string]
  ) as StringToWords<Case, String>;
}
