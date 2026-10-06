"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product, Category } from "@/types/database";
import {
  Search,
  Box,
  ArrowUpRight,
  Filter,
  X,
  LayoutGrid,
  List,
  SlidersHorizontal,
  RotateCcw,
  Scissors,
  Check,
  ChevronRight,
  Home,
} from "lucide-react";
import QuoteModal from "@/components/ui/QuoteModal";
import JacketMakerProductCard from "./JacketMakerProductCard";
import CustomBespokeGridTile from "./CustomBespokeGridTile";
import CollectionBuyingGuide from "./CollectionBuyingGuide";

interface ProductCatalogClientProps {
  initialProducts: Product[];
  categories: Category[];
  currentCategorySlug?: string;
  selectedCategorySlug?: string;
}

const COLOR_FILTERS = [
  { name: "Black", hex: "#171717" },
  { name: "Brown", hex: "#5c3a21" },
  { name: "Grey", hex: "#64748b" },
  { name: "Navy", hex: "#1e293b" },
  { name: "Green", hex: "#14532d" },
  { name: "Red", hex: "#b91c1c" },
  { name: "Tan", hex: "#d97706" },
  { name: "White", hex: "#f3f4f6" },
];

export default function ProductCatalogClient({
  initialProducts,
  categories,
  currentCategorySlug,
  selectedCategorySlug,
}: ProductCatalogClientProps) {
  const [liveCategories, setLiveCategories] = useState<Category[]>(categories);
  const [selectedCat, setSelectedCat] = useState<string>(
    selectedCategorySlug || currentCategorySlug || "all"
  );
  const [search, setSearch] = useState("");
  const [capabilityFilter, setCapabilityFilter] = useState<string>("all");
  const [selectedColor, setSelectedColor] = useState<string>("all");
  const [moqFilter, setMoqFilter] = useState<"all" | "low" | "medium" | "high">("all");
  const [sortBy, setSortBy] = useState<"featured" | "moq-asc" | "newest">("featured");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync with live categories from storage and broadcast events
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("gs_dynamic_categories");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setLiveCategories(parsed);
          }
        }
      } catch (e) {}

      const handleUpdate = (e: Event) => {
        const customEvent = e as CustomEvent<Category[]>;
        if (customEvent.detail && Array.isArray(customEvent.detail)) {
          setLiveCategories(customEvent.detail);
        }
      };
      window.addEventListener("gs_categories_updated", handleUpdate);

      let channel: BroadcastChannel | null = null;
      if ("BroadcastChannel" in window) {
        channel = new BroadcastChannel("gs_categories_channel");
        channel.onmessage = (msg) => {
          if (msg.data?.type === "CATEGORIES_UPDATED" && Array.isArray(msg.data.categories)) {
            setLiveCategories(msg.data.categories);
          }
        };
      }

      return () => {
        window.removeEventListener("gs_categories_updated", handleUpdate);
        if (channel) channel.close();
      };
    }
  }, []);

  const [quoteModalData, setQuoteModalData] = useState<{
    isOpen: boolean;
    productName: string;
    category: string;
    inquiryType: "Quote" | "Sample";
    quantity: number;
  }>({
    isOpen: false,
    productName: "",
    category: "",
    inquiryType: "Quote",
    quantity: 50,
  });

  const hasActiveFilters =
    selectedCat !== "all" ||
    search.trim() !== "" ||
    capabilityFilter !== "all" ||
    selectedColor !== "all" ||
    moqFilter !== "all";

  const handleResetFilters = () => {
    setSelectedCat("all");
    setSearch("");
    setCapabilityFilter("all");
    setSelectedColor("all");
    setMoqFilter("all");
  };

  // Filter products
  const filtered = useMemo(() => {
    return initialProducts.filter((p) => {
      // Category filter
      if (selectedCat !== "all") {
        const cat = liveCategories.find((c) => c.slug === selectedCat);
        if (cat && p.category_id !== cat.id) return false;
      }

      // Capability / feature filter
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
        if (!fullText.includes(cap)) return false;
      }

      // Color filter simulation
      if (selectedColor !== "all") {
        const cLower = selectedColor.toLowerCase();
        const descMatch = (p.description || "").toLowerCase().includes(cLower);
        const nameMatch = (p.name || "").toLowerCase().includes(cLower);
        const keywordMatch = (p.primary_keyword || "").toLowerCase().includes(cLower);
        if (!descMatch && !nameMatch && !keywordMatch && p.id.charCodeAt(0) % 2 === 0) {
          // allow partial matches for sample distribution
          return false;
        }
      }

      // MOQ filter
      if (moqFilter === "low" && p.moq >= 50) return false;
      if (moqFilter === "medium" && (p.moq < 50 || p.moq > 100)) return false;
      if (moqFilter === "high" && p.moq <= 100) return false;

      // Search filter
      const q = search.toLowerCase().trim();
      if (q !== "") {
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesDesc = p.short_description?.toLowerCase().includes(q);
        const matchesCat = liveCategories
          .find((c) => c.id === p.category_id)
          ?.name.toLowerCase()
          .includes(q);
        return matchesName || matchesDesc || matchesCat;
      }

      return true;
    });
  }, [initialProducts, liveCategories, selectedCat, capabilityFilter, selectedColor, moqFilter, search]);

  // Sort products
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortBy === "moq-asc") return a.moq - b.moq;
      if (sortBy === "newest") return b.created_at.localeCompare(a.created_at);
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [filtered, sortBy]);

  const activeCategoryObj = liveCategories.find((c) => c.slug === selectedCat);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Breadcrumbs */}
      <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
        <Link href="/" className="hover:text-neutral-950 flex items-center gap-1 transition-colors">
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <Link href="/products" className="hover:text-neutral-950 transition-colors">
          Collections
        </Link>
        {activeCategoryObj && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-neutral-950 font-semibold">{activeCategoryObj.name}</span>
          </>
        )}
      </nav>

      {/* 2. Collection Header Banner (The Jacket Maker Style) */}
      <div className="border-b border-neutral-200/90 pb-8 text-neutral-950">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[10px] font-mono uppercase tracking-widest font-bold mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Sialkot OEM Factory Collection</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-neutral-950 mb-4 leading-tight">
            {activeCategoryObj ? `Custom ${activeCategoryObj.name}` : "All Apparel & Teamwear Collections"}
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
            {activeCategoryObj?.description ||
              "Explore export-grade combat equipment, heavy French Terry hoodies, activewear sets, and custom team uniforms. Handcrafted in Sialkot, Pakistan with direct factory OEM manufacturing, custom sizing blocks, and rapid air freight."}
          </p>
        </div>

        {/* 3. Horizontal Sub-Collection Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-6 pb-2">
          <button
            type="button"
            onClick={() => setSelectedCat("all")}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCat === "all"
                ? "bg-neutral-950 text-white shadow-xs"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
          >
            All Products ({initialProducts.length})
          </button>
          {liveCategories.map((cat) => {
            const count = initialProducts.filter((p) => p.category_id === cat.id).length;
            const isSelected = selectedCat === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCat(cat.slug)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? "bg-neutral-950 text-white shadow-xs"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Main 2-Column Layout: Sidebar Filters + Products Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* =========================================================================
            LEFT SIDEBAR: THE JACKET MAKER STYLE CLEAN FILTERS (DESKTOP)
        ========================================================================= */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-24 space-y-6">
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-2xs space-y-6">
            {/* Sidebar Header & Clear Button */}
            <div className="flex items-center justify-between pb-3.5 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-neutral-900" />
                <h3 className="text-xs font-black uppercase tracking-wider text-neutral-900">
                  Filter Catalog
                </h3>
              </div>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-950 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Keyword Search */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold block mb-2">
                Search Style
              </span>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="e.g. Hoodie, Varsity, Suede..."
                  className="w-full bg-neutral-50 hover:bg-white focus:bg-white border border-neutral-200 rounded-xl focus:border-neutral-950 text-neutral-900 pl-8.5 pr-8 py-2 text-xs outline-none transition-all"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Color Swatch Filters */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
                  Colorway
                </span>
                {selectedColor !== "all" && (
                  <button
                    type="button"
                    onClick={() => setSelectedColor("all")}
                    className="text-[10px] text-neutral-500 hover:text-neutral-900 underline"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {COLOR_FILTERS.map((col) => {
                  const isSelected = selectedColor === col.name;
                  return (
                    <button
                      key={col.name}
                      type="button"
                      onClick={() => setSelectedColor(isSelected ? "all" : col.name)}
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl border text-[10px] transition-all cursor-pointer ${
                        isSelected
                          ? "border-neutral-950 bg-neutral-50 font-bold text-neutral-950"
                          : "border-neutral-200 hover:border-neutral-400 text-neutral-600"
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span className="truncate max-w-[48px]">{col.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Categories List */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold block mb-2.5">
                Collection
              </span>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setSelectedCat("all")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                    selectedCat === "all"
                      ? "bg-neutral-950 text-white font-bold"
                      : "text-neutral-700 hover:bg-neutral-100 font-normal"
                  }`}
                >
                  <span>All Collections</span>
                  <span className="font-mono text-[10px] opacity-75">{initialProducts.length}</span>
                </button>
                {liveCategories.map((c) => {
                  const isSelected = selectedCat === c.slug;
                  const count = initialProducts.filter((p) => p.category_id === c.id).length;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCat(c.slug)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-neutral-950 text-white font-bold"
                          : "text-neutral-700 hover:bg-neutral-100 font-normal"
                      }`}
                    >
                      <span className="truncate pr-2">{c.name}</span>
                      <span className="font-mono text-[10px] opacity-75">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Minimum Order Quantity (MOQ) */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold block mb-2.5">
                Starting Order Quantity (MOQ)
              </span>
              <div className="space-y-1.5">
                {[
                  { label: "All MOQs", val: "all" },
                  { label: "Low MOQ (< 50 Units)", val: "low" },
                  { label: "Standard MOQ (50 - 100)", val: "medium" },
                  { label: "Bulk Tier (100+ Units)", val: "high" },
                ].map((tier) => (
                  <label
                    key={tier.val}
                    className="flex items-center gap-2.5 text-xs text-neutral-700 hover:text-neutral-950 cursor-pointer py-1"
                  >
                    <input
                      type="radio"
                      name="moqTier"
                      checked={moqFilter === tier.val}
                      onChange={() => setMoqFilter(tier.val as any)}
                      className="accent-neutral-950 w-3.5 h-3.5 cursor-pointer"
                    />
                    <span>{tier.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Bespoke Prompt Box */}
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
              <div className="flex items-center gap-2 mb-1.5">
                <Scissors className="w-4 h-4 text-neutral-950" />
                <h4 className="text-xs font-bold text-neutral-950 uppercase tracking-tight">
                  Custom Tech Pack?
                </h4>
              </div>
              <p className="text-[11px] text-neutral-600 leading-relaxed mb-3">
                Have your own CAD or sample? We offer direct OEM prototyping in 5–7 days.
              </p>
              <button
                type="button"
                onClick={() =>
                  setQuoteModalData({
                    isOpen: true,
                    productName: "Bespoke Apparel Development",
                    category: activeCategoryObj?.name || "Custom Apparel",
                    inquiryType: "Quote",
                    quantity: 50,
                  })
                }
                className="w-full py-2 px-3 rounded-lg bg-neutral-950 hover:bg-neutral-800 text-white text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer text-center"
              >
                Inquire Bespoke
              </button>
            </div>
          </div>
        </aside>

        {/* =========================================================================
            RIGHT MAIN AREA: TOP UTILITY BAR & PRODUCT GRID
        ========================================================================= */}
        <div className="lg:col-span-9 space-y-6">
          {/* Top Utility Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-3 px-4 bg-white rounded-2xl border border-neutral-200/90 shadow-2xs">
            <div className="flex items-center gap-3">
              {/* Mobile Filter Toggle */}
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-300 text-xs font-bold text-neutral-900 bg-neutral-50 hover:bg-neutral-100 cursor-pointer"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-neutral-950" />
                )}
              </button>

              <span className="text-xs text-neutral-600 font-medium">
                Showing <strong className="text-neutral-950">{sorted.length}</strong> styles
              </span>
            </div>

            <div className="flex items-center gap-3 ml-auto">
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-500 hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 text-xs font-semibold py-1.5 pl-3 pr-8 outline-none focus:border-neutral-950 cursor-pointer"
                >
                  <option value="featured">Featured Collection</option>
                  <option value="moq-asc">MOQ: Low to High</option>
                  <option value="newest">Latest Releases</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center p-1 bg-neutral-100 rounded-lg border border-neutral-200">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  title="Grid View"
                  className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-white text-neutral-950 shadow-2xs"
                      : "text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("table")}
                  title="Spec Table View"
                  className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                    viewMode === "table"
                      ? "bg-white text-neutral-950 shadow-2xs"
                      : "text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Badges */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="text-neutral-400 font-mono text-[11px]">Active:</span>
              {selectedCat !== "all" && (
                <span className="inline-flex items-center gap-1.5 bg-neutral-100 border border-neutral-200 text-neutral-900 px-3 py-1 rounded-full font-medium">
                  <span>{activeCategoryObj?.name || selectedCat}</span>
                  <button onClick={() => setSelectedCat("all")} className="cursor-pointer hover:text-neutral-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedColor !== "all" && (
                <span className="inline-flex items-center gap-1.5 bg-neutral-100 border border-neutral-200 text-neutral-900 px-3 py-1 rounded-full font-medium">
                  <span>Color: {selectedColor}</span>
                  <button onClick={() => setSelectedColor("all")} className="cursor-pointer hover:text-neutral-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {search && (
                <span className="inline-flex items-center gap-1.5 bg-neutral-100 border border-neutral-200 text-neutral-900 px-3 py-1 rounded-full font-medium">
                  <span>&quot;{search}&quot;</span>
                  <button onClick={() => setSearch("")} className="cursor-pointer hover:text-neutral-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-neutral-500 hover:text-neutral-950 underline text-[11px] ml-2 cursor-pointer font-mono"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Product Cards Grid with Interstitial Bespoke Tile */}
          {sorted.length === 0 ? (
            <div className="bg-white rounded-3xl border border-neutral-200 p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                <Box className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold uppercase tracking-tight text-neutral-900">
                No matching manufacturing models found
              </h3>
              <p className="text-xs text-neutral-500 max-w-md mx-auto leading-relaxed">
                Clear filters or contact our factory engineering team for bespoke development.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {sorted.map((product, idx) => {
                const categoryObj = liveCategories.find((c) => c.id === product.category_id);
                // Insert Custom Bespoke Tile at index 3 or 4
                const isPromoIndex = idx === 3;

                return (
                  <div key={product.id} className="contents">
                    <JacketMakerProductCard
                      product={product}
                      category={categoryObj}
                      priority={idx < 4}
                      onInquire={(p) =>
                        setQuoteModalData({
                          isOpen: true,
                          productName: p.name,
                          category: categoryObj?.name || "Equipment",
                          inquiryType: "Quote",
                          quantity: p.moq || 50,
                        })
                      }
                    />

                    {isPromoIndex && (
                      <CustomBespokeGridTile
                        categoryName={activeCategoryObj?.name || "Apparel & Gear"}
                        onOpenModal={() =>
                          setQuoteModalData({
                            isOpen: true,
                            productName: "Bespoke Made-to-Measure Order",
                            category: activeCategoryObj?.name || "Custom Apparel",
                            inquiryType: "Quote",
                            quantity: 50,
                          })
                        }
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* Spec Table View */
            <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-neutral-950 text-white font-mono text-[10px] uppercase tracking-wider">
                      <th className="py-3.5 px-4">Manufacturing Model</th>
                      <th className="py-3.5 px-3">Division</th>
                      <th className="py-3.5 px-3">Min Order</th>
                      <th className="py-3.5 px-3">Lead Time</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {sorted.map((product) => {
                      const categoryObj = liveCategories.find((c) => c.id === product.category_id);
                      const firstImgObj = product.images?.[0];
                      const primaryImgUrl =
                        (typeof firstImgObj === "string" ? firstImgObj : firstImgObj?.image_url) ||
                        "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800";

                      return (
                        <tr key={product.id} className="hover:bg-neutral-50 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <Link
                                href={`/products/${categoryObj?.slug || "general"}/${product.slug}`}
                                className="w-12 h-12 rounded-xl bg-neutral-100 overflow-hidden border border-neutral-200 shrink-0 block relative"
                              >
                                <Image
                                  src={primaryImgUrl}
                                  alt={product.name}
                                  fill
                                  sizes="48px"
                                  className="object-cover"
                                />
                              </Link>
                              <div>
                                <Link
                                  href={`/products/${categoryObj?.slug || "general"}/${product.slug}`}
                                  className="font-bold text-neutral-950 hover:text-neutral-700 text-xs uppercase tracking-tight block truncate max-w-xs"
                                >
                                  {product.name}
                                </Link>
                                <span className="text-[10px] text-neutral-500 font-mono">
                                  SKU: {product.slug.toUpperCase().slice(0, 10)}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-neutral-700 font-medium">
                            {categoryObj?.name || "Equipment"}
                          </td>
                          <td className="py-3 px-3 font-mono font-bold text-neutral-950">
                            {product.moq || 30} pcs
                          </td>
                          <td className="py-3 px-3 font-mono text-emerald-700 font-bold">
                            {product.lead_time || "2-3 Weeks"}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              type="button"
                              onClick={() =>
                                setQuoteModalData({
                                  isOpen: true,
                                  productName: product.name,
                                  category: categoryObj?.name || "Equipment",
                                  inquiryType: "Quote",
                                  quantity: product.moq || 50,
                                })
                              }
                              className="py-1.5 px-3 rounded-lg bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-[11px] transition-colors cursor-pointer"
                            >
                              Inquire
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. Bottom SEO Buying Guide & Accordion FAQ (The Secret to Top Rankings) */}
      <CollectionBuyingGuide
        category={activeCategoryObj}
        categories={liveCategories}
      />

      {/* Quote / RFQ Modal */}
      <QuoteModal
        isOpen={quoteModalData.isOpen}
        onClose={() => setQuoteModalData((prev) => ({ ...prev, isOpen: false }))}
        defaultProductName={quoteModalData.productName}
        defaultCategory={quoteModalData.category}
        inquiryType={quoteModalData.inquiryType}
        defaultQuantity={quoteModalData.quantity}
      />
    </div>
  );
}
