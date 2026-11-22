// Rules on what we lend the book: where it says it, no long quotation, no summary chapter by chapter.
import type { Issue, Rule } from "./types.ts";
import { where } from "./walk.ts";
import { words } from "../core/text.ts";

/** Text between quotation marks of any kind (« », " ", “ ”, „ “, ‹ ›). */
const QUOTED = /«([^»]*)»|"([^"]*)"|“([^”]*)”|„([^“”]*)[“”]|‹([^›]*)›/g;
export const MAX_QUOTE_WORDS = 12;
export const MAX_EPISODES_PER_BOOK = 3;

export const book: Rule = {
  id: "book",
  describe: "Livre au registre, idée attribuée à un passage repérable, citation ≤ 12 mots, au plus 3 épisodes par livre.",
  check(repo) {
    const out: Issue[] = [];
    const perBook = new Map<string, string[]>();
    for (const { dir, episode: ep, langs } of repo.episodes) {
      const b = repo.books.get(ep.book.book);
      perBook.set(ep.book.book, [...(perBook.get(ep.book.book) ?? []), ep.id]);
      if (!b) { out.push({ rule: "book", severity: "error", where: where(dir, "book.book"), message: `livre inconnu « ${ep.book.book} » (content/books/)` }); continue; }
      const basis = b.basis.find((x) => x.id === ep.book.basis);
      if (!basis) out.push({ rule: "book", severity: "error", where: where(dir, "book.basis"), message: `le livre n'a pas de passage « ${ep.book.basis} »` });
      for (const [code, lang] of langs) for (const [k, t] of Object.entries(lang.texts)) {
        for (const m of t.matchAll(QUOTED)) {
          const inside = m.slice(1).find((g) => g !== undefined) ?? "";
          if (words(inside).length > MAX_QUOTE_WORDS) {
            out.push({ rule: "book", severity: "error", where: `${dir}/lang/${code}.json#${k}`, message: `citation de ${words(inside).length} mots (${MAX_QUOTE_WORDS} au plus) : reformuler` });
          }
        }
      }
    }
    for (const b of repo.books.values()) for (const basis of b.basis) {
      if (basis.kind === "author-article" && !basis.url) out.push({ rule: "book", severity: "error", where: `content/books/${b.slug}.json#basis.${basis.id}`, message: "un texte publié par l'auteur se cite avec son URL" });
    }
    for (const [slug, eps] of perBook) if (eps.length > MAX_EPISODES_PER_BOOK) {
      out.push({ rule: "book", severity: "error", where: `content/books/${slug}.json`, message: `${eps.length} épisodes sur ce livre (${MAX_EPISODES_PER_BOOK} au plus : pas de résumé en série)` });
    }
    return out;
  },
};
