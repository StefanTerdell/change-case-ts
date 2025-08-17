import type { PascalCaseName } from "../src/capitalization-delimited-cases.ts";
import type { KebabCaseName } from "../src/symbol-delimited-cases.ts";
import type { ChangeTupleCase } from "../src/tuple.ts";

[123, true, "HelloWorld", null] satisfies ChangeTupleCase<
  [123, true, "hello-world", null],
  KebabCaseName,
  PascalCaseName
>;
