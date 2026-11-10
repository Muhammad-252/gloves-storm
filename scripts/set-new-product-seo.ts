/**
 * Fills the admin SEO fields (meta title, meta description, primary keyword,
 * secondary keywords) for the 23 products added from the 2026–27 price list.
 *
 *   npx tsx scripts/set-new-product-seo.ts           -> dry run with length checks
 *   npx tsx scripts/set-new-product-seo.ts --apply   -> write
 *
 * Titles follow the admin convention "<phrase> | Gloves Storm" and stay within 60 characters;
 * descriptions stay within 120–160 characters.
 */
import fs from "fs";
import { createClient } from "@supabase/supabase-js";

const apply = process.argv.includes("--apply");

const env: Record<string, string> = {};
for (const line of fs.readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const i = line.indexOf("=");
  if (i > 0) env[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
}
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

type Seo = { title: string; description: string; primary: string; secondary: string };

const SEO: Record<string, Seo> = {
  "custom-soccer-jerseys": {
    title: "Custom Soccer Jersey Manufacturer",
    description: "Custom soccer jerseys, fully sublimated in 140–160 gsm poly with names, numbers and crests. From $13 at 30 pcs, $60 all-in sample, 2–3 weeks production.",
    primary: "custom soccer jerseys",
    secondary: "sublimated soccer jerseys, custom football jerseys, team soccer jersey manufacturer, private label soccer jerseys",
  },
  "custom-reversible-basketball-uniforms": {
    title: "Custom Reversible Basketball Uniforms",
    description: "Reversible basketball uniforms in double-layer mesh with two full designs, names and numbers. From $33 per set at 30 sets, made in Sialkot in 3 weeks.",
    primary: "reversible basketball uniforms",
    secondary: "custom reversible basketball jerseys, reversible basketball practice uniforms, sublimated basketball uniforms",
  },
  "custom-football-pants": {
    title: "Custom American Football Pants Manufacturer",
    description: "Custom American football pants in 4-way stretch with pad pockets, team stripes and logos. From $29 at 30 pcs, $70 all-in sample, 3 weeks production.",
    primary: "custom football pants",
    secondary: "custom football practice pants, American football game pants, team football pants manufacturer",
  },
  "custom-baseball-pants": {
    title: "Custom Baseball Pants Manufacturer",
    description: "Custom baseball and softball pants in poly/spandex with belt loops, piping and team logos. From $19 at 30 pcs, $60 all-in sample, 2–3 weeks production.",
    primary: "custom baseball pants",
    secondary: "custom softball pants, team baseball pants, baseball uniform pants manufacturer",
  },
  "custom-rugby-shorts": {
    title: "Custom Rugby Shorts Manufacturer",
    description: "Custom rugby shorts in hard-wearing twill or poly with reinforced seams and your club crest. From $11 at 30 pcs, made in Sialkot in 2–3 weeks.",
    primary: "custom rugby shorts",
    secondary: "rugby team shorts, custom rugby kit, rugby shorts manufacturer, club rugby shorts",
  },
  "custom-lacrosse-uniforms": {
    title: "Custom Lacrosse Uniforms Manufacturer",
    description: "Custom lacrosse uniforms: sublimated mesh pinnies and shorts with names and numbers. From $23 per set at 30 sets, $80 all-in sample, 2–3 weeks.",
    primary: "custom lacrosse uniforms",
    secondary: "custom lacrosse pinnies, lacrosse shorts, sublimated lacrosse uniforms, team lacrosse jerseys",
  },
  "custom-quarter-zip-tops": {
    title: "Custom Quarter-Zip Warm-Up Tops",
    description: "Custom quarter-zip warm-up tops in brushed poly with an embroidered crest for teams and coaches. From $23 at 30 pcs, $70 all-in sample, 3 weeks.",
    primary: "custom quarter zip",
    secondary: "custom quarter zip pullover, team warm up tops, embroidered quarter zip, coaches quarter zip",
  },
  "custom-sports-socks": {
    title: "Custom Sports Socks Manufacturer",
    description: "Custom sports socks with your logo knitted in and a cushioned sole, for clubs and brands. From $4.50 a pair at 30 pairs, made in Sialkot in 3 weeks.",
    primary: "custom sports socks",
    secondary: "custom team socks, custom logo socks, knitted logo socks, custom athletic socks",
  },
  "custom-sports-bras": {
    title: "Private Label Sports Bra Manufacturer",
    description: "Private label sports bras in nylon/spandex with removable pads and your logo. From $13 at 30 pcs, $60 all-in sample, 3 weeks production in Sialkot.",
    primary: "sports bra manufacturer",
    secondary: "custom sports bras, private label sports bras, activewear sports bra manufacturer, custom logo sports bra",
  },
  "custom-2-in-1-gym-shorts": {
    title: "Custom 2-in-1 Gym Shorts Manufacturer",
    description: "Custom 2-in-1 gym shorts with a compression liner and phone pocket, under your label. From $15 at 30 pcs, $60 all-in sample, 3 weeks production.",
    primary: "custom 2 in 1 gym shorts",
    secondary: "2 in 1 training shorts, gym shorts with liner, private label gym shorts, custom running shorts",
  },
  "custom-mma-fight-shorts": {
    title: "Custom MMA Fight Shorts Manufacturer",
    description: "Custom MMA fight shorts in 4-way stretch, fully sublimated, with velcro and drawcord closure. From $17 at 30 pcs, $65 all-in sample, 3 weeks.",
    primary: "custom MMA shorts",
    secondary: "custom fight shorts, sublimated MMA shorts, private label MMA shorts, MMA shorts manufacturer",
  },
  "custom-boxing-trunks": {
    title: "Custom Boxing Trunks Manufacturer",
    description: "Custom satin boxing trunks with embroidered or sublimated names, flags and logos. From $19 at 30 pcs, $65 all-in sample, made in Sialkot in 3 weeks.",
    primary: "custom boxing trunks",
    secondary: "custom boxing shorts, satin boxing trunks, personalized boxing trunks, boxing trunks manufacturer",
  },
  "custom-muay-thai-shorts": {
    title: "Custom Muay Thai Shorts Manufacturer",
    description: "Custom Muay Thai shorts in wide-leg satin with side slits, embroidered or sublimated. From $19 at 30 pcs, $65 all-in sample, 3 weeks production.",
    primary: "custom muay thai shorts",
    secondary: "custom thai boxing shorts, satin muay thai shorts, kickboxing shorts manufacturer, gym muay thai shorts",
  },
  "custom-grappling-shorts": {
    title: "Custom BJJ & Grappling Shorts Manufacturer",
    description: "Custom BJJ and vale tudo compression shorts in sublimated poly/spandex for no-gi grappling. From $13 at 30 pcs, $60 all-in sample, 3 weeks.",
    primary: "custom grappling shorts",
    secondary: "custom vale tudo shorts, BJJ compression shorts, no gi shorts, custom BJJ spats",
  },
  "custom-flared-sweatpants": {
    title: "Custom Flared Sweatpants Manufacturer",
    description: "Custom flared and stacked sweatpants in 400 gsm fleece, cut to your pattern. From $30 at 30 pcs, $75 all-in sample, 3–4 weeks production in Sialkot.",
    primary: "custom flared sweatpants",
    secondary: "stacked sweatpants manufacturer, custom flare sweatpants, private label sweatpants, 400 gsm sweatpants",
  },
  "custom-fleece-mesh-shorts": {
    title: "Custom Fleece & Mesh Shorts Manufacturer",
    description: "Custom heavyweight fleece and poly mesh shorts for streetwear brands, with your branding. From $18.50 at 30 pcs, $60 all-in sample, 3 weeks.",
    primary: "custom fleece shorts",
    secondary: "custom mesh shorts, heavyweight sweat shorts, private label shorts, streetwear shorts manufacturer",
  },
  "custom-baggy-denim-jeans": {
    title: "Custom Baggy Jeans Manufacturer",
    description: "Custom baggy jeans in 12–14 oz denim with rinse, stone, acid or vintage washes. From $38 at 30 pcs, $80 all-in sample, 4–5 weeks production.",
    primary: "custom baggy jeans",
    secondary: "custom denim manufacturer, private label jeans, baggy denim jeans manufacturer, custom washed jeans",
  },
  "custom-sweatsuit-sets": {
    title: "Custom Sweatsuit Set Manufacturer",
    description: "Custom sweatsuit sets: matching 400 gsm fleece hoodie and sweatpants under your label. From $58 per set at 30 sets, $100 all-in sample, 4 weeks.",
    primary: "custom sweatsuit",
    secondary: "custom sweatsuit set, matching hoodie and sweatpants set, private label tracksuit, heavyweight sweatsuit",
  },
  "custom-puffer-jackets": {
    title: "Custom Puffer Jacket Manufacturer",
    description: "Custom puffer jackets with nylon shell, poly fill and your own quilting, hood and trims. From $64 at 30 pcs, $120 all-in sample, 4–6 weeks.",
    primary: "custom puffer jacket",
    secondary: "puffer jacket manufacturer, private label puffer jackets, custom down jacket, streetwear puffer",
  },
  "custom-leather-jackets": {
    title: "Custom Leather Jacket Manufacturer",
    description: "Custom genuine leather jackets in sheep or cow nappa, fully lined, in biker, bomber or racer styles. From $100 at 30 pcs, $160 all-in sample.",
    primary: "custom leather jacket",
    secondary: "leather jacket manufacturer, private label leather jackets, custom biker jacket, genuine leather jacket factory",
  },
  "custom-jacquard-knit-sweaters": {
    title: "Custom Jacquard Knit Sweater Manufacturer",
    description: "Custom jacquard knit sweaters with your pattern knitted in, in acrylic or cotton blend. From $32 at 30 pcs, $80 all-in sample, 4–5 weeks production.",
    primary: "custom knit sweater",
    secondary: "jacquard sweater manufacturer, custom knitwear, private label sweaters, graphic knit sweater",
  },
  "custom-embroidered-caps": {
    title: "Custom Embroidered Caps Manufacturer",
    description: "Custom embroidered caps in cotton twill, 6-panel or 5-panel, with flat or 3D puff embroidery. From $11 at 30 pcs, $50 all-in sample, 3 weeks.",
    primary: "custom embroidered caps",
    secondary: "custom hats, 3D puff embroidered caps, custom dad hats, private label caps",
  },
  "custom-beanies": {
    title: "Custom Beanie Manufacturer",
    description: "Custom knit beanies in soft acrylic with a woven label or embroidered logo, in your colors. From $9 at 30 pcs, $50 all-in sample, 3 weeks production.",
    primary: "custom beanies",
    secondary: "custom knit beanies, embroidered beanies, beanie with woven label, private label beanies",
  },
};

async function run() {
  let problems = 0;
  for (const [slug, seo] of Object.entries(SEO)) {
    const fullTitle = `${seo.title} | Gloves Storm`;
    const issues: string[] = [];
    if (fullTitle.length > 60) issues.push(`title ${fullTitle.length} chars`);
    if (seo.description.length < 120 || seo.description.length > 160) issues.push(`description ${seo.description.length} chars`);
    if (issues.length) problems++;
    console.log(`${issues.length ? "FIX " : "OK  "} ${slug}: title ${fullTitle.length}, desc ${seo.description.length}${issues.length ? "  <-- " + issues.join(", ") : ""}`);
  }
  if (problems) {
    console.log(`\n${problems} entries need fixing before applying.`);
    process.exit(1);
  }
  if (!apply) {
    console.log("\nAll lengths OK. Dry run only. Re-run with --apply to write.");
    return;
  }

  const { data: products, error } = await supabase
    .from("products")
    .select("id, slug, customization_options")
    .in("slug", Object.keys(SEO));
  if (error || !products) throw new Error(error?.message || "No products");

  for (const p of products) {
    const seo = SEO[p.slug];
    const custom = { ...((p.customization_options as Record<string, unknown>) || {}) };
    custom.primary_keyword = seo.primary;
    custom.secondary_keywords = seo.secondary;
    const { error: upErr } = await supabase
      .from("products")
      .update({
        seo_title: `${seo.title} | Gloves Storm`,
        seo_description: seo.description,
        customization_options: custom,
        updated_at: new Date().toISOString(),
      })
      .eq("id", p.id);
    console.log(upErr ? `❌ ${p.slug}: ${upErr.message}` : `✅ ${p.slug}`);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
