"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Product, Category } from "@/types/database";
import {
  Search,
  Clock,
  Box,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Filter,
  X,
  LayoutGrid,
  List,
  Tag,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  SlidersHorizontal,
  RotateCcw,
  MessageSquare,
  Building2,
} from "lucide-react";
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
  const [moqFilter, setMoqFilter] = useState<"all" | "low" | "medium" | "high">("all");
  const [sortBy, setSortBy] = useState<"featured" | "moq-asc" | "newest">("featured");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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

  // Check if any filters are active
  const hasActiveFilters =
    selectedCat !== "all" ||
    search.trim() !== "" ||
    capabilityFilter !== "all" ||
    moqFilter !== "all";

  const handleResetFilters = () => {
    setSelectedCat("all");
    setSearch("");
    setCapabilityFilter("all");
    setMoqFilter("all");
  };

  // Filter products
  const filtered = useMemo(() => {
    return initialProducts.filter((p) => {
      // Category filter
      if (selectedCat !== "all") {
        const cat = categories.find((c) => c.slug === selectedCat);
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

      // MOQ filter
      if (moqFilter === "low" && p.moq >= 50) return false;
      if (moqFilter === "medium" && (p.moq < 50 || p.moq > 100)) return false;
      if (moqFilter === "high" && p.moq <= 100) return false;

      // Search filter
      const q = search.toLowerCase().trim();
      if (q !== "") {
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesDesc = p.short_description?.toLowerCase().includes(q);
        const matchesCat = categories
          .find((c) => c.id === p.category_id)
          ?.name.toLowerCase()
          .includes(q);
        return matchesName || matchesDesc || matchesCat;
      }

      return true;
    });
  }, [initialProducts, categories, selectedCat, capabilityFilter, moqFilter, search]);

  // Sort products
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortBy === "moq-asc") return a.moq - b.moq;
      if (sortBy === "newest") return b.created_at.localeCompare(a.created_at);
      // default: featured first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [filtered, sortBy]);

  const activeCategoryObj = categories.find((c) => c.slug === selectedCat);

  // Available capabilities for quick filter chips
  const capabilities = [
    { label: "All Capabilities", value: "all" },
    { label: "Custom OEM/ODM", value: "custom" },
    { label: "CE Certified", value: "ce" },
    { label: "Genuine Leather", value: "leather" },
    { label: "Gel Padding", value: "gel" },
    { label: "Private Label", value: "private" },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner / Hero Header */}
      <div className="bg-neutral-950 text-white rounded-3xl p-6 sm:p-10 border border-neutral-800 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs uppercase tracking-widest mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Sialkot Factory Direct Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white mb-3">
            {activeCategoryObj ? activeCategoryObj.name : "Manufacturing Catalog"}
          </h1>
          <p className="text-sm text-neutral-400 leading-relaxed">
            {activeCategoryObj?.description ||
              "Explore export-grade combat gear, specialized leather gloves, and industrial safety equipment engineered for global brands with complete OEM/ODM customization."}
          </p>
        </div>

        {/* Decorative corner background pattern */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main 2-Column Layout: Sidebar Filters + Products Main Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* =========================================================================
            LEFT SIDEBAR: PREMIUM FILTERS (DESKTOP)
        ========================================================================= */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-24 space-y-6">
          <div className="bg-white rounded-3xl border border-neutral-200/90 p-5 shadow-2xs space-y-6">
            {/* Sidebar Header & Clear Button */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-amber-600" />
                <h3 className="text-xs font-black uppercase tracking-wider text-neutral-900">
                  Refine Catalog
                </h3>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-neutral-500 hover:text-amber-800 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All</span>
                </button>
              )}
            </div>

            {/* 1. Keyword Search */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold block mb-2">
                Search Models
              </span>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Keyword, model, fabric..."
                  className="w-full bg-neutral-50 hover:bg-white focus:bg-white border border-neutral-200 rounded-xl focus:border-amber-600 text-neutral-900 pl-8.5 pr-8 py-2 text-xs outline-none transition-all"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* 2. Manufacturing Divisions (Categories) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
                  Divisions ({categories.length})
                </span>
                {selectedCat !== "all" && (
                  <button
                    onClick={() => setSelectedCat("all")}
                    className="text-[10px] text-amber-700 hover:underline font-mono"
                  >
                    View All
                  </button>
                )}
              </div>

              <div className="space-y-1 max-h-72 overflow-y-auto pr-1 scrollbar-thin">
                {/* All Categories Option */}
                <button
                  onClick={() => setSelectedCat("all")}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    selectedCat === "all"
                      ? "bg-neutral-950 text-white shadow-xs font-bold"
                      : "text-neutral-700 hover:bg-neutral-50"
                  }`}
                >
                  <span>All Factory Divisions</span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      selectedCat === "all"
                        ? "bg-amber-500 text-neutral-950 font-bold"
                        : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {initialProducts.length}
                  </span>
                </button>

                {/* Individual Categories */}
                {categories.map((cat) => {
                  const count = initialProducts.filter((p) => p.category_id === cat.id).length;
                  const isSelected = selectedCat === cat.slug;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCat(cat.slug)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? "bg-amber-500/15 border border-amber-500/30 text-amber-950 font-bold shadow-2xs"
                          : "text-neutral-700 hover:bg-neutral-50"
                      }`}
                    >
                      <span className="truncate pr-2">{cat.name}</span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full shrink-0 ${
                          isSelected
                            ? "bg-amber-500 text-neutral-950 font-bold"
                            : "bg-neutral-100 text-neutral-500"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Minimum Order Quantity (MOQ) Brackets */}
            <div className="pt-4 border-t border-neutral-100">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold block mb-2">
                Order Scale (MOQ)
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                {[
                  { id: "all", label: "Any Minimum Order" },
                  { id: "low", label: "Low MOQ (≤ 50 pairs)" },
                  { id: "medium", label: "Standard (50 - 100 pairs)" },
                  { id: "high", label: "Bulk Enterprise (100+ pairs)" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setMoqFilter(item.id as any)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                      moqFilter === item.id
                        ? "bg-neutral-900 text-white font-bold"
                        : "text-neutral-600 hover:bg-neutral-100"
                    }`}
                  >
                    <span>{item.label}</span>
                    {moqFilter === item.id && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. OEM / Technical Capabilities */}
            <div className="pt-4 border-t border-neutral-100">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold block mb-2">
                Key Technical Ability
              </span>
              <div className="flex flex-wrap gap-1.5">
                {capabilities.map((cap) => (
                  <button
                    key={cap.value}
                    onClick={() => setCapabilityFilter(cap.value)}
                    className={`text-[10px] font-medium px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                      capabilityFilter === cap.value
                        ? "bg-amber-500 text-neutral-950 border-amber-600 font-bold shadow-2xs"
                        : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    {cap.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sialkot OEM Factory Sampling Card in Sidebar */}
          <div className="p-5 rounded-3xl bg-neutral-900 text-white border border-neutral-800 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                Rapid OEM Prototype
              </span>
            </div>
            <h4 className="text-xs font-bold uppercase tracking-tight text-white">
              Need a Custom Tech Pack or Counter Sample?
            </h4>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              Send your design vectors or physical sample. Our master pattern makers produce pre-production samples in 3–5 working days.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors pt-1"
            >
              <span>Submit Tech Pack</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </aside>

        {/* =========================================================================
            RIGHT MAIN AREA: SEARCH HEADER, VIEW TOGGLE, PRODUCT CARDS
        ========================================================================= */}
        <main className="lg:col-span-9 space-y-6">
          {/* Top Control Bar */}
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-4 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Left: Mobile Filter Button & Active Count */}
            <div className="flex items-center justify-between sm:justify-start gap-3">
              {/* Mobile Filter Toggle */}
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider shadow-xs cursor-pointer"
              >
                <Filter className="w-3.5 h-3.5 text-amber-400" />
                <span>Filters {hasActiveFilters ? "(Active)" : ""}</span>
              </button>

              <div>
                <span className="text-xs font-bold text-neutral-900">
                  {sorted.length} {sorted.length === 1 ? "Model" : "Models"}
                </span>
                <span className="text-xs text-neutral-400 ml-1.5 hidden sm:inline">
                  in {activeCategoryObj?.name || "All Divisions"}
                </span>
              </div>
            </div>

            {/* Right: Sort & View Mode Switcher */}
            <div className="flex items-center justify-end gap-3">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                <span className="hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs px-3 py-1.5 outline-none cursor-pointer focus:border-amber-600"
                >
                  <option value="featured">Featured OEM</option>
                  <option value="moq-asc">Lowest MOQ (Units)</option>
                  <option value="newest">Latest Releases</option>
                </select>
              </div>

              {/* View Mode Toggle */}
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
                  title="B2B Procurement Table View"
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

          {/* Active Filter Chips Bar */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="text-neutral-400 font-mono text-[11px]">Active:</span>
              {selectedCat !== "all" && (
                <span className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-900 px-2.5 py-1 rounded-full font-medium">
                  <span>Division: {activeCategoryObj?.name || selectedCat}</span>
                  <button
                    onClick={() => setSelectedCat("all")}
                    className="hover:text-amber-950 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {search && (
                <span className="inline-flex items-center gap-1.5 bg-neutral-100 border border-neutral-200 text-neutral-800 px-2.5 py-1 rounded-full font-medium">
                  <span>Keyword: &quot;{search}&quot;</span>
                  <button
                    onClick={() => setSearch("")}
                    className="hover:text-neutral-950 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {capabilityFilter !== "all" && (
                <span className="inline-flex items-center gap-1.5 bg-neutral-100 border border-neutral-200 text-neutral-800 px-2.5 py-1 rounded-full font-medium">
                  <span>Capability: {capabilityFilter}</span>
                  <button
                    onClick={() => setCapabilityFilter("all")}
                    className="hover:text-neutral-950 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {moqFilter !== "all" && (
                <span className="inline-flex items-center gap-1.5 bg-neutral-100 border border-neutral-200 text-neutral-800 px-2.5 py-1 rounded-full font-medium">
                  <span>MOQ: {moqFilter}</span>
                  <button
                    onClick={() => setMoqFilter("all")}
                    className="hover:text-neutral-950 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={handleResetFilters}
                className="text-neutral-500 hover:text-neutral-900 underline text-[11px] ml-2 cursor-pointer font-mono"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Empty State */}
          {sorted.length === 0 ? (
            <div className="bg-white rounded-3xl border border-neutral-200 p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                <Box className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold uppercase tracking-tight text-neutral-900">
                No matching manufacturing models found
              </h3>
              <p className="text-xs text-neutral-500 max-w-md mx-auto leading-relaxed">
                We couldn&apos;t find any items matching your selected division and criteria. Clear filters or contact our factory engineering team for bespoke development.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            /* =====================================================================
               GRID VIEW: CLEAN PRODUCT CARDS (WITHOUT PRICE TIERS)
            ===================================================================== */
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {sorted.map((product) => {
                const categoryObj = categories.find((c) => c.id === product.category_id);
                const isHovered = hoveredProductId === product.id;

                const primaryImg =
                  product.images?.[0] ||
                  "https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?auto=format&fit=crop&q=80&w=800";
                const secondaryImg =
                  product.images?.[1] ||
                  "https://images.unsplash.com/photo-1517438322307-e67111335449?auto=format&fit=crop&q=80&w=800";

                return (
                  <div
                    key={product.id}
                    onMouseEnter={() => setHoveredProductId(product.id)}
                    onMouseLeave={() => setHoveredProductId(null)}
                    className="group bg-white rounded-2xl border border-neutral-200/90 hover:border-neutral-300 hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden"
                  >
                    {/* Image Box with Dual Image Crossfade */}
                    <Link
                      href={`/products/${categoryObj?.slug || "general"}/${product.slug}`}
                      className="relative aspect-4/3 w-full bg-neutral-100 overflow-hidden block"
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{
                          backgroundImage: `url(${isHovered ? secondaryImg : primaryImg})`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-neutral-200 text-[10px] font-mono text-neutral-800 font-semibold shadow-2xs">
                        <Box className="w-3 h-3 text-amber-600" />
                        <span>MOQ: {product.moq} Units</span>
                      </div>

                      {product.featured && (
                        <div className="absolute top-3 right-3 bg-amber-500 text-neutral-950 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider shadow-2xs">
                          Featured
                        </div>
                      )}
                    </Link>

                    {/* Content Section (NO PRICE TIERS - shown only on detail page) */}
                    <div className="p-5 flex flex-col flex-1 justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-amber-800 font-bold block mb-1">
                          {categoryObj?.name || "Equipment"}
                        </span>
                        <Link
                          href={`/products/${categoryObj?.slug || "general"}/${product.slug}`}
                          className="text-base font-bold uppercase tracking-tight text-neutral-950 group-hover:text-amber-800 transition-colors line-clamp-1 block mb-1.5"
                        >
                          {product.name}
                        </Link>
                        <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed mb-4">
                          {product.short_description}
                        </p>
                      </div>

                      {/* Bottom Spec & Action Bar */}
                      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1 text-[10px] font-mono text-neutral-500">
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>{product.lead_time || "2-4 W"}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <Link
                            href={`/products/${categoryObj?.slug || "general"}/${product.slug}`}
                            className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-neutral-900 group-hover:text-amber-800 px-2.5 py-1.5 transition-colors font-mono"
                          >
                            <span>EXPLORE</span>
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </Link>

                          <Link
                            href={`/customize?product=${product.id}`}
                            className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-neutral-950 bg-amber-500 hover:bg-amber-400 px-3 py-1.5 rounded-full shadow-2xs transition-all font-mono"
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
          ) : (
            /* =====================================================================
               TABLE VIEW: B2B SPEC SHEET (WITHOUT PRICE TIERS)
            ===================================================================== */
            <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-neutral-900 text-white font-mono text-[10px] uppercase tracking-wider">
                      <th className="py-3 px-4">Manufacturing Model</th>
                      <th className="py-3 px-3">Division</th>
                      <th className="py-3 px-3">Min Order</th>
                      <th className="py-3 px-3">Lead Time</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {sorted.map((product) => {
                      const categoryObj = categories.find((c) => c.id === product.category_id);
                      const primaryImg =
                        product.images?.[0] ||
                        "https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?auto=format&fit=crop&q=80&w=800";

                      return (
                        <tr
                          key={product.id}
                          className="hover:bg-amber-50/30 transition-colors group"
                        >
                          {/* Product Thumbnail & Name */}
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <Link
                                href={`/products/${categoryObj?.slug || "general"}/${product.slug}`}
                                className="w-12 h-12 rounded-xl bg-neutral-100 overflow-hidden border border-neutral-200 shrink-0 block relative"
                              >
                                <div
                                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform"
                                  style={{ backgroundImage: `url(${primaryImg})` }}
                                />
                              </Link>
                              <div>
                                <Link
                                  href={`/products/${categoryObj?.slug || "general"}/${product.slug}`}
                                  className="font-bold text-neutral-950 hover:text-amber-800 text-xs uppercase tracking-tight block truncate max-w-xs"
                                >
                                  {product.name}
                                </Link>
                                <span className="text-[11px] text-neutral-500 line-clamp-1">
                                  {product.short_description}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Division */}
                          <td className="py-3 px-3">
                            <span className="font-mono text-[10px] uppercase font-bold text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded whitespace-nowrap">
                              {categoryObj?.name || "Equipment"}
                            </span>
                          </td>

                          {/* MOQ */}
                          <td className="py-3 px-3 font-mono font-bold text-neutral-900 whitespace-nowrap">
                            {product.moq} Units
                          </td>

                          {/* Lead time */}
                          <td className="py-3 px-3 font-mono text-xs text-neutral-600 whitespace-nowrap">
                            {product.lead_time || "2-4 Weeks"}
                          </td>

                          {/* Actions */}
                          <td className="py-3 px-4 text-right whitespace-nowrap">
                            <div className="inline-flex items-center gap-2">
                              <button
                                onClick={() =>
                                  setQuoteModalData({
                                    isOpen: true,
                                    productName: product.name,
                                    category: categoryObj?.name || "General",
                                    inquiryType: "Quote",
                                    quantity: product.moq,
                                  })
                                }
                                className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
                              >
                                Quick RFQ
                              </button>
                              <Link
                                href={`/products/${categoryObj?.slug || "general"}/${product.slug}`}
                                className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-[10px] uppercase tracking-wider transition-colors inline-flex items-center gap-1"
                              >
                                <span>View Specs</span>
                                <ChevronRight className="w-3 h-3 text-amber-400" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* =========================================================================
          MOBILE SLIDING DRAWER FOR FILTERS
      ========================================================================= */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end lg:hidden animate-in fade-in duration-200">
          <div className="w-full max-w-xs bg-white h-full p-6 flex flex-col justify-between overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-amber-600" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-neutral-900">
                    Filter Catalog
                  </h3>
                </div>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Keyword Search */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold block mb-2">
                  Search
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Keyword, model..."
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs outline-none"
                />
              </div>

              {/* Divisions */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold block mb-2">
                  Division
                </span>
                <div className="space-y-1 max-h-56 overflow-y-auto">
                  <button
                    onClick={() => setSelectedCat("all")}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between ${
                      selectedCat === "all"
                        ? "bg-neutral-950 text-white font-bold"
                        : "text-neutral-700 hover:bg-neutral-50"
                    }`}
                  >
                    <span>All Divisions</span>
                    <span className="text-[10px] font-mono">{initialProducts.length}</span>
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCat(cat.slug)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between ${
                        selectedCat === cat.slug
                          ? "bg-amber-500/15 text-amber-950 font-bold"
                          : "text-neutral-700 hover:bg-neutral-50"
                      }`}
                    >
                      <span className="truncate pr-2">{cat.name}</span>
                      <span className="text-[10px] font-mono">
                        {initialProducts.filter((p) => p.category_id === cat.id).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* MOQ */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold block mb-2">
                  Minimum Order (MOQ)
                </span>
                <div className="space-y-1">
                  {[
                    { id: "all", label: "Any Minimum Order" },
                    { id: "low", label: "Low MOQ (≤ 50 pairs)" },
                    { id: "medium", label: "Standard (50 - 100 pairs)" },
                    { id: "high", label: "Bulk (100+ pairs)" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setMoqFilter(item.id as any)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs ${
                        moqFilter === item.id
                          ? "bg-neutral-900 text-white font-bold"
                          : "text-neutral-600 hover:bg-neutral-100"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-100 flex gap-2">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 text-xs font-bold uppercase tracking-wider text-center"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider text-center"
              >
                Apply ({sorted.length})
              </button>
            </div>
          </div>
        </div>
      )}

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
