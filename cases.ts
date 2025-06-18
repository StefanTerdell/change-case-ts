import { CapitalizationDelimitedCases } from "./capitalization-delimited-cases";
import { NonDelimitedCases } from "./non-delimited-cases";
import { SymbolDelimitedCases } from "./symbol-delimited-cases";

export type Cases =
  | NonDelimitedCases
  | SymbolDelimitedCases
  | CapitalizationDelimitedCases;

