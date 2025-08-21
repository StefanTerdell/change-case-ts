# Change Case TS

This library contains functions and types to convert strings, tuple members and property names from one case to another.

While there are plenty of other packages that does the same at runtime, this library is built for full type support.

Useful for converting known models for interacting with external APIs.

## Exports

The main export of interest is `changeCase`. It's parameters are the value which to change, the optional source case, and the target case. If no source case is provided, the library will try and detect it. `changeCase` works for strings, tuple/array-values, and object keys, in that order. Use `changeArrayCase`, `changeStringCase`, or `changeKeysCase` to specify the target, if needed.

The library also exports types correlating to the functions mentioned above (such as `ChangeCase<Value, ToCase, FromCase>` etc.), as well as for detecting cases, case names as constants and as literal string types grouped into unions, etc.

## Installation

Setup:

```bash
deno add jsr:@stefan/change-case-ts
```

Code:

```typescript
import { changeCase } from "@stefan/change-case-ts";
```

## Examples

### Changing the case of a string literal

```typescript
import { changeCase } from "@stefan/change-case-ts";

const stringLiteral = changeCase("howAboutThemApples", "SCREAMING-KEBAB-CASE");

stringLiteral satisfies "HOW-ABOUT-THEM-APPLES";
```

### Changing the case of the keys in an object

```typescript
import { changeCase } from "@stefan/change-case-ts";

const objectKeys = changeCase(
  {
    some_number: 123,
    an_array: [
      {
        with_a_prop: true,
      },
    ],
  },
  "camelCase",
);

objectKeys satisfies {
  someNumber: 123;
  anArray: [{
    withAProp: true;
  }];
};
```

### Changing the case of array or tuple values

```typescript
import { changeCase } from "@stefan/change-case-ts";

const tuples = changeCase(["foo-bar", "baz", 123], "PascalCase");

tuples satisfies ["FooBar", "Baz", 123];
```

### Changing the keys of objects within an array

```typescript
// We can't use `changeCase` in this example, as it will try and change any string literal values within the given array instead of the keys in the object items, so we specifically use `changeKeysCase` instead to remove the ambiguity.

import { changeKeysCase } from "@stefan/change-case-ts";

type Response = Array<{ foo_bar: string }>;

const response: Response = await fetch(
  "https://www.example.com",
).then((res) => res.json());

const result = changeKeysCase(response, "camelCase");

result satisfies Array<{ fooBar: string }>;
```

### Loading a dotenv-file and parsing with Zod

Setup:

```bash
deno add npm:zod jsr:@std/dotenv jsr:@stefan/change-case-ts
echo "MY_ENV_VAR='Hello, world!'" >> .env
```

Code:

```typescript
import "@std/dotenv/load";
import { changeCase } from "@stefan/change-case-ts";
import z from "zod";

const envSchema = z.object({
  MY_ENV_VAR: z.string(),
});

const camelCaseEnvSchema = envSchema.transform((vars) =>
  changeCase(vars, "camelCase")
);

const env = camelCaseEnvSchema.parse(Deno.env.toObject());

env satisfies {
  myEnvVar: string;
};

console.log(env.myEnvVar);
```

## Supported cases

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

_Missing a case? [File an issue on GitHub](http://www.github.com/StefanTerdell/change-case-ts)_
