import { getAllProjectsAdmin, getCategories } from "@/lib/data/store";
import AdminProjectsClient from "@/components/admin/AdminProjectsClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminProjectsPage() {
  const [projects, categories] = await Promise.all([
    getAllProjectsAdmin(),
    getCategories(),
  ]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-600 font-bold block mb-1">
          Factory Portfolio
        </span>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#0f172a]">
          Previous Work & Production Archive
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Manage your previous work gallery. Add products with category assignments and multiple production photos.
        </p>
      </div>

      <AdminProjectsClient initialProjects={projects} categories={categories} />
    </div>
  );
}
