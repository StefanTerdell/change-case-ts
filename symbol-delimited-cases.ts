import { StringToLowerCase, WordsToLowerCase, WordsToUpperCase } from "./non-delimited-cases";

export type SnakeCase = "snake_case";
export type UpperSnakeCase =
  | "UPPER_SNAKE_CASE"
  | "SCREAMING_SNAKE_CASE"
  | "CONSTANT_CASE";
export type KebabCase = "kebab-case";
export type UpperKebabCase = "UPPER-KEBAB-CASE" | "SCREAMING-KEBAB-CASE";
export type SymbolDelimitedCases =
  | SnakeCase
  | KebabCase
  | UpperSnakeCase
  | UpperKebabCase;

type SymbolDelimitedCaseToWords<
  Delimiter extends string,
  String extends string,
  WordsAcc extends string[] = [],
  Acc extends string = "",
> = String extends `${infer Head extends string}${infer Tail extends string}`
  ? Head extends Delimiter
    ? SymbolDelimitedCaseToWords<
        Delimiter,
        Tail,
        Acc extends "" ? WordsAcc : [...WordsAcc, StringToLowerCase<Acc>],
        ""
      >
    : SymbolDelimitedCaseToWords<Delimiter, Tail, WordsAcc, `${Acc}${Head}`>
  : Acc extends ""
    ? WordsAcc
    : [...WordsAcc, StringToLowerCase<Acc>];

export type SnakeCaseToWords<S extends string> = SymbolDelimitedCaseToWords<
  "_",
  S
>;
export type KebabCaseToWords<S extends string> = SymbolDelimitedCaseToWords<
  "-",
  S
>;
export type UpperSnakeCaseToWords<S extends string> = SnakeCaseToWords<S>;
export type UpperKebabCaseToWords<S extends string> = KebabCaseToWords<S>;

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

export type WordsToKebabCase<W extends string[]> = WordsToSymbolDelimitedCase<
  "-",
  WordsToLowerCase<W>
>;

export type WordsToUpperKebabCase<W extends string[]> =
  WordsToSymbolDelimitedCase<"-", WordsToUpperCase<W>>;

export type WordsToSnakeCase<Words extends string[]> =
  WordsToSymbolDelimitedCase<"_", WordsToLowerCase<Words>>;

export type WordsToUpperSnakeCase<Words extends string[]> =
  WordsToSymbolDelimitedCase<"_", WordsToUpperCase<Words>>;
