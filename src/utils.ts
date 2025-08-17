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
    ? object.reduce((acc, curr) => {
      if (typeof curr === "object") {
        acc.push(...deepKeyOf(curr));
      }

      return acc;
    }, [])
    // @ts-expect-error:
    : Object.keys(object ?? {}).reduce(
      // @ts-expect-error:
      (acc: string[], key: keyof Object & string) => {
        acc.push(key);

        if (typeof object[key] === "object") {
          // deno-lint-ignore no-explicit-any
          acc.push(...deepKeyOf(object[key] as any) as any);
        }

        return acc;
      },
      [],
    );
}
