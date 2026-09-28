// Renders tvonair-plus-bootup.json frame-by-frame with lottie-web (SVG renderer) in headless Chromium.
//
//   LOTTIE_JS=path/to/lottie.min.js OUT_DIR=frames node tvonair-lottie/render.mjs [frame,frame,...]
//
// Env: PLAYWRIGHT (module path, default "playwright"), LOTTIE_JS (lottie-web build), OUT_DIR, BG (css colour).
import { createRequire } from "node:module";
import { mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT || "playwright");
const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = process.env.OUT_DIR || path.join(here, ".frames");
const lottieJs = readFileSync(process.env.LOTTIE_JS || require.resolve("lottie-web/build/player/lottie.min.js"), "utf8");
const data = readFileSync(path.join(here, "tvonair-plus-bootup.json"), "utf8");
const frames = process.argv[2] ? process.argv[2].split(",").map(Number) : [...Array(150).keys()];
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
await page.setContent(`<!doctype html><html><body style="margin:0;background:${process.env.BG || "#000"}">
  <div id="l" style="width:1080px;height:1920px"></div></body></html>`);
await page.addScriptTag({ content: lottieJs });
await page.evaluate((json) => new Promise((res) => {
  window.anim = lottie.loadAnimation({ container: document.getElementById("l"), renderer: "svg", loop: false, autoplay: false, animationData: JSON.parse(json) });
  window.anim.addEventListener("DOMLoaded", res);
}), data);
for (const f of frames) {
  await page.evaluate((f) => window.anim.goToAndStop(f, true), f);
  // original frames are 1-indexed (f001 = frame 0)
  await page.screenshot({ path: path.join(outDir, `r${String(f + 1).padStart(3, "0")}.png`) });
}
await browser.close();
console.log(`rendered ${frames.length} frames -> ${outDir}`);
