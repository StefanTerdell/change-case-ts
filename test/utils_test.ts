import { deepKeyOf } from "../src/utils.ts";
import { assertEqualsT } from "./utils.ts";

Deno.test("deepKeyOf", () => {
  assertEqualsT(
    deepKeyOf({
      foo: { bar: 0, arr: [{ baz: 0 }] },
      bleh: 0,
    }),
    ["foo", "bar", "arr", "baz", "bleh"],
  );
});
