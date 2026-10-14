"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react";
import { JournalFaqItem } from "@/lib/data/journalFaqs";

interface JournalFaqAccordionProps {
  faqs: JournalFaqItem[];
  title?: string;
  subtitle?: string;
}

export default function JournalFaqAccordion({
  faqs,
  title = "Frequently Asked Questions",
  subtitle = "Essential answers regarding custom manufacturing, minimum order quantities, sampling, and private labeling.",
}: JournalFaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="my-14 pt-10 border-t border-neutral-200" id="faqs">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-800 text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-neutral-900" />
          <span>Manufacturer Q&amp;A</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="space-y-3.5">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.question}
              className="rounded-2xl border border-neutral-200/90 bg-neutral-50/50 overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-100/50 transition-colors select-none"
                aria-expanded={isOpen}
              >
                <span className="text-sm sm:text-base md:text-lg font-bold text-neutral-900 tracking-tight">
                  {faq.question}
                </span>
                <div
                  className={`w-7 h-7 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-700 shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 bg-neutral-900 text-white border-neutral-900" : ""
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm md:text-base text-neutral-600 leading-relaxed border-t border-neutral-200/60 bg-white">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-neutral-900 shrink-0" />
          <span className="text-xs sm:text-sm font-medium text-neutral-900">
            Have a custom tech pack or inquiry not addressed here?
          </span>
        </div>
        <a
          href="https://wa.me/923417146935?text=Hi%20Gloves%20Storm%2C%20I%20have%20a%20question%20about%20my%20apparel%20production."
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#FFB900] hover:bg-[#E5A700] text-black font-extrabold rounded-xl px-5 py-2.5 text-xs uppercase tracking-wider shrink-0 transition-all shadow-xs"
        >
          <span>Ask Factory on WhatsApp</span>
        </a>
      </div>
    </section>
  );
}
