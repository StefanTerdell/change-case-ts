export type UpperCase = "UPPERCASE"
export type LowerCase = "lowercase"
export type NonDelimitedCases = UpperCase | LowerCase

// Lower case

export type CharToLowerCase<Char extends string> =
  Char extends keyof LowerCaseCharMap ? LowerCaseCharMap[Char] : Char;

export type StringToLowerCase<String extends string> = StringToLowerCaseAcc<
  String,
  ""
>;

type StringToLowerCaseAcc<
  String extends string,
  Acc extends string,
> = String extends `${infer Head extends string}${infer Tail extends string}`
  ? `${Acc}${CharToLowerCase<Head>}${StringToLowerCaseAcc<Tail, Acc>}`
  : String;

export type WordsToLowerCase<
  Words extends string[],
  Acc extends string[] = [],
> = Words extends [infer Head extends string, ...infer Tail extends string[]]
  ? WordsToLowerCase<Tail, [...Acc, StringToLowerCase<Head>]>
  : Acc;

// Upper case

export type CharToUpperCase<Char extends string> =
  Char extends keyof UpperCaseCharMap ? UpperCaseCharMap[Char] : Char;

export type StringToUpperCase<String extends string> = StringToUpperCaseAcc<
  String,
  ""
>;

type StringToUpperCaseAcc<
  String extends string,
  Acc extends string,
> = String extends `${infer Head extends string}${infer Tail extends string}`
  ? `${Acc}${CharToUpperCase<Head>}${StringToUpperCaseAcc<Tail, Acc>}`
  : String;

export type WordsToUpperCase<
  Words extends string[],
  Acc extends string[] = [],
> = Words extends [infer Head extends string, ...infer Tail extends string[]]
  ? WordsToUpperCase<Tail, [...Acc, StringToUpperCase<Head>]>
  : Acc;

// Maps

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
