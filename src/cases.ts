/**
 * This module contains the CaseName type - a union of all supported cases and their aliases - and isCaseName - a helper function to check if the provided string is a CaseName
 *
 * @module
 */

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

/** String-literal union of all supported cases' names and aliases */
export type CaseName =
  | NonDelimitedCaseName
  | SymbolDelimitedCaseName
  | CapitalizationDelimitedCaseName;

/** Validates that the provided string is a CaseName */
export function isCaseName(caseName: string): caseName is CaseName {
  return (
    isNonDelimitedCaseName(caseName) ||
    isSymbolDelimitedCaseName(caseName) ||
    isCapitalizationDelimitedCaseName(caseName)
  );
}
