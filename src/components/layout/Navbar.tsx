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

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "py-3 bg-[#0C0D0E]/90 backdrop-blur-xl border-b border-white/[0.07] shadow-[0_4px_32px_rgba(0,0,0,0.6)]"
            : "py-5 bg-gradient-to-b from-black/80 via-black/40 to-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group transition-opacity hover:opacity-90"
          >
            <div className="flex flex-col">
              <span className="font-extrabold tracking-[-0.04em] text-xl sm:text-2xl uppercase flex items-center gap-1.5 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] transition-colors">
                GLOVES STORM
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] shadow-[0_0_8px_rgba(255,107,0,0.7)]" />
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] -mt-1 font-mono text-[#FF6B00]/80 font-semibold drop-shadow-sm">
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
                    isActive
                      ? "text-white font-bold"
                      : "text-white/60 hover:text-white"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FF6B00] shadow-[0_0_8px_rgba(255,107,0,0.7)]" />
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
            className="md:hidden p-2 text-white hover:text-[#FF6B00] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer — Dark */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0C0D0E] flex flex-col justify-between pt-24 pb-8 px-6 md:hidden animate-in fade-in duration-200">
          {/* Subtle accent top bar */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6B00]/50 to-transparent" />

          <div className="flex flex-col gap-6">
            <span className="text-[10px] tracking-[0.25em] text-white/30 uppercase font-mono">
              Navigation
            </span>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-2xl font-bold uppercase tracking-tight text-white hover:text-[#FF6B00] transition-colors flex items-center justify-between group"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-5 h-5 opacity-30 text-white group-hover:opacity-100 group-hover:text-[#FF6B00] transition-all" />
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4 border-t border-white/[0.07] pt-6">
            <GooeyButton
              href="/contact"
              variant="gold-solid"
              size="md"
              className="w-full"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </GooeyButton>
            <div className="flex items-center text-xs text-white/40 pt-2">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#FF6B00]" /> Sialkot Verified OEM
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
