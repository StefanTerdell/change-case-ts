import { ChangeStringCase } from "./string.ts";

"HejHej" satisfies ChangeStringCase<"hejHej", "camelCase", "PascalCase">;

"AAAAA" satisfies ChangeStringCase<"a-a-a-a-a", "kebab-case", "UPPERCASE">;
