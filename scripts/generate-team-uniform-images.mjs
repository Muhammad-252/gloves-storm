/**
 * Draws the original infographics for the team uniform article series
 * (charts, a timeline and flat garment diagrams) as SVG, then saves them as WebP in
 * public/images/journal/team-uniforms/. All prices come from src/lib/data/priceList.ts.
 *
 *   node scripts/generate-team-uniform-images.mjs
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const OUT = path.join("public", "images", "journal", "team-uniforms");
fs.mkdirSync(OUT, { recursive: true });

const W = 1200;
const H = 675;
const INK = "#141414";
const MUTED = "#6b6b6b";
const BG = "#F6F4EF";
const GOLD = "#FFB900";
const FONT = "Arial, Helvetica, sans-serif";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const money = (n) => `$${n.toFixed(2)}`;

function frame(title, subtitle, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <rect x="0" y="0" width="${W}" height="10" fill="${GOLD}"/>
  <text x="60" y="78" font-family="${FONT}" font-size="38" font-weight="700" fill="${INK}">${esc(title)}</text>
  ${subtitle ? `<text x="60" y="116" font-family="${FONT}" font-size="20" fill="${MUTED}">${esc(subtitle)}</text>` : ""}
  ${body}
  <line x1="60" y1="${H - 52}" x2="${W - 60}" y2="${H - 52}" stroke="#dcd8cf" stroke-width="1.5"/>
  <text x="60" y="${H - 22}" font-family="${FONT}" font-size="17" font-weight="700" fill="${INK}">GLOVES STORM</text>
  <text x="${W - 60}" y="${H - 22}" font-family="${FONT}" font-size="16" fill="${MUTED}" text-anchor="end">Sialkot factory prices, 2026–27 · glovesstorm.com</text>
</svg>`;
}

// ---------------------------------------------------------------- garment flats
const G = {
  tee: "M -60,-140 Q 0,-108 60,-140 L 122,-118 L 178,-58 L 136,-22 L 110,-48 L 110,150 L -110,150 L -110,-48 L -136,-22 L -178,-58 L -122,-118 Z",
  teeCollar: "M -60,-140 Q 0,-92 60,-140",
  tank: "M -50,-148 Q 0,-82 50,-148 L 84,-148 Q 88,-72 116,-42 L 116,150 L -116,150 L -116,-42 Q -88,-72 -84,-148 Z",
  tankCollar: "M -50,-148 Q 0,-70 50,-148",
  football: "M -55,-140 Q 0,-100 55,-140 L 142,-116 L 176,-36 L 128,-20 L 116,-44 L 114,150 L -114,150 L -116,-44 L -128,-20 L -176,-36 L -142,-116 Z",
  footballCollar: "M -55,-140 Q 0,-88 55,-140",
  shorts: "M -112,-92 L 112,-92 L 128,92 L 14,92 L 0,6 L -14,92 L -128,92 Z",
  pantsLong: "M -100,-160 L 100,-160 L 112,170 L 18,170 L 0,-40 L -18,170 L -112,170 Z",
  pantsKnee: "M -104,-120 L 104,-120 L 118,110 L 20,110 L 0,-20 L -20,110 L -118,110 Z",
  sock: "M -26,-120 L 26,-120 L 26,58 Q 26,92 58,96 L 72,98 Q 92,100 92,118 L 92,128 L -8,128 Q -26,128 -26,108 Z",
};

function garment(shape, x, y, scale, fill, opts = {}) {
  const stroke = opts.stroke || INK;
  let extra = "";
  if (shape === "tee" || shape === "tank" || shape === "football") {
    extra += `<path d="${G[shape + "Collar"]}" fill="none" stroke="${stroke}" stroke-width="5" stroke-linecap="round"/>`;
  }
  if (opts.placket) {
    extra += `<line x1="0" y1="-112" x2="0" y2="150" stroke="${stroke}" stroke-width="3"/>`;
    for (let i = 0; i < 6; i++) extra += `<circle cx="10" cy="${-90 + i * 42}" r="5" fill="#fff" stroke="${stroke}" stroke-width="2"/>`;
  }
  if (opts.stripe && (shape === "pantsLong" || shape === "pantsKnee")) {
    const bottom = shape === "pantsLong" ? 170 : 110;
    extra += `<line x1="-104" y1="-150" x2="-114" y2="${bottom - 6}" stroke="${opts.stripe}" stroke-width="10"/>`;
    extra += `<line x1="104" y1="-150" x2="114" y2="${bottom - 6}" stroke="${opts.stripe}" stroke-width="10"/>`;
  }
  if (shape === "shorts" || shape === "pantsLong" || shape === "pantsKnee") {
    const top = shape === "shorts" ? -92 : shape === "pantsLong" ? -160 : -120;
    extra += `<line x1="${shape === "shorts" ? -112 : -102}" y1="${top + 18}" x2="${shape === "shorts" ? 112 : 102}" y2="${top + 18}" stroke="${stroke}" stroke-width="3"/>`;
  }
  if (opts.sash) {
    extra += `<path d="M -110,-30 L 110,60 L 110,100 L -110,10 Z" fill="${opts.sash}" opacity="0.9"/>`;
  }
  if (opts.number) {
    extra += `<text x="0" y="${opts.numberY ?? 60}" font-family="${FONT}" font-size="${opts.numberSize ?? 96}" font-weight="700" fill="${opts.numberColor || "#fff"}" text-anchor="middle" stroke="${stroke}" stroke-width="2">${esc(opts.number)}</text>`;
  }
  if (opts.label) {
    extra += `<text x="0" y="${opts.labelY ?? -40}" font-family="${FONT}" font-size="26" font-weight="700" fill="${opts.labelColor || "#fff"}" text-anchor="middle">${esc(opts.label)}</text>`;
  }
  return `<g transform="translate(${x},${y}) scale(${scale})">
    <path d="${G[shape]}" fill="${fill}" stroke="${stroke}" stroke-width="5" stroke-linejoin="round"/>
    ${extra}
  </g>`;
}

/**
 * A label centred at labelX, either above ("top", text at y 168/192) or below
 * ("bottom", text at y 576/600) the garments, with a leader line to the point.
 * The line stops short of the text so it never crosses it.
 */
