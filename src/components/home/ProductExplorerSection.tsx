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
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-mono block mb-2 font-bold">
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
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all border shrink-0 ${
                selectedCategory === "all"
                  ? "bg-[#FFB900] text-black border-[#FFB900] shadow-xs"
                  : "bg-neutral-100 text-neutral-700 border-neutral-200 hover:border-black/30 hover:text-black"
              }`}
            >
              All Products
            </button>
            {categories.slice(0, 6).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all border shrink-0 ${
                  selectedCategory === cat.id
                    ? "bg-[#FFB900] text-black border-[#FFB900] shadow-xs"
                    : "bg-neutral-100 text-neutral-700 border-neutral-200 hover:border-black/30 hover:text-black"
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
              className="w-full bg-[#F9FAFB] border border-black/[0.09] rounded-full focus:border-[#FFB900] focus:ring-2 focus:ring-[#FFB900]/20 focus:bg-white text-[#1A1A1A] pl-11 pr-4 py-2.5 text-xs outline-none shadow-sm transition-all"
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
              className="text-xs uppercase tracking-wider text-black hover:text-[#FFB900] font-bold underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
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
                    className="group relative bg-white border border-neutral-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-black/30 hover:-translate-y-1 transition-all duration-300 rounded-3xl p-3 sm:p-3.5 flex flex-col justify-between"
                  >
                    {/* Image Container with Hover Cross-Fade */}
                    <Link
                      href={`/products/${categoryObj?.slug || "general"}/${product.slug}`}
                      className="relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-100/60 block mb-3"
                    >
                      <Image
                        src={primaryImg}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-all duration-500 ease-out group-hover:scale-105"
                      />
                      {secondaryImg !== primaryImg && (
                        <Image
                          src={secondaryImg}
                          alt={`${product.name} alternate view`}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100 group-hover:scale-105"
                        />
                      )}

                      {/* Frosted Glass MOQ Badge */}
                      <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-neutral-200 text-[10px] font-mono text-[#111827] font-semibold shadow-xs">
                        <Box className="w-2.5 h-2.5 text-black" />
                        <span>MOQ: {product.moq}</span>
                      </div>

                      {product.featured && (
                        <div className="absolute top-2.5 right-2.5 z-10 bg-black text-white px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider shadow-xs">
                          Featured
                        </div>
                      )}
                    </Link>

                    {/* Title */}
                    <div className="mb-3 px-1">
                      <Link
                        href={`/products/${categoryObj?.slug || "general"}/${product.slug}`}
                        className="text-xs sm:text-sm font-bold text-[#111827] group-hover:text-black transition-colors line-clamp-1 block"
                        title={product.name}
                      >
                        {product.name}
                      </Link>
                    </div>

                    {/* Action Buttons: Specs & Quote */}
                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-black/[0.05]">
                      <Link
                        href={`/products/${categoryObj?.slug || "general"}/${product.slug}`}
                        className="py-2 px-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[#111827] flex items-center justify-center gap-1 transition-all"
                      >
                        <span>Specs</span>
                        <ArrowUpRight className="w-3 h-3 text-neutral-600" />
                      </Link>

                      <button
                        onClick={() =>
                          setQuoteModalData({
                            isOpen: true,
                            productName: product.name,
                            category: categoryObj?.name || "General",
                          })
                        }
                        className="py-2 px-2.5 rounded-xl bg-[#FFB900] hover:bg-[#E5A700] text-black font-extrabold text-[10px] sm:text-[11px] font-mono uppercase tracking-wider shadow-xs hover:shadow-sm transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        Quote
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Explore Full 90 Products CTA */}
            <div className="text-center pt-6 px-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-neutral-950 hover:bg-[#FFB900] text-white hover:text-black font-extrabold text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.25em] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 max-w-full text-center"
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
