import { Cases } from "./cases.ts";
import { StringToWords, WordsToString } from "./words.ts";

export type ChangeStringCase<
  String extends string,
  FromCase extends Cases,
  ToCase extends Cases,
> = FromCase extends ToCase
  ? String
  : WordsToString<ToCase, StringToWords<FromCase, String>>;
