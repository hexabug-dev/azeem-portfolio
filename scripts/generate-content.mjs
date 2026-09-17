/**
 * Turns the raw DOM captures in scripts/captures into page content that keeps
 * the source page's exact reading order and column layout, then downloads every
 * referenced image and video into public/media.
 *
 * Source geometry at a 1440px viewport:
 *   container  x=408  w=904   (hero, title, intro, meta)
 *   heading    x=408  w=240   (section heading, left column)
 *   content    x=688  w=624   (section body, right column)
 *   step body  x=752  w=560   (indented 64px under a numbered badge)
 *   list item  x=708  w=604   (indented 20px)
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CAP = path.join(ROOT, "scripts", "captures");
const CONTENT = path.join(ROOT, "src", "content");
const MEDIA = path.join(ROOT, "public", "media");
fs.mkdirSync(CONTENT, { recursive: true });
fs.mkdirSync(MEDIA, { recursive: true });

const CONTAINER_X = 408;
const CONTENT_X = 688;

const ACCENT = ["rgb(161, 88, 48)", "rgb(250, 188, 155)"];
const isAccent = (c) => ACCENT.includes(c);

const downloads = new Map();
const localFor = (url) => {
  if (!url) return "";
  const clean = url.split("?")[0];
  const name = path.basename(new URL(clean).pathname);
  downloads.set(clean, name);
  return "/media/" + name;
};

const indentOf = (x) => Math.max(0, Math.round((x - CONTENT_X) / 4) * 4);

const roleOf = (b) => {
  const size = Math.round(b.fontSize);
  const weight = parseInt(b.fontWeight, 10);
  const family = b.fontFamily || "";
  if (family === "sans-serif") return "skip"; // duplicated badge artifact
  if (b.text === "-") return "skip"; // empty framer caption slot
  if (family.startsWith("Space Grotesk") && size >= 30) return "h1";
  if (size >= 24) return "h2";
  if (size === 18 && b.rect.x < CONTENT_X && b.rect.w <= 320) return "metaValue";
  if (size === 18) return "h3";
  if (size === 16 && b.rect.w <= 60 && /^\d+$/.test(b.text)) return "badge";
  if (size === 14 && isAccent(b.color)) return "tag";
  if (size === 14 && weight >= 500) return "action";
  if (size === 14) return "metaLabel";
  if (size === 16 && b.rect.w <= 220) return "chip";
  return "p";
};

const cleanHtml = (html) => html.replace(/&nbsp;/g, " ").trim();

const EDITS = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts", "edits.json"), "utf8"));

/**
 * Applies the intentional copy edits for a page to every string in it, so a
 * regeneration does not silently revert them. Reports any rule that no longer
 * matches, which means the upstream wording changed.
 */
const applyEdits = (page, name) => {
  const rules = EDITS[name];
  if (!Array.isArray(rules)) return page;
  const applied = new Set();
  const walk = (node) => {
    if (typeof node === "string") {
      let out = node;
      for (const r of rules) {
        if (out.includes(r.from)) {
          out = out.split(r.from).join(r.to);
          applied.add(r.from);
        }
      }
      return out;
    }
    if (Array.isArray(node)) return node.map(walk);
    if (node && typeof node === "object") {
      return Object.fromEntries(Object.entries(node).map(([k, v]) => [k, walk(v)]));
    }
    return node;
  };
  const edited = walk(page);
  for (const r of rules) {
    if (!applied.has(r.from)) console.warn(`  ! edit no longer matches in ${name}: "${r.from}"`);
  }
  return edited;
};

/** Framer inlines colour tokens on icons; make them follow the theme instead. */
const cleanSvg = (svg) =>
  svg
    ? svg
        .replace(/\sstyle="[^"]*"/g, "")
        .replace(/\sfill="(?!none)[^"]*"/g, "")
        .replace(/<svg /, '<svg fill="currentColor" ')
    : svg;

