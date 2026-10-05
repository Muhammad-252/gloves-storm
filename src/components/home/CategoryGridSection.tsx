"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Category } from "@/types/database";

interface CategoryGridProps {
  categories: Category[];
}

// Category custom SEO titles & descriptions specified in prompt
const categorySeoMeta: Record<string, { title: string; description: string }> = {
  "boxing-equipment": {
    title: "Custom Boxing Equipment",
    description:
      "Custom boxing gloves, MMA gloves, kickboxing gloves, sparring gloves, headguards, shin guards and punching bags. 1.2mm cowhide leather. MOQ 25–50 pairs. Private label ready.",
  },
  "sportswear-teamwear": {
    title: "Custom Sportswear & Team Kits",
    description:
      "Sublimation team jerseys, football uniforms, basketball kits, tracksuits and match-day apparel. Full custom branding, player numbering and sponsor logos. MOQ 30 pcs.",
  },
  "gym-fitness-wear": {
    title: "Custom Gym & Activewear",
    description:
      "Private label gym wear, compression leggings, sports bras, training shorts and athletic sets. 4-way stretch performance fabrics. MOQ 30 pcs per style.",
  },
  "clothing-streetwear": {
    title: "Custom Streetwear & Apparel",
    description:
      "Heavyweight hoodies, varsity jackets, tees and joggers with embroidery, puff print or sublimation. 380–450 GSM fleece. Private label branding included. MOQ 30 pcs.",
  },
  "custom-manufacturing-private-label": {
    title: "OEM & Private Label Manufacturing",
    description:
      "Full OEM and ODM manufacturing service. Submit your tech pack or sketch — we handle pattern, sampling, bulk production, QC, and branded retail-ready packaging.",
  },
  "swimwear-beachwear": {
    title: "Custom Swimwear & Beachwear",
    description:
      "Custom swimwear, rash guards and beachwear in chlorine-resistant fabrics. Private label branding, custom colourways and retail packaging available. MOQ 30 pcs.",
  },
};

// Internal high-res product photos from factory catalog
const categoryHoverImages: Record<string, { primary: string; secondary: string }> = {
  "boxing-equipment": {
    primary: "/images/products/boxing-gloves-black.png",
    secondary: "/images/products/boxing-gloves-red.png",
  },
  "sportswear-teamwear": {
    primary: "/images/products/basketball-uniform.jpg",
    secondary: "/images/products/football-jersey-black.jpg",
  },
  "gym-fitness-wear": {
    primary: "/images/products/gym-leggings.jpg",
    secondary: "/images/products/rash-guard.jpg",
  },
  "clothing-streetwear": {
    primary: "/images/products/hoodie-black.png",
    secondary: "/images/products/varsity-jacket.jpg",
  },
  "custom-manufacturing-private-label": {
    primary: "/images/products/luxury-packaging.jpg",
    secondary: "/images/products/woven-labels.jpg",
  },
  "swimwear-beachwear": {
    primary: "/images/products/board-shorts.jpg",
    secondary: "/images/products/rash-guard.jpg",
  },
};

export default function CategoryGridSection({ categories }: CategoryGridProps) {
  // Parent categories only
  const parentCategories = categories.filter((c) => !c.parent_id);

  return (
    <section className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-black/[0.06] relative overflow-hidden">
      {/* Subtle ambient light */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-amber-400/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header with Rewritten SEO Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-black/[0.06] gap-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 shadow-xs mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-slate-800 font-mono font-bold">
                SIALKOT DIRECT OEM CATALOG
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-[-0.03em] text-[#111827]">
              WHAT WE MANUFACTURE
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              Six product categories. 90+ verified specifications. All available as custom OEM or private label.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-amber-800 transition-colors"
          >
            <span>Explore Full Catalog</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Category Grid: Shows Category Title, Description & Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {parentCategories.map((category, idx) => {
            const fallbackSet = categoryHoverImages[category.slug];
            const primaryImage =
              category.image_url ||
              fallbackSet?.primary ||
              "/images/products/boxing-gloves-black.png";
            const secondaryImage =
              fallbackSet?.secondary ||
              primaryImage;

            const seoData = categorySeoMeta[category.slug] || {
              title: category.name,
              description: category.description || "Custom OEM and private label manufacturing direct from Sialkot factory.",
            };

            return (
              <Link
                key={category.id}
                href={`/products/${category.slug}`}
                className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.09)] hover:border-amber-400/60 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Canvas Container */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
                  {/* Primary Image */}
                  <Image
                    src={primaryImage}
                    alt={`${seoData.title} OEM manufacturer Sialkot Pakistan`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-0"
                  />

                  {/* Secondary Image: Cross-fades on Hover */}
                  <Image
                    src={secondaryImage}
                    alt={`${seoData.title} production detail view`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-all duration-700 ease-out opacity-0 group-hover:opacity-100 group-hover:scale-105"
                  />

                  {/* Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 pointer-events-none" />

                  {/* Top Division Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-900 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-white shadow-xs font-bold">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Bottom Title on Image */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
                    <h3 className="text-lg font-black uppercase tracking-tight text-white drop-shadow-md">
                      {seoData.title}
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-950 transition-all duration-300 group-hover:bg-amber-400 shrink-0 shadow-sm">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Card Body: Factual SEO Description */}
                <div className="p-5 sm:p-6 bg-white flex flex-col justify-between flex-1">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {seoData.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="text-amber-700 font-semibold uppercase tracking-wider">
                      OEM &amp; Private Label
                    </span>
                    <span className="text-slate-500">
                      Sialkot Direct
                    </span>
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
