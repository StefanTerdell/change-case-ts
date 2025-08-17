import type { CaseName } from "./cases.ts";
import {
  type StringToWords,
  stringToWords,
  type WordsToString,
  wordsToString,
} from "./words.ts";

export type ChangeStringCase<
  String extends string,
  FromCase extends CaseName,
  ToCase extends CaseName,
> = FromCase extends ToCase ? String
  : WordsToString<ToCase, StringToWords<FromCase, String>>;

export function changeStringCase<
  const String extends string,
  const FromCase extends CaseName,
  const ToCase extends CaseName,
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
