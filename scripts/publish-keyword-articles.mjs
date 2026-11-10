import { createClient } from "@supabase/supabase-js";
import fs from "fs";

// Upserts the keyword journal articles built by scripts/build-keyword-articles.py.
// Usage:
//   node scripts/publish-keyword-articles.mjs            -> saves as hidden drafts
//   node scripts/publish-keyword-articles.mjs --publish  -> makes them live on /journal

const publish = process.argv.includes("--publish");

const envContent = fs.readFileSync(".env.local", "utf8");
const env = {};
envContent.split(/\r?\n/).forEach((line) => {
  const [k, ...v] = line.trim().split("=");
  if (k && v.length) env[k.trim()] = v.join("=").trim().replace(/^["']|["']$/g, "");
});

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const AUTHOR = "Muhammad Arslan — Founder of Gloves Storm";
const now = new Date().toISOString();

const posts = [
  {
    id: "b0000001-0000-0000-0000-000000000011",
    title: "Pakistan vs China Clothing Manufacturers: Which Should You Choose? (2026)",
    slug: "pakistan-vs-china-clothing-manufacturer",
    excerpt:
      "Pakistan vs China for clothing manufacturing: compare MOQs, fabrics, landed cost, EU and US duties, lead times and quality control before your first order.",
    file: "scripts/blog-drafts/blog-5-pakistan-vs-china.html",
    featured_image: "/images/products/hoodie-black.png",
    category: "OEM Guides",
    seo_title: "Pakistan vs China Clothing Manufacturers",
  },
  {
    id: "b0000001-0000-0000-0000-000000000012",
    title: "BJJ Rash Guard Manufacturer Guide: Fabric, Sublimation & Ranked Designs",
    slug: "bjj-rash-guard-manufacturer-guide",
    excerpt:
      "How custom BJJ rash guards are made: 200 GSM nylon-spandex, flatlock seams, sublimation that won't crack, ranked designs, and low MOQ from 30 pieces.",
    file: "scripts/blog-drafts/blog-6-bjj-rash-guard.html",
    featured_image: "/images/products/rash-guard.jpg",
    category: "Product Guides",
    seo_title: "BJJ Rash Guard Manufacturer Guide",
  },
  {
    id: "b0000001-0000-0000-0000-000000000013",
    title: "How Much Does It Cost to Make a Hoodie? Real 2026 Factory Prices",
    slug: "how-much-does-it-cost-to-make-a-hoodie",
    excerpt:
      "Real 2026 factory prices for custom hoodies: $28–$35 per piece from 30 pcs, add-on costs, sample prices and a full budget example for your first drop.",
    file: "scripts/blog-drafts/blog-7-hoodie-cost.html",
    featured_image: "/images/products/hoodie-black.png",
    category: "Pricing Guides",
    seo_title: "How Much Does It Cost to Make a Hoodie?",
  },
];

async function run() {
  // Republishing keeps each post's original publish date
  const { data: existing } = await supabase
    .from("blog_posts")
    .select("id, published_at")
    .in("id", posts.map((p) => p.id));
  const originalDates = new Map((existing || []).map((p) => [p.id, p.published_at]));

  for (const post of posts) {
    const { file, ...fields } = post;
    const record = {
      ...fields,
      content: fs.readFileSync(file, "utf8").trim(),
      author: AUTHOR,
      seo_description: fields.excerpt,
      social_image: fields.featured_image,
      is_published: publish,
      published_at: publish ? originalDates.get(post.id) || now : null,
      updated_at: now,
    };
    const { data, error } = await supabase.from("blog_posts").upsert(record).select().single();
    if (error) {
      console.error(`❌ ${post.slug}:`, error.message);
      process.exitCode = 1;
      continue;
    }
    console.log(`✅ ${publish ? "Published" : "Saved draft"}: /journal/${data.slug}`);
  }
}

run();
