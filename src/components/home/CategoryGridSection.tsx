"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Category } from "@/types/database";

interface CategoryGridProps {
  categories: Category[];
}

// Fallback SEO titles & descriptions for default initial categories
const categorySeoMeta: Record<string, { title: string; description: string }> = {
  "sportswear-teamwear": {
    title: "Custom Sportswear & Team Kits",
    description:
      "Sublimation team jerseys, football uniforms, basketball kits, tracksuits and match-day apparel. Full custom branding, player numbering, and sponsor logos. MOQ 35 pcs.",
  },
  "gym-fitness-wear": {
    title: "Custom Gym & Activewear",
    description:
      "Private label gym wear, seamless & compression leggings, sports bras, training shorts and athletic sets. 4-way stretch performance moisture-wicking fabrics. MOQ 35 pcs per style.",
  },
  "clothing-streetwear": {
    title: "Custom Streetwear & Heavyweight Apparel",
    description:
      "Heavyweight French Terry hoodies (450–500 GSM), varsity jackets, oversized tees, and tailored joggers with 3D embroidery, chenille patches, or puff print. MOQ 35 pcs.",
  },
  "custom-manufacturing-private-label": {
    title: "OEM & Private Label Manufacturing",
    description:
      "Full OEM and ODM cut-and-sew manufacturing service. Submit your tech pack or mockup — we handle grading, master sampling, bulk production, QC, and branded retail-ready packaging.",
  },
};

// Fallback high-res catalog images
const categoryHoverImages: Record<string, { primary: string; secondary: string }> = {
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
};

export default function CategoryGridSection({ categories }: CategoryGridProps) {
  const [liveCategories, setLiveCategories] = useState<Category[]>(categories);

  // Sync with live categories from localStorage, BroadcastChannel, and /api/categories
  useEffect(() => {
    // 1. Try reading client cached categories
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("gs_dynamic_categories");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setLiveCategories(parsed);
          }
        }
      } catch (e) {
        // Ignore JSON error
      }

      // 2. Listen to custom event dispatched by AdminCategoriesClient
      const handleUpdate = (e: Event) => {
        const customEvent = e as CustomEvent<Category[]>;
        if (customEvent.detail && Array.isArray(customEvent.detail)) {
          setLiveCategories(customEvent.detail);
        }
      };
      window.addEventListener("gs_categories_updated", handleUpdate);

      // 3. Listen to cross-tab BroadcastChannel
      let channel: BroadcastChannel | null = null;
      if ("BroadcastChannel" in window) {
        channel = new BroadcastChannel("gs_categories_channel");
        channel.onmessage = (msg) => {
          if (msg.data?.type === "CATEGORIES_UPDATED" && Array.isArray(msg.data.categories)) {
            setLiveCategories(msg.data.categories);
          }
        };
      }

      // 4. Fetch fresh from API endpoint
      fetch("/api/categories")
        .then((res) => res.json())
        .then((data) => {
          if (data?.categories && Array.isArray(data.categories) && data.categories.length > 0) {
            setLiveCategories(data.categories);
            try {
              localStorage.setItem("gs_dynamic_categories", JSON.stringify(data.categories));
            } catch (e) {}
          }
        })
        .catch((err) => console.warn("Live category grid sync warning:", err));

      return () => {
        window.removeEventListener("gs_categories_updated", handleUpdate);
        if (channel) channel.close();
      };
    }
  }, []);

  // Parent active categories only
  const parentCategories = liveCategories.filter((c) => !c.parent_id && c.is_active !== false);

  return (
    <section className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-black/[0.06] relative overflow-hidden">
      {/* Subtle ambient light */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-amber-400/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-black/[0.06] gap-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 shadow-xs mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-slate-800 font-mono font-bold">
                INTERNATIONAL APPAREL DIVISIONS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-[-0.03em] text-[#111827]">
              WHAT WE MANUFACTURE &amp; EXPORT
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              Specialized apparel divisions direct from our Sialkot factory. From technical teamwear and gym activewear to heavyweight streetwear and turnkey private label manufacturing.
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

        {/* Dynamic Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6">
          {parentCategories.map((category, idx) => {
            const fallbackSet = categoryHoverImages[category.slug];

            // Custom image uploaded from admin takes top priority
            const primaryImage =
              category.image_url ||
              fallbackSet?.primary ||
              "/images/products/varsity-jacket.jpg";

            // If custom image is set, hover preserves the custom image instead of reverting to stock photo
            const secondaryImage =
              category.image_url ||
              fallbackSet?.secondary ||
              primaryImage;

            // Admin updated title and description ALWAYS take priority
            const displayName =
              category.name ||
              categorySeoMeta[category.slug]?.title ||
              "Apparel Category";

            const displayDescription =
              category.description ||
              categorySeoMeta[category.slug]?.description ||
              "Custom OEM and private label manufacturing direct from Sialkot factory.";

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
                    alt={`${displayName} OEM manufacturer Sialkot Pakistan`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-0"
                  />

                  {/* Secondary Image: Cross-fades on Hover (uses custom image if set) */}
                  <Image
                    src={secondaryImage}
                    alt={`${displayName} production detail view`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-all duration-700 ease-out opacity-0 group-hover:opacity-100 group-hover:scale-105"
                  />

                  {/* Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 pointer-events-none" />

                  {/* Top Division Badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-900 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-white shadow-xs font-bold">
                      0{idx + 1}
                    </span>
                    {category.menu_badge && (
                      <span className="text-[9px] font-mono uppercase tracking-wider text-amber-900 bg-amber-200/90 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-amber-300 shadow-xs font-bold">
                        {category.menu_badge}
                      </span>
                    )}
                  </div>

                  {/* Bottom Title on Image */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
                    <h3 className="text-lg font-black uppercase tracking-tight text-white drop-shadow-md">
                      {displayName}
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-950 transition-all duration-300 group-hover:bg-amber-400 shrink-0 shadow-sm">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Card Body: Factual Description */}
                <div className="p-5 sm:p-6 bg-white flex flex-col justify-between flex-1">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {displayDescription}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="text-amber-700 font-semibold uppercase tracking-wider">
                      OEM &amp; Private Label
                    </span>
                    <span className="text-slate-500">
                      Global Export Ready
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
