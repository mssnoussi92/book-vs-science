// The registry of studies (content/sources/<id>.json), cited by id from the episodes: a study exists only through
// its verified DOI. `declared` is copied from where the claim was found BEFORE any query (otherwise the identity
// check compares Crossref with itself). `design` is set by the independent reviewer, not by the writer.
// No publisher abstract is ever stored: only its hash, and one short supporting sentence per finding.
import { z } from "zod";
import { Doi, IsoDate, Sha256, Slug } from "./common.ts";

export const Design = z.enum([
  "umbrella-review",          // review of meta-analyses
  "multisite-replication",    // registered replication across labs: the strongest evidence against an effect
  "meta-analysis",
  "systematic-review",
  "rct",                      // randomized trial of an intervention
  "experiment",               // the claim's exposure was manipulated
  "longitudinal",
  "cross-sectional",
  "experience-sampling",
  "narrative-review",
  "preprint",
]);

export const Finding = z.strictObject({
  id: Slug,
  /** What the study shows, in our own English words. */
  text: z.string().min(10).max(300),
  /** One whole sentence of the abstract that says it, verbatim (≤ 60 words). Must be a result or a conclusion. */
  support: z.strictObject({
    sentence: z.string().min(10).max(420),
    role: z.enum(["result", "conclusion"]),
    where: z.enum(["abstract", "fulltext"]),
    /** For a full-text reading: who read what, where (the page or section). */
    readBy: z.string().max(120).optional(),
  }),
  /** Effect size as reported, never typed in a sentence: the shell puts it into words by its metric. */
  effect: z.strictObject({
    metric: z.enum(["d", "g", "r", "OR", "RR", "beta", "percent", "days"]),
    value: z.number(),
    ci: z.tuple([z.number(), z.number()]).optional(),
    correctedForBias: z.boolean().default(false),
  }).optional(),
  /** "association", "causal" (exposure manipulated) or "intervention" (a program tested against a control). */
  kind: z.enum(["association", "causal", "intervention"]),
});

export const Source = z.strictObject({
  $schema: z.string().optional(),
  id: Slug,                                   // "ford-2018-acceptance"
  doi: Doi,
  /** Frozen before any query, from where the claim was found. */
  declared: z.strictObject({
    title: z.string().min(5),
    firstAuthor: z.string().min(2),
    authors: z.array(z.string()).optional(),
    year: z.number().int().min(1900).max(2100),
    venue: z.string().optional(),
    foundIn: z.string().min(3),               // a URL, or « cited by <other source id> »
  }),
  design: Design,
  designSetBy: z.literal("reviewer"),
  n: z.number().int().positive().optional(),  // participants
  k: z.number().int().positive().optional(),  // studies, for a meta-analysis
  population: z.string().min(3).max(160),     // who was studied
  /** Samples from the Middle East and North Africa: when false, the episode says « معظم الدراسات من أمريكا وأوروبا ». */
  mena: z.boolean(),
  findings: z.array(Finding).min(1),
  limits: z.array(z.string().min(5).max(200)).min(1),
  /** Authors who also develop or promote what they evaluate (ACT, affect labeling…): not a fault, a limit to say. */
  allegiance: z.string().max(200).optional(),
  /** Corrections and errata read, and what they change. */
  acknowledged: z.array(z.strictObject({
    doi: Doi,
    type: z.enum(["correction", "erratum", "corrigendum", "addendum"]),
    changes: z.string().min(5).max(200),      // « grouped erratum of 41 articles, no effect on results »
  })).default([]),
  /** Hash of the normalized abstract that was read (the abstract itself is the publisher's). */
  abstractSha256: Sha256.optional(),
}).meta({ id: "Source" });

/** content/sources/<id>.verify.json : written by `bvs sources verify`, never by hand. Decision fields only. */
export const Verification = z.strictObject({
  doi: Doi,
  status: z.enum(["pass", "review", "fail"]),
  checks: z.array(z.strictObject({
    name: z.string(),
    result: z.enum(["pass", "review", "fail"]),
    detail: z.string().max(400),
  })),
  found: z.strictObject({
    title: z.string(),
    firstAuthor: z.string(),
    years: z.array(z.number().int()),
    type: z.string(),
    venue: z.string().optional(),
  }),
  notices: z.array(z.strictObject({ type: z.string(), doi: Doi })),   // updated-by / update-to of Crossref
  retracted: z.boolean(),
  abstractFrom: z.enum(["europepmc", "crossref", "openalex", "none"]),
  abstractSha256: Sha256.optional(),
  /** Date and tool version: shown, never part of the approval's hash. */
  checkedOn: IsoDate,
  tool: z.string(),
}).meta({ id: "Verification" });

export type Source = z.infer<typeof Source>;
export type Finding = z.infer<typeof Finding>;
export type Verification = z.infer<typeof Verification>;
