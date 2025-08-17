export const UPPER_CASE = "UPPERCASE";
export type UpperCaseName = typeof UPPER_CASE;

export function isUpperCaseName(caseName: string): caseName is UpperCaseName {
  return caseName === (UPPER_CASE satisfies UpperCaseName);
}

export const LOWER_CASE = "lowercase";
export type LowerCaseName = typeof LOWER_CASE;

export function isLowerCaseName(caseName: string): caseName is LowerCaseName {
  return caseName === (LOWER_CASE satisfies LowerCaseName);
}

export type NonDelimitedCaseName = UpperCaseName | LowerCaseName;

export function isNonDelimitedCaseName(
  caseName: string,
): caseName is NonDelimitedCaseName {
  return isUpperCaseName(caseName) || isLowerCaseName(caseName);
}

// Lower case

export type IsLowerCase<String extends string> = String extends "" ? false
  : String extends StringToLowerCase<String> ? true
  : false;

export function isLowerCase<String extends string>(
  string: String,
): IsLowerCase<String> {
  // deno-lint-ignore no-explicit-any
  return string !== "" && (string === string.toLocaleLowerCase()) as any;
}

export type CharToLowerCase<Char extends string> = Char extends
  keyof UpperToLowerCaseCharMap ? UpperToLowerCaseCharMap[Char]
  : Char;

export function charToLowerCase<const Char extends string>(
  char: Char,
): CharToLowerCase<Char> {
  return (
    char in upperToLowerCaseCharMap
      ? upperToLowerCaseCharMap[char as keyof UpperToLowerCaseCharMap]
      : char
  ) as CharToLowerCase<Char>;
}

export type StringToLowerCase<String extends string> = StringToLowerCaseAcc<
  String,
  ""
>;

export function stringToLowerCase<const String extends string>(
  string: String,
): StringToLowerCase<String> {
  return Array.from(string)
    .map((char) => charToLowerCase(char))
    .join("") as StringToLowerCase<String>;
}

type StringToLowerCaseAcc<
  String extends string,
  Acc extends string,
> = String extends `${infer Head extends string}${infer Tail extends string}`
  ? `${Acc}${CharToLowerCase<Head>}${StringToLowerCaseAcc<Tail, Acc>}`
  : String;

/** @internal */
export type WordsToLowerCaseWords<
  Words extends string[],
  Acc extends string[] = [],
> = Words extends [infer Head extends string, ...infer Tail extends string[]]
  ? WordsToLowerCaseWords<Tail, [...Acc, StringToLowerCase<Head>]>
  : Acc;

/** @internal */
export function wordsToLowerCaseWords<const Words extends string[]>(
  words: Words,
): WordsToLowerCaseWords<Words> {
  return words.map((word) => stringToLowerCase(word)) as WordsToLowerCaseWords<
    Words
  >;
}

export type LowerCaseToWords<String extends string> = [
  StringToLowerCase<String>,
];

export function lowerCaseToWords<const String extends string>(
  string: String,
): LowerCaseToWords<String> {
  return [stringToLowerCase(string)];
}

export type WordsToLowerCase<
  Words extends string[],
  Acc extends string = "",
> = Words extends [infer Head extends string, ...infer Tail extends string[]]
  ? WordsToLowerCase<Tail, `${Acc}${StringToLowerCase<Head>}`>
  : Acc;

export function wordsToLowerCase<const Words extends string[]>(
  words: Words,
): WordsToLowerCase<Words> {
  return words
    .map((word) => stringToLowerCase(word))
    .join("") as WordsToLowerCase<Words>;
}

// Upper case
export type IsUpperCase<String extends string> = String extends "" ? false
  : String extends StringToUpperCase<String> ? true
  : false;

export function isUpperCase<String extends string>(
  string: String,
): IsUpperCase<String> {
  // deno-lint-ignore no-explicit-any
  return string !== "" && (string === string.toLocaleUpperCase()) as any;
}

export type CharToUpperCase<Char extends string> = Char extends
  keyof LowerToUpperCaseCharMap ? LowerToUpperCaseCharMap[Char]
  : Char;

export function charToUpperCase<const Char extends string>(
  char: Char,
): CharToUpperCase<Char> {
  return (
    char in lowerToUpperCaseCharMap
      ? lowerToUpperCaseCharMap[char as keyof LowerToUpperCaseCharMap]
      : char
  ) as CharToUpperCase<Char>;
}

export type StringToUpperCase<String extends string> = StringToUpperCaseAcc<
  String,
  ""
>;

export function stringToUpperCase<const String extends string>(
  string: String,
): StringToUpperCase<String> {
  return Array.from(string)
    .map((char) => charToUpperCase(char))
    .join("") as StringToUpperCase<String>;
}

type StringToUpperCaseAcc<
  String extends string,
  Acc extends string,
> = String extends `${infer Head extends string}${infer Tail extends string}`
  ? `${Acc}${CharToUpperCase<Head>}${StringToUpperCaseAcc<Tail, Acc>}`
  : String;

export type WordsToUpperCaseWords<
  Words extends string[],
  Acc extends string[] = [],
> = Words extends [infer Head extends string, ...infer Tail extends string[]]
  ? WordsToUpperCaseWords<Tail, [...Acc, StringToUpperCase<Head>]>
  : Acc;

export function wordsToUpperCaseWords<const Words extends string[]>(
  words: Words,
): WordsToUpperCaseWords<Words> {
  return words.map((word) => stringToUpperCase(word)) as WordsToUpperCaseWords<
    Words
  >;
}

