// Remotion CLI settings (studio, still, render). Same choices as quran-themes-demo (VENDORED.md).
import { Config } from "@remotion/cli/config";

Config.setEntryPoint("packages/video/index.ts");
Config.setPublicDir("assets");
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setPixelFormat("yuv420p");
Config.setColorSpace("bt709");

// Cloud sessions have a headless browser preinstalled; GitHub Actions downloads its own.
const browser = process.env.REMOTION_BROWSER_EXECUTABLE;
if (browser) Config.setBrowserExecutable(browser);
