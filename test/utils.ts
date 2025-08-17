import { assertEquals } from "@std/assert";

// same as assertEquals, but with const generic so both values has to match
export function assertEqualsT<const T>(
  actual: T,
  expected: T,
  msg?: string,
): void {
  assertEquals(actual, expected, msg);
}
