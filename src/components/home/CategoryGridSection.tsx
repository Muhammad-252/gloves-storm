import Link from "next/link";
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
    <section className="py-28 sm:py-36 bg-[#111214] border-b border-white/[0.06] relative">
      {/* Subtle ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-[#FF6B00]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/[0.07] gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#FF6B00] font-mono block mb-2 font-bold">
              Bespoke Manufacturing Divisions
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-[-0.035em] text-[#F5F5F7]">
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

        {/* Dynamic Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {parentCategories.map((category, idx) => (
            <Link
              key={category.id}
              href={`/products/${category.slug}`}
              className={`group relative overflow-hidden rounded-3xl bg-[#0C0D0E] border border-white/[0.08] hover:border-[#FF6B00]/50 transition-all duration-500 flex flex-col justify-end p-8 min-h-[380px] hover:shadow-[0_24px_60px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,107,0,0.1)] ${
                idx === 0 ? "sm:col-span-2 lg:col-span-2 min-h-[440px]" : ""
              }`}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-50 group-hover:opacity-65"
                style={{
                  backgroundImage: `url(${
                    category.image_url ||
                    "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop"
                  })`,
                }}
              />
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D0E]/98 via-[#0C0D0E]/55 to-[#0C0D0E]/15" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-[#FF6B00]/08 via-transparent to-transparent pointer-events-none" />

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FF6B00] bg-black/60 px-3.5 py-1.5 rounded-full border border-[#FF6B00]/25 backdrop-blur-md font-bold">
                    Division {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="w-11 h-11 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#FF6B00] group-hover:text-black group-hover:border-[#FF6B00] transition-all duration-300 transform group-hover:rotate-45">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                <div className="mt-16">
                  <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#F5F5F7] mb-2 group-hover:text-[#FF6B00] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9E9EA7] line-clamp-2 max-w-xl leading-relaxed mb-4 font-normal">
                    {category.description || "Custom OEM and private label production available with low minimums."}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.2em] text-[#FF6B00] group-hover:text-white transition-colors font-bold">
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
