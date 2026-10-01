"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product, Category, PriceTier } from "@/types/database";
import {
  Clock,
  Box,
  ShieldCheck,
  Check,
  ArrowUpRight,
  ArrowRight,
  Layers,
  ChevronRight,
  ChevronLeft,
  Star,
  Heart,
  Share2,
  FileText,
  PhoneCall,
  CheckCircle2,
  Maximize2,
  BadgeCheck,
} from "lucide-react";
import QuoteModal from "../ui/QuoteModal";
import GooeyButton from "../ui/GooeyButton";

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
      {
        id: "default-img-2",
        product_id: product.id,
        image_url:
          "https://images.unsplash.com/photo-1517438322307-e67111335449?q=80&w=1200&auto=format&fit=crop",
        alt_text: `${product.name} back view`,
        sort_order: 2,
        is_primary: false,
        created_at: "",
      },
      {
        id: "default-img-3",
        product_id: product.id,
        image_url:
          "https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?q=80&w=1200&auto=format&fit=crop",
        alt_text: `${product.name} detail view`,
        sort_order: 3,
        is_primary: false,
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
    const moq = product.moq || 50;
    return [
      {
        min_quantity: moq,
        max_quantity: Math.max(moq, 49),
        unit_price: Math.round(baseSample * 0.52 * 100) / 100,
        currency: "$",
        label: "10-49 pieces",
      },
      {
        min_quantity: 50,
        max_quantity: 99,
        unit_price: Math.round(baseSample * 0.4 * 100) / 100,
        currency: "$",
        label: "50-99 pieces",
      },
      {
        min_quantity: 100,
        max_quantity: null,
        unit_price: Math.round(baseSample * 0.32 * 100) / 100,
        currency: "$",
        label: "≥100 pieces",
      },
    ];
  }, [product]);

  const tiers: PriceTier[] = useMemo(() => {
    if (product.pricing_tiers && product.pricing_tiers.length > 0) {
      // Filter out single sample unit if present to keep the clean bulk row
      const bulkOnly = product.pricing_tiers.filter((t) => t.min_quantity > 1);
      return bulkOnly.length > 0 ? bulkOnly : product.pricing_tiers;
    }
    return defaultTiers;
  }, [product.pricing_tiers, defaultTiers]);

  // Order quantity state
  const [quantity, setQuantity] = useState<number>(product.moq || 50);

  // Selected variation state
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>("12oz");
  const [mediaMode, setMediaMode] = useState<"photos" | "video">("photos");

  // RFQ Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState<"Quote" | "Sample">("Quote");

  // Determine active tier for current quantity
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
  const parseList = (item: string[] | string | null): string[] => {
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

  // Colorways swatches
  const colorOptions = [
    { name: "Matte Stealth Black", color: "#171717", badge: "Most Popular" },
    { name: "Olympic White / Gold", color: "#f8fafc", border: "#e2e8f0" },
    { name: "Oxblood Pro Leather", color: "#7f1d1d" },
    { name: "Combat Charcoal Grey", color: "#334155" },
    { name: "Custom Pantone Match", color: "#b45309", isCustom: true },
  ];

  // Sizes / Specs options
  const sizeOptions = ["8oz", "10oz", "12oz", "14oz", "16oz", "Custom Fit"];

  return (
    <div className="max-w-7xl mx-auto pb-20">
      {/* Breadcrumbs */}
      <nav className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 mb-6 font-medium">
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
        <span className="text-amber-800 font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* =========================================================================
          MAIN ALIBABA-STYLE PRODUCT SECTION (2 COLUMNS)
      ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
        {/* =======================================================================
            LEFT COLUMN: GALLERY + VERIFIED FACTORY PROFILE CARD
        ======================================================================= */}
        <div className="lg:col-span-6 space-y-6">
          {/* Gallery Row: Left Vertical Thumbnails + Main Stage */}
          <div className="flex gap-3 sm:gap-4 items-start">
            {/* Vertical Thumbnail Strip (Matches reference image) */}
            <div className="flex flex-col gap-2.5 w-16 sm:w-20 shrink-0">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-square w-full rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? "border-neutral-950 ring-2 ring-neutral-950/20 shadow-xs"
                      : "border-neutral-200 hover:border-neutral-400 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.image_url}
                    alt={img.alt_text || `${product.name} sample view ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Stage Image with Navigation Arrows & Floating Actions */}
            <div className="relative flex-1 aspect-square sm:aspect-4/3 rounded-2xl bg-neutral-100 border border-neutral-200/90 overflow-hidden shadow-xs group">
              <Image
                src={activeImageUrl}
                alt={activeImage?.alt_text || `${product.name} - Custom OEM Manufacturer Sialkot (GLOVES STORM)`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Prev / Next Arrows (Matches reference image) */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-neutral-800 flex items-center justify-center shadow-md transition-all cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-neutral-800 flex items-center justify-center shadow-md transition-all cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Top Right Action Icons (Favorite / Zoom) */}
              <div className="absolute top-3 right-3 flex flex-col gap-2">
                <button
                  className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-neutral-700 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                  title="Save to Favorites"
                >
                  <Heart className="w-4 h-4" />
                </button>
                <button
                  className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-neutral-700 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                  title="Expand Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Angle Index Indicator */}
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono px-2.5 py-0.5 rounded-full">
                {activeImageIndex + 1} / {images.length}
              </div>
            </div>
          </div>

          {/* Photos / Video Toggle Pills (Matches reference image) */}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setMediaMode("photos")}
              className={`px-4 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                mediaMode === "photos"
                  ? "bg-neutral-900 text-white shadow-xs"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              Photos
            </button>
            <button
              onClick={() => setMediaMode("video")}
              className={`px-4 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                mediaMode === "video"
                  ? "bg-neutral-900 text-white shadow-xs"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              Video (Factory QC)
            </button>
          </div>

          {/* ===================================================================
              VERIFIED FACTORY SUPPLIER CARD (Exact match to reference image)
          =================================================================== */}
          <div className="p-5 sm:p-6 rounded-2xl bg-neutral-50/80 border border-neutral-200/90 shadow-2xs space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-neutral-950 text-amber-400 font-black flex items-center justify-center text-sm shadow-xs shrink-0">
                  GS
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="text-sm font-bold text-neutral-950 hover:text-amber-800 transition-colors">
                      Gloves Storm Industrial Co., Ltd.
                    </div>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded inline-flex items-center gap-1">
                      <BadgeCheck className="w-3 h-3" />
                      Verified
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    🇵🇰 Sialkot, Pakistan • 15+ yrs OEM/ODM • Custom Manufacturer
                  </p>
                </div>
              </div>
            </div>

            <div className="text-xs text-neutral-600 space-y-1">
              <div className="text-amber-800 font-semibold text-[11px] flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                <span>#1 Best Seller in OEM Fight Gear &amp; Leather Sports Products</span>
              </div>
              <p className="text-[11px] text-neutral-500">
                Verified Global OEM Supplier for Top Boutiques, Academies &amp; Fight Promotions
              </p>
            </div>

            {/* 4-Stat Metric Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-neutral-200/80 text-center">
              <div className="p-2.5 rounded-xl bg-white border border-neutral-200/60 shadow-2xs">
                <div className="text-sm font-black text-neutral-950 flex items-center justify-center gap-1">
                  <span>4.9/5</span>
                  <span className="text-[10px] text-neutral-400 font-normal">(1,840)</span>
                </div>
                <span className="text-[10px] text-neutral-500 font-medium">Store rating</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-neutral-200/60 shadow-2xs">
                <div className="text-sm font-black text-neutral-950">≤3h</div>
                <span className="text-[10px] text-neutral-500 font-medium">Response Time</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-neutral-200/60 shadow-2xs">
                <div className="text-sm font-black text-neutral-950">≥98%</div>
                <span className="text-[10px] text-neutral-500 font-medium">On-time dispatch</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-neutral-200/60 shadow-2xs">
                <div className="text-sm font-black text-neutral-950">88%</div>
                <span className="text-[10px] text-neutral-500 font-medium">Reorder rate</span>
              </div>
            </div>

            {/* Verified Services */}
            <div className="flex items-center gap-4 text-xs text-neutral-600 pt-1 flex-wrap font-medium">
              <span className="inline-flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-blue-600" /> Minor customization
              </span>
              <span className="inline-flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-blue-600" /> Drawing-based customization
              </span>
              <span className="inline-flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-blue-600" /> 100% Quality Inspection
              </span>
            </div>
          </div>
        </div>

        {/* =======================================================================
            RIGHT COLUMN: PRODUCT DETAILS, ALIBABA TIERS, SPEC SHEET & ORDER BAR
        ======================================================================= */}
        <div className="lg:col-span-6 space-y-6">
          {/* Product Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-800 font-bold bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                {category?.name || "Manufacturing Division"}
              </span>
              <span className="text-xs text-neutral-500 font-mono">
                MOQ: {product.moq} Units
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-950 uppercase leading-snug">
              {product.name}
            </h1>

            {/* Rating & Social Proof Row (Matches reference image) */}
            <div className="mt-2.5 flex items-center gap-3 text-xs text-neutral-600 flex-wrap">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
                <span className="font-bold text-neutral-900 ml-1">5.0</span>
                <span className="text-neutral-500 underline cursor-pointer">(28 reviews)</span>
              </div>
              <span className="text-neutral-300">•</span>
              <span className="font-bold text-neutral-900">677+ sold</span>
              <span className="text-neutral-300">•</span>
              <span className="text-amber-800 font-medium">#1 most popular in {category?.name || "Equipment"}</span>
              <span className="text-neutral-300">•</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded font-bold text-[10px]">
                Safe &amp; Sustainable
              </span>
            </div>
          </div>

          {/* ===================================================================
              ALIBABA PRICE TIERS SECTION (Exact match to reference image)
          =================================================================== */}
          <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50/90 border border-neutral-200/90 space-y-3">
            <div className="grid grid-cols-3 gap-3 items-end">
              {tiers.map((tier, idx) => {
                const isSelected = activeTier === tier;
                const rangeLabel =
                  tier.max_quantity === null || tier.max_quantity === undefined
                    ? `≥${tier.min_quantity} pieces`
                    : `${tier.min_quantity}-${tier.max_quantity} pieces`;

                return (
                  <div
                    key={idx}
                    onClick={() => setQuantity(tier.min_quantity)}
                    className={`cursor-pointer transition-all rounded-xl p-3 text-left ${
                      isSelected
                        ? "bg-white border-2 border-neutral-900 shadow-xs ring-2 ring-amber-500/20"
                        : "hover:bg-white/60 border border-transparent"
                    }`}
                  >
                    <div className="text-xl sm:text-2xl font-black text-neutral-950 font-sans tracking-tight">
                      US${tier.unit_price.toFixed(0)}
                      {tier.unit_price % 1 !== 0 && (
                        <span className="text-xs font-bold text-neutral-600">
                          .{(tier.unit_price % 1).toFixed(2).substring(2)}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-xs text-neutral-500 font-medium">
                      {tier.label && !tier.label.includes("Tier") ? tier.label : rangeLabel}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sample Price Notice */}
            <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-xs">
              <span className="text-neutral-500 font-mono text-[11px]">
                Single Evaluation Sample:
              </span>
              <span className="font-bold text-neutral-900 font-mono">
                US${(product.sample_price || 35.0).toFixed(2)} / prototype
              </span>
            </div>
          </div>

          {/* ===================================================================
              COLOR / MATERIAL VARIATION SWATCHES (Matches reference image)
          =================================================================== */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Colorway / Finish:
              </span>
              <button
                onClick={() => setSelectedColor((prev) => (prev + 1) % colorOptions.length)}
                className="text-[11px] font-bold text-amber-800 hover:underline cursor-pointer font-mono"
              >
                Select now
              </button>
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
              SIZE / OUNCE WEIGHT SELECTION (Matches reference image)
          =================================================================== */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
              Size / Weight Specification:
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              {sizeOptions.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`min-w-12 text-center px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
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
              SUPPLIER'S CUSTOMIZATION ABILITY (Matches reference image)
          =================================================================== */}
          <div className="p-4 rounded-xl bg-white border border-neutral-200/90 shadow-2xs space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-neutral-900">
                Supplier&apos;s customization ability
              </span>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded inline-flex items-center gap-1">
                <Check className="w-3 h-3" /> Verified
              </span>
            </div>
            <ul className="space-y-1 text-xs text-neutral-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                <span>Minor customization (Logo embossing, custom woven tags, retail barcodes)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                <span>Drawing-based customization (Vector artwork, 2D/3D CAD vector grading)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                <span>Sample-based customization (Physical counter-sample replication in 3-5 days)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                <span>Full customization (Custom hand-molds, bespoke foam densities &amp; tanning)</span>
              </li>
            </ul>
          </div>

          {/* ===================================================================
              KEY ATTRIBUTES SPECIFICATION GRID (Matches reference image)
          =================================================================== */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
              Key Attributes
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                <span className="block text-[10px] text-neutral-500">Material</span>
                <span className="block font-bold text-neutral-900 mt-0.5 truncate">
                  {materialsList[0] || "100% Top-Grain Cowhide"}
                </span>
              </div>
              <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                <span className="block text-[10px] text-neutral-500">Closure / Wrist</span>
                <span className="block font-bold text-neutral-900 mt-0.5 truncate">
                  Hook &amp; Loop / Lace-Up
                </span>
              </div>
              <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                <span className="block text-[10px] text-neutral-500">Padding Foam</span>
                <span className="block font-bold text-neutral-900 mt-0.5 truncate">
                  Multi-Layer Gel Foam
                </span>
              </div>
              <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                <span className="block text-[10px] text-neutral-500">Fit / Ergonomics</span>
                <span className="block font-bold text-neutral-900 mt-0.5 truncate">
                  Anatomical Pre-Curved
                </span>
              </div>
              <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                <span className="block text-[10px] text-neutral-500">Branding Options</span>
                <span className="block font-bold text-neutral-900 mt-0.5 truncate">
                  Emboss / Foil / Silicone
                </span>
              </div>
              <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                <span className="block text-[10px] text-neutral-500">Lead Time</span>
                <span className="block font-bold text-neutral-900 mt-0.5 truncate">
                  {product.lead_time || "2-4 Weeks"}
                </span>
              </div>
            </div>
          </div>

          {/* ===================================================================
              QUANTITY COUNTER & ORDER ACTION BAR
          =================================================================== */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Quantity:
                </span>
                <div className="flex items-center border border-neutral-300 rounded-lg bg-white overflow-hidden shadow-2xs">
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
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 50))}
                    className="w-20 text-center font-mono font-bold text-xs py-1.5 outline-none border-x border-neutral-200"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 25)}
                    className="px-3 py-1.5 text-xs font-bold text-neutral-700 hover:bg-neutral-100 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-neutral-500 font-mono">pairs</span>
              </div>

              <div className="text-left sm:text-right">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                  Est. Total (FOB)
                </span>
                <span className="text-lg font-black font-mono text-neutral-950">
                  US${estimatedTotal}
                </span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setInquiryType("Quote");
                  setModalOpen(true);
                }}
                className="flex-1 py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer font-sans"
              >
                <span>Start Order / Request Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setInquiryType("Sample");
                  setQuantity(1);
                  setModalOpen(true);
                }}
                className="py-3 px-5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs cursor-pointer font-mono"
              >
                Order Sample
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          TECHNICAL SPECIFICATIONS TABS / DEEP DIVE SECTION
      ========================================================================= */}
      <div className="border-t border-neutral-200 pt-12 mb-16">
        <h2 className="text-xl font-bold uppercase tracking-tight text-neutral-950 mb-6">
          Factory Technical Blueprint &amp; Quality Specifications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Materials */}
          <div className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs">
            <h3 className="text-xs font-black uppercase tracking-wider text-neutral-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Raw Materials &amp; Tanning
            </h3>
            <ul className="space-y-2 text-xs text-neutral-600">
              {materialsList.length > 0 ? (
                materialsList.map((mat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{mat}</span>
                  </li>
                ))
              ) : (
                <li className="text-neutral-500">Premium top-grain cowhide, engineered synthetics, and multi-layer shock foam.</li>
              )}
            </ul>
          </div>

          {/* Column 2: Construction Features */}
          <div className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs">
            <h3 className="text-xs font-black uppercase tracking-wider text-neutral-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Ergonomics &amp; Safety
            </h3>
            <ul className="space-y-2 text-xs text-neutral-600">
              {featuresList.length > 0 ? (
                featuresList.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))
              ) : (
                <li className="text-neutral-500">CE Certified ergonomic grip bar, locked-thumb safety, and reinforced dual stitching.</li>
              )}
            </ul>
          </div>

          {/* Column 3: Customization */}
          <div className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs">
            <h3 className="text-xs font-black uppercase tracking-wider text-neutral-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Bespoke Branding
            </h3>
            <ul className="space-y-2 text-xs text-neutral-600">
              {customList.length > 0 ? (
                customList.map((opt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{opt}</span>
                  </li>
                ))
              ) : (
                <li className="text-neutral-500">Custom 3D embroidery, heat-transfer silicone badges, woven wrist labels, and branded boxes.</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Product Detailed Description */}
      {product.description && (
        <div className="mb-16 p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-800 font-bold block mb-2">
            Sialkot Factory Overview
          </span>
          <h2 className="text-lg font-bold uppercase tracking-tight text-neutral-950 mb-3">
            Manufacturing &amp; Engineering Brief
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-4xl">
            {product.description}
          </p>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-neutral-200 pt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold uppercase tracking-tight text-neutral-950">
              More Models in {category?.name || "This Category"}
            </h3>
            <Link
              href={`/products/${category?.slug || "general"}`}
              className="text-xs uppercase tracking-wider text-amber-800 hover:text-amber-900 font-bold transition-colors font-mono"
            >
              View Division Catalog →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.slice(0, 4).map((rel) => {
              const relImg =
                rel.images?.[0]?.image_url ||
                "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop";
              return (
                <Link
                  key={rel.id}
                  href={`/products/${category?.slug || "general"}/${rel.slug}`}
                  className="group bg-white rounded-2xl border border-neutral-200/90 hover:border-neutral-300 hover:shadow-md transition-all p-3.5 flex flex-col justify-between"
                >
                  <div className="relative aspect-square bg-neutral-100 rounded-xl overflow-hidden mb-3 border border-neutral-200/70">
                    <Image
                      src={relImg}
                      alt={rel.images?.[0]?.alt_text || `${rel.name} - Custom OEM Manufacturer Sialkot (GLOVES STORM)`}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="text-xs font-bold uppercase text-neutral-950 group-hover:text-amber-800 transition-colors truncate mb-1">
                    {rel.name}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 pt-2 border-t border-neutral-100">
                    <span>MOQ: {rel.moq} Units</span>
                    <span className="text-amber-700 font-bold">Explore →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Quote / RFQ Modal */}
      <QuoteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        inquiryType={inquiryType}
        defaultProductName={`${inquiryType === "Sample" ? "[Sample] " : ""}${product.name}`}
        defaultCategory={category?.name || "General"}
        defaultQuantity={quantity}
      />
    </div>
  );
}
