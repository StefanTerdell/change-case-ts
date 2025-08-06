import {
  CamelCaseName,
  PascalCaseName,
} from "../src/capitalization-delimited-cases.ts";
import { ChangeObjectCase } from "../src/object.ts";
import {
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
