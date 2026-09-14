import { getInquiries } from "@/lib/data/store";
import AdminInquiriesClient from "@/components/admin/AdminInquiriesClient";

export const revalidate = 0;

export default async function AdminInquiriesPage() {
  const inquiries = await getInquiries();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-600 font-bold block mb-1">
          Lead Ingestion Pipeline
        </span>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#0f172a]">
          Production Inquiries & Quotations
        </h1>
      </div>

      <AdminInquiriesClient initialInquiries={inquiries} />
    </div>
  );
}
