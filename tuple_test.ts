import { PascalCase } from "./capitalization-delimited-cases.ts";
import { KebabCase } from "./symbol-delimited-cases.ts";
import { ChangeTupleCase } from "./tuple.ts";

[123, true, "HelloWorld", null] satisfies ChangeTupleCase<
  [123, true, "hello-world", null],
  KebabCase,
  PascalCase
>;
