# Change Case TS

This library contains functions and types to convert strings, tuple members and property names from one case to another.

While there are plenty of other packages that does the same at runtime, this library is built for full type support.

Useful for converting known models for interacting with external APIs.

@example

```typescript
import { changeCase } from "@stefan/change-case-ts";

changeCase(
  "howAboutThemApples",
  "SCREAMING-KEBAB-CASE",
) satisfies "HOW-ABOUT-THEM-APPLES";

changeCase(
  {
    some_number: 123,
    an_array: [
      {
        with_a_prop: true
      }
    ],
  },
  "camelCase",
) satisfies {
  someNumber: 123;
  anArray: [
    {
      withAProp: true
    }
  ];
};
```

The following cases are currently supported:

- Non-delimited cases:
  - `lowercase`
  - `UPPERCASE`
- Capitalization-delimited cases:
  - `camelCase`
  - `PascalCase`
- Symbol-delimited cases:
  - `snake_case`
  - `UPPER_SNAKE_CASE` (a.k.a. `SCREAMING_SNAKE_CASE` and `CONSTANT_CASE`)
  - `kebab-case`
  - `UPPER-KEBAB-CASE` (a.k.a. `SCREAMING-KEBAB-CASE`)
