"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import GooeyButton from "../ui/GooeyButton";

const navLinks = [
  { name: "Products", href: "/products" },
  { name: "Customizer", href: "/customize" },
  { name: "Manufacturing", href: "/manufacturing" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Journal", href: "/journal" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return null; // Admin has its dedicated dashboard layout
  }

  const isHeroHeader = pathname === "/" && !scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "py-3 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
            : pathname === "/"
            ? "py-5 bg-gradient-to-b from-black/75 via-black/35 to-transparent"
            : "py-5 bg-white/90 backdrop-blur-md border-b border-neutral-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group transition-opacity hover:opacity-90"
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
                      ? "text-neutral-950 font-bold"
                      : "text-neutral-600 hover:text-neutral-950"
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
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col justify-between pt-24 pb-8 px-6 md:hidden animate-in fade-in duration-200 shadow-2xl">
          <div className="flex flex-col gap-6">
            <span className="text-[10px] tracking-[0.25em] text-neutral-400 uppercase font-mono">
              Navigation
            </span>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-2xl font-bold uppercase tracking-tight text-neutral-900 hover:text-[#b45309] transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-5 h-5 opacity-40 text-neutral-500" />
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4 border-t border-neutral-200 pt-6">
            <GooeyButton
              href="/contact"
              variant="gold-solid"
              size="md"
              className="w-full"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </GooeyButton>
            <div className="flex items-center text-xs text-neutral-500 pt-2">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#b45309]" /> Sialkot Verified OEM
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
