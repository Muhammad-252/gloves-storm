"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MessageSquare, ShieldCheck } from "lucide-react";
import QuoteModal from "../ui/QuoteModal";
import GooeyButton from "../ui/GooeyButton";

export default function FinalCtaSection() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  return (
    <section className="py-32 sm:py-40 bg-[#0C0D0E] relative overflow-hidden text-center">
      {/* Background atmospheric glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#FF6B00]/[0.06] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-[#FF6B00]/[0.04] rounded-full blur-[80px] pointer-events-none" />

      {/* Top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-[#FF6B00]/40 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8">
        <span className="text-xs uppercase tracking-[0.3em] text-[#FF6B00] font-mono block mb-4 font-bold">
          Direct Sialkot Factory Partnership
        </span>

        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-black uppercase tracking-[-0.04em] text-[#F5F5F7] leading-[0.93] mb-6">
          READY TO BUILD <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#ff8533] to-[#FF6B00]">
            YOUR NEXT COLLECTION?
          </span>
        </h2>

        <p className="text-base sm:text-lg text-[#9E9EA7] max-w-2xl mx-auto font-normal leading-relaxed mb-12">
          Tell us what you&apos;re building. We&apos;ll help turn your concept into physical production with guaranteed lead times and transparent factory communication.
        </p>

        {/* 3 Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <GooeyButton
            href="/contact"
            variant="gold-solid"
            size="lg"
            className="w-full sm:w-auto shadow-[0_8px_40px_rgba(255,107,0,0.35)]"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </GooeyButton>

          <GooeyButton
            onClick={() => setQuoteModalOpen(true)}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <span>REQUEST A QUOTE</span>
          </GooeyButton>

          <GooeyButton
            href="https://wa.me/923417146935?text=Hi%20Gloves%20Storm%2C%20I'm%20interested%20in%20custom%20manufacturing%20and%20would%20like%20to%20discuss%20a%20project."
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            <span>WHATSAPP US</span>
          </GooeyButton>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-8 border-t border-white/[0.07] flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#9E9EA7]">
          {[
            "NDAs Respected",
            "Low MOQ Starting at 25-50 Pcs",
            "Direct Sialkot Factory Pricing",
          ].map((badge) => (
            <div key={badge} className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FF6B00]" />
              <span>{badge}</span>
            </div>
          ))}
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
