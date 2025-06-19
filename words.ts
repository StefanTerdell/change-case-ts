import { Cases } from "./cases.ts";
import {
  CamelCase,
  CamelCaseToWords,
  PascalCase,
  PascalCaseToWords,
  WordsToCamelCase,
  WordsToPascalCase,
} from "./capitalization-delimited-cases.ts";
import {
  LowerCase,
  LowerCaseToWords,
  UpperCase,
  UpperCaseToWords,
  WordsToLowerCase,
  WordsToUpperCase,
} from "./non-delimited-cases.ts";
import {
  KebabCase,
  KebabCaseToWords,
  SnakeCase,
  SnakeCaseToWords,
  UpperKebabCase,
  UpperKebabCaseToWords,
  UpperSnakeCase,
  UpperSnakeCaseToWords,
  WordsToKebabCase,
  WordsToSnakeCase,
  WordsToUpperKebabCase,
  WordsToUpperSnakeCase,
} from "./symbol-delimited-cases.ts";

export type WordsToString<
  Case extends Cases,
  Words extends string[],
> = Case extends LowerCase
  ? WordsToLowerCase<Words>
  : Case extends UpperCase
    ? WordsToUpperCase<Words>
    : Case extends CamelCase
      ? WordsToCamelCase<Words>
      : Case extends PascalCase
        ? WordsToPascalCase<Words>
        : Case extends SnakeCase
          ? WordsToSnakeCase<Words>
          : Case extends UpperSnakeCase
            ? WordsToUpperSnakeCase<Words>
            : Case extends KebabCase
              ? WordsToKebabCase<Words>
              : Case extends UpperKebabCase
                ? WordsToUpperKebabCase<Words>
                : WordsToStringAcc<Words>;

type WordsToStringAcc<
  Words extends string[],
  Acc extends string = "",
> = Words extends [infer Head extends string, ...infer Tail extends string[]]
  ? WordsToStringAcc<Tail, `${Acc}${Head}`>
  : Acc;

export type StringToWords<
  Case extends Cases,
  String extends string,
> = Case extends LowerCase
  ? LowerCaseToWords<String>
  : Case extends UpperCase
    ? UpperCaseToWords<String>
    : Case extends CamelCase
      ? CamelCaseToWords<String>
      : Case extends PascalCase
        ? PascalCaseToWords<String>
        : Case extends SnakeCase
          ? SnakeCaseToWords<String>
          : Case extends UpperSnakeCase
            ? UpperSnakeCaseToWords<String>
            : Case extends KebabCase
              ? KebabCaseToWords<String>
              : Case extends UpperKebabCase
                ? UpperKebabCaseToWords<String>
                : [String];
