import {
  Product,
  Category,
  Project,
  Testimonial,
  BlogPost,
  Inquiry,
  SiteSettings,
  InquiryStatus,
} from "@/types/database";

export async function saveProduct(product: Partial<Product>): Promise<Product> {
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

export async function deleteProduct(id: string): Promise<boolean> {
  const res = await fetch(`/api/products?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || "Failed to delete product");
  }
  return Boolean(data.success);
}

export async function saveCategory(category: Partial<Category>): Promise<Category> {
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

export async function deleteCategory(id: string): Promise<boolean> {
  const res = await fetch(`/api/categories?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || "Failed to delete category");
  }
  return Boolean(data.success);
}

export async function saveProject(project: Partial<Project>): Promise<Project> {
  const res = await fetch("/api/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ project }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || "Failed to save project");
  }
  return data.project;
}

export async function deleteProject(id: string): Promise<boolean> {
  const res = await fetch(`/api/projects?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || "Failed to delete project");
  }
  return Boolean(data.success);
}

export async function saveTestimonial(testimonial: Partial<Testimonial>): Promise<Testimonial> {
  const res = await fetch("/api/testimonials", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ testimonial }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || "Failed to save testimonial");
  }
  return data.testimonial;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const res = await fetch(`/api/testimonials?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || "Failed to delete testimonial");
  }
  return Boolean(data.success);
}

export async function saveBlogPost(post: Partial<BlogPost>): Promise<BlogPost> {
  const res = await fetch("/api/blog", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ post }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || "Failed to save blog post");
  }
  return data.post;
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const res = await fetch(`/api/blog?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || "Failed to delete blog post");
  }
  return Boolean(data.success);
}

export async function saveSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  const res = await fetch("/api/settings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ settings }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || "Failed to save settings");
  }
  return data.settings;
}

export async function createInquiry(
  inquiry: Omit<Inquiry, "id" | "status" | "created_at">
): Promise<Inquiry> {
  const res = await fetch("/api/inquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inquiry }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || "Failed to submit inquiry");
  }
  return data.inquiry;
}

export async function updateInquiryStatus(
  id: string,
  status: InquiryStatus,
  internalNotes?: string
): Promise<boolean> {
  const res = await fetch("/api/inquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "updateStatus", id, status, internalNotes }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || "Failed to update inquiry status");
  }
  return Boolean(data.success);
}
