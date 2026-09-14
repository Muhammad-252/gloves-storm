import { getAllCategoriesAdmin } from "@/lib/data/store";
import ProductEditorForm from "@/components/admin/ProductEditorForm";

export const revalidate = 0;

export default async function NewProductPage() {
  const categories = await getAllCategoriesAdmin();

  return (
    <div className="max-w-7xl mx-auto">
      <ProductEditorForm categories={categories} />
    </div>
  );
}
