import { getCategories, getProducts } from "@/lib/data/store";
import ProductCatalogClient from "@/components/products/ProductCatalogClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wholesale Sports Goods & Custom Apparel Catalog | GLOVES STORM Sialkot",
  description:
    "Browse 90+ custom OEM boxing gloves, combat fight gear, athletic teamwear, and luxury heavyweight streetwear manufactured in Sialkot, Pakistan. Low MOQ 30-50 pcs, 7-day master sampling, and door-to-door worldwide shipping.",
  keywords: [
    "Custom Boxing Gloves Catalog",
    "OEM Sportswear Manufacturer Sialkot",
    "Private Label Fight Gear",
    "Wholesale Teamwear Factory",
    "Custom Heavyweight Hoodies",
    "Sialkot Sports Goods Catalog",
  ],
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Wholesale Sports Goods & Custom Apparel Catalog | GLOVES STORM",
    description:
      "Direct factory OEM catalog with 90+ combat gear models, performance teamwear, and luxury streetwear blanks from Sialkot, Pakistan.",
    url: "https://glovesstorm.com/products",
    siteName: "GLOVES STORM",
    images: [
      {
        url: "/images/products/boxing-gloves-black.png",
        width: 1200,
        height: 630,
        alt: "GLOVES STORM Manufacturing Catalog - Sialkot Factory OEM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wholesale Sports Goods & Apparel Catalog | GLOVES STORM",
    description:
      "Explore 90+ custom OEM boxing gloves, combat equipment, and team sportswear manufactured in Sialkot, Pakistan.",
    images: ["/images/products/boxing-gloves-black.png"],
  },
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
        item: "https://glovesstorm.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: "https://glovesstorm.com/products",
      },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "GLOVES STORM OEM Manufacturing Catalog",
    description:
      "Complete library of custom boxing gear, fight equipment, athletic teamwear, and private label apparel manufactured in Sialkot, Pakistan.",
    url: "https://glovesstorm.com/products",
    numberOfItems: products.length,
  };

  return (
    <div className="pt-28 pb-24 bg-transparent min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
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
            MANUFACTURING CATALOG
          </h1>

          <p className="text-sm sm:text-base text-[#334155] max-w-2xl leading-relaxed">
            All models below represent active physical production capabilities available for OEM and private label customization. We engineer samples according to your proprietary tech packs, Pantone colors, and branding specifications.
          </p>
        </div>

        {/* Client Product Explorer with Deep Filtering */}
        <ProductCatalogClient initialProducts={products} categories={categories} />
      </div>
    </div>
  );
}
