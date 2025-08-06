import { StringToLowerCase } from "./non-delimited-cases.ts";
import { CharToUpperCase } from "./non-delimited-cases.ts";

export type CamelCaseName = "camelCase";

export function isCamelCaseName(caseName: string): caseName is CamelCaseName {
  return caseName === ("camelCase" satisfies CamelCaseName);
}

export type PascalCaseName = "PascalCase";

export function isPascalCaseName(caseName: string): caseName is PascalCaseName {
  return caseName === ("PascalCase" satisfies PascalCaseName);
}

export type CapitalizationDelimitedCaseName = CamelCaseName | PascalCaseName;

export function isCapitalizationDelimitedCaseName(
  caseName: string,
): caseName is CapitalizationDelimitedCaseName {
  return isCamelCaseName(caseName) || isPascalCaseName(caseName);
}

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

export type CamelCaseToWords<String extends string> =
  CapitalizationDelimitedCaseToWords<String>;

export function camelCaseToWords<String extends string>(
  string: String,
): CamelCaseToWords<String> {
  return capitalizationDelimitedStringToWords(string);
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
      Acc extends ""
        ? Head
        : `${Acc}${Head extends `${infer WordHead extends string}${infer WordTail extends string}`
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
      `${Acc}${Head extends `${infer WordHead extends string}${infer WordTail extends string}`
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
            `${acc}${((word) => (word.length ? `${word[0].toLocaleUpperCase()}${word.slice(1).toLocaleLowerCase()}` : ""))(word)}`,
          "",
        )
      : ""
  ) as WordsToPascalCase<Words>;
}
