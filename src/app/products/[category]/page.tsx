import { notFound } from "next/navigation";
import { getCategoryBySlug, getCategories, getProducts } from "@/lib/data/store";
import ProductCatalogClient from "@/components/products/ProductCatalogClient";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const cat = await getCategoryBySlug(slug);
  if (!cat) return { title: "Category Not Found" };

  return {
    title: `${cat.name} Manufacturing & OEM Production`,
    description:
      cat.description ||
      `Custom private label and OEM manufacturing for ${cat.name} products in Sialkot, Pakistan.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const [category, allCategories, allProducts] = await Promise.all([
    getCategoryBySlug(slug),
    getCategories(),
    getProducts({ categorySlug: slug }),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="pt-28 pb-24 bg-[#fafafa] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Category Hero Banner */}
        <div className="relative mb-14 p-8 sm:p-12 border border-neutral-200 rounded-3xl overflow-hidden bg-white shadow-sm">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15 scale-105"
            style={{
              backgroundImage: `url(${
                category.image_url ||
                "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop"
              })`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />

          <div className="relative z-10 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-amber-600 font-mono block mb-2 font-bold">
              Bespoke Manufacturing Division
            </span>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0f172a] mb-4">
              {category.name}
            </h1>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>

        {/* Catalog client with category pre-selected */}
        <ProductCatalogClient
          initialProducts={allProducts}
          categories={allCategories}
          selectedCategorySlug={category.slug}
        />
      </div>
    </div>
  );
}
