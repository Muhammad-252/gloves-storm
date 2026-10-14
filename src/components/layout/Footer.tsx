"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Globe, Mail, Phone, MapPin, ShieldCheck, MessageSquare } from "lucide-react";
import { InstagramIcon, LinkedInIcon } from "../ui/SocialIcons";

const categories = [
  { name: "Sportswear & Teamwear", href: "/products/sportswear-teamwear" },
  { name: "Gym & Fitness Activewear", href: "/products/gym-fitness-wear" },
  { name: "Clothing & Streetwear", href: "/products/clothing-streetwear" },
  { name: "Custom Manufacturing & Private Label", href: "/products/custom-manufacturing-private-label" },
  { name: "All Apparel Catalog", href: "/products" },
];

const exportMarkets = [
  { name: "USA Brand Manufacturing", href: "/manufacturers-usa" },
  { name: "UK Brand Manufacturing", href: "/manufacturers-uk" },
  { name: "Worldwide DDP Air & Sea", href: "/about#export" },
  { name: "Custom Tech Pack Prototyping", href: "/products/custom-manufacturing-private-label" },
];

const navigation = [
  { name: "About GLOVES STORM", href: "/about" },
  { name: "Previous OEM Work", href: "/previous-work" },
  { name: "Apparel Journal", href: "/journal" },
  { name: "Request a Quote", href: "/contact" },
  { name: "Privacy & IP Policy", href: "/privacy" },
];

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on admin routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-white/85 backdrop-blur-xl border-t border-white/90 text-slate-900 pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-12 relative overflow-hidden shadow-[0_-8px_30px_rgb(0,0,0,0.02)]">
      {/* Subtle top hairline gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Big Statement */}
        <div className="pb-8 sm:pb-12 lg:pb-16 border-b border-slate-200/80 flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[10px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] font-bold mb-2.5 sm:mb-3 border border-neutral-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFB900] animate-pulse" />
              <span>International OEM &amp; Private Label Exporter</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight leading-tight text-neutral-950">
              BUILT FOR BRANDS. <br />
              <span className="text-neutral-500">ENGINEERED TO SCALE.</span>
            </h2>
          </div>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#FFB900] hover:bg-[#E5A700] text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95 w-full sm:w-auto text-center"
            >
              <span>Submit Your Tech Pack</span>
              <ArrowUpRight className="w-4 h-4 text-black shrink-0" />
            </Link>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 py-8 sm:py-12 lg:py-16 border-b border-slate-200/80">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-black shrink-0 border border-black/10 flex items-center justify-center">
                  <Image
                    src="/images/logo.png"
                    alt="Gloves Storm"
                    width={36}
                    height={36}
                    className="object-cover scale-[1.05]"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-900 leading-none">
                    GLOVES STORM
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-slate-500 font-semibold mt-0.5">
                    International Apparel Exporter
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed max-w-sm mb-6">
                Custom clothing, performance sportswear, activewear, and private label apparel manufactured and exported for international brands, athletic clubs, and fashion labels across the USA, UK, and worldwide.
              </p>
            </div>

            <div className="flex flex-col gap-3 text-xs text-slate-600 mb-6">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-slate-900 shrink-0" />
                <span>Industrial Estate, Sialkot 51310, Punjab, Pakistan</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-900 shrink-0" />
                <a href="mailto:glovesstorm@gmail.com" className="hover:text-slate-900 font-medium transition-colors">
                  glovesstorm@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-900 shrink-0" />
                <a href="tel:+923417146935" className="hover:text-slate-900 font-medium transition-colors">
                  +923417146935
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-slate-900 shrink-0" />
                <span>Worldwide Dispatch: USA • UK • EU • Canada • Australia • UAE</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-200/80">
              <a
                href="https://www.instagram.com/glovesstorm/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-slate-200/80 hover:border-slate-900 hover:text-slate-900 flex items-center justify-center text-slate-600 shadow-2xs transition-all"
                aria-label="Follow GLOVES STORM on Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/gloves-storm/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-slate-200/80 hover:border-slate-900 hover:text-slate-900 flex items-center justify-center text-slate-600 shadow-2xs transition-all"
                aria-label="Connect with GLOVES STORM on LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/923417146935"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-slate-200/80 hover:border-[#FFB900] hover:text-[#FFB900] flex items-center justify-center text-slate-600 shadow-2xs transition-all"
                aria-label="Chat with GLOVES STORM on WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="mailto:glovesstorm@gmail.com"
                className="w-9 h-9 rounded-full bg-white border border-slate-200/80 hover:border-slate-900 hover:text-slate-900 flex items-center justify-center text-slate-600 shadow-2xs transition-all"
                aria-label="Email GLOVES STORM"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Apparel Divisions */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-slate-900 mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
              Apparel Divisions
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-600">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={cat.href}
                    className="hover:text-slate-900 hover:translate-x-1 inline-block transition-all"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Export Markets */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-slate-900 mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
              Export Corridors
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-600">
              {exportMarkets.map((market) => (
                <li key={market.name}>
                  <Link
                    href={market.href}
                    className="hover:text-slate-900 hover:translate-x-1 inline-block transition-all"
                  >
                    {market.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-slate-900 mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
              Company
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-600">
              {navigation.map((nav) => (
                <li key={nav.name}>
                  <Link
                    href={nav.href}
                    className="hover:text-slate-900 hover:translate-x-1 inline-block transition-all"
                  >
                    {nav.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-900 shrink-0" />
            <span>
              © {new Date().getFullYear()} GLOVES STORM. Custom Clothing &amp; Sportswear Manufacturer &amp; Exporter. All Rights Reserved.
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-6 gap-y-2 text-[11px] sm:text-xs">
            <span>OEM / ODM Private Label</span>
            <span>Custom Tech Packs</span>
            <Link href="/privacy" className="hover:text-slate-900 transition-colors underline-offset-4 hover:underline">
              Privacy &amp; IP Protection
            </Link>
            <span>Worldwide DDP Shipping</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
