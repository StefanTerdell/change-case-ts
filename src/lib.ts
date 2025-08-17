/**
 * This library contains helpers to convert strings and property names from one case to another.
 *
 * While there are plenty of other packages that does the same, this library includes full type support for literals.
 *
 * @example
 * ```typescript
 * import { changeStringCase } from "@stefan/change-case-ts";
 *
 * changeStringCase(
 *   "howAboutThemApples",
 *   "camelCase",
 *   "snake_case",
 * ) satisfies "how_about_them_apples";
 * ```
 *
 * Currently, the following cases are supported:
 * - Non-delimited cases:
 *   - `lowercase`
 *   - `UPPERCASE`
 * - Capitalization-delimited cases:
 *   - `camelCase`
 *   - `UpperCase`
 * - Symbol-delimited cases:
 *   - `snake_case`
 *   - `UPPER_SNAKE_CASE` (aka `SCREAMING_SNAKE_CASE`)
 *   - `kebab-case`
 *   - `UPPER-KEBAB-CASE` (aka `SCREAMING-KEBAB-CASE`)
 *
 * @module
 */

export * from "./cases.ts";
export * from "./string.ts";
export * from "./tuple.ts";
export * from "./object.ts";
