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

const navLinks = [
  { name: "Products", href: "/products", hasMegaMenu: true },
  { name: "Manufacturing", href: "/manufacturing" },
  { name: "About", href: "/about" },
  { name: "Previous Work", href: "/previous-work" },
  { name: "Journal", href: "/journal" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileCategoriesExpanded, setMobileCategoriesExpanded] = useState(false);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const pathname = usePathname();
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return null; // Admin has its dedicated dashboard layout
  }

  const isHeroHeader = pathname === "/" && !scrolled && !mobileMenuOpen && !megaMenuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          mobileMenuOpen || megaMenuOpen
            ? "py-4 bg-white border-b border-black/[0.08] shadow-md"
            : scrolled
            ? "py-3 bg-white/[0.98] backdrop-blur-md border-b border-black/[0.08] shadow-[0_1px_0_0_rgba(0,0,0,0.07)]"
            : pathname === "/"
            ? "py-5 bg-gradient-to-b from-black/75 via-black/35 to-transparent"
            : "py-5 bg-white border-b border-black/[0.07]"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
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
              <span
                className={cn(
                  "font-extrabold tracking-[-0.04em] text-xl sm:text-2xl uppercase flex items-center gap-1.5 transition-colors",
                  isHeroHeader
                    ? "text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
                    : "text-neutral-900"
                )}
              >
                GLOVES STORM
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-colors",
                    isHeroHeader ? "bg-amber-400" : "bg-[#b45309]"
                  )}
                />
              </span>
              <span
                className={cn(
                  "text-[9px] uppercase tracking-[0.25em] -mt-1 font-mono transition-colors",
                  isHeroHeader
                    ? "text-amber-300/90 drop-shadow-sm font-semibold"
                    : "text-neutral-500 font-medium"
                )}
              >
                Sialkot • Global OEM
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
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
                    className="relative py-2"
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "text-xs uppercase tracking-[0.18em] font-medium transition-colors relative py-1 flex items-center gap-1.5 group cursor-pointer",
                        isHeroHeader
                          ? isActive || megaMenuOpen
                            ? "text-white font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
                            : "text-white/85 hover:text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]"
                          : isActive || megaMenuOpen
                          ? "text-[#1A1A1A] font-bold"
                          : "text-[#4B4B4B] hover:text-[#1A1A1A]"
                      )}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={cn(
                          "w-3 h-3 transition-transform duration-200",
                          megaMenuOpen ? "rotate-180 text-amber-600" : "text-neutral-400"
                        )}
                      />
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-700 font-semibold border border-amber-500/30">
                        {categories.length}
                      </span>
                      {isActive && !megaMenuOpen && (
                        <span
                          className={cn(
                            "absolute bottom-0 left-0 w-full h-[2px]",
                            isHeroHeader ? "bg-amber-400" : "bg-[#b45309]"
                          )}
                        />
                      )}
                    </Link>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-xs uppercase tracking-[0.18em] font-medium transition-colors relative py-1",
                    isHeroHeader
                      ? isActive
                        ? "text-white font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
                        : "text-white/85 hover:text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]"
                      : isActive
                      ? "text-[#1A1A1A] font-bold"
                      : "text-[#4B4B4B] hover:text-[#1A1A1A]"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <span
                      className={cn(
                        "absolute bottom-0 left-0 w-full h-[2px]",
                        isHeroHeader ? "bg-amber-400" : "bg-[#b45309]"
                      )}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA */}
          <div className="hidden md:flex items-center gap-4">
            <GooeyButton
              href="/contact"
              variant="gold-solid"
              size="sm"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </GooeyButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              "md:hidden p-2 transition-colors",
              mobileMenuOpen
                ? "text-neutral-900"
                : isHeroHeader
                ? "text-white hover:text-amber-400"
                : "text-neutral-900 hover:text-[#b45309]"
            )}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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

            {navLinks
              .filter((l) => !l.hasMegaMenu)
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
