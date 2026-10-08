import { promises as fs } from "fs";
import path from "path";
import os from "os";
import { randomUUID } from "crypto";
import {
  Category,
  Product,
  Project,
  Testimonial,
  BlogPost,
  Inquiry,
  SiteSettings,
} from "@/types/database";
import {
  initialCategories,
  initialProducts,
  initialProjects,
  initialTestimonials,
  initialBlogPosts,
  initialSiteSettings,
  initialInquiries,
} from "./initialData";
import { supabase, supabaseAdmin, isSupabaseConfigured } from "../supabase/client";

// Global cache across serverless requests in the same worker
declare global {
  /* eslint-disable no-var */
  var __gs_db_categories: Category[] | undefined;
  var __gs_db_products: Product[] | undefined;
  var __gs_db_projects: Project[] | undefined;
  var __gs_db_testimonials: Testimonial[] | undefined;
  var __gs_db_blog_posts: BlogPost[] | undefined;
  var __gs_db_site_settings: SiteSettings | undefined;
  var __gs_db_inquiries: Inquiry[] | undefined;
  /* eslint-enable no-var */
}

// In Vercel and AWS Lambda, /var/task is strictly read-only.
// /tmp is the only writable directory in serverless environments.
const PRIMARY_DATA_DIR = path.join(process.cwd(), "data");
const TMP_DATA_DIR = path.join(os.tmpdir(), "glovesstorm_data");

const isUuid = (val?: string | null): boolean =>
  Boolean(val && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val));

const getDbClient = () => supabaseAdmin || supabase;

async function readJsonFile<T>(filename: string, fallback: T): Promise<T> {
  // 1. Try reading from TMP_DATA_DIR first (contains runtime admin updates on serverless)
  const tmpPath = path.join(TMP_DATA_DIR, filename);
  try {
    const data = await fs.readFile(tmpPath, "utf-8");
    const parsed = JSON.parse(data);
    if (parsed) return parsed as T;
  } catch {}

  // 2. Try reading from PRIMARY_DATA_DIR (bundled with deployment build)
  const primaryPath = path.join(PRIMARY_DATA_DIR, filename);
  try {
    const data = await fs.readFile(primaryPath, "utf-8");
    const parsed = JSON.parse(data);
    if (parsed) return parsed as T;
  } catch {}

  // 3. Fallback: try seeding to /tmp so subsequent reads find it
  try {
    await fs.mkdir(TMP_DATA_DIR, { recursive: true });
    await fs.writeFile(tmpPath, JSON.stringify(fallback, null, 2), "utf-8");
  } catch {}

  return fallback;
}

// Optional background GitHub repository sync if GITHUB_TOKEN is provided in Vercel env
async function syncToGitHub(filename: string, data: any) {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  const repo = process.env.GITHUB_REPOSITORY || "Muhammad-252/gloves-storm";
  if (!token) return;

  try {
    const filePath = `data/${filename}`;
    const url = `https://api.github.com/repos/${repo}/contents/${filePath}`;

    let sha: string | undefined;
    const getRes = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "GlovesStorm-Admin",
      },
    });
    if (getRes.ok) {
      const existing = await getRes.json();
      sha = existing.sha;
    }

    const content = Buffer.from(JSON.stringify(data, null, 2)).toString("base64");
    await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
        "User-Agent": "GlovesStorm-Admin",
      },
      body: JSON.stringify({
        message: `chore: update ${filename} via admin panel`,
        content,
        sha,
        branch: "main",
      }),
    });
  } catch (e) {
    console.warn(`GitHub sync notice for ${filename}:`, e);
  }
}

