import { assertEquals } from "@std/assert";
import {
  charToLowerCase,
  charToUpperCase,
  lowerCaseToWords,
  type StringToLowerCase,
  stringToLowerCase,
  type StringToUpperCase,
  stringToUpperCase,
  upperCaseToWords,
  wordsToLowerCase,
  wordsToUpperCase,
} from "../src/non-delimited-cases.ts";

"abc__d" satisfies StringToLowerCase<"AbC__d">;
// @ts-expect-error: test
"ABC__D" satisfies StringToLowerCase<"AbC__d">;
// @ts-expect-error: test
"AbC__d" satisfies StringToLowerCase<"AbC__d">;

"ABC__D" satisfies StringToUpperCase<"AbC__d">;
// @ts-expect-error: test
"abc__d" satisfies StringToUpperCase<"AbC__d">;
// @ts-expect-error: test
"AbC__d" satisfies StringToUpperCase<"AbC__d">;

Deno.test(function charToLowerCaseShouldWork() {
  const result = charToLowerCase("Å");
  const expected: typeof result = "å";

  assertEquals(result, expected);
});

Deno.test(function charToUpperCaseShouldWork() {
  const result = charToUpperCase("å");
  const expected: typeof result = "Å";

  assertEquals(result, expected);
});

Deno.test(function stringToLowerCaseShouldWork() {
  const result = stringToLowerCase("ÅÄÖ");
  const expected: typeof result = "åäö";

  assertEquals(result, expected);
});

Deno.test(function stringToUpperCaseShouldWork() {
  const result = stringToUpperCase("åäö");
  const expected: typeof result = "ÅÄÖ";

  assertEquals(result, expected);
});

Deno.test(function lowerCaseToWordsShouldWork() {
  const result = lowerCaseToWords("åäö");
  const expected: typeof result = ["åäö"];

  assertEquals(result, expected);
});

Deno.test(function upperCaseToWordsShouldWork() {
  const result = upperCaseToWords("ÅÄÖ");
  const expected: typeof result = ["ÅÄÖ"];

  assertEquals(result, expected);
});

Deno.test(function wordsToLowerCaseShouldWork() {
  const result = wordsToLowerCase(["Å", "Ä", "Ö"]);
  const expected: typeof result = "åäö";

  assertEquals(result, expected);
});

Deno.test(function wordsToUpperCaseShouldWork() {
  const result = wordsToUpperCase(["å", "ä", "ö"]);
  const expected: typeof result = "ÅÄÖ";

  assertEquals(result, expected);
});
