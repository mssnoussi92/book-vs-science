import type {
  Approvals, Book, CharacterDef, Episode, LangFile, LanguagePack, Source, Verification,
} from "../schema/index.ts";

export type Severity = "error" | "warn";

export type Issue = {
  rule: string;
  severity: Severity;
  /** A path in the repository, with a pointer inside the file when useful (« content/episodes/x/episode.json#hooks.h2 »). */
  where: string;
  message: string;
  /** Blocks the voice and the render, not the writing (a source not yet verified, an approval not yet given). */
  gate?: boolean;
};

export type EpisodeEntry = {
  id: string;
  dir: string;                       // relative to the root
  episode: Episode;
  langs: Map<string, LangFile>;
  approvals: Approvals;
};

export type Repo = {
  root: string;
  episodes: EpisodeEntry[];
  books: Map<string, Book>;
  sources: Map<string, Source>;
  verifications: Map<string, Verification>;
  characters: Map<string, CharacterDef>;
  languages: Map<string, LanguagePack>;
  styles: Set<string>;
  /** Effects known for their replication failures: content/contested.json (doi or source id → why). */
  contested: Map<string, string>;
  /** Problems met while reading the files (schema errors, unreadable JSON). */
  loadIssues: Issue[];
};

export type Rule = { id: string; describe: string; check(repo: Repo): Issue[] };
