import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Category } from "@/types/database";
import GooeyButton from "../ui/GooeyButton";

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGridSection({ categories }: CategoryGridProps) {
  // Only parent categories
  const parentCategories = categories.filter((c) => !c.parent_id);

  return (
    <section className="py-28 sm:py-36 bg-[#F9FAFB] border-b border-black/[0.07] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-black/[0.07] gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-amber-800 font-mono block mb-2 font-bold">
              Bespoke Manufacturing Divisions
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-[-0.035em] text-[#1A1A1A]">
              PRODUCT CATEGORIES
            </h2>
          </div>
          <GooeyButton
            href="/products"
            variant="outline"
            size="sm"
          >
            <span>Browse Full Catalog</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </GooeyButton>
        </div>

        {/* Dynamic Elevated Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {parentCategories.map((category, idx) => (
            <Link
              key={category.id}
              href={`/products/${category.slug}`}
              className={`group relative overflow-hidden rounded-3xl bg-neutral-950 border border-black/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.10)] hover:shadow-[0_24px_56px_rgba(0,0,0,0.18)] hover:border-amber-500/60 transition-all duration-500 flex flex-col justify-end p-6 sm:p-8 min-h-[340px] sm:min-h-[380px] ${
                idx === 0 ? "sm:col-span-2 lg:col-span-2 sm:min-h-[440px]" : ""
              }`}
            >
              {/* Responsive Next.js Optimized Image with full Image SEO */}
              <Image
                src={
                  category.image_url ||
                  "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop"
                }
                alt={`Custom ${category.name} OEM Sialkot Factory Production - GLOVES STORM`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-60 group-hover:opacity-75"
              />
              {/* Multi-layered Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/50 to-neutral-950/10" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent pointer-events-none" />

              {/* Content Overlay */}
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-300 bg-black/60 px-3.5 py-1.5 rounded-full border border-white/20 backdrop-blur-md font-semibold">
                    Division {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="w-11 h-11 rounded-full bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-amber-500 group-hover:text-neutral-950 group-hover:border-amber-500 transition-all duration-300 transform group-hover:rotate-45">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                <div className="mt-16">
                  <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 max-w-xl leading-relaxed mb-4 font-normal">
                    {category.description || "Custom OEM and private label production available with low minimums."}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.2em] text-amber-400 group-hover:text-white transition-colors font-bold">
                    <span>Explore Lineup</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
