# TVOnair+ bootup — Lottie rebuild

A rebuild of `TVOnair+ BOOTUP V3.mp4` as a Lottie (Bodymovin) JSON file. No After Effects source was available, so every shape, colour and keyframe was measured from the MP4 frame by frame and rebuilt as vectors.

| File | What it is |
|---|---|
| `tvonair-plus-bootup.json` | The Lottie, with a transparent background. |
| `tvonair-plus-bootup-black-bg.json` | The same, with the original's black background built in. |
| `comparison-original-vs-lottie.mp4` | Side by side: the original on top, the Lottie render below, with the original audio. |
| `build.py` | Builds both JSON files from the measurements in `data/`. |
| `render.mjs` | Renders the Lottie frame by frame with lottie-web, for comparison. |

**Specs:** 1080×1920 (9:16), 30 fps, 150 frames (5.0 s). Everything is vector shapes: no images, fonts, expressions or effects. It plays with no errors in lottie-web 5.12.2 with both the SVG and canvas renderers.

## Accuracy

Each lottie-web frame was compared with the original frame, measuring the share of logo pixels that differ by more than 60/255:

- **Median frame:** 3.2% of logo pixels differ. These differences are almost all half-pixel anti-aliasing edges.
- **Frames 10–150:** every frame is 7.2% or less.

## Known differences

- **Frames 36–41 ("TV" pop-in):** in the original, the "TV" logotype morphs slightly while it grows. The Lottie scales it with the same timing and overshoot but doesn't reproduce the morph.
- **Frames 3–8 (first antenna strokes):** the original uses motion blur, which Lottie can't do. The stroke lengths, rotation and timing match.
- **Sound:** Lottie has no audio. The client's app needs to play the sound separately, starting at frame 0.

## Rebuilding

```bash
python3 tvonair-lottie/build.py
LOTTIE_JS=node_modules/lottie-web/build/player/lottie.min.js node tvonair-lottie/render.mjs
```
