import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ulamuliwbllkrrpdbdkn.supabase.co";
const serviceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsYW11bGl3Ymxsa3JycGRiZGtuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODgzODE1MiwiZXhwIjoyMTA0NDE0MTUyfQ.iNZf1rLEDkk5THPjDGH8gZrEBl6gFV3K5han6VIg2nE";

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function inspectDb() {
  const { data: catData, error: catError } = await supabase.from("categories").select("id, name, slug");
  console.log("Current Categories in Supabase:", catData?.length, catError?.message || "");
  catData?.forEach(c => console.log(`- [${c.id}] ${c.name} (${c.slug})`));

  const { data: prodData, error: prodError } = await supabase.from("products").select("id, name, slug");
  console.log("Current Products in Supabase:", prodData?.length, prodError?.message || "");
}

inspectDb();
