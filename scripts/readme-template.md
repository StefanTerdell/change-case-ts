# Change Case TS

This library contains functions and types to convert strings, tuple members and property names from one case to another.

While there are plenty of other packages that does the same at runtime, this library is built for full type support.

Useful for converting known models for interacting with external APIs.

## Exports

The main export of interest is `changeCase`. It's parameters are the value which to change, the optional source case, and the target case. If no source case is provided, the library will try and detect it. `changeCase` works for strings, tuple/array-values, and object keys, in that order. Use `changeArrayCase`, `changeStringCase`, or `changeKeysCase` to specify the target, if needed.

The library also exports types correlating to the functions mentioned above (such as `ChangeCase<Value, ToCase, FromCase>` etc.), as well as for detecting cases, case names as constants and as literal string types grouped into unions, etc.

Last but not least are the functional variants of the case changing functions: `caseChanger`, `stringCaseChanger`, `arrayCaseChanger` and `keysCaseChanger`. These can be useful for instance when using `transform` with Zod schemas (`z.object({ FOO_BAR: z.string() }).transform(caseChanger("camelCase"))`).

## Installation

{{{examples/installation}}}

## Examples

{{{examples/string-literal,Changing the case of a string literal}}}

{{{examples/object-keys,Changing the case of the keys in an object}}}

{{{examples/array-tuple-values,Changing the case of array or tuple values}}}

{{{examples/object-keys-in-array,Changing the keys of objects within an array}}}

{{{examples/env-file-and-zod,Loading a dotenv-file and parsing with Zod}}}

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
