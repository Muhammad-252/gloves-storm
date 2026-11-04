"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product, Category, Project } from "@/types/database";
import {
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  ArrowRight,
  Box,
  Clock,
  Scissors,
  CheckCircle2,
  ChevronDown,
  Layers,
  Search,
  SlidersHorizontal,
  Home,
  ChevronRight,
  Ruler,
  Truck,
} from "lucide-react";
import QuoteModal from "@/components/ui/QuoteModal";
import { BUSINESS_CONFIG } from "@/lib/business";
import JacketMakerProductCard from "./JacketMakerProductCard";
import CustomBespokeGridTile from "./CustomBespokeGridTile";
import CollectionBuyingGuide from "./CollectionBuyingGuide";
import { CATEGORY_INTEL } from "@/lib/data/categoryIntel";

interface CategoryLandingClientProps {
  category: Category;
  products: Product[];
  categories: Category[];
  relatedProjects?: Project[];
}

export default function CategoryLandingClient({
  category,
  products,
  categories,
  relatedProjects = [],
}: CategoryLandingClientProps) {
  const intel =
    CATEGORY_INTEL[category.slug] || CATEGORY_INTEL["sportswear-teamwear"];

  const [quoteModalData, setQuoteModalData] = useState<{
    isOpen: boolean;
    productName: string;
    inquiryType: "Quote" | "Sample";
  }>({
    isOpen: false,
    productName: "",
    inquiryType: "Quote",
  });

  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      (p.short_description && p.short_description.toLowerCase().includes(q)) ||
      (p.primary_keyword && p.primary_keyword.toLowerCase().includes(q))
    );
  });

  return (
    <div className="w-full py-8 space-y-12">
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
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <span className="text-neutral-950 font-semibold">{category.name}</span>
      </nav>

      {/* 2. Collection Hero Banner (The Jacket Maker Style) */}
      <section className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200/90 p-4 sm:p-8 md:p-12 lg:p-16 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        <div className="absolute right-0 top-0 w-full sm:w-1/2 h-full opacity-10 sm:opacity-20 pointer-events-none overflow-hidden">
          <Image
            src={category.image_url || "/images/products/varsity-jacket.jpg"}
            alt={`${category.name} OEM Manufacturing Sialkot - GLOVES STORM`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[9px] sm:text-[10px] font-medium mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-neutral-900 animate-pulse" />
            <span>{intel.heroSubtitle}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-[-0.02em] text-ink mb-3 sm:mb-4 leading-[1.12] sm:leading-[1.08]">
            {intel.h1 || `Custom ${category.name}`}
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-neutral-600 leading-relaxed mb-5 sm:mb-6 font-normal">
            {intel.intro ||
              category.description ||
              `Direct Sialkot OEM factory manufacturing for ${category.name}. Precision-engineered for performance sports teams, fitness labels, and private-label apparel brands worldwide.`}
          </p>

          {/* Key Manufacturing Metrics */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-3 mb-6 sm:mb-8 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-neutral-50 border border-neutral-200/80 max-w-md">
            <div>
              <span className="text-[9px] sm:text-[10px] text-neutral-500 block">
                Standard MOQ
              </span>
              <span className="text-xs sm:text-sm font-bold text-neutral-950 font-mono">
                {intel.standardMoq}
              </span>
            </div>
            <div>
              <span className="text-[9px] sm:text-[10px] text-neutral-500 block">
                Prototype Sample
              </span>
              <span className="text-xs sm:text-sm font-bold text-neutral-950 font-mono">
                {intel.sampleLeadTime}
              </span>
            </div>
            <div>
              <span className="text-[9px] sm:text-[10px] text-neutral-500 block">
                Bulk Production
              </span>
              <span className="text-xs sm:text-sm font-bold text-neutral-950 font-mono">
                {intel.productionLeadTime}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() =>
                setQuoteModalData({
                  isOpen: true,
                  productName: `Custom ${category.name} Project`,
                  inquiryType: "Quote",
                })
              }
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#FFB900] hover:bg-[#E5A700] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_4px_16px_rgba(255,185,0,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer w-full sm:w-auto text-center"
            >
              <span>Request Factory Quote</span>
              <ArrowUpRight className="w-4 h-4 text-black shrink-0" />
            </button>

            <a
              href="#products-grid"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-200 hover:border-[#FFB900] font-medium text-xs transition-all w-full sm:w-auto text-center"
            >
              <span>Explore {products.length} Models</span>
              <ArrowRight className="w-4 h-4 text-neutral-500 shrink-0" />
            </a>
          </div>
        </div>
      </section>

      {/* 3. Sister Category Filter Pills */}
      {categories && categories.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 border-b border-neutral-200/90 pb-4">
          <Link
            href="/products"
            className="px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:text-neutral-900 transition-colors"
          >
            All Collections
          </Link>
          {categories.map((cat) => {
            const isCurrent = cat.slug === category.slug;
            return (
              <Link
                key={cat.id}
                href={`/products/${cat.slug}`}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                  isCurrent
                    ? "bg-[#FFB900] text-black font-extrabold shadow-xs"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:text-neutral-900"
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>
      )}

      {/* 4. Product Catalog Grid with Search Bar & Bespoke Interstitial Tile */}
      <section id="products-grid" className="space-y-6 pt-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
          <div>
            <span className="text-[11px] text-neutral-500 font-medium block mb-1">
              Production Catalog
            </span>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-[-0.04em] text-ink">
              {category.name} ({filteredProducts.length} Models Available)
            </h2>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by name or keyword..."
              className="w-full bg-neutral-50 hover:bg-white focus:bg-white border border-neutral-200 rounded-xl focus:border-neutral-950 pl-10 pr-4 py-2 text-xs text-neutral-900 outline-none transition-colors"
            />
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-neutral-200 p-8">
            <p className="text-sm text-neutral-500 mb-4">
              No products match &quot;{searchQuery}&quot; in this category.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-xs font-bold text-neutral-950 underline"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product, idx) => {
              const isPromoIndex = idx === 3;
              return (
                <div key={product.id} className="contents">
                  <JacketMakerProductCard
                    product={product}
                    category={category}
                    priority={idx < 4}
                    onInquire={(p) =>
                      setQuoteModalData({
                        isOpen: true,
                        productName: p.name,
                        inquiryType: "Quote",
                      })
                    }
                  />

                  {isPromoIndex && (
                    <CustomBespokeGridTile
                      categoryName={category.name}
                      onOpenModal={() =>
                        setQuoteModalData({
                          isOpen: true,
                          productName: `Custom Made-to-Measure ${category.name}`,
                          inquiryType: "Quote",
                        })
                      }
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. Manufacturing Capabilities & Engineering */}
      <section className="rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-12 border border-neutral-200/90 shadow-2xs space-y-6 sm:space-y-8">
        <div className="max-w-2xl">
          <span className="text-[10px] sm:text-[11px] text-neutral-500 font-medium block mb-1">
            Engineering &amp; Standards
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-[-0.04em] text-ink mb-1.5 sm:mb-2">
            Factory Capabilities &amp; Quality Checkpoints
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
            Direct production control in Sialkot with full traceability, computerized pattern grading, and strict pre-shipment inspections.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {intel.capabilities.map((cap, idx) => (
            <div
              key={idx}
              className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-neutral-50 border border-neutral-200 hover:border-neutral-900 transition-colors"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-950 mb-2.5 sm:mb-3.5 font-mono font-bold text-xs shadow-2xs">
                0{idx + 1}
              </div>
              <h3 className="text-xs font-bold tracking-[-0.02em] text-ink mb-1">
                {cap.title}
              </h3>
              <p className="text-[11px] text-neutral-600 leading-relaxed">
                {cap.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Customization Options Strip */}
        <div className="pt-4 sm:pt-6 border-t border-neutral-200">
          <h3 className="text-[10px] sm:text-[11px] text-ink font-medium mb-3 sm:mb-4">
            Available Customization &amp; Private Label Branding:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
            {intel.customizationHighlights.map((opt, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-xs text-neutral-700 bg-neutral-50 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-neutral-200"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900 shrink-0" />
                <span>{opt}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Product Development / OEM Process */}
      <section className="bg-neutral-50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-12 border border-neutral-200/90 space-y-6 sm:space-y-8">
        <div className="max-w-2xl">
          <span className="text-[10px] sm:text-[11px] text-neutral-500 font-medium block mb-1">
            Turnkey OEM Workflow
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-[-0.04em] text-ink">
            From Design Concept to Production Floor
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            A transparent 5-stage manufacturing pipeline designed to eliminate supplier friction and deliver consistent, export-certified goods.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 sm:gap-3.5">
          {[
            {
              step: "01",
              title: "Tech Pack Review",
              desc: "Engineering audit of your tech packs, Pantone color targets, and specification sheets.",
            },
            {
              step: "02",
              title: "Pattern & CAD",
              desc: "Digital 2D/3D pattern grading across size ranges with precise seam allowances.",
            },
            {
              step: "03",
              title: "Rapid Prototype",
              desc: `Physical pre-production sample stitched and couriered via DHL Express in ${BUSINESS_CONFIG.samplingDaysShort}.`,
            },
            {
              step: "04",
              title: "Bulk Production",
              desc: "Precision cutting, embroidery, printing, and master assembly with inline QC inspections.",
            },
            {
              step: "05",
              title: "Global Delivery",
              desc: "Export 5-ply cartons, individual barcode labeling, and door-to-door freight clearance.",
            },
          ].map((s, idx) => (
            <div
              key={idx}
              className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-neutral-200/90 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <span className="text-lg sm:text-xl font-mono font-black text-neutral-950 block mb-1.5 sm:mb-2">
                  {s.step}
                </span>
                <h3 className="text-xs font-bold tracking-[-0.02em] text-ink mb-1 sm:mb-1.5">
                  {s.title}
                </h3>
                <p className="text-[11px] text-neutral-600 leading-relaxed font-normal">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Bottom SEO Buying Guide & FAQ Section (Mirroring The Jacket Maker) */}
      <CollectionBuyingGuide
        category={category}
        faqs={intel.faqs}
        categories={categories}
      />

      {/* Quote / RFQ Modal */}
      <QuoteModal
        isOpen={quoteModalData.isOpen}
        onClose={() => setQuoteModalData((prev) => ({ ...prev, isOpen: false }))}
        defaultProductName={quoteModalData.productName}
        defaultCategory={category.name}
        inquiryType={quoteModalData.inquiryType}
        defaultQuantity={50}
      />
    </div>
  );
}
