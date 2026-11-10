/**
 * Applies the public price list (src/lib/data/priceList.ts) to products in Supabase.
 *
 *   npx tsx scripts/sync-price-list.ts           -> dry run, prints every change
 *   npx tsx scripts/sync-price-list.ts --apply   -> writes the changes
 *
 * For each product page listed in the price list it sets the 30–99 / 100–299 / 300+ tiers,
 * the all-in sample price, the price unit, MOQ 30 and the production time.
 * Garment products that are not in the price list get show_pricing = false, so the site
 * shows "Priced to your spec" instead of old placeholder prices.
 */
import fs from "fs";
import { createClient } from "@supabase/supabase-js";
import { SPORTSWEAR_PRICES, STREETWEAR_PRICES, PriceListItem } from "../src/lib/data/priceList";

const apply = process.argv.includes("--apply");

const env: Record<string, string> = {};
for (const line of fs.readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const i = line.indexOf("=");
  if (i > 0) env[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
}
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

// Accessory services keep their own minimums
const KEEP_MOQ = new Set(["custom-labels-and-hang-tags", "custom-packaging-manufacturing"]);

function tiersFor(item: PriceListItem) {
  const [a, b, c] = item.prices;
  return [
    { label: "30–99 pcs", currency: "$", unit_price: a, min_quantity: 30, max_quantity: 99 },
    { label: "100–299 pcs", currency: "$", unit_price: b, min_quantity: 100, max_quantity: 299 },
    { label: "300+ pcs", currency: "$", unit_price: c, min_quantity: 300, max_quantity: null },
  ];
}

async function run() {
  const bySlug = new Map<string, PriceListItem>();
  for (const group of [...SPORTSWEAR_PRICES, ...STREETWEAR_PRICES]) {
    for (const item of group.items) for (const slug of item.slugs) bySlug.set(slug, item);
  }

  const { data: products, error } = await supabase
    .from("products")
    .select("id, slug, name, moq, lead_time, customization_options");
  if (error || !products) throw new Error(error?.message || "No products returned");

  let changed = 0;
  for (const p of products) {
    const custom: Record<string, unknown> = (p.customization_options && typeof p.customization_options === "object" && !Array.isArray(p.customization_options))
      ? { ...(p.customization_options as Record<string, unknown>) }
      : Array.isArray(p.customization_options)
      ? { list: p.customization_options }
      : {};
    const item = bySlug.get(p.slug);
    const update: Record<string, unknown> = {};

    if (item) {
      custom.pricing_tiers = tiersFor(item);
      custom.sample_price = item.sample;
      custom.price_unit = item.unit;
      custom.show_pricing = true;
      update.customization_options = custom;
      update.moq = 30;
      update.lead_time = item.production;
      console.log(`PRICE  ${p.slug}: $${item.prices.join(" / $")} per ${item.unit}, sample $${item.sample}, ${item.production}`);
    } else {
      if (custom.show_pricing !== false) {
        custom.show_pricing = false;
        update.customization_options = custom;
        console.log(`HIDE   ${p.slug}: not in price list, shows "Priced to your spec"`);
      }
      if (!KEEP_MOQ.has(p.slug) && p.moq !== 30) {
        update.moq = 30;
        console.log(`MOQ    ${p.slug}: ${p.moq} -> 30`);
      }
    }

    if (Object.keys(update).length === 0) continue;
    changed++;
    if (apply) {
      const { error: upErr } = await supabase
        .from("products")
        .update({ ...update, updated_at: new Date().toISOString() })
        .eq("id", p.id);
      if (upErr) console.error(`  ❌ ${p.slug}: ${upErr.message}`);
    }
  }

  const missing = [...bySlug.keys()].filter((slug) => !products.some((p) => p.slug === slug));
  console.log(`\n${changed} products ${apply ? "updated" : "would change"}.`);
  if (missing.length) console.log(`Price list slugs without a product yet: ${missing.join(", ")}`);
  if (!apply) console.log("Dry run only. Re-run with --apply to write.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
