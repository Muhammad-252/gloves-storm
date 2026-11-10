/**
 * Creates the products from the 2026–27 price list that don't have a page yet.
 * They are saved as hidden drafts (is_active = false) so photos can be added in the
 * admin panel before each one goes live. Prices come from src/lib/data/priceList.ts.
 *
 *   npx tsx scripts/add-price-list-products.ts           -> dry run
 *   npx tsx scripts/add-price-list-products.ts --apply   -> create the drafts
 *
 * Existing slugs are skipped, so the script is safe to run more than once.
 */
import fs from "fs";
import { randomUUID } from "crypto";
import { createClient } from "@supabase/supabase-js";
import { SPORTSWEAR_PRICES, STREETWEAR_PRICES, PriceListItem } from "../src/lib/data/priceList";

const apply = process.argv.includes("--apply");

const env: Record<string, string> = {};
for (const line of fs.readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const i = line.indexOf("=");
  if (i > 0) env[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
}
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

type Draft = {
  slug: string;
  category: "sportswear-teamwear" | "gym-fitness-wear" | "clothing-streetwear";
  name: string;
  short: string;
  description: string;
  features: string[];
  customization: string[];
};

const SUBLIMATION = ["Full sublimation: any colors, any design", "Player names, numbers, crest and sponsors", "Custom woven label and hang tag", "Custom printed poly bag"];
const STREET_BRANDING = ["Embroidery, screen print, DTF or 3D puff", "Chenille or rubber patches", "Custom woven neck label and hang tag", "Custom printed poly bag"];

const DRAFTS: Draft[] = [
  {
    slug: "custom-soccer-jerseys", category: "sportswear-teamwear", name: "Custom Soccer Jerseys",
    short: "Fully sublimated soccer jerseys in 140–160 gsm poly, with names, numbers, crest and sponsors. From 30 pieces.",
    description: "Custom soccer jerseys for clubs, academies and teamwear brands. Every jersey is fully sublimated, so your design, sponsor logos, player names and numbers are dyed into the fabric and won't crack or peel. Choose a 140–160 gsm interlock or mesh polyester, your collar and sleeve style, and mix sizes within a 30-piece order. Need shorts too? See our sublimated soccer kits.",
    features: ["140–160 gsm interlock or mesh polyester", "Fully sublimated: names, numbers, crest and sponsors included", "Crew, V-neck or polo collar options", "Sizes mixed within one style"],
    customization: SUBLIMATION,
  },
  {
    slug: "custom-reversible-basketball-uniforms", category: "sportswear-teamwear", name: "Custom Reversible Basketball Uniforms",
    short: "Double-layer mesh basketball jersey and shorts with two designs in one uniform. From 30 sets.",
    description: "Reversible basketball uniforms give teams home and away colors in a single set. Both sides are made from breathable mesh and fully sublimated, so each side can carry a different design, numbers and team name. Ideal for leagues, camps and training programmes that want two looks without buying two uniforms.",
    features: ["Double-layer mesh jersey and shorts", "Two full designs, one on each side", "Names and numbers on both sides", "Sizes mixed within one style"],
    customization: SUBLIMATION,
  },
  {
    slug: "custom-football-pants", category: "sportswear-teamwear", name: "Custom American Football Pants",
    short: "4-way stretch American football pants with pad pockets, made to match your game jerseys. From 30 pieces.",
    description: "Custom American football pants built for game day and practice. The 4-way stretch fabric moves with players, and internal pockets hold thigh and knee pads in place. Choose your colors, side stripes and logos to match your team's game jerseys.",
    features: ["4-way stretch fabric", "Internal pad pockets", "Custom side stripes and logos", "Belt loops and drawcord options"],
    customization: ["Sublimated or solid colors", "Embroidered or printed logos", "Custom woven label and hang tag"],
  },
  {
    slug: "custom-baseball-pants", category: "sportswear-teamwear", name: "Custom Baseball Pants",
    short: "Poly/spandex baseball pants with belt loops, piping and logos to match your jerseys. From 30 pieces.",
    description: "Custom baseball and softball pants in a stretch poly/spandex blend for a clean fit on the field. Add piping, side stripes and team logos to match your button-front jerseys, and mix sizes within a 30-piece order.",
    features: ["Poly/spandex stretch fabric", "Belt loops", "Piping and side stripe options", "Open or elastic hem"],
    customization: ["Custom colors and piping", "Embroidered or printed logos", "Custom woven label and hang tag"],
  },
  {
    slug: "custom-rugby-shorts", category: "sportswear-teamwear", name: "Custom Rugby Shorts",
    short: "Hard-wearing twill or poly rugby shorts with reinforced seams. From 30 pieces.",
    description: "Custom rugby shorts made to survive scrums and rucks. Reinforced seams and a durable twill or polyester fabric keep them in shape season after season. Add your club crest and colors, and pair them with our heavy-duty rugby jerseys.",
    features: ["Twill or polyester fabric", "Reinforced seams", "Elastic and drawcord waist", "Sizes mixed within one style"],
    customization: ["Custom colors", "Embroidered or printed crest", "Custom woven label and hang tag"],
  },
  {
    slug: "custom-lacrosse-uniforms", category: "sportswear-teamwear", name: "Custom Lacrosse Uniforms",
    short: "Sublimated mesh lacrosse pinnie and shorts sets with names and numbers. From 30 sets.",
    description: "Custom lacrosse uniforms for clubs, schools and leagues. Each set pairs a breathable mesh pinnie with matching shorts, fully sublimated with your design, player names and numbers. Reversible pinnies are available on request.",
    features: ["Mesh polyester pinnie and shorts", "Fully sublimated design", "Names and numbers included", "Sizes mixed within one style"],
    customization: SUBLIMATION,
  },
  {
    slug: "custom-quarter-zip-tops", category: "sportswear-teamwear", name: "Custom Quarter-Zip Warm-Up Tops",
    short: "Brushed poly quarter-zip warm-up tops with an embroidered logo. From 30 pieces.",
    description: "Custom quarter-zip tops for warm-ups, travel and coaching staff. Brushed polyester keeps them soft and warm, and an embroidered crest gives a clean, premium finish. Match them to your team tracksuits or training wear.",
    features: ["Brushed polyester fabric", "Quarter-length zip with chin guard", "Embroidered crest included", "Sizes mixed within one style"],
    customization: ["Custom colors and panels", "Embroidered or printed logos", "Custom woven label and hang tag"],
  },
  {
    slug: "custom-sports-socks", category: "sportswear-teamwear", name: "Custom Sports Socks",
    short: "Custom team socks with a knitted-in logo and cushioned sole. From 30 pairs.",
    description: "Custom sports socks with your logo knitted in, so it never fades or peels. A cushioned sole adds comfort for training and match days. Popular with clubs, academies and brands as a low-cost add-on to kits and merch drops.",
    features: ["Knitted-in logo", "Cushioned sole", "Crew or calf length", "Custom colors"],
    customization: ["Knitted logo and stripes", "Custom colors", "Custom packaging"],
  },
  {
    slug: "custom-sports-bras", category: "gym-fitness-wear", name: "Custom Sports Bras",
    short: "Nylon/spandex sports bras with removable pads, made under your label. From 30 pieces.",
    description: "Private label sports bras for activewear brands and gyms. Made from a soft nylon/spandex blend with removable pads, they pair with our high-waist leggings for matching sets. Choose your colors, straps and logo placement.",
    features: ["Nylon/spandex blend", "Removable pads", "Custom strap styles", "Pairs with matching leggings"],
    customization: ["Custom colors", "Printed, embroidered or heat-transfer logos", "Custom woven label and hang tag", "Custom printed poly bag"],
  },
  {
    slug: "custom-2-in-1-gym-shorts", category: "gym-fitness-wear", name: "Custom 2-in-1 Gym Shorts",
    short: "2-in-1 training shorts with a compression liner and phone pocket. From 30 pieces.",
    description: "Custom 2-in-1 gym shorts combine a lightweight outer short with a compression liner and a phone pocket. A best-seller for fitness brands and gyms selling training merch. Choose your length, colors and logo.",
    features: ["Outer short with compression liner", "Phone pocket", "Custom inseam length", "Elastic waist with drawcord"],
    customization: ["Custom colors", "Printed or heat-transfer logos", "Custom woven label and hang tag"],
  },
  {
    slug: "custom-mma-fight-shorts", category: "gym-fitness-wear", name: "Custom MMA Fight Shorts",
    short: "Sublimated 4-way stretch MMA fight shorts with velcro and drawcord closure. From 30 pieces.",
    description: "Custom MMA fight shorts for gyms, fight teams and combat sports brands. A 4-way stretch fabric allows full movement for kicks and grappling, and full sublimation puts any design on every panel. A velcro and drawcord closure keeps them secure during training and fights.",
    features: ["4-way stretch fabric", "Fully sublimated design", "Velcro and drawcord closure", "Side split for kicks"],
    customization: SUBLIMATION.slice(0, 1).concat(["Custom woven label and hang tag", "Custom printed poly bag"]),
  },
  {
    slug: "custom-boxing-trunks", category: "gym-fitness-wear", name: "Custom Boxing Trunks",
    short: "Satin boxing trunks, embroidered or sublimated with your name and logo. From 30 pieces.",
    description: "Custom boxing trunks in classic satin for fighters, clubs and boxing brands. Add names, flags and logos with embroidery, or go fully sublimated for complex designs. Waistband colors and trims can be matched to robes and team gear.",
    features: ["Satin fabric", "Wide elastic waistband", "Embroidered or sublimated designs", "Contrast trims"],
    customization: ["Embroidered names, flags and logos", "Full sublimation", "Custom waistband colors"],
  },
  {
    slug: "custom-muay-thai-shorts", category: "gym-fitness-wear", name: "Custom Muay Thai Shorts",
    short: "Wide-leg satin Muay Thai shorts with side slits, embroidered or sublimated. From 30 pieces.",
    description: "Custom Muay Thai shorts in the traditional wide-leg satin cut with side slits for full kicking range. Choose embroidered lettering and logos for a classic look, or full sublimation for bold designs. Ideal for gyms, fight teams and martial arts brands.",
    features: ["Satin fabric", "Wide leg with side slits", "Elastic waistband", "Embroidered or sublimated designs"],
    customization: ["Embroidered lettering and logos", "Full sublimation", "Custom colors and trims"],
  },
  {
    slug: "custom-grappling-shorts", category: "gym-fitness-wear", name: "Custom Grappling & Vale Tudo Shorts",
    short: "Sublimated poly/spandex compression fight shorts for BJJ, grappling and vale tudo. From 30 pieces.",
    description: "Custom compression fight shorts for BJJ, no-gi grappling and vale tudo. The poly/spandex fabric fits close to the body with nothing for an opponent to grab, and full sublimation carries your design and rank colors. Pair with our BJJ rash guards for a full no-gi kit.",
    features: ["Poly/spandex compression fabric", "Fully sublimated design", "Flat seams", "Pairs with matching rash guards"],
    customization: SUBLIMATION.slice(0, 1).concat(["Custom woven label and hang tag", "Custom printed poly bag"]),
  },
  {
    slug: "custom-flared-sweatpants", category: "clothing-streetwear", name: "Custom Flared & Stacked Sweatpants",
    short: "400 gsm fleece flared and stacked sweatpants in your own custom cut. From 30 pieces.",
    description: "Custom flared and stacked sweatpants for streetwear brands. Cut from a heavy 400 gsm fleece to your pattern, with the flare, stack length and rise you want. Add embroidery, puff print or patches, and match them to your hoodies for a complete set.",
    features: ["400 gsm cotton fleece", "Custom flare or stacked cut", "Your rise, inseam and fit", "Matches our hoodies and sweatshirts"],
    customization: STREET_BRANDING,
  },
  {
    slug: "custom-fleece-mesh-shorts", category: "clothing-streetwear", name: "Custom Fleece & Mesh Shorts",
    short: "Cotton fleece or poly mesh shorts for streetwear drops. From 30 pieces.",
    description: "Custom shorts for streetwear brands, in a heavy cotton fleece for sweatsuit sets or breathable poly mesh for basketball-style shorts. Choose your length, pockets and branding, and pair them with matching tees or hoodies.",
    features: ["Cotton fleece or poly mesh", "Custom inseam length", "Side and back pocket options", "Elastic waist with drawcord"],
    customization: STREET_BRANDING,
  },
  {
    slug: "custom-baggy-denim-jeans", category: "clothing-streetwear", name: "Custom Baggy Denim Jeans",
    short: "12–14 oz baggy denim jeans with custom washes, made under your label. From 30 pieces.",
    description: "Custom baggy jeans for streetwear and denim brands. Made from 12–14 oz denim in your fit, with washes including rinse, stone, acid and vintage. Add custom hardware, leather patches and embroidery to make them your own.",
    features: ["12–14 oz denim", "Baggy or relaxed fit to your pattern", "Rinse, stone, acid or vintage wash", "Custom rivets, buttons and patches"],
    customization: ["Custom washes", "Embroidery and patches", "Custom hardware and leather patch", "Custom woven label and hang tag"],
  },
  {
    slug: "custom-sweatsuit-sets", category: "clothing-streetwear", name: "Custom Sweatsuit Sets",
    short: "Matching 400 gsm fleece hoodie and sweatpants sets for streetwear brands. From 30 sets.",
    description: "Custom sweatsuit sets with a matching hoodie and sweatpants in 400 gsm fleece. Choose your colorway, fit and branding for a complete drop in one order. Popular with streetwear labels, gyms and creators launching their first collection.",
    features: ["400 gsm cotton fleece", "Matching hoodie and sweatpants", "Your fit and colorway", "Sizes mixed within one style"],
    customization: STREET_BRANDING,
  },
  {
    slug: "custom-puffer-jackets", category: "clothing-streetwear", name: "Custom Puffer Jackets",
    short: "Nylon-shell puffer jackets with poly fill and custom quilting. From 30 pieces.",
    description: "Custom puffer jackets for outerwear and streetwear brands. A nylon shell with polyester fill keeps them warm and light, and the quilting pattern, hood, pockets and trims are all made to your design. Add embroidered or printed logos and custom zip pullers.",
    features: ["Nylon shell", "Polyester fill", "Custom quilting pattern", "Hood, pocket and trim options"],
    customization: ["Embroidered or printed logos", "Custom zip pullers and trims", "Custom woven label and hang tag"],
  },
  {
    slug: "custom-leather-jackets", category: "clothing-streetwear", name: "Custom Leather Jackets",
    short: "Genuine sheep or cow nappa leather jackets, fully lined. From 30 pieces.",
    description: "Custom genuine leather jackets made from soft sheep or cow nappa and fully lined. Choose your style, from biker and bomber to racer and trucker, plus hardware, lining and embossed or embroidered branding.",
    features: ["Genuine sheep or cow nappa leather", "Fully lined", "Biker, bomber, racer or trucker styles", "Custom hardware"],
    customization: ["Embossed or embroidered logos", "Custom lining", "Custom hardware and zips", "Custom woven label and hang tag"],
  },
  {
    slug: "custom-jacquard-knit-sweaters", category: "clothing-streetwear", name: "Custom Jacquard Knit Sweaters",
    short: "Jacquard knit sweaters with your own pattern in acrylic or cotton blend. From 30 pieces.",
    description: "Custom jacquard knit sweaters with your artwork knitted into the fabric. Choose acrylic or a cotton blend, your colors and fit, and create graphic knitwear for streetwear drops and seasonal collections.",
    features: ["Acrylic or cotton blend yarn", "Your pattern knitted in", "Crewneck or cardigan styles", "Custom colors"],
    customization: ["Knitted-in artwork", "Embroidered logos", "Custom woven label and hang tag"],
  },
  {
    slug: "custom-embroidered-caps", category: "clothing-streetwear", name: "Custom Embroidered Caps",
    short: "Cotton twill 6-panel or 5-panel caps with your embroidered logo. From 30 pieces.",
    description: "Custom embroidered caps in cotton twill, available in 6-panel and 5-panel styles. Add flat or 3D puff embroidery, custom straps and inside branding to round out a merch drop or team kit.",
    features: ["Cotton twill", "6-panel or 5-panel", "Flat or 3D puff embroidery", "Custom strap and closure"],
    customization: ["Flat or 3D puff embroidery", "Custom colors", "Printed inner taping and labels"],
  },
  {
    slug: "custom-beanies", category: "clothing-streetwear", name: "Custom Beanies",
    short: "Acrylic knit beanies with a woven or embroidered logo. From 30 pieces.",
    description: "Custom knit beanies in soft acrylic, with your logo on a woven label or embroidered directly on the cuff. A simple, high-margin add-on for streetwear brands, clubs and winter merch.",
    features: ["Acrylic knit", "Cuffed or uncuffed", "Woven label or embroidered logo", "Custom colors"],
    customization: ["Woven label", "Embroidery", "Custom colors"],
  },
];

async function run() {
  const items = new Map<string, PriceListItem>();
  for (const group of [...SPORTSWEAR_PRICES, ...STREETWEAR_PRICES]) {
    for (const item of group.items) for (const slug of item.slugs) items.set(slug, item);
  }

  const { data: categories, error: catErr } = await supabase.from("categories").select("id, slug");
  if (catErr || !categories) throw new Error(catErr?.message || "No categories");
  const { data: existing, error: prodErr } = await supabase.from("products").select("slug");
  if (prodErr || !existing) throw new Error(prodErr?.message || "No products");
  const existingSlugs = new Set(existing.map((p) => p.slug));

  let created = 0;
  for (const d of DRAFTS) {
    if (existingSlugs.has(d.slug)) {
      console.log(`SKIP   ${d.slug} (already exists)`);
      continue;
    }
    const item = items.get(d.slug);
    const categoryId = categories.find((c) => c.slug === d.category)?.id;
    if (!item || !categoryId) {
      console.log(`ERROR  ${d.slug}: missing price list item or category`);
      continue;
    }
    const [a, b, c] = item.prices;
    const now = new Date().toISOString();
    const record = {
      id: randomUUID(),
      name: d.name,
      slug: d.slug,
      category_id: categoryId,
      short_description: d.short,
      description: d.description,
      materials: [item.spec],
      features: d.features,
      customization_options: {
        list: d.customization,
        pricing_tiers: [
          { label: "30–99 pcs", currency: "$", unit_price: a, min_quantity: 30, max_quantity: 99 },
          { label: "100–299 pcs", currency: "$", unit_price: b, min_quantity: 100, max_quantity: 299 },
          { label: "300+ pcs", currency: "$", unit_price: c, min_quantity: 300, max_quantity: null },
        ],
        sample_price: item.sample,
        price_unit: item.unit,
        show_pricing: true,
      },
      moq: 30,
      lead_time: item.production,
      featured: false,
      is_active: false,
      seo_title: null,
      seo_description: null,
      created_at: now,
      updated_at: now,
    };
    console.log(`DRAFT  ${d.slug} (${d.category}): $${a} / $${b} / $${c} per ${item.unit}`);
    created++;
    if (apply) {
      const { error } = await supabase.from("products").insert(record);
      if (error) console.error(`  ❌ ${d.slug}: ${error.message}`);
    }
  }
  console.log(`\n${created} drafts ${apply ? "created (hidden until activated in admin)" : "would be created"}.`);
  if (!apply) console.log("Dry run only. Re-run with --apply to write.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
