import { getCategories, getProducts } from "@/lib/data/store";
import ProductCatalogClient from "@/components/products/ProductCatalogClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Clothing & Sportswear Catalog — OEM Manufacturer & Exporter | Gloves Storm",
  description:
    "Explore custom apparel specifications: team sportswear, athletic uniforms, gym activewear, hoodies, and streetwear. Direct factory private label apparel manufacturing & global export.",
  alternates: {
    canonical: "https://www.glovesstorm.com/products",
  },
  openGraph: {
    title: "Custom Clothing & Sportswear Catalog — OEM Manufacturer & Exporter | Gloves Storm",
    description:
      "Explore custom apparel specifications: team sportswear, athletic uniforms, gym activewear, hoodies, and streetwear. Direct factory private label apparel manufacturing & global export.",
    url: "https://www.glovesstorm.com/products",
    siteName: "Gloves Storm",
    images: [
      {
        url: "https://www.glovesstorm.com/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Gloves Storm Apparel OEM Manufacturing Catalog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Clothing & Sportswear Catalog — OEM Manufacturer & Exporter | Gloves Storm",
    description:
      "Explore custom OEM and private label apparel, team sportswear, gym activewear, and streetwear manufactured and exported worldwide.",
    images: ["https://www.glovesstorm.com/images/og-default.jpg"],
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Custom Clothing & Sportswear Catalog — Gloves Storm",
  description:
    "Custom sportswear, athletic uniforms, activewear, and streetwear manufactured and exported by Gloves Storm",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Custom Sportswear & Teamwear",
      url: "https://www.glovesstorm.com/products/sportswear-teamwear",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Gym & Fitness Activewear",
      url: "https://www.glovesstorm.com/products/gym-fitness-wear",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Clothing & Streetwear",
      url: "https://www.glovesstorm.com/products/clothing-streetwear",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Custom Manufacturing & Private Label",
      url: "https://www.glovesstorm.com/products/custom-manufacturing-private-label",
    },
  ],
};

export default async function ProductsPage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.glovesstorm.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: "https://www.glovesstorm.com/products",
      },
    ],
  };

  return (
    <div className="pt-28 pb-24 bg-transparent min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Catalog Banner with Luxury Frosted Header */}
        <div className="mb-10 pb-6 border-b border-black/[0.06]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/90 shadow-xs mb-3">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-slate-800 font-mono font-bold">
              Factory Production Library • International OEM &amp; Exporter
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-slate-900 mb-4">
            CUSTOM CLOTHING &amp; SPORTSWEAR MANUFACTURING CATALOG
          </h1>

          <p className="text-sm sm:text-base text-slate-700 max-w-4xl leading-relaxed">
            Gloves Storm manufactures and exports premium custom clothing, athletic sportswear, gym activewear, and luxury heavyweight streetwear for international brands. Every garment is produced as OEM (custom cut-and-sew from your tech packs) or ODM (developed to your aesthetic brief), with complete private label branding, low MOQs starting from 35 pieces per style, and insured door-to-door DDP global shipping.
          </p>
        </div>

        {/* Client Product Explorer with Deep Filtering */}
        <ProductCatalogClient initialProducts={products} categories={categories} />
      </div>
    </div>
  );
}