function callout(fromX, fromY, labelX, pos, lines) {
  const y1 = pos === "top" ? 168 : 576;
  const lineEnd = pos === "top" ? y1 + 36 : y1 - 26;
  const text = lines
    .map((l, i) => `<text x="${labelX}" y="${y1 + i * 24}" font-family="${FONT}" font-size="${i === 0 ? 20 : 17}" font-weight="${i === 0 ? 700 : 400}" fill="${i === 0 ? INK : MUTED}" text-anchor="middle">${esc(l)}</text>`)
    .join("");
  return `<line x1="${fromX}" y1="${fromY}" x2="${labelX}" y2="${lineEnd}" stroke="${INK}" stroke-width="2"/>
    <circle cx="${labelX}" cy="${lineEnd}" r="3" fill="${INK}"/>
    <circle cx="${fromX}" cy="${fromY}" r="7" fill="${GOLD}" stroke="${INK}" stroke-width="2"/>
    ${text}`;
}

// ---------------------------------------------------------------- charts
function tierChart(title, subtitle, items, unitNote) {
  // items: [{ name, unit, prices: [a,b,c] }]
  const max = Math.max(...items.flatMap((i) => i.prices)) * 1.12;
  const left = 360;
  const right = W - 150;
  const top = 160;
  const rowH = Math.min(118, (H - top - 110) / items.length);
  const barH = Math.min(22, (rowH - 26) / 3);
  const colors = [INK, "#8a7a52", GOLD];
  const tiers = ["30–99 pcs", "100–299 pcs", "300+ pcs"];
  let body = "";
  items.forEach((it, r) => {
    const y0 = top + r * rowH;
    body += `<text x="60" y="${y0 + rowH / 2 - 4}" font-family="${FONT}" font-size="22" font-weight="700" fill="${INK}">${esc(it.name)}</text>`;
    body += `<text x="60" y="${y0 + rowH / 2 + 22}" font-family="${FONT}" font-size="17" fill="${MUTED}">${esc(it.unit)}</text>`;
    it.prices.forEach((p, t) => {
      const y = y0 + 10 + t * (barH + 6);
      const w = ((right - left) * p) / max;
      body += `<rect x="${left}" y="${y}" width="${w}" height="${barH}" rx="4" fill="${colors[t]}"/>`;
      body += `<text x="${left + w + 10}" y="${y + barH - 5}" font-family="${FONT}" font-size="18" font-weight="700" fill="${INK}">${money(p)}</text>`;
    });
  });
  // legend
  let lx = 60;
  tiers.forEach((t, i) => {
    body += `<rect x="${lx}" y="${H - 92}" width="18" height="18" rx="3" fill="${colors[i]}"/>`;
    body += `<text x="${lx + 26}" y="${H - 77}" font-family="${FONT}" font-size="18" fill="${INK}">${t}</text>`;
    lx += 170;
  });
  if (unitNote) body += `<text x="${W - 60}" y="${H - 77}" font-family="${FONT}" font-size="17" fill="${MUTED}" text-anchor="end">${esc(unitNote)}</text>`;
  return frame(title, subtitle, body);
}

