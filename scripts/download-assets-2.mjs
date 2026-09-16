import fs from "node:fs";
import path from "node:path";

const urls = [
  // eCitiBiz gallery
  "https://framerusercontent.com/images/tp8SedwXvAuMbanjkfeWL24Smc.png",
  "https://framerusercontent.com/images/PXM9nezrduzDRHy52G54Y1tWhQA.png",
  "https://framerusercontent.com/images/nmVFdWBQ8F4VQJyxHmOJxeSLWj8.png",
  "https://framerusercontent.com/images/thEgSHXxYMcAtcM5xjyTnEl9mY.png",
  "https://framerusercontent.com/images/mJ9jYb6nsgb9Z3ZeJ9kD3qv0RI.png",
  "https://framerusercontent.com/images/rWOJuWGl0vsqMctAyWbYMjoijI.png",
  "https://framerusercontent.com/images/tbLfLxcbGpB7WaRiHlXDKeSNw.png",
  "https://framerusercontent.com/images/tMX2aJLtHMVpzDvbwZW26tCiyms.png",
  "https://framerusercontent.com/images/KrVgVdMbdK8cLfNdthDFqsPQg.png",
  "https://framerusercontent.com/images/Yv7KWd44C0Jjy4twjvyzhXD3I.png",
  "https://framerusercontent.com/images/plWUM78iKPdA3zbi2flrPv3X4U.png",
  "https://framerusercontent.com/images/Px77qY8ZEuDnHa10CbZiUr8Tg.png",
  "https://framerusercontent.com/images/0SSikWuiqRXVd42VyHOQME492pQ.png",
  "https://framerusercontent.com/images/vJcWcdihRRFiXgvz804tRcIeOo.png",
  "https://framerusercontent.com/images/rAZIOnUjjIrODQuIRn6Zyzc6pY.png",
  "https://framerusercontent.com/images/mUkFFfXJIPVHGO0ds6x9z72I.png",
  "https://framerusercontent.com/images/66uF8fWtVx8S9kISyk3LLlxXA8.png",
  "https://framerusercontent.com/images/ejzQB98rVNb97zplcZILeSXRCE.png",
  "https://framerusercontent.com/images/STBzthfNhWKqHKwJyplOfCqKyaU.png",
  "https://framerusercontent.com/images/3F6ZivOGSv2IZ5LYV0snwWOEb4Y.png",
  // Delta State gallery
  "https://framerusercontent.com/images/92KyS0ne8bTKiIxNi9wKRMncjA.png",
  "https://framerusercontent.com/images/gRSEvkaaGzsN1XZLQvBuA0bA.jpg",
  "https://framerusercontent.com/images/TgNZIjWvLQsunui7w7UTghDUxc.png",
  "https://framerusercontent.com/images/7X8vLEGME50Q3alByzwEdqHVs4.png",
  "https://framerusercontent.com/images/NCiHIXxfbPCuR5Atokadp65cM.png",
  "https://framerusercontent.com/images/1KxJFFNNz1W5MixLLirSeC2iEDc.png",
  "https://framerusercontent.com/images/5wfiO2ZDSkKpmLNYEZlm2Oaca1U.png",
  "https://framerusercontent.com/images/AP9pP5IhsaeeZB9QKCS9KyOkfc.png",
  "https://framerusercontent.com/images/esRUhRudvayvggMZa8z5aTwuwA.jpg",
  "https://framerusercontent.com/images/EZC1Iuj5ym1Vzk3UQYFeyjetO8A.png",
  "https://framerusercontent.com/images/7pQKqzYLTNo69sxG45MZ9pLwR8.png",
  // AnyWorkX gallery
  "https://framerusercontent.com/images/6k5IgwdIZ4tmoFRigBIfa5DXpIA.png",
  "https://framerusercontent.com/images/9VyXqe7BcuaAI8WnKoXz0wunNjs.png",
  "https://framerusercontent.com/images/z37vrT6GTEhMiYZ5sk1eeYIKiVM.png",
  "https://framerusercontent.com/images/ei03qD3SxfeyGVxbWRUvdttRQU.png",
  "https://framerusercontent.com/images/a8QMPQsZH0wBOXo8Gr0hEYAy500.png",
  // Tallinn Digital Twin - correct hero + gallery
  "https://framerusercontent.com/images/pnrrE1MUTw3daxqOagtSpRLs5kE.png",
  "https://framerusercontent.com/images/zYsFaG5ItUIO7xw1UYMFguCiNk.jpeg",
  "https://framerusercontent.com/images/ZNXcgc4mUwXFgqwoIkzYTMvDSSU.jpeg",
  "https://framerusercontent.com/images/b0wVKNEYag72C0v3riEseXPi0.jpg",
  "https://framerusercontent.com/images/hMIja8guJhlOsMhLJTWC8vHbnoo.jpg",
];

const outDir = path.join(process.cwd(), "public", "images");
fs.mkdirSync(outDir, { recursive: true });

for (const url of urls) {
  const name = path.basename(new URL(url).pathname);
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
