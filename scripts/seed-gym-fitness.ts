import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";
import { randomUUID } from "crypto";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ulamuliwbllkrrpdbdkn.supabase.co";
const serviceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsYW11bGl3Ymxsa3JycGRiZGtuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODgzODE1MiwiZXhwIjoyMTA0NDE0MTUyfQ.iNZf1rLEDkk5THPjDGH8gZrEBl6gFV3K5han6VIg2nE";

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const GYM_CATEGORY_ID = "a0000001-0000-0000-0000-000000000003";

interface GymProductJson {
  name: string;
  slug: string;
  short_description: string;
  full_description: string;
  materials: string[];
  key_features: string[];
  customization_options: string[];
  show_wholesale_tiers_publicly: boolean;
  sample_price_usd: number | null;
  price_tiers: any[];
  category: string;
  is_active: boolean;
  feature_on_homepage: boolean;
  moq: number;
  lead_time: string;
  seo_title: string;
  primary_keyword: string;
  secondary_keywords: string;
  meta_description: string;
  images: any[];
  image_alt_texts: string[];
}

async function runGymSeed() {
  console.log("🚀 Starting Gym & Fitness Wear catalog update...");

  // 1. Verify category exists
  const { data: cat, error: catErr } = await supabase
    .from("categories")
    .select("id, name, slug")
    .eq("id", GYM_CATEGORY_ID)
    .single();

  if (catErr || !cat) {
    console.error("❌ Failed to find Gym & Fitness Wear category in Supabase:", catErr);
    process.exit(1);
  }
  console.log(`📂 Found target category: "${cat.name}" (${cat.slug}) [${cat.id}]`);

  // 2. Read new products JSON
  const jsonPath = path.join(__dirname, "gym-fitness-wear-products.json");
  const rawData = fs.readFileSync(jsonPath, "utf-8");
  const parsedData = JSON.parse(rawData);
  const products: GymProductJson[] = parsedData.products;

  console.log(`📦 Loaded ${products.length} products to seed from gym-fitness-wear-products.json.`);

  // 3. Remove previous products of this category ONLY
  console.log("\n🧹 Removing previous products from Gym & Fitness Wear category...");
  const { data: existingProds, error: listErr } = await supabase
    .from("products")
    .select("id, slug, name")
    .eq("category_id", GYM_CATEGORY_ID);

  if (listErr) {
    console.error("❌ Error fetching previous gym products:", listErr);
    process.exit(1);
  }

  const existingIds = existingProds?.map((p) => p.id) || [];
  console.log(`   Found ${existingIds.length} existing products in category.`);

  if (existingIds.length > 0) {
    // Delete product images
    const { error: imgDelErr } = await supabase
      .from("product_images")
      .delete()
      .in("product_id", existingIds);
    if (imgDelErr) {
      console.warn("⚠️ Warning deleting previous product images:", imgDelErr.message);
    }

    // Delete products
    const { error: prodDelErr } = await supabase
      .from("products")
      .delete()
      .eq("category_id", GYM_CATEGORY_ID);
    if (prodDelErr) {
      console.error("❌ Error deleting previous products:", prodDelErr);
      process.exit(1);
    }
    console.log(`   ✅ Successfully removed ${existingIds.length} previous products.`);
  }

  // 4. Prepare new products for insertion / upsert
  console.log(`\n🌱 Inserting ${products.length} new Gym & Fitness Wear products...`);

  // Query current existing products in Gym category again after any deletes
  const { data: currentGymProds } = await supabase
    .from("products")
    .select("id, slug")
    .eq("category_id", GYM_CATEGORY_ID);

  const slugToIdMap = new Map((currentGymProds || []).map((p) => [p.slug, p.id]));

  let counter = 1;
  const records = products.map((prod) => {
    const existingId = slugToIdMap.get(prod.slug);
    const id = existingId || `b0000003-0000-0000-0000-${String(counter).padStart(12, "0")}`;
    counter++;

    const customizationPayload = {
      list: prod.customization_options,
      image_alt_texts: prod.image_alt_texts,
      primary_keyword: prod.primary_keyword,
      secondary_keywords: prod.secondary_keywords,
      pricing_tiers: prod.price_tiers || [],
      sample_price: prod.sample_price_usd,
      show_pricing: prod.show_wholesale_tiers_publicly,
    };

    return {
      id,
      name: prod.name,
      slug: prod.slug,
      category_id: GYM_CATEGORY_ID,
      short_description: prod.short_description,
      description: prod.full_description,
      materials: prod.materials,
      features: prod.key_features,
      customization_options: customizationPayload,
      moq: prod.moq,
      lead_time: prod.lead_time,
      featured: prod.feature_on_homepage,
      is_active: prod.is_active,
      seo_title: prod.seo_title,
      seo_description: prod.meta_description,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  });

  // Upsert products by slug
  for (const record of records) {
    const { error: upsertErr } = await supabase
      .from("products")
      .upsert(record, { onConflict: "slug" });

    if (upsertErr) {
      console.error(`❌ Failed to upsert "${record.name}" (${record.slug}):`, upsertErr);
      process.exit(1);
    }
    console.log(`   ✅ [${record.slug}] ${record.name}`);
  }

  console.log(`\n✨ Successfully seeded ${records.length} Gym & Fitness Wear products into Supabase.`);
  console.log("📸 Images have been kept empty as requested. Ready for admin panel image upload.");
}

runGymSeed().catch((err) => {
  console.error("Fatal seed error:", err);
  process.exit(1);
});
