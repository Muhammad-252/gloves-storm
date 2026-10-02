import {
  Category,
  Product,
  Project,
  Testimonial,
  BlogPost,
  Inquiry,
  SiteSettings,
  InquiryStatus,
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

// In-memory fallback state
let memoryCategories: Category[] = [...initialCategories];
let memoryProducts: Product[] = [...initialProducts];
let memoryProjects: Project[] = [...initialProjects];
let memoryTestimonials: Testimonial[] = [...initialTestimonials];
let memoryBlogPosts: BlogPost[] = [...initialBlogPosts];
let memorySiteSettings: SiteSettings = { ...initialSiteSettings };
let memoryInquiries: Inquiry[] = [...initialInquiries];

export function setMemoryCategories(cats: Category[]) {
  memoryCategories = cats;
}

export function getMemoryCategories(): Category[] {
  return memoryCategories;
}

// ==========================================
// CATEGORIES
// ==========================================
export async function getCategories(): Promise<Category[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (!error && data && data.length > 0) return data as Category[];
    } catch {
      // Supabase unavailable, fallback to memory
    }
  }
  return memoryCategories.filter((c) => c.is_active);
}

export async function getAllCategoriesAdmin(): Promise<Category[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("sort_order", { ascending: true });
      if (!error && data && data.length > 0) return data as Category[];
    } catch {
      // Supabase unavailable, fallback to memory
    }
  }
  return memoryCategories;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("slug", slug)
      .single();
    if (!error && data) return data as Category;
  }
  return memoryCategories.find((c) => c.slug === slug) || null;
}

export async function saveCategory(category: Partial<Category>): Promise<Category> {
  if (isSupabaseConfigured && supabase) {
    if (category.id) {
      const { data, error } = await supabase
        .from("categories")
        .update({ ...category, updated_at: new Date().toISOString() })
        .eq("id", category.id)
        .select()
        .single();
      if (!error && data) return data as Category;
    } else {
      const { data, error } = await supabase
        .from("categories")
        .insert([{ ...category, is_active: true }])
        .select()
        .single();
      if (!error && data) return data as Category;
    }
  }

  // Fallback
  if (category.id) {
    const index = memoryCategories.findIndex((c) => c.id === category.id);
    if (index !== -1) {
      memoryCategories[index] = {
        ...memoryCategories[index],
        ...category,
        updated_at: new Date().toISOString(),
      } as Category;
      return memoryCategories[index];
    }
  }

  const newCat: Category = {
    id: `c-local-${Date.now()}`,
    name: category.name || "New Category",
    slug: category.slug || `category-${Date.now()}`,
    description: category.description || null,
    image_url: category.image_url || null,
    parent_id: category.parent_id || null,
    sort_order: category.sort_order || memoryCategories.length + 1,
    is_active: category.is_active ?? true,
    featured_in_menu: category.featured_in_menu ?? true,
    menu_badge: category.menu_badge || null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  memoryCategories.push(newCat);
  return newCat;
}

export async function deleteCategory(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (!error) return true;
  }
  memoryCategories = memoryCategories.filter((c) => c.id !== id);
  return true;
}

// ==========================================
// PRODUCTS
// ==========================================
export async function getProducts(options?: {
  categoryId?: string;
  categorySlug?: string;
  featured?: boolean;
  search?: string;
}): Promise<Product[]> {
  let products = [...memoryProducts];

  if (isSupabaseConfigured && supabase) {
    let query = supabase
      .from("products")
      .select("*, images:product_images(*), category:categories(*)")
      .eq("is_active", true);

    if (options?.featured) {
      query = query.eq("featured", true);
    }
    if (options?.categoryId) {
      query = query.eq("category_id", options.categoryId);
    }

    const { data, error } = await query.order("created_at", { ascending: false });
    if (!error && data) {
      products = data as Product[];
    }
  }

  // Filter in memory if needed
  if (options?.featured) {
    products = products.filter((p) => p.featured && p.is_active);
  }
  if (options?.categoryId) {
    products = products.filter((p) => p.category_id === options.categoryId && p.is_active);
  }
  if (options?.categorySlug) {
    const cat = memoryCategories.find((c) => c.slug === options.categorySlug);
    if (cat) {
      products = products.filter((p) => p.category_id === cat.id && p.is_active);
    }
  }
  if (options?.search) {
    const q = options.search.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.short_description && p.short_description.toLowerCase().includes(q))
    );
  }

  return products.filter((p) => p.is_active);
}

