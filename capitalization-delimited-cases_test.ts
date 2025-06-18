import {
  CamelCaseToWords,
  PascalCaseToWords,
  WordsToCamelCase,
  WordsToPascalCase,
} from "./capitalization-delimited-cases";

["din", "mamma", "en", "pappa"] satisfies PascalCaseToWords<"DinMammaEnPappa"> &
  CamelCaseToWords<"dinMammaEnPappa">;

"dinMammaEnPappa" satisfies WordsToCamelCase<["din", "MAMMA", "en", "pApPa"]>;
"DinMammaEnPappa" satisfies WordsToPascalCase<["din", "MAMMA", "en", "pApPa"]>;
