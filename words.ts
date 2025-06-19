import { CaseName } from "./cases.ts";
import {
  CamelCaseName,
  CamelCaseToWords,
  PascalCaseName,
  PascalCaseToWords,
  WordsToCamelCase,
  WordsToPascalCase,
} from "./capitalization-delimited-cases.ts";
import {
  LowerCaseName,
  LowerCaseToWords,
  UpperCaseName,
  UpperCaseToWords,
  WordsToLowerCase,
  WordsToUpperCase,
} from "./non-delimited-cases.ts";
import {
  KebabCaseName,
  KebabCaseToWords,
  SnakeCaseName,
  SnakeCaseToWords,
  UpperKebabCaseName,
  UpperKebabCaseToWords,
  UpperSnakeCaseName,
  UpperSnakeCaseToWords,
  WordsToKebabCase,
  WordsToSnakeCase,
  WordsToUpperKebabCase,
  WordsToUpperSnakeCase,
} from "./symbol-delimited-cases.ts";

export type WordsToString<
  Case extends CaseName,
  Words extends string[],
> = Case extends LowerCaseName
  ? WordsToLowerCase<Words>
  : Case extends UpperCaseName
    ? WordsToUpperCase<Words>
    : Case extends CamelCaseName
      ? WordsToCamelCase<Words>
      : Case extends PascalCaseName
        ? WordsToPascalCase<Words>
        : Case extends SnakeCaseName
          ? WordsToSnakeCase<Words>
          : Case extends UpperSnakeCaseName
            ? WordsToUpperSnakeCase<Words>
            : Case extends KebabCaseName
              ? WordsToKebabCase<Words>
              : Case extends UpperKebabCaseName
                ? WordsToUpperKebabCase<Words>
                : WordsToStringAcc<Words>;

type WordsToStringAcc<
  Words extends string[],
  Acc extends string = "",
> = Words extends [infer Head extends string, ...infer Tail extends string[]]
  ? WordsToStringAcc<Tail, `${Acc}${Head}`>
  : Acc;

export type StringToWords<
  Case extends CaseName,
  String extends string,
> = Case extends LowerCaseName
  ? LowerCaseToWords<String>
  : Case extends UpperCaseName
    ? UpperCaseToWords<String>
    : Case extends CamelCaseName
      ? CamelCaseToWords<String>
      : Case extends PascalCaseName
        ? PascalCaseToWords<String>
        : Case extends SnakeCaseName
          ? SnakeCaseToWords<String>
          : Case extends UpperSnakeCaseName
            ? UpperSnakeCaseToWords<String>
            : Case extends KebabCaseName
              ? KebabCaseToWords<String>
              : Case extends UpperKebabCaseName
                ? UpperKebabCaseToWords<String>
                : [String];
