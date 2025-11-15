export function createTimestamps<T extends object>(doc: T, now = new Date()) {
  return {
    ...doc,
    createdAt: now,
    updatedAt: now,
  };
}

export function updateTimestamps<T extends object>(doc: T, now = new Date()) {
  return {
    ...doc,
    updatedAt: now,
  };
}
