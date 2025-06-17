export type LowerCaseCharMap = {
  A: "a";
  B: "b";
  C: "c";
  D: "d";
  E: "e";
  F: "f";
  G: "g";
  H: "h";
  I: "i";
  J: "j";
  K: "k";
  L: "l";
  M: "m";
  N: "n";
  O: "o";
  P: "p";
  Q: "q";
  R: "r";
  S: "s";
  T: "t";
  U: "u";
  V: "v";
  W: "w";
  X: "x";
  Y: "y";
  Z: "z";

  À: "à";
  Á: "á";
  Â: "â";
  Ã: "ã";
  Ä: "ä";
  Å: "å";
  Æ: "æ";
  Ç: "ç";
  È: "è";
  É: "é";
  Ê: "ê";
  Ë: "ë";
  Ì: "ì";
  Í: "í";
  Î: "î";
  Ï: "ï";
  Ð: "ð";
  Ñ: "ñ";
  Ò: "ò";
  Ó: "ó";
  Ô: "ô";
  Õ: "õ";
  Ö: "ö";
  Ø: "ø";
  Ù: "ù";
  Ú: "ú";
  Û: "û";
  Ü: "ü";
  Ý: "ý";
  Þ: "þ";
  ẞ: "ß"; // capital sharp S to lowercase ß

  Œ: "œ";
  Š: "š";
  Ž: "ž";
  Č: "č";
  Ď: "ď";
  Ě: "ě";
  Ľ: "ľ";
  Ĺ: "ĺ";
  Ń: "ń";
  Ŕ: "ŕ";
  Ś: "ś";
  Ť: "ť";
  Ź: "ź";
  Ż: "ż";

  // Add additional entries as needed
};

export type UpperCaseCharMap = {
  a: "A";
  b: "B";
  c: "C";
  d: "D";
  e: "E";
  f: "F";
  g: "G";
  h: "H";
  i: "I";
  j: "J";
  k: "K";
  l: "L";
  m: "M";
  n: "N";
  o: "O";
  p: "P";
  q: "Q";
  r: "R";
  s: "S";
  t: "T";
  u: "U";
  v: "V";
  w: "W";
  x: "X";
  y: "Y";
  z: "Z";

  à: "À";
  á: "Á";
  â: "Â";
  ã: "Ã";
  ä: "Ä";
  å: "Å";
  æ: "Æ";
  ç: "Ç";
  è: "È";
  é: "É";
  ê: "Ê";
  ë: "Ë";
  ì: "Ì";
  í: "Í";
  î: "Î";
  ï: "Ï";
  ð: "Ð";
  ñ: "Ñ";
  ò: "Ò";
  ó: "Ó";
  ô: "Ô";
  õ: "Õ";
  ö: "Ö";
  ø: "Ø";
  ù: "Ù";
  ú: "Ú";
  û: "Û";
  ü: "Ü";
  ý: "Ý";
  þ: "Þ";
  ß: "ẞ"; // German sharp S, maps to capital ẞ in Unicode

  œ: "Œ"; // French ligature
  š: "Š"; // Common in Czech, Slovak, etc.
  ž: "Ž"; // Common in Czech, Slovenian, etc.
  č: "Č";
  ď: "Ď";
  ě: "Ě";
  ľ: "Ľ";
  ĺ: "Ĺ";
  ń: "Ń";
  ŕ: "Ŕ";
  ś: "Ś";
  ť: "Ť";
  ź: "Ź";
  ż: "Ż";

  // Add any additional characters you may require
};

export type CharToLowerCase<Char extends string> =
  Char extends keyof LowerCaseCharMap ? LowerCaseCharMap[Char] : Char;

export type CharToUpperCase<Char extends string> =
  Char extends keyof UpperCaseCharMap ? UpperCaseCharMap[Char] : Char;

export type StringToLowerCase<String extends string> = StringToLowerCaseAcc<
  String,
  ""
>;
export type StringToLowerCaseAcc<
  String extends string,
  Acc extends string,
> = String extends `${infer Head extends string}${infer Tail extends string}`
  ? `${Acc}${CharToLowerCase<Head>}${StringToLowerCaseAcc<Tail, Acc>}`
  : String;

