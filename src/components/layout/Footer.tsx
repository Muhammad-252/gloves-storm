"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Globe, Mail, Phone, MapPin, ShieldCheck, MessageSquare } from "lucide-react";
import GooeyButton from "../ui/GooeyButton";
import { InstagramIcon, LinkedInIcon } from "../ui/SocialIcons";

const categories = [
  { name: "Boxing", href: "/products/boxing" },
  { name: "American Football", href: "/products/american-football" },
  { name: "Basketball", href: "/products/basketball" },
  { name: "Baseball", href: "/products/baseball" },
  { name: "Soccer", href: "/products/soccer" },
  { name: "Sportswear", href: "/products/sportswear" },
  { name: "Gym Wear", href: "/products/gym-wear" },
  { name: "Streetwear", href: "/products/streetwear" },
  { name: "Fashion", href: "/products/fashion" },
  { name: "Swimwear", href: "/products/swimwear" },
  { name: "Accessories", href: "/products/accessories" },
];

const navigation = [
  { name: "All Products", href: "/products" },
  { name: "Manufacturing & Capabilities", href: "/manufacturing" },
  { name: "About GLOVES STORM", href: "/about" },
  { name: "Case Studies / Projects", href: "/projects" },
  { name: "Manufacturing Journal", href: "/journal" },
  { name: "Request a Quote", href: "/contact" },
];

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on admin routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-[#f8fafc] border-t border-neutral-200 text-neutral-900 pt-20 pb-12 relative overflow-hidden">
      {/* Subtle top gold accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-[#b45309]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Big Statement */}
        <div className="pb-16 border-b border-neutral-200 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#b45309] block mb-3 font-semibold">
              Direct Factory OEM & Private Label Partner
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight leading-[1.05] text-neutral-950">
              BUILT FOR BRANDS. <br />
              <span className="text-neutral-500">ENGINEERED TO SCALE.</span>
            </h2>
          </div>
          <div>
            <GooeyButton
              href="/contact"
              variant="gold-solid"
              size="lg"
            >
              <span>Submit Your Tech Pack</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </GooeyButton>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 py-16 border-b border-neutral-200">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-black uppercase tracking-tight text-neutral-950">
                  GLOVES STORM
                </span>
                <span className="w-2 h-2 rounded-full bg-[#b45309]" />
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed max-w-sm mb-6">
                Premium custom sports equipment, combat gear, and high-performance athletic apparel manufactured for global brands, sports clubs, and fashion labels.
              </p>
            </div>

            <div className="flex flex-col gap-3 text-xs text-neutral-600 mb-6">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#b45309] shrink-0" />
                <span>Industrial Estate, Sialkot 51310, Punjab, Pakistan</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#b45309] shrink-0" />
                <a href="mailto:glovesstorm@gmail.com" className="hover:text-neutral-950 font-medium transition-colors">
                  glovesstorm@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#b45309] shrink-0" />
                <a href="tel:+923417146935" className="hover:text-neutral-950 font-medium transition-colors">
                  +923417146935
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#b45309] shrink-0" />
                <span>Worldwide Dispatch: USA • UK • EU • Canada • Australia • UAE</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-4 border-t border-neutral-200">
              <a
                href="https://www.instagram.com/glovesstorm/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-neutral-200 hover:border-[#b45309]/60 hover:bg-[#b45309]/10 flex items-center justify-center text-neutral-600 hover:text-[#b45309] shadow-xs transition-all"
                aria-label="Follow GLOVES STORM on Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/gloves-storm/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-neutral-200 hover:border-[#b45309]/60 hover:bg-[#b45309]/10 flex items-center justify-center text-neutral-600 hover:text-[#b45309] shadow-xs transition-all"
                aria-label="Connect with GLOVES STORM on LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/923417146935"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-neutral-200 hover:border-[#25D366]/60 hover:bg-[#25D366]/10 flex items-center justify-center text-neutral-600 hover:text-[#25D366] shadow-xs transition-all"
                aria-label="Chat with GLOVES STORM on WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="mailto:glovesstorm@gmail.com"
                className="w-9 h-9 rounded-full bg-white border border-neutral-200 hover:border-[#b45309]/60 hover:bg-[#b45309]/10 flex items-center justify-center text-neutral-600 hover:text-[#b45309] shadow-xs transition-all"
                aria-label="Email GLOVES STORM"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Categories Column 1 */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-neutral-950 mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#b45309]" />
              Equipment & Fight
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-neutral-600">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={cat.href}
                    className="hover:text-neutral-950 hover:translate-x-1 inline-block transition-all"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Column 2 */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-neutral-950 mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#b45309]" />
              Apparel & Wear
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-neutral-600">
              {categories.slice(5).map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={cat.href}
                    className="hover:text-neutral-950 hover:translate-x-1 inline-block transition-all"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-neutral-950 mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#b45309]" />
              Company
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-neutral-600">
              {navigation.map((nav) => (
                <li key={nav.name}>
                  <Link
                    href={nav.href}
                    className="hover:text-neutral-950 hover:translate-x-1 inline-block transition-all"
                  >
                    {nav.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#b45309]" />
            <span>
              © {new Date().getFullYear()} GLOVES STORM. Handcrafted & Manufactured in Sialkot, Pakistan. All Rights Reserved.
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span>OEM / Private Label</span>
            <span>Custom Tech Packs</span>
            <span>Worldwide Shipping</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