export async function getAllProductsAdmin(): Promise<Product[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("products")
      .select("*, images:product_images(*), category:categories(*)")
      .order("created_at", { ascending: false });
    if (!error && data) return data as Product[];
  }
  return memoryProducts;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("products")
      .select("*, images:product_images(*), category:categories(*)")
      .eq("slug", slug)
      .single();
    if (!error && data) return data as Product;
  }
  return memoryProducts.find((p) => p.slug === slug) || null;
}

export async function saveProduct(product: Partial<Product>): Promise<Product> {
  if (isSupabaseConfigured && supabase) {
    if (product.id) {
      const { data, error } = await supabase
        .from("products")
        .update({
          name: product.name,
          slug: product.slug,
          category_id: product.category_id,
          short_description: product.short_description,
          description: product.description,
          materials: product.materials,
          features: product.features,
          customization_options: product.customization_options,
          moq: product.moq,
          lead_time: product.lead_time,
          featured: product.featured,
          is_active: product.is_active,
          seo_title: product.seo_title,
          seo_description: product.seo_description,
          pricing_tiers: product.pricing_tiers || [],
          sample_price: product.sample_price,
          show_pricing: product.show_pricing ?? true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", product.id)
        .select("*, images:product_images(*)")
        .single();
      if (!error && data) return data as Product;
    } else {
      const { data, error } = await supabase
        .from("products")
        .insert([
          {
            name: product.name,
            slug: product.slug,
            category_id: product.category_id,
            short_description: product.short_description,
            description: product.description,
            materials: product.materials || [],
            features: product.features || [],
            customization_options: product.customization_options || [],
            moq: product.moq || 50,
            lead_time: product.lead_time || "2-4 Weeks",
            featured: product.featured ?? false,
            is_active: product.is_active ?? true,
            seo_title: product.seo_title,
            seo_description: product.seo_description,
            pricing_tiers: product.pricing_tiers || [],
            sample_price: product.sample_price,
            show_pricing: product.show_pricing ?? true,
          },
        ])
        .select()
        .single();
      if (!error && data) return data as Product;
    }
  }

  // Local fallback
  if (product.id) {
    const idx = memoryProducts.findIndex((p) => p.id === product.id);
    if (idx !== -1) {
      memoryProducts[idx] = {
        ...memoryProducts[idx],
        ...product,
        updated_at: new Date().toISOString(),
      } as Product;
      return memoryProducts[idx];
    }
  }

  const newProd: Product = {
    id: `prod-local-${Date.now()}`,
    name: product.name || "New Product",
    slug: product.slug || `product-${Date.now()}`,
    category_id: product.category_id || memoryCategories[0]?.id || "",
    short_description: product.short_description || "",
    description: product.description || "",
    materials: product.materials || [],
    features: product.features || [],
    customization_options: product.customization_options || [],
    moq: product.moq || 50,
    lead_time: product.lead_time || "3-4 Weeks",
    featured: product.featured ?? false,
    is_active: product.is_active ?? true,
    seo_title: product.seo_title || null,
    seo_description: product.seo_description || null,
    pricing_tiers: product.pricing_tiers || [],
    sample_price: product.sample_price || null,
    show_pricing: product.show_pricing ?? true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: product.images || [
      {
        id: `img-${Date.now()}`,
        product_id: `prod-local-${Date.now()}`,
        image_url:
          "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop",
        alt_text: product.name || "Product Image",
        sort_order: 1,
        is_primary: true,
        created_at: new Date().toISOString(),
      },
    ],
  };
  memoryProducts.push(newProd);
  return newProd;
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) return true;
  }
  memoryProducts = memoryProducts.filter((p) => p.id !== id);
  return true;
}

// ==========================================
// PROJECTS / CASE STUDIES
// ==========================================
export async function getProjects(featuredOnly?: boolean): Promise<Project[]> {
  if (isSupabaseConfigured && supabase) {
    let query = supabase.from("projects").select("*, images:project_images(*)").eq("is_active", true);
    if (featuredOnly) query = query.eq("featured", true);
    const { data, error } = await query.order("created_at", { ascending: false });
    if (!error && data) return data as Project[];
  }
  return memoryProjects.filter((p) => (featuredOnly ? p.featured && p.is_active : p.is_active));
}

