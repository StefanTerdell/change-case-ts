import { CamelCase, PascalCase } from "./capitalization-delimited-cases";
import { ChangeObjectCase } from "./object";
import { SnakeCase, UpperKebabCase } from "./symbol-delimited-cases";

({
  HelloWorld: true,
}) satisfies ChangeObjectCase<
  { helloWorld: boolean },
  CamelCase,
  PascalCase
>;

({
  "HELLO-WORLD": true,
}) satisfies ChangeObjectCase<
  { "hello-world": boolean },
  SnakeCase,
  UpperKebabCase
>;
