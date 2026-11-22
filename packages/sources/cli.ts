// node packages/sources/cli.ts verify <content/sources/<id>.json …> [--live] [--write]
// Without --live nothing goes online: only what is in .cache/sources/ is read. With --live the databases are
// asked again (the cache is rewritten, never trusted: a retraction can come at any time).
import { readFile, writeFile } from "node:fs/promises";
import { Source } from "../schema/source.ts";
import { makeFetchJson } from "./http.ts";
import { renderReport, type ReportItem } from "./report.ts";
import { verifySource } from "./verify.ts";

const CACHE_DIR = ".cache/sources";

async function main(argv: string[]): Promise<number> {
  const [command, ...rest] = argv;
  const flags = new Set(rest.filter((a) => a.startsWith("--")));
  const files = rest.filter((a) => !a.startsWith("--") && !a.endsWith(".verify.json"));
  if (command !== "verify" || !files.length) {
    console.error("usage: node packages/sources/cli.ts verify <content/sources/<id>.json …> [--live] [--write]");
    return 2;
  }
  const live = flags.has("--live");
  const fetchJson = makeFetchJson(live ? { cacheDir: CACHE_DIR, readCache: false } : { cacheDir: CACHE_DIR, offline: true });

  const items: ReportItem[] = [];
  for (const file of files) {
    let source: Source;
    try {
      source = Source.parse(JSON.parse(await readFile(file, "utf8")));
    } catch (e) {
      console.error(`${file}: not a valid source sheet: ${e instanceof Error ? e.message : e}`);
      return 2;
    }
    const verification = await verifySource(source, { fetchJson });
    items.push({ source, verification });
    if (flags.has("--write")) {
      await writeFile(file.replace(/\.json$/, ".verify.json"), JSON.stringify(verification, null, 2) + "\n");
    }
  }
  console.log(renderReport(items, new Date().toISOString().slice(0, 10)));
  return items.some((i) => i.verification.status === "fail") ? 1 : 0;
}

process.exitCode = await main(process.argv.slice(2));