// ---------------------------------------------------------------- images
const images = {};

images["team-uniform-cost-per-player"] = (() => {
  const rows = [
    { name: "Basketball", sub: "jersey + shorts", a: 23, b: 18.86 },
    { name: "Soccer", sub: "kit + socks", a: 25.5, b: 20.91 },
    { name: "Baseball", sub: "jersey + pants", a: 41, b: 33.62 },
    { name: "American football", sub: "jersey + pants", a: 54, b: 44.28 },
  ];
  const left = 380;
  const right = W - 170;
  const max = 60;
  let body = "";
  rows.forEach((r, i) => {
    const y = 170 + i * 102;
    body += `<text x="60" y="${y + 24}" font-family="${FONT}" font-size="26" font-weight="700" fill="${INK}">${r.name}</text>`;
    body += `<text x="60" y="${y + 52}" font-family="${FONT}" font-size="18" fill="${MUTED}">${r.sub}</text>`;
    const wa = ((right - left) * r.a) / max;
    const wb = ((right - left) * r.b) / max;
    body += `<rect x="${left}" y="${y}" width="${wa}" height="30" rx="5" fill="${INK}"/>`;
    body += `<text x="${left + wa + 12}" y="${y + 23}" font-family="${FONT}" font-size="22" font-weight="700" fill="${INK}">${money(r.a)}</text>`;
    body += `<rect x="${left}" y="${y + 38}" width="${wb}" height="22" rx="5" fill="${GOLD}"/>`;
    body += `<text x="${left + wb + 12}" y="${y + 56}" font-family="${FONT}" font-size="18" fill="${INK}">${money(r.b)}</text>`;
  });
  body += `<rect x="60" y="${H - 92}" width="18" height="18" rx="3" fill="${INK}"/><text x="86" y="${H - 77}" font-family="${FONT}" font-size="18" fill="${INK}">30–99 players</text>`;
  body += `<rect x="250" y="${H - 92}" width="18" height="18" rx="3" fill="${GOLD}"/><text x="276" y="${H - 77}" font-family="${FONT}" font-size="18" fill="${INK}">300+ players</text>`;
  return frame("What a full team uniform costs per player", "Complete game uniform, sublimated, ex-factory price in USD", body);
})();

