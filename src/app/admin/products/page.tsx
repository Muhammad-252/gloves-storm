import { getAllProductsAdmin, getAllCategoriesAdmin } from "@/lib/data/store";
import AdminProductsClient from "@/components/admin/AdminProductsClient";

export const revalidate = 0;

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    getAllProductsAdmin(),
    getAllCategoriesAdmin(),
  ]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-600 font-bold block mb-1">
          Catalog Inventory
        </span>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#0f172a]">
          Product Management
        </h1>
      </div>

      <AdminProductsClient initialProducts={products} categories={categories} />
    </div>
  );
}