export type UpperCaseToWords<String extends string> = [
  StringToLowerCase<String>,
];

export function upperCaseToWords<const String extends string>(
  string: String,
): UpperCaseToWords<String> {
  return [stringToLowerCase(string)] as UpperCaseToWords<String>;
}

export type WordsToUpperCase<
  Words extends string[],
  Acc extends string = "",
> = Words extends [infer Head extends string, ...infer Tail extends string[]]
  ? WordsToUpperCase<Tail, `${Acc}${StringToUpperCase<Head>}`>
  : Acc;

export function wordsToUpperCase<const Words extends string[]>(
  words: Words,
): WordsToUpperCase<Words> {
  return words
    .map((word) => stringToUpperCase(word))
    .join("") as WordsToUpperCase<Words>;
}

// Maps
export type UpperToLowerCaseCharMap = typeof upperToLowerCaseCharMap;

export const upperToLowerCaseCharMap = {
  A: "a" as const,
  B: "b" as const,
  C: "c" as const,
  D: "d" as const,
  E: "e" as const,
  F: "f" as const,
  G: "g" as const,
  H: "h" as const,
  I: "i" as const,
  J: "j" as const,
  K: "k" as const,
  L: "l" as const,
  M: "m" as const,
  N: "n" as const,
  O: "o" as const,
  P: "p" as const,
  Q: "q" as const,
  R: "r" as const,
  S: "s" as const,
  T: "t" as const,
  U: "u" as const,
  V: "v" as const,
  W: "w" as const,
  X: "x" as const,
  Y: "y" as const,
  Z: "z" as const,

  À: "à" as const,
  Á: "á" as const,
  Â: "â" as const,
  Ã: "ã" as const,
  Ä: "ä" as const,
  Å: "å" as const,
  Æ: "æ" as const,
  Ç: "ç" as const,
  È: "è" as const,
  É: "é" as const,
  Ê: "ê" as const,
  Ë: "ë" as const,
  Ì: "ì" as const,
  Í: "í" as const,
  Î: "î" as const,
  Ï: "ï" as const,
  Ð: "ð" as const,
  Ñ: "ñ" as const,
  Ò: "ò" as const,
  Ó: "ó" as const,
  Ô: "ô" as const,
  Õ: "õ" as const,
  Ö: "ö" as const,
  Ø: "ø" as const,
  Ù: "ù" as const,
  Ú: "ú" as const,
  Û: "û" as const,
  Ü: "ü" as const,
  Ý: "ý" as const,
  Þ: "þ" as const,
  ẞ: "ß" as const, // capital sharp S to lowercase ß

  Œ: "œ" as const,
  Š: "š" as const,
  Ž: "ž" as const,
  Č: "č" as const,
  Ď: "ď" as const,
  Ě: "ě" as const,
  Ľ: "ľ" as const,
  Ĺ: "ĺ" as const,
  Ń: "ń" as const,
  Ŕ: "ŕ" as const,
  Ś: "ś" as const,
  Ť: "ť" as const,
  Ź: "ź" as const,
  Ż: "ż" as const,
  // Add additional entries as needed
};

export type LowerToUpperCaseCharMap = typeof lowerToUpperCaseCharMap;

export const lowerToUpperCaseCharMap = {
  a: "A" as const,
  b: "B" as const,
  c: "C" as const,
  d: "D" as const,
  e: "E" as const,
  f: "F" as const,
  g: "G" as const,
  h: "H" as const,
  i: "I" as const,
  j: "J" as const,
  k: "K" as const,
  l: "L" as const,
  m: "M" as const,
  n: "N" as const,
  o: "O" as const,
  p: "P" as const,
  q: "Q" as const,
  r: "R" as const,
  s: "S" as const,
  t: "T" as const,
  u: "U" as const,
  v: "V" as const,
  w: "W" as const,
  x: "X" as const,
  y: "Y" as const,
  z: "Z" as const,

  à: "À" as const,
  á: "Á" as const,
  â: "Â" as const,
  ã: "Ã" as const,
  ä: "Ä" as const,
  å: "Å" as const,
  æ: "Æ" as const,
  ç: "Ç" as const,
  è: "È" as const,
  é: "É" as const,
  ê: "Ê" as const,
  ë: "Ë" as const,
  ì: "Ì" as const,
  í: "Í" as const,
  î: "Î" as const,
  ï: "Ï" as const,
  ð: "Ð" as const,
  ñ: "Ñ" as const,
  ò: "Ò" as const,
  ó: "Ó" as const,
  ô: "Ô" as const,
  õ: "Õ" as const,
  ö: "Ö" as const,
  ø: "Ø" as const,
  ù: "Ù" as const,
  ú: "Ú" as const,
  û: "Û" as const,
  ü: "Ü" as const,
  ý: "Ý" as const,
  þ: "Þ" as const,
  ß: "ẞ" as const, // German sharp S, maps to capital ẞ in Unicode

  œ: "Œ" as const, // French ligature
  š: "Š" as const, // Common in Czech, Slovak, etc.
  ž: "Ž" as const, // Common in Czech, Slovenian, etc.
  č: "Č" as const,
  ď: "Ď" as const,
  ě: "Ě" as const,
  ľ: "Ľ" as const,
  ĺ: "Ĺ" as const,
  ń: "Ń" as const,
  ŕ: "Ŕ" as const,
  ś: "Ś" as const,
  ť: "Ť" as const,
  ź: "Ź" as const,
  ż: "Ż" as const,
  // Add any additional characters you may require
};
