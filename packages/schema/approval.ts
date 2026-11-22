// The owner's word, recorded. Written by `bvs approve` only after he answered, never by an AI on its own.
// The hash is the one of a decision projection (packages/core/fingerprint.ts): a decisive change makes the
// approval stale by itself, a re-verification that changes nothing decisive does not.
import { z } from "zod";
import { IsoDate, LangCode, Sha256 } from "./common.ts";

export const Approval = z.strictObject({
  on: IsoDate,
  /** His words, verbatim: « je valide les sources de feeling-bad (a1b2c3) ». */
  words: z.string().min(2).max(300),
  /** Where he said it: the conversation, or the URL of his comment on the episode's issue. */
  via: z.union([z.literal("conversation"), z.url()]),
  hash: Sha256,
}).meta({ id: "Approval" });

/** content/episodes/<id>/approvals.json : kept apart so that no file hashes itself. */
export const Approvals = z.strictObject({
  $schema: z.string().optional(),
  sources: Approval.optional(),
  script: z.partialRecord(LangCode, Approval).default({}),
  voice: z.partialRecord(LangCode, Approval).default({}),
  video: z.partialRecord(LangCode, Approval).default({}),
}).meta({ id: "Approvals" });

export type Approval = z.infer<typeof Approval>;
export type Approvals = z.infer<typeof Approvals>;
