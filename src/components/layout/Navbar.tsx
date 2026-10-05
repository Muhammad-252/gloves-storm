"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X, Shield, ChevronDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import GooeyButton from "../ui/GooeyButton";
import MegaMenu from "./MegaMenu";
import { initialCategories } from "@/lib/data/initialData";
import { Category } from "@/types/database";
import InteractiveRfqModal from "../ui/InteractiveRfqModal";

const navLinks = [
  { name: "Products", href: "/products", hasMegaMenu: true },
  { name: "Manufacturing", href: "/manufacturing" },
  {
    name: "Export Markets",
    href: "/manufacturers-usa",
    hasDropdown: true,
  },
  { name: "About", href: "/about" },
  { name: "Previous Work", href: "/previous-work" },
  { name: "Journal", href: "/journal" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [marketsDropdownOpen, setMarketsDropdownOpen] = useState(false);
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [mobileCategoriesExpanded, setMobileCategoriesExpanded] = useState(false);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const pathname = usePathname();
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const marketsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch categories for mega menu
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data?.categories && data.categories.length > 0) {
          setCategories(data.categories);
        }
      })
      .catch(() => {});
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
    }, 450); // Generous 450ms grace period to allow smooth cursor transition
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
    }, 250);
  };

  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return null; // Admin has its dedicated dashboard layout
  }

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-6xl px-4 w-full">
        <div
          className={cn(
            "rounded-full bg-white/75 backdrop-blur-lg border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-6 py-3.5 flex items-center justify-between transition-all duration-300",
            scrolled && "bg-white/85 shadow-md border-white/95"
          )}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group transition-opacity hover:opacity-90"
            onClick={() => {
              setMobileMenuOpen(false);
              setMegaMenuOpen(false);
            }}
          >
            <div className="flex flex-col">
              <span className="font-extrabold tracking-[-0.04em] text-lg sm:text-xl uppercase flex items-center gap-2 text-slate-900">
                GLOVES STORM
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              </span>
              <span className="text-[9px] uppercase tracking-[0.22em] -mt-0.5 font-mono text-slate-500 font-medium">
                Sialkot • Global OEM
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
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
                        "text-xs uppercase tracking-[0.16em] font-semibold transition-colors relative py-1 flex items-center gap-1.5 group cursor-pointer",
                        isActive || megaMenuOpen
                          ? "text-slate-950 font-bold"
                          : "text-slate-600 hover:text-slate-950"
                      )}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={cn(
                          "w-3 h-3 transition-transform duration-200",
                          megaMenuOpen ? "rotate-180 text-slate-900" : "text-slate-400"
                        )}
                      />
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                        {categories.length}
                      </span>
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
                        "text-xs uppercase tracking-[0.16em] font-semibold transition-colors relative py-1 flex items-center gap-1.5 group cursor-pointer",
                        isMarketActive || marketsDropdownOpen
                          ? "text-slate-950 font-bold"
                          : "text-slate-600 hover:text-slate-950"
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
                              <span className="text-xs font-bold text-slate-900 group-hover/item:text-amber-800 transition-colors uppercase tracking-tight">
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
                              <span className="text-xs font-bold text-slate-900 group-hover/item:text-amber-800 transition-colors uppercase tracking-tight">
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
                    "text-xs uppercase tracking-[0.16em] font-semibold transition-colors relative py-1",
                    isActive
                      ? "text-slate-950 font-bold"
                      : "text-slate-600 hover:text-slate-950"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-900 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Primary Action CTA: High-Contrast Request OEM Quote */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => setRfqModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Request OEM Quote</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/80" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-900 hover:text-slate-700 transition-colors"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
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
        initialProduct="Custom OEM Inquiry"
        initialCategory="Combat & Sportswear Manufacturing"
      />

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col justify-between pt-24 pb-8 px-6 md:hidden animate-in fade-in duration-200 overflow-y-auto shadow-2xl">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] tracking-[0.25em] text-neutral-400 uppercase font-mono mb-2">
              Manufacturing Navigation
            </span>

            {/* Products Accordion for Mobile */}
            <div className="border-b border-neutral-100 py-2">
              <button
                type="button"
                onClick={() => setMobileCategoriesExpanded(!mobileCategoriesExpanded)}
                className="w-full text-xl font-bold uppercase tracking-tight transition-colors flex items-center justify-between py-2 text-neutral-900"
              >
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b45309]" />
                  Products ({categories.length} Divisions)
                </span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-neutral-500 transition-transform duration-200",
                    mobileCategoriesExpanded ? "rotate-180 text-amber-600" : ""
                  )}
                />
              </button>

              {mobileCategoriesExpanded && (
                <div className="pl-2 pr-1 py-2 space-y-1.5 animate-in slide-in-from-top-2 duration-150">
                  <Link
                    href="/products"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs font-bold uppercase tracking-wider text-amber-700 py-2.5 px-3 rounded-lg hover:bg-amber-50 border-b border-neutral-100 min-h-[44px] flex items-center"
                  >
                    → Browse All Products Catalog
                  </Link>
                  <div className="grid grid-cols-1 gap-1 max-h-64 overflow-y-auto pt-1">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/products/${cat.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-xs font-medium text-neutral-700 hover:text-amber-800 py-2.5 px-3 rounded-lg hover:bg-neutral-50 flex items-center justify-between min-h-[44px] transition-colors"
                      >
                        <span>{cat.name}</span>
                        {cat.menu_badge && (
                          <span className="text-[9px] font-mono bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-semibold">
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
              <div className="text-[10px] tracking-[0.25em] text-neutral-400 uppercase font-mono mb-2">
                Export Markets
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/manufacturers-usa"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col gap-1 hover:border-slate-900 transition-colors",
                    pathname.startsWith("/manufacturers-usa") && "border-slate-900 bg-amber-50/40"
                  )}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 uppercase">
                    <span>🇺🇸</span>
                    <span>USA Brands</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">DDP Air · Low MOQ</span>
                </Link>
                <Link
                  href="/manufacturers-uk"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col gap-1 hover:border-slate-900 transition-colors",
                    pathname.startsWith("/manufacturers-uk") && "border-slate-900 bg-amber-50/40"
                  )}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 uppercase">
                    <span>🇬🇧</span>
                    <span>UK Brands</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">CE/UKCA · GBP (£)</span>
                </Link>
              </div>
            </div>

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
                      "text-xl font-bold uppercase tracking-tight transition-colors flex items-center justify-between py-3 border-b border-neutral-100",
                      isActive ? "text-[#b45309]" : "text-neutral-900 hover:text-[#b45309]"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#b45309]" />}
                      {link.name}
                    </span>
                    <ArrowUpRight
                      className={cn(
                        "w-5 h-5",
                        isActive ? "text-[#b45309]" : "opacity-40 text-neutral-500"
                      )}
                    />
                  </Link>
                );
              })}
          </div>

          <div className="flex flex-col gap-4 border-t border-neutral-200 pt-6 mt-6">
            <GooeyButton
              href="/contact"
              variant="gold-solid"
              size="md"
              className="w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </GooeyButton>
            <div className="flex items-center justify-between text-xs text-neutral-500 pt-2 font-mono">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#b45309]" /> Sialkot Verified OEM
              </span>
              <span>Direct Export</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
