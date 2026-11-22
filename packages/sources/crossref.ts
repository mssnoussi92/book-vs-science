// Crossref, by DOI only: https://api.crossref.org/works/{doi}
import type { FetchJson } from "./http.ts";
import { arr, isObj, str, unavailable, type Lookup, type Obj } from "./lookup.ts";
import { stripTags } from "./normalize.ts";

export interface Notice {
  type: string;
  doi: string;
}

export interface CrossrefRecord {
  doi: string;
  /** title, « title: subtitle », short-title, original-title. */
  titles: string[];
  firstAuthor: string | null;
  authorFamilies: string[];
  /** issued, published, published-print, published-online, created. */
  years: number[];
  type: string;
  venue?: string;
  updatedBy: Notice[];
  updateTo: Notice[];
  /** Abstract as plain text (JATS tags removed), or null. Never stored. */
  abstract: string | null;
}

export function pathDoi(doi: string): string {
  return encodeURIComponent(doi).replace(/%2F/gi, "/").replace(/%28/g, "(").replace(/%29/g, ")");
}
export const crossrefUrl = (doi: string) => `https://api.crossref.org/works/${pathDoi(doi)}`;

function yearOf(m: Obj, key: string): number | null {
  const v = m[key];
  if (!isObj(v)) return null;
  const first = arr(v["date-parts"])[0];
  const y = arr(first)[0];
  return typeof y === "number" && Number.isInteger(y) ? y : null;
}

function notices(x: unknown): Notice[] {
  const out: Notice[] = [];
  for (const u of arr(x)) {
    if (!isObj(u)) continue;
    const doi = str(u["DOI"]);
    const type = str(u["type"]) ?? str(u["label"]) ?? "unknown";
    if (doi) out.push({ type: type.toLowerCase().replace(/[\s-]+/g, "_"), doi });
  }
  return out;
}

export function normalizeCrossref(message: Obj): CrossrefRecord {
  const titles: string[] = [];
  const t0 = str(arr(message["title"])[0]);
  const sub = str(arr(message["subtitle"])[0]);
  if (t0) titles.push(t0);
  if (t0 && sub) titles.push(`${t0}: ${sub}`);
  for (const k of ["short-title", "original-title"]) {
    for (const t of arr(message[k])) {
      const s = str(t);
      if (s) titles.push(s);
    }
  }
  const authors = arr(message["author"]).filter(isObj);
  const families = authors.map((a) => str(a["family"]) ?? str(a["name"]) ?? "").filter(Boolean);
  const firstObj = authors.find((a) => a["sequence"] === "first") ?? authors[0];
  const years = ["issued", "published", "published-print", "published-online", "created"]
    .map((k) => yearOf(message, k))
    .filter((y): y is number => y !== null);
  const abs = str(message["abstract"]);
  return {
    doi: str(message["DOI"]) ?? "",
    titles: [...new Set(titles)],
    firstAuthor: firstObj ? (str(firstObj["family"]) ?? str(firstObj["name"]) ?? null) : null,
    authorFamilies: families,
    years: [...new Set(years)],
    type: str(message["type"]) ?? "unknown",
    venue: str(arr(message["container-title"])[0]),
    updatedBy: notices(message["updated-by"]),
    updateTo: notices(message["update-to"]),
    abstract: abs ? stripTags(abs).replace(/\s+/g, " ").trim() || null : null,
  };
}

export async function fetchCrossref(fetchJson: FetchJson, doi: string): Promise<Lookup<CrossrefRecord>> {
  try {
    const res = await fetchJson(crossrefUrl(doi));
    if (res.status === 404) return { kind: "not-found" };
    if (isObj(res.body) && isObj(res.body["message"])) return { kind: "ok", record: normalizeCrossref(res.body["message"]) };
    return { kind: "unavailable", error: "unexpected Crossref answer" };
  } catch (e) {
    return unavailable(e);
  }
}
