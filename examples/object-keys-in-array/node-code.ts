import { changeKeysCase } from "change-case-ts";

type Response = Array<{ foo_bar: string }>;

const response: Response = await fetch(
  "https://www.example.com",
).then((res) => res.json());

const result = changeKeysCase(response, "camelCase");

result satisfies Array<{ fooBar: string }>;