export type StringToUpperCase<String extends string> = StringToUpperCaseAcc<
  String,
  ""
>;
export type StringToUpperCaseAcc<
  String extends string,
  Acc extends string,
> = String extends `${infer Head extends string}${infer Tail extends string}`
  ? `${Acc}${CharToUpperCase<Head>}${StringToUpperCaseAcc<Tail, Acc>}`
  : String;

const x: StringToLowerCase<"AbC__d"> = "abc__d";
const y: StringToUpperCase<"AbC__d"> = "ABC__D";

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

type CamelCaseToWords<S extends string> = CapitalizationDelimitedCaseToWords<S>;
type PascalCaseToWords<S extends string> =
  CapitalizationDelimitedCaseToWords<S>;
type SnakeCaseToWords<S extends string> = SymbolDelimitedCaseToWords<"_", S>;
type KebabCaseToWords<S extends string> = SymbolDelimitedCaseToWords<"-", S>;
type UpperSnakeCaseToWords<S extends string> = SnakeCaseToWords<S>;
type UpperKebabCaseToWords<S extends string> = KebabCaseToWords<S>;

const cC: CapitalizationDelimitedCaseToWords<"dinMammaEnPappa"> = [
  "din",
  "mamma",
  "en",
  "pappa",
];
const pC: CapitalizationDelimitedCaseToWords<"DinMammaEnPappa"> = [
  "din",
  "mamma",
  "en",
  "pappa",
];

const sC: SnakeCaseToWords<"din_mamma_en_pappa"> = [
  "din",
  "mamma",
  "en",
  "pappa",
];
const kC: KebabCaseToWords<"din-mamma-en-pappa"> = [
  "din",
  "mamma",
  "en",
  "pappa",
];

type WordsToCamelCase<
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

type WordsToPascalCase<
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

const wC: WordsToCamelCase<["din", "MAMMA", "en", "pApPa"]> = "dinMammaEnPappa";
const wP: WordsToPascalCase<["din", "MAMMA", "en", "pApPa"]> =
  "DinMammaEnPappa";

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

type WordsToLowerCase<
  Words extends string[],
  Acc extends string[] = [],
> = Words extends [infer Head extends string, ...infer Tail extends string[]]
  ? WordsToLowerCase<Tail, [...Acc, StringToLowerCase<Head>]>
  : Acc;

type WordsToUpperCase<
  Words extends string[],
  Acc extends string[] = [],
> = Words extends [infer Head extends string, ...infer Tail extends string[]]
  ? WordsToUpperCase<Tail, [...Acc, StringToUpperCase<Head>]>
  : Acc;

type WordsToKebabCase<W extends string[]> = WordsToSymbolDelimitedCase<
  "-",
  WordsToLowerCase<W>
>;

type WordsToUpperKebabCase<W extends string[]> = WordsToSymbolDelimitedCase<
  "-",
  WordsToUpperCase<W>
>;

const wK: WordsToKebabCase<["din", "MAMMA", "en", "pApPa"]> =
  "din-mamma-en-pappa";

const wUK: WordsToUpperKebabCase<["din", "MAMMA", "en", "pApPa"]> =
  "DIN-MAMMA-EN-PAPPA";

type WordsToSnakeCase<Words extends string[]> = WordsToSymbolDelimitedCase<
  "_",
  WordsToLowerCase<Words>
>;

type WordsToUpperSnakeCase<Words extends string[]> = WordsToSymbolDelimitedCase<
  "_",
  WordsToUpperCase<Words>
>;

const wS: WordsToSnakeCase<["din", "MAMMA", "en", "pApPa"]> =
  "din_mamma_en_pappa";

const wUS: WordsToUpperSnakeCase<["din", "MAMMA", "en", "pApPa"]> =
  "DIN_MAMMA_EN_PAPPA";

type CamelCase = "camelCase";
type PascalCase = "PascalCase";
type SnakeCase = "snake_case";
type UpperSnakeCase =
  | "UPPER_SNAKE_CASE"
  | "SCREAMING_SNAKE_CASE"
  | "CONSTANT_CASE";
