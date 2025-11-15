import { ObjectId } from 'mongodb';
import { z } from 'zod';

type AnyRecord = Record<PropertyKey, unknown>;

function transformKeysWithSchema<
  T extends AnyRecord,
  const K extends readonly (keyof T)[],
  S extends z.ZodTypeAny,
>(input: T, keys: K, schema: S): Omit<T, K[number]> & { [P in K[number]]: z.infer<S> } {
  const result = { ...input } as Omit<T, K[number]> & {
    [P in K[number]]: z.infer<S>;
  };

  for (const key of keys) {
    const value = input[key];
    // You can use parse (throws) or safeParse (custom error)
    const parsed = schema.parse(value);
    result[key] = parsed;
  }

  return result;
}
