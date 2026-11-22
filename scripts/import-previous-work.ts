/**
 * Adds client uniform photos from content-inbox/Images/ to Previous Work, one project card per photo.
 * Photos are used as they are (no watermark), only re-compressed and given SEO file names.
 *
 *   npx tsx scripts/import-previous-work.ts           -> dry run
 *   npx tsx scripts/import-previous-work.ts --apply   -> upload and write
 *
 * Safe to re-run: projects whose slug already exists are skipped.
 */
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import sharp from "sharp";
import { createClient } from "@supabase/supabase-js";

const apply = process.argv.includes("--apply");
const SRC = path.join("content-inbox", "Images");

const env: Record<string, string> = {};
for (const line of fs.readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const i = line.indexOf("=");
  if (i > 0) env[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
}
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

type Work = {
  /** Set when the photo sits in a different inbox folder than its group */
  folder?: string;
  /** Source file inside content-inbox/Images/<folder>/ */
  file: string;
  title: string;
  description: string;
  /** Short spec line shown on the card */
  spec: string;
};
type Group = { folder: string; industry: string; slugBase: string; items: Work[] };

const GROUPS: Group[] = [
  {
    folder: "Basketball Uniform",
    industry: "Basketball Uniforms",
    slugBase: "basketball-uniform",
    items: [
      { file: "c694fa80c357f085d5d62278b2e4631a.jpg", title: "Burg Blazers Camo Basketball Uniforms & Duffle Bag", spec: "Camo jerseys, flame shorts, matching duffle", description: "Grey camo basketball jerseys with flame-print shorts for the Burg Blazers, finished with a matching sublimated duffle bag for the full team look." },
      { file: "b677cbb82deaba07396fd39d1a0658a3.jpg", title: "Auspice Wolf Basketball Uniform", spec: "Sublimated jersey and shorts, names and numbers", description: "Black and red sublimated basketball jersey and shorts with a wolf mascot, brush-stroke graphics and custom player number." },
      { file: "aef26516ca7c21e0c56272fa6272a429.jpg", title: "Team Total Crackle-Print Basketball Uniform", spec: "All-over crackle print, fade shorts", description: "White crackle-texture basketball jersey with gold trim and navy-to-white fade shorts, fully sublimated for Team Total." },
      { file: "a8d074c4fbefbe96bf00fe158867658f.jpg", title: "Cleveland Prime Basketball Uniform & Shooting Hoodie", spec: "Jersey, shorts and matching hoodie", description: "Orange and black basketball jersey and shorts with a matching sublimated shooting hoodie, made as one coordinated team set for Cleveland Prime." },
      { file: "6004ea7711ffd0a14d43a0a9c80711e8.jpg", title: "Team Next Navy & Red Basketball Uniform", spec: "Sublimated jersey and shorts, custom numbers", description: "Navy basketball jersey with red and grey colour-block shorts and custom numbers, produced for Team Next." },
      { file: "2996fe8fa65bcf3185507a276efd2a64.jpg", title: "Strong Neon Basketball Uniform & Backpack", spec: "Neon sublimated set with matching backpack", description: "Neon green and black basketball jersey and shorts with a lion mascot, paired with a matching sublimated team backpack." },
    ],
  },
  {
    folder: "Baseball Uniform",
    industry: "Baseball Uniforms",
    slugBase: "baseball-uniform",
    items: [
      { file: "35b2bc928a9811e96caad899998cb0db.jpg", title: "Blue Riders Red Baseball Uniform", spec: "Button-front jersey and piped pants", description: "Red button-front baseball jersey with navy script lettering and matching piped pants for the Blue Riders." },
      { file: "60309619d6feaee6650e8de63334e8d7.jpg", title: "Tribe Navy & Orange Baseball Uniform", spec: "Button-front jersey, navy pants", description: "Navy baseball jersey with orange piping and script team name, worn with navy baseball pants." },
      { file: "c47b79dbd0570c7e4b748b0cf1d3e39f.jpg", title: "Tribe Maroon Baseball Uniform", spec: "Button-front jersey, maroon pants", description: "Maroon baseball jersey with gold and orange script lettering and matching maroon pants, the Tribe's alternate kit." },
      { file: "1e633f4338ef999c9b8e2464a2e8e9d2.jpg", title: "Peak Kick Pinstripe Baseball Uniform", spec: "Pinstripe jersey with navy side panels", description: "White pinstripe baseball jersey with navy side panels and piped white pants for Peak Kick." },
      { file: "f3db6afd07c157744ee3f80d5555276c.jpg", title: "Chill Pinstripe Baseball Uniform", spec: "Pinstripe jersey, contrast sleeves", description: "Cream pinstripe baseball jersey with black placket and sleeves, gold script lettering and matching striped pants." },
      { file: "9922ea0873dbe69f69ae3d3fb78fa0cc.jpg", title: "Vallejo Digital Camo Baseball Uniform", spec: "All-over camo sublimation, piped pants", description: "Grey digital-camo baseball jersey with red and blue sleeve stripes and white pants with camo side panels." },
      { file: "8da639e28bebc8d97913205ff79e4c34.jpg", title: "Bull Gold Baseball Uniform", spec: "Button-front jersey and jogger pants", description: "Gold baseball jersey with black piping and bull logo, paired with matching gold jogger-style pants." },
    ],
  },
  {
    folder: "American Football Uniform",
    industry: "American Football Uniforms",
    slugBase: "american-football-uniform",
    items: [
      { file: "85a897d947974086b352f17820cf074b.jpg", title: "Canyon Wolves Football Uniform", spec: "Game jersey and camo-panel pants", description: "Charcoal American football jersey with maroon numbers and game pants with tyre-track camo side panels for the Canyon Wolves." },
      { file: "7b3c239fa22427b83e065f0afedad508.jpg", title: "Black & Neon Green Football Uniform", spec: "Sublimated jersey and padded pants", description: "Black American football jersey and pants with neon green lightning graphics, fully sublimated." },
      { file: "4015a80b246839ad78e0cb8773d9ab02.jpg", title: "Lonestar Select Red Football Jersey", spec: "Sublimated jersey with arm sleeve", description: "Red, white and navy American football jersey with a matching sublimated arm sleeve for Lonestar Select." },
      { file: "d5cb2cb4531c7887ee83c4ded13b4e66.jpg", title: "White & Purple Football Uniform", spec: "Name and number jersey, padded pants", description: "White American football jersey with purple name and number and white padded pants with purple side stripes." },
      { file: "17e28b73aea5a25b670880f78c6deb86.jpg", title: "Maroon Digital Camo Football Uniform", spec: "Pattern-collar jersey, camo pants", description: "Maroon American football jersey with patterned collar and shoulders and maroon digital-camo pants." },
      { file: "e60feab72308bb1f5364eae6c9a0d940.jpg", title: "Black & Pink Splatter Football Uniform", spec: "Splatter sublimation, jersey and pants", description: "Black American football jersey and pants with pink paint-splatter sublimation and a bright pink collar." },
      { folder: "Baseball Uniform", file: "1ae00770372910083f7667e9f00e2aad.jpg", title: "Savannah Grey Football Uniform", spec: "Mesh jersey and striped game pants", description: "Grey and black football jersey with striped sleeves and matching game pants for Savannah." },
    ],
  },
  {
    folder: "Flagfootball Uniform",
    industry: "Flag Football & 7v7",
    slugBase: "flag-football-uniform",
    items: [
      { file: "8c60e206b9adbe3308ebb7d70b20cb40.jpg", title: "Bulldogs Hooded 7v7 Uniforms", spec: "Hooded sleeveless jerseys and shorts", description: "Black and gold bulldog-mascot hooded 7v7 jerseys with matching shorts, made in home and away colours." },
      { file: "7be423a8067332ce701a89197c238dc7.jpg", title: "Purple & Black Hooded 7v7 Uniform", spec: "Hooded jersey and compression shorts", description: "Purple, black and white hooded 7v7 jersey with matching compression shorts and player number." },
      { file: "670f0f723fa5b9d52acc0d2e24e9ee23.jpg", title: "Breed Winners Flag Football Uniform", spec: "Sublimated hooded jersey and shorts", description: "Yellow-to-green hooded flag football jersey and shorts with an all-over dog mascot design." },
      { file: "fb11eacaf98281efbc177d8b49b7fee7.jpg", title: "Storm Red & White 7v7 Uniforms", spec: "Splatter sublimation, home and away", description: "Red and white paint-splatter hooded 7v7 jerseys and shorts made in home and away versions for the Storm." },
      { file: "e111d8483a71a7144c23b74643eb19d7.jpg", title: "Navy & Gold Elite 7v7 Uniform", spec: "Hooded jersey and shorts", description: "Navy and gold hooded 7v7 jersey with jagged sublimated graphics and matching shorts." },
      { file: "ac08f79a18feac98705c3bd0cbb1f748.jpg", title: "Green Bulldogs Hooded Flag Football Uniform", spec: "Hooded jersey and compression shorts", description: "Green bulldog hooded flag football jersey with black compression shorts and chain graphic." },
    ],
  },
  {
    folder: "Soccer Uniform",
    industry: "Soccer Uniforms",
    slugBase: "soccer-uniform",
    items: [
      { file: "08c8cd273946fcd4baa909d2e4557d3d.jpg", title: "Outlaws Soccer Kits, Full Team Order", spec: "Jerseys, shorts and socks, individually bagged", description: "Full team order of sky-blue Outlaws soccer kits with shorts and socks, each kit packed in its own polybag." },
      { file: "6699469f224a79840b33a44cbe611b2b.jpg", title: "Outlaws Sky Blue Soccer Kit", spec: "Sublimated jersey and shorts", description: "Sky-blue fade soccer jersey and shorts with the Outlaws crest and player number." },
      { file: "d7103764d0adae21c9021c77373375db.jpg", title: "Outlaws Soccer Kit with Socks", spec: "Jersey, shorts and matching socks", description: "Outlaws soccer jersey and shorts shown with the matching sky-blue socks made for the same order." },
      { file: "6ff860f257d62f257fe5d80165cd8a0d.jpg", title: "Captains Red & Black Soccer Kit", spec: "Sublimated jersey and shorts, names and numbers", description: "Red and black splatter-stripe soccer jersey and shorts with player name and number for the Captains." },
      { file: "d0c3dc9989d6299333bed3714591ba69.jpg", title: "Black & Blue Wave Soccer Kit", spec: "Sublimated jersey and shorts, names and numbers", description: "Black soccer jersey with blue wave and hexagon sublimation, custom name and number, and black shorts." },
      { file: "2cad3b9eca14ef0d53e6b6b1c59596a9.jpg", title: "Sky Blue Stripe Soccer Kit", spec: "Striped jersey and shorts", description: "White and sky-blue striped soccer jersey with matching blue shorts and number." },
      { file: "ee8c31bc8df355f5cd7ff318ccf63ff9.jpg", title: "Sharks Soccer Kits, Packed for Shipping", spec: "Team set, individually bagged", description: "Sharks team soccer kits with numbered jerseys and shorts, packed in individual polybags ready to ship." },
      { file: "184e89838bd917607fdf81eb0e9080e8.jpg", title: "Beast Kids Youth Soccer Kit", spec: "Youth sublimated jersey and shorts", description: "Black, red and white youth soccer jersey and shorts with claw-mark sublimation for Beast Kids." },
      { file: "0ae316e8818acc58c1878ed705106c6e.jpg", title: "Grey Wolves Soccer Kit", spec: "Sublimated jersey and shorts", description: "Grey sublimated soccer jersey and shorts with a wolf crest and topographic pattern." },
      { file: "2f8a650dbd9822fee669f978cba44ece.jpg", title: "Serving Divas Women's Soccer Kit", spec: "Sublimated jersey and shorts", description: "Black women's soccer jersey with pink and blue swirl sublimation and matching shorts for Serving Divas." },
      { file: "f6c9a68d95c7e45df1162b6900246695.jpg", title: "Hawks Yellow & Black Uniform Set", spec: "Sublimated jersey and shorts", description: "Yellow and black distressed-print jersey with black shorts and contrast numbers for the Hawks." },
    ],
  },
  {
    folder: "Bagpacks",
    industry: "Team Bags",
    slugBase: "team-backpack",
    items: [
      { file: "9a87baba68f8dfd634212963b8a12e92.jpg", title: "Harlem Wizards Galaxy Backpack", spec: "Sublimated backpack, name and number", description: "Purple galaxy-print team backpack with the Harlem Wizards logo, player name and number." },
      { file: "abb905680123d23725f7ca34347acb76.jpg", title: "Griffins Girls Basketball Backpacks", spec: "Name and number, front and back print", description: "Black and royal blue team backpacks for a girls basketball team, with name, number and side-strap lettering." },
      { file: "628a4898d53361b24ad472aa4cdadef3.jpg", title: "Ballou Football Team Backpack", spec: "Sublimated backpack, team crest", description: "Grey and navy football team backpack with crest, player number and gold trim." },
      { file: "665cf59fc6eba07233a8f956db7c864a.jpg", title: "Colts Basketball Team Backpack", spec: "Team logo backpack", description: "Black and grey basketball team backpack with the Colts horseshoe logo in orange." },
      { file: "e88fcddb09d809ce9620834d42a13fad.jpg", title: "Xcell Athletics Splatter Backpack", spec: "Name and number, front and back print", description: "White and black paint-splatter backpack with player name and number for Xcell Athletics." },
    ],
  },
  {
    folder: "Duffle Bags",
    industry: "Team Bags",
    slugBase: "team-duffle-bag",
    items: [
      { file: "5058bfcc59d8b1c658932bceaf3c4d89.jpg", title: "Santa Barbara Red Sublimated Duffle Bag", spec: "Sublimated duffle with player number", description: "Red and black brush-stroke sublimated sports duffle bag with player number and team name." },
    ],
  },
  {
    folder: "Wresting Singlets",
    industry: "Wrestling Singlets",
    slugBase: "wrestling-singlet",
    items: [
      { file: "db3fd62f43a691b0fa499b71526c26aa.jpg", title: "Beast Kids Youth Wrestling Singlet", spec: "Sublimated 4-way stretch singlet", description: "Black and red youth wrestling singlet with claw-mark graphics and dot pattern, matching the Beast Kids soccer kits." },
    ],
  },
];

// Retry flaky network calls (Supabase from Pakistan sometimes drops a request)
async function retry<T extends { error: unknown }>(fn: () => PromiseLike<T>, tries = 4): Promise<T> {
  for (let i = 1; ; i++) {
    try {
      const r = await fn();
      if (!r.error || i >= tries) return r;
    } catch (e) {
      if (i >= tries) throw e;
    }
    await new Promise((res) => setTimeout(res, 1500 * i));
  }
}

const slugify = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

async function run() {
  console.log(apply ? "APPLYING\n" : "DRY RUN (add --apply to write)\n");

  const { data: cats } = await supabase.from("categories").select("id, slug");
  const teamwear = cats?.find((c) => c.slug === "sportswear-teamwear");
  if (!teamwear) throw new Error("sportswear-teamwear category not found");

  const { data: existing, error } = await supabase.from("projects").select("id, slug, images:project_images(id)");
  if (error) throw new Error(error.message);
  const unfinished = (existing ?? []).filter((p) => !p.images?.length && p.slug.length > 0);
  if (apply && unfinished.length) {
    const ours = unfinished.filter((p) => GROUPS.some((g) => g.items.some((w) => slugify(w.title) === p.slug)));
    for (const p of ours) {
      console.log(`  CLEAN half-saved project ${p.slug}`);
      await retry(() => supabase.from("projects").delete().eq("id", p.id));
    }
  }
  const taken = new Set((existing ?? []).filter((p) => p.images?.length).map((p) => p.slug));

  // Newest first on the page: give each project a created_at a second apart in display order
  let t = Date.now();
  let count = 0;

  for (const g of GROUPS) {
    console.log(`\n${g.industry} (${g.items.length})`);
    for (const w of g.items) {
      const src = path.join(SRC, w.folder ?? g.folder, w.file);
      if (!fs.existsSync(src)) throw new Error(`Missing ${src}`);
      const slug = `${slugify(w.title)}`;
      if (taken.has(slug)) { console.log(`  SKIP  ${slug} (exists)`); continue; }
      taken.add(slug);
      const fileName = `${slug}-gloves-storm.jpg`;
      console.log(`  ADD   ${w.title}  ->  ${fileName}`);
      count++;
      if (!apply) continue;

      const body = await sharp(src).rotate().jpeg({ quality: 85, mozjpeg: true }).toBuffer();
      const storagePath = `previous-work/${fileName}`;
      const up = await retry(() => supabase.storage.from("projects").upload(storagePath, body, {
        contentType: "image/jpeg",
        upsert: true,
        cacheControl: "31536000",
      }));
      if (up.error) throw new Error(`Upload ${fileName}: ${up.error.message}`);
      const url = supabase.storage.from("projects").getPublicUrl(storagePath).data.publicUrl;

      const id = randomUUID();
      const when = new Date((t -= 1000)).toISOString();
      const ins = await retry(() => supabase.from("projects").upsert({
        id,
        title: w.title,
        slug,
        industry: g.industry,
        category_id: teamwear.id,
        description: w.description,
        solution: w.spec,
        featured_image: url,
        featured: false,
        is_active: true,
        created_at: when,
        updated_at: when,
      }));
      if (ins.error) throw new Error(`Project ${slug}: ${ins.error.message}`);
      const img = await retry(() => supabase.from("project_images").upsert({
        id: randomUUID(),
        project_id: id,
        image_url: url,
        alt_text: `${w.title}, custom made by Gloves Storm in Sialkot`,
        sort_order: 1,
      }));
      if (img.error) throw new Error(`Image ${slug}: ${img.error.message}`);
    }
  }
  console.log(`\n${count} project(s) ${apply ? "added" : "to add"}.`);
}

run().catch((e) => { console.error(e); process.exit(1); });
