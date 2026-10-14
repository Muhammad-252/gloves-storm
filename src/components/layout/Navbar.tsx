"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X, Shield, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import GooeyButton from "../ui/GooeyButton";
import MegaMenu from "./MegaMenu";
import { Category } from "@/types/database";
import InteractiveRfqModal from "../ui/InteractiveRfqModal";

const navLinks = [
  { name: "Products", href: "/products", hasMegaMenu: true },
  {
    name: "Export Markets",
    href: "/manufacturers-usa",
    hasDropdown: true,
  },
  { name: "Previous Work", href: "/previous-work" },
  { name: "About", href: "/about" },
  { name: "Journal", href: "/journal" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [marketsDropdownOpen, setMarketsDropdownOpen] = useState(false);
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [mobileCategoriesExpanded, setMobileCategoriesExpanded] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const pathname = usePathname();
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const marketsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch categories for mega menu & sync with live updates
  useEffect(() => {
    const HIDDEN_CATEGORY_SLUGS = ["boxing-equipment", "swimwear-beachwear"];
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("gs_dynamic_categories");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCategories(
              parsed.filter((c: any) => !HIDDEN_CATEGORY_SLUGS.includes(c.slug))
            );
          }
        }
      } catch (e) {}

      const handleUpdate = (e: Event) => {
        const customEvent = e as CustomEvent<Category[]>;
        if (customEvent.detail && Array.isArray(customEvent.detail)) {
          setCategories(customEvent.detail);
        }
      };
      window.addEventListener("gs_categories_updated", handleUpdate);

      let channel: BroadcastChannel | null = null;
      if ("BroadcastChannel" in window) {
        channel = new BroadcastChannel("gs_categories_channel");
        channel.onmessage = (msg) => {
          if (msg.data?.type === "CATEGORIES_UPDATED" && Array.isArray(msg.data.categories)) {
            setCategories(msg.data.categories);
          }
        };
      }

      fetch("/api/categories")
        .then((res) => res.json())
        .then((data) => {
          if (data?.categories && data.categories.length > 0) {
            setCategories(data.categories);
            try {
              localStorage.setItem("gs_dynamic_categories", JSON.stringify(data.categories));
            } catch (e) {}
          }
        })
        .catch(() => {});

      return () => {
        window.removeEventListener("gs_categories_updated", handleUpdate);
        if (channel) channel.close();
      };
    }
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
    setMarketsDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleMouseEnterProducts = () => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
      megaMenuTimeoutRef.current = null;
    }
    setMegaMenuOpen(true);
  };

  const handleMouseLeaveProducts = () => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
    }
    megaMenuTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
      megaMenuTimeoutRef.current = null;
    }, 350);
  };

  const handleMouseEnterMarkets = () => {
    if (marketsTimeoutRef.current) {
      clearTimeout(marketsTimeoutRef.current);
      marketsTimeoutRef.current = null;
    }
    setMarketsDropdownOpen(true);
  };

  const handleMouseLeaveMarkets = () => {
    if (marketsTimeoutRef.current) {
      clearTimeout(marketsTimeoutRef.current);
    }
    marketsTimeoutRef.current = setTimeout(() => {
      setMarketsDropdownOpen(false);
      marketsTimeoutRef.current = null;
    }, 200);
  };

  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return null;
  }

  return (
    <>
      <header className="fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 z-50 max-w-7xl px-3 sm:px-6 lg:px-8 w-full transition-all duration-300">
        <div
          className={cn(
            "w-full rounded-2xl sm:rounded-full bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-3.5 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2 transition-all duration-300",
            scrolled && "bg-white/95 shadow-md border-slate-300/80"
          )}
        >
          {/* Brand Logo with Company Mark */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 group shrink-0 min-w-0"
            onClick={() => {
              setMobileMenuOpen(false);
              setMegaMenuOpen(false);
              setMarketsDropdownOpen(false);
            }}
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden bg-black shrink-0 border border-black/10 shadow-xs flex items-center justify-center group-hover:scale-105 transition-transform">
              <Image
                src="/images/logo.png"
                alt="Gloves Storm"
                width={36}
                height={36}
                className="object-cover scale-[1.05]"
                priority
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-black tracking-[-0.03em] text-sm min-[380px]:text-base sm:text-lg uppercase text-slate-900 leading-none truncate">
                GLOVES STORM
              </span>
              <span className="text-[8px] min-[380px]:text-[9px] uppercase tracking-[0.1em] sm:tracking-[0.2em] font-mono text-slate-500 font-semibold mt-1 leading-none truncate">
                International OEM & Exporter
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links — Strictly Single Row */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0 flex-nowrap whitespace-nowrap">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              if (link.hasMegaMenu) {
                return (
                  <div
                    key={link.name}
                    onMouseEnter={handleMouseEnterProducts}
                    onMouseLeave={handleMouseLeaveProducts}
                    className="relative py-1"
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "text-xs xl:text-[13px] uppercase tracking-[0.1em] font-bold transition-all px-3 xl:px-3.5 py-2 rounded-full whitespace-nowrap flex items-center gap-1.5 cursor-pointer",
                        isActive || megaMenuOpen
                          ? "text-slate-950 bg-slate-100"
                          : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                      )}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={cn(
                          "w-3 h-3 transition-transform duration-200",
                          megaMenuOpen ? "rotate-180 text-slate-900" : "text-slate-400"
                        )}
                      />
                    </Link>
                  </div>
                );
              }

              if (link.hasDropdown) {
                const isMarketActive =
                  pathname.startsWith("/manufacturers-usa") ||
                  pathname.startsWith("/manufacturers-uk");

                return (
                  <div
                    key={link.name}
                    onMouseEnter={handleMouseEnterMarkets}
                    onMouseLeave={handleMouseLeaveMarkets}
                    className="relative py-1"
                  >
                    <button
                      type="button"
                      onClick={() => setMarketsDropdownOpen(!marketsDropdownOpen)}
                      className={cn(
                        "text-xs xl:text-[13px] uppercase tracking-[0.1em] font-bold transition-all px-3 xl:px-3.5 py-2 rounded-full whitespace-nowrap flex items-center gap-1.5 cursor-pointer",
                        isMarketActive || marketsDropdownOpen
                          ? "text-slate-950 bg-slate-100"
                          : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                      )}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={cn(
                          "w-3 h-3 transition-transform duration-200",
                          marketsDropdownOpen ? "rotate-180 text-slate-900" : "text-slate-400"
                        )}
                      />
                    </button>

                    {marketsDropdownOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 w-72 animate-in fade-in slide-in-from-top-1 duration-150">
                        <div className="rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-2xl p-2.5 space-y-1">
                          <Link
                            href="/manufacturers-usa"
                            onClick={() => setMarketsDropdownOpen(false)}
                            className={cn(
                              "p-3 rounded-xl flex items-start gap-3 hover:bg-slate-50 transition-colors group/item",
                              pathname.startsWith("/manufacturers-usa") && "bg-slate-50"
                            )}
                          >
                            <span className="text-2xl shrink-0 mt-0.5">🇺🇸</span>
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-slate-900 group-hover/item:text-[#FFB900] transition-colors uppercase tracking-tight">
                                USA Manufacturing
                              </span>
                              <span className="text-[10px] text-slate-500 font-mono mt-0.5">
                                DDP air freight · Low MOQ · US Customs
                              </span>
                            </div>
                          </Link>

                          <Link
                            href="/manufacturers-uk"
                            onClick={() => setMarketsDropdownOpen(false)}
                            className={cn(
                              "p-3 rounded-xl flex items-start gap-3 hover:bg-slate-50 transition-colors group/item",
                              pathname.startsWith("/manufacturers-uk") && "bg-slate-50"
                            )}
                          >
                            <span className="text-2xl shrink-0 mt-0.5">🇬🇧</span>
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-slate-900 group-hover/item:text-[#FFB900] transition-colors uppercase tracking-tight">
                                UK Manufacturing
                              </span>
                              <span className="text-[10px] text-slate-500 font-mono mt-0.5">
                                CE/UKCA · DDP delivery · GBP (£) billing
                              </span>
                            </div>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-xs xl:text-[13px] uppercase tracking-[0.1em] font-bold transition-all px-3 xl:px-3.5 py-2 rounded-full whitespace-nowrap shrink-0",
                    isActive
                      ? "text-slate-950 bg-slate-100"
                      : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Primary Action CTA */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setRfqModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 xl:px-5 py-2.5 rounded-full bg-[#FFB900] hover:bg-[#E5A700] text-black font-extrabold text-xs uppercase tracking-wider shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap"
            >
              <span>Request OEM Quote</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-black" />
            </button>
          </div>

          {/* Mobile / Tablet Controls (< 1024px) */}
          <div className="flex lg:hidden items-center shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-900 transition-colors shrink-0 flex items-center justify-center cursor-pointer"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Mega Menu Dropdown Component */}
        <MegaMenu
          isOpen={megaMenuOpen}
          onClose={() => setMegaMenuOpen(false)}
          onMouseEnter={handleMouseEnterProducts}
          onMouseLeave={handleMouseLeaveProducts}
          categories={categories}
        />
      </header>

      {/* Interactive RFQ Modal */}
      <InteractiveRfqModal
        isOpen={rfqModalOpen}
        onClose={() => setRfqModalOpen(false)}
        initialProduct="Custom Apparel Inquiry"
        initialCategory="Custom Clothing & Sportswear"
      />

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col justify-between pt-4 sm:pt-5 pb-6 sm:pb-8 px-4 sm:px-6 lg:hidden animate-in fade-in duration-200 overflow-y-auto shadow-2xl">
          <div className="flex flex-col gap-3">
            {/* Mobile Header with Logo */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative w-8 h-8 rounded-xl overflow-hidden bg-black shrink-0 border border-black/10 flex items-center justify-center">
                  <Image
                    src="/images/logo.png"
                    alt="Gloves Storm"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-extrabold text-sm uppercase text-slate-900 leading-tight truncate">
                    GLOVES STORM
                  </span>
                  <span className="text-[9px] uppercase tracking-wider font-mono text-slate-500 truncate">
                    International OEM & Exporter
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors shrink-0 cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Products Accordion for Mobile */}
            <div className="border-b border-neutral-100 py-2">
              <button
                type="button"
                onClick={() => setMobileCategoriesExpanded(!mobileCategoriesExpanded)}
                className="w-full text-lg font-bold uppercase tracking-tight transition-colors flex items-center justify-between py-2 text-neutral-900"
              >
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFB900]" />
                  Products ({categories.length} Divisions)
                </span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-neutral-500 transition-transform duration-200",
                    mobileCategoriesExpanded ? "rotate-180 text-black" : ""
                  )}
                />
              </button>

              {mobileCategoriesExpanded && (
                <div className="pl-2 pr-1 py-2 space-y-1 animate-in slide-in-from-top-2 duration-150">
                  <Link
                    href="/products"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs font-bold uppercase tracking-wider text-black py-2 px-3 rounded-lg hover:bg-neutral-100 border-b border-neutral-100 min-h-[40px] flex items-center"
                  >
                    → Browse All Products Catalog
                  </Link>
                  <div className="grid grid-cols-1 gap-1 max-h-56 overflow-y-auto pt-1">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/products/${cat.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-xs font-medium text-neutral-700 hover:text-black py-2 px-3 rounded-lg hover:bg-neutral-50 flex items-center justify-between min-h-[38px] transition-colors"
                      >
                        <span>{cat.name}</span>
                        {cat.menu_badge && (
                          <span className="text-[9px] font-mono bg-black text-[#FFB900] px-2 py-0.5 rounded font-bold">
                            {cat.menu_badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Export Markets Section for Mobile */}
            <div className="border-b border-neutral-100 py-3">
              <div className="text-[10px] tracking-[0.25em] text-neutral-400 uppercase font-mono mb-2 font-semibold">
                Export Markets
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/manufacturers-usa"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "p-3 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col gap-1 hover:border-black transition-colors",
                    pathname.startsWith("/manufacturers-usa") && "border-black bg-neutral-100"
                  )}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs text-neutral-900 uppercase">
                    <span>🇺🇸</span>
                    <span>USA Brands</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-mono">DDP Air · Low MOQ</span>
                </Link>
                <Link
                  href="/manufacturers-uk"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "p-3 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col gap-1 hover:border-black transition-colors",
                    pathname.startsWith("/manufacturers-uk") && "border-black bg-neutral-100"
                  )}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs text-neutral-900 uppercase">
                    <span>🇬🇧</span>
                    <span>UK Brands</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-mono">CE/UKCA · GBP (£)</span>
                </Link>
              </div>
            </div>

            {/* General Navigation Links */}
            {navLinks
              .filter((l) => !l.hasMegaMenu && !l.hasDropdown)
              .map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "text-lg font-bold uppercase tracking-tight transition-colors flex items-center justify-between py-2.5 border-b border-neutral-100",
                      isActive ? "text-black" : "text-neutral-700 hover:text-black"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#FFB900]" />}
                      {link.name}
                    </span>
                    <ArrowUpRight
                      className={cn(
                        "w-4 h-4",
                        isActive ? "text-[#FFB900]" : "opacity-40 text-neutral-400"
                      )}
                    />
                  </Link>
                );
              })}
          </div>

          {/* Drawer Bottom CTA */}
          <div className="flex flex-col gap-2.5 border-t border-neutral-200 pt-5 mt-4">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setRfqModalOpen(true);
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#FFB900] hover:bg-[#E5A700] text-black font-extrabold text-xs uppercase tracking-wider shadow-sm transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Request OEM Quote</span>
              <ArrowUpRight className="w-4 h-4 text-black" />
            </button>
            <GooeyButton
              href="/contact"
              variant="dark"
              size="md"
              className="w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </GooeyButton>
            <div className="flex items-center justify-between text-xs text-neutral-500 pt-1 font-mono">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#FFB900]" /> Sialkot Verified OEM
              </span>
              <span>Direct Export</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
