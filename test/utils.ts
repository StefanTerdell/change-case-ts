import { assertEquals } from "@std/assert";
import { deepKeyOf } from "../src/utils.ts";

// same as assertEquals, but with const generic so both values has to match
export function assertEqualsT<const A, const R extends A>(
  actual: A,
  expected: R,
  msg?: string,
): void {
  assertEquals(actual, expected, msg);
}

Deno.test("deepKeyOf", () => {
  assertEqualsT(
    deepKeyOf({
      foo: { bar: 0, arr: [{ baz: 0 }] },
      bleh: 0,
    }),
    ["foo", "bar", "arr", "baz", "bleh"],
  );
});
