import { getCategories, getProducts } from "@/lib/data/store";
import ProductCatalogClient from "@/components/products/ProductCatalogClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Sports Equipment & Apparel Products — OEM Manufacturer | Gloves Storm",
  description:
    "Browse 90+ custom OEM products: boxing gloves, MMA gear, sportswear, activewear, gym wear and streetwear. Private label manufacturing from Sialkot, Pakistan. MOQ from 25 pcs. Get a free quote.",
  alternates: {
    canonical: "https://www.glovesstorm.com/products",
  },
  openGraph: {
    title: "Custom Sports Equipment & Apparel Products — OEM Manufacturer | Gloves Storm",
    description:
      "Browse 90+ custom OEM products: boxing gloves, MMA gear, sportswear, activewear, gym wear and streetwear. Private label manufacturing from Sialkot, Pakistan. MOQ from 25 pcs.",
    url: "https://www.glovesstorm.com/products",
    siteName: "Gloves Storm",
    images: [
      {
        url: "https://www.glovesstorm.com/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Gloves Storm OEM Manufacturing Catalog — Sialkot Factory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Sports Equipment & Apparel Products — OEM Manufacturer | Gloves Storm",
    description:
      "Explore 90+ custom OEM boxing gloves, combat equipment, and team sportswear manufactured in Sialkot, Pakistan.",
    images: ["https://www.glovesstorm.com/images/og-default.jpg"],
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Custom OEM Products — Gloves Storm",
  description:
    "Custom boxing gloves, fight gear, sportswear, activewear and streetwear manufactured by Gloves Storm",
  numberOfItems: 90,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Custom Boxing Gloves",
      url: "https://www.glovesstorm.com/products/boxing-equipment/custom-boxing-gloves",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Custom MMA Gloves",
      url: "https://www.glovesstorm.com/products/boxing-equipment/custom-mma-gloves",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Custom Sparring Gloves",
      url: "https://www.glovesstorm.com/products/boxing-equipment/custom-sparring-gloves",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Custom Kickboxing Gloves",
      url: "https://www.glovesstorm.com/products/boxing-equipment/custom-kickboxing-gloves",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Custom Team Sports Jerseys",
      url: "https://www.glovesstorm.com/products/sportswear-teamwear",
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "Custom Gym Wear",
      url: "https://www.glovesstorm.com/products/gym-fitness-wear",
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
              Factory Production Library • Sialkot OEM
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-slate-900 mb-4">
            CUSTOM OEM &amp; PRIVATE LABEL PRODUCTS
          </h1>

          <p className="text-sm sm:text-base text-slate-700 max-w-4xl leading-relaxed">
            Gloves Storm manufactures 90+ custom products across six categories — from custom boxing gloves and MMA fight gear to sublimation sportswear, private label activewear, heavyweight streetwear and bespoke swimwear. Every product is available as OEM (you supply the design) or ODM (we design to your brief), with full private label branding and flexible MOQ starting from 25 pieces per design.
          </p>
        </div>

        {/* Client Product Explorer with Deep Filtering */}
        <ProductCatalogClient initialProducts={products} categories={categories} />
      </div>
    </div>
  );
}
