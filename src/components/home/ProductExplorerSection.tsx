"use client";

import { useState } from "react";
import Link from "next/link";
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
    <section className="py-24 sm:py-32 bg-[#fafafa] border-b border-neutral-200/80 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-neutral-200">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-amber-800 font-mono block mb-2 font-bold">
              Featured Lineup
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-neutral-950">
              PRODUCT EXPLORER
            </h2>
          </div>
          <p className="text-sm text-neutral-600 max-w-md">
            Filter our flagship OEM designs or search for specific specifications. Every product can be fully customized to your tech pack.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-12">
          {/* Category Pill Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                selectedCategory === "all"
                  ? "bg-amber-500 text-neutral-950 border-amber-500 shadow-xs"
                  : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400 hover:text-neutral-950 shadow-2xs"
              }`}
            >
              All Products
            </button>
            {categories.slice(0, 6).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                  selectedCategory === cat.id
                    ? "bg-amber-500 text-neutral-950 border-amber-500 shadow-xs"
                    : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400 hover:text-neutral-950 shadow-2xs"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Box - Rounded Pill */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products or materials..."
              className="w-full bg-white border border-neutral-300 rounded-full focus:border-amber-600 text-neutral-900 pl-11 pr-4 py-2.5 text-xs outline-none shadow-2xs transition-colors"
            />
          </div>
        </div>

        {/* Products Grid with Elevated Cards */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center rounded-3xl border border-dashed border-neutral-300 bg-white p-8">
            <p className="text-sm text-neutral-500 mb-4">No products match your current filter.</p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="text-xs uppercase tracking-wider text-amber-700 font-bold underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const primaryImg =
                product.images?.find((img) => img.is_primary)?.image_url ||
                product.images?.[0]?.image_url ||
                "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop";

              const categoryObj = categories.find((c) => c.id === product.category_id);

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-neutral-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_18px_38px_rgba(180,83,9,0.12)] hover:border-amber-500/50 hover:-translate-y-1.5 flex flex-col justify-between transition-all duration-300"
                >
                  {/* Image Container with Hover Zoom */}
                  <Link
                    href={`/products/${categoryObj?.slug || "general"}/${product.slug}`}
                    className="relative aspect-square overflow-hidden bg-neutral-100 block"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ backgroundImage: `url(${primaryImg})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                    {/* MOQ Pill Badge */}
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

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-800 block mb-1 font-bold">
                        {categoryObj?.name || "Apparel & Gear"}
                      </span>
                      <Link
                        href={`/products/${categoryObj?.slug || "general"}/${product.slug}`}
                        className="text-base font-bold uppercase tracking-tight text-neutral-900 group-hover:text-amber-800 transition-colors line-clamp-1 block mb-2"
                      >
                        {product.name}
                      </Link>
                      <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed mb-4">
                        {product.short_description || "Custom specifications & private label available."}
                      </p>
                    </div>

                    {/* Metadata Footer */}
                    <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-500 font-medium">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>{product.lead_time || "2-4 Weeks"}</span>
                      </div>

                      <button
                        onClick={() =>
                          setQuoteModalData({
                            isOpen: true,
                            productName: product.name,
                            category: categoryObj?.name || "General",
                          })
                        }
                        className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-amber-900 hover:text-neutral-950 px-3.5 py-1.5 rounded-full bg-amber-50 hover:bg-amber-400 border border-amber-200/80 transition-all shadow-2xs group/btn"
                      >
                        <span>Quote</span>
                        <ArrowUpRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
