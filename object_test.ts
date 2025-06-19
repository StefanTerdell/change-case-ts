import {
  CamelCaseName,
  PascalCaseName,
} from "./capitalization-delimited-cases.ts";
import { ChangeObjectCase } from "./object.ts";
import { SnakeCaseName, UpperKebabCaseName } from "./symbol-delimited-cases.ts";

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
