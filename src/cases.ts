import {
  type CapitalizationDelimitedCaseName,
  isCapitalizationDelimitedCaseName,
} from "./capitalization-delimited-cases.ts";
import {
  isNonDelimitedCaseName,
  type NonDelimitedCaseName,
} from "./non-delimited-cases.ts";
import {
  isSymbolDelimitedCaseName,
  type SymbolDelimitedCaseName,
} from "./symbol-delimited-cases.ts";

export type CaseName =
  | NonDelimitedCaseName
  | SymbolDelimitedCaseName
  | CapitalizationDelimitedCaseName;

export function isCaseName(caseName: string): caseName is CaseName {
  return (
    isNonDelimitedCaseName(caseName) ||
    isSymbolDelimitedCaseName(caseName) ||
    isCapitalizationDelimitedCaseName(caseName)
  );
}
