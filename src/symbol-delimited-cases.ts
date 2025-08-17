import {
  StringToLowerCase,
  WordsToLowerCaseWords,
  WordsToUpperCaseWords,
} from "./non-delimited-cases.ts";

export type SnakeCaseName = "snake_case";

export function isSnakeCaseName(caseName: string): caseName is SnakeCaseName {
  return caseName === ("snake_case" satisfies SnakeCaseName);
}

export type UpperSnakeCaseName =
  | "UPPER_SNAKE_CASE"
  | "SCREAMING_SNAKE_CASE"
  | "CONSTANT_CASE";

export function isUpperSnakeCaseName(
  caseName: string,
): caseName is UpperSnakeCaseName {
  return (
    caseName === ("UPPER_SNAKE_CASE" satisfies UpperSnakeCaseName) ||
    caseName === ("SCREAMING_SNAKE_CASE" satisfies UpperSnakeCaseName) ||
    caseName === ("CONSTANT_CASE" satisfies UpperSnakeCaseName)
  );
}

export type KebabCaseName = "kebab-case";

export function isKebabCaseName(caseName: string): caseName is KebabCaseName {
  return caseName === ("kebab-case" satisfies KebabCaseName);
}

export type UpperKebabCaseName = "UPPER-KEBAB-CASE" | "SCREAMING-KEBAB-CASE";

export function isUpperKebabCaseName(
  caseName: string,
): caseName is UpperKebabCaseName {
  return (
    caseName === ("UPPER-KEBAB-CASE" satisfies UpperKebabCaseName) ||
    caseName === ("SCREAMING-KEBAB-CASE" satisfies UpperKebabCaseName)
  );
}

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
  Delimiter extends string,
  String extends string,
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

export type SnakeCaseToWords<String extends string> =
  SymbolDelimitedCaseToWords<"_", String>;

export function snakeCaseToWords<const String extends string>(
  string: String,
): SnakeCaseToWords<String> {
  return symbolDelimitedCaseToWords("_", string);
}

export type KebabCaseToWords<String extends string> =
  SymbolDelimitedCaseToWords<"-", String>;

export function kebabCaseToWords<const String extends string>(
  string: String,
): KebabCaseToWords<String> {
  return symbolDelimitedCaseToWords("-", string);
}

export type UpperSnakeCaseToWords<String extends string> = SnakeCaseToWords<
  String
>;

export function upperSnakeCaseToWords<const String extends string>(
  string: String,
): UpperSnakeCaseToWords<String> {
  return symbolDelimitedCaseToWords("_", string);
}

export type UpperKebabCaseToWords<String extends string> = KebabCaseToWords<
  String
>;

export function upperKebabCaseToWords<const String extends string>(
  string: String,
): UpperKebabCaseToWords<String> {
  return symbolDelimitedCaseToWords("-", string);
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
  "-",
  WordsToLowerCaseWords<W>
>;

export function wordsToKebabCase<const Words extends string[]>(
  words: Words,
): WordsToKebabCase<Words> {
  return wordsToSymbolDelimitedCase("-", words, false);
}

export type WordsToUpperKebabCase<Words extends string[]> =
  WordsToSymbolDelimitedCase<"-", WordsToUpperCaseWords<Words>>;

export function wordsToUpperKebabCase<const Words extends string[]>(
  words: Words,
): WordsToUpperKebabCase<Words> {
  return wordsToSymbolDelimitedCase("-", words, true);
}

export type WordsToSnakeCase<Words extends string[]> =
  WordsToSymbolDelimitedCase<"_", WordsToLowerCaseWords<Words>>;

export function wordsToSnakeCase<const Words extends string[]>(
  words: Words,
): WordsToSnakeCase<Words> {
  return wordsToSymbolDelimitedCase("_", words, false);
}

export type WordsToUpperSnakeCase<Words extends string[]> =
  WordsToSymbolDelimitedCase<"_", WordsToUpperCaseWords<Words>>;

export function wordsToUpperSnakeCase<const Words extends string[]>(
  words: Words,
): WordsToUpperSnakeCase<Words> {
  return wordsToSymbolDelimitedCase("_", words, true);
}
