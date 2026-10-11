"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types/database";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Star,
  Shirt,
  Dumbbell,
  Tag,
  Factory,
  Package,
  Box,
  Clock,
  ChevronRight,
  CheckCircle2,
  PhoneCall,
} from "lucide-react";

interface MegaMenuProductItem {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  categoryName?: string;
  image: string | null;
  moq?: number;
}

interface MegaMenuCategory extends Category {
  productCount?: number;
  featuredItems?: MegaMenuProductItem[];
}

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  categories: Category[];
}

export default function MegaMenu({
  isOpen,
  onClose,
  onMouseEnter,
  onMouseLeave,
  categories,
}: MegaMenuProps) {
  // Map provided categories from database props
  const mappedCategories = useMemo(() => {
    return categories.map((cat) => ({
      ...cat,
      productCount: (cat as MegaMenuCategory).productCount ?? 0,
      featuredItems: (cat as MegaMenuCategory).featuredItems || [],
    }));
  }, [categories]);

  const [menuCategories, setMenuCategories] = useState<MegaMenuCategory[]>(mappedCategories);
  const [activeTab, setActiveTab] = useState<string>("for-you");
  const [apiFeaturedSelections, setApiFeaturedSelections] = useState<MegaMenuProductItem[]>([]);

  // Dynamically fetch live counts & all products from /api/categories & sync with live updates
  useEffect(() => {
    let isMounted = true;

    const refetchCategories = () => {
      fetch("/api/categories")
        .then((res) => res.json())
        .then((data) => {
          if (!isMounted) return;
          if (data?.categories && data.categories.length > 0) {
            setMenuCategories(data.categories);
          }
          if (data?.featuredSelections && data.featuredSelections.length > 0) {
            setApiFeaturedSelections(data.featuredSelections);
          }
        })
        .catch(() => {});
    };

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<MegaMenuCategory[]>;
      if (customEvent.detail && Array.isArray(customEvent.detail)) {
        setMenuCategories((prev) => {
          return customEvent.detail.map((newCat) => {
            const existing = prev.find((c) => c.id === newCat.id);
            return {
              ...existing,
              ...newCat,
              featuredItems: existing?.featuredItems || newCat.featuredItems,
              productCount: existing?.productCount ?? newCat.productCount,
            };
          });
        });
      }
      refetchCategories();
    };
    window.addEventListener("gs_categories_updated", handleUpdate);

    let channel: BroadcastChannel | null = null;
    if ("BroadcastChannel" in window) {
      channel = new BroadcastChannel("gs_categories_channel");
      channel.onmessage = (msg) => {
        if (msg.data?.type === "CATEGORIES_UPDATED") {
          refetchCategories();
        }
      };
    }

    refetchCategories();

    return () => {
      isMounted = false;
      window.removeEventListener("gs_categories_updated", handleUpdate);
      if (channel) channel.close();
    };
  }, []);

  // Top curated items for the "Categories for you" view
  const forYouItems = useMemo<MegaMenuProductItem[]>(() => {
    if (apiFeaturedSelections.length > 0) {
      return apiFeaturedSelections.slice(0, 7);
    }
    return [];
  }, [apiFeaturedSelections]);

  // Secondary row of items for "Categories for you" (e.g., Apparel & Streetwear)
  const secondaryForYouItems = useMemo<MegaMenuProductItem[]>(() => {
    if (apiFeaturedSelections.length > 7) {
      return apiFeaturedSelections.slice(7, 14);
    }
    return [];
  }, [apiFeaturedSelections]);

  if (!isOpen) return null;

  const activeCategory = menuCategories.find((c) => c.slug === activeTab);

  // Category Icon Resolver
  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case "for-you":
        return Star;
      case "sportswear-teamwear":
        return Shirt;
      case "gym-fitness-wear":
        return Dumbbell;
      case "clothing-streetwear":
        return Tag;
      case "custom-manufacturing-private-label":
        return Factory;
      default:
        return Package;
    }
  };

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave || onClose}
      className="absolute top-full left-0 right-0 z-50 mt-3 bg-white/95 backdrop-blur-2xl rounded-3xl border border-white/90 shadow-[0_25px_60px_rgba(15,23,42,0.12)] animate-in fade-in slide-in-from-top-1 duration-150 overflow-hidden before:absolute before:-top-4 before:left-0 before:right-0 before:h-4 before:content-['']"
    >
      <div className="px-5 sm:px-7">
        {/* =====================================================================
            TOP SUB-NAV / ALIBABA-STYLE TAB BAR
        ===================================================================== */}
        <div className="flex items-center justify-between pt-3 pb-2.5 border-b border-neutral-200 text-xs">
          {/* Left Tabs */}
          <div className="flex items-center gap-6 sm:gap-8 font-medium">
            <button
              type="button"
              onClick={() => setActiveTab("for-you")}
              className={`pb-2 -mb-[11px] font-bold text-xs sm:text-sm tracking-tight flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === "for-you"
                  ? "text-neutral-950 border-b-2 border-neutral-950"
                  : "text-neutral-600 hover:text-neutral-950 border-b-2 border-transparent"
              }`}
            >
              <span>All categories</span>
            </button>

            <Link
              href="/about"
              onClick={onClose}
              className="text-neutral-600 hover:text-neutral-950 font-medium transition-colors flex items-center gap-1.5"
            >
              <span>Production standards</span>
              <span className="hidden sm:inline-block px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-amber-500/20 text-amber-800">
                AQL 2.5
              </span>
            </Link>

            <Link
              href="/previous-work"
              onClick={onClose}
              className="hidden md:inline-flex text-neutral-600 hover:text-neutral-950 font-medium transition-colors items-center gap-1"
            >
              <span>OEM Custom Drops</span>
            </Link>
          </div>

          {/* Right Direct Links */}
          <div className="hidden lg:flex items-center gap-6 text-neutral-500 font-medium text-xs">
            <Link href="/about" onClick={onClose} className="hover:text-neutral-900 transition-colors">
              About GLOVES STORM
            </Link>
            <Link href="/about" onClick={onClose} className="hover:text-neutral-900 transition-colors">
              Factory Standards
            </Link>
            <Link
              href="/contact"
              onClick={onClose}
              className="text-amber-700 hover:text-amber-800 font-bold transition-colors flex items-center gap-1"
            >
              <span>Direct Factory Inquiry</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* =====================================================================
            SPLIT-VIEW MAIN CONTENT: LEFT SIDEBAR + RIGHT CIRCLE GRID
        ===================================================================== */}
        <div className="flex flex-col lg:flex-row min-h-[440px] max-h-[520px]">
          {/* -----------------------------------------------------------------
              LEFT SIDEBAR: CATEGORY NAVIGATION RAIL WITH ICONS
          ----------------------------------------------------------------- */}
          <aside className="w-full lg:w-[250px] shrink-0 border-r border-neutral-200/90 py-3 pr-2 overflow-y-auto max-h-[480px] scrollbar-thin">
            <div className="space-y-0.5">
              {/* Special "Categories for you" item */}
              <button
                type="button"
                onMouseEnter={() => setActiveTab("for-you")}
                onClick={() => setActiveTab("for-you")}
                className={`w-full text-left flex items-center justify-between py-2.5 px-3 rounded-lg text-xs transition-all cursor-pointer ${
                  activeTab === "for-you"
                    ? "bg-neutral-100 text-neutral-950 font-bold border-l-[3px] border-neutral-950 pl-2.5"
                    : "text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 font-medium border-l-[3px] border-transparent"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Star
                    className={`w-4 h-4 shrink-0 ${
                      activeTab === "for-you" ? "text-amber-500 fill-amber-500" : "text-neutral-400"
                    }`}
                  />
                  <span>Categories for you</span>
                </div>
                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform ${
                    activeTab === "for-you" ? "text-neutral-900 translate-x-0.5 opacity-100" : "opacity-0"
                  }`}
                />
              </button>

              {/* Database Categories */}
              {menuCategories.map((cat) => {
                const IconComponent = getCategoryIcon(cat.slug);
                const isActive = activeTab === cat.slug;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onMouseEnter={() => setActiveTab(cat.slug)}
                    onClick={() => setActiveTab(cat.slug)}
                    className={`w-full text-left flex items-center justify-between py-2.5 px-3 rounded-lg text-xs transition-all cursor-pointer ${
                      isActive
                        ? "bg-neutral-100 text-neutral-950 font-bold border-l-[3px] border-neutral-950 pl-2.5"
                        : "text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 font-medium border-l-[3px] border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate pr-1">
                      <IconComponent
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? "text-amber-600" : "text-neutral-400"
                        }`}
                      />
                      <span className="truncate">{cat.name}</span>
                    </div>

                    <ChevronRight
                      className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                        isActive ? "text-neutral-900 translate-x-0.5 opacity-100" : "opacity-0"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </aside>

          {/* -----------------------------------------------------------------
              RIGHT CONTENT PANEL: ALIBABA-STYLE CIRCLE PRODUCTS GRID
          ----------------------------------------------------------------- */}
          <main className="flex-1 bg-white p-5 sm:p-6 lg:p-7 overflow-y-auto max-h-[480px] scrollbar-thin">
            {activeTab === "for-you" ? (
              /* VIEW A: "Categories for you" (Cross-Category Curated Showcase) */
              <div className="space-y-7">
                {/* Section 1: Categories for you */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm sm:text-base font-extrabold text-neutral-950 tracking-tight flex items-center gap-2">
                      <span>Categories for you</span>
                      <span className="text-[10px] font-mono font-normal text-neutral-400">
                        Top OEM Requests
                      </span>
                    </h3>

                    <Link
                      href="/products"
                      onClick={onClose}
                      className="text-xs font-semibold text-neutral-700 hover:text-neutral-950 hover:underline transition-all flex items-center gap-1"
                    >
                      <span>Browse all categories</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-y-5 gap-x-3">
                    {forYouItems.map((item) => (
                      <Link
                        key={item.id}
                        href={`/products/${item.categorySlug}/${item.slug}`}
                        onClick={onClose}
                        className="group flex flex-col items-center text-center cursor-pointer"
                      >
                        {/* 100% Circular Image Wrapper that fits back circle */}
                        <div className="relative w-20 h-20 sm:w-22 sm:h-22">
                          <div className="w-full h-full rounded-full bg-neutral-100 border border-neutral-200/80 overflow-hidden relative flex items-center justify-center transition-all duration-300 group-hover:bg-neutral-200/70 group-hover:scale-105 group-hover:shadow-sm">
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={`${item.name} - Gloves Storm Custom Apparel`}
                                fill
                                sizes="96px"
                                className="rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                            ) : (
                              <Box className="w-6 h-6 text-neutral-400" />
                            )}
                          </div>

                          {/* Signature Alibaba-style Blue Indicator Badge */}
                          <span className="absolute -top-0.5 -right-0.5 z-10 w-4 h-4 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-xs transition-transform duration-200 group-hover:scale-110 pointer-events-none">
                            <ArrowUpRight className="w-2.5 h-2.5" />
                          </span>
                        </div>

                        {/* Centered Label Underneath */}
                        <span className="mt-2 text-xs font-medium text-neutral-800 group-hover:text-amber-800 transition-colors line-clamp-2 max-w-[90px] leading-tight">
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Section 2: Streetwear & Lifestyle Apparel */}
                <div className="pt-2 border-t border-neutral-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm sm:text-base font-extrabold text-neutral-950 tracking-tight">
                      Streetwear &amp; Custom Apparel
                    </h3>

                    <Link
                      href="/products/clothing-streetwear"
                      onClick={onClose}
                      className="text-xs font-semibold text-neutral-700 hover:text-neutral-950 hover:underline transition-all"
                    >
                      Browse featured selections
                    </Link>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-y-5 gap-x-3">
                    {secondaryForYouItems.map((item) => (
                      <Link
                        key={item.id}
                        href={`/products/${item.categorySlug}/${item.slug}`}
                        onClick={onClose}
                        className="group flex flex-col items-center text-center cursor-pointer"
                      >
                        {/* 100% Circular Image Wrapper that fits back circle */}
                        <div className="relative w-20 h-20 sm:w-22 sm:h-22">
                          <div className="w-full h-full rounded-full bg-neutral-100 border border-neutral-200/80 overflow-hidden relative flex items-center justify-center transition-all duration-300 group-hover:bg-neutral-200/70 group-hover:scale-105 group-hover:shadow-sm">
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={`${item.name} - Gloves Storm Sialkot`}
                                fill
                                sizes="96px"
                                className="rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                            ) : (
                              <Box className="w-6 h-6 text-neutral-400" />
                            )}
                          </div>

                          <span className="absolute -top-0.5 -right-0.5 z-10 w-4 h-4 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-xs transition-transform duration-200 group-hover:scale-110 pointer-events-none">
                            <ArrowUpRight className="w-2.5 h-2.5" />
                          </span>
                        </div>

                        <span className="mt-2 text-xs font-medium text-neutral-800 group-hover:text-amber-800 transition-colors line-clamp-2 max-w-[90px] leading-tight">
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* VIEW B: Specific Category Selected */
              activeCategory && (
                <div className="space-y-6">
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base sm:text-lg font-extrabold text-neutral-950 uppercase tracking-tight">
                          {activeCategory.name}
                        </h3>
                        {activeCategory.menu_badge && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-500/20 text-amber-900 border border-amber-500/30">
                            {activeCategory.menu_badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-500 line-clamp-1 max-w-xl mt-0.5">
                        {activeCategory.description}
                      </p>
                    </div>

                    <Link
                      href={`/products/${activeCategory.slug}`}
                      onClick={onClose}
                      className="text-xs font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1.5 transition-colors font-mono"
                    >
                      <span>VIEW ALL ({activeCategory.productCount || activeCategory.featuredItems?.length || 0})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* Circular Products Grid for Selected Category */}
                  {activeCategory.featuredItems && activeCategory.featuredItems.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-y-5 gap-x-3">
                      {activeCategory.featuredItems.map((item) => (
                        <Link
                          key={item.id}
                          href={`/products/${activeCategory.slug}/${item.slug}`}
                          onClick={onClose}
                          className="group flex flex-col items-center text-center cursor-pointer"
                        >
                          {/* 100% Circular Image Wrapper that fits back circle */}
                          <div className="relative w-20 h-20 sm:w-22 sm:h-22">
                            <div className="w-full h-full rounded-full bg-neutral-100 border border-neutral-200/80 overflow-hidden relative flex items-center justify-center transition-all duration-300 group-hover:bg-neutral-200/70 group-hover:scale-105 group-hover:shadow-sm">
                              {item.image ? (
                                <Image
                                  src={item.image}
                                  alt={`${item.name} - Sialkot OEM`}
                                  fill
                                  sizes="96px"
                                  className="rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                              ) : (
                                <Box className="w-6 h-6 text-neutral-400" />
                              )}
                            </div>

                            <span className="absolute -top-0.5 -right-0.5 z-10 w-4 h-4 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-xs transition-transform duration-200 group-hover:scale-110 pointer-events-none">
                              <ArrowUpRight className="w-2.5 h-2.5" />
                            </span>
                          </div>

                          <span className="mt-2 text-xs font-medium text-neutral-800 group-hover:text-amber-800 transition-colors line-clamp-2 max-w-[90px] leading-tight">
                            {item.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center text-neutral-500 text-xs">
                      <p>Browse full catalog and technical specifications for {activeCategory.name}.</p>
                      <Link
                        href={`/products/${activeCategory.slug}`}
                        onClick={onClose}
                        className="inline-flex items-center gap-1 mt-3 px-4 py-2 rounded-xl bg-neutral-900 text-white font-bold text-xs"
                      >
                        <span>Open Category Catalog</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}

                  {/* Division OEM Standards Strip */}
                  <div className="mt-5 p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-700">
                      <div className="flex items-center gap-2 font-mono">
                        <Box className="w-4 h-4 text-amber-600" />
                        <span>MOQ: <strong>50 Units/Style</strong></span>
                      </div>
                      <div className="flex items-center gap-2 font-mono">
                        <Clock className="w-4 h-4 text-amber-600" />
                        <span>Sampling: <strong>5-7 Days</strong></span>
                      </div>
                      <div className="flex items-center gap-2 font-mono">
                        <CheckCircle2 className="w-4 h-4 text-amber-600" />
                        <span>Quality: <strong>AQL 2.5 Standard</strong></span>
                      </div>
                    </div>

                    <Link
                      href={`/contact?category=${activeCategory.slug}`}
                      onClick={onClose}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-colors shadow-2xs font-mono"
                    >
                      <span>Inquire About {activeCategory.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )
            )}
          </main>
        </div>

        {/* =====================================================================
            BOTTOM FACTORY TRUST STRIP
        ===================================================================== */}
        <div className="py-2.5 border-t border-neutral-200/90 flex flex-wrap items-center justify-between text-[11px] text-neutral-500">
          <div className="flex items-center gap-4 sm:gap-6 font-mono">
            <span className="flex items-center gap-1.5 text-neutral-700 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Certified Apparel OEM &amp; Exporter
            </span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="hidden sm:inline">100% Export Quality Guarantee</span>
            <span className="hidden md:inline">&bull;</span>
            <span className="hidden md:inline">Custom Tech Pack Engineering</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/923417146935?text=Hello%20GLOVES%20STORM,%20I%20am%20browsing%20the%20mega%20menu%20and%20want%20to%20inquire%20about%20manufacturing."
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-bold font-mono transition-colors"
            >
              <PhoneCall className="w-3 h-3" />
              <span>WhatsApp Production Desk: +92 341 7146935</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
