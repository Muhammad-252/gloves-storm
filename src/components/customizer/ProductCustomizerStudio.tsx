"use client";

import { useState, useMemo, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product, Category } from "@/types/database";
import {
  Palette,
  Layers,
  Sparkles,
  Upload,
  Check,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Box,
  Maximize2,
  Minimize2,
  FileText,
  Sliders,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import GooeyButton from "../ui/GooeyButton";
import MagneticElement from "../ui/MagneticElement";

export interface CustomizationState {
  productId: string;
  productName: string;
  categorySlug: string;
  categoryName: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  finish: string;
  materials: string;
  sizing: string[];
  brandingMethod: string;
  logoPlacement: string;
  logoUrl: string | null;
  logoScale: number;
  logoPositionX: number;
  logoPositionY: number;
  packaging: string;
  sampleQuantity: number;
  bulkQuantity: number;
  specificSpecs: Record<string, string>;
  notes: string;
}

const COLOR_PALETTE = [
  { name: "Matte Black", hex: "#121212", border: "#333333" },
  { name: "Stealth Charcoal", hex: "#222224", border: "#444444" },
  { name: "Crisp Pure White", hex: "#f8f8f8", border: "#cccccc" },
  { name: "Vintage Oxblood", hex: "#4a121a", border: "#6e1d29" },
  { name: "Brushed Metallic Gold", hex: "#c59b27", border: "#d4af37" },
  { name: "Desert Sand / Khaki", hex: "#c2b280", border: "#d8c798" },
  { name: "Deep Cobalt Navy", hex: "#0c1b33", border: "#183059" },
  { name: "Combat Crimson", hex: "#8a0303", border: "#b21818" },
  { name: "Tactical Forest Olive", hex: "#283321", border: "#3c4e32" },
];

interface ProductCustomizerStudioProps {
  products: Product[];
  categories: Category[];
  initialProductId?: string;
  onCloseModal?: () => void;
}

export default function ProductCustomizerStudio({
  products,
  categories,
  initialProductId,
  onCloseModal,
}: ProductCustomizerStudioProps) {
  const router = useRouter();

  // Find initial product or fallback (by ID or slug)
  const defaultProduct =
    products.find(
      (p) => p.id === initialProductId || p.slug === initialProductId
    ) || products[0];

  const [selectedProduct, setSelectedProduct] = useState<Product>(defaultProduct);
  const [activeStep, setActiveStep] = useState<"colors" | "materials" | "specs" | "branding" | "quantity">("colors");

  // Dynamic customization state
  const [customState, setCustomState] = useState<CustomizationState>({
    productId: defaultProduct?.id || "",
    productName: defaultProduct?.name || "Bespoke Product",
    categorySlug: defaultProduct?.category?.slug || "boxing",
    categoryName: defaultProduct?.category?.name || "Boxing",
    primaryColor: "#121212",
    secondaryColor: "#c59b27",
    accentColor: "#f8f8f8",
    finish: "Matte Smooth",
    materials: "Full-Grain Cowhide Leather (1.1mm)",
    sizing: ["12oz", "14oz", "16oz"],
    brandingMethod: "Debossed Leather + Foil Stamp",
    logoPlacement: "Wrist Cuff & Thumb Pocket",
    logoUrl: null,
    logoScale: 80,
    logoPositionX: 50,
    logoPositionY: 65,
    packaging: "Custom Matte Magnetic Gift Box",
    sampleQuantity: 2,
    bulkQuantity: 100,
    specificSpecs: {
      gloveWeight: "14oz & 16oz (Split)",
      paddingType: "5-Layer Handcrafted Latex & EVA",
      wristClosure: "Dual-Channel Lace-Up",
      gsmWeight: "450 GSM Heavy French Terry",
      fitStyle: "Oversized Luxury Boxy",
      sublimationStyle: "Full Sublimation Micro-Interlock",
    },
    notes: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // When selected product changes
  const handleProductChange = (prod: Product) => {
    setSelectedProduct(prod);
    setCustomState((prev) => ({
      ...prev,
      productId: prod.id,
      productName: prod.name,
      categorySlug: prod.category?.slug || "custom",
      categoryName: prod.category?.name || "Custom",
    }));
  };

  // Handle Logo Upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomState((prev) => ({ ...prev, logoUrl: url }));
    }
  };

  // Primary image
  const primaryImage = useMemo(() => {
    const img = selectedProduct.images?.find((i) => i.is_primary)?.image_url;
    return img || selectedProduct.images?.[0]?.image_url || "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop";
  }, [selectedProduct]);

  // Handle handoff to multi-step inquiry
  const handleProceedToInquiry = () => {
    // Store customization payload in session storage for seamless pickup in /contact
    if (typeof window !== "undefined") {
      sessionStorage.setItem("gs_customization_payload", JSON.stringify(customState));
    }
    if (onCloseModal) {
      onCloseModal();
    }
    router.push(`/contact?prefill=customizer&productId=${selectedProduct.id}`);
  };

  // Category detection
  const isBoxing = customState.categorySlug.includes("boxing");
  const isStreetwear = customState.categorySlug.includes("streetwear") || customState.categorySlug.includes("fashion");
  const isBasketball = customState.categorySlug.includes("basketball") || customState.categorySlug.includes("soccer") || customState.categorySlug.includes("american-football");

  // Step navigation helpers
  const stepList = [
    { id: "colors", num: "01", title: "Colors", sub: "Body & Trims", icon: Palette },
    { id: "materials", num: "02", title: "Materials", sub: "Leather & Fabric", icon: Layers },
    { id: "specs", num: "03", title: "Tailoring", sub: "Sizing & Cuts", icon: Sliders },
    { id: "branding", num: "04", title: "Branding & Logo", sub: "Logos & Patches", icon: Sparkles },
    { id: "quantity", num: "05", title: "Quantity", sub: "Samples & Run", icon: Box },
  ] as const;
  const stepOrder = ["colors", "materials", "specs", "branding", "quantity"] as const;
  const currentStepIdx = Math.max(0, stepOrder.indexOf(activeStep));
  const handlePrevStep = () => {
    if (currentStepIdx > 0) {
      setActiveStep(stepOrder[currentStepIdx - 1]);
    }
  };
  const handleNextStep = () => {
    if (currentStepIdx < stepOrder.length - 1) {
      setActiveStep(stepOrder[currentStepIdx + 1]);
    }
  };

  return (
    <div className="w-full bg-[#fcfcfd] text-[#1A1A1A]">
      {/* Studio Header Bar — Master Luxury Control Deck */}
      <div className="border-b border-black/[0.08] sticky top-0 z-30 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur-md">
        {/* Tier 1: Dark Obsidian Studio Header */}
        <div className="bg-[#0f141c] text-white border-b border-white/[0.08] px-4 sm:px-8 py-3 sm:py-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Studio Badge & Active Product Info */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500/20 via-amber-600/10 to-transparent border border-amber-500/30 text-amber-400 shrink-0 shadow-inner">
                <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0f141c]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400 font-extrabold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping inline-block" />
                    Bespoke Configurator Studio
                  </span>
                  <span className="hidden sm:inline-block text-neutral-600">•</span>
                  <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-wider text-emerald-400/90 font-medium">
                    Live 3D Composite
                  </span>
                </div>
                <div className="flex items-center gap-2.5 flex-wrap mt-0.5">
                  <h1 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-white truncate max-w-[280px] sm:max-w-md">
                    {customState.productName}
                  </h1>
                  <span className="text-[11px] sm:text-xs px-3 py-0.5 rounded-full bg-white/10 text-amber-200/90 font-medium border border-white/10 shrink-0">
                    {customState.categoryName}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side: Step Progress & Submit Button */}
            <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-white/[0.08]">
              <div className="text-right hidden sm:block">
                <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest block">
                  Studio Spec Status
                </span>
                <span className="text-xs font-mono font-bold text-amber-400">
                  {`STEP 0${currentStepIdx + 1} OF 05 • ${(currentStepIdx + 1) * 20}% CONFIGURED`}
                </span>
              </div>
              <GooeyButton
                onClick={handleProceedToInquiry}
                variant="gold-solid"
                size="sm"
                className="!px-5 !py-2.5 text-xs shadow-lg shadow-amber-500/20 font-bold"
              >
                <span>SUBMIT SPECS</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </GooeyButton>
            </div>
          </div>
        </div>

        {/* Tier 2: 5-Step Segmented Interactive Navigation Track */}
        <div className="bg-white border-b border-black/[0.07] px-3 sm:px-8 py-2.5 sm:py-3.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
            {/* Quick Prev Button for Mobile/Tablet */}
            <button
              onClick={handlePrevStep}
              disabled={currentStepIdx === 0}
              className="p-2 sm:p-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-600 hover:text-neutral-950 hover:bg-white hover:border-neutral-300 disabled:opacity-25 disabled:pointer-events-none transition-all shrink-0"
              aria-label="Previous configuration step"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* 5-Step Connected Progress Track */}
            <div className="flex-1 grid grid-cols-5 gap-1.5 sm:gap-3 overflow-x-auto py-0.5 scrollbar-none">
              {stepList.map((step, idx) => {
                const Icon = step.icon;
                const isActive = activeStep === step.id;
                const isPassed = currentStepIdx > idx;
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(step.id as any)}
                    className={`group relative flex items-center gap-2 sm:gap-3 px-2 sm:px-3.5 py-2 sm:py-2.5 rounded-2xl text-left transition-all duration-300 border ${
                      isActive
                        ? "bg-[#0f141c] text-white border-amber-500/90 shadow-md shadow-amber-500/10 scale-[1.02] z-10 ring-1 ring-amber-500/30"
                        : isPassed
                        ? "bg-amber-50/60 text-amber-950 border-amber-300/60 hover:bg-amber-100/60"
                        : "bg-white text-neutral-600 border-black/[0.08] hover:border-neutral-300 hover:bg-neutral-50/80"
                    }`}
                  >
                    {/* Step Number Badge */}
                    <span
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-xl text-[10px] sm:text-xs font-mono font-black flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? "bg-amber-500 text-[#0f141c] shadow-xs"
                          : isPassed
                          ? "bg-amber-600/15 text-amber-800 font-bold"
                          : "bg-neutral-100 text-neutral-400 group-hover:bg-neutral-200 group-hover:text-neutral-700"
                      }`}
                    >
                      {isPassed ? <Check className="w-3.5 h-3.5 stroke-[3] text-amber-700" /> : step.num}
                    </span>

                    {/* Step Title & Subtitle */}
                    <div className="flex flex-col min-w-0 pr-0.5">
                      <div className="flex items-center gap-1.5">
                        <Icon
                          className={`w-3.5 h-3.5 shrink-0 hidden sm:inline-block ${
                            isActive ? "text-amber-400" : isPassed ? "text-amber-700" : "text-neutral-400"
                          }`}
                        />
                        <span
                          className={`text-[11px] sm:text-xs font-bold uppercase tracking-tight truncate ${
                            isActive ? "text-white" : isPassed ? "text-neutral-900" : "text-neutral-700"
                          }`}
                        >
                          {step.title}
                        </span>
                      </div>
                      <span
                        className={`text-[9px] sm:text-[10px] font-mono truncate hidden lg:block ${
                          isActive ? "text-amber-300/80" : "text-neutral-400"
                        }`}
                      >
                        {step.sub}
                      </span>
                    </div>

                    {/* Golden Underglow Bar on Active Step */}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick Next Button for Mobile/Tablet */}
            <button
              onClick={handleNextStep}
              disabled={currentStepIdx === stepOrder.length - 1}
              className="p-2 sm:p-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-600 hover:text-neutral-950 hover:bg-white hover:border-neutral-300 disabled:opacity-25 disabled:pointer-events-none transition-all shrink-0"
              aria-label="Next configuration step"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Studio Grid: Left Form Controls, Right Sticky Interactive Mockup */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Configuration Steps (7 cols) */}
        <div className="lg:col-span-7 space-y-8">

          {/* STEP 1: COLORS & FINISHES */}
          {activeStep === "colors" && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200 shadow-md space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#b45309] block mb-1 font-bold">
                  Step 01 of 05
                </span>
                <h3 className="text-xl font-bold uppercase tracking-tight text-[#1A1A1A]">
                  Select Colorway & Leather / Fabric Tone
                </h3>
                <p className="text-xs text-neutral-600 mt-1">
                  Choose primary body tone, contrast panel color, and accent trim. The live preview on the right reacts instantly.
                </p>
              </div>

              {/* Primary Color Palette Swatches */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 block mb-3 flex items-center justify-between font-medium">
                  <span>Primary Body Color</span>
                  <span className="text-[#1A1A1A] font-bold">{customState.primaryColor}</span>
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {COLOR_PALETTE.map((color) => {
                    const isSelected = customState.primaryColor === color.hex;
                    return (
                      <button
                        key={color.hex}
                        type="button"
                        onClick={() =>
                          setCustomState((prev) => ({ ...prev, primaryColor: color.hex }))
                        }
                        className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col items-center justify-center gap-2 group ${
                          isSelected
                            ? "border-amber-600 bg-amber-50 ring-2 ring-amber-500/30"
                            : "border-neutral-200 bg-neutral-50/60 hover:border-neutral-300"
                        }`}
                      >
                        <span
                          className="w-7 h-7 rounded-full shadow-inner border border-neutral-300 transition-transform group-hover:scale-110"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-[10px] text-center font-medium text-neutral-800 line-clamp-1">
                          {color.name}
                        </span>
                        {isSelected && (
                          <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-amber-600 flex items-center justify-center text-white">
                            <Check className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Secondary Contrast Color */}
              <div className="pt-4 border-t border-neutral-200">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 block mb-3 flex items-center justify-between font-medium">
                  <span>Secondary / Palm / Accent Color</span>
                  <span className="text-[#1A1A1A] font-bold">{customState.secondaryColor}</span>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {COLOR_PALETTE.map((color) => {
                    const isSelected = customState.secondaryColor === color.hex;
                    return (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() =>
                          setCustomState((prev) => ({ ...prev, secondaryColor: color.hex }))
                        }
                        className={`px-3 py-1.5 rounded-full border text-xs flex items-center gap-2 transition-all ${
                          isSelected
                            ? "border-amber-600 bg-amber-50 text-[#b45309] font-bold"
                            : "border-neutral-200 bg-neutral-50 text-neutral-600 hover:text-[#1A1A1A]"
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-neutral-300"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Surface Finish Selector */}
              <div className="pt-4 border-t border-neutral-200">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 block mb-3 font-medium">
                  Surface Texture & Sheen Finish
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    "Matte Smooth",
                    "Pebbled Grain",
                    "Metallic Sheen",
                    "Vintage Distressed",
                  ].map((fin) => {
                    const isSelected = customState.finish === fin;
                    return (
                      <button
                        key={fin}
                        type="button"
                        onClick={() => setCustomState((prev) => ({ ...prev, finish: fin }))}
                        className={`p-3 rounded-2xl border text-center text-xs font-medium transition-all ${
                          isSelected
                            ? "border-amber-600 bg-amber-50 text-[#b45309] font-bold"
                            : "border-neutral-200 bg-neutral-50/60 text-neutral-700 hover:border-neutral-300"
                        }`}
                      >
                        {fin}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step Forward Action */}
              <div className="flex justify-end pt-4">
                <GooeyButton
                  onClick={() => setActiveStep("materials")}
                  variant="outline"
                  size="md"
                >
                  <span>NEXT: MATERIALS</span>
                  <ChevronRight className="w-4 h-4" />
                </GooeyButton>
              </div>
            </div>
          )}

          {/* STEP 2: MATERIALS & PADDING */}
          {activeStep === "materials" && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200 shadow-md space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#b45309] block mb-1 font-bold">
                  Step 02 of 05
                </span>
                <h3 className="text-xl font-bold uppercase tracking-tight text-[#1A1A1A]">
                  Engineered Substrate & Core Construction
                </h3>
                <p className="text-xs text-neutral-600 mt-1">
                  Select premium raw materials. All leathers and textiles are tested in Sialkot for abrasion, burst strength, and colorfastness.
                </p>
              </div>

              {/* Primary Material Options */}
              <div className="space-y-3">
                {[
                  {
                    name: "100% Full-Grain Cowhide Leather (1.1 - 1.2mm)",
                    desc: "Handcrafted top-layer leather with natural grain durability and pro punch feedback.",
                    badge: "Championship Tier",
                  },
                  {
                    name: "Heavyweight Japanese Microfiber Engineered Leather",
                    desc: "Zero maintenance, anti-crease, water-repellent performance substrate with extreme tensile strength.",
                    badge: "Vegan Pro",
                  },
                  {
                    name: "450 GSM Double-Faced French Terry Cotton",
                    desc: "Ultra-heavyweight brushed loopback knit for high-end luxury streetwear drape.",
                    badge: "Luxury Knit",
                  },
                  {
                    name: "AeroVent Moisture-Wicking Poly-Elastane",
                    desc: "Four-way mechanical stretch with antibacterial odor barrier treatment.",
                    badge: "Team Performance",
                  },
                ].map((mat) => {
                  const isSelected = customState.materials === mat.name;
                  return (
                    <button
                      key={mat.name}
                      type="button"
                      onClick={() =>
                        setCustomState((prev) => ({ ...prev, materials: mat.name }))
                      }
                      className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start justify-between gap-4 ${
                        isSelected
                          ? "border-amber-600 bg-amber-50 ring-1 ring-amber-500/30"
                          : "border-neutral-200 bg-neutral-50/60 hover:border-neutral-300"
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
                            {mat.name}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 text-[#b45309] font-medium">
                            {mat.badge}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-600 leading-relaxed">{mat.desc}</p>
                      </div>
                      <span
                        className={`w-5 h-5 rounded-full border shrink-0 flex items-center justify-center transition-all ${
                          isSelected
                            ? "border-amber-600 bg-amber-600 text-white"
                            : "border-neutral-300"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Specific Padding / Internal Construction */}
              {isBoxing && (
                <div className="pt-4 border-t border-neutral-200 space-y-3">
                  <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 block font-medium">
                    Knuckle Core & Protective Cushion
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { name: "5-Layer Latex & EVA", note: "Traditional Firm Puncher Feedback" },
                      { name: "Shock Gel Injected Cushion", note: "Maximum Sparring Protection" },
                      { name: "Multi-Density Ergonomic Foam", note: "Lightweight High Speed Training" },
                    ].map((pad) => {
                      const isSelected = customState.specificSpecs.paddingType === pad.name;
                      return (
                        <button
                          key={pad.name}
                          type="button"
                          onClick={() =>
                            setCustomState((prev) => ({
                              ...prev,
                              specificSpecs: { ...prev.specificSpecs, paddingType: pad.name },
                            }))
                          }
                          className={`p-3 rounded-2xl border text-left transition-all ${
                            isSelected
                              ? "border-amber-600 bg-amber-50"
                              : "border-neutral-200 bg-neutral-50/60 hover:border-neutral-300"
                          }`}
                        >
                          <span className="block text-xs font-bold text-[#1A1A1A] mb-1">
                            {pad.name}
                          </span>
                          <span className="text-[10px] text-neutral-500 block">{pad.note}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step Navigation */}
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setActiveStep("colors")}
                  className="text-xs font-mono text-neutral-500 hover:text-[#1A1A1A] font-medium"
                >
                  ← Back
                </button>
                <GooeyButton
                  onClick={() => setActiveStep("specs")}
                  variant="outline"
                  size="md"
                >
                  <span>NEXT: TAILORING</span>
                  <ChevronRight className="w-4 h-4" />
                </GooeyButton>
              </div>
            </div>
          )}

          {/* STEP 3: SPECIFIC TAILORING & SIZING */}
          {activeStep === "specs" && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 block mb-1">
                  Step 03 of 05
                </span>
                <h3 className="text-xl font-bold uppercase tracking-tight text-[#1A1A1A]">
                  Precision Sizing, Closure & Cut
                </h3>
                <p className="text-xs text-neutral-600 mt-1">
                  Specify tailored sizes or multi-size production allocations for your roster or retail line.
                </p>
              </div>

              {/* Boxing Specific: Ounce Weights */}
              {isBoxing && (
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 block mb-3 font-medium">
                    Target Ounce Sizing (Select all you need manufactured)
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                    {["8oz", "10oz", "12oz", "14oz", "16oz", "18oz"].map((oz) => {
                      const isSelected = customState.sizing.includes(oz);
                      return (
                        <button
                          key={oz}
                          type="button"
                          onClick={() => {
                            const newSizing = isSelected
                              ? customState.sizing.filter((s) => s !== oz)
                              : [...customState.sizing, oz];
                            setCustomState((prev) => ({ ...prev, sizing: newSizing }));
                          }}
                          className={`p-3 rounded-2xl border text-center text-xs font-bold transition-all ${
                            isSelected
                              ? "border-amber-600 bg-amber-500 text-white shadow-sm"
                              : "border-neutral-200 bg-neutral-50/60 text-[#1A1A1A] hover:border-neutral-300"
                          }`}
                        >
                          {oz}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Apparel Specific: Fit & GSM */}
              {isStreetwear && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 block mb-2 font-medium">
                      Silhouette Fit Pattern
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { name: "Oversized Boxy", note: "Drop shoulder, wide chest, cropped hem" },
                        { name: "Tailored Slim Fit", note: "Athletic taper through torso and sleeve" },
                        { name: "Standard Classic", note: "Traditional streetwear regular cut" },
                      ].map((fit) => (
                        <button
                          key={fit.name}
                          type="button"
                          onClick={() =>
                            setCustomState((prev) => ({
                              ...prev,
                              specificSpecs: { ...prev.specificSpecs, fitStyle: fit.name },
                            }))
                          }
                          className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                            customState.specificSpecs.fitStyle === fit.name
                              ? "border-amber-600 bg-amber-50 text-[#1A1A1A] font-bold"
                              : "border-neutral-200 bg-neutral-50/60 text-neutral-700 hover:border-neutral-300"
                          }`}
                        >
                          <span className="block font-bold text-[#1A1A1A] mb-1">{fit.name}</span>
                          <span className="text-[10px] text-neutral-500 block">{fit.note}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 block mb-2 font-medium">
                      Size Curve (Select required sizes)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["XS", "S", "M", "L", "XL", "2XL", "3XL"].map((sz) => {
                        const isSelected = customState.sizing.includes(sz);
                        return (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => {
                              const newSizing = isSelected
                                ? customState.sizing.filter((s) => s !== sz)
                                : [...customState.sizing, sz];
                              setCustomState((prev) => ({ ...prev, sizing: newSizing }));
                            }}
                            className={`w-10 h-10 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center ${
                              isSelected
                                ? "border-amber-600 bg-amber-500 text-white shadow-sm"
                                : "border-neutral-200 bg-neutral-50/60 text-[#1A1A1A] hover:border-neutral-300"
                            }`}
                          >
                            {sz}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Boxing Wrist Closure */}
              {isBoxing && (
                <div className="pt-4 border-t border-neutral-200">
                  <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 block mb-3 font-medium">
                    Wrist Closure Architecture
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        name: "Dual-Channel Lace-Up",
                        desc: "Traditional competition lace channels with piped eyelets.",
                      },
                      {
                        name: "360° Wraparound Military Velcro",
                        desc: "Rapid on-off wrist lock with high-density hook-and-loop.",
                      },
                    ].map((cl) => (
                      <button
                        key={cl.name}
                        type="button"
                        onClick={() =>
                          setCustomState((prev) => ({
                            ...prev,
                            specificSpecs: { ...prev.specificSpecs, wristClosure: cl.name },
                          }))
                        }
                        className={`p-3.5 rounded-2xl border text-left text-xs transition-all ${
                          customState.specificSpecs.wristClosure === cl.name
                            ? "border-amber-600 bg-amber-50 font-bold text-[#1A1A1A]"
                            : "border-neutral-200 bg-neutral-50/60 text-neutral-700 hover:border-neutral-300"
                        }`}
                      >
                        <span className="block text-[#1A1A1A] font-bold mb-1">{cl.name}</span>
                        <span className="text-[10px] text-neutral-500 block">{cl.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step Navigation */}
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setActiveStep("materials")}
                  className="text-xs font-mono text-neutral-500 hover:text-[#1A1A1A] font-medium"
                >
                  ← Back
                </button>
                <GooeyButton
                  onClick={() => setActiveStep("branding")}
                  variant="outline"
                  size="md"
                >
                  <span>NEXT: BRANDING & LOGO</span>
                  <ChevronRight className="w-4 h-4" />
                </GooeyButton>
              </div>
            </div>
          )}

          {/* STEP 4: BRANDING & LOGO UPLOAD */}
          {activeStep === "branding" && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 block mb-1">
                  Step 04 of 05
                </span>
                <h3 className="text-xl font-bold uppercase tracking-tight text-[#1A1A1A]">
                  Brand Embellishment & Logo Preview
                </h3>
                <p className="text-xs text-neutral-600 mt-1">
                  Upload your vector or transparent logo to see it composited on the live product preview.
                </p>
              </div>

              {/* Logo File Upload Box */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="p-6 rounded-2xl border-2 border-dashed border-neutral-300 hover:border-amber-500 bg-neutral-50/50 text-center cursor-pointer transition-all hover:bg-amber-50/20 group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/svg+xml,image/jpeg"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 mx-auto flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-[#1A1A1A] block mb-1">
                  {customState.logoUrl ? "Change Uploaded Brand Logo" : "Upload Your Logo File"}
                </span>
                <span className="text-xs text-neutral-500 block">
                  Supports PNG, SVG, or JPG (transparent background recommended)
                </span>
              </div>

              {/* Logo Position / Scale Sliders if uploaded */}
              {customState.logoUrl && (
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                  <div className="flex items-center justify-between text-xs text-neutral-700">
                    <span>Mockup Logo Scale: {customState.logoScale}%</span>
                    <input
                      type="range"
                      min="40"
                      max="140"
                      value={customState.logoScale}
                      onChange={(e) =>
                        setCustomState((prev) => ({
                          ...prev,
                          logoScale: Number(e.target.value),
                        }))
                      }
                      className="accent-amber-600 w-36"
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-neutral-700">
                    <span>Vertical Placement: {customState.logoPositionY}%</span>
                    <input
                      type="range"
                      min="20"
                      max="85"
                      value={customState.logoPositionY}
                      onChange={(e) =>
                        setCustomState((prev) => ({
                          ...prev,
                          logoPositionY: Number(e.target.value),
                        }))
                      }
                      className="accent-amber-600 w-36"
                    />
                  </div>
                </div>
              )}

              {/* Branding Application Technique */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 block mb-3 font-medium">
                  Industrial Embellishment Method
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      name: "Debossed Leather + Gold/Silver Foil Stamping",
                      note: "Permanent heated die indent with metallic leaf",
                    },
                    {
                      name: "3D High-Density Silicone Puff Print",
                      note: "Tactile raised rubberized logo texture",
                    },
                    {
                      name: "Precision Tajima High-Density Embroidery",
                      note: "Colorfast Japanese polyester threads",
                    },
                    {
                      name: "Laser-Molded Rubber PVC Patch",
                      note: "Weatherproof 3D vulcanized patch on wrist strap",
                    },
                  ].map((tech) => {
                    const isSelected = customState.brandingMethod === tech.name;
                    return (
                      <button
                        key={tech.name}
                        type="button"
                        onClick={() =>
                          setCustomState((prev) => ({ ...prev, brandingMethod: tech.name }))
                        }
                        className={`p-3.5 rounded-2xl border text-left text-xs transition-all ${
                          isSelected
                            ? "border-amber-600 bg-amber-50 font-bold text-[#1A1A1A]"
                            : "border-neutral-200 bg-neutral-50/60 text-neutral-700 hover:border-neutral-300"
                        }`}
                      >
                        <span className="block text-[#1A1A1A] font-bold mb-1">{tech.name}</span>
                        <span className="text-[10px] text-neutral-500 block">{tech.note}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Packaging Specification */}
              <div className="pt-4 border-t border-neutral-200">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 block mb-3 font-medium">
                  Custom Retail Packaging
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    "Custom Matte Magnetic Gift Box",
                    "Breathable Mesh Carry Bag with Drawstring",
                    "Heavy Gauge Eco Zipper Polybag",
                  ].map((pkg) => (
                    <button
                      key={pkg}
                      type="button"
                      onClick={() => setCustomState((prev) => ({ ...prev, packaging: pkg }))}
                      className={`p-3 rounded-2xl border text-center text-xs transition-all ${
                        customState.packaging === pkg
                          ? "border-amber-600 bg-amber-50 font-bold text-[#1A1A1A]"
                          : "border-neutral-200 bg-neutral-50/60 text-neutral-700 hover:border-neutral-300"
                      }`}
                    >
                      {pkg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step Navigation */}
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setActiveStep("specs")}
                  className="text-xs font-mono text-neutral-500 hover:text-[#1A1A1A] font-medium"
                >
                  ← Back
                </button>
                <GooeyButton
                  onClick={() => setActiveStep("quantity")}
                  variant="outline"
                  size="md"
                >
                  <span>NEXT: QUANTITY & FINALIZE</span>
                  <ChevronRight className="w-4 h-4" />
                </GooeyButton>
              </div>
            </div>
          )}

          {/* STEP 5: QUANTITY, NOTES & FINALIZE */}
          {activeStep === "quantity" && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 block mb-1">
                  Step 05 of 05
                </span>
                <h3 className="text-xl font-bold uppercase tracking-tight text-[#1A1A1A]">
                  Quantities, Production Schedule & Notes
                </h3>
                <p className="text-xs text-neutral-600 mt-1">
                  Provide sample requirements and projected bulk run size. Our export directors respond within 12 business hours.
                </p>
              </div>

              {/* Quantity Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                  <label className="text-xs font-mono uppercase text-neutral-700 block mb-2 font-medium">
                    Pre-Production Sample Units
                  </label>
                  <div className="flex items-center gap-3">
                    {[1, 2, 5].map((qty) => (
                      <button
                        key={qty}
                        type="button"
                        onClick={() =>
                          setCustomState((prev) => ({ ...prev, sampleQuantity: qty }))
                        }
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                          customState.sampleQuantity === qty
                            ? "border-amber-600 bg-amber-500 text-white shadow-sm"
                            : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300"
                        }`}
                      >
                        {qty} {qty === 1 ? "Pair" : "Pairs"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                  <label className="text-xs font-mono uppercase text-neutral-700 block mb-2 font-medium">
                    Estimated Bulk Production Run
                  </label>
                  <div className="flex items-center gap-2">
                    {[50, 100, 250, 500].map((qty) => (
                      <button
                        key={qty}
                        type="button"
                        onClick={() =>
                          setCustomState((prev) => ({ ...prev, bulkQuantity: qty }))
                        }
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                          customState.bulkQuantity === qty
                            ? "border-amber-600 bg-amber-500 text-white shadow-sm"
                            : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300"
                        }`}
                      >
                        {qty}+
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Additional Requirements Textarea */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 block mb-2 font-medium">
                  Tell us anything else about your product requirements
                </label>
                <textarea
                  rows={4}
                  value={customState.notes}
                  onChange={(e) =>
                    setCustomState((prev) => ({ ...prev, notes: e.target.value }))
                  }
                  placeholder="Detail any target GSM, PANTONE color codes, stitch thread contrast, special private label instructions, or deadline..."
                  className="w-full bg-white border border-neutral-300 rounded-2xl p-4 text-xs text-[#1A1A1A] placeholder-neutral-400 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500/20 transition-all resize-none"
                />
              </div>

              {/* Final Submit & Proceed Action */}
              <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setActiveStep("branding")}
                  className="text-xs font-mono text-neutral-500 hover:text-[#1A1A1A] font-medium"
                >
                  ← Back to Branding
                </button>

                <MagneticElement strength={0.3}>
                  <GooeyButton
                    onClick={handleProceedToInquiry}
                    variant="gold-solid"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    <span>SUBMIT SPECIFICATIONS FOR QUOTE</span>
                    <ArrowRight className="w-4 h-4" />
                  </GooeyButton>
                </MagneticElement>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: STICKY LIVE VISUAL PREVIEW MOCKUP (5 cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6 order-first lg:order-last">
          <div className="p-4 sm:p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm relative overflow-hidden">
            {/* Header Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                Live Composite Preview
              </span>
              <span className="text-[10px] font-mono text-neutral-500 font-medium">
                Direct Factory Mockup
              </span>
            </div>

            {/* Interactive Mockup Canvas with Live Tint & Logo Overlay */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 flex items-center justify-center group">
              {/* Product Background Image */}
              <Image
                src={primaryImage}
                alt={customState.productName}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />

              {/* Dynamic Color Hue / Blend Filter Layer */}
              <div
                className="absolute inset-0 mix-blend-color transition-colors duration-500 pointer-events-none opacity-40"
                style={{ backgroundColor: customState.primaryColor }}
              />

              {/* Subtle Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

              {/* Dynamic Logo Placement Overlay */}
              {customState.logoUrl ? (
                <div
                  className="absolute pointer-events-none transition-all duration-300"
                  style={{
                    top: `${customState.logoPositionY}%`,
                    left: `${customState.logoPositionX}%`,
                    transform: "translate(-50%, -50%)",
                    width: `${customState.logoScale * 1.5}px`,
                  }}
                >
                  <img
                    src={customState.logoUrl}
                    alt="Uploaded Brand Logo"
                    className="w-full h-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] filter contrast-125"
                  />
                </div>
              ) : (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/90 border border-neutral-300 text-[10px] font-mono text-neutral-700 shadow-sm backdrop-blur-md">
                  Your Logo Will Display Here
                </div>
              )}

              {/* Live Status Swatch Pill */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-neutral-200 shadow-sm backdrop-blur-md">
                <span
                  className="w-3 h-3 rounded-full border border-neutral-300 shadow-sm"
                  style={{ backgroundColor: customState.primaryColor }}
                />
                <span className="text-[10px] font-mono text-neutral-800 font-semibold">
                  {customState.finish}
                </span>
              </div>
            </div>

            {/* Live Specification Pill Tags Summary */}
            <div className="mt-5 pt-4 border-t border-neutral-200 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block font-medium">
                Active Specification Dossier
              </span>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-800">
                  Substrate: {customState.materials.split("(")[0]}
                </span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-medium">
                  Branding: {customState.brandingMethod.split("+")[0]}
                </span>
                {customState.sizing.length > 0 && (
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-800">
                    Sizes: {customState.sizing.join(", ")}
                  </span>
                )}
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-800">
                  Bulk Run: {customState.bulkQuantity}+ units
                </span>
              </div>
            </div>

            {/* Quick Direct Factory Notice */}
            <div className="mt-4 p-3 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center gap-2 text-[11px] text-neutral-600">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Full tech pack & NDA signed before formal sampling.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
