// Every text the shell shows in a box, measured in Chromium with the house font at its real size and width: the first
// frame, the study card, the book card, the nuance / orientation / share cards, the captions and every subtitle screen.
// Counting words or characters said « fits » for two texts that came out on three lines, cut (the challenge of
// chasing-happiness, 2026-11-23): only the browser that draws them knows. The styles below copy packages/video/chrome.tsx
// (9:16); a change there is a change here.
//
// Playwright is the one installed on the machine (cloud session, Actions runner): not a dependency of the repository.
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Repo } from "../rules/types.ts";
import type { Timeline } from "../schema/timeline.ts";
import { ZONES } from "../video/layout.ts";
import { readingChunks } from "../video/state.ts";
import { buildTimeline } from "./timeline.ts";

export type Misfit = { episode: string; lang: string; hook: string; what: string; text: string; lines: number; max: number; overflow: boolean };

type Probe = { what: string; text: string; html: string; width: number; height?: number; lineHeight: number; max: number };

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** The boxes of one timeline, as chrome.tsx draws them. */
function probes(tl: Timeline): Probe[] {
  const z = ZONES["9x16"];
  const dir = tl.dir;
  const out: Probe[] = [];
  const c = tl.cards;
  // The first frame: an inline card at most z.w - 20 wide, 14/34/18 px of padding, 72 px, two lines in its 260 px.
  out.push({ what: "première image", text: c.firstFrame.text, width: z.firstFrame.w - 20 - 68, lineHeight: 72 * 1.3, max: 2,
    html: `<div dir="${dir}" style="font-size:72px;font-weight:900;line-height:1.3;text-align:center;text-wrap:balance">${esc(c.firstFrame.text)}</div>` });
  // The study card: its line, the reference, the applicability line, inside z.h - 36.
  out.push({ what: "carte de l'étude", text: c.study.line, width: z.study.w - 48, height: z.study.h - 36, lineHeight: 44 * 1.25, max: 2,
    html: `<div style="text-align:center;line-height:1.25"><div class="m" dir="${dir}" style="font-size:44px;font-weight:800">${esc(c.study.line)}</div>`
      + `<div style="font-size:28px;font-weight:600;margin-top:14px"><bdi dir="ltr">${esc(c.study.ref)}</bdi></div>`
      + (c.study.applies ? `<div dir="${dir}" style="font-size:32px;font-weight:800;margin-top:12px">${esc(c.study.applies)}</div>` : "") + "</div>" });
  // The book card: label, title, author, the idea, beside the drawn book (z.w - 190), inside z.h - 32.
  out.push({ what: "carte du livre", text: c.book.idea, width: z.book.w - 190, height: z.book.h - 32, lineHeight: 38 * 1.25, max: 3,
    html: `<div dir="${dir}" style="line-height:1.25"><div style="font-size:30px;font-weight:700">الكتاب بيقول</div><div style="font-size:40px;font-weight:900">${esc(c.book.title)}</div>`
      + `<div style="font-size:26px;font-weight:600">${esc(c.book.author)}</div><div class="m" style="font-size:38px;font-weight:700;margin-top:14px">${esc(c.book.idea)}</div></div>` });
  // The text cards (nuance, orientation, share): under their icon, z.w - 60 wide, z.h - 110 high; larger when short.
  for (const [what, card] of [["nuance", c.nuance], ["orientation", c.orientation], ["partage", c.share]] as const) {
    if (!card) continue;
    const size = card.text.length <= 32 ? 58 : 40;
    out.push({ what: `carte ${what}`, text: card.text, width: z.card.w - 60, height: z.card.h - 110, lineHeight: size * 1.3, max: 3,
      html: `<div dir="${dir}" style="font-size:${size}px;font-weight:800;line-height:1.3;text-align:center;text-wrap:balance">${esc(card.text)}</div>` });
  }
  // Captions (a text with no voice) and every subtitle screen: a plate at most z.subtitles.w wide, two lines.
  for (const a of tl.actions) if (a.caption) out.push({ what: `légende ${a.scope}.${a.id}`, text: a.caption, width: z.subtitles.w - 52, lineHeight: 50 * 1.4, max: 2,
    html: `<div dir="${dir}" style="font-size:50px;font-weight:800;line-height:1.4;text-align:center;text-wrap:balance">${esc(a.caption)}</div>` });
  for (const l of tl.lines) {
    if (!l.words.length) continue;
    for (const [s, e] of readingChunks(l.words)) {
      const text = l.words.slice(s, e).map((w) => w.w).join(" ");
      const dots = l.inner ? `<span style="display:inline-block;width:46px;margin-inline-end:12px"></span>` : "";
      out.push({ what: `sous-titre ${l.key}`, text, width: z.subtitles.w - 52, lineHeight: 54 * 1.35, max: 2,
        html: `<div dir="${dir}" style="font-size:54px;font-weight:800;line-height:1.35;text-align:center;text-wrap:balance">${dots}${esc(text)}</div>` });
    }
  }
  return out;
}

/** Measures every box of every hook of the episodes (all, or one), in every language the repository has a pack for. */
export async function fit(repo: Repo, root: string, only?: string, lang?: string): Promise<Misfit[]> {
  const require = createRequire(import.meta.url);
  type Page = { setContent(html: string): Promise<void>; evaluate<A, R>(fn: (a: A) => R | Promise<R>, a: A): Promise<R> };
  const { chromium } = require("playwright") as { chromium: { launch(): Promise<{ newPage(): Promise<Page>; close(): Promise<void> }> } };
  // inlined: a page with no origin may not fetch a file:// font
  const font = `data:font/ttf;base64,${readFileSync(join(root, "assets/fonts/cairo/Cairo-Variable.ttf")).toString("base64")}`;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(`<style>@font-face{font-family:Cairo;src:url("${font}");font-weight:200 1000}body{margin:0;font-family:Cairo}</style><div id="x"></div>`);
  const out: Misfit[] = [];
  try {
    for (const e of repo.episodes) {
      if (only && e.id !== only) continue;
      for (const code of e.langs.keys()) {
        if (lang && code !== lang) continue;
        if (!repo.languages.has(code)) continue;
        const seen = new Set<string>();
        for (const h of e.episode.hooks) {
          let tl: Timeline;
          try { tl = buildTimeline(repo, e, { lang: code, hook: h.id, style: "cartoon", draft: true }); } catch { continue; }
          for (const p of probes(tl)) {
            const key = `${p.what}|${p.text}`;
            if (seen.has(key)) continue;          // a text shared by every hook is measured once
            seen.add(key);
            const r = await page.evaluate(async (q) => {
              await document.fonts.load("800 44px Cairo");
              await document.fonts.ready;
              const x = document.getElementById("x")!;
              x.innerHTML = `<div style="width:${q.width}px;font-family:Cairo">${q.html}</div>`;
              const box = x.firstElementChild as HTMLElement;
              const m = (box.querySelector(".m") as HTMLElement | null) ?? (box.firstElementChild as HTMLElement);
              return { lines: Math.round(m.getBoundingClientRect().height / q.lineHeight), height: box.getBoundingClientRect().height };
            }, { html: p.html, width: p.width, lineHeight: p.lineHeight });
            const overflow = p.height !== undefined && r.height > p.height + 1;
            if (r.lines > p.max || overflow) out.push({ episode: e.id, lang: code, hook: h.id, what: p.what, text: p.text, lines: r.lines, max: p.max, overflow });
          }
        }
      }
    }
  } finally {
    await browser.close();
  }
  return out;
}
