import Link from "next/link";
import { getCategories, getProducts } from "@/lib/data/store";
import ProductCatalogClient from "@/components/products/ProductCatalogClient";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wholesale Sports Goods & Apparel Catalog | GLOVES STORM Sialkot",
  description:
    "Explore 90+ custom OEM boxing gloves, combat equipment, team sportswear, gym wear, and luxury streetwear manufactured by GLOVES STORM in Sialkot, Pakistan. Low MOQs & worldwide shipping.",
  alternates: {
    canonical: "/products",
  },
};

export default async function ProductsPage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <div className="pt-28 pb-24 bg-[#fafafa] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Catalog Banner */}
        <div className="mb-14 pb-8 border-b border-neutral-200">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-600 font-mono block mb-2 font-bold">
            Factory Production Library
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#0f172a] mb-4">
            MANUFACTURING CATALOG
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 max-w-2xl leading-relaxed">
            All designs below represent physical production capabilities available for OEM and private label customization. We produce samples according to your tech packs, colors, and branding.
          </p>
        </div>

        {/* Client Product Explorer with Deep Filtering */}
        <ProductCatalogClient initialProducts={products} categories={categories} />
      </div>
    </div>
  );
}
