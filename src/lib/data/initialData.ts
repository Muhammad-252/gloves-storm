import {
  Category,
  Product,
  Project,
  Testimonial,
  BlogPost,
  Inquiry,
  SiteSettings,
} from "@/types/database";

export const initialCategories: Category[] = [];
export const initialProducts: Product[] = [];
export const initialProjects: Project[] = [];
export const initialTestimonials: Testimonial[] = [];
export const initialBlogPosts: BlogPost[] = [];
export const initialSiteSettings: SiteSettings = {
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
  hero_description: "Custom sportswear, activewear, team uniforms and private label clothing manufactured for brands worldwide.",
  updated_at: new Date().toISOString(),
};
export const initialInquiries: Inquiry[] = [];
