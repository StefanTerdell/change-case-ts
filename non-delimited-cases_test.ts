import { StringToLowerCase, StringToUpperCase } from "./non-delimited-cases";

"abc__d" satisfies StringToLowerCase<"AbC__d">;
// @ts-expect-error
"ABC__D" satisfies StringToLowerCase<"AbC__d">;
// @ts-expect-error
"AbC__d" satisfies StringToLowerCase<"AbC__d">;

"ABC__D" satisfies StringToUpperCase<"AbC__d">;
// @ts-expect-error
"abc__d" satisfies StringToUpperCase<"AbC__d">;
// @ts-expect-error
"AbC__d" satisfies StringToUpperCase<"AbC__d">;
