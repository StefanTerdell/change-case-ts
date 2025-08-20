// We can't use `changeCase` in this example, as it will try and change any string literal values within the given array instead of the keys in the object items, so we specifically use `changeKeysCase` instead to remove the ambiguity.

import { changeKeysCase } from "change-case-ts";

type Response = Array<{ foo_bar: string }>;

const response: Response = await fetch(
  "https://www.example.com",
).then((res) => res.json());

const result = changeKeysCase(response, "camelCase");

result satisfies Array<{ fooBar: string }>;
