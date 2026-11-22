// A book of the registry (content/books/<slug>.json). No image field exists: no cover, ever.
import { z } from "zod";
import { LangCode, Slug } from "./common.ts";

export const Book = z.strictObject({
  $schema: z.string().optional(),
  slug: Slug,
  title: z.string().min(2),                  // as published (the original), used only as a reference
  /** Published titles in other languages (the Arabic edition's title is what people search for). */
  titles: z.partialRecord(LangCode, z.string().min(2)).default({}),
  /** A short form for the screen and the titles when the original holds a swear word. */
  shortTitle: z.string().max(40).optional(),
  author: z.string().min(2),
  /** The author's name as written in each language, so that a rule can check that no line ever names him: the
   *  narrator says « الكتاب بيقول », the name exists only on the book card (drawn by the shell from this file). */
  authorWritten: z.partialRecord(LangCode, z.string().min(2)).default({}),
  year: z.number().int().min(1800).max(2100),
  isbn: z.string().regex(/^[0-9X-]{10,17}$/).optional(),
  /** Where each idea we lend the book is said: an excerpt published by the author, the publisher's summary… */
  basis: z.array(z.strictObject({
    id: Slug,
    kind: z.enum(["book", "author-article", "publisher-summary"]),
    url: z.url().optional(),                 // required by a rule when a public text by the author exists
    locator: z.string().min(2).max(120),     // « ch. 1, The Feedback Loop from Hell »
  })).min(1),
}).meta({ id: "Book" });

export type Book = z.infer<typeof Book>;
