"use client";

import { useState } from "react";
import { ArrowUpRight, MessageSquare, CheckCircle2 } from "lucide-react";
import QuoteModal from "../ui/QuoteModal";
import { BUSINESS_CONFIG } from "@/lib/business";

export default function FinalCtaSection() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  return (
    <section className="relative px-2 sm:px-3 py-10 sm:py-16">
      <div className="relative overflow-hidden rounded-[22px] sm:rounded-[32px] bg-ink text-bone">
        {/* Warm glow */}
        <div className="absolute -top-40 -right-32 w-[520px] h-[520px] rounded-full bg-[#FFB900]/20 blur-[120px] pointer-events-none" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-16 sm:py-24 lg:py-28 grid lg:grid-cols-12 gap-10 lg:gap-14 items-end">
          <div className="lg:col-span-8">
            <span className="inline-flex items-center gap-2 text-[13px] font-medium text-bone/60 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFB900]" />
              Direct factory partnership
            </span>
            <h2 className="display-lg">
              Ready to build your <em className="accent-serif text-[#FFD466]">next collection?</em>
            </h2>
            <p className="mt-6 text-[15px] sm:text-lg text-bone/65 leading-relaxed max-w-xl">
              Send a sketch or a full tech pack. You&apos;ll get a quote, a sample in {BUSINESS_CONFIG.samplingDaysShort}, and a clear production timeline.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <a
              href="/contact"
              className="group inline-flex items-center justify-between gap-3 pl-6 pr-2 py-2 rounded-full bg-[#FFB900] hover:bg-[#FFC633] text-ink font-semibold text-[15px] transition-colors"
            >
              <span>Start a project</span>
              <span className="w-10 h-10 rounded-full bg-ink flex items-center justify-center transition-transform group-hover:rotate-45">
                <ArrowUpRight className="w-4 h-4 text-[#FFB900]" />
              </span>
            </a>
            <button
              type="button"
              onClick={() => setQuoteModalOpen(true)}
              className="inline-flex items-center justify-center px-6 py-4 rounded-full border border-bone/20 hover:border-bone/50 text-bone font-medium text-[15px] transition-colors cursor-pointer"
            >
              Request a quote
            </button>
            <a
              href={BUSINESS_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-bone/80 hover:text-bone font-medium text-[15px] transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <ul className="lg:col-span-12 pt-8 border-t border-bone/10 grid grid-cols-2 lg:grid-cols-4 gap-4 text-[13px] sm:text-sm text-bone/70">
            {["NDA on every project", `From ${BUSINESS_CONFIG.moqShort} per style`, "Direct factory pricing", "DDP delivery on request"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FFB900] shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
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
