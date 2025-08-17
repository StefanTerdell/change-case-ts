import type { ChangeStringCase } from "../src/string.ts";

"HejHej" satisfies ChangeStringCase<"hejHej", "camelCase", "PascalCase">;

"AAAAA" satisfies ChangeStringCase<"a-a-a-a-a", "kebab-case", "UPPERCASE">;
