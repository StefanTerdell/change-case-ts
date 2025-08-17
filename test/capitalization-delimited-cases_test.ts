import {
  type CamelCaseToWords,
  camelCaseToWords,
  isCamelCase,
  isPascalCase,
  type PascalCaseToWords,
  pascalCaseToWords,
  type WordsToCamelCase,
  wordsToCamelCase,
  type WordsToPascalCase,
  wordsToPascalCase,
} from "../src/capitalization-delimited-cases.ts";

import { assertEqualsT } from "./utils.ts";

["hello", "world123!"] satisfies
  & PascalCaseToWords<"HelloWorld123!">
  & CamelCaseToWords<"helloWorld123!">;

["din", "mamma", "en", "pappa"] satisfies
  & PascalCaseToWords<"DinMammaEnPappa">
  & CamelCaseToWords<"dinMammaEnPappa">;

"dinMammaEnPappa" satisfies WordsToCamelCase<["din", "MAMMA", "en", "pApPa"]>;
"DinMammaEnPappa" satisfies WordsToPascalCase<["din", "MAMMA", "en", "pApPa"]>;

Deno.test("wordsToCamelCase", () => {
  assertEqualsT(
    wordsToCamelCase(["din", "MAMMA", "en", "pApPa"]),
    "dinMammaEnPappa",
  );
});

Deno.test("wordsToPascalCase", () => {
  assertEqualsT(
    wordsToPascalCase(["din", "MAMMA", "en", "pApPa"]),
    "DinMammaEnPappa",
  );
});

Deno.test("isPascalCase", () => {
  assertEqualsT(isPascalCase("PascalCase"), true);
});

Deno.test("isPascalCase - not camelCase", () => {
  assertEqualsT(isPascalCase("camelCase"), false);
});

Deno.test("isPascalCase - not UPPERCASE", () => {
  assertEqualsT(isPascalCase("UPPERCASE"), false);
});

Deno.test("isPascalCase - not lowercase", () => {
  assertEqualsT(isPascalCase("lowercase"), false);
});

Deno.test("camelCaseToWords", () => {
  assertEqualsT(camelCaseToWords("dinMammaEnPappa"), [
    "din",
    "mamma",
    "en",
    "pappa",
  ]);
});

Deno.test("pascalCaseToWords", () => {
  assertEqualsT(pascalCaseToWords("DinMammaEnPappa"), [
    "din",
    "mamma",
    "en",
    "pappa",
  ]);
});

Deno.test("isCamelCase", () => {
  assertEqualsT(isCamelCase("camelCase"), true);
});

Deno.test("isCamelCase - not PascalCase", () => {
  assertEqualsT(isCamelCase("PascalCase"), false);
});

Deno.test("isCamelCase - not UPPERCASE", () => {
  assertEqualsT(isCamelCase("UPPERCASE"), false);
});

Deno.test("isCamelCase - not lowercase", () => {
  assertEqualsT(isCamelCase("lowercase"), false);
});
