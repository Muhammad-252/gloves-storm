"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Globe, Mail, Phone, MapPin, ShieldCheck, MessageSquare } from "lucide-react";
import { InstagramIcon, LinkedInIcon } from "../ui/SocialIcons";

const categories = [
  { name: "Boxing Equipment", href: "/products/boxing-equipment" },
  { name: "Sportswear & Teamwear", href: "/products/sportswear-teamwear" },
  { name: "Gym & Fitness Wear", href: "/products/gym-fitness-wear" },
  { name: "Clothing & Streetwear", href: "/products/clothing-streetwear" },
  { name: "Custom Manufacturing & Private Label", href: "/products/custom-manufacturing-private-label" },
  { name: "Swimwear & Beachwear", href: "/products/swimwear-beachwear" },
];

const navigation = [
  { name: "All Products", href: "/products" },
  { name: "Manufacturing & Capabilities", href: "/manufacturing" },
  { name: "Manufacturing for USA", href: "/manufacturers-usa" },
  { name: "Manufacturing for UK", href: "/manufacturers-uk" },
  { name: "About GLOVES STORM", href: "/about" },
  { name: "Previous Work", href: "/previous-work" },
  { name: "Manufacturing Journal", href: "/journal" },
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
    <footer className="bg-white/85 backdrop-blur-xl border-t border-white/90 text-slate-900 pt-20 pb-12 relative overflow-hidden shadow-[0_-8px_30px_rgb(0,0,0,0.02)]">
      {/* Subtle top hairline gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Big Statement */}
        <div className="pb-16 border-b border-slate-200/80 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[10px] font-mono uppercase tracking-[0.25em] font-bold mb-3 border border-slate-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Direct Factory OEM &amp; Private Label Partner</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight leading-tight text-slate-900">
              BUILT FOR BRANDS. <br />
              <span className="text-slate-500">ENGINEERED TO SCALE.</span>
            </h2>
          </div>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
            >
              <span>Submit Your Tech Pack</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 py-16 border-b border-slate-200/80">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-black uppercase tracking-tight text-slate-900">
                  GLOVES STORM
                </span>
                <span className="w-2 h-2 rounded-full bg-slate-900" />
              </div>
              <p className="text-sm text-slate-600 leading-relaxed max-w-sm mb-6">
                Premium custom sports equipment, combat gear, and high-performance athletic apparel manufactured for global brands, sports clubs, and fashion labels.
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
                className="w-9 h-9 rounded-full bg-white border border-slate-200/80 hover:border-emerald-600 hover:text-emerald-600 flex items-center justify-center text-slate-600 shadow-2xs transition-all"
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

          {/* Categories Column 1 */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-slate-900 mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
              Equipment &amp; Fight
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-600">
              {categories.slice(0, 5).map((cat) => (
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

          {/* Categories Column 2 */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-slate-900 mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
              Apparel &amp; Wear
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-600">
              {categories.slice(5).map((cat) => (
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
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              © {new Date().getFullYear()} GLOVES STORM. Handcrafted &amp; Manufactured in Sialkot, Pakistan. All Rights Reserved.
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-6 gap-y-2 text-[11px] sm:text-xs">
            <span>OEM / Private Label</span>
            <span>Custom Tech Packs</span>
            <Link href="/privacy" className="hover:text-slate-900 transition-colors underline-offset-4 hover:underline">
              Privacy &amp; IP Protection
            </Link>
            <span>Worldwide Shipping</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
