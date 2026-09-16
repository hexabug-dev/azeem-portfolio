import fs from "node:fs";
import path from "node:path";

const urls = [
  "https://framerusercontent.com/images/jjQiVkJ7P7L2gLbhkHRgZioVA.png",
  "https://framerusercontent.com/images/NAHig5m7Pq6K5st4lXXqekHgY.jpg",
  "https://framerusercontent.com/images/dOyj9FQcxeSHQSVKA7PQoHke6k.jpg",
  "https://framerusercontent.com/images/pIcapelQfSS5teiijlFLC7PFnCM.jpg",
  "https://framerusercontent.com/images/XDTFM9Y9JlG7SKESMM5sXAWVE.jpg",
  "https://framerusercontent.com/images/lFIbECpGycvXyWhIytcy3KUY.jpg",
  "https://framerusercontent.com/images/mVX6j90gWujWhJ1guH3RTrBZDek.png",
  "https://framerusercontent.com/images/e4vlSDkirMdorypN5BBOUiQosTY.svg",
  "https://framerusercontent.com/images/s49AfbHYUq5Lg6YfFFK8nNpVooE.jpg",
  "https://framerusercontent.com/images/gHs2sNAqREUJQj3K763cJkGy8GM.jpg",
  "https://framerusercontent.com/images/pIA4e1PRhSR9W6Z7b6me0EBxRc.jpg",
  "https://framerusercontent.com/images/UZHhJBJmTjfU4QSb0ajDQ9bUZY.jpg",
  "https://framerusercontent.com/images/0sFplSy75pNDFElfxX6Dd4GR69I.png",
  "https://framerusercontent.com/images/3kLKkbs6rp5NVQt9FhPGtFc.png",
  "https://framerusercontent.com/images/Xm2LXBitR1YKGnWG2q1OH3wuMA.png",
  "https://framerusercontent.com/images/ED54n7NwYjgnAeHrC2JMZJP82XE.png",
  "https://framerusercontent.com/images/gBMpfXF2RXjs7vf02G6dXCT7U.png",
  "https://framerusercontent.com/images/2DY5F87Rw2IFFENTqE8hbBYeQk.png",
  "https://framerusercontent.com/images/ChBo6rYEHlcYeBup98EucggwBFI.png",
  "https://framerusercontent.com/images/b3QsGEktGUuDOwkO1JV2uv5heyo.png",
  "https://framerusercontent.com/images/pQXyJ976z2O8Fct9hehBmEhvxFk.png",
  "https://framerusercontent.com/images/Ok9LkoYDmBizX9GG1JVgC0o6Ws.png",
  "https://framerusercontent.com/images/oJAHFMDkzG0ss3aGP6kyeHD9Y.png",
  "https://framerusercontent.com/images/Z7uJLQ4OOlof2UKFiqhh8HQUwY.png",
  "https://framerusercontent.com/images/SxsOGYqgzGoGsJPDT874YcmBFzQ.png",
  "https://framerusercontent.com/images/hYL53YSdjyUY8mz234U9ci0REDY.jpg",
  "https://framerusercontent.com/images/NtOngL28emIXQvq3RDmSH6HtS8.png",
  "https://framerusercontent.com/images/Ih0VlXl7ZZpg2d5Q1BXb4i6F4c.jpg",
  "https://framerusercontent.com/images/uvVIySXZDGqy1NlgshUOIXH2mc.jpeg",
  "https://framerusercontent.com/images/ctASdqeBYCChNFq2sW8gr5y0agg.webp",
  "https://framerusercontent.com/images/S7CxWFB70WSXUGgXEJ0hT2uQeo.png",
  "https://framerusercontent.com/images/7NscoRqLd0ABCy4A2UROC567qD0.jpeg",
];

const outDir = path.join(process.cwd(), "public", "images");
fs.mkdirSync(outDir, { recursive: true });

const seen = new Set();

for (const url of urls) {
  const name = path.basename(new URL(url).pathname);
  if (seen.has(name)) continue;
  seen.add(name);
  const dest = path.join(outDir, name);
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error("FAIL", url, res.status);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buf);
    console.log("OK", name, buf.length);
  } catch (e) {
    console.error("ERR", url, e.message);
  }
}
