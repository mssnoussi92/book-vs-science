// Reads the repository's content into typed maps. A file that does not parse becomes an issue of the rule
// "schema", never an exception: `bvs check` lists everything that is wrong in one run.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import type { z } from "zod";
import {
  Approvals, Book, CharacterDef, Episode, LangFile, LanguagePack, Source, Verification,
} from "../schema/index.ts";
import type { EpisodeEntry, Issue, Repo } from "./types.ts";

const dirs = (path: string): string[] =>
  existsSync(path) ? readdirSync(path).filter((d) => statSync(join(path, d)).isDirectory()).sort() : [];
const files = (path: string, suffix: string): string[] =>
  existsSync(path) ? readdirSync(path).filter((f) => f.endsWith(suffix)).sort() : [];

export function loadRepo(root: string): Repo {
  const loadIssues: Issue[] = [];
  const rel = (p: string) => relative(root, p);

  function read<T extends z.ZodType>(schema: T, path: string): z.infer<T> | undefined {
    let raw: unknown;
    try {
      raw = JSON.parse(readFileSync(path, "utf8"));
    } catch (e) {
      loadIssues.push({ rule: "schema", severity: "error", where: rel(path), message: `JSON illisible : ${(e as Error).message}` });
      return undefined;
    }
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      for (const issue of parsed.error.issues.slice(0, 20)) {
        loadIssues.push({ rule: "schema", severity: "error", where: `${rel(path)}#${issue.path.join(".")}`, message: issue.message });
      }
      return undefined;
    }
    return parsed.data;
  }

  const books = new Map<string, Book>();
  for (const f of files(join(root, "content/books"), ".json")) {
    const b = read(Book, join(root, "content/books", f));
    if (b) books.set(b.slug, b);
  }

  const sources = new Map<string, Source>();
  const verifications = new Map<string, Verification>();
  for (const f of files(join(root, "content/sources"), ".json")) {
    const path = join(root, "content/sources", f);
    if (f.endsWith(".verify.json")) {
      const v = read(Verification, path);
      if (v) verifications.set(f.slice(0, -".verify.json".length), v);
    } else {
      const s = read(Source, path);
      if (s) {
        if (`${s.id}.json` !== f) loadIssues.push({ rule: "schema", severity: "error", where: rel(path), message: `l'id « ${s.id} » ne correspond pas au nom du fichier` });
        sources.set(s.id, s);
      }
    }
  }

  const characters = new Map<string, CharacterDef>();
  for (const d of dirs(join(root, "characters"))) {
    const path = join(root, "characters", d, "character.json");
    if (!existsSync(path)) { loadIssues.push({ rule: "schema", severity: "error", where: rel(join(root, "characters", d)), message: "character.json manquant" }); continue; }
    const c = read(CharacterDef, path);
    if (c) characters.set(d, c);
  }

  const languages = new Map<string, LanguagePack>();
  for (const d of dirs(join(root, "languages"))) {
    const l = read(LanguagePack, join(root, "languages", d, "language.json"));
    if (l) languages.set(d, l);
  }

  const styles = new Set(dirs(join(root, "styles")).filter((d) => existsSync(join(root, "styles", d, "style.json"))));

  const contested = new Map<string, string>();
  const contestedPath = join(root, "content/contested.json");
  if (existsSync(contestedPath)) {
    try {
      const list = JSON.parse(readFileSync(contestedPath, "utf8")) as { key: string; why: string }[];
      for (const c of list) contested.set(c.key.toLowerCase(), c.why);
    } catch (e) {
      loadIssues.push({ rule: "schema", severity: "error", where: "content/contested.json", message: (e as Error).message });
    }
  }

  const episodes: EpisodeEntry[] = [];
  for (const d of dirs(join(root, "content/episodes"))) {
    const dir = join(root, "content/episodes", d);
    const episode = read(Episode, join(dir, "episode.json"));
    if (!episode) continue;
    if (episode.id !== d) loadIssues.push({ rule: "schema", severity: "error", where: rel(join(dir, "episode.json")), message: `l'id « ${episode.id} » ne correspond pas au dossier « ${d} »` });
    const langs = new Map<string, LangFile>();
    for (const f of files(join(dir, "lang"), ".json")) {
      const l = read(LangFile, join(dir, "lang", f));
      if (l) langs.set(l.lang, l);
    }
    const approvalsPath = join(dir, "approvals.json");
    const approvals = (existsSync(approvalsPath) ? read(Approvals, approvalsPath) : undefined) ?? Approvals.parse({});
    episodes.push({ id: d, dir: rel(dir), episode, langs, approvals });
  }

  return { root, episodes, books, sources, verifications, characters, languages, styles, contested, loadIssues };
}
