// The compositions. Episodes, styles and covers are added as they are built; the sheets come first (the owner
// validates the characters before any episode uses them).
import { Composition } from "remotion";
import { CharacterSheet, type SheetProps } from "./Sheet.tsx";

const WHO: SheetProps["who"][] = ["nour", "nour-hijab", "karim", "adasa"];

export const Root: React.FC = () => (
  <>
    {WHO.map((who) => (
      <Composition key={who} id={`Sheet-${who}`} component={CharacterSheet} durationInFrames={1} fps={30} width={1080} height={1920} defaultProps={{ who }} />
    ))}
  </>
);
