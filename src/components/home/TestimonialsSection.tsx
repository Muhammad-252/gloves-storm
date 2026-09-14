"use client";

import { useState } from "react";
import { Testimonial } from "@/types/database";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const active = testimonials[currentIndex];

  return (
    <section className="py-28 sm:py-36 bg-[#111214] border-b border-white/[0.06] relative overflow-hidden">
      {/* Background accent glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FF6B00]/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#FF6B00] font-mono block mb-2 font-bold">
              Verified Brand Feedback
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-[-0.035em] text-[#F5F5F7]">
              WHAT OUR PARTNERS SAY
            </h2>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-white/[0.05] border border-white/[0.12] hover:border-[#FF6B00]/50 hover:bg-[#FF6B00]/10 flex items-center justify-center text-[#9E9EA7] hover:text-[#FF6B00] transition-all cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-white/[0.05] border border-white/[0.12] hover:border-[#FF6B00]/50 hover:bg-[#FF6B00]/10 flex items-center justify-center text-[#9E9EA7] hover:text-[#FF6B00] transition-all cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Testimonial Card */}
        <div className="bg-[#0C0D0E] rounded-3xl border border-white/[0.07] hover:border-[#FF6B00]/20 p-8 sm:p-12 lg:p-16 relative transition-colors">
          <Quote className="w-20 h-20 text-[#FF6B00]/[0.07] absolute top-8 right-8 pointer-events-none" />

          {/* Star Rating */}
          <div className="flex items-center gap-1 mb-8">
            {Array.from({ length: active.rating || 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 text-[#FF6B00] fill-[#FF6B00]" />
            ))}
          </div>

          {/* Quote */}
          <blockquote className="text-lg sm:text-2xl md:text-3xl text-[#F5F5F7] font-medium leading-relaxed tracking-tight mb-12 max-w-4xl">
            &ldquo;{active.testimonial}&rdquo;
          </blockquote>

          {/* Client Attribution */}
          <div className="flex items-center gap-4 border-t border-white/[0.07] pt-8">
            {active.photo_url ? (
              <div
                className="w-14 h-14 rounded-full bg-cover bg-center border border-[#FF6B00]/40 shrink-0"
                style={{ backgroundImage: `url(${active.photo_url})` }}
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] font-bold text-lg flex items-center justify-center shrink-0">
                {active.client_name.charAt(0)}
              </div>
            )}

            <div>
              <h4 className="text-base font-bold uppercase tracking-wider text-[#F5F5F7]">
                {active.client_name}
              </h4>
              <p className="text-xs text-[#9E9EA7]">
                {active.role} • <span className="text-[#F5F5F7]/70 font-semibold">{active.company}</span> ({active.country})
              </p>
            </div>
          </div>

          {/* Progress dots */}
          <div className="mt-8 flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentIndex ? "w-6 bg-[#FF6B00]" : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
