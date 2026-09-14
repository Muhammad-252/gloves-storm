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
    <section className="py-28 sm:py-36 bg-white border-b border-black/[0.07] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-amber-800 font-mono block mb-2 font-bold">
              Verified Brand Feedback
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-[-0.035em] text-[#1A1A1A]">
              WHAT OUR PARTNERS SAY
            </h2>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-white border border-black/[0.1] hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white flex items-center justify-center text-[#1A1A1A] shadow-xs transition-all cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-white border border-black/[0.1] hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white flex items-center justify-center text-[#1A1A1A] shadow-xs transition-all cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Testimonial Card */}
        <div className="bg-[#F9FAFB] rounded-3xl border border-black/[0.08] p-8 sm:p-12 lg:p-16 relative shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
          <Quote className="w-20 h-20 text-amber-500/10 absolute top-8 right-8 pointer-events-none" />

          {/* Star Rating */}
          <div className="flex items-center gap-1 mb-8">
            {Array.from({ length: active.rating || 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
            ))}
          </div>

          {/* Testimonial Quote */}
          <blockquote className="text-lg sm:text-2xl md:text-3xl text-[#1A1A1A] font-medium leading-relaxed tracking-tight mb-12 max-w-4xl">
            &ldquo;{active.testimonial}&rdquo;
          </blockquote>

          {/* Client Attribution */}
          <div className="flex items-center gap-4 border-t border-black/[0.07] pt-8">
            {active.photo_url ? (
              <div
                className="w-14 h-14 rounded-full bg-cover bg-center border border-amber-400/60 shrink-0 shadow-xs"
                style={{ backgroundImage: `url(${active.photo_url})` }}
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-bold text-lg flex items-center justify-center shrink-0">
                {active.client_name.charAt(0)}
              </div>
            )}

            <div>
              <h4 className="text-base font-bold uppercase tracking-wider text-[#1A1A1A]">
                {active.client_name}
              </h4>
              <p className="text-xs text-[#6B7280]">
                {active.role} • <span className="text-[#1A1A1A] font-semibold">{active.company}</span> ({active.country})
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
