"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product, Category } from "@/types/database";
import { ArrowUpRight, Search, Clock, Box } from "lucide-react";
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
    <section className="py-28 sm:py-36 bg-white border-b border-black/[0.07] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-black/[0.07]">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-amber-800 font-mono block mb-2 font-bold">
              Featured Lineup
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-[-0.035em] text-[#1A1A1A]">
              PRODUCT EXPLORER
            </h2>
          </div>
          <p className="text-sm text-[#6B7280] max-w-md">
            Filter our flagship OEM designs or search for specific specifications. Every product can be fully customized to your tech pack.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-12">
          {/* Category Pill Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full lg:w-auto">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border shrink-0 ${
                selectedCategory === "all"
                  ? "bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-sm"
                  : "bg-[#F9FAFB] text-[#4B4B4B] border-black/[0.08] hover:border-black/[0.2] hover:text-[#1A1A1A]"
              }`}
            >
              All Products
            </button>
            {categories.slice(0, 6).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border shrink-0 ${
                  selectedCategory === cat.id
                    ? "bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-sm"
                    : "bg-[#F9FAFB] text-[#4B4B4B] border-black/[0.08] hover:border-black/[0.2] hover:text-[#1A1A1A]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Box - Rounded Pill */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products or materials..."
              className="w-full bg-[#F9FAFB] border border-black/[0.09] rounded-full focus:border-amber-600 focus:bg-white text-[#1A1A1A] pl-11 pr-4 py-2.5 text-xs outline-none shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Products Grid with Elevated Cards */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center rounded-3xl border border-dashed border-black/[0.12] bg-[#F9FAFB] p-8">
            <p className="text-sm text-[#6B7280] mb-4">No products match your current filter.</p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="text-xs uppercase tracking-wider text-amber-800 font-bold underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
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
                    className="group bg-white rounded-3xl overflow-hidden border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.11)] hover:border-amber-500/50 hover:-translate-y-1.5 flex flex-col justify-between transition-all duration-500"
                  >
                    {/* Image Container with Dual Image Flip on Hover */}
                    <Link
                      href={`/products/${categoryObj?.slug || "general"}/${product.slug}`}
                      className="relative aspect-square overflow-hidden bg-neutral-100 block"
                    >
                      {/* Primary Image */}
                      <Image
                        src={primaryImg}
                        alt={`${product.name} - Gloves Storm B2B Manufacturing`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                      />
                      {/* Secondary Image on Hover */}
                      {secondaryImg !== primaryImg && (
                        <Image
                          src={secondaryImg}
                          alt={`${product.name} alternate view`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          className="object-cover transition-opacity duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />

                      {/* MOQ Pill Badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-black/[0.08] text-[10px] font-mono text-[#1A1A1A] font-semibold shadow-xs">
                        <Box className="w-3 h-3 text-amber-600" />
                        <span>MOQ: {product.moq} Units</span>
                      </div>

                      {product.featured && (
                        <div className="absolute top-3 right-3 bg-amber-500 text-neutral-950 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider shadow-xs">
                          Featured
                        </div>
                      )}
                    </Link>

                    {/* Body Content */}
                    <div className="p-6 flex flex-col flex-1 justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-800 block mb-1 font-bold">
                          {categoryObj?.name || "Manufacturing Division"}
                        </span>
                        <Link
                          href={`/products/${categoryObj?.slug || "general"}/${product.slug}`}
                          className="text-base font-bold uppercase tracking-tight text-[#1A1A1A] group-hover:text-amber-800 transition-colors line-clamp-1 block mb-2"
                        >
                          {product.name}
                        </Link>
                        <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed mb-4 font-normal">
                          {product.short_description || "Custom specifications & private label available."}
                        </p>
                      </div>

                      {/* Metadata & Actions */}
                      <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between">
                        <Link
                          href={`/products/${categoryObj?.slug || "general"}/${product.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] group-hover:text-amber-600 transition-colors"
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
                          className="text-[11px] font-mono uppercase tracking-wider text-amber-800 hover:text-amber-900 font-bold px-2.5 py-1 rounded-md bg-amber-50 hover:bg-amber-100 transition-colors cursor-pointer border border-amber-200/60"
                        >
                          Quote
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Explore Full 90 Products CTA */}
            <div className="text-center pt-6 px-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#1A1A1A] hover:bg-amber-600 text-white font-bold text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.25em] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 max-w-full text-center"
              >
                <span>EXPLORE ALL 90 PRODUCTS IN CATALOG</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Reusable Quote Modal */}
      <QuoteModal
        isOpen={quoteModalData.isOpen}
        onClose={() => setQuoteModalData({ ...quoteModalData, isOpen: false })}
        defaultProductName={quoteModalData.productName}
        defaultCategory={quoteModalData.category}
      />
    </section>
  );
}
