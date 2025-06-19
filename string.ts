import { CaseName } from "./cases.ts";
import {
  stringToWords,
  StringToWords,
  wordsToString,
  WordsToString,
} from "./words.ts";

export type ChangeStringCase<
  String extends string,
  FromCase extends CaseName,
  ToCase extends CaseName,
> = FromCase extends ToCase
  ? String
  : WordsToString<ToCase, StringToWords<FromCase, String>>;

export function changeStringCase<
  String extends string,
  FromCase extends CaseName,
  ToCase extends CaseName,
>(
  string: String,
  fromCase: FromCase,
  toCase: ToCase,
): ChangeStringCase<String, FromCase, ToCase> {
  return wordsToString(
    toCase,
    stringToWords(fromCase, string),
  ) as ChangeStringCase<String, FromCase, ToCase>;
}
