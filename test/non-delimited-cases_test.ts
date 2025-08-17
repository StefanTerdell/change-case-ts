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
import { assertEqualsT } from "./utils.ts";

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

Deno.test("charToLowerCase", () => {
  assertEqualsT(charToLowerCase("Å"), "å");
});

Deno.test("charToUpperCase", () => {
  assertEqualsT(charToUpperCase("å"), "Å");
});

Deno.test("stringToLowerCase", () => {
  assertEqualsT(stringToLowerCase("ÅÄÖ"), "åäö");
});

Deno.test("stringToUpperCase", () => {
  assertEqualsT(stringToUpperCase("åäö"), "ÅÄÖ");
});

Deno.test("lowerCaseToWords", () => {
  assertEqualsT(lowerCaseToWords("åäö"), ["åäö"]);
});

Deno.test("upperCaseToWords", () => {
  assertEqualsT(upperCaseToWords("ÅÄÖ"), ["åäö"]);
});

Deno.test("wordsToLowerCase", () => {
  assertEqualsT(wordsToLowerCase(["Å", "Ä", "Ö"]), "åäö");
});

Deno.test("wordsToUpperCase", () => {
  assertEqualsT(wordsToUpperCase(["å", "ä", "ö"]), "ÅÄÖ");
});
