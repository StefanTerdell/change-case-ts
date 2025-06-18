import {
  WordsToKebabCase,
  WordsToSnakeCase,
  WordsToUpperKebabCase,
  WordsToUpperSnakeCase,
} from "./symbol-delimited-cases";

"din-mamma-en-pappa" satisfies WordsToKebabCase<
  ["din", "MAMMA", "en", "pApPa"]
>;

"DIN-MAMMA-EN-PAPPA" satisfies WordsToUpperKebabCase<
  ["din", "MAMMA", "en", "pApPa"]
>;

"din_mamma_en_pappa" satisfies WordsToSnakeCase<
  ["din", "MAMMA", "en", "pApPa"]
>;

"DIN_MAMMA_EN_PAPPA" satisfies WordsToUpperSnakeCase<
  ["din", "MAMMA", "en", "pApPa"]
>;