export async function getAllProjectsAdmin(): Promise<Project[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("projects")
      .select("*, images:project_images(*)")
      .order("created_at", { ascending: false });
    if (!error && data) return data as Project[];
  }
  return memoryProjects;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("projects")
      .select("*, images:project_images(*)")
      .eq("slug", slug)
      .single();
    if (!error && data) return data as Project;
  }
  return memoryProjects.find((p) => p.slug === slug) || null;
}

export async function saveProject(project: Partial<Project>): Promise<Project> {
  if (isSupabaseConfigured && supabase) {
    if (project.id) {
      const { data, error } = await supabase
        .from("projects")
        .update({ ...project, updated_at: new Date().toISOString() })
        .eq("id", project.id)
        .select()
        .single();
      if (!error && data) return data as Project;
    } else {
      const { data, error } = await supabase
        .from("projects")
        .insert([project])
        .select()
        .single();
      if (!error && data) return data as Project;
    }
  }

  if (project.id) {
    const idx = memoryProjects.findIndex((p) => p.id === project.id);
    if (idx !== -1) {
      memoryProjects[idx] = {
        ...memoryProjects[idx],
        ...project,
        updated_at: new Date().toISOString(),
      } as Project;
      return memoryProjects[idx];
    }
  }

  const firstImg = project.images?.[0];
  const firstImgUrl = typeof firstImg === "string" ? firstImg : firstImg?.image_url;

  const newProj: Project = {
    id: `pr-local-${Date.now()}`,
    title: project.title || "New Project",
    slug: project.slug || `project-${Date.now()}`,
    industry: project.industry || "Combat & Sportswear",
    category_id: project.category_id || null,
    description: project.description || "",
    challenge: project.challenge || null,
    approach: project.approach || null,
    solution: project.solution || null,
    outcome: project.outcome || null,
    featured_image:
      project.featured_image ||
      firstImgUrl ||
      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop",
    featured: project.featured ?? false,
    is_active: project.is_active ?? true,
    images: project.images || [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  memoryProjects.push(newProj);
  return newProj;
}

export async function deleteProject(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (!error) return true;
  }
  memoryProjects = memoryProjects.filter((p) => p.id !== id);
  return true;
}

// ==========================================
// TESTIMONIALS
// ==========================================
export async function getTestimonials(featuredOnly?: boolean): Promise<Testimonial[]> {
  if (isSupabaseConfigured && supabase) {
    let query = supabase.from("testimonials").select("*").eq("is_active", true);
    if (featuredOnly) query = query.eq("featured", true);
    const { data, error } = await query.order("created_at", { ascending: false });
    if (!error && data) return data as Testimonial[];
  }
  return memoryTestimonials.filter((t) =>
    featuredOnly ? t.featured && t.is_active : t.is_active
  );
}

export async function getAllTestimonialsAdmin(): Promise<Testimonial[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) return data as Testimonial[];
  }
  return memoryTestimonials;
}

export async function saveTestimonial(t: Partial<Testimonial>): Promise<Testimonial> {
  if (isSupabaseConfigured && supabase) {
    if (t.id) {
      const { data, error } = await supabase
        .from("testimonials")
        .update(t)
        .eq("id", t.id)
        .select()
        .single();
      if (!error && data) return data as Testimonial;
    } else {
      const { data, error } = await supabase
        .from("testimonials")
        .insert([t])
        .select()
        .single();
      if (!error && data) return data as Testimonial;
    }
  }

  if (t.id) {
    const idx = memoryTestimonials.findIndex((item) => item.id === t.id);
    if (idx !== -1) {
      memoryTestimonials[idx] = { ...memoryTestimonials[idx], ...t } as Testimonial;
      return memoryTestimonials[idx];
    }
  }

  const newTestimonial: Testimonial = {
    id: `t-local-${Date.now()}`,
    client_name: t.client_name || "Client Name",
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
  memoryTestimonials.push(newTestimonial);
  return newTestimonial;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (!error) return true;
  }
  memoryTestimonials = memoryTestimonials.filter((item) => item.id !== id);
  return true;
}

