import { createClient } from "@supabase/supabase-js";
import fs from "fs";

// Read .env.local
const envContent = fs.readFileSync(".env.local", "utf8");
const env = {};
envContent.split("\n").forEach((line) => {
  const [k, ...v] = line.trim().split("=");
  if (k && v.length) env[k.trim()] = v.join("=").trim().replace(/^["']|["']$/g, "");
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// Read article content
const content = fs.readFileSync("full-article.html", "utf8");

const postData = {
  id: "b0000001-0000-0000-0000-000000000010",
  title: "Top 10 Low MOQ Clothing Manufacturers for Startups (2026)",
  slug: "low-moq-clothing-manufacturers-for-startups",
  excerpt: "Compare 10 low MOQ clothing manufacturers for startups in 2026: MOQs, lead times, specialties and sample costs, plus a vetting checklist.",
  content: content.trim(),
  featured_image: "/images/journal/low-moq-clothing-manufacturers/image-1.png",
  category: "OEM Guides",
  author: "Muhammad Arslan - Founder of Glovesstorm",
  published_at: new Date().toISOString(),
  is_published: true,
  seo_title: "Top 10 Low MOQ Clothing Manufacturers for Startups (2026)",
  seo_description: "Compare 10 low MOQ clothing manufacturers for startups in 2026: MOQs, lead times, specialties and sample costs, plus a vetting checklist.",
  social_image: "/images/journal/low-moq-clothing-manufacturers/image-1.png",
  updated_at: new Date().toISOString()
};

async function run() {
  console.log("Upserting blog post to Supabase...");
  const { data, error } = await supabase.from("blog_posts").upsert(postData).select().single();
  if (error) {
    console.error("❌ Error upserting post:", error);
    process.exit(1);
  }
  console.log("✅ Successfully published post to Supabase!");
  console.log("Post ID:", data.id);
  console.log("Slug:", data.slug);
  console.log("Title:", data.title);
}

run();
