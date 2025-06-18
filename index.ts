import { CamelCase, CamelCaseToWords, PascalCase, PascalCaseToWords, WordsToCamelCase, WordsToPascalCase } from "./capitalization-delimited-cases";
import { KebabCase, KebabCaseToWords, SnakeCase, SnakeCaseToWords, UpperKebabCase, UpperKebabCaseToWords, UpperSnakeCase, UpperSnakeCaseToWords, WordsToKebabCase, WordsToSnakeCase, WordsToUpperKebabCase, WordsToUpperSnakeCase } from "./symbol-delimited-cases";

type Cases =
  | CamelCase
  | PascalCase
  | SnakeCase
  | UpperSnakeCase
  | KebabCase
  | UpperKebabCase;

type WordsToString<
  Case extends Cases,
  Words extends string[],
> = Case extends CamelCase
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
            : Words;

type StringToWords<
  Case extends Cases,
  String extends string,
> = Case extends CamelCase
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
            : String;

export type ChangeStringCase<
  String extends string,
  FromCase extends Cases,
  ToCase extends Cases,
> = FromCase extends ToCase
  ? String
  : WordsToString<ToCase, StringToWords<FromCase, String>>;

const cTP: ChangeStringCase<"hejHej", "camelCase", "PascalCase"> = "HejHej";

export type ChangeTupleCase<
  Tuple extends string[],
  FromCase extends Cases,
  ToCase extends Cases,
> = ChangeTupleCaseAcc<Tuple, FromCase, ToCase, []>;

type ChangeTupleCaseAcc<
  Tuple extends string[],
  FromCase extends Cases,
  ToCase extends Cases,
  Acc extends [Tuple[number], string][],
> = Tuple extends [infer Head extends string, ...infer Tail extends string[]]
  ? ChangeTupleCaseAcc<
      Tail,
      FromCase,
      ToCase,
      [...Acc, [Head, ChangeStringCase<Head, FromCase, ToCase>]]
    >
  : Acc;

type BuildObjectFromConvertedKeys<
  Object extends { [key: string]: unknown },
  ConvertedKeys extends [keyof Object, string][],
  Acc extends { [key: string]: unknown } = {},
> = ConvertedKeys extends [
  [infer FromKey extends keyof Object, infer ToKey extends string],
  ...infer Tail extends [keyof Object, string][],
]
  ? BuildObjectFromConvertedKeys<
      Object,
      Tail,
      Acc & { [Key in ToKey]: Object[FromKey] }
    >
  : Acc;

type UnionToIntersection<Union> = (
  Union extends never ? never : (arg: Union) => never
) extends (arg: infer Intersection) => void
  ? Intersection
  : never;

type UnionToTuple<Union> =
  UnionToIntersection<
    Union extends never ? never : (t: Union) => Union
  > extends (_: never) => infer Member
    ? [...UnionToTuple<Exclude<Union, Member>>, Member]
    : [];

export type ChangeKeysCase<
  Object extends { [key: string]: unknown },
  FromCase extends Cases,
  ToCase extends Cases,
> =
  UnionToTuple<keyof Object> extends infer Keys extends string[]
    ? BuildObjectFromConvertedKeys<
        Object,
        ChangeTupleCase<Keys, FromCase, ToCase>
      >
    : Object;

const oCP: ChangeKeysCase<{ helloWorld: boolean }, CamelCase, PascalCase> = {
  HelloWorld: true,
};

const oSUk: ChangeKeysCase<
  { "hello-world": boolean },
  SnakeCase,
  UpperKebabCase
> = {
  "HELLO-WORLD": true,
};
