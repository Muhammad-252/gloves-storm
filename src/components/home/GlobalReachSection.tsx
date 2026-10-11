"use client";

import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import StaticMapFallback from "./StaticMapFallback";

const InteractiveGlobe = dynamic(() => import("./InteractiveGlobe"), {
  ssr: false,
  loading: () => <StaticMapFallback />,
});

export default function GlobalReachSection() {
  return (
    <section className="py-28 sm:py-36 bg-[#F9FAFB] border-b border-black/[0.07] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Showcase: Editorial Header & Interactive 360° Globe */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Story & Metrics */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-mono block mb-2 font-bold">
                Worldwide Supply Chain &amp; Direct Export
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-[-0.035em] text-[#1A1A1A] leading-[1.0] mb-6">
                GLOBAL EXPORT NETWORK <br />
                <span className="text-[#6B7280]">WORLDWIDE LOGISTICS.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed max-w-xl">
                GLOVES STORM operates dedicated international export corridors supplying custom apparel, performance sportswear, activewear, and private label collections to brands across North America, the UK, Europe, Australia, and the Middle East. With direct mill production and insured DDP air and ocean freight, we guarantee seamless delivery directly to your facility or fulfillment warehouse.
              </p>
            </div>

            {/* Core Export Capabilities */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                <span className="text-2xl sm:text-3xl font-black text-[#1A1A1A] font-mono block mb-1">
                  50+
                </span>
                <span className="text-xs text-[#6B7280] font-medium">
                  Countries Worldwide Export Network
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                <span className="text-2xl sm:text-3xl font-black text-[#1A1A1A] font-mono block mb-1">
                  3–5 Days
                </span>
                <span className="text-xs text-[#6B7280] font-medium">
                  Air Express DDP to USA &amp; UK
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                <span className="text-2xl sm:text-3xl font-black text-[#1A1A1A] font-mono block mb-1">
                  60+
                </span>
                <span className="text-xs text-[#6B7280] font-medium">
                  International Ports &amp; Hubs Served
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                <span className="text-2xl sm:text-3xl font-black text-[#1A1A1A] font-mono block mb-1">
                  100%
                </span>
                <span className="text-xs text-[#6B7280] font-medium">
                  Insured Door-to-Door DDP Delivery
                </span>
              </div>
            </div>

            {/* Direct Factory Link */}
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#FFB900] text-white hover:text-black px-6 py-3 rounded-full font-extrabold text-xs uppercase tracking-wider shadow-sm transition-all"
              >
                <span>Calculate Freight For Your Country</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: 360° Interactive 3D Globe */}
          <div className="lg:col-span-6 flex justify-center">
            <InteractiveGlobe />
          </div>
        </div>
      </div>
    </section>
  );
}
