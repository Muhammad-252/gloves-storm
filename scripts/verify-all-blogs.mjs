import fs from 'fs';
import path from 'path';
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ulamuliwbllkrrpdbdkn.supabase.co";
const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsYW11bGl3Ymxsa3JycGRiZGtuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODgzODE1MiwiZXhwIjoyMTA0NDE0MTUyfQ.iNZf1rLEDkk5THPjDGH8gZrEBl6gFV3K5han6VIg2nE";

const supabase = createClient(supabaseUrl, serviceRoleKey);

const slugs = [
  "private-label-clothing-manufacturer-guide",
  "custom-gym-wear-manufacturer-guide",
  "custom-team-uniforms-manufacturer-guide"
];

async function verify() {
  console.log("=================== VERIFYING BLOG POSTS IN DB ===================");
  for (const slug of slugs) {
    const { data: post, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !post) {
      console.error(`❌ Post not found: ${slug}`);
      continue;
    }

    console.log(`\n--- POST: ${post.title} ---`);
    console.log(`Slug: /journal/${post.slug}`);
    console.log(`Category: ${post.category}`);
    console.log(`Author: ${post.author}`);
    console.log(`Featured Image: ${post.featured_image}`);

    // Check featured image on disk
    const featDiskPath = path.join(process.cwd(), "public", post.featured_image.replace(/^\//, ""));
    console.log(`Featured image on disk: ${fs.existsSync(featDiskPath) ? "✅ EXISTS" : "❌ MISSING"} (${featDiskPath})`);

    // Check images inside content
    const imgMatches = [...post.content.matchAll(/<img[^>]+src="([^">]+)"/g)].map(m => m[1]);
    console.log(`Content images count: ${imgMatches.length}`);
    imgMatches.forEach(img => {
      const p = path.join(process.cwd(), "public", img.replace(/^\//, ""));
      console.log(`  - ${img} -> ${fs.existsSync(p) ? "✅ EXISTS" : "❌ MISSING"}`);
    });

    // Check interlinks to other blogs
    console.log(`Links to low-moq: ${post.content.includes("/journal/low-moq-clothing-manufacturers-for-startups") ? "✅ YES" : "❌ NO"}`);
    for (const otherSlug of slugs) {
      if (otherSlug !== slug) {
        console.log(`Links to ${otherSlug}: ${post.content.includes(`/journal/${otherSlug}`) ? "✅ YES" : "❌ NO"}`);
      }
    }

    // Check links to different site pages
    console.log(`Links to /products: ${post.content.includes('href="/products"') || post.content.includes('href="/products/') ? "✅ YES" : "❌ NO"}`);
    console.log(`Links to /contact: ${post.content.includes('href="/contact"') ? "✅ YES" : "❌ NO"}`);
    console.log(`Links to /manufacturers-usa: ${post.content.includes('href="/manufacturers-usa"') ? "✅ YES" : "❌ NO"}`);
    console.log(`Links to /manufacturers-uk: ${post.content.includes('href="/manufacturers-uk"') ? "✅ YES" : "❌ NO"}`);

    // Check external links for nofollow
    const extLinks = [...post.content.matchAll(/<a\b[^>]*href="(https?:\/\/[^"]+)"[^>]*>/gi)];
    console.log(`External links found: ${extLinks.length}`);
    let allNofollow = true;
    extLinks.forEach(m => {
      const tag = m[0];
      const href = m[1];
      if (href.includes("glovesstorm.com")) return; // internal domain
      const hasNofollow = tag.includes('rel="nofollow') || tag.includes("rel='nofollow");
      if (!hasNofollow) {
        console.warn(`  ⚠️ External link missing nofollow: ${href} (tag: ${tag})`);
        allNofollow = false;
      }
    });
    if (allNofollow) {
      console.log(`External links nofollow check: ✅ ALL NOFOLLOW`);
    }
  }
}

verify();
