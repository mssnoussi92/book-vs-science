// What a client returns: the record, "not found" (HTTP 404 / no hit), or "unavailable" (network, 5xx, not cached).
export type Lookup<T> =
  | { kind: "ok"; record: T }
  | { kind: "not-found" }
  | { kind: "unavailable"; error: string };

export function unavailable<T>(e: unknown): Lookup<T> {
  return { kind: "unavailable", error: e instanceof Error ? e.message : String(e) };
}

export type Obj = Record<string, unknown>;
export function isObj(x: unknown): x is Obj {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}
export function str(x: unknown): string | undefined {
  return typeof x === "string" && x.trim() ? x : undefined;
}
export function arr(x: unknown): unknown[] {
  return Array.isArray(x) ? x : [];
}
