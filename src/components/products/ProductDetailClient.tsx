"use client";

import { useState } from "react";
import Link from "next/link";
import { Product, Category } from "@/types/database";
import {
  Clock,
  Box,
  ShieldCheck,
  Check,
  ArrowUpRight,
  Sparkles,
  Layers,
  ChevronRight,
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
  const images = product.images && product.images.length > 0
    ? product.images
    : [
        {
          id: "default-img",
          product_id: product.id,
          image_url:
            "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop",
          alt_text: product.name,
          sort_order: 1,
          is_primary: true,
          created_at: "",
        },
      ];

  const [activeImage, setActiveImage] = useState(
    images.find((img) => img.is_primary)?.image_url || images[0].image_url
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState<"Quote" | "Sample">("Quote");

  // Parse materials, features, customization options if string or JSON
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

  return (
    <div>
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 mb-8 font-medium">
        <Link href="/" className="hover:text-[#0f172a] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <Link href="/products" className="hover:text-[#0f172a] transition-colors">
          Products
        </Link>
        {category && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <Link
              href={`/products/${category.slug}`}
              className="hover:text-[#0f172a] transition-colors"
            >
              {category.name}
            </Link>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <span className="text-amber-600 truncate max-w-xs font-semibold">{product.name}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        {/* Left: Gallery (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Main Display Image */}
          <div className="relative aspect-square sm:aspect-[4/3] w-full overflow-hidden rounded-3xl bg-neutral-100 border border-neutral-200 shadow-sm">
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-500 scale-100 hover:scale-105"
              style={{ backgroundImage: `url(${activeImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

            {product.featured && (
              <div className="absolute top-4 right-4 bg-amber-500 text-neutral-950 px-3.5 py-1 rounded-full font-extrabold text-[10px] uppercase tracking-wider shadow-sm">
                Featured OEM Specification
              </div>
            )}
          </div>

          {/* Thumbnail Selector Strip */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(img.image_url)}
                  className={`relative w-20 h-20 shrink-0 rounded-2xl bg-neutral-100 border transition-all overflow-hidden cursor-pointer ${
                    activeImage === img.image_url
                      ? "border-amber-600 ring-2 ring-amber-500/30"
                      : "border-neutral-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${img.image_url})` }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Technical Specs & Inquiries (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-600 block mb-2 font-bold">
              {category?.name || "Manufacturing Division"}
            </span>

            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#0f172a] mb-4 leading-tight">
              {product.name}
            </h1>

            <p className="text-sm text-neutral-600 leading-relaxed mb-6">
              {product.short_description}
            </p>

            {/* Quick Metrics (MOQ + Lead Time) */}
            <div className="grid grid-cols-2 gap-3 mb-8 p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm">
              <div className="flex items-center gap-3">
                <Box className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-medium">
                    Minimum Order
                  </span>
                  <span className="text-sm font-bold text-[#0f172a] uppercase">
                    {product.moq} Units
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-medium">
                    Production Lead Time
                  </span>
                  <span className="text-sm font-bold text-[#0f172a] uppercase">
                    {product.lead_time || "2-4 Weeks"}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons with Liquid Gooey Pill Animation */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mb-8">
              {/* Primary CTA: Customize This Product */}
              <GooeyButton
                href={`/customize?product=${product.id}`}
                variant="gold-solid"
                size="lg"
                className="w-full sm:flex-[1.4] shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-neutral-950" />
                <span>CUSTOMIZE THIS PRODUCT</span>
                <ArrowUpRight className="w-4 h-4" />
              </GooeyButton>

              {/* Secondary CTA: Request a Quote */}
              <GooeyButton
                onClick={() => {
                  setInquiryType("Quote");
                  setModalOpen(true);
                }}
                variant="outline"
                size="lg"
                className="w-full sm:flex-1"
              >
                <span>REQUEST A QUOTE</span>
              </GooeyButton>
            </div>

            {/* Direct Factory Guarantee */}
            <div className="flex items-center gap-2 text-xs text-neutral-500 pb-8 border-b border-neutral-200 font-medium">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Direct factory OEM pricing • Strict NDA privacy guaranteed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications Tabs / Deep Dive */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-14 border-t border-neutral-200 mb-20">
        {/* Column 1: Materials */}
        <div className="p-7 rounded-2xl bg-white border border-neutral-200 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#0f172a] mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Engineered Materials
          </h3>
          <ul className="space-y-2.5 text-xs text-neutral-600">
            {materialsList.map((mat, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>{mat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: Key Features */}
        <div className="p-7 rounded-2xl bg-white border border-neutral-200 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#0f172a] mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Construction & Features
          </h3>
          <ul className="space-y-2.5 text-xs text-neutral-600">
            {featuresList.map((feat, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Customization Options */}
        <div className="p-7 rounded-2xl bg-white border border-neutral-200 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#0f172a] mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Bespoke Customization Options
          </h3>
          <ul className="space-y-2.5 text-xs text-neutral-600">
            {customList.map((opt, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>{opt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Full Description / Technical Brief */}
      {product.description && (
        <div className="mb-20 p-8 sm:p-12 rounded-3xl bg-white border border-neutral-200 shadow-sm">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-600 block mb-2 font-bold">
            Engineering Blueprint
          </span>
          <h2 className="text-2xl font-bold uppercase tracking-tight text-[#0f172a] mb-4">
            Product Manufacturing Overview
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed max-w-4xl">
            {product.description}
          </p>
        </div>
      )}

      {/* MAKE IT YOURS — Interactive Bespoke Showcase Banner */}
      <div className="mb-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-amber-50/70 via-white to-neutral-50 border border-amber-200 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-700 block mb-2 font-bold">
            Direct Sialkot Customization Studio
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#0f172a] mb-3">
            MAKE IT YOURS.
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed mb-8">
            Tailor leather grades, ounce weights, custom foil debossing, 3D puff embroidery, and retail packaging. Launch the live configurator to test colorways and composite your logo mockup in real time.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <GooeyButton
              href={`/customize?product=${product.id}`}
              variant="gold-solid"
              size="lg"
            >
              <Sparkles className="w-4 h-4 text-neutral-950" />
              <span>LAUNCH PRODUCT CUSTOMIZER</span>
              <ArrowUpRight className="w-4 h-4" />
            </GooeyButton>

            <span className="text-xs text-neutral-500 font-mono font-medium">
              MOQ {product.moq} Units • Pre-production samples available
            </span>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-neutral-200 pt-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold uppercase tracking-tight text-[#0f172a]">
              Related Category Products
            </h3>
            <Link
              href={`/products/${category?.slug || "general"}`}
              className="text-xs uppercase tracking-wider text-amber-600 hover:text-amber-700 font-bold transition-colors"
            >
              View More in Category →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => {
              const relImg =
                rel.images?.[0]?.image_url ||
                "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop";
              return (
                <Link
                  key={rel.id}
                  href={`/products/${category?.slug || "general"}/${rel.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-neutral-200 hover:border-amber-500/50 shadow-sm hover:shadow-md hover:-translate-y-1.5 p-4 flex flex-col justify-between transition-all duration-400"
                >
                  <div className="aspect-square bg-neutral-100 rounded-xl overflow-hidden mb-4 border border-neutral-200">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${relImg})` }}
                    />
                  </div>
                  <h4 className="text-sm font-bold uppercase text-[#0f172a] group-hover:text-amber-600 transition-colors truncate mb-1">
                    {rel.name}
                  </h4>
                  <span className="text-[10px] font-mono text-neutral-500">
                    MOQ: {rel.moq} Units
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Quote / Sample Modal */}
      <QuoteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultProductName={`${inquiryType === "Sample" ? "[SAMPLE REQUEST] " : ""}${product.name}`}
        defaultCategory={category?.name || "General"}
      />
    </div>
  );
}
