import { getProducts, getCategories } from "@/lib/data/store";
import ProductCustomizerStudio from "@/components/customizer/ProductCustomizerStudio";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bespoke Product Customizer Studio | GLOVES STORM Sialkot",
  description:
    "Design and customize competition boxing gear, athletic team wear, and luxury streetwear hoodies with direct Sialkot factory specifications and instant live preview.",
  alternates: {
    canonical: "/customize",
  },
};

interface CustomizePageProps {
  searchParams: Promise<{ product?: string }>;
}

export default async function CustomizePage({ searchParams }: CustomizePageProps) {
  const resolvedParams = await searchParams;
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <ProductCustomizerStudio
        products={products}
        categories={categories}
        initialProductId={resolvedParams.product}
      />
    </div>
  );
}