function buildPage(name) {
  const raw = JSON.parse(fs.readFileSync(path.join(CAP, `${name}.json`), "utf8"));

  const items = [];
  let pendingSvg = null;

  for (const b of raw.blocks) {
    if (b.kind === "svg") {
      pendingSvg = b.html;
      continue;
    }
    if (b.kind === "text") {
      const role = roleOf(b);
      if (role === "skip") continue;
      items.push({
        t: role,
        html: cleanHtml(b.html || b.text),
        text: b.text,
        href: b.href || undefined,
        multiline: b.text.includes("\n") || undefined,
        indent: indentOf(b.rect.x),
        x: b.rect.x,
        w: b.rect.w,
        size: Math.round(b.fontSize),
        muted: /rgba\(255, 255, 255, 0\.6\)|rgb\(102, 102, 102\)/.test(b.color) || undefined,
        svg: role === "chip" || role === "metaValue" ? cleanSvg(pendingSvg) || undefined : undefined,
      });
      pendingSvg = null;
      continue;
    }
    pendingSvg = null;
    if (b.kind === "field") {
      items.push({
        t: "field",
        fieldType: b.type,
        placeholder: b.placeholder,
        required: b.required,
        indent: indentOf(b.rect.x),
        x: b.rect.x,
      });
      continue;
    }
    if (b.kind === "button") continue; // represented by its own text blocks
    if (b.kind === "image") {
      items.push({
        t: "image",
        src: localFor(b.src),
        w: b.natural?.[0] || b.rect.w,
        h: b.natural?.[1] || b.rect.h,
        indent: indentOf(b.rect.x),
        x: b.rect.x,
        dw: b.rect.w,
        alt: b.alt || "",
      });
    } else if (b.kind === "video") {
      items.push({
        t: "video",
        src: localFor(b.src),
        indent: indentOf(b.rect.x),
        x: b.rect.x,
        dw: b.rect.w,
        ratio: +(b.rect.w / Math.max(b.rect.h, 1)).toFixed(4),
      });
    } else if (b.kind === "iframe") {
      if (!b.src || b.src.includes("framer.com/edit")) continue;
      items.push({
        t: "embed",
        src: b.src,
        indent: indentOf(b.rect.x),
        x: b.rect.x,
        dw: b.rect.w,
        ratio: +(b.rect.w / Math.max(b.rect.h, 1)).toFixed(4),
        title: b.title || "",
      });
    }
  }

  // split into header (before first h2) / sections / related
  const firstH2 = items.findIndex((i) => i.t === "h2");
  const headerItems = firstH2 === -1 ? items : items.slice(0, firstH2);
  const rest = firstH2 === -1 ? [] : items.slice(firstH2);

  // The header keeps its exact order; only "back", which is chrome rather than
  // content, is lifted out. The header has no numbered steps, so any 18px line
  // in it is a meta value rather than a step heading.
  const header = { back: null, h1: "", blocks: [] };
  for (const it of headerItems) {
    if (it.t === "action" && /back to/i.test(it.text)) {
      header.back = { text: it.text, href: it.href };
      continue;
    }
    if (it.t === "h1") header.h1 = it.text;
    header.blocks.push(it.t === "h3" ? { ...it, t: "metaValue" } : it);
  }

  /** [image, linked title, linked subtitle] repeated -> a card grid */
  const asCards = (blocks) => {
    const cards = [];
    for (let i = 0; i < blocks.length; i++) {
      const img = blocks[i];
      const title = blocks[i + 1];
      if (img?.t !== "image" || !title?.href) return null;
      const sub = blocks[i + 2];
      const hasSub = sub && sub.href === title.href;
      cards.push({ image: img.src, title: title.text, client: hasSub ? sub.text : "", href: title.href });
      i += hasSub ? 2 : 1;
    }
    return cards.length ? cards : null;
  };

  /** date/title/excerpt then a "Read More" link -> blog cards */
  const asPosts = (blocks) => {
    const isRead = (b) => b.t === "action" && (/read more/i.test(b.text || "") || /\/blog\//.test(b.href || ""));
    if (!blocks.some(isRead)) return null;
    const posts = [];
    let buf = [];
    for (const b of blocks) {
      if (isRead(b)) {
        const texts = buf.filter((x) => x.text && x.t !== "image");
        posts.push({
          date: texts[0]?.text || "",
          title: texts[1]?.text || "",
          excerpt: texts[2]?.text || "",
          href: b.href,
          label: b.text,
          image: "",
        });
        buf = [];
        continue;
      }
      if (b.t === "image" && posts.length && !posts[posts.length - 1].image && !/\.svg$/.test(b.src)) {
        posts[posts.length - 1].image = b.src;
        continue;
      }
      buf.push(b);
    }
    return posts.length ? posts : null;
  };

  /** [period, org, role, ...body] repeated -> CV entries */
  const asEntries = (blocks) => {
    if (blocks[0]?.t !== "chip") return null;
    if (blocks.filter((b) => b.t === "chip").length < 2) return null;
    if (!blocks.some((b) => (b.text || "").length > 60)) return null;
    const entries = [];
    let cur = null;
    for (const b of blocks) {
      if (b.t === "chip") {
        cur = { period: b.text, org: "", role: "", points: [] };
        entries.push(cur);
      } else if (!cur) return null;
      else if (!cur.org) cur.org = b.text;
      else if (!cur.role) cur.role = b.text;
      else cur.points.push(b.html || b.text);
    }
    if (!entries.length) return null;
    // a real CV entry always names an organisation and says something about it
    if (entries.some((e) => !e.org || !e.points.length)) return null;
    return entries;
  };

  /** a flat run of short labels -> a chip row */
  const asChips = (blocks) => {
    if (!blocks.length) return null;
    const ok = blocks.every(
      (b) => b.t !== "image" && !b.href && (b.text || "").length > 0 && (b.text || "").length < 60
    );
    // keep the width and any icon: wide cells render as a table, narrow ones
    // as inline tool labels
    return ok ? blocks.map((b) => ({ text: b.text, w: b.w, svg: b.svg })) : null;
  };

  /** [quote, name, role] repeated -> testimonials */
  const asQuotes = (blocks) => {
    // a single heading + two lines is prose, not a testimonial wall
    if (blocks.length < 6 || blocks.length % 3 !== 0) return null;
    const quotes = [];
    for (let i = 0; i < blocks.length; i += 3) {
      const [q, n, r] = [blocks[i], blocks[i + 1], blocks[i + 2]];
      if (q?.t !== "h3" || !n?.text || !r?.text) return null;
      quotes.push({ quote: q.text, name: n.text, role: r.text });
    }
    return quotes;
  };

  const structure = (section) => {
    let blocks = section.blocks.filter((b) => {
      if (/^©/.test(b.text || "")) {
        footer = b.text;
        return false;
      }
      return true;
    });
    // a trailing link ("All case studies", "Load More") belongs to the section,
    // not to the grid it follows
    let more = null;
    const last = blocks[blocks.length - 1];
    if (last && last.t === "action") {
      more = { text: last.text, href: last.href };
      blocks = blocks.slice(0, -1);
    }
    if (!blocks.length) return { ...section, blocks, more };

    const cards = asCards(blocks);
    if (cards) return { ...section, blocks: [], kind: "cards", items: cards, more };
    const posts = asPosts(section.blocks);
    if (posts) return { ...section, blocks: [], kind: "posts", items: posts, more: null };
    const entries = asEntries(blocks);
    if (entries) return { ...section, blocks: [], kind: "entries", items: entries, more };
    const chips = asChips(blocks);
    if (chips) return { ...section, blocks: [], kind: "chips", items: chips, more };
    const quotes = asQuotes(blocks);
    if (quotes) return { ...section, blocks: [], kind: "quotes", items: quotes, more };
    return { ...section, more };
  };

  const sections = [];
  let related = [];
  let footer = "";
  let cur = null;
  for (let i = 0; i < rest.length; i++) {
    const it = rest[i];
    if (it.t === "h2") {
      if (/^more projects$/i.test(it.text)) {
        // trailing related-projects strip
        const tail = rest.slice(i + 1);
        for (let k = 0; k < tail.length; k++) {
          if (tail[k].t === "image") {
            related.push({
              image: tail[k].src,
              title: tail[k + 1]?.text || "",
              client: tail[k + 2]?.text || "",
            });
          }
        }
        break;
      }
      // a narrow heading sits in the left column; a full-width one stacks above
      cur = { heading: it.text, layout: it.w <= 320 ? "split" : "stacked", blocks: [] };
      sections.push(cur);
      continue;
    }
    if (!cur) {
      cur = { heading: "", layout: "stacked", blocks: [] };
      sections.push(cur);
    }
    cur.blocks.push(it);
  }

  // index pages have no <h2>, so their card grid sits at the end of the header
  const headerBlocks = header.blocks.filter((b) => {
    if (/^©/.test(b.text || "")) {
      footer = b.text;
      return false;
    }
    return true;
  });
  header.blocks = headerBlocks;

  if (!sections.length) {
    for (let i = 0; i < headerBlocks.length; i++) {
      if (headerBlocks[i].t !== "image") continue;
      const tail = headerBlocks.slice(i);
      const grid = structure({ heading: "", layout: "stacked", blocks: tail });
      if (grid.kind) {
        header.blocks = headerBlocks.slice(0, i);
        sections.push(grid);
        break;
      }
    }
  }

  return {
    name,
    route: raw.route,
    title: raw.title,
    header,
    footer,
    sections: sections.length && sections[0].kind ? sections : sections.map(structure),
    related,
  };
}

const PAGES = fs
  .readdirSync(CAP)
  .filter((f) => f.endsWith(".json") && !f.includes("-dark") && !f.startsWith("_"))
  .map((f) => f.replace(/\.json$/, ""));

for (const name of PAGES) {
  const page = applyEdits(buildPage(name), name);
  fs.writeFileSync(path.join(CONTENT, `${name}.json`), JSON.stringify(page, null, 2));
  const media = page.sections.reduce(
    (n, s) => n + s.blocks.filter((b) => ["image", "video", "embed"].includes(b.t)).length,
    0
  );
  console.log(
    name.padEnd(20),
    String(page.sections.length).padStart(2),
    "sections,",
    String(media).padStart(2),
    "media,",
    page.related.length,
    "related"
  );
}

console.log("\ndownloading", downloads.size, "media files...");
let ok = 0;
for (const [url, name] of downloads) {
  const dest = path.join(MEDIA, name);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
    ok++;
    continue;
  }
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error("FAIL", res.status, url);
      continue;
    }
    fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
    ok++;
  } catch (e) {
    console.error("ERR", url, e.message);
  }
}
console.log("media ok:", ok, "/", downloads.size);