images["team-uniform-order-timeline"] = (() => {
  const steps = [
    { t: "Design & mockup", d: "Free mockup and quote", time: "within 48 hours" },
    { t: "Sample", d: "Made, then sent by courier", time: "5–7 days + 4–7 days" },
    { t: "Bulk production", d: "After you approve the sample", time: "2–3 weeks" },
    { t: "Delivery", d: "DHL or FedEx to your door", time: "4–7 working days" },
  ];
  const x0 = 120;
  const step = (W - 240) / (steps.length - 1);
  const y = 330;
  let body = `<line x1="${x0}" y1="${y}" x2="${W - 120}" y2="${y}" stroke="${INK}" stroke-width="6"/>`;
  steps.forEach((s, i) => {
    const x = x0 + i * step;
    body += `<circle cx="${x}" cy="${y}" r="34" fill="${i === 2 ? GOLD : INK}" stroke="${INK}" stroke-width="4"/>`;
    body += `<text x="${x}" y="${y + 12}" font-family="${FONT}" font-size="32" font-weight="700" fill="${i === 2 ? INK : "#fff"}" text-anchor="middle">${i + 1}</text>`;
    body += `<text x="${x}" y="${y - 70}" font-family="${FONT}" font-size="24" font-weight="700" fill="${INK}" text-anchor="middle">${esc(s.t)}</text>`;
    body += `<text x="${x}" y="${y + 84}" font-family="${FONT}" font-size="22" font-weight="700" fill="${INK}" text-anchor="middle">${esc(s.time)}</text>`;
    body += `<text x="${x}" y="${y + 114}" font-family="${FONT}" font-size="17" fill="${MUTED}" text-anchor="middle">${esc(s.d)}</text>`;
  });
  body += `<rect x="${W / 2 - 250}" y="${H - 150}" width="500" height="56" rx="28" fill="${INK}"/>`;
  body += `<text x="${W / 2}" y="${H - 113}" font-family="${FONT}" font-size="24" font-weight="700" fill="${GOLD}" text-anchor="middle">Plan 6–8 weeks before your first game</text>`;
  return frame("From design to delivery: team uniform timeline", "Typical order for sublimated soccer, basketball and baseball uniforms", body);
})();

images["soccer-kit-anatomy"] = (() => {
  let body = "";
  body += garment("tee", 300, 375, 1.0, "#1f6feb", { number: "10", sash: "#58a6ff", numberY: 70 });
  body += garment("shorts", 640, 370, 0.85, "#1f6feb", { number: "10", numberSize: 56, numberY: 64 });
  body += garment("sock", 870, 365, 0.95, "#1f6feb");
  body += `<rect x="846" y="262" width="48" height="16" fill="#fff"/>`;
  body += callout(300, 242, 180, "top", ["Collar of your choice", "crew, V-neck or polo"]);
  body += callout(370, 320, 540, "top", ["140–160 gsm polyester", "fully sublimated, any colors"]);
  body += callout(880, 330, 980, "top", ["Socks $4.50 a pair", "knitted-in logo"]);
  body += callout(300, 445, 260, "bottom", ["Names & numbers included", "plus crest and sponsors"]);
  body += callout(700, 440, 720, "bottom", ["Matching shorts", "elastic waist with drawcord"]);
  return frame("Anatomy of a custom soccer kit", "Kit (jersey + shorts) from $21 a set at 30 sets", body);
})();

images["soccer-uniform-prices"] = tierChart(
  "Custom soccer uniform prices",
  "Fully sublimated, names and numbers included",
  [
    { name: "Soccer kit", unit: "jersey + shorts, per set", prices: [21, 18.9, 17.22] },
    { name: "Soccer jersey", unit: "per piece", prices: [13, 11.7, 10.66] },
    { name: "Goalkeeper kit", unit: "padded, per set", prices: [27, 24.3, 22.14] },
  ],
  "Socks: $4.50 / $4.05 / $3.69 a pair"
);

images["basketball-standard-vs-reversible"] = (() => {
  let body = "";
  body += garment("tank", 300, 370, 1.0, "#d6336c", { number: "23" });
  body += `<text x="300" y="560" font-family="${FONT}" font-size="26" font-weight="700" fill="${INK}" text-anchor="middle">Standard uniform</text>`;
  body += `<text x="300" y="592" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">single layer · from $23 a set</text>`;
  body += garment("tank", 770, 380, 0.95, "#f1f3f5", { number: "23", numberColor: "#d6336c" });
  body += garment("tank", 860, 360, 0.95, "#d6336c", { number: "23" });
  body += `<text x="815" y="560" font-family="${FONT}" font-size="26" font-weight="700" fill="${INK}" text-anchor="middle">Reversible uniform</text>`;
  body += `<text x="815" y="592" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">two designs, double mesh · from $33 a set</text>`;
  body += `<text x="560" y="380" font-family="${FONT}" font-size="64" font-weight="700" fill="${GOLD}" text-anchor="middle">vs</text>`;
  return frame("Standard vs reversible basketball uniforms", "Both fully sublimated, names and numbers included", body);
})();

