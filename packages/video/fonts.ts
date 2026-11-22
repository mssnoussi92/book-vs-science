// Fonts loaded from files (never system or Google Fonts at render time: a different machine would draw differently).
// Cairo (SIL OFL 1.1) covers Arabic and Latin, so a study title in English inside an Arabic line keeps one design.
import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const FONT = "Cairo";
let loaded: Promise<unknown> | null = null;
export const loadFonts = () => (loaded ??= loadFont({ family: FONT, url: staticFile("fonts/cairo/Cairo-Variable.ttf"), weight: "200 1000" }));
