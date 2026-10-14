import fs from "fs";
import { createClient } from "@supabase/supabase-js";

const envContent = fs.readFileSync(".env.local", "utf8");
const env = {};
envContent.split("\n").forEach((line) => {
  const [k, ...v] = line.trim().split("=");
  if (k && v.length) env[k.trim()] = v.join("=").trim().replace(/^["']|["']$/g, "");
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const { data } = await supabase.from("blog_posts").select("id, slug, title, content");
  data.forEach((p) => {
    console.log(`\n=================== [${p.slug}] ===================`);
    console.log("Title:", p.title);
    console.log("Length:", p.content.length);
    console.log("Is HTML:", p.content.includes("<p>") || p.content.includes("<div>") || p.content.includes("<h2"));
    console.log("First 300 chars:\n" + p.content.slice(0, 300) + "\n");
  });
}
run();