images["basketball-uniform-prices"] = tierChart(
  "Custom basketball uniform prices",
  "Jersey + shorts per set, fully sublimated",
  [
    { name: "Standard uniform", unit: "single layer, per set", prices: [23, 20.7, 18.86] },
    { name: "Reversible uniform", unit: "double mesh, per set", prices: [33, 29.7, 27.06] },
  ],
  "Sizes 4XL+ add 10%"
);

images["baseball-uniform-anatomy"] = (() => {
  let body = "";
  body += garment("tee", 340, 375, 1.0, "#f8f9fa", { placket: true, label: "Tigers", labelColor: "#c92a2a", labelY: -20 });
  body += `<text x="400" y="450" font-family="${FONT}" font-size="54" font-weight="700" fill="#c92a2a" text-anchor="middle">7</text>`;
  body += garment("pantsLong", 800, 375, 0.9, "#f8f9fa", { stripe: "#c92a2a" });
  body += callout(340, 290, 170, "top", ["Button-front placket", "full-button or two-button"]);
  body += callout(500, 318, 560, "top", ["Piping on placket & sleeves", "in your team colors"]);
  body += callout(820, 300, 960, "top", ["Pants $19", "poly/spandex, belt loops"]);
  body += callout(290, 360, 300, "bottom", ["Team script and numbers", "sublimated or tackle twill"]);
  return frame("Anatomy of a custom baseball uniform", "Jersey $22 + pants $19 = $41 per player at 30 pieces", body);
})();

images["baseball-uniform-prices"] = tierChart(
  "Custom baseball uniform prices",
  "Price per piece, and for a full uniform",
  [
    { name: "Baseball jersey", unit: "button front, per piece", prices: [22, 19.8, 18.04] },
    { name: "Baseball pants", unit: "per piece", prices: [19, 17.1, 15.58] },
    { name: "Full uniform", unit: "jersey + pants", prices: [41, 36.9, 33.62] },
  ]
);

images["football-uniform-anatomy"] = (() => {
  let body = "";
  body += garment("football", 360, 375, 1.0, "#2b2d42", { number: "88", numberColor: GOLD, numberY: 72, numberSize: 110 });
  body += garment("pantsKnee", 810, 385, 1.0, "#e9ecef", { stripe: "#2b2d42" });
  body += callout(230, 262, 175, "top", ["Pro cut for shoulder pads", "stretch shoulders"]);
  body += callout(450, 330, 520, "top", ["Mesh body", "breathable on game day"]);
  body += callout(860, 320, 960, "top", ["Pants $29, 4-way stretch", "internal pad pockets"]);
  body += callout(360, 425, 360, "bottom", ["Numbers: sublimated", "or tackle twill"]);
  return frame("Anatomy of a custom American football uniform", "Jersey $25 + pants $29 = $54 per player at 30 pieces", body);
})();

images["football-uniform-prices"] = tierChart(
  "Custom American football uniform prices",
  "Price per piece, and for a full uniform",
  [
    { name: "Game jersey", unit: "pro cut, per piece", prices: [25, 22.5, 20.5] },
    { name: "Game pants", unit: "pad pockets, per piece", prices: [29, 26.1, 23.78] },
    { name: "Full uniform", unit: "jersey + pants", prices: [54, 48.6, 44.28] },
  ]
);

for (const [name, svg] of Object.entries(images)) {
  const file = path.join(OUT, `${name}.webp`);
  await sharp(Buffer.from(svg)).webp({ quality: 88 }).toFile(file);
  console.log("wrote", file, Math.round(fs.statSync(file).size / 1024) + " KB");
}
