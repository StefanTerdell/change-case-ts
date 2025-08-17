import { assertEquals } from "@std/assert";
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

Deno.test(function snakeCaseToWordsShouldWork() {
  const result = snakeCaseToWords("din_mamma_en_pappa");
  const expected: typeof result = ["din", "mamma", "en", "pappa"];

  assertEquals(result, expected);
});

Deno.test(function upperSnakeCaseToWordsShouldWork() {
  const result = upperSnakeCaseToWords("DIN_MAMMA_EN_PAPPA");
  const expected: typeof result = ["din", "mamma", "en", "pappa"];

  assertEquals(result, expected);
});

Deno.test(function kebabCaseToWordsShouldWork() {
  const result = kebabCaseToWords("din-mamma-en-pappa");
  const expected: typeof result = ["din", "mamma", "en", "pappa"];

  assertEquals(result, expected);
});

Deno.test(function upperKebabCaseToWordsShouldWork() {
  const result = upperKebabCaseToWords("DIN-MAMMA-EN-PAPPA");
  const expected: typeof result = ["din", "mamma", "en", "pappa"];

  assertEquals(result, expected);
});

Deno.test(function wordsToSnakeCaseShouldWork() {
  const result = wordsToSnakeCase(["din", "mamma", "en", "pappa"]);
  const expected: typeof result = "din_mamma_en_pappa";

  assertEquals(result, expected);
});

Deno.test(function wordsToUpperSnakeCaseShouldWork() {
  const result = wordsToUpperSnakeCase(["din", "mamma", "en", "pappa"]);
  const expected: typeof result = "DIN_MAMMA_EN_PAPPA";

  assertEquals(result, expected);
});

Deno.test(function wordsToKebabCaseShouldWork() {
  const result = wordsToKebabCase(["din", "mamma", "en", "pappa"]);
  const expected: typeof result = "din-mamma-en-pappa";

  assertEquals(result, expected);
});

Deno.test(function wordsToUpperKebabCaseShouldWork() {
  const result = wordsToUpperKebabCase(["din", "mamma", "en", "pappa"]);
  const expected: typeof result = "DIN-MAMMA-EN-PAPPA";

  assertEquals(result, expected);
});
