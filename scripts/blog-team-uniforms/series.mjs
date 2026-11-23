/**
 * Team uniform article series: one main guide (team uniform cost) and four sport guides.
 * Drafts in scripts/blog-drafts/ use {{PLACEHOLDERS}} for repeated markup; render() expands
 * them and inserts the series boxes that link every article to the others.
 */
import fs from "fs";

// seoTitle: max 45 characters. The journal page cuts longer titles before adding " | Gloves Storm".
export const SERIES = [
  {
    slug: "how-much-do-custom-team-uniforms-cost",
    file: "scripts/blog-drafts/blog-8-team-uniform-cost.html",
    id: "b0000001-0000-0000-0000-000000000014",
    short: "Team uniform cost guide (all sports)",
    title: "How Much Do Custom Team Uniforms Cost? Real 2026 Factory Prices",
    seoTitle: "How Much Do Custom Team Uniforms Cost?",
    description:
      "Real 2026 factory prices for custom team uniforms: soccer kits from $21, basketball from $23, baseball and football sets, samples and two full budgets.",
    image: "/images/journal/team-uniforms/team-uniform-cost-per-player.webp",
  },
  {
    slug: "custom-soccer-uniforms-guide",
    file: "scripts/blog-drafts/blog-9-soccer-uniforms.html",
    id: "b0000001-0000-0000-0000-000000000015",
    short: "Soccer uniforms",
    title: "Custom Soccer Uniforms: Prices, Fabrics and How to Order (2026)",
    seoTitle: "Custom Soccer Uniforms: 2026 Price Guide",
    description:
      "Custom soccer uniform prices for 2026: sublimated kits from $21 a set with names and numbers, fabrics, goalkeeper kits, sizing and how to order from 30 sets.",
    image: "/images/journal/team-uniforms/soccer-kit-anatomy.webp",
  },
  {
    slug: "custom-basketball-uniforms-guide",
    file: "scripts/blog-drafts/blog-10-basketball-uniforms.html",
    id: "b0000001-0000-0000-0000-000000000016",
    short: "Basketball uniforms",
    title: "Custom Basketball Uniforms: Prices, Reversibles and How to Order (2026)",
    seoTitle: "Custom Basketball Uniforms: 2026 Prices",
    description:
      "Custom basketball uniform prices for 2026: sublimated sets from $23, reversible uniforms from $33, fabrics, numbers, sizing and how to order from 30 sets.",
    image: "/images/journal/team-uniforms/basketball-standard-vs-reversible.webp",
  },
  {
    slug: "custom-baseball-uniforms-guide",
    file: "scripts/blog-drafts/blog-11-baseball-uniforms.html",
    id: "b0000001-0000-0000-0000-000000000017",
    short: "Baseball uniforms",
    title: "Custom Baseball Uniforms: Jerseys, Pants, Prices and Ordering (2026)",
    seoTitle: "Custom Baseball Uniforms: 2026 Price Guide",
    description:
      "Custom baseball uniform prices for 2026: button-front jerseys from $22, pants from $19, a full uniform from $41 per player, styles, piping and how to order.",
    image: "/images/journal/team-uniforms/baseball-uniform-anatomy.webp",
  },
  {
    slug: "custom-american-football-uniforms-guide",
    file: "scripts/blog-drafts/blog-12-american-football-uniforms.html",
    id: "b0000001-0000-0000-0000-000000000018",
    short: "American football uniforms",
    title: "Custom American Football Uniforms: Jerseys, Pants and Prices (2026)",
    seoTitle: "Custom Football Uniforms: 2026 Price Guide",
    description:
      "Custom American football uniform prices for 2026: game jerseys from $25, pants with pad pockets from $29, sublimation vs tackle twill and how to order.",
    image: "/images/journal/team-uniforms/football-uniform-anatomy.webp",
  },
];

const LINK =
  'class="text-neutral-900 font-bold underline decoration-[#FFB900] decoration-2 underline-offset-4 hover:text-[#FFB900] transition-colors"';

