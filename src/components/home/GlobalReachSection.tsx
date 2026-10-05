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
              <span className="text-xs uppercase tracking-[0.25em] text-amber-800 font-mono block mb-2 font-bold">
                Worldwide Supply Chain & Direct Export
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-[-0.035em] text-[#1A1A1A] leading-[1.0] mb-6">
                FROM SIALKOT <br />
                <span className="text-[#6B7280]">TO THE WORLD.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed max-w-xl">
                Sialkot manufactures over 70% of the world&apos;s hand-stitched sports goods. GLOVES STORM builds upon this century-old industrial mastery with automated cutting, precision stitching, and insured air-express freight corridors directly to your facility door.
              </p>
            </div>

            {/* Core Export Capabilities */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                <span className="text-2xl sm:text-3xl font-black text-[#1A1A1A] font-mono block mb-1">
                  70%+
                </span>
                <span className="text-xs text-[#6B7280] font-medium">
                  Global Sports Goods Handcraft Heritage
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                <span className="text-2xl sm:text-3xl font-black text-amber-800 font-mono block mb-1">
                  3–5 Days
                </span>
                <span className="text-xs text-[#6B7280] font-medium">
                  Air Express Dispatch to North America & EU
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                <span className="text-2xl sm:text-3xl font-black text-[#1A1A1A] font-mono block mb-1">
                  60+
                </span>
                <span className="text-xs text-[#6B7280] font-medium">
                  International Destination Ports Served
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                <span className="text-2xl sm:text-3xl font-black text-amber-800 font-mono block mb-1">
                  100%
                </span>
                <span className="text-xs text-[#6B7280] font-medium">
                  Insured Door-to-Door Customs Clearance
                </span>
              </div>
            </div>

            {/* Direct Factory Link */}
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-amber-600 text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
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