async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  const jsonString = JSON.stringify(data, null, 2);
  let writeSucceeded = false;

  // 1. Try writing to PRIMARY_DATA_DIR (works locally in dev, VPS, Docker, or traditional Node.js server)
  try {
    await fs.mkdir(PRIMARY_DATA_DIR, { recursive: true });
    const primaryPath = path.join(PRIMARY_DATA_DIR, filename);
    try {
      const tempPath = `${primaryPath}.tmp.${Date.now()}`;
      await fs.writeFile(tempPath, jsonString, "utf-8");
      await fs.rename(tempPath, primaryPath);
    } catch {
      await fs.writeFile(primaryPath, jsonString, "utf-8");
    }
    writeSucceeded = true;
  } catch (err: any) {
    // EROFS (Read-only file system) happens in Vercel/AWS Lambda serverless environments
    if (err?.code !== "EROFS" && !err?.message?.includes("read-only")) {
      console.warn(`Primary write skipped for ${filename}:`, err?.message);
    }
  }

  // 2. Always write to TMP_DATA_DIR (guaranteed writable on Vercel/Lambda serverless)
  try {
    await fs.mkdir(TMP_DATA_DIR, { recursive: true });
    const tmpPath = path.join(TMP_DATA_DIR, filename);
    try {
      const tempPath = `${tmpPath}.tmp.${Date.now()}`;
      await fs.writeFile(tempPath, jsonString, "utf-8");
      await fs.rename(tempPath, tmpPath);
    } catch {
      await fs.writeFile(tmpPath, jsonString, "utf-8");
    }
    writeSucceeded = true;
  } catch (tmpErr: any) {
    console.warn(`Tmp directory write notice for ${filename}:`, tmpErr?.message);
  }

  // 3. Trigger optional GitHub commit in background if token available
  syncToGitHub(filename, data).catch(() => {});

  if (!writeSucceeded) {
    console.warn(`Notice: In-memory fallback used for ${filename}.`);
  }
}

// =========================================================================
// CATEGORIES
// =========================================================================
export async function getDbCategories(): Promise<Category[]> {
  if (isSupabaseConfigured) {
    const client = getDbClient();
    if (client) {
      try {
        const { data, error } = await client
          .from("categories")
          .select("*")
          .order("sort_order", { ascending: true });

        if (!error && data && data.length > 0) {
          globalThis.__gs_db_categories = data as Category[];
          return data as Category[];
        }
      } catch (e) {
        console.warn("Supabase categories fetch notice, falling back to local:", e);
      }
    }
  }

  try {
    const loaded = await readJsonFile<Category[]>("categories.json", [...initialCategories]);
    globalThis.__gs_db_categories = loaded;
    return loaded;
  } catch {
    if (globalThis.__gs_db_categories && globalThis.__gs_db_categories.length > 0) {
      return globalThis.__gs_db_categories;
    }
    return [...initialCategories];
  }
}

export async function saveDbCategory(category: Partial<Category>): Promise<Category> {
  const categoryId = category.id && isUuid(category.id) ? category.id : (category.id || randomUUID());

  // Clean data for DB (strip non-column fields like productCount, featuredItems)
  const dbRecord: any = {
    id: categoryId,
    name: category.name || "New Category",
    slug: category.slug || `category-${Date.now()}`,
    description: category.description || null,
    image_url: category.image_url || null,
    parent_id: category.parent_id && isUuid(category.parent_id) ? category.parent_id : null,
    sort_order: category.sort_order ?? 1,
    is_active: category.is_active ?? true,
    featured_in_menu: category.featured_in_menu ?? true,
    menu_badge: category.menu_badge || null,
    updated_at: new Date().toISOString(),
  };

  let saved: Category = dbRecord as Category;

  if (isSupabaseConfigured) {
    const client = getDbClient();
    if (client) {
      try {
        const { data, error } = await client
          .from("categories")
          .upsert(dbRecord)
          .select()
          .single();

        if (!error && data) {
          saved = data as Category;
        } else if (error) {
          console.error("Supabase category save error:", error);
        }
      } catch (e) {
        console.warn("Supabase category save exception:", e);
      }
    }
  }

  // Update in-memory & local fallback JSON
  try {
    const list = [...(await getDbCategories())];
    const idx = list.findIndex((c) => c.id === saved.id);
    if (idx !== -1) {
      list[idx] = saved;
    } else {
      list.push(saved);
    }
    globalThis.__gs_db_categories = list;
    await writeJsonFile("categories.json", list);
  } catch {}

  return saved;
}

