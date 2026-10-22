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

  let { data, error } = await client
    .from("categories")
    .upsert(dbRecord)
    .select()
    .single();

  if (error && (error.message?.includes("featured_in_menu") || error.message?.includes("menu_badge") || error.message?.includes("schema cache"))) {
    console.warn("[fileDb] ⚠️ Optional columns missing in Supabase schema. Retrying without featured_in_menu / menu_badge.");
    delete dbRecord.featured_in_menu;
    delete dbRecord.menu_badge;
    const retry = await client
      .from("categories")
      .upsert(dbRecord)
      .select()
      .single();
    data = retry.data;
    error = retry.error;
  }

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
  return ((data as any[]) || []).map((p) => {
    const custom =
      typeof p.customization_options === "object" &&
      p.customization_options !== null &&
      !Array.isArray(p.customization_options)
        ? p.customization_options
        : {};
    return {
      ...p,
      images: Array.isArray(p.images)
        ? [...p.images].sort((a, b) => {
            if (a.is_primary && !b.is_primary) return -1;
            if (!a.is_primary && b.is_primary) return 1;
            return (a.sort_order ?? 0) - (b.sort_order ?? 0);
          })
        : [],
      pricing_tiers: p.pricing_tiers ?? custom.pricing_tiers ?? [],
      sample_price: p.sample_price ?? custom.sample_price ?? null,
      show_pricing: p.show_pricing ?? custom.show_pricing ?? true,
      primary_keyword: p.primary_keyword ?? custom.primary_keyword ?? null,
      secondary_keywords: p.secondary_keywords ?? custom.secondary_keywords ?? null,
      image_alt_texts: p.image_alt_texts ?? custom.image_alt_texts ?? [],
      available_sizes: p.available_sizes ?? custom.available_sizes ?? [],
    } as Product;
  });
}

