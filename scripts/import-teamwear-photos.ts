/**
 * Imports the watermarked teamwear photos from content-inbox/ready/ into Supabase.
 *
 *   npx tsx scripts/import-teamwear-photos.ts           -> dry run (prints the plan)
 *   npx tsx scripts/import-teamwear-photos.ts --apply   -> upload and write
 *
 * - Existing products: new photos are added in front of the current ones, so the
 *   first new photo becomes the main image. Generated mockups are removed from a
 *   product once it has real photos; other existing photos are kept.
 * - New products (flag football, wrestling singlets, team bags) are created active.
 * - Safe to re-run: photos already attached (same file name) are skipped.
 */
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { createClient } from "@supabase/supabase-js";

const apply = process.argv.includes("--apply");
const READY = path.join("content-inbox", "ready");

const env: Record<string, string> = {};
for (const line of fs.readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const i = line.indexOf("=");
  if (i > 0) env[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
}
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

type Photo = { file: string; alt: string };
const p = (folder: string, base: string, n: number, alt: string): Photo => ({
  file: `${folder}/${base}-${String(n).padStart(2, "0")}.jpg`,
  alt,
});

// ---------------------------------------------------------------------------
// Photos for products that already exist
// ---------------------------------------------------------------------------
const SOC = (n: number, alt: string) => p("soccer", "custom-sublimated-soccer-uniform", n, alt);
const BB = (n: number, alt: string) => p("baseball", "custom-sublimated-baseball-uniform", n, alt);
const AF = (n: number, alt: string) => p("american-football", "custom-sublimated-american-football-uniform", n, alt);
const BK = (n: number, alt: string) => p("basketball", "custom-sublimated-basketball-uniform", n, alt);

const EXISTING: Record<string, Photo[]> = {
  "custom-soccer-kits": [
    SOC(9, "Custom sublimated soccer kit, sky blue jersey and shorts with team crest"),
    SOC(7, "Red and black sublimated soccer jersey and shorts with player name and number"),
    SOC(8, "Black and blue sublimated soccer uniform with custom name and number"),
    SOC(3, "Youth sublimated soccer kit, black and red jersey and shorts"),
    SOC(2, "Grey sublimated soccer kit with wolf crest, jersey and shorts"),
    SOC(5, "Black and pink sublimated soccer uniform for a women's team"),
  ],
  "custom-soccer-jerseys": [
    SOC(4, "Custom soccer jersey with sublimated blue stripes and matching shorts"),
    SOC(1, "Full team order of custom soccer jerseys, shorts and socks, packed in individual polybags"),
    SOC(10, "Team set of numbered soccer jerseys packed and ready to ship"),
    SOC(6, "Sublimated soccer jersey with matching shorts and socks"),
  ],
  "custom-baseball-uniforms": [
    BB(3, "Custom red baseball jersey with script team name and matching pants"),
    BB(2, "Pinstripe button-front baseball jersey and pants, custom team uniform"),
    BB(8, "Sublimated pinstripe baseball uniform with contrast sleeves"),
    BB(4, "Navy baseball jersey with orange piping and matching pants"),
    BB(6, "Digital camo sublimated baseball jersey with white pants"),
    BB(1, "Grey baseball uniform with gold piping, jersey and pants"),
  ],
  "custom-baseball-pants": [
    BB(7, "Custom maroon baseball pants with matching team jersey"),
    BB(5, "Gold baseball pants with black piping and matching jersey"),
  ],
  "custom-american-football-uniforms": [
    AF(4, "Custom American football uniform, charcoal jersey and camo-panel pants"),
    AF(3, "Black sublimated American football jersey and pants with neon green design"),
    AF(2, "Red sublimated American football jersey with matching arm sleeve"),
    AF(5, "White American football jersey with player name and padded pants"),
    AF(1, "Maroon American football jersey with digital camo pants"),
  ],
  "custom-football-pants": [
    AF(6, "Custom American football pants with sublimated splatter print and matching jersey"),
    AF(7, "Grey American football pants with side stripes and matching jersey"),
  ],
  "custom-basketball-uniforms": [
    BK(5, "Custom sublimated basketball jersey and shorts, black and red wolf design"),
    BK(2, "Navy and red basketball uniform with player number"),
    BK(4, "Sublimated basketball uniform with crackle print and fade shorts"),
    BK(3, "Matching basketball jersey, shorts and shooting hoodie for a team"),
    BK(1, "Neon basketball uniform with matching team backpack"),
    BK(6, "Camo basketball jerseys and flame shorts with matching duffle bag"),
  ],
};

// ---------------------------------------------------------------------------
// New products
// ---------------------------------------------------------------------------
type NewProduct = {
  slug: string;
  name: string;
  short_description: string;
  description: string;
  materials: string[];
  features: string[];
  customization: string[];
  primary_keyword: string;
  secondary_keywords: string;
  lead_time: string;
  seo_title: string;
  seo_description: string;
  photos: Photo[];
};

const FF = (n: number, alt: string) => p("flag-football", "custom-sublimated-flag-football-uniform", n, alt);
const BP = (n: number, alt: string) => p("backpacks", "custom-sublimated-team-backpack", n, alt);

const NEW_PRODUCTS: NewProduct[] = [
  {
    slug: "custom-flag-football-uniforms",
    name: "Custom Flag Football & 7v7 Uniforms",
    short_description:
      "Sublimated sleeveless hooded jerseys and compression shorts for flag football and 7v7 teams. From 30 sets.",
    description:
      "Custom flag football and 7v7 uniforms, made in Sialkot for teams, leagues and academies. Each set pairs a sleeveless hooded jersey with matching shorts, fully sublimated so your colours, mascot, names and numbers run edge to edge and never crack or peel. Lightweight moisture-wicking polyester keeps players cool, and four-way stretch shorts move with every cut and sprint. Send your logo or a rough idea and our designers prepare a mock-up before sampling.",
    materials: ["Moisture-wicking polyester interlock", "4-way stretch poly/spandex shorts"],
    features: [
      "Sleeveless hooded jersey with sublimated hood lining",
      "Full-colour sublimation, no limit on colours",
      "Names and numbers included",
      "Compression or loose-fit shorts to match",
      "Youth and adult sizes",
    ],
    customization: [
      "Your own design, colours and mascot",
      "Player names and numbers",
      "Woven neck label and hang tag",
      "Matching backpacks and duffle bags",
    ],
    primary_keyword: "custom flag football uniforms",
    secondary_keywords:
      "7v7 uniforms, flag football jerseys, sublimated 7v7 jerseys, hooded 7v7 jersey, custom flag football jerseys",
    lead_time: "2–3 weeks",
    seo_title: "Custom Flag Football & 7v7 Uniforms Manufacturer | Gloves Storm",
    seo_description:
      "Custom sublimated flag football and 7v7 uniforms: hooded jerseys and shorts with names and numbers. MOQ 30 sets, samples in 5–7 days, worldwide shipping.",
    photos: [
      FF(3, "Black and yellow bulldog flag football uniforms, hooded jerseys and shorts"),
      FF(2, "Purple and black sublimated 7v7 hooded jersey and shorts with player number"),
      FF(1, "Green and yellow sublimated flag football hooded jersey with mascot design"),
      FF(5, "Navy and gold sublimated 7v7 hooded jersey and shorts"),
      FF(4, "Green bulldog flag football hooded jersey with compression shorts"),
      FF(6, "Red and white sublimated 7v7 uniforms with splatter design"),
    ],
  },
  {
    slug: "custom-wrestling-singlets",
    name: "Custom Sublimated Wrestling Singlets",
    short_description:
      "Fully sublimated wrestling singlets in 4-way stretch fabric, made to your design. From 30 pieces.",
    description:
      "Custom wrestling singlets for clubs, schools and wrestling brands. We sublimate your design across the whole singlet, so colours stay sharp after every match and wash. The 4-way stretch fabric holds its shape on the mat, with a high-cut or standard cut and flatlock seams that won't rub. Youth and adult sizes can be mixed in one order.",
    materials: ["4-way stretch polyester/spandex"],
    features: [
      "Full-colour sublimation, front and back",
      "High-cut or standard cut",
      "Flatlock seams",
      "Youth and adult sizes in one order",
    ],
    customization: [
      "Your own design, colours and team name",
      "Club logo and sponsor logos",
      "Woven label and hang tag",
    ],
    primary_keyword: "custom wrestling singlets",
    secondary_keywords:
      "sublimated wrestling singlets, wrestling singlet manufacturer, youth wrestling singlets, custom singlets",
    lead_time: "2–3 weeks",
    seo_title: "Custom Sublimated Wrestling Singlets Manufacturer | Gloves Storm",
    seo_description:
      "Custom sublimated wrestling singlets in 4-way stretch fabric for clubs and brands. MOQ 30 pieces, youth and adult sizes, samples in 5–7 days.",
    photos: [
      p("wrestling-singlets", "custom-sublimated-wrestling-singlet", 1, "Black and red sublimated youth wrestling singlet with custom team logo"),
    ],
  },
  {
    slug: "custom-team-backpacks-and-duffle-bags",
    name: "Custom Team Backpacks & Duffle Bags",
    short_description:
      "Sublimated team backpacks and duffle bags with player names and numbers, made to match your uniforms. From 30 pieces.",
    description:
      "Custom team backpacks and duffle bags, designed to match your uniforms. We sublimate your team colours, logo, player name and number onto durable polyester, with padded straps, a ventilated shoe or gear compartment and side bottle pockets. A popular add-on for basketball, baseball, football and soccer teams ordering full kits.",
    materials: ["Durable 600D polyester", "Sublimation-printed panels"],
    features: [
      "Player name and number on every bag",
      "Padded shoulder straps",
      "Separate shoe or gear compartment",
      "Side bottle pockets",
      "Matching duffle bags available",
    ],
    customization: [
      "Your team design and colours",
      "Player names and numbers",
      "Match the design of your uniforms",
    ],
    primary_keyword: "custom team backpacks",
    secondary_keywords:
      "sublimated team backpacks, custom sports backpacks with name and number, custom team duffle bags, basketball backpacks",
    lead_time: "3 weeks",
    seo_title: "Custom Team Backpacks & Duffle Bags Manufacturer | Gloves Storm",
    seo_description:
      "Custom sublimated team backpacks and duffle bags with player names and numbers, made to match your uniforms. MOQ 30 pieces, worldwide shipping.",
    photos: [
      BP(3, "Custom sublimated basketball team backpack with player name and number"),
      BP(1, "Custom team backpack for a high school football team"),
      BP(2, "Black custom basketball backpack with team logo"),
      BP(4, "Girls basketball team backpacks with name and number, front and back"),
      BP(5, "White and black custom athletic backpack with name and number"),
      p("duffle-bags", "custom-sublimated-sports-duffle-bag", 1, "Red and black sublimated sports duffle bag with player number"),
    ],
  },
];

// ---------------------------------------------------------------------------

async function uploadPhoto(file: string): Promise<string> {
  const storagePath = `teamwear/${path.basename(file)}`;
  const { data: pub } = supabase.storage.from("products").getPublicUrl(storagePath);
  if (!apply) return pub.publicUrl;
  const body = fs.readFileSync(path.join(READY, file));
  const { error } = await supabase.storage
    .from("products")
    .upload(storagePath, body, { contentType: "image/jpeg", upsert: true, cacheControl: "31536000" });
  if (error) throw new Error(`Upload failed for ${file}: ${error.message}`);
  return pub.publicUrl;
}

async function attachPhotos(product: { id: string; name: string; images: { id: string; image_url: string; sort_order: number }[] }, photos: Photo[]) {
  const existing = product.images ?? [];
  const already = new Set(existing.map((i) => path.basename(i.image_url)));
  const todo = photos.filter((ph) => !already.has(path.basename(ph.file)));
  const mockups = existing.filter((i) => i.image_url.includes("/mockups/"));
  const kept = existing.filter((i) => !i.image_url.includes("/mockups/"));

  console.log(`  + ${todo.length} new photo(s)${mockups.length ? `, - ${mockups.length} mockup(s) removed` : ""}, ${kept.length} existing photo(s) kept`);
  for (const ph of todo) console.log(`      ${ph.file}  "${ph.alt}"`);
  if (!apply || todo.length === 0) return;

  const rows = [];
  for (const [i, ph] of todo.entries()) {
    rows.push({
      id: randomUUID(),
      product_id: product.id,
      image_url: await uploadPhoto(ph.file),
      alt_text: ph.alt,
      sort_order: i + 1,
      is_primary: i === 0,
      created_at: new Date().toISOString(),
    });
  }
  const { error: insErr } = await supabase.from("product_images").insert(rows);
  if (insErr) throw new Error(`Insert failed for ${product.name}: ${insErr.message}`);

  // Push the existing photos behind the new ones
  for (const [i, img] of kept.sort((a, b) => a.sort_order - b.sort_order).entries()) {
    const { error } = await supabase
      .from("product_images")
      .update({ sort_order: todo.length + i + 1, is_primary: false })
      .eq("id", img.id);
    if (error) throw new Error(`Reorder failed for ${product.name}: ${error.message}`);
  }
  if (mockups.length) {
    const { error } = await supabase.from("product_images").delete().in("id", mockups.map((m) => m.id));
    if (error) throw new Error(`Mockup removal failed for ${product.name}: ${error.message}`);
  }
}

async function run() {
  console.log(apply ? "APPLYING CHANGES\n" : "DRY RUN (nothing is changed; add --apply to write)\n");

  const { data: cats } = await supabase.from("categories").select("id, slug");
  const teamwear = cats?.find((c) => c.slug === "sportswear-teamwear");
  if (!teamwear) throw new Error("sportswear-teamwear category not found");

  const { data: products, error } = await supabase
    .from("products")
    .select("id, slug, name, images:product_images(id, image_url, sort_order)");
  if (error || !products) throw new Error(error?.message || "No products");

  for (const ph of [...Object.values(EXISTING).flat(), ...NEW_PRODUCTS.flatMap((n) => n.photos)]) {
    if (!fs.existsSync(path.join(READY, ph.file))) throw new Error(`Missing file: ${ph.file}`);
  }

  for (const [slug, photos] of Object.entries(EXISTING)) {
    const product = products.find((x) => x.slug === slug);
    if (!product) { console.log(`SKIP ${slug}: product not found`); continue; }
    console.log(`UPDATE ${slug} (${product.name})`);
    await attachPhotos(product, photos);
  }

  for (const np of NEW_PRODUCTS) {
    let product = products.find((x) => x.slug === np.slug);
    console.log(`${product ? "EXISTS" : "CREATE"} ${np.slug} (${np.name})`);
    if (!product) {
      console.log(`  title: ${np.seo_title}\n  meta:  ${np.seo_description}`);
      if (apply) {
        const now = new Date().toISOString();
        const row = {
          id: randomUUID(),
          name: np.name,
          slug: np.slug,
          category_id: teamwear.id,
          short_description: np.short_description,
          description: np.description,
          materials: np.materials,
          features: np.features,
          customization_options: {
            list: np.customization,
            show_pricing: false,
            primary_keyword: np.primary_keyword,
            secondary_keywords: np.secondary_keywords,
          },
          moq: 30,
          lead_time: np.lead_time,
          featured: false,
          is_active: true,
          seo_title: np.seo_title,
          seo_description: np.seo_description,
          created_at: now,
          updated_at: now,
        };
        const { error: e } = await supabase.from("products").insert(row);
        if (e) throw new Error(`Create failed for ${np.slug}: ${e.message}`);
        product = { id: row.id, slug: row.slug, name: row.name, images: [] };
      } else {
        product = { id: "(new)", slug: np.slug, name: np.name, images: [] };
      }
    }
    await attachPhotos(product, np.photos);
  }

  console.log(apply ? "\nDone." : "\nDry run complete.");
}

run().catch((e) => { console.error(e); process.exit(1); });
