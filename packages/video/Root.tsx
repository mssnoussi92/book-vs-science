// The compositions. Episodes, styles and covers are added as they are built; the sheets come first (the owner
// validates the characters before any episode uses them).
import { Composition } from "remotion";
import { EpisodeVideo, episodeMetadata, STYLES } from "./EpisodeVideo.tsx";
import { CharacterSheet, type SheetProps } from "./Sheet.tsx";

const WHO: SheetProps["who"][] = ["nour", "nour-hijab", "karim", "adasa"];

export const Root: React.FC = () => (
  <>
    {WHO.map((who) => (
      <Composition key={who} id={`Sheet-${who}`} component={CharacterSheet} durationInFrames={1} fps={30} width={1080} height={1920} defaultProps={{ who }} />
    ))}
    {Object.keys(STYLES).map((style) => (
      <Composition key={style} id={`Episode-${style}`} component={EpisodeVideo} calculateMetadata={episodeMetadata}
        durationInFrames={30} fps={30} width={1080} height={1920}
        defaultProps={{ episode: "feeling-bad-about-feeling-bad", lang: "ar-EG", hook: "h1", style, aspect: "9x16" as const }} />
    ))}
  </>
);
