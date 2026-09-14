import { notFound } from "next/navigation";
import {
  getCategoryBySlug,
  getCategories,
  getProducts,
  getProjects,
} from "@/lib/data/store";
import CategoryLandingClient from "@/components/products/CategoryLandingClient";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const cat = await getCategoryBySlug(slug);
  if (!cat) return { title: "Category Not Found | GLOVES STORM" };

  return {
    title: `Custom ${cat.name} Manufacturing & OEM Production | GLOVES STORM`,
    description:
      cat.description ||
      `Direct factory OEM manufacturing for custom ${cat.name} in Sialkot, Pakistan. Handcrafted equipment, custom sublimation teamwear, and private label apparel.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const [category, allCategories, categoryProducts, projects] = await Promise.all([
    getCategoryBySlug(slug),
    getCategories(),
    getProducts({ categorySlug: slug }),
    getProjects(),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="pt-28 pb-24 bg-[#fafafa] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <CategoryLandingClient
          category={category}
          products={categoryProducts}
          categories={allCategories}
          relatedProjects={projects}
        />
      </div>
    </div>
  );
}
