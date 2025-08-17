import type {
  CamelCaseName,
  PascalCaseName,
} from "../src/capitalization-delimited-cases.ts";
import {
  type ChangeKeysCase,
  changeKeysCase,
  detectCaseNameFromKeys,
} from "../src/object.ts";
import type {
  KebabCaseName,
  UpperSnakeCaseName,
} from "../src/symbol-delimited-cases.ts";
import { assertEqualsT } from "./utils.ts";

Deno.test("changeKeysCase - camelCase to PascalCase, recursive", () => {
  ({
    HelloWorld: true,
    Nested: {
      Prop: 0,
    },
    Arr: [{
      Hello: "again",
    }],
  }) satisfies ChangeKeysCase<
    { helloWorld: boolean; nested: { prop: 0 }; arr: [{ hello: "again" }] },
    CamelCaseName,
    PascalCaseName
  >;

  assertEqualsT(
    changeKeysCase(
      [{
        fee: [{
          fy: [{
            fo: "fum",
          }],
        }],
      }],
      "camelCase",
      "PascalCase",
    ),
    [{
      "Fee": [{
        "Fy": [{
          "Fo": "fum",
        }],
      }],
    }],
  );
});
Deno.test("changeKeysCase - camelCase to PascalCase", () => {
  ({
    HelloWorld: true,
  }) satisfies ChangeKeysCase<
    { helloWorld: boolean },
    CamelCaseName,
    PascalCaseName
  >;

  assertEqualsT(
    changeKeysCase(
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

Deno.test("changeKeysCase - kebab-case to UPPER_SNAKE_CASE", () => {
  ({
    "HELLO_WORLD": true,
  }) satisfies ChangeKeysCase<
    { "hello-world": boolean },
    KebabCaseName,
    UpperSnakeCaseName
  >;

  assertEqualsT(
    changeKeysCase(
      {
        "hello-world": true,
      },
      "kebab-case",
      "UPPER_SNAKE_CASE",
    ),
    {
      "HELLO_WORLD": true,
    },
  );
});

Deno.test("detectCaseNameFromKeys - delimited cases take precedent", () => {
  assertEqualsT(
    detectCaseNameFromKeys({
      "derp": false,
      "herp-derp": true,
      "herp": false,
    }),
    "kebab-case",
  );
});

Deno.test("detectCaseNameFromKeys - non-delimited cases work too", () => {
  assertEqualsT(
    detectCaseNameFromKeys({
      "HERP": false,
      "DERP": false,
    }),
    "UPPERCASE",
  );
});
