import { type ChangeStringCase, changeStringCase } from "../src/string.ts";
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
