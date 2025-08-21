import type { PascalCaseName } from "../src/capitalization-delimited-cases.ts";
import type { KebabCaseName } from "../src/symbol-delimited-cases.ts";
import {
  type ChangeArrayCase,
  changeArrayCase,
  detectCaseNameFromArray,
} from "../src/array.ts";
import { assertEqualsT } from "./utils.ts";

Deno.test("Change tuple case", () => {
  [123, true, "HelloWorld", null] satisfies ChangeArrayCase<
    [123, true, "hello-world", null],
    PascalCaseName,
    KebabCaseName
  >;

  assertEqualsT(
    changeArrayCase(
      [123, true, "hello-world", null],
      "PascalCase",
      "kebab-case",
    ),
    [
      123,
      true,
      "HelloWorld",
      null,
    ],
  );
});

Deno.test("Detect CaseName from tuple", () => {
  assertEqualsT(
    detectCaseNameFromArray([123, "foo-bar", "derp"]),
    "kebab-case",
  );
});

Deno.test("Detect CaseName from array", () => {
  const array: (123 | "foo-bar" | "derp")[] = [
    "derp",
    123,
    "foo-bar",
    "derp",
    "derp",
  ];

  assertEqualsT(
    detectCaseNameFromArray(array),
    "kebab-case",
  );
});
