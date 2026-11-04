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
      "Sublimation team jerseys, football uniforms, basketball kits, tracksuits and match-day apparel. Full custom branding, player numbering, and sponsor logos. MOQ 30 pcs.",
  },
  "gym-fitness-wear": {
    title: "Custom Gym & Activewear",
    description:
      "Private label gym wear, seamless & compression leggings, sports bras, training shorts and athletic sets. 4-way stretch performance moisture-wicking fabrics. MOQ 30 pcs per style.",
  },
  "clothing-streetwear": {
    title: "Custom Streetwear & Heavyweight Apparel",
    description:
      "Heavyweight French Terry hoodies (450–500 GSM), varsity jackets, oversized tees, and tailored joggers with 3D embroidery, chenille patches, or puff print. MOQ 30 pcs.",
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

const HIDDEN_CATEGORY_SLUGS = ["boxing-equipment", "swimwear-beachwear"];

export default function CategoryGridSection({ categories }: CategoryGridProps) {
  const [liveCategories, setLiveCategories] = useState<Category[]>(() =>
    categories.filter((c) => !HIDDEN_CATEGORY_SLUGS.includes(c.slug))
  );

  // Sync with live categories from localStorage, BroadcastChannel, and /api/categories
  useEffect(() => {
    // 1. Try reading client cached categories
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("gs_dynamic_categories");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setLiveCategories(
              parsed.filter((c: any) => !HIDDEN_CATEGORY_SLUGS.includes(c.slug))
            );
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
  const parentCategories = liveCategories.filter(
    (c) => !c.parent_id && c.is_active !== false && !HIDDEN_CATEGORY_SLUGS.includes(c.slug)
  );

  // Bento spans for the four main divisions on large screens
  const spans = ["lg:col-span-7 lg:row-span-2", "lg:col-span-5", "lg:col-span-5", "lg:col-span-12"];

  return (
    <section className="py-16 sm:py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-10 sm:mb-14">
          <div className="lg:col-span-7">
            <span className="eyebrow mb-4 sm:mb-5">What we manufacture</span>
            <h2 className="display-lg text-ink">
              Four divisions. <em className="accent-serif text-ink/70">One factory floor.</em>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <p className="text-[15px] sm:text-base text-ink/65 leading-relaxed">
              Teamwear, gym wear, heavyweight streetwear and full private label production, cut and sewn under one roof in Sialkot.
            </p>
            <Link
              href="/products"
              className="group mt-5 inline-flex items-center gap-2 text-[15px] font-medium text-ink"
            >
              <span className="border-b border-ink/30 group-hover:border-ink transition-colors">Explore the full catalog</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
            </Link>
          </div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[300px] gap-3 sm:gap-4">
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
                aria-label={`Explore ${displayName} manufacturing catalog`}
                className={`group relative rounded-[24px] sm:rounded-[28px] overflow-hidden bg-ink min-h-[340px] sm:min-h-[380px] lg:min-h-0 flex flex-col justify-end ${spans[idx % spans.length]}`}
              >
                <Image
                  src={primaryImage}
                  alt={`${displayName} OEM manufacturer Sialkot Pakistan`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 58vw"
                  className="object-cover transition-all duration-[900ms] ease-out group-hover:scale-[1.04] group-hover:opacity-0"
                />
                <Image
                  src={secondaryImage}
                  alt={`${displayName} production detail view`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 58vw"
                  className="object-cover transition-all duration-[900ms] ease-out opacity-0 scale-[1.04] group-hover:opacity-100 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-10 flex items-center gap-2">
                  <span className="text-[12px] font-medium text-white/90 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    0{idx + 1}
                  </span>
                  {category.menu_badge && (
                    <span className="text-[12px] font-medium text-ink bg-[#FFB900] px-3 py-1 rounded-full">
                      {category.menu_badge}
                    </span>
                  )}
                </div>

                <div className="relative z-10 p-5 sm:p-7">
                  <div className="flex items-end justify-between gap-4">
                    <div className="max-w-md">
                      <h3 className="text-2xl sm:text-[28px] font-semibold tracking-[-0.02em] text-white leading-tight">
                        {displayName}
                      </h3>
                      <p className="mt-2 text-[13.5px] sm:text-sm text-white/70 leading-relaxed line-clamp-2">
                        {displayDescription}
                      </p>
                    </div>
                    <span className="w-11 h-11 rounded-full bg-white text-ink flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-[#FFB900] group-hover:rotate-45">
                      <ArrowUpRight className="w-4 h-4" />
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
