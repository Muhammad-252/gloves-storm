import { getAllProjectsAdmin } from "@/lib/data/store";
import AdminProjectsClient from "@/components/admin/AdminProjectsClient";

export const revalidate = 0;

export default async function AdminProjectsPage() {
  const projects = await getAllProjectsAdmin();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-600 font-bold block mb-1">
          Brand Portfolio
        </span>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#0f172a]">
          Case Studies & Projects
        </h1>
      </div>

      <AdminProjectsClient initialProjects={projects} />
    </div>
  );
}
