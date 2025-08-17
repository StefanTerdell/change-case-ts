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

import { assertEquals } from "@std/assert";

["hello", "world123!"] satisfies
  & PascalCaseToWords<"HelloWorld123!">
  & CamelCaseToWords<"helloWorld123!">;

["din", "mamma", "en", "pappa"] satisfies
  & PascalCaseToWords<"DinMammaEnPappa">
  & CamelCaseToWords<"dinMammaEnPappa">;

"dinMammaEnPappa" satisfies WordsToCamelCase<["din", "MAMMA", "en", "pApPa"]>;
"DinMammaEnPappa" satisfies WordsToPascalCase<["din", "MAMMA", "en", "pApPa"]>;

Deno.test(function wordsToCamelCaseShouldWork() {
  const result = wordsToCamelCase(["din", "MAMMA", "en", "pApPa"]);
  const expected: typeof result = "dinMammaEnPappa";

  assertEquals(result, expected);
});

Deno.test(function wordsToPascalCaseShouldWork() {
  const result = wordsToPascalCase(["din", "MAMMA", "en", "pApPa"]);
  const expected: typeof result = "DinMammaEnPappa";

  assertEquals(result, expected);
});

Deno.test(function camelCaseToWordsShouldWork() {
  const result = camelCaseToWords("dinMammaEnPappa");
  const expected: typeof result = ["din", "mamma", "en", "pappa"];

  assertEquals(result, expected);
});

Deno.test(function pascalCaseToWordsShouldWork() {
  const result = pascalCaseToWords("DinMammaEnPappa");
  const expected: typeof result = ["din", "mamma", "en", "pappa"];

  assertEquals(result, expected);
});
