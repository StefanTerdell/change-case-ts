import { PascalCaseName } from "../src/capitalization-delimited-cases.ts";
import { KebabCaseName } from "../src/symbol-delimited-cases.ts";
import { ChangeTupleCase } from "../src/tuple.ts";

[123, true, "HelloWorld", null] satisfies ChangeTupleCase<
  [123, true, "hello-world", null],
  KebabCaseName,
  PascalCaseName
>;