export async function saveDbProduct(product: Partial<Product>): Promise<Product> {
  const client = getDbClient();
  if (!client) {
    throw new Error("Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }

  const productId = product.id && isUuid(product.id) ? product.id : (product.id || randomUUID());
  const { images, category: joinedCategory, ...productFields } = product as any;

  // Handle partial updates (e.g. toggling featured or is_active from admin table) vs full upserts
  const isPartialUpdate = Boolean(product.id && isUuid(product.id) && product.name === undefined);

  let prodRecord: any;

  if (isPartialUpdate) {
    prodRecord = {
      ...productFields,
      id: productId,
      updated_at: new Date().toISOString(),
    };
    if (prodRecord.category_id && !isUuid(prodRecord.category_id)) {
      delete prodRecord.category_id;
    }
  } else {
    // Preserve existing customization object properties or merge
    const customBase =
      typeof product.customization_options === "object" &&
      product.customization_options !== null &&
      !Array.isArray(product.customization_options)
        ? product.customization_options
        : {
            list: Array.isArray(product.customization_options)
              ? product.customization_options
              : typeof product.customization_options === "string"
              ? product.customization_options.split("\n").map((s: string) => s.trim()).filter(Boolean)
              : [],
          };

    const mergedCustomization: any = {
      ...customBase,
      pricing_tiers: product.pricing_tiers || customBase.pricing_tiers || [],
      sample_price: product.sample_price ?? customBase.sample_price ?? null,
      show_pricing: product.show_pricing ?? customBase.show_pricing ?? true,
      primary_keyword: product.primary_keyword ?? customBase.primary_keyword ?? null,
      secondary_keywords: product.secondary_keywords ?? customBase.secondary_keywords ?? null,
      image_alt_texts: (product as any).image_alt_texts ?? customBase.image_alt_texts ?? [],
      available_sizes: product.available_sizes || customBase.available_sizes || [],
    };

    prodRecord = {
      id: productId,
      name: product.name || "New Product",
      slug: product.slug || `product-${Date.now()}`,
      category_id: product.category_id && isUuid(product.category_id) ? product.category_id : null,
      short_description: product.short_description || "",
      description: product.description || "",
      materials: product.materials || [],
      features: product.features || [],
      customization_options: mergedCustomization,
      moq: product.moq || 50,
      lead_time: product.lead_time || "2-4 Weeks",
      featured: product.featured ?? false,
      is_active: product.is_active ?? true,
      seo_title: product.seo_title || null,
      seo_description: product.seo_description || null,
      updated_at: new Date().toISOString(),
    };
  }

  const query = isPartialUpdate
    ? client.from("products").update(prodRecord).eq("id", productId)
    : client.from("products").upsert(prodRecord);

  const { data, error } = await query
    .select("*, images:product_images(*), category:categories(*)")
    .single();

  if (error || !data) {
    console.error("Supabase saveDbProduct error:", error);
    throw new Error(error?.message || "Failed to save product in Supabase");
  }

  const savedCustom =
    typeof data.customization_options === "object" &&
    data.customization_options !== null &&
    !Array.isArray(data.customization_options)
      ? data.customization_options
      : {};

  let saved: Product = {
    ...data,
    pricing_tiers: data.pricing_tiers ?? savedCustom.pricing_tiers ?? product.pricing_tiers ?? [],
    sample_price: data.sample_price ?? savedCustom.sample_price ?? product.sample_price ?? null,
    show_pricing: data.show_pricing ?? savedCustom.show_pricing ?? product.show_pricing ?? true,
    primary_keyword: data.primary_keyword ?? savedCustom.primary_keyword ?? product.primary_keyword ?? null,
    secondary_keywords: data.secondary_keywords ?? savedCustom.secondary_keywords ?? product.secondary_keywords ?? null,
    image_alt_texts: data.image_alt_texts ?? savedCustom.image_alt_texts ?? (product as any).image_alt_texts ?? [],
    available_sizes: data.available_sizes ?? savedCustom.available_sizes ?? product.available_sizes ?? [],
  } as Product;

  // Fully sync multiple images to product_images table when images array is provided
  if (Array.isArray(images)) {
    // 1. Delete previous images for this product so removed images are actually deleted
    const { error: delError } = await client
      .from("product_images")
      .delete()
      .eq("product_id", saved.id);

    if (delError) {
      console.error("[fileDb] ❌ Supabase product_images delete error:", delError);
    }

    // 2. Map and deduplicate new image rows
    const seenUrls = new Set<string>();
    const imageRows = images
      .map((img: any, idx: number) => {
        const url = (typeof img === "string" ? img : img?.image_url || "").trim();
        if (!url || seenUrls.has(url)) return null;
        seenUrls.add(url);
        return {
          id: img?.id && isUuid(img.id) ? img.id : randomUUID(),
          product_id: saved.id,
          image_url: url,
          alt_text:
            (typeof img === "object" && img?.alt_text) ||
            `${saved.name} — Photo ${idx + 1}`,
          sort_order:
            typeof img === "object" && typeof img?.sort_order === "number"
              ? img.sort_order
              : idx + 1,
          is_primary:
            typeof img === "object" && typeof img?.is_primary === "boolean"
              ? img.is_primary
              : idx === 0,
        };
      })
      .filter((row): row is NonNullable<typeof row> => row !== null);

    // If images exist and none is marked primary, make the first one primary
    if (imageRows.length > 0 && !imageRows.some((r) => r.is_primary)) {
      imageRows[0].is_primary = true;
    }

    // 3. Insert fresh image rows
    if (imageRows.length > 0) {
      const { error: imgError } = await client
        .from("product_images")
        .insert(imageRows);

      if (imgError) {
        console.error("[fileDb] ❌ Supabase saveDbProduct product_images insert error:", imgError);
      }
    }

    // 4. Refetch product with fresh images from DB
    const { data: refreshed } = await client
      .from("products")
      .select("*, images:product_images(*), category:categories(*)")
      .eq("id", saved.id)
      .single();

    if (refreshed) {
      const refreshedCustom =
        typeof refreshed.customization_options === "object" &&
        refreshed.customization_options !== null &&
        !Array.isArray(refreshed.customization_options)
          ? refreshed.customization_options
          : {};
      saved = {
        ...refreshed,
        pricing_tiers: refreshed.pricing_tiers ?? refreshedCustom.pricing_tiers ?? saved.pricing_tiers ?? [],
        sample_price: refreshed.sample_price ?? refreshedCustom.sample_price ?? saved.sample_price ?? null,
        show_pricing: refreshed.show_pricing ?? refreshedCustom.show_pricing ?? saved.show_pricing ?? true,
        primary_keyword: refreshed.primary_keyword ?? refreshedCustom.primary_keyword ?? saved.primary_keyword ?? null,
        secondary_keywords: refreshed.secondary_keywords ?? refreshedCustom.secondary_keywords ?? saved.secondary_keywords ?? null,
        image_alt_texts: refreshed.image_alt_texts ?? refreshedCustom.image_alt_texts ?? (saved as any).image_alt_texts ?? [],
        available_sizes: refreshed.available_sizes ?? refreshedCustom.available_sizes ?? saved.available_sizes ?? [],
      } as Product;
    }
  }

  // Ensure images are sorted with primary first, then sort_order
  if (Array.isArray(saved.images)) {
    saved.images = [...saved.images].sort((a, b) => {
      if (a.is_primary && !b.is_primary) return -1;
      if (!a.is_primary && b.is_primary) return 1;
      return (a.sort_order ?? 0) - (b.sort_order ?? 0);
    });
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
