export type UnionToIntersection<Union> = (
  Union extends never ? never : (arg: Union) => never
) extends (arg: infer Intersection) => void ? Intersection
  : never;

export type UnionToTuple<Union> = UnionToIntersection<
  Union extends never ? never : (t: Union) => Union
> extends (_: never) => infer Member
  ? [...UnionToTuple<Exclude<Union, Member>>, Member]
  : [];

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export type DeepKeyOf<
  Object extends object,
> = Object extends (infer Item)[] ? DeepKeyOf<Extract<Item, object>> : {
  [Key in keyof Object]:
    (Object[Key] extends object ? DeepKeyOf<Object[Key]> | Key
      : Key);
}[keyof Object];

export function deepKeyOf<Object extends object>(
  object: Object,
): DeepKeyOf<Object>[] {
  return Array.isArray(object)
    ? object.reduce((acc, item) => {
      if (typeof item === "object" && item !== null) {
        acc.push(...deepKeyOf(item));
      }

      return acc;
    }, [])
    : typeof object === "object" && object !== null
    ? Object.keys(object).reduce(
      (acc: unknown[], key: unknown) => {
        acc.push(key);

        const value = object[key as keyof Object];

        if (
          typeof value === "object" && value !== null
        ) {
          acc.push(...deepKeyOf(value));
        }

        return acc;
      },
      [],
    ) as DeepKeyOf<Object>[]
    : [];
}
