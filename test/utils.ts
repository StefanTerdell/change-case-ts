import { assertEquals } from "@std/assert";

// same as assertEquals, but with const generic so both values has to match
export function assertEqualsT<const A, const R extends A>(
  actual: A,
  expected: R,
  msg?: string,
): void {
  assertEquals(actual, expected, msg);
}
