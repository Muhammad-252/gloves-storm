/**
 * Merges four duplicate products into the page that has real photos (Nov 2026).
 *
 *   npx tsx scripts/merge-duplicate-products.ts           -> dry run
 *   npx tsx scripts/merge-duplicate-products.ts --apply   -> write
 *
 * - Hides the duplicate (is_active = false; nothing is deleted, so it can be switched back on in admin)
 * - Gives the kept product the price-list prices of the merged item
 * - Rewrites links to the duplicate inside journal articles
 * The old product URLs get permanent redirects in next.config.ts.
 */
import fs from "fs";
import { createClient } from "@supabase/supabase-js";
import { SPORTSWEAR_PRICES, STREETWEAR_PRICES } from "../src/lib/data/priceList";

const apply = process.argv.includes("--apply");
const env: Record<string, string> = {};
for (const line of fs.readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const i = line.indexOf("=");
  if (i > 0) env[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
}
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

export const MERGES = [
  { from: "/products/clothing-streetwear/custom-varsity-jackets", to: "/products/sportswear-teamwear/custom-team-jackets" },
  { from: "/products/sportswear-teamwear/custom-compression-wear", to: "/products/gym-fitness-wear/custom-compression-base-layer-top-manufacturer" },
  { from: "/products/gym-fitness-wear/custom-2-in-1-gym-shorts", to: "/products/gym-fitness-wear/custom-mens-training-shorts-manufacturer" },
  { from: "/products/clothing-streetwear/custom-boxy-t-shirts", to: "/products/clothing-streetwear/custom-oversized-t-shirts" },
  // Broken link (no category) in the private label activewear guide
  { from: "/products/custom-compression-wear", to: "/products/gym-fitness-wear/custom-compression-base-layer-top-manufacturer" },
];
const slugOf = (url: string) => url.split("/").pop()!;

const priceItems = [...SPORTSWEAR_PRICES, ...STREETWEAR_PRICES].flatMap((g) => g.items);

async function run() {
  console.log(apply ? "APPLYING\n" : "DRY RUN (add --apply to write)\n");

  for (const m of MERGES) {
    const dup = slugOf(m.from);
    const keep = slugOf(m.to);
    const { data: rows, error } = await supabase
      .from("products")
      .select("id, slug, is_active, customization_options")
      .in("slug", [dup, keep]);
    if (error) throw new Error(error.message);
    const dupRow = rows?.find((r) => r.slug === dup);
    const keepRow = rows?.find((r) => r.slug === keep);
    if (!dupRow || !keepRow) throw new Error(`Missing product for ${dup} or ${keep}`);

    console.log(`MERGE ${dup} -> ${keep}`);
    if (apply && dupRow.is_active) {
      const { error: e } = await supabase.from("products").update({ is_active: false, updated_at: new Date().toISOString() }).eq("id", dupRow.id);
      if (e) throw new Error(e.message);
    }

    // Price-list prices for the kept product
    const item = priceItems.find((i) => i.slugs.includes(keep));
    if (item) {
      const [a, b, c] = item.prices;
      const custom = { ...((keepRow.customization_options as Record<string, unknown>) || {}) };
      custom.pricing_tiers = [
        { label: "30–99 pcs", currency: "$", unit_price: a, min_quantity: 30, max_quantity: 99 },
        { label: "100–299 pcs", currency: "$", unit_price: b, min_quantity: 100, max_quantity: 299 },
        { label: "300+ pcs", currency: "$", unit_price: c, min_quantity: 300, max_quantity: null },
      ];
      custom.sample_price = item.sample;
      custom.price_unit = item.unit;
      custom.show_pricing = true;
      console.log(`  price ${keep}: $${a} / $${b} / $${c}, sample $${item.sample}, ${item.production}`);
      if (apply) {
        const { error: e } = await supabase
          .from("products")
          .update({ customization_options: custom, moq: 30, lead_time: item.production, updated_at: new Date().toISOString() })
          .eq("id", keepRow.id);
        if (e) throw new Error(e.message);
      }
    }
  }

  // Journal links to the hidden products
  const { data: posts } = await supabase.from("blog_posts").select("id, slug, content");
  for (const p of posts ?? []) {
    let html = String(p.content);
    let hits = 0;
    for (const m of MERGES) {
      const re = new RegExp(`(https://www\\.glovesstorm\\.com)?${m.from.replace(/[/-]/g, "\\$&")}(?![a-z0-9-])`, "g");
      html = html.replace(re, (_x, host) => {
        hits++;
        return (host || "") + m.to;
      });
    }
    if (!hits) continue;
    console.log(`ARTICLE ${p.slug}: ${hits} link(s) updated`);
    if (apply) {
      const { error: e } = await supabase.from("blog_posts").update({ content: html }).eq("id", p.id);
      if (e) throw new Error(e.message);
    }
  }
}

run().catch((e) => { console.error(e); process.exit(1); });
