"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react";

const faqs = [
  {
    question: "What custom apparel and sportswear does Gloves Storm manufacture?",
    answer:
      "Gloves Storm specializes in custom clothing and sportswear manufacturing, including custom team uniforms, athletic jerseys, gym and fitness activewear, compression sets, heavyweight streetwear hoodies, varsity jackets, and complete private label apparel lines.",
  },
  {
    question: "What is the minimum order quantity (MOQ) for custom clothing and sportswear?",
    answer:
      "Our minimum order quantity starts from 35–50 pieces per style/colorway. This allows growing apparel brands, sports clubs, and established fashion labels to produce custom designs with low risk and flexible sizing breakdowns.",
  },
  {
    question: "Do you manufacture and export custom apparel to the USA and UK?",
    answer:
      "Yes. The USA and UK are our primary export corridors, alongside the EU, Canada, and Australia. We manage end-to-end export logistics with door-to-door DDP (Delivered Duty Paid) air freight (3–5 days) and ocean shipping, handling all customs clearance and documentation.",
  },
  {
    question: "How long does custom clothing sampling take?",
    answer:
      "Pre-production master samples are typically completed in 5–7 working days once tech packs or design mockups are finalized. Master samples are shipped via express courier directly to you for fit, fabric hand-feel, and construction approval before full production.",
  },
  {
    question: "What private label branding options are available for custom clothing?",
    answer:
      "We provide full turnkey private label manufacturing: custom woven neck labels, satin wash care labels, high-density embroidery, screen printing, silicone heat transfers, custom hang tags, barcoded polybags, and retail-ready packaging.",
  },
];

export default function HomeFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-12 sm:py-20 lg:py-28 bg-white border-b border-black/[0.07] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-neutral-800" />
            <span>OEM FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase leading-[1.1]">
            COMMON QUESTIONS ABOUT WORKING WITH US
          </h2>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-slate-600 font-normal">
            Everything you need to know about our direct apparel manufacturing facilities, minimum order quantities, private label services, and international DDP export delivery.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="rounded-xl sm:rounded-2xl border border-slate-200/90 bg-slate-50/50 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-3.5 sm:p-5 md:p-6 text-left flex items-center justify-between gap-3 sm:gap-4 cursor-pointer hover:bg-slate-100/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base md:text-lg font-bold text-slate-900 tracking-tight leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-slate-900 text-white border-slate-900" : ""
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-3.5 sm:px-5 md:px-6 pb-4 sm:pb-6 pt-1 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 sm:mt-10 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 shadow-2xs">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-900 shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-neutral-900">
              Have a custom tech pack or specific question not covered here?
            </span>
          </div>
          <a
            href="https://wa.me/923417146935?text=Hi%20Gloves%20Storm%2C%20I%20have%20a%20question%20about%20custom%20manufacturing."
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 sm:px-5 py-2.5 rounded-full bg-[#FFB900] hover:bg-[#E5A700] text-black text-xs font-extrabold uppercase tracking-wider whitespace-nowrap shrink-0 transition-all shadow-xs w-full sm:w-auto text-center"
          >
            Chat With Factory Team
          </a>
        </div>
      </div>
    </section>
  );
}
