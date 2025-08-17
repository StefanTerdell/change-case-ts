import { detectCaseName } from "../src/cases.ts";
import { assertEqualsT } from "./utils.ts";

Deno.test("detectCaseName - snake_case", () => {
  assertEqualsT(detectCaseName("snake_case"), "snake_case");
});

Deno.test("detectCaseName - kebab-case", () => {
  assertEqualsT(detectCaseName("kebab-case"), "kebab-case");
});

Deno.test("detectCaseName - camelCase", () => {
  assertEqualsT(detectCaseName("camelCase"), "camelCase");
});

Deno.test("detectCaseName - PascalCase", () => {
  assertEqualsT(detectCaseName("PascalCase"), "PascalCase");
});

Deno.test("detectCaseName - lowercase", () => {
  assertEqualsT(detectCaseName("lowercase"), "lowercase");
});

Deno.test("detectCaseName - UPPERCASE", () => {
  assertEqualsT(detectCaseName("UPPERCASE"), "UPPERCASE");
});

Deno.test("detectCaseName - unknown", () => {
  assertEqualsT(detectCaseName("-unkKNOWN"), undefined);
});

Deno.test("detectCaseName - empty", () => {
  assertEqualsT(detectCaseName(""), undefined);
});
