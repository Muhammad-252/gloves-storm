import Link from "next/link";
import {
  getAllProductsAdmin,
  getAllCategoriesAdmin,
  getAllProjectsAdmin,
  getAllBlogPostsAdmin,
  getInquiries,
} from "@/lib/data/store";
import {
  Box,
  Layers,
  FolderGit2,
  BookOpen,
  Inbox,
  ArrowUpRight,
  Clock,
  CheckCircle,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export const revalidate = 0; // Dynamic

export default async function AdminDashboardPage() {
  const [products, categories, projects, blogPosts, inquiries] = await Promise.all([
    getAllProductsAdmin(),
    getAllCategoriesAdmin(),
    getAllProjectsAdmin(),
    getAllBlogPostsAdmin(),
    getInquiries(),
  ]);

  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.is_active).length;
  const totalCategories = categories.length;
  const totalProjects = projects.length;
  const totalBlogPosts = blogPosts.length;
  const newInquiries = inquiries.filter((i) => i.status === "New").length;
  const inProgressInquiries = inquiries.filter(
    (i) => i.status === "In Progress" || i.status === "Quoted" || i.status === "Sample"
  ).length;

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-600 font-bold block mb-1">
            Executive Overview
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#0f172a]">
            Manufacturing Operations Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 bg-[#0f172a] hover:bg-neutral-800 text-white rounded-full px-4 py-2.5 font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
          >
            <span>Add Product</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/admin/inquiries"
            className="inline-flex items-center gap-2 bg-white hover:bg-neutral-50 text-[#0f172a] border border-neutral-300 rounded-full px-4 py-2.5 font-bold text-xs uppercase tracking-wider transition-all shadow-xs"
          >
            <span>View Inquiries</span>
          </Link>
        </div>
      </div>

      {/* KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Inquiries */}
        <div className="p-6 bg-white border border-neutral-200 rounded-2xl shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-medium">
              New Inquiries
            </span>
            <Inbox className="w-5 h-5 text-amber-600" />
          </div>
          <span className="text-3xl sm:text-4xl font-black text-[#0f172a] block mb-1">
            {newInquiries}
          </span>
          <span className="text-xs text-neutral-500">
            {inProgressInquiries} in production/sampling pipeline
          </span>
        </div>

        {/* Metric 2: Products */}
        <div className="p-6 bg-white border border-neutral-200 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-medium">
              Total Products
            </span>
            <Box className="w-5 h-5 text-amber-600" />
          </div>
          <span className="text-3xl sm:text-4xl font-black text-[#0f172a] block mb-1">
            {totalProducts}
          </span>
          <span className="text-xs text-neutral-500">
            {activeProducts} active in public catalog
          </span>
        </div>

        {/* Metric 3: Categories */}
        <div className="p-6 bg-white border border-neutral-200 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-medium">
              Categories
            </span>
            <Layers className="w-5 h-5 text-amber-600" />
          </div>
          <span className="text-3xl sm:text-4xl font-black text-[#0f172a] block mb-1">
            {totalCategories}
          </span>
          <span className="text-xs text-neutral-500">
            Hierarchy enabled with subcategories
          </span>
        </div>

        {/* Metric 4: Case Studies & Articles */}
        <div className="p-6 bg-white border border-neutral-200 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-medium">
              CMS Content
            </span>
            <FolderGit2 className="w-5 h-5 text-amber-600" />
          </div>
          <span className="text-3xl sm:text-4xl font-black text-[#0f172a] block mb-1">
            {totalProjects + totalBlogPosts}
          </span>
          <span className="text-xs text-neutral-500">
            {totalProjects} case studies • {totalBlogPosts} journal posts
          </span>
        </div>
      </div>

      {/* Recent Inquiries Table */}
      <div className="bg-white border border-neutral-200 rounded-3xl shadow-sm p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold uppercase tracking-tight text-[#0f172a]">
              Recent Production Inquiries
            </h2>
            <p className="text-xs text-neutral-500">
              Incoming requests from brands, distributors, and sports clubs worldwide.
            </p>
          </div>

          <Link
            href="/admin/inquiries"
            className="text-xs uppercase tracking-wider text-amber-600 font-bold hover:underline"
          >
            Manage All Inquiries →
          </Link>
        </div>

        {inquiries.length === 0 ? (
          <div className="py-12 text-center text-xs text-neutral-500">
            No inquiries recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-neutral-200 text-[10px] font-mono uppercase text-neutral-500">
                <tr>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Product / Category</th>
                  <th className="py-3 px-4">Quantity</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {inquiries.slice(0, 6).map((inq) => (
                  <tr key={inq.id} className="hover:bg-neutral-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#0f172a]">
                      {inq.name}
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600">
                      {inq.company} ({inq.country})
                    </td>
                    <td className="py-3.5 px-4 text-amber-700 font-semibold">
                      {inq.product_name || inq.product_category}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-neutral-600">
                      {inq.estimated_quantity ? `${inq.estimated_quantity} pcs` : "TBD"}
                    </td>
                    <td className="py-3.5 px-4 text-neutral-500 font-mono">
                      {formatDate(inq.created_at)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] font-mono uppercase font-bold rounded-full ${
                          inq.status === "New"
                            ? "bg-amber-50 text-amber-800 border border-amber-200"
                            : inq.status === "Sample" || inq.status === "Production"
                            ? "bg-blue-50 text-blue-800 border border-blue-200"
                            : inq.status === "Completed"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-neutral-100 text-neutral-700 border border-neutral-200"
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href="/admin/inquiries"
                        className="text-amber-600 hover:underline font-bold text-[11px]"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