/**
 * Reads the real pixel dimensions out of a file header. The capture only sees
 * the scaled variant the browser happened to load, so intrinsic size has to
 * come from the downloaded original or next/image will under-serve it.
 */
const intrinsicSize = (buf) => {
  if (buf[0] === 0x89 && buf[1] === 0x50) return [buf.readUInt32BE(16), buf.readUInt32BE(20)];
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length - 9) {
      if (buf[i] !== 0xff) {
        i++;
        continue;
      }
      const marker = buf[i + 1];
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return [buf.readUInt16BE(i + 7), buf.readUInt16BE(i + 5)];
      }
      i += 2 + buf.readUInt16BE(i + 2);
    }
  }
  if (buf.slice(0, 4).toString() === "RIFF") {
    const fmt = buf.slice(12, 16).toString();
    if (fmt === "VP8X") return [1 + buf.readUIntLE(24, 3), 1 + buf.readUIntLE(27, 3)];
    if (fmt === "VP8 ") return [buf.readUInt16LE(26) & 0x3fff, buf.readUInt16LE(28) & 0x3fff];
    if (fmt === "VP8L") {
      const b = buf.readUInt32LE(21);
      return [(b & 0x3fff) + 1, ((b >> 14) & 0x3fff) + 1];
    }
  }
  return null;
};

let patched = 0;
const sizeCache = new Map();
const realSize = (src) => {
  if (sizeCache.has(src)) return sizeCache.get(src);
  const file = path.join(MEDIA, path.basename(src));
  let out = null;
  try {
    out = intrinsicSize(fs.readFileSync(file));
  } catch {}
  sizeCache.set(src, out);
  return out;
};

for (const f of fs.readdirSync(CONTENT)) {
  const file = path.join(CONTENT, f);
  const page = JSON.parse(fs.readFileSync(file, "utf8"));
  const walk = (n) => {
    if (Array.isArray(n)) return n.forEach(walk);
    if (!n || typeof n !== "object") return;
    if (n.t === "image" && n.src) {
      const size = realSize(n.src);
      if (size && (n.w !== size[0] || n.h !== size[1])) {
        n.w = size[0];
        n.h = size[1];
        patched++;
      }
    }
    Object.values(n).forEach(walk);
  };
  walk(page);
  fs.writeFileSync(file, JSON.stringify(page, null, 2));
}
console.log("intrinsic sizes corrected on", patched, "images");
