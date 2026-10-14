"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product, Category, PriceTier, ProductSpecifications } from "@/types/database";
import {
  Clock,
  Box,
  ShieldCheck,
  Check,
  ArrowRight,
  Layers,
  ChevronRight,
  ChevronLeft,
  Heart,
  Maximize2,
  BadgeCheck,
  HelpCircle,
  ChevronDown,
  Sparkles,
  PhoneCall,
  Scissors,
  CheckCircle2,
  FileText,
} from "lucide-react";
import QuoteModal from "../ui/QuoteModal";
import JacketMakerProductCard from "./JacketMakerProductCard";
import SizeChart from "./SizeChart";

interface ProductDetailClientProps {
  product: Product;
  category: Category | null;
  relatedProducts: Product[];
}

export default function ProductDetailClient({
  product,
  category,
  relatedProducts,
}: ProductDetailClientProps) {
  // Normalize images
  const images = useMemo(() => {
    if (product.images && product.images.length > 0) {
      return product.images;
    }
    return [
      {
        id: "default-img-1",
        product_id: product.id,
        image_url:
          "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop",
        alt_text: product.name,
        sort_order: 1,
        is_primary: true,
        created_at: "",
      },
    ];
  }, [product]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = images[activeImageIndex] || images[0];
  const activeImageUrl = activeImage?.image_url;

  // Wholesale Tiers setup (Alibaba format)
  const defaultTiers: PriceTier[] = useMemo(() => {
    const baseSample = product.sample_price || 35.0;
    const moq = product.moq || 30;
    return [
      {
        min_quantity: moq,
        max_quantity: Math.max(moq, 49),
        unit_price: Math.round(baseSample * 0.52 * 100) / 100,
        currency: "$",
        label: `${moq}-49 pcs`,
      },
      {
        min_quantity: 50,
        max_quantity: 99,
        unit_price: Math.round(baseSample * 0.4 * 100) / 100,
        currency: "$",
        label: "50-99 pcs",
      },
      {
        min_quantity: 100,
        max_quantity: null,
        unit_price: Math.round(baseSample * 0.32 * 100) / 100,
        currency: "$",
        label: "≥100 pcs",
      },
    ];
  }, [product]);

  const tiers: PriceTier[] = useMemo(() => {
    if (product.pricing_tiers && product.pricing_tiers.length > 0) {
      const bulkOnly = product.pricing_tiers.filter((t) => t.min_quantity > 1);
      return bulkOnly.length > 0 ? bulkOnly : product.pricing_tiers;
    }
    return defaultTiers;
  }, [product.pricing_tiers, defaultTiers]);

  // Order quantity state
  const [quantity, setQuantity] = useState<number>(product.moq || 30);

  // Selected variation state
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [mediaMode, setMediaMode] = useState<"photos" | "video">("photos");

  // RFQ Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState<"Quote" | "Sample">("Quote");

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Active Tier calculation
  const activeTier = useMemo(() => {
    return (
      tiers.find((tier) => {
        const meetsMin = quantity >= tier.min_quantity;
        const meetsMax =
          tier.max_quantity === null ||
          tier.max_quantity === undefined ||
          quantity <= tier.max_quantity;
        return meetsMin && meetsMax;
      }) || tiers[tiers.length - 1]
    );
  }, [quantity, tiers]);

  const unitPrice = activeTier?.unit_price || tiers[0]?.unit_price || 15;
  const estimatedTotal = (quantity * unitPrice).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Parse lists
  const parseList = (item: string[] | string | null | undefined): string[] => {
    if (!item) return [];
    if (Array.isArray(item)) return item;
    try {
      const parsed = JSON.parse(item);
      return Array.isArray(parsed) ? parsed : [item];
    } catch {
      return item.split(",").map((s) => s.trim());
    }
  };

  const materialsList = parseList(product.materials);
  const featuresList = parseList(product.features);
  const customList = parseList(product.customization_options);

  // Specifications
  const specs = (product.specifications || {}) as ProductSpecifications;

  // Derive dynamic sizes from specifications or sensible defaults
  const sizeOptions: string[] = useMemo(() => {
    if (specs.sizes && Array.isArray(specs.sizes) && specs.sizes.length > 0) {
      return specs.sizes;
    }
    if (product.size_chart?.rows_cm && product.size_chart.rows_cm.length > 0) {
      return product.size_chart.rows_cm.map((r) => r.size);
    }
    return ["XS", "S", "M", "L", "XL", "2XL", "3XL", "Custom Fit"];
  }, [specs, product.size_chart]);

  const [selectedSize, setSelectedSize] = useState<string>(sizeOptions[0] || "M");

  // Standard factory colorways
  const colorOptions = useMemo(() => {
    if (specs.colors && Array.isArray(specs.colors) && specs.colors.length > 0) {
      return specs.colors.map((c, i) => ({
        name: c,
        color: ["#171717", "#f8fafc", "#1e3a8a", "#b91c1c", "#047857", "#d97706"][i % 6],
        isCustom: c.toLowerCase().includes("pantone") || c.toLowerCase().includes("custom"),
      }));
    }
    return [
      { name: "Stealth Black", color: "#171717" },
      { name: "Pure White", color: "#f8fafc" },
      { name: "Navy Blue", color: "#1e3a8a" },
      { name: "Team Red", color: "#b91c1c" },
      { name: "Custom Pantone Match", color: "#b45309", isCustom: true },
    ];
  }, [specs]);

  const primaryKeyword = product.primary_keyword || `custom ${product.name.toLowerCase()}`;

  return (
    <div className="max-w-7xl mx-auto pb-20">
      {/* Breadcrumbs Navigation */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 mb-6 font-medium">
        <Link href="/" className="hover:text-neutral-950 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <Link href="/products" className="hover:text-neutral-950 transition-colors">
          Products
        </Link>
        {category && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <Link
              href={`/products/${category.slug}`}
              className="hover:text-neutral-950 transition-colors"
            >
              {category.name}
            </Link>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <span className="text-neutral-900 font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* =========================================================================
          MAIN PRODUCT SECTION (2 COLUMNS: GALLERY & ORDER/SPECS)
      ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
        {/* =======================================================================
            LEFT COLUMN: GALLERY + VERIFIED FACTORY PROFILE CARD
        ======================================================================= */}
        <div className="lg:col-span-6 space-y-6">
          {/* Gallery Row: Thumbnails + Main Stage */}
          <div className="flex gap-2 sm:gap-4 items-start">
            {/* Vertical Thumbnail Strip */}
            <div className="flex flex-col gap-2 w-14 sm:w-20 shrink-0">
              {images.map((img, idx) => (
                <button
                  key={img.id || idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-square w-full rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? "border-neutral-950 ring-2 ring-neutral-950/20 shadow-xs"
                      : "border-neutral-200 hover:border-neutral-400 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.image_url}
                    alt={img.alt_text || `${product.name} OEM manufacturer Sialkot angle ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Stage Image */}
            <div className="relative flex-1 aspect-square sm:aspect-4/3 rounded-xl sm:rounded-2xl bg-neutral-100 border border-neutral-200/90 overflow-hidden shadow-xs group">
              <Image
                src={activeImageUrl}
                alt={activeImage?.alt_text || `${product.name} — ${materialsList[0] || "Custom athletic teamwear"}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Prev / Next Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
                    }
                    className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white text-neutral-800 flex items-center justify-center shadow-md transition-all cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
                    }
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white text-neutral-800 flex items-center justify-center shadow-md transition-all cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </>
              )}

              {/* Angle Indicator */}
              <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono px-2.5 py-0.5 rounded-full">
                {activeImageIndex + 1} / {images.length}
              </div>
            </div>
          </div>

          {/* Photos / Factory QC Video Mode */}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setMediaMode("photos")}
              className={`px-3.5 sm:px-4 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                mediaMode === "photos"
                  ? "bg-neutral-900 text-white shadow-xs"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              HD Photos ({images.length})
            </button>
            <button
              onClick={() => setMediaMode("video")}
              className={`px-3.5 sm:px-4 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                mediaMode === "video"
                  ? "bg-neutral-900 text-white shadow-xs"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              Factory Video QC
            </button>
          </div>

          {/* ===================================================================
              AUTHENTIC SIALKOT FACTORY CREDENTIALS (No Fake Reviews)
          =================================================================== */}
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#0f172a] text-white font-black flex items-center justify-center text-sm shadow-xs shrink-0">
                  GS
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-neutral-950">
                      Gloves Storm Industrial Co.
                    </span>
                    <span className="text-[10px] font-bold text-neutral-800 bg-neutral-100 px-2 py-0.5 rounded inline-flex items-center gap-1 border border-neutral-200">
                      <BadgeCheck className="w-3.5 h-3.5 text-amber-600" />
                      Verified OEM Mill
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Sialkot, Punjab, Pakistan • Direct Custom Apparel &amp; Sportswear Manufacturer
                  </p>
                </div>
              </div>
            </div>

            {/* 4-Stat Factory Operational Standards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-neutral-100 text-center">
              <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-100">
                <div className="text-xs font-black text-neutral-950 font-mono">MOQ {product.moq || 30} pcs</div>
                <span className="text-[10px] text-neutral-500 font-medium">Flexible Batches</span>
              </div>
              <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-100">
                <div className="text-xs font-black text-neutral-950 font-mono">5–7 Days</div>
                <span className="text-[10px] text-neutral-500 font-medium">Counter Sample</span>
              </div>
              <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-100">
                <div className="text-xs font-black text-neutral-950 font-mono">DDP / CIF</div>
                <span className="text-[10px] text-neutral-500 font-medium">USA, UK &amp; Global</span>
              </div>
              <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-100">
                <div className="text-xs font-black text-neutral-950 font-mono">100% In-House</div>
                <span className="text-[10px] text-neutral-500 font-medium">Quality Inspection</span>
              </div>
            </div>

            {/* Manufacturing Capabilities */}
            <div className="flex items-center gap-3 text-xs text-neutral-700 pt-1 flex-wrap font-medium">
              <span className="inline-flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Italian Digital Sublimation
              </span>
              <span className="inline-flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Tech Pack CAD Grading
              </span>
              <span className="inline-flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Private Label Woven Tags
              </span>
            </div>
          </div>
        </div>

        {/* =======================================================================
            RIGHT COLUMN: PRODUCT DETAILS, WHOLESALE TIERS, SPECS & ORDER
        ======================================================================= */}
        <div className="lg:col-span-6 space-y-6">
          {/* Product Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-800 font-bold bg-neutral-100 px-2.5 py-0.5 rounded-full border border-neutral-200">
                {category?.name || "Sportswear & Teamwear"}
              </span>
              <span className="text-xs text-neutral-500 font-mono">
                MOQ: {product.moq || 30} {specs.moq?.toString().includes("Kits") ? "Kits" : "Pieces"}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-950 uppercase leading-snug">
              {product.name}
            </h1>

            {/* Sub-header / Short Description */}
            {product.short_description && (
              <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {product.short_description}
              </p>
            )}

            {/* Primary SEO Keyword Indicator */}
            {product.primary_keyword && (
              <div className="mt-2.5 flex items-center gap-2">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                  Target Application:
                </span>
                <span className="text-xs font-semibold text-neutral-800">
                  {product.primary_keyword}
                </span>
              </div>
            )}
          </div>

          {/* ===================================================================
              WHOLESALE PRICE TIERS (If enabled / configured)
          =================================================================== */}
          {(product.show_pricing ?? true) && tiers.length > 0 && (
            <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-neutral-50 border border-neutral-200 space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-bold flex items-center justify-between">
                <span>Direct Factory Tier Pricing (FOB / DDP Available)</span>
                <span className="text-amber-700 font-semibold">Tier Bracket</span>
              </div>

              <div className="grid grid-cols-3 gap-2 items-stretch">
                {tiers.map((tier, idx) => {
                  const isSelected = activeTier === tier;
                  const rangeLabel =
                    tier.max_quantity === null || tier.max_quantity === undefined
                      ? `≥${tier.min_quantity} pcs`
                      : `${tier.min_quantity}–${tier.max_quantity} pcs`;

                  return (
                    <div
                      key={idx}
                      onClick={() => setQuantity(tier.min_quantity)}
                      className={`cursor-pointer transition-all rounded-xl p-3 text-left flex flex-col justify-between ${
                        isSelected
                          ? "bg-white border-2 border-neutral-900 shadow-sm ring-2 ring-amber-500/20"
                          : "bg-white/60 hover:bg-white border border-neutral-200"
                      }`}
                    >
                      <div className="text-lg sm:text-xl font-black text-neutral-950 font-mono tracking-tight">
                        US${tier.unit_price.toFixed(2)}
                      </div>
                      <div className="mt-1 text-[11px] text-neutral-500 font-medium">
                        {tier.label && !tier.label.includes("Tier") ? tier.label : rangeLabel}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Sample Price Notice */}
              {product.sample_price && (
                <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-xs">
                  <span className="text-neutral-500 font-mono text-[11px]">
                    Evaluation Prototype Sample:
                  </span>
                  <span className="font-bold text-neutral-900 font-mono text-xs">
                    US${product.sample_price.toFixed(2)} / counter sample
                  </span>
                </div>
              )}
            </div>
          )}

          {/* ===================================================================
              COLOR / PANTONE SWATCH SELECTION
          =================================================================== */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Color Options:
              </span>
              <span className="text-[11px] text-neutral-500 font-mono">
                Pantone Lab Dip Sourcing
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {colorOptions.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(idx)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                    selectedColor === idx
                      ? "border-neutral-950 bg-neutral-950 text-white font-bold shadow-xs"
                      : "border-neutral-200 hover:border-neutral-300 bg-white text-neutral-800"
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                    style={{ backgroundColor: opt.color }}
                  />
                  <span>{opt.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ===================================================================
              SIZE CURVE SPECIFICATION
          =================================================================== */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
                Standard Size Grading:
              </span>
              <a
                href="#size-chart-section"
                className="text-[11px] font-bold text-amber-700 hover:text-amber-800 underline font-mono cursor-pointer"
              >
                View Measurements Chart ↓
              </a>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {sizeOptions.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`min-w-10 text-center px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedSize === sz
                      ? "border-neutral-950 bg-neutral-950 text-white shadow-xs"
                      : "border-neutral-200 hover:border-neutral-300 bg-white text-neutral-700"
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* ===================================================================
              KEY TECHNICAL ATTRIBUTES (DYNAMIC FROM SPECIFICATIONS)
          =================================================================== */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
              Technical Specifications Summary
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                <span className="block text-[10px] text-neutral-500 uppercase font-mono">Fabric</span>
                <span className="block font-bold text-neutral-900 mt-0.5 truncate" title={specs.fabric || materialsList[0]}>
                  {specs.fabric || materialsList[0] || "100% Technical Polyester"}
                </span>
              </div>
              <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                <span className="block text-[10px] text-neutral-500 uppercase font-mono">GSM Range</span>
                <span className="block font-bold text-neutral-900 mt-0.5 truncate">
                  {specs.gsm_range || "160–220 GSM"}
                </span>
              </div>
              <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                <span className="block text-[10px] text-neutral-500 uppercase font-mono">Fit / Cut</span>
                <span className="block font-bold text-neutral-900 mt-0.5 truncate">
                  {specs.fit || "Athletic / Regular Fit"}
                </span>
              </div>
              <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                <span className="block text-[10px] text-neutral-500 uppercase font-mono">Printing</span>
                <span className="block font-bold text-neutral-900 mt-0.5 truncate">
                  {Array.isArray(specs.decoration_methods) ? specs.decoration_methods[0] : "Dye Sublimation"}
                </span>
              </div>
              <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                <span className="block text-[10px] text-neutral-500 uppercase font-mono">Sample Time</span>
                <span className="block font-bold text-neutral-900 mt-0.5 truncate">
                  {specs.sample_time || "5–7 Days"}
                </span>
              </div>
              <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                <span className="block text-[10px] text-neutral-500 uppercase font-mono">Lead Time</span>
                <span className="block font-bold text-neutral-900 mt-0.5 truncate">
                  {product.lead_time || specs.lead_time || "2–3 Weeks"}
                </span>
              </div>
            </div>
          </div>

          {/* ===================================================================
              QUANTITY SELECTOR & MULTI-ACTION CTAS (Quote + WhatsApp)
          =================================================================== */}
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-neutral-50 border border-neutral-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                  Order Quantity:
                </span>
                <div className="flex items-center border border-neutral-300 rounded-xl bg-white overflow-hidden shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(product.moq || 10, quantity - 25))}
                    className="px-3 py-1.5 text-xs font-bold text-neutral-700 hover:bg-neutral-100 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={product.moq || 10}
                    step={10}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 30))}
                    className="w-16 sm:w-20 text-center font-mono font-bold text-xs py-1.5 outline-none border-x border-neutral-300"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 25)}
                    className="px-3 py-1.5 text-xs font-bold text-neutral-700 hover:bg-neutral-100 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-neutral-500 font-mono">pieces</span>
              </div>

              {(product.show_pricing ?? true) && (
                <div className="text-left sm:text-right">
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                    Est. Total (FOB Sialkot)
                  </span>
                  <span className="text-base sm:text-lg font-black font-mono text-neutral-950">
                    US${estimatedTotal}
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons: Request OEM Quote + WhatsApp + Sample */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  setInquiryType("Quote");
                  setModalOpen(true);
                }}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-[#0f172a] hover:bg-neutral-800 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-sm hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer font-sans"
              >
                <span>Request OEM Quote</span>
                <ArrowRight className="w-4 h-4 text-amber-400 shrink-0" />
              </button>

              <a
                href={`https://wa.me/923417146935?text=${encodeURIComponent(
                  `Hello Gloves Storm, I am interested in custom manufacturing for "${product.name}" (Qty: ${quantity} pcs). Please send factory quotation.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer font-sans"
              >
                <PhoneCall className="w-4 h-4 shrink-0" />
                <span>WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setInquiryType("Sample");
                  setQuantity(1);
                  setModalOpen(true);
                }}
                className="w-full sm:w-auto py-3.5 px-4 rounded-xl bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-300 font-bold text-xs uppercase tracking-wider transition-all shadow-xs cursor-pointer font-mono text-center"
              >
                Order Sample
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          DEEP DIVE: FULL TECHNICAL DESCRIPTION & FACTORY OVERVIEW
      ========================================================================= */}
      {product.description && (
        <div className="mb-16 p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-700 font-bold block">
            Technical Engineering &amp; Factory Specifications
          </span>
          <h2 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-neutral-950">
            About {product.name}
          </h2>
          <div className="text-xs sm:text-sm text-neutral-700 leading-relaxed max-w-4xl space-y-3">
            <p>{product.description}</p>
          </div>
        </div>
      )}

      {/* =========================================================================
          SPECIFICATIONS DEEP DIVE GRID (MATERIALS, FEATURES, CUSTOMIZATION)
      ========================================================================= */}
      <div className="border-t border-neutral-200 pt-12 mb-16">
        <h2 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-neutral-950 mb-6">
          Factory Technical Blueprint &amp; Quality Architecture
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Materials */}
          <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-neutral-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              Raw Materials &amp; Fabrics
            </h3>
            <ul className="space-y-2 text-xs text-neutral-600">
              {materialsList.length > 0 ? (
                materialsList.map((mat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-neutral-900 shrink-0 mt-0.5" />
                    <span>{mat}</span>
                  </li>
                ))
              ) : (
                <li className="text-neutral-500">Premium poly-elastane, interlock mesh, and performance textiles.</li>
              )}
            </ul>
          </div>

          {/* Column 2: Construction & Seam Features */}
          <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-neutral-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              Ergonomics &amp; Seam Integrity
            </h3>
            <ul className="space-y-2 text-xs text-neutral-600">
              {featuresList.length > 0 ? (
                featuresList.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-neutral-900 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))
              ) : (
                <li className="text-neutral-500">Reinforced flatlock 4-needle stitching, bar-tacked stress points, and athletic fit.</li>
              )}
            </ul>
          </div>

          {/* Column 3: Private Label Branding & Customization */}
          <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-neutral-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              Private Label Customization
            </h3>
            <ul className="space-y-2 text-xs text-neutral-600">
              {customList.length > 0 ? (
                customList.map((opt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-neutral-900 shrink-0 mt-0.5" />
                    <span>{opt}</span>
                  </li>
                ))
              ) : (
                <li className="text-neutral-500">Italian dye sublimation, 3D silicone heat-transfers, woven neck tags, and branded polybags.</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* =========================================================================
          DYNAMIC SIZE CHART COMPONENT (PHASE 4 MANDATE)
      ========================================================================= */}
      <div id="size-chart-section" className="mb-16 scroll-mt-28">
        <SizeChart productName={product.name} sizeChart={product.size_chart} />
      </div>

      {/* =========================================================================
          PRODUCT SPECIFIC FAQ SECTION (PHASE 3 & PHASE 6 MANDATE)
      ========================================================================= */}
      {product.faqs && product.faqs.length > 0 && (
        <div className="mb-16 p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-700 font-bold block mb-1">
              B2B Buying Intelligence
            </span>
            <h2 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-neutral-950">
              Frequently Asked Questions for {product.name}
            </h2>
          </div>

          <div className="divide-y divide-neutral-200">
            {product.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group"
                  >
                    <span className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-amber-700 transition-colors">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-amber-700" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed pr-8">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          RELATED PRODUCTS (INTERNAL LINKING)
      ========================================================================= */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-neutral-200 pt-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-700 font-bold block">
                Related OEM Styles
              </span>
              <h3 className="text-lg font-bold uppercase tracking-tight text-neutral-950">
                More in {category?.name || "This Division"}
              </h3>
            </div>
            <Link
              href={`/products/${category?.slug || "general"}`}
              className="text-xs uppercase tracking-wider text-neutral-900 hover:text-amber-700 font-bold transition-colors font-mono"
            >
              View Full Category →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.slice(0, 4).map((rel) => (
              <JacketMakerProductCard
                key={rel.id}
                product={rel}
                category={category || undefined}
                onInquire={() => {
                  setInquiryType("Quote");
                  setModalOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quote / RFQ Modal */}
      <QuoteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        inquiryType={inquiryType}
        defaultProductName={`${inquiryType === "Sample" ? "[Sample] " : ""}${product.name}`}
        defaultCategory={category?.name || "Sportswear & Teamwear"}
        defaultQuantity={quantity}
      />
    </div>
  );
}
