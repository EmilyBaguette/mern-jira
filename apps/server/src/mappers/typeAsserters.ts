import { ObjectId } from 'mongodb';

export function assertString(value: unknown, key: PropertyKey): string {
  if (typeof value !== 'string') {
    throw new TypeError(`Expected "${String(key)}" to be a string, got ${typeof value}`);
  }
  return value;
}

export function assertValidDate(value: unknown, key: PropertyKey): Date {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) {
      throw new RangeError(`Value for "${String(key)}" is a Date but is invalid (NaN time).`);
    }
    return value;
  }

  if (typeof value === 'string') {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) {
      throw new RangeError(`Value for "${String(key)}" is not a valid date string: "${value}".`);
    }
    return d;
  }

  throw new TypeError(`Expected "${String(key)}" to be a Date or date string, got ${typeof value}`);
}

export function assertObjectId(value: unknown, key: PropertyKey): ObjectId {
  if (value instanceof ObjectId) {
    return value;
  }

  throw new TypeError(
    `Expected "${String(key)}" to be an ObjectId, got ${Object.prototype.toString.call(value)}`
  );
}
