import { StringToLowerCase } from "./non-delimited-cases";
import { CharToUpperCase } from "./non-delimited-cases";

export type CamelCase = "camelCase";
export type PascalCase = "PascalCase";
export type CapitalizationDelimitedCases = CamelCase | PascalCase

type CapitalizationDelimitedCaseToWords<
  String extends string,
  Words extends string[] = [],
  Acc extends string = "",
> = String extends `${infer Head extends string}${infer Tail extends string}`
  ? Head extends CharToUpperCase<Head>
    ? CapitalizationDelimitedCaseToWords<
        Tail,
        Acc extends "" ? Words : [...Words, StringToLowerCase<Acc>],
        Head
      >
    : CapitalizationDelimitedCaseToWords<Tail, Words, `${Acc}${Head}`>
  : Acc extends ""
    ? Words
    : [...Words, StringToLowerCase<Acc>];

export type CamelCaseToWords<S extends string> =
  CapitalizationDelimitedCaseToWords<S>;
export type PascalCaseToWords<S extends string> =
  CapitalizationDelimitedCaseToWords<S>;

export type WordsToCamelCase<
  Words extends string[],
  Acc extends string = "",
> = Words extends [infer Head extends string, ...infer Tail extends string[]]
  ? WordsToCamelCase<
      Tail,
      Acc extends ""
        ? Head
        : `${Acc}${Head extends `${infer WordHead extends string}${infer WordTail extends string}`
            ? `${CharToUpperCase<WordHead>}${StringToLowerCase<WordTail>}`
            : Head}`
    >
  : Acc;

export type WordsToPascalCase<
  Words extends string[],
  Acc extends string = "",
> = Words extends [infer Head extends string, ...infer Tail extends string[]]
  ? WordsToCamelCase<
      Tail,
      `${Acc}${Head extends `${infer WordHead extends string}${infer WordTail extends string}`
        ? `${CharToUpperCase<WordHead>}${StringToLowerCase<WordTail>}`
        : Head}`
    >
  : Acc;
