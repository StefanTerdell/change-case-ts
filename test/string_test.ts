import {
  type ChangeStringCase,
  changeStringCase,
  detectCaseNameFromString,
} from "../src/string.ts";
import { assertEqualsT } from "./utils.ts";

Deno.test("changeStringCase - camelCase to PascalCase", () => {
  "HejHej" satisfies ChangeStringCase<"hejHej", "camelCase", "PascalCase">;

  assertEqualsT(
    changeStringCase("hejHej", "camelCase", "PascalCase"),
    "HejHej",
  );
});

Deno.test("changeStringCase - kebab-case to UPPERCASE", () => {
  "AAAAA" satisfies ChangeStringCase<"a-a-a-a-a", "kebab-case", "UPPERCASE">;

  assertEqualsT(
    changeStringCase("a-a-a-a-a", "kebab-case", "UPPERCASE"),
    "AAAAA",
  );
});

Deno.test("detectCaseNameFromString - kebab-case", () => {
  assertEqualsT(detectCaseNameFromString("kebab-case"), "kebab-case");
});

Deno.test("detectCaseNameFromString - PascalCase", () => {
  assertEqualsT(detectCaseNameFromString("PascalCase"), "PascalCase");
});

Deno.test("detectCaseNameFromString - PascalCase - single word", () => {
  assertEqualsT(detectCaseNameFromString("Word"), "PascalCase");
});

Deno.test("detectCaseNameFromString - UPPERCASE", () => {
  assertEqualsT(detectCaseNameFromString("UPPERCASE"), "UPPERCASE");
});

Deno.test("detectCaseNameFromString - empty", () => {
  assertEqualsT(detectCaseNameFromString(""), undefined);
});

Deno.test("detectCaseNameFromString - unknown", () => {
  assertEqualsT(detectCaseNameFromString("-unknOWN"), undefined);
});

Deno.test("detectCaseName - snake_case", () => {
  assertEqualsT(detectCaseNameFromString("snake_case"), "snake_case");
});

Deno.test("detectCaseName - camelCase", () => {
  assertEqualsT(detectCaseNameFromString("camelCase"), "camelCase");
});

Deno.test("detectCaseName - lowercase", () => {
  assertEqualsT(detectCaseNameFromString("lowercase"), "lowercase");
});
