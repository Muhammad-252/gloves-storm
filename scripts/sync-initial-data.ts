import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";
import { initialProjects, initialTestimonials, initialBlogPosts, initialSiteSettings, initialInquiries } from "../src/lib/data/initialData";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ulamuliwbllkrrpdbdkn.supabase.co";
const serviceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsYW11bGl3Ymxsa3JycGRiZGtuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODgzODE1MiwiZXhwIjoyMTA0NDE0MTUyfQ.iNZf1rLEDkk5THPjDGH8gZrEBl6gFV3K5han6VIg2nE";

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function syncLocal() {
  console.log("Fetching categories from Supabase...");
  const { data: categories, error: cErr } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });
  if (cErr) throw cErr;

  console.log("Fetching products with images from Supabase...");
  const { data: products, error: pErr } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(*),
      images:product_images(*)
    `)
    .order("created_at", { ascending: true });
  if (pErr) throw pErr;

  console.log(`Fetched ${categories.length} categories and ${products.length} products.`);

  const content = `import {
  Category,
  Product,
  Project,
  Testimonial,
  BlogPost,
  Inquiry,
  SiteSettings,
} from "@/types/database";

export const initialCategories: Category[] = ${JSON.stringify(categories, null, 2)};

export const initialProducts: Product[] = ${JSON.stringify(products, null, 2)};

export const initialProjects: Project[] = ${JSON.stringify(initialProjects, null, 2)};

export const initialTestimonials: Testimonial[] = ${JSON.stringify(initialTestimonials, null, 2)};

export const initialBlogPosts: BlogPost[] = ${JSON.stringify(initialBlogPosts, null, 2)};

export const initialSiteSettings: SiteSettings = ${JSON.stringify(initialSiteSettings, null, 2)};

export const initialInquiries: Inquiry[] = ${JSON.stringify(initialInquiries, null, 2)};
`;

  const targetPath = path.resolve(__dirname, "../src/lib/data/initialData.ts");
  fs.writeFileSync(targetPath, content, "utf-8");
  console.log(`✅ Successfully updated ${targetPath}`);
}

syncLocal();