type KebabCase = "kebab-case";
type UpperKebabCase = "UPPER-KEBAB-CASE" | "SCREAMING-KEBAB-CASE";

type Cases =
  | CamelCase
  | PascalCase
  | SnakeCase
  | UpperSnakeCase
  | KebabCase
  | UpperKebabCase;

type WordsToString<
  Case extends Cases,
  Words extends string[],
> = Case extends CamelCase
  ? WordsToCamelCase<Words>
  : Case extends PascalCase
    ? WordsToPascalCase<Words>
    : Case extends SnakeCase
      ? WordsToSnakeCase<Words>
      : Case extends UpperSnakeCase
        ? WordsToUpperSnakeCase<Words>
        : Case extends KebabCase
          ? WordsToKebabCase<Words>
          : Case extends UpperKebabCase
            ? WordsToUpperKebabCase<Words>
            : Words;

type StringToWords<
  Case extends Cases,
  String extends string,
> = Case extends CamelCase
  ? CamelCaseToWords<String>
  : Case extends PascalCase
    ? PascalCaseToWords<String>
    : Case extends SnakeCase
      ? SnakeCaseToWords<String>
      : Case extends UpperSnakeCase
        ? UpperSnakeCaseToWords<String>
        : Case extends KebabCase
          ? KebabCaseToWords<String>
          : Case extends UpperKebabCase
            ? UpperKebabCaseToWords<String>
            : String;

export type ChangeStringCase<
  String extends string,
  FromCase extends Cases,
  ToCase extends Cases,
> = FromCase extends ToCase
  ? String
  : WordsToString<ToCase, StringToWords<FromCase, String>>;

const cTP: ChangeStringCase<"hejHej", "camelCase", "PascalCase"> = "HejHej";

export type ChangeTupleCase<
  Tuple extends string[],
  FromCase extends Cases,
  ToCase extends Cases,
> = ChangeTupleCaseAcc<Tuple, FromCase, ToCase, []>;

type ChangeTupleCaseAcc<
  Tuple extends string[],
  FromCase extends Cases,
  ToCase extends Cases,
  Acc extends [Tuple[number], string][],
> = Tuple extends [infer Head extends string, ...infer Tail extends string[]]
  ? ChangeTupleCaseAcc<
      Tail,
      FromCase,
      ToCase,
      [...Acc, [Head, ChangeStringCase<Head, FromCase, ToCase>]]
    >
  : Acc;

type BuildObjectFromConvertedKeys<
  Object extends { [key: string]: unknown },
  ConvertedKeys extends [keyof Object, string][],
  Acc extends { [key: string]: unknown } = {},
> = ConvertedKeys extends [
  [infer FromKey extends keyof Object, infer ToKey extends string],
  ...infer Tail extends [keyof Object, string][],
]
  ? BuildObjectFromConvertedKeys<
      Object,
      Tail,
      Acc & { [Key in ToKey]: Object[FromKey] }
    >
  : Acc;

type UnionToIntersection<Union> = (
  Union extends never ? never : (arg: Union) => never
) extends (arg: infer Intersection) => void
  ? Intersection
  : never;

type UnionToTuple<Union> =
  UnionToIntersection<
    Union extends never ? never : (t: Union) => Union
  > extends (_: never) => infer Member
    ? [...UnionToTuple<Exclude<Union, Member>>, Member]
    : [];

export type ChangeKeysCase<
  Object extends { [key: string]: unknown },
  FromCase extends Cases,
  ToCase extends Cases,
> =
  UnionToTuple<keyof Object> extends infer Keys extends string[]
    ? BuildObjectFromConvertedKeys<
        Object,
        ChangeTupleCase<Keys, FromCase, ToCase>
      >
    : Object;

const oCP: ChangeKeysCase<{ helloWorld: boolean }, CamelCase, PascalCase> = {
  HelloWorld: true,
};

const oSUk: ChangeKeysCase<
  { "hello-world": boolean },
  SnakeCase,
  UpperKebabCase
> = {
  "HELLO-WORLD": true,
};
