export function toError(err: unknown): Error {
  if (err instanceof Error) {
    return err;
  }

  if (typeof err === 'string') {
    try {
      const parsed = JSON.parse(err);
      if (parsed && typeof parsed === 'object') {
        const message = extractMessage(parsed);
        if (message) return new Error(message);
      }
    } catch {}
    return new Error(err);
  }

  if (err && typeof err === 'object') {
    const message = extractMessage(err);
    if (message) return new Error(message);
  }

  return new Error(String(err));
}

function extractMessage(obj: unknown): string | undefined {
  if (!obj || typeof obj !== 'object') return undefined;
  const o = obj as Record<string, unknown>;

  if (typeof o.message === 'string') return o.message;
  if (typeof o.error === 'string') return o.error;

  if (typeof o.error === 'object' && o.error !== null) {
    const nested = extractMessage(o.error);
    if (nested) return nested;
  }

  return undefined;
}
