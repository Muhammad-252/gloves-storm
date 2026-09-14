# GLOVES STORM — Premium B2B Manufacturing Platform & CMS

**GLOVES STORM** is an international OEM, private label, and custom sports manufacturing platform engineered for brands, athletic clubs, fight academies, and luxury streetwear labels worldwide. Handcrafted and industrial-manufactured in **Sialkot, Pakistan**.

---

## Key Features

- **Editorial Luxury Brand Aesthetic**: Inspired by Nike, Castore, Gymshark, and luxury fashion houses. Deep luxury black (`#0a0a0a`), dark charcoal (`#141414`), crisp white, and subtle brushed gold accents (`#D4AF37`).
- **Complete Public Experience**:
  - Full Viewport Cinematic Hero with status indicator and high-converting CTAs.
  - Brand Statement & 7-Stage Manufacturing Lifecycle timeline.
  - Dynamic Product Category Grid (Boxing, American Football, Basketball, Baseball, Soccer, Sportswear, Gym Wear, Streetwear, Fashion, Swimwear, Accessories).
  - Product Explorer with instant category tabs, keyword search, MOQ indicators, and lead times.
  - Interactive Customization Showcase ("EVERY DETAIL IS YOURS" - embroidery, sublimation, 3D puff print, rubber patches, labels & packaging).
  - Six-step Manufacturing Process timeline.
  - Sialkot Factory Capabilities & Precision Fleet (Gerber cutters, Juki stitchers, Tajima embroidery, Kiian Italian sublimation, Santoni circular knitting).
  - Partnership Pillars & Customer Segments (Brands, Teams, Gyms, Startups, Distributors, Wholesalers).
  - Case Studies & Deliveries.
  - Client Testimonials slider.
  - Global Logistics Corridor (USA, UK, Europe, UAE, Australia).
  - Reusable Quote / Sample Modal on every product and page.
  - Floating WhatsApp widget with prefilled direct factory message.
- **Full-Featured Admin CMS (`/admin`)**:
  - Dark luxury admin dashboard with metrics and recent inquiries stream.
  - **Products Manager**: Create, edit, duplicate, delete, feature, publish, and manage multi-image galleries (primary tag, drag/reorder, alt text), tech specs, materials, and SEO tags.
  - **Categories Manager**: Parent/child category builder with custom slugs, cover images, and sort ordering.
  - **Projects Manager**: Real B2B case studies (challenge, approach, solution, outcome).
  - **Journal / Blog Manager**: Technical guides publisher with markdown support and SEO metadata.
  - **Testimonials Manager**: Client endorsement editor with ratings.
  - **Inquiries Manager**: Lead pipeline with 8 production statuses (`New`, `Contacted`, `In Progress`, `Quoted`, `Sample`, `Production`, `Completed`, `Archived`), internal notes, and direct mail/WhatsApp quick contact.
  - **Site Settings**: Company info, phone, WhatsApp number, hero copy, and social links.
- **Supabase Architecture**:
  - Full PostgreSQL schema in `supabase/schema.sql`.
  - Realistic seed dataset in `supabase/seed.sql`.
  - Row Level Security (RLS) policies and storage bucket configurations.
  - Hybrid data client: Connects to live Supabase or gracefully falls back to bundled seed data during preview.

---

## 1. Installation

Clone the repository and install all dependencies:

```bash
git clone https://github.com/your-org/gloves-storm.git
cd gloves-storm
npm install
```

---

## 2. Supabase Database & Storage Setup

Your Supabase project is already linked and seeded! If you ever need to set up or reset another project:

1. Create a project at [supabase.com](https://supabase.com).
2. Run `supabase/schema.sql` in the **SQL Editor** to create tables and RLS security policies.
3. Run the automated seed script to populate all 11 product divisions, products, case studies, and settings:
   ```bash
   npm run seed:supabase
   ```
   *(Or paste and run `supabase/seed.sql` in the Supabase SQL Editor).*
4. In your Supabase Dashboard, verify the storage buckets under **Storage**:
   - `products` (Public)
   - `projects` (Public)
   - `blog` (Public)
   - `testimonials` (Public)
   - `site-assets` (Public)
   - `inquiries` (Private — for customer tech packs and artwork)

---

## 3. Creating Your First Admin User

1. In your Supabase dashboard, navigate to **Authentication** -> **Users**.
2. Click **Add User** -> **Create User**.
3. Enter your admin email (e.g. `admin@glovesstorm.com`) and choose a strong password.
4. You can now sign in directly at `/admin` using these credentials.

*(Note: During local development or preview without Supabase linked, the admin panel automatically permits instant demo login with `admin@glovesstorm.com` / `password123`)*.

---

## 4. Environment Variables Configuration

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Populate the keys with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key-here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **Security Note**: Never expose `SUPABASE_SERVICE_ROLE_KEY` in client-side code. Only use it in server actions or route handlers.

---

## 5. Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.
Access the admin portal at [http://localhost:3000/admin](http://localhost:3000/admin).

---

## 6. Deploying to Vercel

1. Push your code to GitHub, GitLab, or Bitbucket.
2. Go to [vercel.com](https://vercel.com) and click **Add New** -> **Project**.
3. Import the `gloves-storm` repository.
4. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` (set to your Vercel production domain, e.g. `https://glovesstorm.com`)
5. Click **Deploy**. Vercel will build and launch your production site with automated edge caching and image optimization.

---

## 7. URL Architecture

- `/` — Cinematic Homepage
- `/products` — Full Manufacturing Catalog & Filter
- `/products/[category]` — Category Landing Page
- `/products/[category]/[product]` — Dynamic Product Detail & Quote Modal
- `/manufacturing` — Sialkot Factory Infrastructure & QC
- `/about` — Heritage, Ethical Standards & Brand Positioning
- `/projects` — Case Studies Index
- `/projects/[slug]` — Case Study Detail Page
- `/journal` — Technical Articles & Fabric Guides
- `/journal/[slug]` — Full Article & Related Posts
- `/contact` — High-Converting Production Inquiry Form
- `/admin` — Protected Operations Dashboard
- `/admin/products` — Product Inventory & Gallery Manager
- `/admin/categories` — Category Hierarchy Builder
- `/admin/projects` — Case Study Manager
- `/admin/blog` — Journal Publishing
- `/admin/testimonials` — Client Feedback Manager
- `/admin/inquiries` — Lead Pipeline & Order Management
- `/admin/settings` — Company Details & WhatsApp Setup

---

## License

Proprietary. Handcrafted for GLOVES STORM Sialkot, Pakistan.
