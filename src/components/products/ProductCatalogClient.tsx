"use client";

import { useState } from "react";
import Link from "next/link";
import { Product, Category } from "@/types/database";
import { Search, Clock, Box, ArrowUpRight, ArrowRight, Sparkles, Filter } from "lucide-react";
import QuoteModal from "@/components/ui/QuoteModal";
import GooeyButton from "@/components/ui/GooeyButton";

interface ProductCatalogClientProps {
  initialProducts: Product[];
  categories: Category[];
  currentCategorySlug?: string;
  selectedCategorySlug?: string;
}

export default function ProductCatalogClient({
  initialProducts,
  categories,
  currentCategorySlug,
  selectedCategorySlug,
}: ProductCatalogClientProps) {
  const [selectedCat, setSelectedCat] = useState<string>(
    selectedCategorySlug || currentCategorySlug || "all"
  );
  const [search, setSearch] = useState("");
  const [capabilityFilter, setCapabilityFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"featured" | "moq-asc" | "newest">("featured");
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);

  const [quoteModalData, setQuoteModalData] = useState<{
    isOpen: boolean;
    productName: string;
    category: string;
    inquiryType: "Quote" | "Sample";
  }>({
    isOpen: false,
    productName: "",
    category: "",
    inquiryType: "Quote",
  });

  // Filter
  const filtered = initialProducts.filter((p) => {
    let matchesCategory = true;
    if (selectedCat !== "all") {
      const cat = categories.find((c) => c.slug === selectedCat);
      matchesCategory = cat ? p.category_id === cat.id : true;
    }

    // Capability filter
    let matchesCapability = true;
    if (capabilityFilter !== "all") {
      const cap = capabilityFilter.toLowerCase();
      const stringifiedMaterials = Array.isArray(p.materials)
        ? p.materials.join(" ")
        : String(p.materials || "");
      const stringifiedFeatures = Array.isArray(p.features)
        ? p.features.join(" ")
        : String(p.features || "");
      const stringifiedCustom = Array.isArray(p.customization_options)
        ? p.customization_options.join(" ")
        : String(p.customization_options || "");

      const fullText = `${stringifiedMaterials} ${stringifiedFeatures} ${stringifiedCustom} ${p.name}`.toLowerCase();
      matchesCapability = fullText.includes(cap);
    }

    const q = search.toLowerCase().trim();
    const matchesSearch =
      q === "" ||
      p.name.toLowerCase().includes(q) ||
      (p.short_description && p.short_description.toLowerCase().includes(q)) ||
      (p.primary_keyword && p.primary_keyword.toLowerCase().includes(q)) ||
      (p.secondary_keywords && p.secondary_keywords.toLowerCase().includes(q));

    return matchesCategory && matchesCapability && matchesSearch;
  });

  // Sort
  if (sortBy === "moq-asc") {
    filtered.sort((a, b) => a.moq - b.moq);
  } else if (sortBy === "featured") {
    filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  return (
    <div>
      {/* Control Bar: Categories, Search, Sort */}
      <div className="flex flex-col gap-6 mb-10 pb-6 border-b border-neutral-200">
        {/* Top: Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCat("all")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border cursor-pointer ${
              selectedCat === "all"
                ? "bg-amber-500 text-neutral-950 border-amber-500 shadow-xs"
                : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400 hover:text-neutral-950 shadow-2xs"
            }`}
          >
            All Categories ({initialProducts.length})
          </button>
          {categories.map((cat) => {
            const count = initialProducts.filter((p) => p.category_id === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.slug)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border cursor-pointer ${
                  selectedCat === cat.slug
                    ? "bg-amber-500 text-neutral-950 border-amber-500 shadow-xs"
                    : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400 hover:text-neutral-950 shadow-2xs"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Bottom Bar: Search, Quick Capabilities & Sort */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-bold flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            {[
              { label: "All Items", val: "all" },
              { label: "Sublimation", val: "sublimation" },
              { label: "Embroidery", val: "embroidery" },
              { label: "Leather", val: "leather" },
              { label: "Heavyweight", val: "heavyweight" },
              { label: "Low MOQ", val: "moq" },
            ].map((chip) => (
              <button
                key={chip.val}
                onClick={() => setCapabilityFilter(chip.val)}
                className={`px-3 py-1 rounded-full text-[11px] font-mono tracking-tight transition-all border cursor-pointer ${
                  capabilityFilter === chip.val
                    ? "bg-neutral-950 text-white border-neutral-950"
                    : "bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100"
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search 90 products, keywords..."
                className="w-full bg-white border border-neutral-300 rounded-full focus:border-amber-600 text-neutral-900 pl-9 pr-4 py-2 text-xs outline-none shadow-2xs transition-colors"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "featured" | "moq-asc" | "newest")}
              className="bg-white border border-neutral-300 rounded-full text-neutral-700 text-xs px-4 py-2 outline-none shadow-2xs cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="moq-asc">Lowest MOQ</option>
              <option value="newest">Latest Models</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-24 text-center rounded-3xl border border-dashed border-neutral-300 bg-white p-12 shadow-sm">
          <h3 className="text-xl font-bold uppercase text-neutral-950 mb-2">No Products Match Filters</h3>
          <p className="text-xs text-neutral-500 mb-6">
            We manufacture any custom product according to your tech pack even if it is not shown in this filtered view.
          </p>
          <GooeyButton
            href="/contact"
            variant="gold-solid"
            size="md"
          >
            <span>Request Custom Spec</span>
            <ArrowUpRight className="w-4 h-4" />
          </GooeyButton>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filtered.map((product) => {
            const primaryImg =
              product.images?.find((img) => img.is_primary)?.image_url ||
              product.images?.[0]?.image_url ||
              "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop";

            const secondaryImg =
              product.images?.[1]?.image_url ||
              product.images?.[2]?.image_url ||
              primaryImg;

            const categoryObj = categories.find((c) => c.id === product.category_id);
            const isHovered = hoveredProductId === product.id;

            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredProductId(product.id)}
                onMouseLeave={() => setHoveredProductId(null)}
                className="group bg-white rounded-3xl overflow-hidden border border-neutral-200/90 hover:border-amber-500/50 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(180,83,9,0.12)] hover:-translate-y-1.5 flex flex-col justify-between transition-all duration-300"
              >
                {/* Image Container with Dual Image Crossfade */}
                <Link
                  href={`/products/${categoryObj?.slug || "general"}/${product.slug}`}
                  className="relative aspect-square overflow-hidden bg-neutral-100 block"
                >
                  {/* Primary Image */}
                  <div
                    className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out ${
                      isHovered ? "opacity-0 scale-110" : "opacity-100 scale-100"
                    }`}
                    style={{ backgroundImage: `url(${primaryImg})` }}
                  />

                  {/* Secondary Image (Angle 02 Detail) on Hover */}
                  <div
                    className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out ${
                      isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
                    }`}
                    style={{ backgroundImage: `url(${secondaryImg})` }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-neutral-200 text-[10px] font-mono text-neutral-800 font-semibold shadow-xs">
                    <Box className="w-3 h-3 text-amber-600" />
                    <span>{isHovered ? "Angle 02: Craft" : `MOQ: ${product.moq} Units`}</span>
                  </div>

                  {product.featured && (
                    <div className="absolute top-3 right-3 bg-amber-500 text-neutral-950 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider shadow-xs">
                      Featured
                    </div>
                  )}
                </Link>

                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-800 font-bold block mb-1">
                      {categoryObj?.name || "Equipment"}
                    </span>
                    <Link
                      href={`/products/${categoryObj?.slug || "general"}/${product.slug}`}
                      className="text-base font-bold uppercase tracking-tight text-neutral-950 group-hover:text-amber-800 transition-colors line-clamp-1 block mb-2"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed mb-4">
                      {product.short_description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-500">
                      <Clock className="w-3 h-3 text-amber-600" />
                      <span>{product.lead_time || "2-4 W"}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Section 21 CTA: EXPLORE -> */}
                      <Link
                        href={`/products/${categoryObj?.slug || "general"}/${product.slug}`}
                        className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-neutral-900 group-hover:text-amber-800 px-2.5 py-1 transition-colors"
                      >
                        <span>EXPLORE</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>

                      <Link
                        href={`/customize?product=${product.id}`}
                        className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-neutral-950 bg-amber-500 hover:bg-amber-400 px-3 py-1 rounded-full shadow-xs transition-all font-mono"
                      >
                        <span>Customize</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quote Modal */}
      <QuoteModal
        isOpen={quoteModalData.isOpen}
        onClose={() => setQuoteModalData({ ...quoteModalData, isOpen: false })}
        defaultProductName={quoteModalData.productName}
        defaultCategory={quoteModalData.category}
        inquiryType={quoteModalData.inquiryType}
      />
    </div>
  );
}
