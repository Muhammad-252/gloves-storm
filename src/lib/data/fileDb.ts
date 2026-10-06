import { promises as fs } from "fs";
import path from "path";
import os from "os";
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
import { supabase, isSupabaseConfigured } from "../supabase/client";

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
    const tempPath = `${primaryPath}.tmp.${Date.now()}`;
    await fs.writeFile(tempPath, jsonString, "utf-8");
    await fs.rename(tempPath, primaryPath);
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
    const tempPath = `${tmpPath}.tmp.${Date.now()}`;
    await fs.writeFile(tempPath, jsonString, "utf-8");
    await fs.rename(tempPath, tmpPath);
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
  const list = [...(await getDbCategories())];
  let saved: Category;

  if (category.id) {
    const idx = list.findIndex((c) => c.id === category.id);
    if (idx !== -1) {
      saved = {
        ...list[idx],
        ...category,
        updated_at: new Date().toISOString(),
      } as Category;
      list[idx] = saved;
    } else {
      saved = {
        id: category.id,
        name: category.name || "Unnamed Category",
        slug: category.slug || `category-${Date.now()}`,
        description: category.description || null,
        image_url: category.image_url || null,
        parent_id: category.parent_id || null,
        sort_order: category.sort_order ?? list.length + 1,
        is_active: category.is_active ?? true,
        featured_in_menu: category.featured_in_menu ?? true,
        menu_badge: category.menu_badge || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      list.push(saved);
    }
  } else {
    saved = {
      id: `cat-${Date.now()}`,
      name: category.name || "New Category",
      slug: category.slug || `category-${Date.now()}`,
      description: category.description || null,
      image_url: category.image_url || null,
      parent_id: category.parent_id || null,
      sort_order: category.sort_order ?? list.length + 1,
      is_active: category.is_active ?? true,
      featured_in_menu: category.featured_in_menu ?? true,
      menu_badge: category.menu_badge || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    list.push(saved);
  }

  globalThis.__gs_db_categories = list;
  await writeJsonFile("categories.json", list);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from("categories").upsert(saved);
    } catch (e) {
      console.warn("Supabase category sync notice:", e);
    }
  }

  return saved;
}

export async function deleteDbCategory(id: string): Promise<boolean> {
  const list = [...(await getDbCategories())];
  const filtered = list.filter((c) => c.id !== id);
  globalThis.__gs_db_categories = filtered;
  await writeJsonFile("categories.json", filtered);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from("categories").delete().eq("id", id);
    } catch (e) {
      console.warn("Supabase category delete notice:", e);
    }
  }

  return true;
}

