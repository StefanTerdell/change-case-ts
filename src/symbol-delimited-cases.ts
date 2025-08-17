import type {
  StringToLowerCase,
  WordsToLowerCaseWords,
  WordsToUpperCaseWords,
} from "./non-delimited-cases.ts";

export const SNAKE_CASE = "snake_case";
export type SnakeCaseName = typeof SNAKE_CASE;

export function isSnakeCaseName(caseName: string): caseName is SnakeCaseName {
  return caseName === (SNAKE_CASE satisfies SnakeCaseName);
}

export const UPPER_SNAKE_CASE = "UPPER_SNAKE_CASE";
export const SCREAMING_SNAKE_CASE = "SCREAMING_SNAKE_CASE";
export const CONSTANT_CASE = "CONSTANT_CASE";

export type UpperSnakeCaseName =
  | typeof UPPER_SNAKE_CASE
  | typeof SCREAMING_SNAKE_CASE
  | typeof CONSTANT_CASE;

export function isUpperSnakeCaseName(
  caseName: string,
): caseName is UpperSnakeCaseName {
  return (
    caseName === (UPPER_SNAKE_CASE satisfies UpperSnakeCaseName) ||
    caseName === (SCREAMING_SNAKE_CASE satisfies UpperSnakeCaseName) ||
    caseName === (CONSTANT_CASE satisfies UpperSnakeCaseName)
  );
}

export const KEBAB_CASE = "kebab-case";
export type KebabCaseName = typeof KEBAB_CASE;

export function isKebabCaseName(caseName: string): caseName is KebabCaseName {
  return caseName === (KEBAB_CASE satisfies KebabCaseName);
}

export const UPPER_KEBAB_CASE = "UPPER-KEBAB-CASE";
export const SCREAMING_KEBAB_CASE = "SCREAMING-KEBAB-CASE";
export type UpperKebabCaseName =
  | typeof UPPER_KEBAB_CASE
  | typeof SCREAMING_KEBAB_CASE;

export function isUpperKebabCaseName(
  caseName: string,
): caseName is UpperKebabCaseName {
  return (
    caseName === (UPPER_KEBAB_CASE satisfies UpperKebabCaseName) ||
    caseName === (SCREAMING_KEBAB_CASE satisfies UpperKebabCaseName)
  );
}

export const SNAKE_CASE_DELIMITER = "_";
export type SnakeCaseDelimiter = typeof SNAKE_CASE_DELIMITER;
export const KEBAB_CASE_DELIMITER = "-";
export type KebabCaseDelimiter = typeof KEBAB_CASE_DELIMITER;

export type SymbolDelimitedCaseName =
  | SnakeCaseName
  | KebabCaseName
  | UpperSnakeCaseName
  | UpperKebabCaseName;

export function isSymbolDelimitedCaseName(
  caseName: string,
): caseName is SymbolDelimitedCaseName {
  return (
    isSnakeCaseName(caseName) ||
    isKebabCaseName(caseName) ||
    isUpperSnakeCaseName(caseName) ||
    isUpperKebabCaseName(caseName)
  );
}

export type IsSymbolDelimitedCase<
  Delimiter extends string,
  String extends string,
> = String extends
  `${infer First extends string}${Delimiter}${infer Second extends string}`
  ? First extends "" ? false : Second extends "" ? false : true
  : false;

export function isSymbolDelimitedCase<
  Delimiter extends string,
  String extends string,
>(
  delimiter: Delimiter,
  string: String,
): IsSymbolDelimitedCase<Delimiter, String> {
  const words = string.split(delimiter);

  return words.length > 1 &&
    // deno-lint-ignore no-explicit-any
    words.every((word) => word !== "") as any;
}

type SymbolDelimitedCaseToWords<
  Delimiter extends string,
  String extends string,
  WordsAcc extends string[] = [],
  Acc extends string = "",
> = String extends `${infer Head extends string}${infer Tail extends string}`
  ? Head extends Delimiter ? SymbolDelimitedCaseToWords<
      Delimiter,
      Tail,
      Acc extends "" ? WordsAcc : [...WordsAcc, StringToLowerCase<Acc>],
      ""
    >
  : SymbolDelimitedCaseToWords<Delimiter, Tail, WordsAcc, `${Acc}${Head}`>
  : Acc extends "" ? WordsAcc
  : [...WordsAcc, StringToLowerCase<Acc>];

function symbolDelimitedCaseToWords<
  const Delimiter extends string,
  const String extends string,