export async function deleteDbCategory(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    const client = getDbClient();
    if (client) {
      try {
        const { error } = await client.from("categories").delete().eq("id", id);
        if (error) console.error("Supabase category delete error:", error);
      } catch (e) {
        console.warn("Supabase category delete notice:", e);
      }
    }
  }

  try {
    const list = [...(await getDbCategories())];
    const filtered = list.filter((c) => c.id !== id);
    globalThis.__gs_db_categories = filtered;
    await writeJsonFile("categories.json", filtered);
  } catch {}

  return true;
}

// =========================================================================
// PRODUCTS
// =========================================================================
export async function getDbProducts(): Promise<Product[]> {
  if (isSupabaseConfigured) {
    const client = getDbClient();
    if (client) {
      try {
        const { data, error } = await client
          .from("products")
          .select("*, images:product_images(*), category:categories(*)")
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          globalThis.__gs_db_products = data as Product[];
          return data as Product[];
        }
      } catch (e) {
        console.warn("Supabase products fetch notice, falling back to local:", e);
      }
    }
  }

  try {
    const loaded = await readJsonFile<Product[]>("products.json", [...initialProducts]);
    globalThis.__gs_db_products = loaded;
    return loaded;
  } catch {
    if (globalThis.__gs_db_products && globalThis.__gs_db_products.length > 0) {
      return globalThis.__gs_db_products;
    }
    return [...initialProducts];
  }
}

export async function saveDbProduct(product: Partial<Product>): Promise<Product> {
  const productId = product.id && isUuid(product.id) ? product.id : (product.id || randomUUID());
  const { images, category: joinedCategory, ...productFields } = product as any;

  const prodRecord: any = {
    id: productId,
    name: product.name || "New Product",
    slug: product.slug || `product-${Date.now()}`,
    category_id: product.category_id && isUuid(product.category_id) ? product.category_id : null,
    short_description: product.short_description || "",
    description: product.description || "",
    materials: product.materials || [],
    features: product.features || [],
    customization_options: product.customization_options || [],
    moq: product.moq || 50,
    lead_time: product.lead_time || "2-4 Weeks",
    featured: product.featured ?? false,
    is_active: product.is_active ?? true,
    seo_title: product.seo_title || null,
    seo_description: product.seo_description || null,
    pricing_tiers: product.pricing_tiers || [],
    sample_price: product.sample_price || null,
    show_pricing: product.show_pricing ?? true,
    updated_at: new Date().toISOString(),
  };

  let saved: Product = {
    ...prodRecord,
    images: images || [],
    category: joinedCategory || null,
  };

  if (isSupabaseConfigured) {
    const client = getDbClient();
    if (client) {
      try {
        const { data, error } = await client
          .from("products")
          .upsert(prodRecord)
          .select("*, images:product_images(*), category:categories(*)")
          .single();

        if (!error && data) {
          saved = data as Product;

          // Sync images to product_images table if provided
          if (Array.isArray(images) && images.length > 0) {
            try {
              const imageRows = images.map((img: any, idx: number) => ({
                id: img.id && isUuid(img.id) ? img.id : randomUUID(),
                product_id: saved.id,
                image_url: img.image_url || img,
                alt_text: img.alt_text || saved.name,
                sort_order: img.sort_order ?? idx + 1,
                is_primary: img.is_primary ?? idx === 0,
              }));
              await client.from("product_images").upsert(imageRows);
              const { data: refreshed } = await client
                .from("products")
                .select("*, images:product_images(*), category:categories(*)")
                .eq("id", saved.id)
                .single();
              if (refreshed) saved = refreshed as Product;
            } catch (imgErr) {
              console.warn("Product images sync notice:", imgErr);
            }
          }
        } else if (error) {
          console.error("Supabase product save error:", error);
        }
      } catch (e) {
        console.warn("Supabase product save exception:", e);
      }
    }
  }

  // Backup to local file & cache
  try {
    const list = [...(await getDbProducts())];
    const idx = list.findIndex((p) => p.id === saved.id);
    if (idx !== -1) list[idx] = saved;
    else list.unshift(saved);
    globalThis.__gs_db_products = list;
    await writeJsonFile("products.json", list);
  } catch {}

  return saved;
}

