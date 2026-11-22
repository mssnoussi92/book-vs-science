// One episode in one style: the style's background and parts, then the shell on top. The timeline is read from
// assets/ep/<episode>/<lang>/timeline-<hook>.json (bvs timeline); the duration is the timeline's.
import type React from "react";
import { AbsoluteFill, Audio, continueRender, delayRender, staticFile, useCurrentFrame, type CalculateMetadataFunction } from "remotion";
import { style as cartoon } from "../../styles/cartoon/index.tsx";
import { style as kinetic } from "../../styles/kinetic/index.tsx";
import { style as split } from "../../styles/split/index.tsx";
import type { Timeline } from "../schema/timeline.ts";
import { Chrome } from "./chrome.tsx";
import type { StyleModule } from "./contract.ts";
import { loadFonts } from "./fonts.ts";
import { FRAMES, type Aspect } from "./layout.ts";
import { partAt } from "./state.ts";

export const STYLES: Record<string, StyleModule> = { cartoon, kinetic, split };

const LABELS: Record<string, { bookSays: string; draft: string }> = {
  "ar-EG": { bookSays: "الكتاب بيقول", draft: "مسودة" },
  en: { bookSays: "The book says", draft: "Draft" },
};

export type EpisodeProps = { episode: string; lang: string; hook: string; style: string; aspect: Aspect; tl?: Timeline };

const fonts = delayRender("fonts");
loadFonts().then(() => continueRender(fonts));

export const EpisodeVideo: React.FC<EpisodeProps> = ({ style, aspect, tl, episode, lang }) => {
  const f = useCurrentFrame();
  if (!tl) return null;
  const S = STYLES[style] ?? cartoon;
  const { w, h } = FRAMES[aspect];
  const part = partAt(tl, f);
  const Part = S.parts[part.kind];
  const props = { tl, f, aspect, w, h, part };
  return (
    <AbsoluteFill style={{ backgroundColor: "#ffffff" }}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ position: "absolute", inset: 0 }}>
        <S.Background {...props} />
        <Part {...props} />
      </svg>
      <Chrome tl={tl} aspect={aspect} theme={S.theme} labels={LABELS[lang] ?? LABELS.en!} subtitles={!S.ownSubtitles} />
      {tl.audio ? <Audio src={staticFile(`ep/${episode}/${lang}/${tl.audio}`)} /> : null}
    </AbsoluteFill>
  );
};

export const episodeMetadata: CalculateMetadataFunction<EpisodeProps> = async ({ props }) => {
  const tl = (await fetch(staticFile(`ep/${props.episode}/${props.lang}/timeline-${props.hook}.json`)).then((r) => r.json())) as Timeline;
  return { durationInFrames: tl.frames, fps: tl.fps, props: { ...props, tl } };
};
