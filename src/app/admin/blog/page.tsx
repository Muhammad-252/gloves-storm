import { getAllBlogPostsAdmin } from "@/lib/data/store";
import AdminBlogClient from "@/components/admin/AdminBlogClient";

export const revalidate = 0;

export default async function AdminBlogPage() {
  const posts = await getAllBlogPostsAdmin();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-600 font-bold block mb-1">
          Editorial Publishing
        </span>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#0f172a]">
          Journal & Technical Guides
        </h1>
      </div>

      <AdminBlogClient initialPosts={posts} />
    </div>
  );
}
