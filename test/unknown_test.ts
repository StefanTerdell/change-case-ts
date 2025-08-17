import type {
  CamelCaseName,
  PascalCaseName,
} from "../src/capitalization-delimited-cases.ts";
import type { KebabCaseName } from "../src/symbol-delimited-cases.ts";
import { type ChangeCase, changeCase } from "../src/unknown.ts";
import { assertEqualsT } from "./utils.ts";

Deno.test("changeCase - string", () => {
  "HejHej" satisfies ChangeCase<"hejHej", "camelCase", "PascalCase">;

  assertEqualsT(changeCase("hejHej", "camelCase", "PascalCase"), "HejHej");
});

Deno.test("changeCase - tuple", () => {
  [123, true, "HelloWorld", null] satisfies ChangeCase<
    [123, true, "hello-world", null],
    KebabCaseName,
    PascalCaseName
  >;

  assertEqualsT(
    changeCase(
      [123, true, "hello-world", null],
      "kebab-case",
      "PascalCase",
    ),
    [
      123,
      true,
      "HelloWorld",
      null,
    ],
  );
});

Deno.test("changeCase - keys", () => {
  ({
    HelloWorld: true,
  }) satisfies ChangeCase<
    { helloWorld: boolean },
    CamelCaseName,
    PascalCaseName
  >;

  assertEqualsT(
    changeCase(
      {
        helloWorld: true,
      },
      "camelCase",
      "PascalCase",
    ),
    {
      "HelloWorld": true,
    },
  );
});

Deno.test("changeCase - detect - string", () => {
  "HejHej" satisfies ChangeCase<"hejHej", "camelCase", "PascalCase">;

  assertEqualsT(changeCase("hejHej", "PascalCase"), "HejHej");
});

Deno.test("changeCase - detect - tuple", () => {
  assertEqualsT(
    changeCase(
      [123, true, "hello-world", null],
      "PascalCase",
    ),
    [
      123,
      true,
      "HelloWorld",
      null,
    ],
  );
});

Deno.test("changeCase - detect - keys", () => {
  assertEqualsT(
    changeCase(
      {
        helloWorld: true,
      },
      "PascalCase",
    ),
    {
      "HelloWorld": true,
    },
  );
});
