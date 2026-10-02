"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Category } from "@/types/database";

interface CategoryGridProps {
  categories: Category[];
}

// Primary and hover secondary images for dynamic image switch
const categoryHoverImages: Record<string, { primary: string; secondary: string }> = {
  "boxing-equipment": {
    primary: "/images/products/boxing-gloves-black.png",
    secondary: "/images/products/boxing-gloves-red.png",
  },
  "sportswear-teamwear": {
    primary: "/images/products/basketball-uniform.jpg",
    secondary: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
  },
  "gym-fitness-wear": {
    primary: "/images/products/gym-leggings.jpg",
    secondary: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
  },
  "clothing-streetwear": {
    primary: "/images/products/hoodie-black.png",
    secondary: "/images/products/varsity-jacket.jpg",
  },
  "custom-manufacturing-private-label": {
    primary: "/images/products/luxury-packaging.jpg",
    secondary: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?q=80&w=1200&auto=format&fit=crop",
  },
  "swimwear-beachwear": {
    primary: "/images/products/board-shorts.jpg",
    secondary: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
  },
};

export default function CategoryGridSection({ categories }: CategoryGridProps) {
  // Parent categories only
  const parentCategories = categories.filter((c) => !c.parent_id);

  return (
    <section className="py-16 sm:py-24 bg-[#FFFFFF] border-b border-black/[0.06] relative overflow-hidden">
      {/* Subtle ambient light for glassmorphic cards */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-amber-400/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 pb-5 border-b border-black/[0.06] gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-amber-900 font-mono font-bold">
                Bespoke Manufacturing Lines
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-[-0.03em] text-[#111827]">
              PRODUCT CATEGORIES
            </h2>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-amber-800 transition-colors"
          >
            <span>Explore Full Catalog</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Minimalist Glassmorphic Category Grid: Shows ONLY Category Name & Dual-Image on Hover */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {parentCategories.map((category, idx) => {
            const imgSet = categoryHoverImages[category.slug] || {
              primary: category.image_url || "/images/products/boxing-gloves-black.png",
              secondary: category.image_url || "/images/products/varsity-jacket.jpg",
            };

            return (
              <Link
                key={category.id}
                href={`/products/${category.slug}`}
                className="group relative h-80 sm:h-96 rounded-3xl overflow-hidden bg-white/60 backdrop-blur-xl border border-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(217,119,6,0.12)] hover:border-amber-400/50 hover:-translate-y-1.5 transition-all duration-500 block"
              >
                {/* Primary Image */}
                <Image
                  src={imgSet.primary}
                  alt={`Custom ${category.name} - Gloves Storm Manufacturing`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-0"
                />

                {/* Secondary Image: Cross-fades on Hover */}
                <Image
                  src={imgSet.secondary}
                  alt={`${category.name} alternate view`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-all duration-700 ease-out opacity-0 group-hover:opacity-100 group-hover:scale-105"
                />

                {/* Subtle vignette for high legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15 pointer-events-none" />

                {/* Top Division Glass Pill */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#111827] bg-white/80 backdrop-blur-xl px-3 py-1 rounded-full border border-white/80 shadow-xs font-bold">
                    0{idx + 1}
                  </span>
                </div>

                {/* Floating Glassmorphic Category Name Plate at Bottom */}
                <div className="absolute bottom-4 left-4 right-4 z-10 bg-white/80 backdrop-blur-2xl border border-white/90 rounded-2xl p-4 sm:p-5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] flex items-center justify-between group-hover:bg-white/95 group-hover:border-amber-400/60 transition-all duration-300">
                  <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-[#111827] group-hover:text-amber-800 transition-colors">
                    {category.name}
                  </h3>

                  <div className="w-8 h-8 rounded-full bg-neutral-100/80 border border-black/[0.08] flex items-center justify-center text-[#111827] group-hover:bg-[#111827] group-hover:text-white transition-all duration-300 transform group-hover:rotate-45 shrink-0">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
