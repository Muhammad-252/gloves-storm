import { Star, Quote } from "lucide-react";
import Image from "next/image";
import { BUSINESS_CONFIG } from "@/lib/business";

export default function VerifiedTestimonialsSection() {
  const testimonials = BUSINESS_CONFIG.testimonials;
  // Renders only when real testimonials exist in data (empty by default)
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-20 lg:py-28 bg-[#F9FAFB] border-b border-black/[0.07] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 font-bold block mb-2">
            VERIFIED CLIENT REVIEWS
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-neutral-900">
            What our brand partners say
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t: any) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center text-[#FFB900] mb-3">
                  {Array.from({ length: t.rating || 5 }, (_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-neutral-700 italic leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                {t.avatarUrl && (
                  <Image
                    src={t.avatarUrl}
                    alt={t.author}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <span className="text-xs font-bold text-neutral-900 block">
                    {t.author}
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    {t.role}, {t.company} • {t.country}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
