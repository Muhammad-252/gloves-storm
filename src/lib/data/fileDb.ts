import { promises as fs } from "fs";
import path from "path";
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

const DATA_DIR = path.join(process.cwd(), "data");

async function ensureDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {}
}

async function readJsonFile<T>(filename: string, fallback: T): Promise<T> {
  const filePath = path.join(DATA_DIR, filename);
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const parsed = JSON.parse(data);
    return parsed as T;
  } catch {
    // If file doesn't exist, seed it with fallback
    try {
      await ensureDir();
      await fs.writeFile(filePath, JSON.stringify(fallback, null, 2), "utf-8");
    } catch (e) {
      console.warn(`Notice: Could not write fallback for ${filename}:`, e);
    }
    return fallback;
  }
}

async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  const filePath = path.join(DATA_DIR, filename);
  await ensureDir();
  // Write to temporary file first then rename for atomic write
  const tempPath = `${filePath}.tmp.${Date.now()}`;
  await fs.writeFile(tempPath, JSON.stringify(data, null, 2), "utf-8");
  await fs.rename(tempPath, filePath);
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
  return saved;
}

export async function deleteDbCategory(id: string): Promise<boolean> {
  const list = [...(await getDbCategories())];
  const filtered = list.filter((c) => c.id !== id);
  globalThis.__gs_db_categories = filtered;
  await writeJsonFile("categories.json", filtered);
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
  return saved;
}

export async function deleteDbProduct(id: string): Promise<boolean> {
  const list = [...(await getDbProducts())];
  const filtered = list.filter((p) => p.id !== id);
  globalThis.__gs_db_products = filtered;
  await writeJsonFile("products.json", filtered);
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
