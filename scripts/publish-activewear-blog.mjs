import fs from 'fs';
import path from 'path';
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ulamuliwbllkrrpdbdkn.supabase.co";
const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsYW11bGl3Ymxsa3JycGRiZGtuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODgzODE1MiwiZXhwIjoyMTA0NDE0MTUyfQ.iNZf1rLEDkk5THPjDGH8gZrEBl6gFV3K5han6VIg2nE";

const supabase = createClient(supabaseUrl, serviceRoleKey);

const draftsDir = path.join(process.cwd(), 'scripts', 'blog-drafts');
const htmlContent = fs.readFileSync(path.join(draftsDir, 'blog-4-private-label-activewear.html'), 'utf8');

const updatedPost = {
  id: "b0000001-0000-0000-0000-000000000004",
  slug: "private-label-activewear-manufacturer-guide",
  title: "Private Label Activewear Manufacturer: Complete Guide for USA & UK Fitness Brands (2026)",
  seo_title: "Private Label Activewear Manufacturer: Low MOQ Guide 2026",
  seo_description: "Launch private label activewear, gym clothes, and athleisure in 2026 from 30-50 pieces. Compare fabrics, stitching, trims, and costs from a direct factory.",
  category: "Product Guides",
  author: "Muhammad Arslan — Founder of Gloves Storm",
  excerpt: "Launch private label activewear, gym clothes, and athleisure in 2026 from 30-50 pieces. Compare fabrics, stitching, trims, and costs from a direct factory.",
  featured_image: "/images/journal/private-label-activewear-manufacturer-guide/image-1.png",
  content: htmlContent,
  is_published: true,
  published_at: "2026-09-10T10:16:34.579+00:00",
  updated_at: new Date().toISOString()
};

async function run() {
  console.log("Updating activewear blog post in Supabase...");
  const { data, error } = await supabase
    .from("blog_posts")
    .upsert(updatedPost)
    .select()
    .single();

  if (error) {
    console.error("❌ Failed to update post:", error);
    process.exit(1);
  }

  console.log(`✅ Successfully updated post: "${data.title}"`);
  console.log(`   Slug: /journal/${data.slug}`);
  console.log(`   Updated At: ${data.updated_at}`);
  console.log(`   Content Length: ${data.content.length} characters`);
  console.log(`   Featured Image: ${data.featured_image}`);
}

run();
