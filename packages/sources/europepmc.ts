// Europe PMC, by DOI only (the DOI is quoted: some contain parentheses).
import type { FetchJson } from "./http.ts";
import { arr, isObj, str, unavailable, type Lookup, type Obj } from "./lookup.ts";
import { stripTags } from "./normalize.ts";

export interface EuropePmcRecord {
  title: string | null;
  firstAuthor: string | null;
  year: number | null;
  /** Abstract as plain text, or null. Never stored. */
  abstract: string | null;
}

export const europePmcUrl = (doi: string) =>
  "https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=" +
  encodeURIComponent(`DOI:"${doi}"`) +
  "&resultType=core&format=json";

export function normalizeEuropePmc(r: Obj): EuropePmcRecord {
  const authors = arr(isObj(r["authorList"]) ? r["authorList"]["author"] : []).filter(isObj);
  const year = Number(str(r["pubYear"]));
  const abs = str(r["abstractText"]);
  return {
    title: str(r["title"]) ?? null,
    firstAuthor: authors[0] ? (str(authors[0]["lastName"]) ?? str(authors[0]["collectiveName"]) ?? null) : null,
    year: Number.isInteger(year) ? year : null,
    abstract: abs ? stripTags(abs).replace(/\s+/g, " ").trim() || null : null,
  };
}

export async function fetchEuropePmc(fetchJson: FetchJson, doi: string): Promise<Lookup<EuropePmcRecord>> {
  try {
    const res = await fetchJson(europePmcUrl(doi));
    if (res.status === 404) return { kind: "not-found" };
    if (!isObj(res.body)) return { kind: "unavailable", error: "unexpected Europe PMC answer" };
    const results = arr(isObj(res.body["resultList"]) ? res.body["resultList"]["result"] : []).filter(isObj);
    const hit = results.find((r) => (str(r["doi"]) ?? "").toLowerCase() === doi.toLowerCase());
    return hit ? { kind: "ok", record: normalizeEuropePmc(hit) } : { kind: "not-found" };
  } catch (e) {
    return unavailable(e);
  }
}
