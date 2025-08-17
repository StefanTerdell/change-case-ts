import {
  type CamelCaseToWords,
  camelCaseToWords,
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
