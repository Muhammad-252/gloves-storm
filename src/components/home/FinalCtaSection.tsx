"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MessageSquare, ShieldCheck } from "lucide-react";
import QuoteModal from "../ui/QuoteModal";
import GooeyButton from "../ui/GooeyButton";

export default function FinalCtaSection() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  return (
    <section className="py-28 sm:py-36 bg-[#1A1A1A] relative overflow-hidden text-center border-t border-black/[0.1]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8">
        <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-mono block mb-4 font-bold">
          Direct Sialkot Factory Partnership
        </span>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-[-0.035em] text-white leading-[0.95] mb-6">
          READY TO BUILD <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
            YOUR NEXT COLLECTION?
          </span>
        </h2>

        <p className="text-base sm:text-lg text-white/75 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
          Tell us what you&apos;re building. We&apos;ll help turn your concept into physical production with guaranteed lead times and transparent factory communication.
        </p>

        {/* 3 Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4 max-w-xs sm:max-w-none mx-auto">
          <GooeyButton
            href="/contact"
            variant="gold-solid"
            size="lg"
            className="w-full sm:w-auto"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </GooeyButton>

          <GooeyButton
            onClick={() => setQuoteModalOpen(true)}
            variant="outline-white"
            size="lg"
            className="w-full sm:w-auto"
          >
            <span>REQUEST A QUOTE</span>
          </GooeyButton>

          <GooeyButton
            href="https://wa.me/923417146935?text=Hi%20Gloves%20Storm%2C%20I'm%20interested%20in%20custom%20manufacturing%20and%20would%20like%20to%20discuss%20a%20project."
            variant="outline-white"
            size="lg"
            className="w-full sm:w-auto"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            <span>WHATSAPP US</span>
          </GooeyButton>
        </div>

        {/* Trust Badges */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-white/80">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>NDAs Respected</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Low MOQ Starting at 25-50 Pcs</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Direct Sialkot Factory Pricing</span>
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
