import type {
  CamelCaseName,
  PascalCaseName,
} from "../src/capitalization-delimited-cases.ts";
import type { ChangeObjectCase } from "../src/object.ts";
import type {
  SnakeCaseName,
  UpperKebabCaseName,
} from "../src/symbol-delimited-cases.ts";

({
  HelloWorld: true,
}) satisfies ChangeObjectCase<
  { helloWorld: boolean },
  CamelCaseName,
  PascalCaseName
>;

({
  "HELLO-WORLD": true,
}) satisfies ChangeObjectCase<
  { "hello-world": boolean },
  SnakeCaseName,
  UpperKebabCaseName
>;
