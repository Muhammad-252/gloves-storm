import { createClient } from "@supabase/supabase-js";
import fs from "fs";

// Saves the updated HTML from scripts/update-moq-and-team-guides.py to the live posts.
// Keeps each post's original publish date; only content, SEO fields and updated_at change.
//   node scripts/republish-updated-guides.mjs

const envContent = fs.readFileSync(".env.local", "utf8");
const env = {};
envContent.split(/\r?\n/).forEach((line) => {
  const [k, ...v] = line.trim().split("=");
  if (k && v.length) env[k.trim()] = v.join("=").trim().replace(/^["']|["']$/g, "");
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const updates = [
  {
    slug: "low-moq-clothing-manufacturers-for-startups",
    seo_title: "Low MOQ Clothing Manufacturers (2026 Guide)",
    seo_description:
      "Compare low MOQ clothing manufacturers for startups: minimums from 30 pieces, real 2026 prices, sample costs and a vetting checklist before you order.",
  },
  {
    slug: "custom-team-uniforms-manufacturer-guide",
    seo_title: "Branded Team Uniforms: Custom Ordering Guide",
    seo_description:
      "How to order branded team uniforms: sublimated jerseys with names and numbers from 30 pieces, real prices per set, sample costs and delivery times.",
  },
];

for (const u of updates) {
  const content = fs.readFileSync(`scripts/blog-drafts/updated-${u.slug}.html`, "utf8").trim();
  const { error } = await supabase
    .from("blog_posts")
    .update({ content, seo_title: u.seo_title, seo_description: u.seo_description, updated_at: new Date().toISOString() })
    .eq("slug", u.slug);
  console.log(error ? `❌ ${u.slug}: ${error.message}` : `✅ Updated /journal/${u.slug}`);
}