export async function deleteDbProduct(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    const client = getDbClient();
    if (client) {
      try {
        await client.from("product_images").delete().eq("product_id", id);
        const { error } = await client.from("products").delete().eq("id", id);
        if (error) console.error("Supabase product delete error:", error);
      } catch (e) {
        console.warn("Supabase product delete notice:", e);
      }
    }
  }

  try {
    const list = [...(await getDbProducts())];
    const filtered = list.filter((p) => p.id !== id);
    globalThis.__gs_db_products = filtered;
    await writeJsonFile("products.json", filtered);
  } catch {}

  return true;
}

// =========================================================================
// PROJECTS
// =========================================================================
export async function getDbProjects(): Promise<Project[]> {
  if (isSupabaseConfigured) {
    const client = getDbClient();
    if (client) {
      try {
        const { data, error } = await client
          .from("projects")
          .select("*, images:project_images(*)")
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          globalThis.__gs_db_projects = data as Project[];
          return data as Project[];
        }
      } catch (e) {
        console.warn("Supabase projects fetch notice, falling back to local:", e);
      }
    }
  }

  try {
    const loaded = await readJsonFile<Project[]>("projects.json", [...initialProjects]);
    globalThis.__gs_db_projects = loaded;
    return loaded;
  } catch {
    if (globalThis.__gs_db_projects && globalThis.__gs_db_projects.length > 0) {
      return globalThis.__gs_db_projects;
    }
    return [...initialProjects];
  }
}

export async function saveDbProject(project: Partial<Project>): Promise<Project> {
  const projectId = project.id && isUuid(project.id) ? project.id : (project.id || randomUUID());
  const { images, ...projRecord } = project as any;
  projRecord.id = projectId;
  projRecord.updated_at = new Date().toISOString();

  let saved: Project = { ...projRecord, images: images || [] };

  if (isSupabaseConfigured) {
    const client = getDbClient();
    if (client) {
      try {
        const { data, error } = await client
          .from("projects")
          .upsert(projRecord)
          .select("*, images:project_images(*)")
          .single();
        if (!error && data) saved = data as Project;
      } catch (e) {
        console.warn("Supabase project save notice:", e);
      }
    }
  }

  try {
    const list = [...(await getDbProjects())];
    const idx = list.findIndex((p) => p.id === saved.id);
    if (idx !== -1) list[idx] = saved;
    else list.unshift(saved);
    globalThis.__gs_db_projects = list;
    await writeJsonFile("projects.json", list);
  } catch {}

  return saved;
}

export async function deleteDbProject(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    const client = getDbClient();
    if (client) {
      try {
        await client.from("projects").delete().eq("id", id);
      } catch (e) {
        console.warn("Supabase project delete notice:", e);
      }
    }
  }

  try {
    const list = [...(await getDbProjects())];
    const filtered = list.filter((p) => p.id !== id);
    globalThis.__gs_db_projects = filtered;
    await writeJsonFile("projects.json", filtered);
  } catch {}

  return true;
}

// =========================================================================
// TESTIMONIALS
// =========================================================================
export async function getDbTestimonials(): Promise<Testimonial[]> {
  if (isSupabaseConfigured) {
    const client = getDbClient();
    if (client) {
      try {
        const { data, error } = await client
          .from("testimonials")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          globalThis.__gs_db_testimonials = data as Testimonial[];
          return data as Testimonial[];
        }
      } catch (e) {
        console.warn("Supabase testimonials fetch notice:", e);
      }
    }
  }

  try {
    const loaded = await readJsonFile<Testimonial[]>("testimonials.json", [...initialTestimonials]);
    globalThis.__gs_db_testimonials = loaded;
    return loaded;
  } catch {
    if (globalThis.__gs_db_testimonials && globalThis.__gs_db_testimonials.length > 0) {
      return globalThis.__gs_db_testimonials;
    }
    return [...initialTestimonials];
  }
}

export async function saveDbTestimonial(t: Partial<Testimonial>): Promise<Testimonial> {
  const testimonialId = t.id && isUuid(t.id) ? t.id : (t.id || randomUUID());
  const record: any = { ...t, id: testimonialId };
  let saved: Testimonial = record as Testimonial;

  if (isSupabaseConfigured) {
    const client = getDbClient();
    if (client) {
      try {
        const { data, error } = await client
          .from("testimonials")
          .upsert(record)
          .select()
          .single();
        if (!error && data) saved = data as Testimonial;
      } catch (e) {
        console.warn("Supabase testimonial save notice:", e);
      }
    }
  }

  try {
    const list = [...(await getDbTestimonials())];
    const idx = list.findIndex((item) => item.id === saved.id);
    if (idx !== -1) list[idx] = saved;
    else list.unshift(saved);
    globalThis.__gs_db_testimonials = list;
    await writeJsonFile("testimonials.json", list);
  } catch {}

  return saved;
}

