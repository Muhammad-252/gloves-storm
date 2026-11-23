/**
 * Saves the five team uniform articles to Supabase.
 *
 *   node scripts/blog-team-uniforms/publish.mjs            -> save all as drafts (hidden on the site)
 *   node scripts/blog-team-uniforms/publish.mjs --publish  -> publish all on /journal
 *   node scripts/blog-team-uniforms/publish.mjs --preview  -> write a local preview page only
 *
 * Publish only after the images in public/images/journal/team-uniforms/ and the FAQs in
 * src/lib/data/journalFaqs.ts are deployed, or the live pages will show broken images.
 */
import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { SERIES, render } from "./series.mjs";

const publish = process.argv.includes("--publish");
const previewOnly = process.argv.includes("--preview");

const rendered = SERIES.map((a) => ({ ...a, html: render(a) }));

// Basic checks: every outside link is nofollow, every internal article link exists
for (const a of rendered) {
  for (const m of a.html.matchAll(/<a\s[^>]*href="(https?:\/\/[^"]+)"[^>]*>/g)) {
    const href = m[1];
    if (href.startsWith("https://www.glovesstorm.com")) continue;
    if (!/rel="[^"]*nofollow/.test(m[0])) throw new Error(`${a.slug}: outside link without nofollow: ${href}`);
  }
  for (const m of a.html.matchAll(/href="\/journal\/([a-z0-9-]+)/g)) {
    const known = SERIES.some((s) => s.slug === m[1]) || m[1] === "custom-team-uniforms-manufacturer-guide";
    if (!known) throw new Error(`${a.slug}: unknown journal link /journal/${m[1]}`);
  }
  for (const m of a.html.matchAll(/src="(\/images\/[^"]+)"/g)) {
    if (!fs.existsSync(path.join("public", m[1]))) throw new Error(`${a.slug}: missing image ${m[1]}`);
  }
}

if (previewOnly) {
  const out = process.argv[process.argv.indexOf("--preview") + 1] || "team-uniform-series-preview.html";
  const imgBase = path.resolve("public").replace(/\\/g, "/");
  const body = rendered
    .map(
      (a) => `<section id="${a.slug}" class="max-w-3xl mx-auto px-4 py-12 border-b-4 border-neutral-900">
  <p class="text-xs text-neutral-500 mb-2">/journal/${a.slug}</p>
  <h1 class="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 mb-6">${a.title}</h1>
  <img src="file:///${imgBase}${a.image}" class="w-full rounded-2xl mb-8" alt="">
  <article class="prose-like">${a.html
    .replace(/src="\/images\//g, `src="file:///${imgBase}/images/`)
    .replace(/href="\/journal\/([a-z0-9-]+)/g, 'href="#$1')}</article>
</section>`
    )
    .join("\n");
  fs.writeFileSync(
    out,
    `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Team Uniform Series Preview</title><script src="https://cdn.tailwindcss.com/3.4.17"></script><style>body{background:#f6f4ef}.prose-like p,.prose-like li{line-height:1.75;color:#262626}</style></head><body>${body}</body></html>`
  );
  console.log("Preview written to", out);
  process.exit(0);
}

const env = {};
for (const line of fs.readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const i = line.indexOf("=");
  if (i > 0) env[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
}
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

// Space the publish times a minute apart so the main guide shows first in the journal list
const base = Date.now();
for (const [i, a] of rendered.entries()) {
  const { data: existing } = await supabase.from("blog_posts").select("id").eq("slug", a.slug).maybeSingle();
  const when = new Date(base - i * 60_000).toISOString();
  const row = {
    id: existing?.id || a.id,
    title: a.title,
    slug: a.slug,
    excerpt: a.description,
    content: a.html,
    featured_image: a.image,
    social_image: a.image,
    category: "Pricing Guides",
    author: "Muhammad Arslan — Founder of Gloves Storm",
    published_at: when,
    is_published: publish,
    seo_title: a.seoTitle,
    seo_description: a.description,
    updated_at: when,
  };
  const { data, error } = await supabase.from("blog_posts").upsert(row).select("slug, is_published").single();
  if (error) throw new Error(`${a.slug}: ${error.message}`);
  console.log(`${data.is_published ? "Published" : "Draft"}: /journal/${data.slug}`);
}
