import { notFound } from "next/navigation";
import { getAllProductsAdmin, getAllCategoriesAdmin } from "@/lib/data/store";
import ProductEditorForm from "@/components/admin/ProductEditorForm";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const [allProducts, categories] = await Promise.all([
    getAllProductsAdmin(),
    getAllCategoriesAdmin(),
  ]);

  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto">
      <ProductEditorForm initialProduct={product} categories={categories} />
    </div>
  );
}