>(
  delimiter: Delimiter,
  string: String,
): SymbolDelimitedCaseToWords<Delimiter, String> {
  const { words, word } = Array.from(string).reduce(
    (acc: { words: string[]; word: string }, char) => {
      if (char === delimiter) {
        if (acc.word.length) {
          acc.words.push(acc.word.toLocaleLowerCase());
        }
        acc.word = "";
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

  return words as SymbolDelimitedCaseToWords<Delimiter, String>;
}

export type IsSnakeCase<String extends string> = IsSymbolDelimitedCase<
  SnakeCaseDelimiter,
  String
>;

export function isSnakeCase<String extends string>(
  string: String,
): IsSnakeCase<String> {
  return isSymbolDelimitedCase(
    SNAKE_CASE_DELIMITER,
    string,
  );
}

export type SnakeCaseToWords<String extends string> =
  SymbolDelimitedCaseToWords<SnakeCaseDelimiter, String>;

export function snakeCaseToWords<const String extends string>(
  string: String,
): SnakeCaseToWords<String> {
  return symbolDelimitedCaseToWords(SNAKE_CASE_DELIMITER, string);
}

export type IsKebabCase<String extends string> = IsSymbolDelimitedCase<
  KebabCaseDelimiter,
  String
>;

export function isKebabCase<String extends string>(
  string: String,
): IsKebabCase<String> {
  return isSymbolDelimitedCase(
    KEBAB_CASE_DELIMITER,
    string,
  );
}

export type KebabCaseToWords<String extends string> =
  SymbolDelimitedCaseToWords<KebabCaseDelimiter, String>;

export function kebabCaseToWords<const String extends string>(
  string: String,
): KebabCaseToWords<String> {
  return symbolDelimitedCaseToWords(KEBAB_CASE_DELIMITER, string);
}

export type UpperSnakeCaseToWords<String extends string> = SnakeCaseToWords<
  String
>;

export function upperSnakeCaseToWords<const String extends string>(
  string: String,
): UpperSnakeCaseToWords<String> {
  return symbolDelimitedCaseToWords(SNAKE_CASE_DELIMITER, string);
}

export type UpperKebabCaseToWords<String extends string> = KebabCaseToWords<
  String
>;

export function upperKebabCaseToWords<const String extends string>(
  string: String,
): UpperKebabCaseToWords<String> {
  return symbolDelimitedCaseToWords(KEBAB_CASE_DELIMITER, string);
}

type WordsToSymbolDelimitedCase<
  Delimiter extends string,
  Words extends string[],
  Acc extends string = "",
> = Words extends [infer Head extends string, ...infer Tail extends string[]]
  ? WordsToSymbolDelimitedCase<
    Delimiter,
    Tail,
    Acc extends "" ? Head : `${Acc}${Delimiter}${Head}`
  >
  : Acc;

function wordsToSymbolDelimitedCase<
  const Delimiter extends string,
  const Words extends string[],
>(
  delimiter: Delimiter,
  words: Words,
  capitalize: true,
): WordsToSymbolDelimitedCase<Delimiter, WordsToUpperCaseWords<Words>>;

function wordsToSymbolDelimitedCase<
  const Delimiter extends string,
  const Words extends string[],
>(
  delimiter: Delimiter,
  words: Words,
  capitalize: false,
): WordsToSymbolDelimitedCase<Delimiter, WordsToLowerCaseWords<Words>>;

function wordsToSymbolDelimitedCase<
  const Delimiter extends string,
  const Words extends string[],
>(delimiter: Delimiter, words: Words, capitalize: boolean) {
  return (
    capitalize
      ? words.map((word) => word.toLocaleUpperCase())
      : words.map((word) => word.toLocaleLowerCase())
  ).join(delimiter);
}

export type WordsToKebabCase<W extends string[]> = WordsToSymbolDelimitedCase<
  KebabCaseDelimiter,
  WordsToLowerCaseWords<W>
>;

export function wordsToKebabCase<const Words extends string[]>(
  words: Words,
): WordsToKebabCase<Words> {
  return wordsToSymbolDelimitedCase(KEBAB_CASE_DELIMITER, words, false);
}

export type WordsToUpperKebabCase<Words extends string[]> =
  WordsToSymbolDelimitedCase<KebabCaseDelimiter, WordsToUpperCaseWords<Words>>;

export function wordsToUpperKebabCase<const Words extends string[]>(
  words: Words,
): WordsToUpperKebabCase<Words> {
  return wordsToSymbolDelimitedCase(KEBAB_CASE_DELIMITER, words, true);
}

export type WordsToSnakeCase<Words extends string[]> =
  WordsToSymbolDelimitedCase<SnakeCaseDelimiter, WordsToLowerCaseWords<Words>>;

export function wordsToSnakeCase<const Words extends string[]>(
  words: Words,
): WordsToSnakeCase<Words> {
  return wordsToSymbolDelimitedCase(SNAKE_CASE_DELIMITER, words, false);
}

export type WordsToUpperSnakeCase<Words extends string[]> =
  WordsToSymbolDelimitedCase<SnakeCaseDelimiter, WordsToUpperCaseWords<Words>>;

export function wordsToUpperSnakeCase<const Words extends string[]>(
  words: Words,
): WordsToUpperSnakeCase<Words> {
  return wordsToSymbolDelimitedCase(SNAKE_CASE_DELIMITER, words, true);
}
