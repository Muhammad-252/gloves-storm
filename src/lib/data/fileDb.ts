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
import { supabase, supabaseAdmin, isSupabaseConfigured } from "../supabase/client";

const isUuid = (val?: string | null): boolean =>
  Boolean(val && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val));

const getDbClient = () => {
  if (!isSupabaseConfigured) {
    return null;
  }
  return supabaseAdmin || supabase;
};

// =========================================================================
// CATEGORIES (Direct Supabase)
// =========================================================================
export async function getDbCategories(): Promise<Category[]> {
  const client = getDbClient();
  if (!client) {
    console.warn("[fileDb] ⚠️ Supabase is not configured yet. Returning empty categories list.");
    return [];
  }

  const { data, error } = await client
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[fileDb] ❌ Supabase getDbCategories query error:", error);
    return [];
  }

  console.log(`[fileDb] 📥 getDbCategories fetched ${data?.length || 0} categories from Supabase.`);
  return (data as Category[]) || [];
}

export async function saveDbCategory(category: Partial<Category>): Promise<Category> {
  const client = getDbClient();
  if (!client) {
    throw new Error("Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }

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

  const { data, error } = await client
    .from("categories")
    .upsert(dbRecord)
    .select()
    .single();

  if (error || !data) {
    console.error("[fileDb] ❌ Supabase saveDbCategory error:", error);
    throw new Error(error?.message || "Failed to save category in Supabase");
  }

  return data as Category;
}

export async function deleteDbCategory(id: string): Promise<boolean> {
  const client = getDbClient();
  if (!client) {
    throw new Error("Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }

  const { error } = await client.from("categories").delete().eq("id", id);
  if (error) {
    console.error("[fileDb] ❌ Supabase deleteDbCategory error:", error);
    throw new Error(error.message || "Failed to delete category from Supabase");
  }
  return true;
}

// =========================================================================
// PRODUCTS (Direct Supabase)
// =========================================================================
export async function getDbProducts(): Promise<Product[]> {
  const client = getDbClient();
  if (!client) {
    console.warn("[fileDb] ⚠️ Supabase is not configured yet. Returning empty products list.");
    return [];
  }

  const { data, error } = await client
    .from("products")
    .select("*, images:product_images(*), category:categories(*)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[fileDb] ❌ Supabase getDbProducts error:", error);
    return [];
  }

  console.log(`[fileDb] 📥 getDbProducts fetched ${data?.length || 0} products from Supabase.`);
  return (data as Product[]) || [];
}

export async function saveDbProduct(product: Partial<Product>): Promise<Product> {
  const client = getDbClient();
  if (!client) {
    throw new Error("Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }

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

  const { data, error } = await client
    .from("products")
    .upsert(prodRecord)
    .select("*, images:product_images(*), category:categories(*)")
    .single();

  if (error || !data) {
    console.error("Supabase saveDbProduct error:", error);
    throw new Error(error?.message || "Failed to save product in Supabase");
  }

  let saved = data as Product;

  // Sync images to product_images table if provided
  if (Array.isArray(images) && images.length > 0) {
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
  }

  return saved;
}

export async function deleteDbProduct(id: string): Promise<boolean> {
  const client = getDbClient();
  if (!client) {
    throw new Error("Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }

  await client.from("product_images").delete().eq("product_id", id);
  const { error } = await client.from("products").delete().eq("id", id);
  if (error) {
    console.error("Supabase deleteDbProduct error:", error);
    throw new Error(error.message || "Failed to delete product from Supabase");
  }
  return true;
}

// =========================================================================
// PROJECTS (Direct Supabase)
// =========================================================================
export async function getDbProjects(): Promise<Project[]> {
  const client = getDbClient();
  if (!client) {
    console.warn("Supabase is not configured yet. Returning empty projects list.");
    return [];
  }

  const { data, error } = await client
    .from("projects")
    .select("*, images:project_images(*)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase getDbProjects error:", error);
    return [];
  }

  return ((data as Project[]) || []).map((proj) => ({
    ...proj,
    images: Array.isArray(proj.images)
      ? [...proj.images].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
      : [],
  }));
}

export async function saveDbProject(project: Partial<Project>): Promise<Project> {
  const client = getDbClient();
  if (!client) {
    throw new Error("Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }

  const projectId = project.id && isUuid(project.id) ? project.id : (project.id || randomUUID());
  const { images, ...projRecord } = project as any;
  projRecord.id = projectId;
  projRecord.updated_at = new Date().toISOString();

  // Handle partial updates (e.g. toggling featured or is_active) vs full upserts
  const isPartialUpdate = Boolean(project.id && isUuid(project.id) && project.title === undefined);

  const query = isPartialUpdate
    ? client.from("projects").update(projRecord).eq("id", projectId)
    : client.from("projects").upsert(projRecord);

  const { data, error } = await query
    .select("*, images:project_images(*)")
    .single();

  if (error || !data) {
    console.error("Supabase saveDbProject error:", error);
    throw new Error(error?.message || "Failed to save project in Supabase");
  }

  let saved = data as Project;

  // Sync multiple images to project_images table when images array is provided
  if (Array.isArray(images)) {
    await client.from("project_images").delete().eq("project_id", saved.id);

    const seenUrls = new Set<string>();
    const imageRows = images
      .map((img: any, idx: number) => {
        const url = (typeof img === "string" ? img : img?.image_url || "").trim();
        if (!url || seenUrls.has(url)) return null;
        seenUrls.add(url);
        return {
          id: img?.id && isUuid(img.id) ? img.id : randomUUID(),
          project_id: saved.id,
          image_url: url,
          alt_text:
            (typeof img === "object" && img?.alt_text) ||
            `${saved.title} — Photo ${idx + 1}`,
          sort_order:
            typeof img === "object" && typeof img?.sort_order === "number"
              ? img.sort_order
              : idx + 1,
        };
      })
      .filter((row): row is NonNullable<typeof row> => row !== null);

    if (imageRows.length > 0) {
      const { error: imgError } = await client.from("project_images").insert(imageRows);
      if (imgError) {
        console.error("Supabase saveDbProject project_images insert error:", imgError);
      }
    }

    const { data: refreshed } = await client
      .from("projects")
      .select("*, images:project_images(*)")
      .eq("id", saved.id)
      .single();

    if (refreshed) {
      saved = refreshed as Project;
    }
  }

  if (Array.isArray(saved.images)) {
    saved.images = [...saved.images].sort(
      (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
    );
  }

  return saved;
}

export async function deleteDbProject(id: string): Promise<boolean> {
  const client = getDbClient();
  if (!client) {
    throw new Error("Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }

  await client.from("project_images").delete().eq("project_id", id);
  const { error } = await client.from("projects").delete().eq("id", id);
  if (error) {
    console.error("Supabase deleteDbProject error:", error);
    throw new Error(error.message || "Failed to delete project from Supabase");
  }
  return true;
}

// =========================================================================
// TESTIMONIALS (Direct Supabase)
// =========================================================================
export async function getDbTestimonials(): Promise<Testimonial[]> {
  const client = getDbClient();
  if (!client) {
    console.warn("Supabase is not configured yet. Returning empty testimonials list.");
    return [];
  }

  const { data, error } = await client
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase getDbTestimonials error:", error);
    return [];
  }

  return (data as Testimonial[]) || [];
}

export async function saveDbTestimonial(t: Partial<Testimonial>): Promise<Testimonial> {
  const client = getDbClient();
  if (!client) {
    throw new Error("Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }

  const testimonialId = t.id && isUuid(t.id) ? t.id : (t.id || randomUUID());
  const record: any = { ...t, id: testimonialId };

  const { data, error } = await client
    .from("testimonials")
    .upsert(record)
    .select()
    .single();

  if (error || !data) {
    console.error("Supabase saveDbTestimonial error:", error);
    throw new Error(error?.message || "Failed to save testimonial in Supabase");
  }

  return data as Testimonial;
}

export async function deleteDbTestimonial(id: string): Promise<boolean> {
  const client = getDbClient();
  if (!client) {
    throw new Error("Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }

  const { error } = await client.from("testimonials").delete().eq("id", id);
  if (error) {
    console.error("Supabase deleteDbTestimonial error:", error);
    throw new Error(error.message || "Failed to delete testimonial from Supabase");
  }
  return true;
}

// =========================================================================
// BLOG POSTS (Direct Supabase)
// =========================================================================
export async function getDbBlogPosts(): Promise<BlogPost[]> {
  const client = getDbClient();
  if (!client) {
    console.warn("Supabase is not configured yet. Returning empty blog posts list.");
    return [];
  }

  const { data, error } = await client
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Supabase getDbBlogPosts error:", error);
    return [];
  }

  return (data as BlogPost[]) || [];
}

export async function saveDbBlogPost(post: Partial<BlogPost>): Promise<BlogPost> {
  const client = getDbClient();
  if (!client) {
    throw new Error("Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }

  const postId = post.id && isUuid(post.id) ? post.id : (post.id || randomUUID());
  const record: any = { ...post, id: postId, updated_at: new Date().toISOString() };

  const { data, error } = await client
    .from("blog_posts")
    .upsert(record)
    .select()
    .single();

  if (error || !data) {
    console.error("Supabase saveDbBlogPost error:", error);
    throw new Error(error?.message || "Failed to save blog post in Supabase");
  }

  return data as BlogPost;
}

export async function deleteDbBlogPost(id: string): Promise<boolean> {
  const client = getDbClient();
  if (!client) {
    throw new Error("Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }

  const { error } = await client.from("blog_posts").delete().eq("id", id);
  if (error) {
    console.error("Supabase deleteDbBlogPost error:", error);
    throw new Error(error.message || "Failed to delete blog post from Supabase");
  }
  return true;
}

// =========================================================================
// SITE SETTINGS (Direct Supabase)
// =========================================================================
export async function getDbSiteSettings(): Promise<SiteSettings> {
  const defaultSettings: SiteSettings = {
    id: "default",
    company_name: "GLOVES STORM",
    email: "glovesstorm@gmail.com",
    phone: "+923417146935",
    whatsapp: "+923417146935",
    address: "Industrial Estate, Sialkot 51310, Punjab, Pakistan",
    instagram: "https://www.instagram.com/glovesstorm/",
    facebook: "https://facebook.com/glovesstorm",
    linkedin: "https://www.linkedin.com/company/gloves-storm/",
    youtube: "https://youtube.com/@glovesstorm",
    logo_url: null,
    favicon_url: null,
    hero_title: "BUILT FOR BRANDS. MADE TO PERFORM.",
    hero_description: "Custom boxing gear, sportswear and apparel manufactured for brands worldwide.",
    instagram_access_token: null,
    instagram_feed_mode: "api",
    instagram_widget_code: null,
    updated_at: new Date().toISOString(),
  };

  const client = getDbClient();
  if (!client) {
    return defaultSettings;
  }

  const { data, error } = await client
    .from("site_settings")
    .select("*")
    .single();

  if (error || !data) {
    return defaultSettings;
  }

  return data as SiteSettings;
}

export async function saveDbSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  const client = getDbClient();
  if (!client) {
    throw new Error("Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }

  const current = await getDbSiteSettings();
  const updated: SiteSettings = {
    ...current,
    ...settings,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await client
    .from("site_settings")
    .upsert(updated)
    .select()
    .single();

  if (error || !data) {
    console.error("Supabase saveDbSiteSettings error:", error);
    throw new Error(error?.message || "Failed to save site settings in Supabase");
  }

  return data as SiteSettings;
}

// =========================================================================
// INQUIRIES (Direct Supabase)
// =========================================================================
export async function getDbInquiries(): Promise<Inquiry[]> {
  const client = getDbClient();
  if (!client) {
    console.warn("Supabase is not configured yet. Returning empty inquiries list.");
    return [];
  }

  const { data, error } = await client
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase getDbInquiries error:", error);
    return [];
  }

  return (data as Inquiry[]) || [];
}

export async function saveDbInquiry(inquiry: Omit<Inquiry, "id" | "status" | "created_at">): Promise<Inquiry> {
  const client = getDbClient();
  if (!client) {
    throw new Error("Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }

  const newInquiry: Inquiry = {
    id: randomUUID(),
    ...inquiry,
    status: "New",
    created_at: new Date().toISOString(),
  };

  const { data, error } = await client
    .from("inquiries")
    .insert(newInquiry)
    .select()
    .single();

  if (error || !data) {
    console.error("Supabase saveDbInquiry error:", error);
    throw new Error(error?.message || "Failed to save inquiry in Supabase");
  }

  return data as Inquiry;
}

export async function updateDbInquiryStatus(
  id: string,
  status: any,
  internalNotes?: string
): Promise<boolean> {
  const client = getDbClient();
  if (!client) {
    throw new Error("Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }

  const updatePayload: any = { status };
  if (internalNotes !== undefined) updatePayload.internal_notes = internalNotes;

  const { error } = await client.from("inquiries").update(updatePayload).eq("id", id);
  if (error) {
    console.error("Supabase updateDbInquiryStatus error:", error);
    throw new Error(error.message || "Failed to update inquiry status in Supabase");
  }
  return true;
}
