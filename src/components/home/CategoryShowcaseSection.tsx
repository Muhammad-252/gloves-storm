"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product, Category } from "@/types/database";
import { ArrowUpRight, Search, Box, X, Filter, ChevronDown, CheckCircle2 } from "lucide-react";
import InteractiveRfqModal from "../ui/InteractiveRfqModal";

interface CategoryShowcaseProps {
  products: Product[];
  categories: Category[];
}

const CATEGORY_CHIPS = [
  { id: "all", label: "All Products", filterKey: "all" },
  { id: "tracksuits", label: "Tracksuits & Fleeces", filterKey: "tracksuit" },
  { id: "streetwear", label: "Streetwear & Tees", filterKey: "streetwear" },
  { id: "combat", label: "Combat & Boxing Gear", filterKey: "combat" },
  { id: "outerwear", label: "Jackets & Outerwear", filterKey: "outerwear" },
];

const GSM_OPTIONS = [
  { label: "All Fabric GSM", value: "all" },
  { label: "280–320 GSM (Lightweight)", value: "280" },
  { label: "350–380 GSM (Midweight)", value: "350" },
  { label: "400–450+ GSM (Heavyweight)", value: "400" },
];

const TECHNIQUE_OPTIONS = [
  { label: "All Print Techniques", value: "all" },
  { label: "Tajima 3D Puff Embroidery", value: "embroidery" },
  { label: "Silk Screen Printing", value: "screen" },
  { label: "Direct-to-Film (DTF)", value: "dtf" },
  { label: "Italian Dye Sublimation", value: "sublimation" },
];

// Helper to derive luxury technical bullets for any product
function getTechnicalBullets(product: Product, categorySlug?: string): string[] {
  const nameLower = product.name.toLowerCase();
  const catLower = (categorySlug || "").toLowerCase();

  // If DB features array exists and has entries, use them
  if (Array.isArray(product.features) && product.features.length > 0) {
    return product.features.slice(0, 3);
  }
  if (typeof product.features === "string" && product.features.length > 0) {
    const split = product.features.split(",").map((s) => s.trim()).filter(Boolean);
    if (split.length > 0) return split.slice(0, 3);
  }

  // Combat / Boxing Equipment
  if (
    catLower.includes("box") ||
    catLower.includes("combat") ||
    nameLower.includes("glove") ||
    nameLower.includes("mma") ||
    nameLower.includes("guard")
  ) {
    return [
      "1.2mm AAA Full-Grain Cowhide",
      "Multi-Layer IMF Shock Absorption",
      "Ergonomic Padded Wrist Lock",
    ];
  }

  // Varsity / Jackets / Outerwear
  if (
    catLower.includes("jacket") ||
    catLower.includes("outerwear") ||
    nameLower.includes("varsity") ||
    nameLower.includes("bomber")
  ) {
    return [
      "Heavyweight Melton Wool Body",
      "Supple Cowhide Leather Sleeves",
      "Tajima Chenille 3D Embroidery",
    ];
  }

  // Hoodies / Tracksuits / Fleeces
  if (
    catLower.includes("tracksuit") ||
    nameLower.includes("hoodie") ||
    nameLower.includes("jogger") ||
    nameLower.includes("fleece")
  ) {
    return [
      "450+ GSM 100% French Terry",
      "Custom Distressed 3D Embroidery",
      "Pre-Shrunk & Double-Needle Seams",
    ];
  }

  // Tees & Streetwear
  if (
    nameLower.includes("tee") ||
    nameLower.includes("shirt") ||
    catLower.includes("streetwear")
  ) {
    return [
      "280 GSM Heavy Combed Cotton",
      "High-Density Screen & DTF Ready",
      "Boxy Cut with Drop Shoulders",
    ];
  }

  // Default Technical Spec
  return [
    "OEKO-TEX Certified Technical Fabric",
    "Reinforced High-Tensile Stitching",
    "Pre-Shrunk & Silicon Washed",
  ];
}

