import { getAllTestimonialsAdmin } from "@/lib/data/store";
import AdminTestimonialsClient from "@/components/admin/AdminTestimonialsClient";

export const revalidate = 0;

export default async function AdminTestimonialsPage() {
  const testimonials = await getAllTestimonialsAdmin();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-600 font-bold block mb-1">
          Social Proof
        </span>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#0f172a]">
          Client Testimonials
        </h1>
      </div>

      <AdminTestimonialsClient initialTestimonials={testimonials} />
    </div>
  );
}
