export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
export const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;
