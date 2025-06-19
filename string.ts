import { CaseName } from "./cases.ts";
import { StringToWords, WordsToString } from "./words.ts";

export type ChangeStringCase<
  String extends string,
  FromCase extends CaseName,
  ToCase extends CaseName,
> = FromCase extends ToCase
  ? String
  : WordsToString<ToCase, StringToWords<FromCase, String>>;
