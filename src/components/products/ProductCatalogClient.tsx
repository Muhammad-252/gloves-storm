"use client";

import { useState } from "react";
import Link from "next/link";
import { Product, Category } from "@/types/database";
import { Search, Clock, Box, ArrowUpRight } from "lucide-react";
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
  const [sortBy, setSortBy] = useState<"featured" | "moq-asc" | "newest">("featured");
  const [quoteModalData, setQuoteModalData] = useState<{
    isOpen: boolean;
    productName: string;
    category: string;
  }>({
    isOpen: false,
    productName: "",
    category: "",
  });

  // Filter
  const filtered = initialProducts.filter((p) => {
    let matchesCategory = true;
    if (selectedCat !== "all") {
      const cat = categories.find((c) => c.slug === selectedCat);
      matchesCategory = cat ? p.category_id === cat.id : true;
    }

    const matchesSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.short_description && p.short_description.toLowerCase().includes(search.toLowerCase()));

    return matchesCategory && matchesSearch;
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
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 mb-10 pb-6 border-b border-neutral-200">
        {/* Category Filter Pills */}
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
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.slug)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border cursor-pointer ${
                selectedCat === cat.slug
                  ? "bg-amber-500 text-neutral-950 border-amber-500 shadow-xs"
                  : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400 hover:text-neutral-950 shadow-2xs"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-white border border-neutral-300 rounded-full focus:border-amber-600 text-neutral-900 pl-10 pr-4 py-2.5 text-xs outline-none shadow-2xs transition-colors"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "featured" | "moq-asc" | "newest")}
            className="bg-white border border-neutral-300 rounded-full text-neutral-700 text-xs px-4 py-2.5 outline-none shadow-2xs cursor-pointer"
          >
            <option value="featured">Featured First</option>
            <option value="moq-asc">Lowest MOQ</option>
            <option value="newest">Latest Added</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-24 text-center rounded-3xl border border-dashed border-neutral-300 bg-white p-12 shadow-sm">
          <h3 className="text-xl font-bold uppercase text-neutral-950 mb-2">No Products Found</h3>
          <p className="text-xs text-neutral-500 mb-6">
            We manufacture any custom product according to your tech pack even if it is not shown here.
          </p>
          <GooeyButton
            href="/contact"
            variant="gold-solid"
            size="md"
          >
            <span>Request Custom Item</span>
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

            const categoryObj = categories.find((c) => c.id === product.category_id);

            return (
              <div
                key={product.id}
                className="group bg-white rounded-3xl overflow-hidden border border-neutral-200/90 hover:border-amber-500/50 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(180,83,9,0.12)] hover:-translate-y-1.5 flex flex-col justify-between transition-all duration-300"
              >
                <Link
                  href={`/products/${categoryObj?.slug || "general"}/${product.slug}`}
                  className="relative aspect-square overflow-hidden bg-neutral-100 block"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url(${primaryImg})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-neutral-200 text-[10px] font-mono text-neutral-800 font-semibold shadow-xs">
                    <Box className="w-3 h-3 text-amber-600" />
                    <span>MOQ: {product.moq} Units</span>
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
                      <Link
                        href={`/customize?product=${product.id}`}
                        className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-neutral-950 bg-amber-500 hover:bg-amber-400 px-3 py-1 rounded-full shadow-xs transition-all font-mono"
                      >
                        <span>Customize</span>
                      </Link>

                      <button
                        onClick={() =>
                          setQuoteModalData({
                            isOpen: true,
                            productName: product.name,
                            category: categoryObj?.name || "General",
                          })
                        }
                        className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-neutral-700 hover:text-neutral-950 px-3 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 transition-all font-mono cursor-pointer"
                      >
                        <span>Quote</span>
                      </button>
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
      />
    </div>
  );
}
