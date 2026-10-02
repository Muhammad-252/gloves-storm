import { loadPersistedCategories } from "@/lib/data/categoryPersistence";
import AdminCategoriesClient from "@/components/admin/AdminCategoriesClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminCategoriesPage() {
  const categories = await loadPersistedCategories();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-600 font-bold block mb-1">
          Taxonomy Structure
        </span>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#0f172a]">
          Category Management
        </h1>
      </div>

      <AdminCategoriesClient initialCategories={categories} />
    </div>
  );
}
