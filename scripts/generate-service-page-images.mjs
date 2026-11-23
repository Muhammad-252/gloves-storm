/**
 * Draws original square images for the OEM and private label sportswear product pages
 * and saves them to public/images/products/guides/.
 *
 *   node scripts/generate-service-page-images.mjs
 *
 * The product gallery crops to 4:5 on phones, so everything important stays inside the
 * middle 80% of the width.
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const OUT = path.join("public", "images", "products", "guides");
fs.mkdirSync(OUT, { recursive: true });

const S = 1200;
const INK = "#141414";
const MUTED = "#6b6b6b";
const BG = "#F6F4EF";
const GOLD = "#FFB900";
const FONT = "Arial, Helvetica, sans-serif";
const SAFE = 130; // left/right margin kept clear for the 4:5 crop

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const text = (x, y, s, size, opts = {}) =>
  `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${opts.bold ? 700 : 400}" fill="${opts.fill || INK}" text-anchor="${opts.anchor || "start"}">${esc(s)}</text>`;

function frame(title, subtitle, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
  <rect width="${S}" height="${S}" fill="${BG}"/>
  <rect width="${S}" height="12" fill="${GOLD}"/>
  ${text(S / 2, 120, title, 50, { bold: true, anchor: "middle" })}
  ${subtitle ? text(S / 2, 172, subtitle, 26, { fill: MUTED, anchor: "middle" }) : ""}
  ${body}
  ${text(S / 2, S - 48, "GLOVES STORM · Sialkot, Pakistan · glovesstorm.com", 22, { bold: true, anchor: "middle" })}
</svg>`;
}

const SHAPES = {
  tee: "M -60,-140 Q 0,-108 60,-140 L 122,-118 L 178,-58 L 136,-22 L 110,-48 L 110,150 L -110,150 L -110,-48 L -136,-22 L -178,-58 L -122,-118 Z",
  tank: "M -50,-148 Q 0,-82 50,-148 L 84,-148 Q 88,-72 116,-42 L 116,150 L -116,150 L -116,-42 Q -88,-72 -84,-148 Z",
  shorts: "M -112,-92 L 112,-92 L 128,92 L 14,92 L 0,6 L -14,92 L -128,92 Z",
  pants: "M -100,-160 L 100,-160 L 112,170 L 18,170 L 0,-40 L -18,170 L -112,170 Z",
  longsleeve: "M -60,-140 Q 0,-108 60,-140 L 122,-118 L 200,120 L 160,135 L 110,-20 L 110,150 L -110,150 L -110,-20 L -160,135 L -200,120 L -122,-118 Z",
};
const garment = (shape, x, y, scale, fill) =>
  `<g transform="translate(${x},${y}) scale(${scale})"><path d="${SHAPES[shape]}" fill="${fill}" stroke="${INK}" stroke-width="${5 / scale * 0.9}" stroke-linejoin="round"/></g>`;

function steps(list, top) {
  const gap = 132;
  let out = "";
  list.forEach((s, i) => {
    const y = top + i * gap;
    if (i < list.length - 1) out += `<line x1="${SAFE + 40}" y1="${y + 40}" x2="${SAFE + 40}" y2="${y + gap - 40}" stroke="${INK}" stroke-width="5"/>`;
    out += `<circle cx="${SAFE + 40}" cy="${y}" r="38" fill="${i === list.length - 1 ? GOLD : INK}"/>`;
    out += text(SAFE + 40, y + 13, String(i + 1), 34, { bold: true, anchor: "middle", fill: i === list.length - 1 ? INK : "#fff" });
    out += text(SAFE + 105, y - 4, s.t, 34, { bold: true });
    out += text(SAFE + 105, y + 34, s.d, 24, { fill: MUTED });
  });
  return out;
}

const images = {
  "oem-sportswear-process": frame(
    "OEM sportswear: tech pack to bulk",
    "Your design, made to your specification",
    steps(
      [
        { t: "Send your tech pack", d: "or a sample garment, sketch and photos" },
        { t: "Free mockup and quote", d: "within 48 hours" },
        { t: "Pattern and sample", d: "made in 5–7 days, couriered in 4–7" },
        { t: "Approve fit and print", d: "changes on a second sample if needed" },
        { t: "Bulk production", d: "2–4 weeks · MOQ 30 pieces per style" },
        { t: "Delivered to your door", d: "DHL or FedEx 4–7 working days, DDP" },
      ],
      280
    )
  ),

  "oem-sportswear-range": (() => {
    const items = [
      { s: "tee", c: "#1f6feb", label: "Soccer kits", price: "from $21 a set" },
      { s: "tank", c: "#d6336c", label: "Basketball", price: "from $23 a set" },
      { s: "longsleeve", c: "#2b2d42", label: "Compression", price: "from $13" },
      { s: "shorts", c: "#e8590c", label: "Fight shorts", price: "from $17" },
      { s: "pants", c: "#495057", label: "Leggings", price: "from $17" },
      { s: "tee", c: "#2f9e44", label: "Training tees", price: "from $10" },
    ];
    let body = "";
    items.forEach((it, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const x = SAFE + 150 + col * 320;
      const y = 380 + row * 380;
      body += garment(it.s, x, y, it.s === "pants" ? 0.62 : it.s === "longsleeve" ? 0.6 : 0.68, it.c);
      body += text(x, y + 165, it.label, 30, { bold: true, anchor: "middle" });
      body += text(x, y + 202, it.price, 24, { fill: MUTED, anchor: "middle" });
    });
    return frame("What we manufacture", "Sublimated and cut-and-sew sportswear · MOQ 30 per style", body);
  })(),

  "private-label-branding": (() => {
    let body = garment("tee", 420, 545, 1.35, "#2b2d42");
    // chest logo, neck label
    body += `<rect x="365" y="440" width="110" height="62" rx="10" fill="${GOLD}"/>`;
    body += text(420, 481, "LOGO", 26, { bold: true, anchor: "middle" });
    body += `<rect x="395" y="366" width="50" height="22" rx="3" fill="#fff" stroke="${INK}" stroke-width="2"/>`;
    // hang tag on a string from the sleeve
    body += `<line x1="575" y1="445" x2="690" y2="470" stroke="${INK}" stroke-width="3"/>`;
    body += `<path d="M 650,470 L 740,470 L 740,640 L 650,640 Z" fill="#fff" stroke="${INK}" stroke-width="4"/>`;
    body += `<circle cx="695" cy="492" r="8" fill="${BG}" stroke="${INK}" stroke-width="3"/>`;
    body += text(695, 560, "YOUR", 18, { bold: true, anchor: "middle" });
    body += text(695, 584, "BRAND", 18, { bold: true, anchor: "middle" });
    // polybag
    body += `<rect x="800" y="420" width="250" height="300" rx="18" fill="#dbe4ff" opacity="0.75" stroke="${INK}" stroke-width="4"/>`;
    body += `<line x1="800" y1="470" x2="1050" y2="470" stroke="${INK}" stroke-width="2" stroke-dasharray="8 6"/>`;
    body += text(925, 590, "YOUR BRAND", 24, { bold: true, anchor: "middle" });
    // numbered markers
    const mark = (x, y, n) => `<circle cx="${x}" cy="${y}" r="24" fill="${GOLD}" stroke="${INK}" stroke-width="3"/>${text(x, y + 9, String(n), 26, { bold: true, anchor: "middle" })}`;
    body += mark(345, 420, 1) + mark(470, 345, 2) + mark(765, 455, 3) + mark(1040, 410, 4);
    // key
    const key = [
      ["Your logo", "printed, sublimated or embroidered · 1 position included"],
      ["Woven neck label", "with hang tag, $0.50 per piece"],
      ["Hang tag", "your brand, price or barcode"],
      ["Printed polybag", "retail-ready, $0.30 per piece"],
    ];
    key.forEach(([t, d], i) => {
      const y = 820 + i * 76;
      body += mark(SAFE + 30, y - 8, i + 1);
      body += text(SAFE + 75, y, t, 28, { bold: true });
      body += text(SAFE + 75, y + 32, d, 22, { fill: MUTED });
    });
    return frame("Your brand on every detail", "Private label sportswear · MOQ 30 per style", body);
  })(),

  "private-label-process": frame(
    "Private label in 5 steps",
    "Our proven styles, your brand",
    steps(
      [
        { t: "Pick your styles", d: "from our sportswear and gym range" },
        { t: "Send your logo", d: "free mockup and quote within 48 hours" },
        { t: "Choose colors and labels", d: "fabric, colors, tags and packaging" },
        { t: "Approve your sample", d: "made in 5–7 days, couriered in 4–7" },
        { t: "Bulk and delivery", d: "2–4 weeks, then DHL or FedEx to you" },
      ],
      300
    )
  ),
};

for (const [name, svg] of Object.entries(images)) {
  const file = path.join(OUT, `${name}.webp`);
  await sharp(Buffer.from(svg)).webp({ quality: 88 }).toFile(file);
  console.log("wrote", file, Math.round(fs.statSync(file).size / 1024) + " KB");
}