export async function deleteDbTestimonial(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    const client = getDbClient();
    if (client) {
      try {
        await client.from("testimonials").delete().eq("id", id);
      } catch (e) {
        console.warn("Supabase testimonial delete notice:", e);
      }
    }
  }

  try {
    const list = [...(await getDbTestimonials())];
    const filtered = list.filter((item) => item.id !== id);
    globalThis.__gs_db_testimonials = filtered;
    await writeJsonFile("testimonials.json", filtered);
  } catch {}

  return true;
}

// =========================================================================
// BLOG POSTS
// =========================================================================
export async function getDbBlogPosts(): Promise<BlogPost[]> {
  if (isSupabaseConfigured) {
    const client = getDbClient();
    if (client) {
      try {
        const { data, error } = await client
          .from("blog_posts")
          .select("*")
          .order("published_at", { ascending: false });

        if (!error && data && data.length > 0) {
          globalThis.__gs_db_blog_posts = data as BlogPost[];
          return data as BlogPost[];
        }
      } catch (e) {
        console.warn("Supabase blog posts fetch notice:", e);
      }
    }
  }

  try {
    const loaded = await readJsonFile<BlogPost[]>("blog_posts.json", [...initialBlogPosts]);
    globalThis.__gs_db_blog_posts = loaded;
    return loaded;
  } catch {
    if (globalThis.__gs_db_blog_posts && globalThis.__gs_db_blog_posts.length > 0) {
      return globalThis.__gs_db_blog_posts;
    }
    return [...initialBlogPosts];
  }
}

export async function saveDbBlogPost(post: Partial<BlogPost>): Promise<BlogPost> {
  const postId = post.id && isUuid(post.id) ? post.id : (post.id || randomUUID());
  const record: any = { ...post, id: postId, updated_at: new Date().toISOString() };
  let saved: BlogPost = record as BlogPost;

  if (isSupabaseConfigured) {
    const client = getDbClient();
    if (client) {
      try {
        const { data, error } = await client
          .from("blog_posts")
          .upsert(record)
          .select()
          .single();
        if (!error && data) saved = data as BlogPost;
      } catch (e) {
        console.warn("Supabase blog post save notice:", e);
      }
    }
  }

  try {
    const list = [...(await getDbBlogPosts())];
    const idx = list.findIndex((p) => p.id === saved.id);
    if (idx !== -1) list[idx] = saved;
    else list.unshift(saved);
    globalThis.__gs_db_blog_posts = list;
    await writeJsonFile("blog_posts.json", list);
  } catch {}

  return saved;
}

export async function deleteDbBlogPost(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    const client = getDbClient();
    if (client) {
      try {
        await client.from("blog_posts").delete().eq("id", id);
      } catch (e) {
        console.warn("Supabase blog post delete notice:", e);
      }
    }
  }

  try {
    const list = [...(await getDbBlogPosts())];
    const filtered = list.filter((p) => p.id !== id);
    globalThis.__gs_db_blog_posts = filtered;
    await writeJsonFile("blog_posts.json", filtered);
  } catch {}

  return true;
}

// =========================================================================
// SITE SETTINGS
// =========================================================================
export async function getDbSiteSettings(): Promise<SiteSettings> {
  if (isSupabaseConfigured) {
    const client = getDbClient();
    if (client) {
      try {
        const { data, error } = await client
          .from("site_settings")
          .select("*")
          .single();

        if (!error && data) {
          globalThis.__gs_db_site_settings = data as SiteSettings;
          return data as SiteSettings;
        }
      } catch (e) {
        console.warn("Supabase site settings fetch notice:", e);
      }
    }
  }

  try {
    const loaded = await readJsonFile<SiteSettings>("site_settings.json", { ...initialSiteSettings });
    globalThis.__gs_db_site_settings = loaded;
    return loaded;
  } catch {
    if (globalThis.__gs_db_site_settings) {
      return globalThis.__gs_db_site_settings;
    }
    return { ...initialSiteSettings };
  }
}

