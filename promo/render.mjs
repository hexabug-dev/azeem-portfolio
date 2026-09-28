// Renders promo/index.html frame-by-frame with headless Chromium, then encodes an MP4.
//
//   node promo/render.mjs                      -> promo/azeem-interaction-designer-promo.mp4
//   node promo/render.mjs --stills 1,4.2,7.5   -> PNG stills for quick review
//
// Env: FFMPEG (path to ffmpeg with libx264), FRAMES_DIR (temp frame dir), PLAYWRIGHT (module path).
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT || "playwright");

const here = path.dirname(fileURLToPath(import.meta.url));
const FPS = 30;
const DURATION = 20;
const args = process.argv.slice(2);
const stillsArg = args.includes("--stills") ? args[args.indexOf("--stills") + 1] : null;
const framesDir = process.env.FRAMES_DIR || path.join(here, ".frames");
const out = path.join(here, "azeem-interaction-designer-promo.mp4");
const audio = path.join(here, "soundtrack.wav");

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
await page.addInitScript(() => (window.__RENDERING__ = true));
await page.goto(pathToFileURL(path.join(here, "index.html")).href);
await page.evaluate(() => window.ready);

const shoot = async (t, file) => {
  await page.evaluate((t) => window.render(t), t);
  await page.screenshot({ path: file, type: "png" });
};

if (stillsArg) {
  mkdirSync(framesDir, { recursive: true });
  for (const s of stillsArg.split(",")) {
    const file = path.join(framesDir, `still-${s}.png`);
    await shoot(parseFloat(s), file);
    console.log(file);
  }
  await browser.close();
  process.exit(0);
}

rmSync(framesDir, { recursive: true, force: true });
mkdirSync(framesDir, { recursive: true });
const total = FPS * DURATION;
for (let f = 0; f < total; f++) {
  await shoot(f / FPS, path.join(framesDir, `f${String(f).padStart(4, "0")}.png`));
  if (f % 60 === 0) console.log(`frame ${f}/${total}`);
}
await browser.close();

const ffmpeg = process.env.FFMPEG || "ffmpeg";
const inputs = ["-y", "-framerate", String(FPS), "-i", path.join(framesDir, "f%04d.png")];
if (existsSync(audio)) inputs.push("-i", audio);
execFileSync(ffmpeg, [
  ...inputs,
  "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
  ...(existsSync(audio) ? ["-c:a", "aac", "-b:a", "192k", "-shortest"] : []),
  out,
], { stdio: "inherit" });
rmSync(framesDir, { recursive: true, force: true });
console.log(out);
