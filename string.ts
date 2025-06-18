import { Cases } from "./cases";
import { StringToWords, WordsToString } from "./words";

export type ChangeStringCase<
  String extends string,
  FromCase extends Cases,
  ToCase extends Cases,
> = FromCase extends ToCase
  ? String
  : WordsToString<ToCase, StringToWords<FromCase, String>>;
