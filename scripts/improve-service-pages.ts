/**
 * Rewrites the OEM and private label sportswear product pages so each has its own focus
 * (they used identical template text), and sets their images.
 *
 *   npx tsx scripts/improve-service-pages.ts           -> dry run
 *   npx tsx scripts/improve-service-pages.ts --apply   -> write
 *
 * Run --apply only after public/images/products/guides/ is deployed.
 * The longer buying-guide sections and FAQs live in src/lib/data/productGuides.ts.
 */
import fs from "fs";
import { randomUUID } from "crypto";
import { createClient } from "@supabase/supabase-js";

const apply = process.argv.includes("--apply");
const env: Record<string, string> = {};
for (const line of fs.readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const i = line.indexOf("=");
  if (i > 0) env[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
}
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const PAGES = [
  {
    slug: "oem-sportswear-manufacturing",
    seo_title: "OEM Sportswear Manufacturer in Pakistan",
    seo_description:
      "OEM sportswear manufacturer in Sialkot. We make your designs to your tech pack from 30 pieces per style, with samples in 5–7 days and DDP shipping.",
    short_description:
      "We manufacture sportswear to your design and tech pack: patterns, size grading, fabric and color matching, sampling and bulk production from 30 pieces per style.",
    description:
      "Gloves Storm makes sportswear to your design in our factory in Sialkot, Pakistan. Send a tech pack, a sample garment or a sketch with reference photos, and we handle the pattern, size grading, fabric, color matching, sampling and bulk production, all under your brand.\n\nOEM production suits sportswear and teamwear brands, fight-wear labels and clubs that already know what they want to sell. Sublimated uniforms, compression wear, fight shorts, gym wear and tracksuits are all made in-house, with a minimum of 30 pieces per style and sizes mixed within each order.",
    materials: [
      "Sublimation polyester and mesh, 140–220 gsm",
      "Poly/spandex 4-way stretch",
      "Nylon/spandex for leggings and sports bras",
      "Cotton fleece and French terry",
    ],
    features: [
      "Made to your tech pack, sample or sketch",
      "Pattern making and size grading",
      "Sample made in 5–7 days",
      "MOQ 30 pieces per style, sizes mixed",
      "Full sublimation included on sportswear",
      "Bulk production in 2–4 weeks after approval",
    ],
    customization: [
      "Your own design and pattern",
      "Fabric and color matching",
      "Logo by sublimation, print or embroidery",
      "Custom woven labels and hang tags",
      "Custom packaging",
    ],
    lead_time: "2–4 weeks",
    // Keep the uploaded photos and add the two diagrams after them
    replaceImages: false,
    altForExisting: "Custom women's activewear set, zip jacket, sports bra and leggings, made to a brand's specification",
    newImages: [
      { url: "/images/products/guides/oem-sportswear-process.webp", alt: "OEM sportswear process from tech pack and sample to bulk production and delivery" },
      { url: "/images/products/guides/oem-sportswear-range.webp", alt: "Sportswear Gloves Storm manufactures with starting prices: soccer kits, basketball, compression, fight shorts, leggings and training tees" },
    ],
  },
  {
    slug: "private-label-sportswear-manufacturing",
    seo_title: "Private Label Sportswear Manufacturer",
    seo_description:
      "Private label sportswear from our proven styles with your logo, labels and packaging. MOQ 30 per style, samples in 5–7 days, shipped to the USA, UK and EU.",
    short_description:
      "Choose from our proven sportswear styles and we make them in your colors with your logo, woven labels, hang tags and packaging. From 30 pieces per style.",
    description:
      "Private label sportswear lets you launch your own brand without developing every pattern from scratch. Pick styles we already make, such as compression tops, rash guards, training shorts, leggings and fight shorts, then choose your colors and fabric weight and add your logo, labels and packaging.\n\nBecause the fit and construction are already tested, sampling is faster and your first order carries less risk. The minimum is 30 pieces per style with sizes mixed, samples are ready in 5–7 days, and bulk production takes 2–4 weeks.",
    materials: [
      "Poly/spandex 4-way stretch",
      "Nylon/spandex for leggings",
      "Sublimation polyester and mesh",
      "Moisture-wicking performance fabrics",
    ],
    features: [
      "Proven styles with tested fit",
      "Your logo, labels, tags and packaging",
      "Your colors or all-over sublimation",
      "MOQ 30 pieces per style, sizes mixed",
      "Sample made in 5–7 days",
      "Bulk production in 2–4 weeks after approval",
    ],
    customization: [
      "Logo by sublimation, print or embroidery",
      "Custom woven neck labels",
      "Hang tags with your brand or barcode",
      "Custom printed polybags",
      "Your colors and fabric weight",
    ],
    lead_time: "2–4 weeks",
    // The old images were generic stock photos used elsewhere on the site
    replaceImages: true,
    altForExisting: "",
    newImages: [
      { url: "/images/products/guides/private-label-branding.webp", alt: "Private label sportswear branding: your logo, woven neck label, hang tag and printed polybag" },
      { url: "/images/products/guides/private-label-process.webp", alt: "Private label sportswear in five steps from choosing styles to bulk delivery" },
    ],
  },
];

async function run() {
  console.log(apply ? "APPLYING\n" : "DRY RUN (add --apply to write)\n");
  for (const p of PAGES) {
    for (const img of p.newImages) {
      if (!fs.existsSync(`public${img.url}`)) throw new Error(`Missing ${img.url}`);
    }
    const { data: prod, error } = await supabase
      .from("products")
      .select("id, customization_options, images:product_images(id, image_url, sort_order)")
      .eq("slug", p.slug)
      .single();
    if (error || !prod) throw new Error(error?.message || `No product ${p.slug}`);

    const custom = { ...((prod.customization_options as Record<string, unknown>) || {}) };
    custom.list = p.customization;
    custom.show_pricing = false; // priced per design; old placeholder tiers removed
    delete custom.pricing_tiers;
    delete custom.sample_price;

    const existing = [...(prod.images as { id: string; image_url: string; sort_order: number }[])].sort((a, b) => a.sort_order - b.sort_order);
    console.log(`${p.slug}\n  title: ${p.seo_title} (${p.seo_title.length})\n  meta:  ${p.seo_description.length} chars`);
    console.log(`  images: ${p.replaceImages ? `replace ${existing.length} with` : `keep ${existing.length}, add`} ${p.newImages.length}`);
    if (!apply) continue;

    const { error: upErr } = await supabase
      .from("products")
      .update({
        seo_title: p.seo_title,
        seo_description: p.seo_description,
        short_description: p.short_description,
        description: p.description,
        materials: p.materials,
        features: p.features,
        customization_options: custom,
        lead_time: p.lead_time,
        moq: 30,
        updated_at: new Date().toISOString(),
      })
      .eq("id", prod.id);
    if (upErr) throw new Error(upErr.message);

    let next = 1;
    if (p.replaceImages) {
      if (existing.length) {
        const { error: e } = await supabase.from("product_images").delete().in("id", existing.map((i) => i.id));
        if (e) throw new Error(e.message);
      }
    } else {
      for (const img of existing) {
        const { error: e } = await supabase.from("product_images").update({ alt_text: p.altForExisting, sort_order: next }).eq("id", img.id);
        if (e) throw new Error(e.message);
        next++;
      }
    }
    const already = new Set(p.replaceImages ? [] : existing.map((i) => i.image_url));
    const rows = p.newImages
      .filter((img) => !already.has(img.url))
      .map((img) => ({
        id: randomUUID(),
        product_id: prod.id,
        image_url: img.url,
        alt_text: img.alt,
        sort_order: next++,
        is_primary: p.replaceImages && next === 2,
        created_at: new Date().toISOString(),
      }));
    if (rows.length) {
      const { error: e } = await supabase.from("product_images").insert(rows);
      if (e) throw new Error(e.message);
    }
    console.log("  done");
  }
}

run().catch((e) => { console.error(e); process.exit(1); });
