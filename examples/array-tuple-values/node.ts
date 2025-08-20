import { changeCase } from "change-case-ts";

const tuples = changeCase(["foo-bar", "baz", 123], "PascalCase");

tuples satisfies ["FooBar", "Baz", 123];
