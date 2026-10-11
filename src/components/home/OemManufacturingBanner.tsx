"use client";

import { useState } from "react";
import { ArrowUpRight, MessageSquare, Layers, Cpu, ShieldCheck, Tag, Sparkles, CheckCircle2 } from "lucide-react";
import GooeyButton from "../ui/GooeyButton";
import QuoteModal from "../ui/QuoteModal";

const customizationPillars = [
  {
    icon: Layers,
    title: "Bespoke Textiles & Milled Fabrics",
    desc: "450+ GSM combed cotton French terry, 280 GSM 4-way compression spandex, micro-mesh performance poly, and 24oz Melton varsity wool.",
  },
  {
    icon: Cpu,
    title: "Advanced Logo Execution",
    desc: "Tajima 12-needle 3D puff embroidery, Italian Kiian digital dye sublimation, and high-density silicone heat seals.",
  },
  {
    icon: Tag,
    title: "Full Private Labeling",
    desc: "Custom woven damask neck labels, laser-engraved hardware, embossed leather patches, and barcode swing tags.",
  },
  {
    icon: ShieldCheck,
    title: "Retail-Ready Packaging",
    desc: "Frosted matte zip-lock bags, custom branded presentation boxes, silica packs, and master carton export palletizing.",
  },
];

export default function OemManufacturingBanner() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-black/[0.06] relative overflow-hidden">
      {/* Ambient Warm Glow for Glassmorphic Depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-amber-400/12 via-orange-300/8 to-transparent blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/90 p-8 sm:p-12 lg:p-14 shadow-[0_16px_50px_rgba(217,119,6,0.07)] relative overflow-hidden">
          <div className="relative z-10">
            {/* Top Frosted Brand Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 shadow-xs mb-6">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em] text-amber-950 font-bold">
                Turnkey Private Label & OEM Engineering
              </span>
            </div>

            {/* Headline */}
            <div className="max-w-4xl mb-8">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-[-0.03em] text-[#111827] leading-[1.08] sm:leading-[1.05] mb-4">
                HAVE A TECH PACK OR CUSTOM SKETCH? <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800">
                  WE ENGINEER IT TO PHYSICAL PRODUCTION.
                </span>
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-neutral-600 leading-relaxed max-w-2xl font-normal">
                From single pre-production master prototypes delivered in 7–10 days to 50,000-unit recurring bulk drops. Gloves Storm is your direct Sialkot industrial partner with millimeter tolerances and zero middlemen.
              </p>
            </div>

            {/* 4 Frosted Customization Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10">
              {customizationPillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/75 backdrop-blur-xl border border-white/85 shadow-xs hover:border-amber-400/50 hover:shadow-md hover:-translate-y-1 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-800 mb-3.5 group-hover:bg-[#111827] group-hover:text-amber-400 transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-tight text-[#111827] mb-1">
                      {pillar.title}
                    </h3>
                    <p className="text-[11px] text-neutral-500 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Actions & Credentials Footer */}
            <div className="pt-8 border-t border-amber-200/70 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <GooeyButton
                  onClick={() => setQuoteModalOpen(true)}
                  variant="gold-solid"
                  size="md"
                  className="w-full sm:w-auto shadow-sm"
                >
                  <span>SUBMIT TECH PACK FOR QUOTE</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </GooeyButton>

                <a
                  href="https://wa.me/923417146935?text=Hi%20Gloves%20Storm%2C%20I%20have%20a%20tech%20pack%20and%20would%20like%20to%20get%20a%20manufacturing%20quote."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-emerald-600/30 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs uppercase tracking-wider transition-all shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Lead Engineer</span>
                </a>
              </div>

              {/* Trust Micro-Bullets */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#4B5563] font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Strict NDA Protection</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Low MOQ: 25–50 Pcs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Free Tech Pack Review</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultProductName="Custom Tech Pack Inquiry"
        defaultCategory="Custom Manufacturing & Private Label"
      />
    </section>
  );
}
