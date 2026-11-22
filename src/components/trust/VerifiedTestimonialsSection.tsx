import { Star, ExternalLink } from "lucide-react";
import Image from "next/image";
import { getTestimonials } from "@/lib/data/store";

const GOOGLE_PROFILE_URL = "https://www.google.com/maps/search/?api=1&query=Gloves+Storm+Sialkot";

// Shows the active testimonials managed under Admin → Testimonials.
// Renders nothing when there are none, so no placeholder reviews ever appear.
export default async function VerifiedTestimonialsSection() {
  const testimonials = await getTestimonials();
  if (!testimonials.length) {
    return null;
  }

  const average =
    testimonials.reduce((sum, t) => sum + (t.rating || 5), 0) / testimonials.length;

  return (
    <section className="py-12 sm:py-20 lg:py-28 border-b border-line relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] sm:text-xs text-neutral-500 font-medium block mb-2">
            Client reviews · {average.toFixed(1)} on Google
          </span>
          <h2 className="text-2xl sm:text-4xl font-semibold tracking-[-0.04em] text-ink">
            What our clients say
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center text-[#FFB900] mb-3" aria-label={`${t.rating || 5} out of 5 stars`}>
                  {Array.from({ length: t.rating || 5 }, (_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <blockquote className="text-sm text-neutral-700 leading-relaxed mb-6">
                  &ldquo;{t.testimonial}&rdquo;
                </blockquote>
              </div>
              <figcaption className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                {t.photo_url ? (
                  <Image
                    src={t.photo_url}
                    alt={t.client_name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <span className="w-10 h-10 rounded-full bg-neutral-100 text-neutral-700 text-sm font-semibold flex items-center justify-center shrink-0">
                    {t.client_name.trim().charAt(0).toUpperCase()}
                  </span>
                )}
                <div>
                  <span className="text-xs font-bold text-neutral-900 block">{t.client_name}</span>
                  <span className="text-[11px] text-neutral-500">
                    {[t.role, t.company, t.country].filter(Boolean).join(" · ")}
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="text-center mt-8">
          <a
            href={GOOGLE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-700 hover:text-neutral-950 underline underline-offset-4"
          >
            Read all reviews on Google
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
