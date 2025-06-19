import { CamelCase, PascalCase } from "./capitalization-delimited-cases.ts";
import { ChangeObjectCase } from "./object.ts";
import { SnakeCase, UpperKebabCase } from "./symbol-delimited-cases.ts";

({
  HelloWorld: true,
}) satisfies ChangeObjectCase<{ helloWorld: boolean }, CamelCase, PascalCase>;

({
  "HELLO-WORLD": true,
}) satisfies ChangeObjectCase<
  { "hello-world": boolean },
  SnakeCase,
  UpperKebabCase
>;
