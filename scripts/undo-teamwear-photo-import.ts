/**
 * Reverses scripts/import-teamwear-photos.ts (the photos belong in Previous Work, not product listings).
 *
 *   npx tsx scripts/undo-teamwear-photo-import.ts           -> dry run
 *   npx tsx scripts/undo-teamwear-photo-import.ts --apply   -> write
 *
 * - Removes every product photo stored under products/teamwear/
 * - Puts back the generated mockup on soccer jerseys, baseball pants and football pants
 * - Renumbers the remaining photos so the original first photo is the main image again
 * - Deletes the three products the import created
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

const CREATED = ["custom-flag-football-uniforms", "custom-wrestling-singlets", "custom-team-backpacks-and-duffle-bags"];
const MOCKUPS = ["custom-soccer-jerseys", "custom-baseball-pants", "custom-football-pants"];
const TOUCHED = [
  "custom-soccer-kits",
  "custom-soccer-jerseys",
  "custom-baseball-uniforms",
  "custom-baseball-pants",
  "custom-american-football-uniforms",
  "custom-football-pants",
  "custom-basketball-uniforms",
];

async function must<T>(p: PromiseLike<{ data: T; error: { message: string } | null }>, what: string): Promise<T> {
  const { data, error } = await p;
  if (error) throw new Error(`${what}: ${error.message}`);
  return data;
}

async function run() {
  console.log(apply ? "APPLYING\n" : "DRY RUN (add --apply to write)\n");
  const products = await must(
    supabase.from("products").select("id, slug, name, images:product_images(id, image_url, sort_order)").in("slug", [...TOUCHED, ...CREATED]),
    "load products"
  );

  for (const p of products) {
    const imported = p.images.filter((i) => i.image_url.includes("/products/teamwear/"));
    const rest = p.images.filter((i) => !i.image_url.includes("/products/teamwear/")).sort((a, b) => a.sort_order - b.sort_order);

    if (CREATED.includes(p.slug)) {
      console.log(`DELETE product ${p.slug} (${imported.length} photo rows)`);
      if (apply) {
        await must(supabase.from("product_images").delete().eq("product_id", p.id), "delete images");
        await must(supabase.from("products").delete().eq("id", p.id), "delete product");
      }
      continue;
    }

    const restoreMockup = MOCKUPS.includes(p.slug) && !rest.some((i) => i.image_url.includes("/mockups/"));
    console.log(`RESTORE ${p.slug}: -${imported.length} imported, ${rest.length} kept${restoreMockup ? ", mockup put back" : ""}`);
    if (!apply) continue;

    if (imported.length) await must(supabase.from("product_images").delete().in("id", imported.map((i) => i.id)), "delete imported");
    if (restoreMockup) {
      await must(
        supabase.from("product_images").insert({
          id: randomUUID(),
          product_id: p.id,
          image_url: `/images/products/mockups/${p.slug}-mockup.jpg`,
          alt_text: `${p.name} design mockup by Gloves Storm, Sialkot`,
          sort_order: 1,
          is_primary: true,
          created_at: new Date().toISOString(),
        }),
        "restore mockup"
      );
    } else {
      for (const [i, img] of rest.entries()) {
        await must(supabase.from("product_images").update({ sort_order: i + 1, is_primary: i === 0 }).eq("id", img.id), "renumber");
      }
    }
  }

  const files = await must(supabase.storage.from("products").list("teamwear", { limit: 200 }), "list storage");
  console.log(`REMOVE ${files.length} file(s) from storage products/teamwear/`);
  if (apply && files.length) {
    const { error } = await supabase.storage.from("products").remove(files.map((f) => `teamwear/${f.name}`));
    if (error) throw new Error(`remove storage: ${error.message}`);
  }
  console.log(apply ? "\nDone." : "\nDry run complete.");
}

run().catch((e) => { console.error(e); process.exit(1); });
