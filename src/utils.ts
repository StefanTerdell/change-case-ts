export type UnionToIntersection<Union> = (
  Union extends never ? never : (arg: Union) => never
) extends (arg: infer Intersection) => void ? Intersection
  : never;

export type UnionToTuple<Union> = UnionToIntersection<
  Union extends never ? never : (t: Union) => Union
> extends (_: never) => infer Member
  ? [...UnionToTuple<Exclude<Union, Member>>, Member]
  : [];
