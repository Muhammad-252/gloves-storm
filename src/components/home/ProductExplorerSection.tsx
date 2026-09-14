"use client";

import { useState } from "react";
import Link from "next/link";
import { Product, Category } from "@/types/database";
import { ArrowUpRight, Search, Box } from "lucide-react";
import QuoteModal from "../ui/QuoteModal";

interface ProductExplorerProps {
  products: Product[];
  categories: Category[];
}

export default function ProductExplorerSection({
  products,
  categories,
}: ProductExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [quoteModalData, setQuoteModalData] = useState<{
    isOpen: boolean;
    productName: string;
    category: string;
  }>({
    isOpen: false,
    productName: "",
    category: "",
  });

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category_id === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.short_description &&
        product.short_description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-28 sm:py-36 bg-[#111214] border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-white/[0.07]">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#FF6B00] font-mono block mb-2 font-bold">
              Featured Lineup
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-[-0.035em] text-[#F5F5F7]">
              PRODUCT EXPLORER
            </h2>
          </div>
          <p className="text-sm text-[#9E9EA7] max-w-md">
            Filter our flagship OEM designs or search for specific specifications. Every product can be fully customized to your tech pack.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-12">
          {/* Category Pill Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-[#FF6B00] text-black border-[#FF6B00] shadow-[0_4px_16px_rgba(255,107,0,0.35)]"
                  : "bg-white/[0.04] text-[#9E9EA7] border-white/[0.1] hover:border-white/30 hover:text-[#F5F5F7]"
              }`}
            >
              All Products
            </button>
            {categories.slice(0, 6).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-[#FF6B00] text-black border-[#FF6B00] shadow-[0_4px_16px_rgba(255,107,0,0.35)]"
                    : "bg-white/[0.04] text-[#9E9EA7] border-white/[0.1] hover:border-white/30 hover:text-[#F5F5F7]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-[#9E9EA7] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products or materials..."
              className="w-full bg-white/[0.04] border border-white/[0.12] rounded-full focus:border-[#FF6B00]/60 text-[#F5F5F7] placeholder-[#9E9EA7]/60 pl-11 pr-4 py-2.5 text-xs outline-none transition-colors"
            />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center rounded-3xl border border-dashed border-white/[0.1] bg-[#0C0D0E] p-8">
            <p className="text-sm text-[#9E9EA7] mb-4">No products match your current filter.</p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="text-xs uppercase tracking-wider text-[#FF6B00] font-bold underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12">
              {filteredProducts.slice(0, 8).map((product) => {
                const primaryImg =
                  product.images?.find((img) => img.is_primary)?.image_url ||
                  product.images?.[0]?.image_url ||
                  "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop";

                const secondaryImg =
                  product.images?.[1]?.image_url ||
                  product.images?.[0]?.image_url ||
                  primaryImg;

                const categoryObj = categories.find((c) => c.id === product.category_id);

                return (
                  <div
                    key={product.id}
                    className="group bg-[#0C0D0E] rounded-3xl overflow-hidden border border-white/[0.07] hover:border-[#FF6B00]/40 hover:-translate-y-2 hover:shadow-[0_20px_48px_rgba(0,0,0,0.6)] flex flex-col justify-between transition-all duration-500"
                  >
                    {/* Image Container */}
                    <Link
                      href={`/products/${categoryObj?.slug || "general"}/${product.slug}`}
                      className="relative aspect-square overflow-hidden bg-[#0C0D0E] block"
                    >
                      {/* Primary Image */}
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out group-hover:scale-105"
                        style={{ backgroundImage: `url(${primaryImg})` }}
                      />
                      {/* Secondary Image on Hover */}
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-105"
                        style={{ backgroundImage: `url(${secondaryImg})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                      {/* MOQ Badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#0C0D0E]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#FF6B00]/25 text-[10px] font-mono text-[#FF6B00] font-semibold">
                        <Box className="w-3 h-3" />
                        <span>MOQ: {product.moq} Units</span>
                      </div>

                      {product.featured && (
                        <div className="absolute top-3 right-3 bg-[#FF6B00] text-black px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider shadow-[0_0_10px_rgba(255,107,0,0.5)]">
                          Featured
                        </div>
                      )}
                    </Link>

                    {/* Body Content */}
                    <div className="p-6 flex flex-col flex-1 justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FF6B00] block mb-1 font-bold">
                          {categoryObj?.name || "Manufacturing Division"}
                        </span>
                        <Link
                          href={`/products/${categoryObj?.slug || "general"}/${product.slug}`}
                          className="text-base font-bold uppercase tracking-tight text-[#F5F5F7] group-hover:text-[#FF6B00] transition-colors line-clamp-1 block mb-2"
                        >
                          {product.name}
                        </Link>
                        <p className="text-xs text-[#9E9EA7] line-clamp-2 leading-relaxed mb-4 font-normal">
                          {product.short_description || "Custom specifications & private label available."}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                        <Link
                          href={`/products/${categoryObj?.slug || "general"}/${product.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F5F5F7] hover:text-[#FF6B00] transition-colors"
                        >
                          <span>EXPLORE</span>
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </Link>

                        <button
                          onClick={() =>
                            setQuoteModalData({
                              isOpen: true,
                              productName: product.name,
                              category: categoryObj?.name || "General",
                            })
                          }
                          className="text-[11px] font-mono uppercase tracking-wider text-[#FF6B00] hover:text-black font-bold px-2.5 py-1 rounded-md bg-[#FF6B00]/10 hover:bg-[#FF6B00] transition-all cursor-pointer border border-[#FF6B00]/20 hover:border-[#FF6B00]"
                        >
                          Quote
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Explore Full Catalog CTA */}
            <div className="text-center pt-6">
              <Link
                href="/products"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#FF6B00] hover:bg-[#ff8533] text-black font-bold text-xs uppercase tracking-[0.25em] transition-all shadow-[0_8px_32px_rgba(255,107,0,0.35)] hover:shadow-[0_12px_40px_rgba(255,107,0,0.5)] hover:-translate-y-0.5"
              >
                <span>EXPLORE ALL 90 PRODUCTS IN CATALOG</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Quote Modal */}
      <QuoteModal
        isOpen={quoteModalData.isOpen}
        onClose={() => setQuoteModalData({ ...quoteModalData, isOpen: false })}
        defaultProductName={quoteModalData.productName}
        defaultCategory={quoteModalData.category}
      />
    </section>
  );
}
