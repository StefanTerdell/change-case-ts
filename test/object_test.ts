import type {
  CamelCaseName,
  PascalCaseName,
} from "../src/capitalization-delimited-cases.ts";
import { type ChangeKeysCase, changeKeysCase } from "../src/object.ts";
import type {
  KebabCaseName,
  UpperSnakeCaseName,
} from "../src/symbol-delimited-cases.ts";
import { assertEqualsT } from "./utils.ts";

Deno.test("changeKeysCase - camelCase to PascalCase", () => {
  ({
    HelloWorld: true,
  }) satisfies ChangeKeysCase<
    { helloWorld: boolean },
    CamelCaseName,
    PascalCaseName
  >;

  const result = changeKeysCase(
    {
      helloWorld: true,
    },
    "camelCase",
    "PascalCase",
  );

  const expected: typeof result = {
    "HelloWorld": true,
  };

  assertEqualsT(result, expected);
});

Deno.test("changeKeysCase - kebab-case to UPPER_SNAKE_CASE", () => {
  ({
    "HELLO_WORLD": true,
  }) satisfies ChangeKeysCase<
    { "hello-world": boolean },
    KebabCaseName,
    UpperSnakeCaseName
  >;

  const result = changeKeysCase(
    {
      "hello-world": true,
    },
    "kebab-case",
    "UPPER_SNAKE_CASE",
  );

  const expected: typeof result = {
    "HELLO_WORLD": true,
  };

  assertEqualsT(result, expected);
});
