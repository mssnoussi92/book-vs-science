// OpenAlex, by DOI only: https://api.openalex.org/works/doi:{doi} (reading by DOI needs no key).
import type { FetchJson } from "./http.ts";
import { arr, isObj, str, unavailable, type Lookup, type Obj } from "./lookup.ts";
import { familyOfDisplayName } from "./normalize.ts";
import { pathDoi } from "./crossref.ts";

export interface OpenAlexRecord {
  titles: string[];
  firstAuthor: string | null;
  authorFamilies: string[];
  years: number[];
  type: string;
  venue?: string;
  isRetracted: boolean;
  /** Abstract rebuilt from `abstract_inverted_index`, or null. Never stored. */
  abstract: string | null;
}

export const openalexUrl = (doi: string) => `https://api.openalex.org/works/doi:${pathDoi(doi)}`;

export function abstractFromInverted(inv: unknown): string | null {
  if (!isObj(inv)) return null;
  const at: [number, string][] = [];
  for (const [word, positions] of Object.entries(inv)) {
    for (const p of arr(positions)) if (typeof p === "number") at.push([p, word]);
  }
  if (!at.length) return null;
  return at.sort((a, b) => a[0] - b[0]).map((x) => x[1]).join(" ");
}

export function normalizeOpenAlex(w: Obj): OpenAlexRecord {
  const titles = [str(w["display_name"]), str(w["title"])].filter((t): t is string => !!t);
  const names = arr(w["authorships"])
    .filter(isObj)
    .map((a) => (isObj(a["author"]) ? str(a["author"]["display_name"]) : undefined))
    .filter((n): n is string => !!n)
    .map(familyOfDisplayName);
  const year = w["publication_year"];
  const primary = isObj(w["primary_location"]) ? w["primary_location"] : null;
  const source = primary && isObj(primary["source"]) ? str(primary["source"]["display_name"]) : undefined;
  return {
    titles: [...new Set(titles)],
    firstAuthor: names[0] ?? null,
    authorFamilies: names,
    years: typeof year === "number" ? [year] : [],
    type: str(w["type"]) ?? "unknown",
    venue: source,
    isRetracted: w["is_retracted"] === true,
    abstract: abstractFromInverted(w["abstract_inverted_index"]),
  };
}

export async function fetchOpenAlex(fetchJson: FetchJson, doi: string): Promise<Lookup<OpenAlexRecord>> {
  try {
    const res = await fetchJson(openalexUrl(doi));
    if (res.status === 404) return { kind: "not-found" };
    if (isObj(res.body)) return { kind: "ok", record: normalizeOpenAlex(res.body) };
    return { kind: "unavailable", error: "unexpected OpenAlex answer" };
  } catch (e) {
    return unavailable(e);
  }
}
