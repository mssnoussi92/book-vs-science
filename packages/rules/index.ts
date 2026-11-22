// All the rules, in the order `bvs check` prints them. A rule guards, it does not decide; what no code can see is
// listed at the end of `bvs check` (« à vérifier à l'œil »).
import { approvals } from "./approvals.ts";
import { book } from "./book.ts";
import { claimsSaid, outcome, sourcesExist, sourcesVerified, takeaway, verdict } from "./evidence.ts";
import { loadRepo } from "./load.ts";
import { customScene, folders, hooks, idsUnique } from "./structure.ts";
import { applicability, causalVerbs, generalizations, langComplete, lengths, noAuthorName, numbersFromRegistry, sensitive, textChars } from "./texts.ts";
import type { Issue, Repo, Rule } from "./types.ts";

export const RULES: Rule[] = [
  folders, idsUnique, hooks, customScene,
  langComplete, textChars, lengths, noAuthorName, numbersFromRegistry, sensitive, causalVerbs, generalizations, applicability,
  book,
  sourcesExist, sourcesVerified, verdict, claimsSaid, outcome, takeaway,
  approvals,
];

export const BY_EYE = [
  "la reformulation ne suit pas de trop près le texte du livre (nous ne l'avons pas en entier)",
  "la scène ne caricature personne, ne met pas en image un cliché que les mots ne disent pas",
  "chaque phrase d'appui dit bien ce que l'affirmation lui fait dire (relecture aveugle)",
  "l'égyptien sonne égyptien, pas fousha (l'oreille du propriétaire)",
];

export function runRules(repo: Repo): Issue[] {
  return [...repo.loadIssues, ...RULES.flatMap((r) => r.check(repo))];
}

export function check(root: string): Issue[] {
  return runRules(loadRepo(root));
}

export { loadRepo };
export type { Issue, Repo, Rule };
