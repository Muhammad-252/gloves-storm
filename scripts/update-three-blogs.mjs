import fs from 'fs';
import path from 'path';
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ulamuliwbllkrrpdbdkn.supabase.co";
const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsYW11bGl3Ymxsa3JycGRiZGtuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODgzODE1MiwiZXhwIjoyMTA0NDE0MTUyfQ.iNZf1rLEDkk5THPjDGH8gZrEBl6gFV3K5han6VIg2nE";

const supabase = createClient(supabaseUrl, serviceRoleKey);

const draftsDir = path.join(process.cwd(), 'scripts', 'blog-drafts');

const blog1Html = fs.readFileSync(path.join(draftsDir, 'blog-1-private-label.html'), 'utf8');
const blog2Html = fs.readFileSync(path.join(draftsDir, 'blog-2-gym-wear.html'), 'utf8');
const blog3Html = fs.readFileSync(path.join(draftsDir, 'blog-3-team-uniforms.html'), 'utf8');

const posts = [
  {
    id: "b0000001-0000-0000-0000-000000000006",
    slug: "private-label-clothing-manufacturer-guide",
    title: "How to Find the Right Private Label Clothing Manufacturer for Your Brand in 2026 (Honest Guide)",
    category: "Private Label",
    author: "Muhammad Arslan — Founder of Gloves Storm",
    excerpt: "Looking for a private label clothing manufacturer? This honest guide covers how to find, evaluate and work with an OEM manufacturer — plus the questions most brand owners forget to ask before placing their first order.",
    seo_title: "How to Find the Right Private Label Clothing Manufacturer in 2026",
    seo_description: "Looking for a private label clothing manufacturer? This honest guide covers how to find, evaluate and work with an OEM manufacturer — plus the questions most brand owners forget to ask before placing their first order.",
    featured_image: "/images/journal/private-label-clothing-manufacturer-guide/image-1.png",
    content: blog1Html,
    is_published: true,
    published_at: "2026-10-14T10:00:00.000Z",
    updated_at: new Date().toISOString()
  },
  {
    id: "b0000001-0000-0000-0000-000000000007",
    slug: "custom-gym-wear-manufacturer-guide",
    title: "Custom Gym Wear Manufacturer: What USA and UK Fitness Brands Need to Know Before Placing Their First Order",
    category: "Product Guides",
    author: "Muhammad Arslan — Founder of Gloves Storm",
    excerpt: "Thinking about launching your own gym wear brand? This guide covers everything — fabrics, MOQ, sizing, lead times and what separates a good activewear manufacturer from a great one. Written from a direct Sialkot factory.",
    seo_title: "Custom Gym Wear Manufacturer — Private Label Activewear Guide 2026",
    seo_description: "Thinking about launching your own gym wear brand? This guide covers everything — fabrics, MOQ, sizing, lead times and what separates a good activewear manufacturer from a great one. Written from a direct Sialkot factory.",
    featured_image: "/images/journal/custom-gym-wear-manufacturer-guide/image-1.png",
    content: blog2Html,
    is_published: true,
    published_at: "2026-10-14T09:30:00.000Z",
    updated_at: new Date().toISOString()
  },
  {
    id: "b0000001-0000-0000-0000-000000000008",
    slug: "custom-team-uniforms-manufacturer-guide",
    title: "Custom Team Uniforms Manufacturer: The Complete Ordering Guide for USA and UK Sports Brands",
    category: "Manufacturing",
    author: "Muhammad Arslan — Founder of Gloves Storm",
    excerpt: "Everything sports brands, team managers and uniform suppliers need to know about ordering custom team uniforms — from sublimation printing and fabric selection to MOQ, lead times and what to check before bulk production begins.",
    seo_title: "Custom Team Uniforms Manufacturer — Complete Guide for USA & UK Brands",
    seo_description: "Everything sports brands, team managers and uniform suppliers need to know about ordering custom team uniforms — from sublimation printing and fabric selection to MOQ, lead times and what to check before bulk production begins.",
    featured_image: "/images/journal/custom-team-uniforms-manufacturer-guide/image-1.png",
    content: blog3Html,
    is_published: true,
    published_at: "2026-10-14T09:00:00.000Z",
    updated_at: new Date().toISOString()
  }
];

async function updatePosts() {
  console.log("Updating 3 blog posts in Supabase...");
  for (const post of posts) {
    const { data, error } = await supabase
      .from("blog_posts")
      .upsert(post)
      .select()
      .single();

    if (error) {
      console.error(`Error updating "${post.title}":`, error);
    } else {
      console.log(`✅ Updated "${data.title}" (slug: ${data.slug}, content length: ${data.content.length})`);
    }
  }
}

updatePosts();
