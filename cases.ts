import { CapitalizationDelimitedCases } from "./capitalization-delimited-cases.ts";
import { NonDelimitedCases } from "./non-delimited-cases.ts";
import { SymbolDelimitedCases } from "./symbol-delimited-cases.ts";

export type Cases =
  | NonDelimitedCases
  | SymbolDelimitedCases
  | CapitalizationDelimitedCases;
