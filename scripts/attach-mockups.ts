/**
 * Attaches the generated mockup images in public/images/products/mockups/ to their
 * products and switches those products on.
 *
 *   npx tsx scripts/attach-mockups.ts           -> dry run
 *   npx tsx scripts/attach-mockups.ts --apply   -> write
 *
 * Products that already have images are left alone, so real photos are never replaced.
 * Run this only after the images are deployed, or the live pages will show broken images.
 */
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { createClient } from "@supabase/supabase-js";

const apply = process.argv.includes("--apply");

const env: Record<string, string> = {};
for (const line of fs.readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const i = line.indexOf("=");
  if (i > 0) env[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
}
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

// File names that don't follow "<product-slug>-mockup.jpg"
const FILE_TO_SLUG: Record<string, string> = {
  "custom-puffer-jacket-mockup.jpg": "custom-puffer-jackets",
  "custom-embroidered-cap-mockup.jpg": "custom-embroidered-caps",
};

async function run() {
  const dir = path.join("public", "images", "products", "mockups");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith("-mockup.jpg"));

  const { data: products, error } = await supabase
    .from("products")
    .select("id, slug, name, is_active, images:product_images(id)");
  if (error || !products) throw new Error(error?.message || "No products");

  for (const file of files) {
    const slug = FILE_TO_SLUG[file] || file.replace(/-mockup\.jpg$/, "");
    const product = products.find((p) => p.slug === slug);
    if (!product) {
      console.log(`SKIP   ${file}: no product with slug ${slug}`);
      continue;
    }
    const hasImages = Array.isArray(product.images) && product.images.length > 0;
    console.log(`${hasImages ? "KEEP  " : "ATTACH"} ${slug}${hasImages ? " (already has images)" : ""}${product.is_active ? "" : " + activate"}`);
    if (!apply) continue;

    if (!hasImages) {
      const { error: imgErr } = await supabase.from("product_images").insert({
        id: randomUUID(),
        product_id: product.id,
        image_url: `/images/products/mockups/${file}`,
        alt_text: `${product.name} design mockup by Gloves Storm, Sialkot`,
        sort_order: 1,
        is_primary: true,
        created_at: new Date().toISOString(),
      });
      if (imgErr) {
        console.error(`  ❌ image ${slug}: ${imgErr.message}`);
        continue;
      }
    }
    if (!product.is_active) {
      const { error: actErr } = await supabase
        .from("products")
        .update({ is_active: true, updated_at: new Date().toISOString() })
        .eq("id", product.id);
      if (actErr) console.error(`  ❌ activate ${slug}: ${actErr.message}`);
    }
  }
  if (!apply) console.log("\nDry run only. Re-run with --apply after the images are deployed.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
