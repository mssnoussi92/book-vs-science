// Test helpers: a FetchJson that answers from packages/sources/fixtures/ (never the network), and a sheet builder.
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Source } from "../schema/source.ts";
import type { FetchJson } from "./http.ts";

export const FIXTURES = join(dirname(fileURLToPath(import.meta.url)), "fixtures");

/**
 * `abstracts` adds a synthetic abstract (written for the tests) to the Europe PMC answer of a DOI, in memory only:
 * no publisher abstract is ever stored in the fixtures.
 */
export function fixtureFetch(abstracts: Record<string, string> = {}): FetchJson {
  const files = readdirSync(FIXTURES);
  const find = (doi: string, which: string) => {
    const want = `${doi.replace("/", "_")}.${which}.json`.toLowerCase();
    return files.find((f) => f.toLowerCase() === want);
  };
  return async (url: string) => {
    const u = decodeURIComponent(url);
    let doi: string;
    let which: string;
    if (u.includes("api.crossref.org/works/")) {
      which = "crossref";
      doi = u.split("/works/")[1]!;
    } else if (u.includes("api.openalex.org/works/doi:")) {
      which = "openalex";
      doi = u.split("works/doi:")[1]!;
    } else if (u.includes("europepmc")) {
      which = "europepmc";
      doi = /DOI:"([^"]+)"/.exec(u)![1]!;
    } else throw new Error(`unexpected URL in a test: ${url}`);
    const file = find(doi, which);
    let body: unknown = file ? JSON.parse(readFileSync(join(FIXTURES, file), "utf8")) : null;
    if (which === "europepmc") {
      const b = (body ?? { resultList: { result: [] } }) as { resultList: { result: Record<string, unknown>[] } };
      const synthetic = Object.entries(abstracts).find(([d]) => d.toLowerCase() === doi.toLowerCase())?.[1];
      if (synthetic) {
        const first = b.resultList.result[0] ?? { doi };
        b.resultList.result = [{ ...first, abstractText: synthetic }];
      }
      return { status: 200, body: b };
    }
    if (!file) return { status: 404, body: null };
    return { status: 200, body };
  };
}

export interface SheetOptions {
  doi: string;
  title: string;
  firstAuthor: string;
  authors?: string[];
  year: number;
  design?: string;
  acknowledged?: { doi: string; type: string; changes: string }[];
  findings?: { id: string; sentence: string; role?: "result" | "conclusion"; where?: "abstract" | "fulltext"; readBy?: string }[];
}

export function makeSource(o: SheetOptions): Source {
  const findings = o.findings ?? [{ id: "f1", sentence: "Read in the full text, section 3.", where: "fulltext", readBy: "reviewer, section 3" }];
  return Source.parse({
    id: "test-source",
    doi: o.doi,
    declared: { title: o.title, firstAuthor: o.firstAuthor, authors: o.authors, year: o.year, foundIn: "https://example.org/claim" },
    design: o.design ?? "experiment",
    designSetBy: "reviewer",
    population: "adults in the test fixtures",
    mena: false,
    findings: findings.map((f) => ({
      id: f.id,
      text: "A finding written in our own words for the tests.",
      support: { sentence: f.sentence, role: f.role ?? "result", where: f.where ?? "abstract", ...(f.readBy ? { readBy: f.readBy } : {}) },
      kind: "association",
    })),
    limits: ["A limit written for the tests."],
    acknowledged: o.acknowledged ?? [],
  });
}

export const TODAY = "2026-11-22";
