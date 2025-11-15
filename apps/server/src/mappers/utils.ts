import { ObjectId } from 'mongodb';

type NonUndefined<T> = {
  [K in keyof T as T[K] extends undefined ? never : K]: Exclude<T[K], undefined>;
};
export function omitUndefined<T extends object>(obj: T): NonUndefined<T> {
  const result = {} as any;
  for (const key in obj) {
    if (obj[key] !== undefined) {
      result[key] = obj[key];
    }
  }
  return result;
}

type AnyRecord = Record<PropertyKey, any>;

function transformKeys<T extends AnyRecord, const K extends readonly (keyof T)[], R>(
  input: T,
  keys: K,
  convert: (value: T[K[number]], key: K[number]) => R
): Omit<T, K[number]> & { [P in K[number]]: R } {
  const result: any = { ...input };

  for (const key of keys) {
    result[key] = convert(input[key], key);
  }

  return result;
}

export function withObjectIds<T extends AnyRecord, const K extends readonly (keyof T)[]>(
  input: T & Record<K[number], string>,
  idKeys: K
): Omit<T, K[number]> & { [P in K[number]]: ObjectId } {
  return transformKeys(input, idKeys, (value) => new ObjectId(value as string));
}

export function withHexIds<T extends AnyRecord, const K extends readonly (keyof T)[]>(
  input: T & Record<K[number], ObjectId>,
  idKeys: K
): Omit<T, K[number]> & { [P in K[number]]: string } {
  return transformKeys(input, idKeys, (value) => (value as ObjectId).toHexString());
}

export function withDates<T extends AnyRecord, const K extends readonly (keyof T)[]>(
  input: T & Record<K[number], string>,
  keys: K
): Omit<T, K[number]> & { [P in K[number]]: Date } {
  return transformKeys(input, keys, (value) => new Date(value as string));
}

export function withIsoStrings<T extends AnyRecord, const K extends readonly (keyof T)[]>(
  input: T & Record<K[number], Date>,
  keys: K
): Omit<T, K[number]> & { [P in K[number]]: string } {
  return transformKeys(input, keys, (value) => (value as Date).toISOString());
}
