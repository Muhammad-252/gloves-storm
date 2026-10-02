"use client";

import { useState } from "react";
import { ArrowUpRight, MessageSquare, Sparkles, CheckCircle2 } from "lucide-react";
import QuoteModal from "../ui/QuoteModal";
import GooeyButton from "../ui/GooeyButton";

export default function FinalCtaSection() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-[#FCFAF5] to-[#FEF3C7]/20 relative overflow-hidden text-center border-t border-black/[0.06]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-400/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8">
        <div className="rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/90 p-8 sm:p-14 shadow-[0_20px_50px_rgba(217,119,6,0.06)]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 mb-5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-amber-900 font-mono font-bold">
              Direct Sialkot Factory Partnership
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-[-0.03em] text-[#111827] leading-[1.08] sm:leading-[1.05] mb-4">
            READY TO BUILD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800">
              YOUR NEXT COLLECTION?
            </span>
          </h2>

          <p className="text-xs sm:text-base text-neutral-600 max-w-xl mx-auto font-normal leading-relaxed mb-8">
            Tell us what you&apos;re building. We&apos;ll turn your concept or tech pack into physical production with guaranteed lead times, direct factory pricing, and transparent Sialkot communication.
          </p>

          {/* 3 Action Buttons in Light Mode */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-xs sm:max-w-none mx-auto mb-8">
            <GooeyButton
              href="/contact"
              variant="gold-solid"
              size="md"
              className="w-full sm:w-auto shadow-md"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </GooeyButton>

            <GooeyButton
              onClick={() => setQuoteModalOpen(true)}
              variant="outline"
              size="md"
              className="w-full sm:w-auto bg-white/80 backdrop-blur-md"
            >
              <span>REQUEST A QUOTE</span>
            </GooeyButton>

            <a
              href="https://wa.me/923417146935?text=Hi%20Gloves%20Storm%2C%20I'm%20interested%20in%20custom%20manufacturing%20and%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-emerald-600/30 bg-emerald-50/80 hover:bg-emerald-100 text-emerald-900 font-bold text-xs uppercase tracking-wider transition-all shadow-xs backdrop-blur-md"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>WHATSAPP US</span>
            </a>
          </div>

          {/* Trust Badges in Frosted Pill Cards */}
          <div className="pt-6 border-t border-black/[0.06] flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-neutral-600 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Strict NDAs Respected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Low MOQ: 25–50 Pcs</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct Mill Pricing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>DDP Air & Ocean Freight</span>
            </div>
          </div>
        </div>
      </div>

      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultProductName="New Custom Collection"
        defaultCategory="Sportswear & Combat Gear"
      />
    </section>
  );
}
