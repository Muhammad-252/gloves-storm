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
  getDbCategories,
  saveDbCategory,
  deleteDbCategory,
  getDbProducts,
  saveDbProduct,
  deleteDbProduct,
  getDbProjects,
  saveDbProject,
  deleteDbProject,
  getDbTestimonials,
  saveDbTestimonial,
  deleteDbTestimonial,
  getDbBlogPosts,
  saveDbBlogPost,
  deleteDbBlogPost,
  getDbSiteSettings,
  saveDbSiteSettings,
  getDbInquiries,
  saveDbInquiry,
  updateDbInquiryStatus,
} from "./fileDb";

// Compatibility stubs
export function setMemoryCategories(_cats: Category[]) {}
export function getMemoryCategories(): Category[] {
  return [];
}

// ==========================================
// CATEGORIES (Direct Supabase)
// ==========================================
export async function getCategories(): Promise<Category[]> {
  if (typeof window !== "undefined") {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (data?.categories) {
        return (data.categories as Category[]).filter((c) => c.is_active);
      }
    } catch {}
    return [];
  }

  const categories = await getDbCategories();
  return categories.filter((c) => c.is_active);
}

export async function getAllCategoriesAdmin(): Promise<Category[]> {
  if (typeof window !== "undefined") {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (data?.categories) return data.categories as Category[];
    } catch {}
    return [];
  }
  return getDbCategories();
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) || null;
}

export async function saveCategory(category: Partial<Category>): Promise<Category> {
  if (typeof window !== "undefined") {
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || "Failed to save category");
    }
    return data.category;
  }
  return saveDbCategory(category);
}

export async function deleteCategory(id: string): Promise<boolean> {
  if (typeof window !== "undefined") {
    const res = await fetch(`/api/categories?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return Boolean(data.success);
  }
  return deleteDbCategory(id);
}

// ==========================================
// PRODUCTS (Direct Supabase)
// ==========================================
export async function getProducts(options?: {
  categoryId?: string;
  categorySlug?: string;
  featured?: boolean;
  search?: string;
}): Promise<Product[]> {
  let products = await getDbProducts();

  if (options?.featured) {
    products = products.filter((p) => p.featured && p.is_active);
  }
  if (options?.categoryId && options.categoryId !== "all") {
    products = products.filter((p) => p.category_id === options.categoryId && p.is_active);
  }
  if (options?.categorySlug && options.categorySlug !== "all") {
    const cats = await getDbCategories();
    const cat = cats.find((c: Category) => c.slug === options.categorySlug);
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
  return getDbProducts();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getDbProducts();
  return products.find((p) => p.slug === slug) || null;
}

export async function saveProduct(product: Partial<Product>): Promise<Product> {
  if (typeof window !== "undefined") {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || "Failed to save product");
    }
    return data.product;
  }

  return saveDbProduct(product);
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (typeof window !== "undefined") {
    const res = await fetch(`/api/products?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return Boolean(data.success);
  }

  return deleteDbProduct(id);
}

// ==========================================
// PROJECTS / CASE STUDIES (Direct Supabase)
// ==========================================
export async function getProjects(featuredOnly?: boolean): Promise<Project[]> {
  const projects = await getDbProjects();
  return projects.filter((p) => (featuredOnly ? p.featured && p.is_active : p.is_active));
}

export async function getAllProjectsAdmin(): Promise<Project[]> {
  return getDbProjects();
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getDbProjects();
  return projects.find((p) => p.slug === slug) || null;
}

export async function saveProject(project: Partial<Project>): Promise<Project> {
  if (typeof window !== "undefined") {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ project }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.error || "Failed to save project");
    return data.project;
  }
  return saveDbProject(project);
}

export async function deleteProject(id: string): Promise<boolean> {
  if (typeof window !== "undefined") {
    const res = await fetch(`/api/projects?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    const data = await res.json();
    return Boolean(data.success);
  }
  return deleteDbProject(id);
}

// ==========================================
// TESTIMONIALS (Direct Supabase)
// ==========================================
export async function getTestimonials(featuredOnly?: boolean): Promise<Testimonial[]> {
  const testimonials = await getDbTestimonials();
  return testimonials.filter((t) => (featuredOnly ? t.featured && t.is_active : t.is_active));
}

export async function getAllTestimonialsAdmin(): Promise<Testimonial[]> {
  return getDbTestimonials();
}

export async function saveTestimonial(t: Partial<Testimonial>): Promise<Testimonial> {
  if (typeof window !== "undefined") {
    const res = await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ testimonial: t }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.error || "Failed to save testimonial");
    return data.testimonial;
  }
  return saveDbTestimonial(t);
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  if (typeof window !== "undefined") {
    const res = await fetch(`/api/testimonials?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    const data = await res.json();
    return Boolean(data.success);
  }
  return deleteDbTestimonial(id);
}

// ==========================================
// BLOG / JOURNAL (Direct Supabase)
// ==========================================
export async function getBlogPosts(): Promise<BlogPost[]> {
  const posts = await getDbBlogPosts();
  return posts.filter((b) => b.is_published);
}

export async function getAllBlogPostsAdmin(): Promise<BlogPost[]> {
  return getDbBlogPosts();
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getDbBlogPosts();
  return posts.find((b) => b.slug === slug) || null;
}

export async function saveBlogPost(post: Partial<BlogPost>): Promise<BlogPost> {
  if (typeof window !== "undefined") {
    const res = await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.error || "Failed to save blog post");
    return data.post;
  }
  return saveDbBlogPost(post);
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  if (typeof window !== "undefined") {
    const res = await fetch(`/api/blog?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    const data = await res.json();
    return Boolean(data.success);
  }
  return deleteDbBlogPost(id);
}

// ==========================================
// INQUIRIES (Direct Supabase)
// ==========================================
export async function createInquiry(
  inquiryData: Omit<Inquiry, "id" | "status" | "created_at">
): Promise<Inquiry> {
  if (typeof window !== "undefined") {
    const res = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inquiry: inquiryData }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.error || "Failed to submit inquiry");
    return data.inquiry;
  }
  return saveDbInquiry(inquiryData);
}

export async function getInquiries(): Promise<Inquiry[]> {
  return getDbInquiries();
}

export async function updateInquiryStatus(
  id: string,
  status: InquiryStatus,
  internalNotes?: string
): Promise<boolean> {
  if (typeof window !== "undefined") {
    const res = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "updateStatus", id, status, internalNotes }),
    });
    const data = await res.json();
    return Boolean(data.success);
  }
  return updateDbInquiryStatus(id, status, internalNotes);
}

// ==========================================
// SITE SETTINGS (Direct Supabase)
// ==========================================
export async function getSiteSettings(): Promise<SiteSettings> {
  return getDbSiteSettings();
}

export async function saveSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  if (typeof window !== "undefined") {
    const res = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ settings }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.error || "Failed to save settings");
    return data.settings;
  }
  return saveDbSiteSettings(settings);
}