// Derive GSM tag for badge
function getGsmBadge(product: Product): string {
  const nameLower = product.name.toLowerCase();
  if (nameLower.includes("hoodie") || nameLower.includes("fleece") || nameLower.includes("tracksuit")) {
    return "Heavyweight 450 GSM";
  }
  if (nameLower.includes("glove") || nameLower.includes("boxing")) {
    return "1.2mm Cowhide";
  }
  if (nameLower.includes("varsity") || nameLower.includes("jacket")) {
    return "650 GSM Melton Wool";
  }
  if (nameLower.includes("tee") || nameLower.includes("t-shirt")) {
    return "280 GSM Combed";
  }
  return "Heavyweight 400 GSM";
}

export default function CategoryShowcaseSection({
  products,
  categories,
}: CategoryShowcaseProps) {
  const [selectedChip, setSelectedChip] = useState<string>("all");
  const [gsmFilter, setGsmFilter] = useState<string>("all");
  const [techniqueFilter, setTechniqueFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [rfqModalData, setRfqModalData] = useState<{
    isOpen: boolean;
    productName: string;
    category: string;
  }>({
    isOpen: false,
    productName: "",
    category: "",
  });

  // Filter products based on chips, technical filters, and search
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const name = product.name.toLowerCase();
      const desc = (product.short_description || "").toLowerCase();
      const categoryObj =
        product.category || categories.find((c) => c.id === product.category_id);
      const catSlug = (categoryObj?.slug || "").toLowerCase();
      const catName = (categoryObj?.name || "").toLowerCase();

      // Category Chip Filter
      let matchesChip = false;
      if (selectedChip === "all") {
        matchesChip = true;
      } else if (selectedChip === "tracksuits") {
        matchesChip =
          catSlug.includes("sportswear") ||
          catSlug.includes("teamwear") ||
          name.includes("tracksuit") ||
          name.includes("fleece") ||
          name.includes("jogger") ||
          name.includes("sweat");
      } else if (selectedChip === "streetwear") {
        matchesChip =
          catSlug.includes("streetwear") ||
          catSlug.includes("clothing") ||
          name.includes("hoodie") ||
          name.includes("tee") ||
          name.includes("shirt") ||
          name.includes("cargo");
      } else if (selectedChip === "combat") {
        matchesChip =
          catSlug.includes("boxing") ||
          catSlug.includes("combat") ||
          name.includes("glove") ||
          name.includes("guard") ||
          name.includes("mma") ||
          name.includes("pad");
      } else if (selectedChip === "outerwear") {
        matchesChip =
          catSlug.includes("outerwear") ||
          name.includes("jacket") ||
          name.includes("varsity") ||
          name.includes("bomber") ||
          name.includes("windbreaker");
      } else {
        matchesChip = catSlug === selectedChip;
      }

      if (!matchesChip) return false;

      // GSM Filter
      if (gsmFilter !== "all") {
        if (gsmFilter === "280" && !name.includes("tee") && !desc.includes("280")) return false;
        if (gsmFilter === "350" && !name.includes("jogger") && !desc.includes("350")) return false;
        if (
          gsmFilter === "400" &&
          !name.includes("hoodie") &&
          !name.includes("jacket") &&
          !desc.includes("400") &&
          !desc.includes("450")
        )
          return false;
      }

      // Technique Filter
      if (techniqueFilter !== "all") {
        const text = `${name} ${desc} ${JSON.stringify(product.materials || "")}`.toLowerCase();
        if (techniqueFilter === "embroidery" && !text.includes("embroid") && !text.includes("chenille")) return false;
        if (techniqueFilter === "screen" && !text.includes("screen") && !text.includes("print")) return false;
        if (techniqueFilter === "dtf" && !text.includes("dtf") && !text.includes("transfer")) return false;
        if (techniqueFilter === "sublimation" && !text.includes("sublimat") && !text.includes("uniform")) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          name.includes(q) ||
          desc.includes(q) ||
          catName.includes(q) ||
          (Array.isArray(product.materials)
            ? product.materials.some((m) => m.toLowerCase().includes(q))
            : typeof product.materials === "string" && product.materials.toLowerCase().includes(q));

        if (!matchesQuery) return false;
      }

      return true;
    });
  }, [products, categories, selectedChip, gsmFilter, techniqueFilter, searchQuery]);

  return (
    <section className="py-16 sm:py-24 bg-transparent border-b border-black/[0.06] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-5 border-b border-black/[0.06] gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/90 shadow-xs mb-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-slate-800 font-mono font-bold">
                Direct Mill Catalog
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-slate-900">
              MANUFACTURING & PRODUCT CAPABILITIES
            </h2>
          </div>

          <div className="text-xs text-slate-500 font-mono">
            Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> verified specifications
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────── */}
        {/* FLOATING FILTER & CATALOG CONTROLS DOCK                    */}
        {/* ────────────────────────────────────────────────────────── */}
        <div className="p-2 sm:p-2.5 rounded-2xl bg-white/80 backdrop-blur-md border border-white/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8 space-y-3">
          {/* Top Row: Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORY_CHIPS.map((chip) => {
              const isActive = selectedChip === chip.id;
              return (
                <button
                  key={chip.id}
                  onClick={() => setSelectedChip(chip.id)}
                  className={
                    isActive
                      ? "px-4 py-2 text-xs font-semibold bg-slate-900 text-white rounded-xl shadow-sm whitespace-nowrap transition-all cursor-pointer"
                      : "px-4 py-2 text-xs font-semibold text-slate-600 rounded-xl hover:bg-white/90 hover:text-slate-900 whitespace-nowrap transition-all cursor-pointer"
                  }
                >
                  {chip.label}
                </button>
              );
            })}
          </div>

          {/* Bottom Row: Technical Filters + Inset Live Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2.5 border-t border-slate-200/60">
            {/* Technical Dropdowns */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Fabric GSM Dropdown */}
              <div className="relative">
                <select
                  value={gsmFilter}
                  onChange={(e) => setGsmFilter(e.target.value)}
                  className="appearance-none bg-white/70 hover:bg-white/90 border border-white/90 text-slate-700 text-xs font-medium rounded-xl pl-3.5 pr-8 py-2 outline-none shadow-xs transition-all cursor-pointer"
                >
                  {GSM_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Print Technique Dropdown */}
              <div className="relative">
                <select
                  value={techniqueFilter}
                  onChange={(e) => setTechniqueFilter(e.target.value)}
                  className="appearance-none bg-white/70 hover:bg-white/90 border border-white/90 text-slate-700 text-xs font-medium rounded-xl pl-3.5 pr-8 py-2 outline-none shadow-xs transition-all cursor-pointer"
                >
                  {TECHNIQUE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Reset active filters if any are applied */}
              {(selectedChip !== "all" || gsmFilter !== "all" || techniqueFilter !== "all" || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedChip("all");
                    setGsmFilter("all");
                    setTechniqueFilter("all");
                    setSearchQuery("");
                  }}
                  className="text-xs text-slate-500 hover:text-slate-900 underline font-medium px-2 py-1 transition-colors cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Inset Glass Live Search */}
            <div className="relative w-full sm:w-64 shrink-0">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search specs, fabrics, models..."
                className="w-full bg-white/70 backdrop-blur-md border border-white/90 rounded-xl focus:border-slate-400 focus:bg-white text-slate-900 pl-9 pr-8 py-2 text-xs outline-none shadow-xs transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────── */}
        {/* PREMIUM PRODUCT & CAPABILITY CARDS GRID                   */}
        {/* ────────────────────────────────────────────────────────── */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center rounded-3xl border border-dashed border-slate-300 bg-white/50 backdrop-blur-md p-8">
            <p className="text-sm text-slate-600 mb-4">
              No manufacturing specifications found matching your current filter criteria.
            </p>
            <button
              onClick={() => {
                setSelectedChip("all");
                setGsmFilter("all");
                setTechniqueFilter("all");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-semibold uppercase tracking-wider shadow-sm hover:bg-slate-800 transition-all cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.slice(0, 12).map((product) => {
              const primaryImg =
                product.images?.find((img) => img.is_primary)?.image_url ||
                product.images?.[0]?.image_url ||
                "/images/products/boxing-gloves-black.png";

              const secondaryImg =
                product.images?.[1]?.image_url || primaryImg;

              const categoryObj =
                product.category ||
                categories.find((c) => c.id === product.category_id);

              const categorySlug = categoryObj?.slug || "general";
              const productHref = `/products/${categorySlug}/${product.slug}`;
              const bullets = getTechnicalBullets(product, categorySlug);
              const gsmBadge = getGsmBadge(product);

              return (
                <div
                  key={product.id}
                  className="rounded-3xl p-4 bg-white/75 backdrop-blur-md border border-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    {/* Image Wrapper: Rounded-2xl media box aspect-[4/5] */}
                    <div className="bg-slate-100/80 aspect-[4/5] relative overflow-hidden rounded-2xl flex items-center justify-center mb-4">
                      {/* Primary Image */}
                      <Image
                        src={primaryImg}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Optional Secondary Image Cross-Fade on Hover */}
                      {secondaryImg !== primaryImg && (
                        <Image
                          src={secondaryImg}
                          alt={`${product.name} alternate view`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100 group-hover:scale-105"
                        />
                      )}

                      {/* Floating Frosted Glass Tag: MOQ */}
                      <div className="absolute top-3 left-3 z-10 bg-white/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/90 text-[10px] font-mono font-semibold text-slate-800 shadow-xs flex items-center gap-1">
                        <Box className="w-3 h-3 text-slate-600" />
                        <span>MOQ {product.moq || 30} pcs</span>
                      </div>

                      {/* Floating Frosted Glass Tag: Fabric Weight / GSM */}
                      <div className="absolute top-3 right-3 z-10 bg-white/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/90 text-[10px] font-mono font-semibold text-slate-800 shadow-xs">
                        <span>{gsmBadge}</span>
                      </div>
                    </div>

                    {/* Card Body: Title in bold slate-900 */}
                    <div className="px-1 mb-3">
                      <Link
                        href={productHref}
                        className="font-bold text-base text-slate-900 group-hover:text-slate-700 transition-colors line-clamp-1 block mb-2"
                        title={product.name}
                      >
                        {product.name}
                      </Link>

                      {/* Bulleted Technical Features */}
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {bullets.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                            <span className="truncate">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom Action Bar: View Tech Specs & Inquire Sample */}
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-200/60 mt-2">
                    <Link
                      href={productHref}
                      className="py-2.5 px-3 rounded-xl bg-slate-100/90 hover:bg-slate-200/90 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1 transition-all"
                    >
                      <span>View Tech Specs</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-500" />
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        setRfqModalData({
                          isOpen: true,
                          productName: product.name,
                          category: categoryObj?.name || "Combat & Sportswear",
                        })
                      }
                      className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs"
                    >
                      <span>Inquire Sample</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Catalog Navigation Footer */}
        <div className="text-center pt-12">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-[0_8px_24px_rgba(15,23,42,0.14)] hover:shadow-lg hover:-translate-y-0.5"
          >
            <span>EXPLORE FULL {products.length}+ SPECIFICATION CATALOG</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Interactive RFQ Modal */}
      <InteractiveRfqModal
        isOpen={rfqModalData.isOpen}
        onClose={() => setRfqModalData({ ...rfqModalData, isOpen: false })}
        initialProduct={rfqModalData.productName}
        initialCategory={rfqModalData.category}
      />
    </section>
  );
}
