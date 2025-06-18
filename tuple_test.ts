import { PascalCase } from "./capitalization-delimited-cases";
import { KebabCase } from "./symbol-delimited-cases";
import { ChangeTupleCase } from "./tuple";

[123, true, "HelloWorld", null] satisfies ChangeTupleCase<
  [123, true, "hello-world", null],
  KebabCase,
  PascalCase
>;
