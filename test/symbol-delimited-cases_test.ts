import {
  type KebabCaseToWords,
  kebabCaseToWords,
  type SnakeCaseToWords,
  snakeCaseToWords,
  type UpperKebabCaseToWords,
  upperKebabCaseToWords,
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
} from "../src/symbol-delimited-cases.ts";
import { assertEqualsT } from "./utils.ts";

["hello", "world", "123"] satisfies KebabCaseToWords<"hello-world-123">;
"hello-world-123" satisfies WordsToKebabCase<["hello", "world", "123"]>;
["hello", "world123"] satisfies SnakeCaseToWords<"hello_world123">;
"hello_world123" satisfies WordsToSnakeCase<["hello", "world123"]>;

"din-mamma-en-pappa" satisfies WordsToKebabCase<
  ["din", "MAMMA", "en", "pApPa"]
>;

[
  "din",
  "mamma",
  "en",
  "pappa",
] satisfies KebabCaseToWords<"din-mamma-en-pappa">;

"DIN-MAMMA-EN-PAPPA" satisfies WordsToUpperKebabCase<
  ["din", "MAMMA", "en", "pApPa"]
>;

[
  "din",
  "mamma",
  "en",
  "pappa",
] satisfies UpperKebabCaseToWords<"DIN-MAMMA-EN-PAPPA">;

"din_mamma_en_pappa" satisfies WordsToSnakeCase<
  ["din", "MAMMA", "en", "pApPa"]
>;

[
  "din",
  "mamma",
  "en",
  "pappa",
] satisfies SnakeCaseToWords<"din_mamma_en_pappa">;

"DIN_MAMMA_EN_PAPPA" satisfies WordsToUpperSnakeCase<
  ["din", "MAMMA", "en", "pApPa"]
>;

[
  "din",
  "mamma",
  "en",
  "pappa",
] satisfies UpperSnakeCaseToWords<"DIN_MAMMA_EN_PAPPA">;

Deno.test("snakeCaseToWords", () => {
  assertEqualsT(snakeCaseToWords("din_mamma_en_pappa"), [
    "din",
    "mamma",
    "en",
    "pappa",
  ]);
});

Deno.test("upperSnakeCaseToWords", () => {
  assertEqualsT(upperSnakeCaseToWords("DIN_MAMMA_EN_PAPPA"), [
    "din",
    "mamma",
    "en",
    "pappa",
  ]);
});

Deno.test("kebabCaseToWords", () => {
  assertEqualsT(kebabCaseToWords("din-mamma-en-pappa"), [
    "din",
    "mamma",
    "en",
    "pappa",
  ]);
});

Deno.test("upperKebabCaseToWords", () => {
  assertEqualsT(upperKebabCaseToWords("DIN-MAMMA-EN-PAPPA"), [
    "din",
    "mamma",
    "en",
    "pappa",
  ]);
});

Deno.test("wordsToSnakeCase", () => {
  assertEqualsT(
    wordsToSnakeCase(["din", "mamma", "en", "pappa"]),
    "din_mamma_en_pappa",
  );
});

Deno.test("wordsToUpperSnakeCase", () => {
  assertEqualsT(
    wordsToUpperSnakeCase(["din", "mamma", "en", "pappa"]),
    "DIN_MAMMA_EN_PAPPA",
  );
});

Deno.test("wordsToKebabCase", () => {
  assertEqualsT(
    wordsToKebabCase(["din", "mamma", "en", "pappa"]),
    "din-mamma-en-pappa",
  );
});

Deno.test("wordsToUpperKebabCase", () => {
  assertEqualsT(
    wordsToUpperKebabCase(["din", "mamma", "en", "pappa"]),
    "DIN-MAMMA-EN-PAPPA",
  );
});
