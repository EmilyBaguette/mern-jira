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