// ==========================================
// BLOG / JOURNAL
// ==========================================
export async function getBlogPosts(): Promise<BlogPost[]> {
  let posts: BlogPost[] = [];
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false });
    if (!error && data && data.length > 0) {
      posts = data as BlogPost[];
    }
  }

  const publishedMemory = memoryBlogPosts.filter((b) => b.is_published);
  if (posts.length === 0) {
    return publishedMemory;
  }

  const existingSlugs = new Set(posts.map((p) => p.slug));
  for (const p of publishedMemory) {
    if (!existingSlugs.has(p.slug)) {
      posts.push(p);
    }
  }

  return posts;
}

export async function getAllBlogPostsAdmin(): Promise<BlogPost[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) return data as BlogPost[];
  }
  return memoryBlogPosts;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .single();
    if (!error && data) return data as BlogPost;
  }
  return memoryBlogPosts.find((b) => b.slug === slug) || null;
}

export async function saveBlogPost(post: Partial<BlogPost>): Promise<BlogPost> {
  if (isSupabaseConfigured && supabase) {
    if (post.id) {
      const { data, error } = await supabase
        .from("blog_posts")
        .update({ ...post, updated_at: new Date().toISOString() })
        .eq("id", post.id)
        .select()
        .single();
      if (!error && data) return data as BlogPost;
    } else {
      const { data, error } = await supabase
        .from("blog_posts")
        .insert([post])
        .select()
        .single();
      if (!error && data) return data as BlogPost;
    }
  }

  if (post.id) {
    const idx = memoryBlogPosts.findIndex((b) => b.id === post.id);
    if (idx !== -1) {
      memoryBlogPosts[idx] = {
        ...memoryBlogPosts[idx],
        ...post,
        updated_at: new Date().toISOString(),
      } as BlogPost;
      return memoryBlogPosts[idx];
    }
  }

  const newPost: BlogPost = {
    id: `b-local-${Date.now()}`,
    title: post.title || "New Article",
    slug: post.slug || `article-${Date.now()}`,
    excerpt: post.excerpt || "",
    content: post.content || "",
    featured_image:
      post.featured_image ||
      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop",
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
  memoryBlogPosts.push(newPost);
  return newPost;
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (!error) return true;
  }
  memoryBlogPosts = memoryBlogPosts.filter((b) => b.id !== id);
  return true;
}

// ==========================================
// INQUIRIES
// ==========================================
export async function createInquiry(
  inquiryData: Omit<Inquiry, "id" | "status" | "created_at">
): Promise<Inquiry> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("inquiries")
      .insert([
        {
          ...inquiryData,
          status: "New",
        },
      ])
      .select()
      .single();
    if (!error && data) return data as Inquiry;
  }

  const newInquiry: Inquiry = {
    id: `in-local-${Date.now()}`,
    ...inquiryData,
    status: "New",
    created_at: new Date().toISOString(),
  };
  memoryInquiries.unshift(newInquiry);
  return newInquiry;
}

export async function getInquiries(): Promise<Inquiry[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) return data as Inquiry[];
  }
  return memoryInquiries;
}

export async function updateInquiryStatus(
  id: string,
  status: InquiryStatus,
  internalNotes?: string
): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const updatePayload: Record<string, unknown> = { status };
    if (internalNotes !== undefined) updatePayload.internal_notes = internalNotes;
    const { error } = await supabase.from("inquiries").update(updatePayload).eq("id", id);
    if (!error) return true;
  }

  const idx = memoryInquiries.findIndex((i) => i.id === id);
  if (idx !== -1) {
    memoryInquiries[idx].status = status;
    if (internalNotes !== undefined) {
      memoryInquiries[idx].internal_notes = internalNotes;
    }
    return true;
  }
  return false;
}

// ==========================================
// SITE SETTINGS
// ==========================================
export async function getSiteSettings(): Promise<SiteSettings> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from("site_settings").select("*").single();
    if (!error && data) return data as SiteSettings;
  }
  return memorySiteSettings;
}

export async function saveSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("site_settings")
      .update({ ...settings, updated_at: new Date().toISOString() })
      .eq("id", memorySiteSettings.id)
      .select()
      .single();
    if (!error && data) return data as SiteSettings;
  }

  memorySiteSettings = {
    ...memorySiteSettings,
    ...settings,
    updated_at: new Date().toISOString(),
  };
  return memorySiteSettings;
}
