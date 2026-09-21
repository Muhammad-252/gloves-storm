"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Category, Product } from "@/types/database";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  Layers,
  Box,
  Clock,
  CheckCircle2,
  PhoneCall,
  Flame,
  ChevronRight,
} from "lucide-react";
import GooeyButton from "../ui/GooeyButton";

interface MegaMenuCategory extends Category {
  productCount?: number;
  featuredItems?: {
    id: string;
    name: string;
    slug: string;
    image: string | null;
    moq: number;
    samplePrice: number | null;
    leadTime: string | null;
  }[];
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
  const [menuCategories, setMenuCategories] = useState<MegaMenuCategory[]>(categories);
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>(
    categories[0]?.slug || "boxing-equipment"
  );

  // Dynamically fetch live counts & featured products from /api/categories
  useEffect(() => {
    let isMounted = true;
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data?.categories && data.categories.length > 0) {
          setMenuCategories(data.categories);
        }
      })
      .catch(() => {
        // Fallback to prop categories
      });
    return () => {
      isMounted = false;
    };
  }, []);

  if (!isOpen) return null;

  const activeCategory =
    menuCategories.find((c) => c.slug === activeCategorySlug) || menuCategories[0];

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave || onClose}
      className="absolute top-full left-0 right-0 z-50 bg-white/98 backdrop-blur-xl border-b border-neutral-200 shadow-[0_24px_50px_rgba(0,0,0,0.12)] animate-in fade-in slide-in-from-top-1 duration-150 before:absolute before:-top-5 before:left-0 before:right-0 before:h-5 before:content-['']"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8">
        {/* Top Header Row inside Mega Menu */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-700 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Sialkot OEM Production Library
            </span>
            <span className="text-xs text-neutral-500 hidden sm:inline">
              Explore {menuCategories.length} Specialized Manufacturing Divisions
            </span>
          </div>

          <Link
            href="/products"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 hover:text-amber-900 transition-colors"
          >
            <span>View All Products & Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3-Column Luxury Grid */}
        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          {/* Column 1 (4 cols): Division Selector Rail */}
          <div className="col-span-12 lg:col-span-4 pr-0 lg:pr-4 border-b lg:border-b-0 lg:border-r border-neutral-200 pb-6 lg:pb-0">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold block mb-3">
              Select Manufacturing Division
            </span>
            <div className="space-y-1 max-h-[380px] overflow-y-auto pr-2 scrollbar-thin">
              {menuCategories.map((cat) => {
                const isActive = cat.slug === activeCategorySlug;
                return (
                  <div
                    key={cat.id}
                    onMouseEnter={() => setActiveCategorySlug(cat.slug)}
                    className={`group/item flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                      isActive
                        ? "bg-amber-500/10 text-neutral-950 font-bold border-l-4 border-amber-500 pl-4"
                        : "hover:bg-neutral-50 text-neutral-700 hover:text-neutral-950"
                    }`}
                  >
                    <Link
                      href={`/products/${cat.slug}`}
                      onClick={onClose}
                      className="flex-1 flex items-center gap-2.5 text-xs font-bold uppercase tracking-tight"
                    >
                      <span className="truncate">{cat.name}</span>
                      {cat.menu_badge && (
                        <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-500 text-neutral-950">
                          {cat.menu_badge}
                        </span>
                      )}
                    </Link>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-neutral-400">
                        {cat.productCount ? `${cat.productCount} models` : "OEM"}
                      </span>
                      <ChevronRight
                        className={`w-3.5 h-3.5 transition-transform ${
                          isActive ? "text-amber-700 translate-x-0.5" : "text-neutral-300 opacity-0 group-hover/item:opacity-100"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2 (5 cols): Active Division Showcase & Top Models */}
          <div className="col-span-12 lg:col-span-5 flex flex-col justify-between">
            {activeCategory && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-700 font-bold block">
                      Division Showcase
                    </span>
                    <h3 className="text-xl font-black uppercase tracking-tight text-neutral-950">
                      {activeCategory.name}
                    </h3>
                  </div>
                  <Link
                    href={`/products/${activeCategory.slug}`}
                    onClick={onClose}
                    className="text-[11px] font-bold uppercase tracking-wider text-amber-700 hover:text-amber-800 transition-colors flex items-center gap-1 font-mono"
                  >
                    <span>Browse All</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>

                <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-5">
                  {activeCategory.description ||
                    "Precision engineered and handcrafted in our certified Sialkot OEM facility for international athletic brands and distributors."}
                </p>

                {/* Division Key Metrics */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-neutral-50 border border-neutral-200 mb-5">
                  <div className="flex items-center gap-2">
                    <Box className="w-4 h-4 text-amber-600 shrink-0" />
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-500 block">
                        Min. Order
                      </span>
                      <span className="text-xs font-bold text-neutral-900 font-mono">
                        50 Units
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-500 block">
                        Prototype
                      </span>
                      <span className="text-xs font-bold text-neutral-900 font-mono">
                        5-7 Days
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-600 shrink-0" />
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-500 block">
                        Bulk Run
                      </span>
                      <span className="text-xs font-bold text-neutral-900 font-mono">
                        2-3 Weeks
                      </span>
                    </div>
                  </div>
                </div>

                {/* Featured Products inside Category Preview */}
                {activeCategory.featuredItems && activeCategory.featuredItems.length > 0 && (
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold block mb-2">
                      Popular Factory Models
                    </span>
                    <div className="grid grid-cols-3 gap-3">
                      {activeCategory.featuredItems.map((item) => (
                        <Link
                          key={item.id}
                          href={`/products/${activeCategory.slug}/${item.slug}`}
                          onClick={onClose}
                          className="group/prod p-2 rounded-xl border border-neutral-200 hover:border-amber-500 bg-white hover:shadow-sm transition-all flex flex-col justify-between"
                        >
                          <div className="aspect-square bg-neutral-100 rounded-lg overflow-hidden mb-2 relative">
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={`${item.name} - Gloves Storm Manufacturing`}
                                fill
                                sizes="120px"
                                className="object-cover transition-transform duration-300 group-hover/prod:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-neutral-400">
                                <Box className="w-6 h-6" />
                              </div>
                            )}
                          </div>
                          <span className="text-[11px] font-bold text-neutral-900 group-hover/prod:text-amber-800 line-clamp-1 transition-colors">
                            {item.name}
                          </span>
                          <div className="flex items-center justify-between mt-1 text-[9px] font-mono text-neutral-500">
                            <span>MOQ {item.moq}</span>
                            {item.samplePrice && (
                              <span className="font-bold text-amber-700">
                                ${item.samplePrice}
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Column 3 (3 cols): Factory Direct Highlights & Quick Actions */}
          <div className="col-span-12 lg:col-span-3 flex flex-col justify-between pl-0 lg:pl-4 border-t lg:border-t-0 lg:border-l border-neutral-200 pt-6 lg:pt-0">
            {/* Direct OEM Card */}
            <div className="p-5 rounded-2xl bg-neutral-950 text-white relative overflow-hidden shadow-md">
              <div className="relative z-10">
                <div className="flex items-center gap-1.5 text-amber-400 text-[10px] font-mono uppercase tracking-wider font-bold mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Sialkot Verified OEM</span>
                </div>
                <h4 className="text-sm font-black uppercase tracking-tight text-white mb-2 leading-snug">
                  Bespoke Factory Sampling Program
                </h4>
                <p className="text-[11px] text-neutral-400 leading-relaxed mb-4">
                  Send your tech pack or artwork. We produce physical prototype samples with your custom branding within 5-7 business days.
                </p>

                <GooeyButton
                  href="/contact"
                  variant="gold-solid"
                  size="sm"
                  className="w-full text-center"
                  onClick={onClose}
                >
                  <span>Request Custom Sample</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </GooeyButton>
              </div>
            </div>

            {/* Direct WhatsApp Factory Line */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 mt-4">
              <div className="flex items-center gap-2 mb-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-amber-700" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-900 font-bold">
                  Direct Factory Desk
                </span>
              </div>
              <p className="text-[11px] text-neutral-600 leading-relaxed mb-3">
                Chat directly with our production engineers for instant quotes and tech pack reviews.
              </p>
              <a
                href="https://wa.me/923417146935?text=Hello%20GLOVES%20STORM,%20I%20would%20like%20to%20inquire%20about%20custom%20manufacturing%20and%20pricing%20deals."
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-1.5 w-full bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300 rounded-full py-1.5 text-xs font-bold transition-all shadow-2xs cursor-pointer"
              >
                <span>WhatsApp: +92 341 7146935</span>
                <ArrowUpRight className="w-3 h-3 text-amber-700" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
