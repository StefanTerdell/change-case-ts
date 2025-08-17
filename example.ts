import {
  changeKeysCase,
  changeStringCase,
  changeTupleCase,
} from "./src/lib.ts";

changeStringCase(
  "howAboutThemApples",
  "camelCase",
  "snake_case",
) satisfies "how_about_them_apples";

changeKeysCase(
  {
    someNumber: 123,
    anotherProperty: true,
  },
  "camelCase",
  "snake_case",
) satisfies {
  some_number: 123;
  another_property: true;
};

changeTupleCase(
  [
    "someRandomLiteral",
    123,
    JSON.stringify(null),
  ],
  "camelCase",
  "snake_case",
) satisfies [
  "some_random_literal",
  123,
  string,
];
