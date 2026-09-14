import { createClient } from "@supabase/supabase-js";
import {
  initialCategories,
  initialProducts,
  initialProjects,
  initialTestimonials,
  initialBlogPosts,
  initialSiteSettings,
  initialInquiries,
} from "../src/lib/data/initialData";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ulamuliwbllkrrpdbdkn.supabase.co";
const serviceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsYW11bGl3Ymxsa3JycGRiZGtuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODgzODE1MiwiZXhwIjoyMTA0NDE0MTUyfQ.iNZf1rLEDkk5THPjDGH8gZrEBl6gFV3K5han6VIg2nE";

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

// Ensures UUID strings conform to RFC 4122 (hexadecimal only)
function toUuid(id: string): string {
  if (!id) return id;
  return id
    .replace(/^p0000001/, "a0000001")
    .replace(/^i0000001/, "f0000001")
    .replace(/^pr000001/, "ab000001")
    .replace(/^pi000001/, "af000001")
    .replace(/^t0000001/, "d0000001")
    .replace(/^s0000001/, "e0000001")
    .replace(/^in000001/, "fc000001");
}

async function runSeed() {
  console.log("🚀 Starting Supabase Database Seeding for GLOVES STORM...");
  console.log(`📡 Connected to Supabase Project: ${supabaseUrl}`);

  // 1. Clean existing data safely
  console.log("\n🧹 Cleaning existing data...");
  await supabase.from("inquiries").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("blog_posts").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("testimonials").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("project_images").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("projects").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("product_images").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("products").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("categories").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("site_settings").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  // 2. Insert Categories
  console.log("\n📁 Seeding Categories...");
  const parentCategories = initialCategories
    .filter((c) => !c.parent_id)
    .map((c) => ({ ...c, id: toUuid(c.id), parent_id: null }));
  const childCategories = initialCategories
    .filter((c) => c.parent_id)
    .map((c) => ({ ...c, id: toUuid(c.id), parent_id: toUuid(c.parent_id!) }));

  const { error: parentCatError } = await supabase.from("categories").insert(parentCategories);
  if (parentCatError) {
    console.error("❌ Error inserting parent categories:", parentCatError);
    process.exit(1);
  }
  console.log(`   ✅ ${parentCategories.length} parent categories inserted.`);

  if (childCategories.length > 0) {
    const { error: childCatError } = await supabase.from("categories").insert(childCategories);
    if (childCatError) {
      console.error("❌ Error inserting child categories:", childCatError);
      process.exit(1);
    }
    console.log(`   ✅ ${childCategories.length} subcategories inserted.`);
  }

  // 3. Insert Products & Product Images
  console.log("\n🥊 Seeding Products & Galleries...");
  const productsToInsert = initialProducts.map((p) => {
    const { images, ...rest } = p;
    return {
      ...rest,
      id: toUuid(rest.id),
      category_id: toUuid(rest.category_id),
    };
  });

  const { error: prodError } = await supabase.from("products").insert(productsToInsert);
  if (prodError) {
    console.error("❌ Error inserting products:", prodError);
    process.exit(1);
  }
  console.log(`   ✅ ${productsToInsert.length} products inserted.`);

  const allProductImages = initialProducts.flatMap((p) =>
    (p.images || []).map((img) => ({
      ...img,
      id: toUuid(img.id),
      product_id: toUuid(img.product_id),
    }))
  );

  if (allProductImages.length > 0) {
    const { error: imgError } = await supabase.from("product_images").insert(allProductImages);
    if (imgError) {
      console.error("❌ Error inserting product images:", imgError);
      process.exit(1);
    }
    console.log(`   ✅ ${allProductImages.length} product images inserted.`);
  }

  // 4. Insert Projects & Project Images
  console.log("\n🏆 Seeding Case Studies & Galleries...");
  const projectsToInsert = initialProjects.map((proj) => {
    const { images, ...rest } = proj;
    return {
      ...rest,
      id: toUuid(rest.id),
    };
  });

  const { error: projError } = await supabase.from("projects").insert(projectsToInsert);
  if (projError) {
    console.error("❌ Error inserting projects:", projError);
    process.exit(1);
  }
  console.log(`   ✅ ${projectsToInsert.length} projects inserted.`);

  const allProjectImages = initialProjects.flatMap((proj) =>
    (proj.images || []).map((img) => ({
      ...img,
      id: toUuid(img.id),
      project_id: toUuid(img.project_id),
    }))
  );

  if (allProjectImages.length > 0) {
    const { error: projImgError } = await supabase.from("project_images").insert(allProjectImages);
    if (projImgError) {
      console.error("❌ Error inserting project images:", projImgError);
      process.exit(1);
    }
    console.log(`   ✅ ${allProjectImages.length} project images inserted.`);
  }

  // 5. Insert Testimonials
  console.log("\n⭐ Seeding Testimonials...");
  const testimonialsToInsert = initialTestimonials.map((t) => ({
    ...t,
    id: toUuid(t.id),
  }));
  const { error: testError } = await supabase.from("testimonials").insert(testimonialsToInsert);
  if (testError) {
    console.error("❌ Error inserting testimonials:", testError);
    process.exit(1);
  }
  console.log(`   ✅ ${testimonialsToInsert.length} testimonials inserted.`);

  // 6. Insert Blog Posts
  console.log("\n📖 Seeding Blog Posts & Technical Guides...");
  const blogPostsToInsert = initialBlogPosts.map((b) => ({
    ...b,
    id: toUuid(b.id),
  }));
  const { error: blogError } = await supabase.from("blog_posts").insert(blogPostsToInsert);
  if (blogError) {
    console.error("❌ Error inserting blog posts:", blogError);
    process.exit(1);
  }
  console.log(`   ✅ ${blogPostsToInsert.length} blog posts inserted.`);

  // 7. Insert Site Settings
  console.log("\n⚙️ Seeding Site Settings...");
  const settingsToInsert = {
    ...initialSiteSettings,
    id: toUuid(initialSiteSettings.id),
  };
  const { error: settingsError } = await supabase.from("site_settings").insert(settingsToInsert);
  if (settingsError) {
    console.error("❌ Error inserting site settings:", settingsError);
    process.exit(1);
  }
  console.log(`   ✅ Official site settings configured.`);

  // 8. Insert Inquiries
  console.log("\n📬 Seeding Demo Inquiries...");
  const inquiriesToInsert = initialInquiries.map((inq) => ({
    ...inq,
    id: toUuid(inq.id),
  }));
  const { error: inqError } = await supabase.from("inquiries").insert(inquiriesToInsert);
  if (inqError) {
    console.error("❌ Error inserting inquiries:", inqError);
    process.exit(1);
  }
  console.log(`   ✅ ${inquiriesToInsert.length} sample inquiries loaded into pipeline.`);

  console.log("\n✨ Supabase Seeding Completed Successfully! All tables are live.");
}

runSeed().catch((err) => {
  console.error("Unhandled error:", err);
  process.exit(1);
});