export async function saveDbSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  const current = await getDbSiteSettings();
  const updated: SiteSettings = {
    ...current,
    ...settings,
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured) {
    const client = getDbClient();
    if (client) {
      try {
        const { data, error } = await client
          .from("site_settings")
          .upsert(updated)
          .select()
          .single();

        if (!error && data) {
          globalThis.__gs_db_site_settings = data as SiteSettings;
          await writeJsonFile("site_settings.json", data);
          return data as SiteSettings;
        }
      } catch (e) {
        console.warn("Supabase site settings save notice:", e);
      }
    }
  }

  globalThis.__gs_db_site_settings = updated;
  await writeJsonFile("site_settings.json", updated);
  return updated;
}

// =========================================================================
// INQUIRIES
// =========================================================================
export async function getDbInquiries(): Promise<Inquiry[]> {
  if (isSupabaseConfigured) {
    const client = getDbClient();
    if (client) {
      try {
        const { data, error } = await client
          .from("inquiries")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data) {
          globalThis.__gs_db_inquiries = data as Inquiry[];
          return data as Inquiry[];
        }
      } catch (e) {
        console.warn("Supabase inquiries fetch notice:", e);
      }
    }
  }

  try {
    const loaded = await readJsonFile<Inquiry[]>("inquiries.json", [...initialInquiries]);
    globalThis.__gs_db_inquiries = loaded;
    return loaded;
  } catch {
    if (globalThis.__gs_db_inquiries && globalThis.__gs_db_inquiries.length > 0) {
      return globalThis.__gs_db_inquiries;
    }
    return [...initialInquiries];
  }
}

export async function saveDbInquiry(inquiry: Omit<Inquiry, "id" | "status" | "created_at">): Promise<Inquiry> {
  const newId = randomUUID();
  const newInquiry: Inquiry = {
    id: newId,
    ...inquiry,
    status: "New",
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured) {
    const client = getDbClient();
    if (client) {
      try {
        const { data, error } = await client
          .from("inquiries")
          .insert(newInquiry)
          .select()
          .single();

        if (!error && data) {
          const list = [...(await getDbInquiries())];
          list.unshift(data as Inquiry);
          globalThis.__gs_db_inquiries = list;
          await writeJsonFile("inquiries.json", list);
          return data as Inquiry;
        }
      } catch (e) {
        console.warn("Supabase inquiry insert notice:", e);
      }
    }
  }

  const list = [...(await getDbInquiries())];
  list.unshift(newInquiry);
  globalThis.__gs_db_inquiries = list;
  await writeJsonFile("inquiries.json", list);
  return newInquiry;
}

export async function updateDbInquiryStatus(
  id: string,
  status: any,
  internalNotes?: string
): Promise<boolean> {
  if (isSupabaseConfigured) {
    const client = getDbClient();
    if (client) {
      try {
        const updatePayload: any = { status };
        if (internalNotes !== undefined) updatePayload.internal_notes = internalNotes;
        const { error } = await client.from("inquiries").update(updatePayload).eq("id", id);
        if (!error) {
          const list = [...(await getDbInquiries())];
          const idx = list.findIndex((i) => i.id === id);
          if (idx !== -1) {
            list[idx].status = status;
            if (internalNotes !== undefined) list[idx].internal_notes = internalNotes;
            globalThis.__gs_db_inquiries = list;
            await writeJsonFile("inquiries.json", list);
          }
          return true;
        }
      } catch (e) {
        console.warn("Supabase inquiry status update notice:", e);
      }
    }
  }

  const list = [...(await getDbInquiries())];
  const idx = list.findIndex((i) => i.id === id);
  if (idx !== -1) {
    list[idx].status = status;
    if (internalNotes !== undefined) {
      list[idx].internal_notes = internalNotes;
    }
    globalThis.__gs_db_inquiries = list;
    await writeJsonFile("inquiries.json", list);
    return true;
  }
  return false;
}
