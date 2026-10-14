"use client";

import { useState } from "react";
import { ArrowUpRight, MessageSquare, Sparkles, CheckCircle2 } from "lucide-react";
import QuoteModal from "../ui/QuoteModal";
import GooeyButton from "../ui/GooeyButton";

export default function FinalCtaSection() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  return (
    <section className="py-12 sm:py-18 lg:py-24 bg-white relative overflow-hidden text-center border-t border-black/[0.06]">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl sm:rounded-3xl bg-white border border-neutral-200/90 p-4 sm:p-8 lg:p-12 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-neutral-100 border border-neutral-200 mb-4 sm:mb-5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-black shrink-0" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-neutral-900 font-mono font-bold">
              Direct Sialkot Factory Partnership
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-[-0.03em] text-[#111827] leading-[1.12] sm:leading-[1.05] mb-3 sm:mb-4">
            READY TO BUILD <br />
            <span className="text-black">
              YOUR NEXT COLLECTION?
            </span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-neutral-600 max-w-xl mx-auto font-normal leading-relaxed mb-6 sm:mb-8">
            Tell us what you&apos;re building. We&apos;ll turn your concept or tech pack into physical production with guaranteed lead times, direct factory pricing, and transparent Sialkot communication.
          </p>

          {/* 3 Action Buttons in Light Mode */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 max-w-xs sm:max-w-none mx-auto mb-6 sm:mb-8">
            <GooeyButton
              href="/contact"
              variant="gold-solid"
              size="md"
              className="w-full sm:w-auto shadow-sm"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </GooeyButton>

            <GooeyButton
              onClick={() => setQuoteModalOpen(true)}
              variant="outline"
              size="md"
              className="w-full sm:w-auto bg-white"
            >
              <span>REQUEST A QUOTE</span>
            </GooeyButton>

            <a
              href="https://wa.me/923417146935?text=Hi%20Gloves%20Storm%2C%20I'm%20interested%20in%20custom%20manufacturing%20and%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-black bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>WHATSAPP US</span>
            </a>
          </div>

          {/* Trust Badges in Frosted Pill Cards */}
          <div className="pt-5 sm:pt-6 border-t border-black/[0.06] flex flex-wrap items-center justify-center gap-3 sm:gap-6 lg:gap-8 text-[11px] sm:text-xs text-neutral-600 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900" />
              <span>Strict NDAs Respected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900" />
              <span>Low MOQ: 25–50 Pcs</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900" />
              <span>Direct Mill Pricing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900" />
              <span>DDP Air & Ocean Freight</span>
            </div>
          </div>
        </div>
      </div>

      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultProductName="New Custom Collection"
        defaultCategory="Sportswear & Teamwear"
      />
    </section>
  );
}
