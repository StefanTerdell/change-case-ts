import { StringToLowerCase, StringToUpperCase } from "./non-delimited-cases.ts";

"abc__d" satisfies StringToLowerCase<"AbC__d">;
// @ts-expect-error: test
"ABC__D" satisfies StringToLowerCase<"AbC__d">;
// @ts-expect-error: test
"AbC__d" satisfies StringToLowerCase<"AbC__d">;

"ABC__D" satisfies StringToUpperCase<"AbC__d">;
// @ts-expect-error: test
"abc__d" satisfies StringToUpperCase<"AbC__d">;
// @ts-expect-error: test
"AbC__d" satisfies StringToUpperCase<"AbC__d">;
