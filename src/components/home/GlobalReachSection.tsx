"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import StaticMapFallback from "./StaticMapFallback";

const InteractiveGlobe = dynamic(() => import("./InteractiveGlobe"), {
  ssr: false,
  loading: () => <StaticMapFallback />,
});

export default function GlobalReachSection() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only load the 3D WebGL Globe on desktop viewports (>= 1024px)
    if (typeof window !== "undefined") {
      setIsDesktop(window.innerWidth >= 1024);
      const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
      window.addEventListener("resize", handleResize, { passive: true });
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <section className="py-12 sm:py-20 lg:py-28 bg-[#F9FAFB] border-b border-black/[0.07] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Showcase: Editorial Header & Interactive Logistics Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Story & Metrics */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <div>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-neutral-500 font-mono block mb-2 font-bold">
                Worldwide Supply Chain &amp; Direct Export
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-[-0.035em] text-[#1A1A1A] leading-[1.08] sm:leading-[1.0] mb-3 sm:mb-5">
                GLOBAL EXPORT NETWORK <br />
                <span className="text-[#6B7280]">WORLDWIDE LOGISTICS.</span>
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-[#6B7280] leading-relaxed max-w-xl">
                GLOVES STORM operates dedicated international export corridors supplying custom apparel, performance sportswear, activewear, and private label collections to brands across North America, the UK, Europe, Australia, and the Middle East. With direct mill production and insured DDP air and ocean freight, we guarantee seamless delivery directly to your facility or fulfillment warehouse.
              </p>
            </div>

            {/* Core Export Capabilities */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 pt-1 sm:pt-2">
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                <span className="text-xl sm:text-2xl md:text-3xl font-black text-[#1A1A1A] font-mono block mb-0.5 sm:mb-1">
                  50+
                </span>
                <span className="text-[11px] sm:text-xs text-[#6B7280] font-medium leading-tight block">
                  Countries Worldwide Export Network
                </span>
              </div>
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                <span className="text-xl sm:text-2xl md:text-3xl font-black text-[#1A1A1A] font-mono block mb-0.5 sm:mb-1">
                  3–5 Days
                </span>
                <span className="text-[11px] sm:text-xs text-[#6B7280] font-medium leading-tight block">
                  Air Express DDP to USA &amp; UK
                </span>
              </div>
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                <span className="text-xl sm:text-2xl md:text-3xl font-black text-[#1A1A1A] font-mono block mb-0.5 sm:mb-1">
                  60+
                </span>
                <span className="text-[11px] sm:text-xs text-[#6B7280] font-medium leading-tight block">
                  International Ports &amp; Hubs Served
                </span>
              </div>
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                <span className="text-xl sm:text-2xl md:text-3xl font-black text-[#1A1A1A] font-mono block mb-0.5 sm:mb-1">
                  100%
                </span>
                <span className="text-[11px] sm:text-xs text-[#6B7280] font-medium leading-tight block">
                  Insured Door-to-Door DDP Delivery
                </span>
              </div>
            </div>

            {/* Direct Factory Link */}
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-[#FFB900] text-white hover:text-black px-5 sm:px-6 py-3 rounded-full font-extrabold text-[11px] sm:text-xs uppercase tracking-wider shadow-sm transition-all w-full sm:w-auto text-center"
              >
                <span>Calculate Freight For Your Country</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </Link>
            </div>
          </div>

          {/* Right Column: 360° Interactive 3D Globe on Desktop / Vector Map on Mobile */}
          <div className="lg:col-span-6 flex justify-center w-full">
            {isDesktop ? <InteractiveGlobe /> : <StaticMapFallback />}
          </div>
        </div>
      </div>
    </section>
  );
}
