-- =========================================================
-- GLOVES STORM — SUPABASE PRODUCTION DATABASE SCHEMA
-- PostgreSQL schema, RLS policies, and Storage configuration
-- =========================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CATEGORIES TABLE (Supports nested parent/child categories)
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  featured_in_menu BOOLEAN DEFAULT TRUE,
  menu_badge TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_is_active ON categories(is_active);

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  short_description TEXT,
  description TEXT,
  materials JSONB DEFAULT '[]'::jsonb,
  features JSONB DEFAULT '[]'::jsonb,
  customization_options JSONB DEFAULT '[]'::jsonb,
  moq INTEGER DEFAULT 50,
  lead_time TEXT DEFAULT '2-4 Weeks',
  featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  seo_title TEXT,
  seo_description TEXT,
  pricing_tiers JSONB DEFAULT '[]'::jsonb,
  sample_price NUMERIC,
  show_pricing BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);

-- 3. PRODUCT IMAGES TABLE
CREATE TABLE IF NOT EXISTS product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON product_images(product_id);

-- 4. PRODUCT VIDEOS TABLE
CREATE TABLE IF NOT EXISTS product_videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_product_videos_product_id ON product_videos(product_id);

-- 5. PROJECTS / CASE STUDIES TABLE
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  industry TEXT NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  challenge TEXT,
  approach TEXT,
  solution TEXT,
  outcome TEXT,
  featured_image TEXT NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_is_active ON projects(is_active);

-- 6. PROJECT IMAGES TABLE
CREATE TABLE IF NOT EXISTS project_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON project_images(project_id);

-- 7. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name TEXT NOT NULL,
  company TEXT NOT NULL,
  country TEXT NOT NULL,
  role TEXT NOT NULL,
  testimonial TEXT NOT NULL,
  photo_url TEXT,
  rating INTEGER DEFAULT 5,
  featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_is_active ON testimonials(is_active);

-- 8. BLOG POSTS / JOURNAL TABLE
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  category TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'GLOVES STORM Engineering',
  published_at TIMESTAMPTZ DEFAULT NOW(),
  is_published BOOLEAN DEFAULT TRUE,
  seo_title TEXT,
  seo_description TEXT,
  social_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_published ON blog_posts(is_published);

-- 9. INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  product_category TEXT NOT NULL,
  product_name TEXT,
  estimated_quantity INTEGER,
  target_delivery_date TEXT,
  message TEXT NOT NULL,
  tech_pack_url TEXT,
  reference_files JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'New',
  internal_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);

-- 10. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL DEFAULT 'GLOVES STORM',
  email TEXT NOT NULL DEFAULT 'glovesstorm@gmail.com',
  phone TEXT NOT NULL DEFAULT '+923417146935',
  whatsapp TEXT NOT NULL DEFAULT '+923417146935',
  address TEXT NOT NULL DEFAULT 'Industrial Estate, Sialkot 51310, Punjab, Pakistan',
  instagram TEXT DEFAULT 'https://www.instagram.com/glovesstorm/',
  facebook TEXT DEFAULT 'https://facebook.com/glovesstorm',
  linkedin TEXT DEFAULT 'https://www.linkedin.com/company/gloves-storm/',
  youtube TEXT DEFAULT 'https://youtube.com/@glovesstorm',
  logo_url TEXT,
  favicon_url TEXT,
  hero_title TEXT DEFAULT 'BUILT FOR BRANDS. MADE TO PERFORM.',
  hero_description TEXT DEFAULT 'Custom boxing gear, sportswear and apparel manufactured for brands worldwide.',
  instagram_access_token TEXT,
  instagram_feed_mode TEXT DEFAULT 'api',
  instagram_widget_code TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================
-- UPDATED_AT TRIGGER FUNCTION
-- =========================================================
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trigger_update_categories BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE OR REPLACE TRIGGER trigger_update_products BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE OR REPLACE TRIGGER trigger_update_projects BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE OR REPLACE TRIGGER trigger_update_blog_posts BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE OR REPLACE TRIGGER trigger_update_site_settings BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- =========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Categories RLS
CREATE POLICY "Public read active categories" ON categories FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');
CREATE POLICY "Admin full access categories" ON categories FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Products RLS
CREATE POLICY "Public read active products" ON products FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');
CREATE POLICY "Admin full access products" ON products FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Product Images RLS
CREATE POLICY "Public read product images" ON product_images FOR SELECT USING (true);
CREATE POLICY "Admin full access product images" ON product_images FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Product Videos RLS
CREATE POLICY "Public read product videos" ON product_videos FOR SELECT USING (true);
CREATE POLICY "Admin full access product videos" ON product_videos FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Projects RLS
CREATE POLICY "Public read active projects" ON projects FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');
CREATE POLICY "Admin full access projects" ON projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Project Images RLS
CREATE POLICY "Public read project images" ON project_images FOR SELECT USING (true);
CREATE POLICY "Admin full access project images" ON project_images FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Testimonials RLS
CREATE POLICY "Public read active testimonials" ON testimonials FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');
CREATE POLICY "Admin full access testimonials" ON testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Blog Posts RLS
CREATE POLICY "Public read published blog posts" ON blog_posts FOR SELECT USING (is_published = true OR auth.role() = 'authenticated');
CREATE POLICY "Admin full access blog posts" ON blog_posts FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Inquiries RLS (Public can insert, only Admin can select/update/delete)
CREATE POLICY "Public insert inquiries" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin full access inquiries" ON inquiries FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Site Settings RLS
CREATE POLICY "Public read site settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admin update site settings" ON site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- =========================================================
-- STORAGE BUCKETS (Execute in Supabase SQL editor or Storage API)
-- =========================================================
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('products', 'products', true),
  ('projects', 'projects', true),
  ('blog', 'blog', true),
  ('testimonials', 'testimonials', true),
  ('site-assets', 'site-assets', true),
  ('inquiries', 'inquiries', false)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for Public Buckets
CREATE POLICY "Public Access Products" ON storage.objects FOR SELECT USING (bucket_id IN ('products', 'projects', 'blog', 'testimonials', 'site-assets'));
CREATE POLICY "Admin Upload Public Buckets" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id IN ('products', 'projects', 'blog', 'testimonials', 'site-assets'));
CREATE POLICY "Admin Update Public Buckets" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id IN ('products', 'projects', 'blog', 'testimonials', 'site-assets'));
CREATE POLICY "Admin Delete Public Buckets" ON storage.objects FOR DELETE TO authenticated USING (bucket_id IN ('products', 'projects', 'blog', 'testimonials', 'site-assets'));

-- Storage Policies for Inquiries (Private bucket for Tech Packs & Customer Attachments)
CREATE POLICY "Public Upload Inquiries Tech Packs" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'inquiries');
CREATE POLICY "Admin Read Inquiries Tech Packs" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'inquiries');
