export type InquiryStatus =
  | "New"
  | "Reviewing"
  | "Contacted"
  | "In Progress"
  | "Quoted"
  | "Sample"
  | "Production"
  | "Completed"
  | "Archived";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  parent_id: string | null;
  sort_order: number;
  is_active: boolean;
  featured_in_menu?: boolean;
  menu_badge?: string | null;
  created_at: string;
  updated_at: string;
  subcategories?: Category[];
}

export interface PriceTier {
  min_quantity: number;
  max_quantity?: number | null; // null means 'and up' e.g. 1000+
  unit_price: number;
  currency?: string;
  label?: string; // e.g. "Sample (1 pc)", "Starter MOQ", "Volume Deal", "Enterprise Bulk"
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
  created_at: string;
}

export interface ProductVideo {
  id: string;
  product_id: string;
  video_url: string;
  thumbnail_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface SizeChartRow {
  size: string;
  [measurementKey: string]: string | number;
}

export interface HowToMeasureItem {
  point: string;
  instruction: string;
}

export interface SizeChartData {
  template_key: "mens_top" | "womens_top" | "youth_kids" | "shorts_pants" | "tracksuit_jacket" | "unisex" | "custom";
  unit?: "cm" | "in";
  columns: Array<{ key: string; label: string }>;
  rows_cm: SizeChartRow[];
  rows_in: SizeChartRow[];
  tolerance: string;
  note?: string;
  how_to_measure: HowToMeasureItem[];
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface ProductSpecifications {
  fabric?: string;
  gsm_range?: string;
  fit?: string;
  decoration_methods?: string[];
  colors?: string[];
  sizes?: string[];
  moq?: number | string;
  sample_time?: string;
  lead_time?: string;
  packaging?: string;
  labels?: string;
  stitching?: string;
  origin?: string;
  [key: string]: any;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category_id: string;
  short_description: string | null;
  description: string | null;
  materials: string[] | string | null;
  features: string[] | string | null;
  customization_options: string[] | string | null;
  moq: number;
  lead_time: string | null;
  featured: boolean;
  is_active: boolean;
  seo_title: string | null;
  seo_description: string | null;
  primary_keyword?: string | null;
  secondary_keywords?: string | null;
  pricing_tiers?: PriceTier[];
  sample_price?: number | null;
  show_pricing?: boolean;
  specifications?: ProductSpecifications | Record<string, any> | null;
  size_chart?: SizeChartData | null;
  faqs?: ProductFaq[] | null;
  related_product_slugs?: string[] | null;
  noindex?: boolean;
  og_title?: string | null;
  og_description?: string | null;
  og_image?: string | null;
  canonical_url?: string | null;
  created_at?: string;
  updated_at?: string;
  images?: ProductImage[];
  videos?: ProductVideo[];
  category?: Category;
}

export interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  alt_text: string | null;
  sort_order: number;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  industry: string;
  category_id: string | null;
  description: string;
  challenge: string | null;
  approach: string | null;
  solution: string | null;
  outcome: string | null;
  featured_image: string;
  featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  images?: ProjectImage[];
}

export interface Testimonial {
  id: string;
  client_name: string;
  company: string;
  country: string;
  role: string;
  testimonial: string;
  photo_url: string | null;
  rating: number;
  featured: boolean;
  is_active: boolean;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  category: string;
  author: string;
  published_at: string | null;
  is_published: boolean;
  seo_title: string | null;
  seo_description: string | null;
  social_image: string | null;
  created_at: string;
  updated_at: string;
}

export interface Inquiry {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  product_category: string;
  product_name: string | null;
  estimated_quantity: number | null;
  target_delivery_date: string | null;
  message: string;
  tech_pack_url: string | null;
  reference_files: string[] | null;
  status: InquiryStatus;
  internal_notes?: string | null;
  customization_details?: Record<string, any> | null;
  brand_name?: string | null;
  brand_website?: string | null;
  brand_instagram?: string | null;
  timeline?: string | null;
  priority?: boolean;
  created_at: string;
}

export interface SiteSettings {
  id: string;
  company_name: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  instagram: string | null;
  facebook: string | null;
  linkedin: string | null;
  youtube: string | null;
  logo_url: string | null;
  favicon_url: string | null;
  hero_title: string;
  hero_description: string;
  instagram_access_token?: string | null;
  instagram_feed_mode?: "api" | "widget" | null;
  instagram_widget_code?: string | null;
  updated_at: string;
}
