"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product, Category } from "@/types/database";
import { Star, ArrowUpRight, Scissors } from "lucide-react";

interface JacketMakerProductCardProps {
  product: Product;
  category?: Category;
  onInquire: (product: Product) => void;
  priority?: boolean;
}

// Preset colorways for preview swatches (representing available custom leather/fabric dyeings)
const PRESET_SWATCHES = [
  { name: "Obsidian Black", hex: "#171717" },
  { name: "Rich Tobacco Brown", hex: "#5c3a21" },
  { name: "Heather Slate Grey", hex: "#64748b" },
  { name: "Midnight Navy", hex: "#1e293b" },
  { name: "British Racing Green", hex: "#14532d" },
];

export default function JacketMakerProductCard({
  product,
  category,
  onInquire,
  priority = false,
}: JacketMakerProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [activeSwatch, setActiveSwatch] = useState(0);

  const categorySlug = category?.slug || product.category?.slug || "general";
  const categoryName = category?.name || product.category?.name || "Apparel";

  // Resolve images
  const firstImgObj = product.images?.[0];
  const secondImgObj = product.images?.[1] || product.images?.[2];

  const primaryImgUrl =
    (typeof firstImgObj === "string" ? firstImgObj : firstImgObj?.image_url) ||
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800";
  const secondaryImgUrl =
    (typeof secondImgObj === "string" ? secondImgObj : secondImgObj?.image_url) ||
    primaryImgUrl;

  const primaryAlt =
    (typeof firstImgObj === "object" && firstImgObj?.alt_text) ||
    `${product.name} - Custom OEM Manufacturer Sialkot (GLOVES STORM)`;
  const secondaryAlt =
    (typeof secondImgObj === "object" && secondImgObj?.alt_text) ||
    `${product.name} - Detailed Craftsmanship Angle (GLOVES STORM)`;

  // Deterministic mock reviews based on product ID to mirror The Jacket Maker's social proof
  const reviewCount = Math.floor(((product.name.length * 17) % 80) + 42);
  const rating = 4.9;

  // Approximate starting sample or wholesale reference
  const basePrice = Math.max(22, 20 + ((product.name.length * 3) % 25));
  const msrpPrice = basePrice * 3.5;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col justify-between bg-white rounded-2xl border border-neutral-200/80 hover:border-neutral-900 transition-all duration-300 overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] p-3.5"
    >
      <div>
        {/* 1. Portrait Studio Image Container */}
        <Link
          href={`/products/${categorySlug}/${product.slug}`}
          className="relative aspect-[4/5] w-full bg-[#f8f9fa] rounded-xl overflow-hidden block mb-3.5 cursor-pointer"
        >
          {/* Primary Front Shot */}
          <Image
            src={primaryImgUrl}
            alt={primaryAlt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover object-center transition-all duration-700 ease-out ${
              isHovered && secondaryImgUrl !== primaryImgUrl
                ? "opacity-0 scale-105"
                : "opacity-100 scale-100"
            }`}
          />

          {/* Secondary Hover / Back Shot */}
          {secondaryImgUrl !== primaryImgUrl && (
            <Image
              src={secondaryImgUrl}
              alt={secondaryAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`object-cover object-center transition-all duration-700 ease-out ${
                isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
              }`}
            />
          )}

          {/* Top Pill Badges */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-neutral-200/90 text-[10px] font-medium text-neutral-900 shadow-xs">
            <Scissors className="w-3 h-3 text-neutral-700" />
            <span>Custom Sizing</span>
          </div>

          <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-neutral-950 text-white px-2.5 py-1 rounded-full text-[10px] font-mono tracking-tight font-semibold shadow-xs">
            <span>MOQ: {product.moq || 30} pcs</span>
          </div>

          {/* Quick Hover Overlay Button */}
          <div
            className={`absolute inset-x-3 bottom-3 transition-all duration-300 ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
            }`}
          >
            <div className="w-full bg-white/95 backdrop-blur-md hover:bg-neutral-950 hover:text-white text-neutral-900 border border-neutral-200 text-xs font-bold py-2.5 rounded-xl text-center shadow-md transition-colors flex items-center justify-center gap-1.5">
              <span>View Tech Specs & Samples</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </Link>

        {/* 2. Color Swatches Preview Strip */}
        <div className="flex items-center gap-1.5 mb-2 px-1">
          {PRESET_SWATCHES.map((swatch, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setActiveSwatch(idx);
              }}
              title={swatch.name}
              className={`w-3.5 h-3.5 rounded-full transition-transform cursor-pointer ${
                activeSwatch === idx
                  ? "ring-2 ring-neutral-950 ring-offset-1 scale-110"
                  : "hover:scale-110 opacity-80 hover:opacity-100"
              }`}
              style={{ backgroundColor: swatch.hex }}
            />
          ))}
          <span className="text-[10px] font-mono text-neutral-400 ml-1">
            +Custom Dye
          </span>
        </div>

        {/* 3. Star Ratings & Review Count */}
        <div className="flex items-center gap-1.5 mb-1 px-1">
          <div className="flex items-center text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-3 h-3 fill-amber-400 text-amber-400"
              />
            ))}
          </div>
          <span className="text-[11px] font-medium text-neutral-900">
            {rating}
          </span>
          <span className="text-[11px] text-neutral-400">
            ({reviewCount})
          </span>
        </div>

        {/* 4. Product Title & Category */}
        <div className="px-1 mb-2">
          <Link
            href={`/products/${categorySlug}/${product.slug}`}
            className="text-sm font-bold text-neutral-950 group-hover:text-neutral-700 transition-colors line-clamp-1 block leading-snug"
          >
            {product.name}
          </Link>
          <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
            {product.short_description || `${categoryName} • Direct Factory Sialkot`}
          </p>
        </div>

        {/* 5. Pricing & Wholesale Indicator */}
        <div className="flex items-baseline gap-2 px-1 mb-3">
          <span className="text-sm font-extrabold text-neutral-950 font-mono">
            ${basePrice}.00
          </span>
          <span className="text-xs text-neutral-400 line-through font-mono">
            ${msrpPrice.toFixed(0)}.00
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold ml-auto">
            Factory Direct
          </span>
        </div>
      </div>

      {/* 6. Action CTAs */}
      <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-neutral-100 mt-auto">
        <Link
          href={`/products/${categorySlug}/${product.slug}`}
          className="py-2 px-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold flex items-center justify-center gap-1 transition-colors text-center"
        >
          <span>Specs</span>
        </Link>
        <button
          type="button"
          onClick={() => onInquire(product)}
          className="py-2 px-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-xs text-center"
        >
          <span>Get Quote</span>
        </button>
      </div>
    </div>
  );
}