const TOKENS = {
  "{{L}}": LINK,
  // Outside links: nofollow so they don't pass ranking value, opened in a new tab
  "{{EXT}}": `target="_blank" rel="nofollow noopener noreferrer" ${LINK}`,
  "{{H2}}": 'class="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900 pt-4"',
  "{{H3}}": 'class="text-lg sm:text-xl font-bold text-neutral-900"',
  "{{TW}}": 'class="overflow-x-auto my-6 rounded-2xl border border-neutral-200 shadow-xs"',
  "{{T}}": 'class="w-full text-left border-collapse text-xs sm:text-sm"',
  "{{THR}}": 'class="bg-neutral-900 text-white font-mono uppercase tracking-wider text-xs border-b-2 border-[#FFB900]"',
  "{{TH}}": 'class="py-3.5 px-4 font-bold"',
  "{{TB}}": 'class="divide-y divide-neutral-100 bg-white"',
  "{{TR}}": 'class="hover:bg-neutral-50 transition-colors"',
  "{{TRH}}": 'class="bg-[#FFB900]/10 hover:bg-[#FFB900]/15 transition-colors border-l-4 border-l-[#FFB900]"',
  "{{TDB}}": 'class="py-3.5 px-4 font-bold text-neutral-900"',
  "{{TD}}": 'class="py-3.5 px-4 text-neutral-700"',
  "{{FIG}}": 'class="rounded-2xl overflow-hidden my-6 border border-neutral-200 shadow-sm bg-white"',
  "{{IMG}}": 'class="w-full h-auto object-cover" loading="lazy" width="1200" height="675"',
  "{{OL}}": 'class="list-decimal pl-6 space-y-3"',
  "{{UL}}": 'class="list-disc pl-6 space-y-2"',
  "{{QUICK_START}}": `<div class="p-6 sm:p-8 rounded-3xl bg-neutral-50 border border-neutral-200/90 shadow-xs relative overflow-hidden">
    <div class="flex flex-wrap items-center gap-2 mb-3">
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFB900] text-black text-xs font-mono font-bold uppercase tracking-wider">Quick Answer</span>
      <span class="text-xs font-mono text-neutral-500 font-medium">Last updated: November 23, 2026</span>
    </div>
    <p class="text-base sm:text-lg text-neutral-900 font-medium leading-relaxed mb-4">`,
  "{{QUICK_END}}": `</p>
    <div class="pt-3 border-t border-neutral-200/70 text-xs text-neutral-500 font-medium">
      Written by <span class="text-neutral-900 font-bold">Muhammad Arslan</span>, Founder &amp; Managing Director of <a href="https://www.glovesstorm.com" title="Gloves Storm" ${LINK}>Gloves Storm</a>
    </div>
  </div>`,
  "{{AUTHOR}}": `<div class="p-6 sm:p-8 rounded-3xl bg-neutral-50 border border-neutral-200 my-8">
    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div class="w-14 h-14 rounded-2xl bg-neutral-900 text-[#FFB900] font-black text-xl flex items-center justify-center shrink-0 border border-neutral-700 shadow-sm">MA</div>
      <div>
        <h4 class="text-base font-bold text-neutral-900 mb-1">About the Author: Muhammad Arslan</h4>
        <p class="text-xs sm:text-sm text-neutral-600 leading-relaxed">Muhammad Arslan is the founder of Gloves Storm in Sialkot, Pakistan, producing sublimated team uniforms for soccer, basketball, baseball and football teams, clubs and teamwear brands in the USA, UK and Europe.</p>
      </div>
    </div>
  </div>`,
};

function seriesBox(currentSlug, position) {
  const items = SERIES.map((a, i) => {
    const label = i === 0 ? `Main guide: ${a.short}` : a.short;
    if (a.slug === currentSlug) {
      return `<li class="flex items-center gap-2 text-neutral-500"><span class="w-1.5 h-1.5 rounded-full bg-[#FFB900] shrink-0"></span><span>${label} <em>(you are here)</em></span></li>`;
    }
    return `<li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-neutral-900 shrink-0"></span><a href="/journal/${a.slug}" ${LINK}>${label}</a></li>`;
  }).join("\n      ");
  const heading =
    position === "top" ? "Part of our team uniform buying guides" : "Keep reading: team uniform buying guides";
  return `<div class="p-5 sm:p-6 rounded-2xl border border-neutral-200 bg-white">
    <p class="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 mb-3">${heading}</p>
    <ul class="space-y-2 text-sm">
      ${items}
    </ul>
  </div>`;
}

export function render(article) {
  let html = fs.readFileSync(article.file, "utf8");
  html = html.replace("{{SERIES_TOP}}", seriesBox(article.slug, "top"));
  html = html.replace("{{SERIES_BOTTOM}}", seriesBox(article.slug, "bottom"));
  // Longest tokens first so {{TRH}} isn't eaten by {{TR}}
  for (const key of Object.keys(TOKENS).sort((a, b) => b.length - a.length)) {
    html = html.split(key).join(TOKENS[key]);
  }
  const left = html.match(/\{\{[A-Z_]+\}\}/);
  if (left) throw new Error(`${article.slug}: unknown placeholder ${left[0]}`);
  return html.trim();
}