// =========================================================================
// PRODUCTS
// =========================================================================
export async function getDbProducts(): Promise<Product[]> {
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
  const list = [...(await getDbProducts())];
  let saved: Product;

  if (product.id) {
    const idx = list.findIndex((p) => p.id === product.id);
    if (idx !== -1) {
      saved = {
        ...list[idx],
        ...product,
        updated_at: new Date().toISOString(),
      } as Product;
      list[idx] = saved;
    } else {
      saved = {
        id: product.id,
        name: product.name || "New Product",
        slug: product.slug || `product-${Date.now()}`,
        category_id: product.category_id || "",
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
        primary_keyword: product.primary_keyword || null,
        secondary_keywords: product.secondary_keywords || null,
        pricing_tiers: product.pricing_tiers || [],
        sample_price: product.sample_price || null,
        show_pricing: product.show_pricing ?? true,
        images: product.images || [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      list.push(saved);
    }
  } else {
    saved = {
      id: `prod-${Date.now()}`,
      name: product.name || "New Product",
      slug: product.slug || `product-${Date.now()}`,
      category_id: product.category_id || "",
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
      primary_keyword: product.primary_keyword || null,
      secondary_keywords: product.secondary_keywords || null,
      pricing_tiers: product.pricing_tiers || [],
      sample_price: product.sample_price || null,
      show_pricing: product.show_pricing ?? true,
      images: product.images || [
        {
          id: `img-${Date.now()}`,
          product_id: `prod-${Date.now()}`,
          image_url:
            "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop",
          alt_text: product.name || "Product Image",
          sort_order: 1,
          is_primary: true,
          created_at: new Date().toISOString(),
        },
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    list.unshift(saved);
  }

  globalThis.__gs_db_products = list;
  await writeJsonFile("products.json", list);

  if (isSupabaseConfigured && supabase) {
    try {
      const { images, ...prodRecord } = saved;
      await supabase.from("products").upsert(prodRecord);
    } catch (e) {
      console.warn("Supabase product sync notice:", e);
    }
  }

  return saved;
}

export async function deleteDbProduct(id: string): Promise<boolean> {
  const list = [...(await getDbProducts())];
  const filtered = list.filter((p) => p.id !== id);
  globalThis.__gs_db_products = filtered;
  await writeJsonFile("products.json", filtered);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from("products").delete().eq("id", id);
    } catch (e) {
      console.warn("Supabase product delete notice:", e);
    }
  }

  return true;
}

// =========================================================================
// PROJECTS
// =========================================================================
export async function getDbProjects(): Promise<Project[]> {
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
  const list = [...(await getDbProjects())];
  let saved: Project;

  if (project.id) {
    const idx = list.findIndex((p) => p.id === project.id);
    if (idx !== -1) {
      saved = {
        ...list[idx],
        ...project,
        updated_at: new Date().toISOString(),
      } as Project;
      list[idx] = saved;
    } else {
      saved = {
        id: project.id,
        title: project.title || "New Project",
        slug: project.slug || `project-${Date.now()}`,
        industry: project.industry || "Apparel & Gear",
        category_id: project.category_id || null,
        description: project.description || "",
        challenge: project.challenge || null,
        approach: project.approach || null,
        solution: project.solution || null,
        outcome: project.outcome || null,
        featured_image: project.featured_image || "/images/products/varsity-jacket.jpg",
        featured: project.featured ?? false,
        is_active: project.is_active ?? true,
        images: project.images || [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      list.push(saved);
    }
  } else {
    saved = {
      id: `proj-${Date.now()}`,
      title: project.title || "New Project",
      slug: project.slug || `project-${Date.now()}`,
      industry: project.industry || "Apparel & Gear",
      category_id: project.category_id || null,
      description: project.description || "",
      challenge: project.challenge || null,
      approach: project.approach || null,
      solution: project.solution || null,
      outcome: project.outcome || null,
      featured_image: project.featured_image || "/images/products/varsity-jacket.jpg",
      featured: project.featured ?? false,
      is_active: project.is_active ?? true,
      images: project.images || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    list.unshift(saved);
  }

  globalThis.__gs_db_projects = list;
  await writeJsonFile("projects.json", list);
  return saved;
}

export async function deleteDbProject(id: string): Promise<boolean> {
  const list = [...(await getDbProjects())];
  const filtered = list.filter((p) => p.id !== id);
  globalThis.__gs_db_projects = filtered;
  await writeJsonFile("projects.json", filtered);
  return true;
}

// =========================================================================
// TESTIMONIALS
// =========================================================================
export async function getDbTestimonials(): Promise<Testimonial[]> {
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
  const list = [...(await getDbTestimonials())];
  let saved: Testimonial;

  if (t.id) {
    const idx = list.findIndex((item) => item.id === t.id);
    if (idx !== -1) {
      saved = { ...list[idx], ...t } as Testimonial;
      list[idx] = saved;
    } else {
      saved = {
        id: t.id,
        client_name: t.client_name || "Client",
        company: t.company || "Company",
        country: t.country || "United States",
        role: t.role || "Founder",
        testimonial: t.testimonial || "",
        photo_url: t.photo_url || null,
        rating: t.rating || 5,
        featured: t.featured ?? true,
        is_active: t.is_active ?? true,
        created_at: new Date().toISOString(),
      };
      list.push(saved);
    }
  } else {
    saved = {
      id: `test-${Date.now()}`,
      client_name: t.client_name || "Client",
      company: t.company || "Company",
      country: t.country || "United States",
      role: t.role || "Founder",
      testimonial: t.testimonial || "",
      photo_url: t.photo_url || null,
      rating: t.rating || 5,
      featured: t.featured ?? true,
      is_active: t.is_active ?? true,
      created_at: new Date().toISOString(),
    };
    list.unshift(saved);
  }

  globalThis.__gs_db_testimonials = list;
  await writeJsonFile("testimonials.json", list);
  return saved;
}

export async function deleteDbTestimonial(id: string): Promise<boolean> {
  const list = [...(await getDbTestimonials())];
  const filtered = list.filter((t) => t.id !== id);
  globalThis.__gs_db_testimonials = filtered;
  await writeJsonFile("testimonials.json", filtered);
  return true;
}

// =========================================================================
// BLOG POSTS
// =========================================================================
export async function getDbBlogPosts(): Promise<BlogPost[]> {
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
  const list = [...(await getDbBlogPosts())];
  let saved: BlogPost;

  if (post.id) {
    const idx = list.findIndex((p) => p.id === post.id);
    if (idx !== -1) {
      saved = {
        ...list[idx],
        ...post,
        updated_at: new Date().toISOString(),
      } as BlogPost;
      list[idx] = saved;
    } else {
      saved = {
        id: post.id,
        title: post.title || "New Article",
        slug: post.slug || `article-${Date.now()}`,
        excerpt: post.excerpt || "",
        content: post.content || "",
        featured_image: post.featured_image || "/images/products/varsity-jacket.jpg",
        category: post.category || "Manufacturing",
        author: post.author || "GLOVES STORM Editorial",
        published_at: post.published_at || new Date().toISOString(),
        is_published: post.is_published ?? true,
        seo_title: post.seo_title || null,
        seo_description: post.seo_description || null,
        social_image: post.social_image || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      list.push(saved);
    }
  } else {
    saved = {
      id: `post-${Date.now()}`,
      title: post.title || "New Article",
      slug: post.slug || `article-${Date.now()}`,
      excerpt: post.excerpt || "",
      content: post.content || "",
      featured_image: post.featured_image || "/images/products/varsity-jacket.jpg",
      category: post.category || "Manufacturing",
      author: post.author || "GLOVES STORM Editorial",
      published_at: post.published_at || new Date().toISOString(),
      is_published: post.is_published ?? true,
      seo_title: post.seo_title || null,
      seo_description: post.seo_description || null,
      social_image: post.social_image || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    list.unshift(saved);
  }

  globalThis.__gs_db_blog_posts = list;
  await writeJsonFile("blog_posts.json", list);
  return saved;
}

export async function deleteDbBlogPost(id: string): Promise<boolean> {
  const list = [...(await getDbBlogPosts())];
  const filtered = list.filter((p) => p.id !== id);
  globalThis.__gs_db_blog_posts = filtered;
  await writeJsonFile("blog_posts.json", filtered);
  return true;
}

// =========================================================================
// SITE SETTINGS
// =========================================================================
export async function getDbSiteSettings(): Promise<SiteSettings> {
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
  globalThis.__gs_db_site_settings = updated;
  await writeJsonFile("site_settings.json", updated);
  return updated;
}

// =========================================================================
// INQUIRIES
// =========================================================================
export async function getDbInquiries(): Promise<Inquiry[]> {
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
  const list = [...(await getDbInquiries())];
  const newInquiry: Inquiry = {
    id: `inq-${Date.now()}`,
    ...inquiry,
    status: "New",
    created_at: new Date().toISOString(),
  };
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
