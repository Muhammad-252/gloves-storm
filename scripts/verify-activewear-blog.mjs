import fs from 'fs';
import path from 'path';
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ulamuliwbllkrrpdbdkn.supabase.co";
const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsYW11bGl3Ymxsa3JycGRiZGtuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODgzODE1MiwiZXhwIjoyMTA0NDE0MTUyfQ.iNZf1rLEDkk5THPjDGH8gZrEBl6gFV3K5han6VIg2nE";

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function verify() {
  console.log("=================== VERIFYING ACTIVEWEAR BLOG POST ===================");

  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", "private-label-activewear-manufacturer-guide")
    .single();

  if (error || !post) {
    console.error("❌ Failed to fetch post from Supabase:", error);
    process.exit(1);
  }

  console.log(`Title: ${post.title}`);
  console.log(`SEO Title: ${post.seo_title}`);
  console.log(`SEO Description: ${post.seo_description}`);
  console.log(`Slug: /journal/${post.slug}`);
  console.log(`Author: ${post.author}`);
  console.log(`Category: ${post.category}`);
  console.log(`Published Date: ${post.published_at}`);
  console.log(`Updated Date: ${post.updated_at}`);
  console.log(`Featured Image: ${post.featured_image}`);

  // Check images on disk
  const imgDir = path.join(process.cwd(), 'public', 'images', 'journal', 'private-label-activewear-manufacturer-guide');
  console.log("\nChecking images on disk:");
  for (let i = 1; i <= 8; i++) {
    const imgFile = path.join(imgDir, `image-${i}.png`);
    const exists = fs.existsSync(imgFile);
    const size = exists ? fs.statSync(imgFile).size : 0;
    console.log(`  Visual ${i} (image-${i}.png): ${exists ? `✅ EXISTS (${(size / 1024).toFixed(1)} KB)` : '❌ MISSING'}`);
  }

  // Check product keywords and links in content
  console.log("\nChecking Product Links in content:");
  const expectedLinks = [
    { name: "Sports Bras", href: "/products/custom-womens-gym-coord-set-manufacturer" },
    { name: "High-Waisted Leggings", href: "/products/custom-high-waist-seamless-gym-leggings" },
    { name: "Gym Crop Tops", href: "/products/custom-womens-gym-crop-top-manufacturer" },
    { name: "Biker Shorts", href: "/products/custom-high-waist-biker-shorts-manufacturer" },
    { name: "Cycling Shorts", href: "/products/custom-cycling-shorts-manufacturer" },
    { name: "Gym Hoodies", href: "/products/custom-lightweight-gym-hoodie-manufacturer" },
    { name: "Gym Joggers", href: "/products/custom-lightweight-gym-joggers-manufacturer" },
    { name: "Compression Base Layer", href: "/products/custom-compression-base-layer-top-manufacturer" },
    { name: "Gym & Fitness Range", href: "/products/gym-fitness-wear" },
    { name: "Custom Labels & Hang Tags", href: "/products/custom-labels-and-hang-tags" },
    { name: "UK Manufacturers", href: "/manufacturers-uk" },
    { name: "USA Manufacturers", href: "/manufacturers-usa" },
    { name: "Contact / Quote", href: "/contact" }
  ];

  for (const item of expectedLinks) {
    const present = post.content.includes(item.href);
    console.log(`  Link to ${item.name} (${item.href}): ${present ? '✅ PRESENT' : '❌ MISSING'}`);
  }

  console.log("\n=================== VERIFICATION COMPLETE ===================");
}

verify();
