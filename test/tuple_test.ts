import type { PascalCaseName } from "../src/capitalization-delimited-cases.ts";
import type { KebabCaseName } from "../src/symbol-delimited-cases.ts";
import {
  type ChangeTupleCase,
  changeTupleCase,
  detectCaseNameFromTuple,
} from "../src/tuple.ts";
import { assertEqualsT } from "./utils.ts";

Deno.test("changeTupleCase", () => {
  [123, true, "HelloWorld", null] satisfies ChangeTupleCase<
    [123, true, "hello-world", null],
    KebabCaseName,
    PascalCaseName
  >;

  assertEqualsT(
    changeTupleCase(
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

Deno.test("detectCaseNameFromTuple", () => {
  assertEqualsT(
    detectCaseNameFromTuple([123, "foo-bar", "derp"]),
    "kebab-case",
  );
});
