// Small JSON client for the three bibliographic APIs. Generic User-Agent (never an e-mail nor a name), three tries
// with a wait on 5xx / 429 / timeout / non-JSON answer, optional disk cache keyed by URL. Everything that needs the
// network receives a `FetchJson` so the tests never go online.
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

export const USER_AGENT = "book-vs-science/0.1 (+https://github.com/mssnoussi92/book-vs-science)";

/** `status` is 200 (body = parsed JSON) or 404 (body = null). Anything else makes `fetchJson` throw. */
export interface JsonResponse {
  status: number;
  body: unknown;
}
export type FetchJson = (url: string) => Promise<JsonResponse>;

export class NotCachedError extends Error {
  constructor(url: string) {
    super(`not in the cache (run with --live): ${url}`);
    this.name = "NotCachedError";
  }
}

export interface HttpOptions {
  /** Where answers are written (and read, unless `readCache` is false). Omit for no cache at all. */
  cacheDir?: string;
  /** Read answers from the cache first. Default true when `cacheDir` is set. */
  readCache?: boolean;
  /** Never go online: a miss throws `NotCachedError`. */
  offline?: boolean;
  tries?: number;
  timeoutMs?: number;
  /** Wait between two tries, in ms (attempt starts at 1). Injectable for the tests. */
  sleep?: (ms: number) => Promise<void>;
  fetchImpl?: typeof fetch;
}

export function cacheFile(cacheDir: string, url: string): string {
  return join(cacheDir, createHash("sha256").update(url).digest("hex") + ".json");
}

export function makeFetchJson(options: HttpOptions = {}): FetchJson {
  const { cacheDir, offline = false, tries = 3, timeoutMs = 30_000 } = options;
  const readCache = options.readCache ?? cacheDir !== undefined;
  const sleep = options.sleep ?? ((ms: number) => new Promise<void>((r) => setTimeout(r, ms)));
  const doFetch = options.fetchImpl ?? fetch;

  return async (url: string): Promise<JsonResponse> => {
    if (cacheDir && (readCache || offline)) {
      try {
        const cached = JSON.parse(await readFile(cacheFile(cacheDir, url), "utf8")) as JsonResponse;
        return cached;
      } catch {
        /* a miss */
      }
    }
    if (offline) throw new NotCachedError(url);

    let lastError = "unknown error";
    for (let attempt = 1; attempt <= tries; attempt++) {
      try {
        const res = await doFetch(url, {
          headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
          signal: AbortSignal.timeout(timeoutMs),
        });
        let answer: JsonResponse | null = null;
        if (res.status === 404) {
          answer = { status: 404, body: null };
        } else if (res.status === 200) {
          try {
            answer = { status: 200, body: JSON.parse(await res.text()) };
          } catch {
            lastError = "answer is not JSON";
          }
        } else if (res.status >= 500 || res.status === 429) {
          lastError = `HTTP ${res.status}`;
        } else {
          throw new Error(`HTTP ${res.status}`); // other 4xx: trying again will not change it
        }
        if (answer) {
          if (cacheDir) {
            await mkdir(cacheDir, { recursive: true });
            await writeFile(cacheFile(cacheDir, url), JSON.stringify(answer));
          }
          return answer;
        }
      } catch (e) {
        if (e instanceof Error && /^HTTP 4\d\d$/.test(e.message)) throw e;
        lastError = e instanceof Error ? e.message : String(e);
      }
      if (attempt < tries) await sleep(1000 * attempt * attempt);
    }
    throw new Error(`${lastError} after ${tries} tries: ${url}`);
  };
}
