"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react";

const faqs = [
  {
    question: "Where are Gloves Storm boxing gloves manufactured?",
    answer:
      "Gloves Storm boxing gloves are manufactured at our direct factory in Sialkot, Pakistan. Sialkot produces over 70% of the world's hand-stitched sports goods and has been the global hub for boxing glove manufacturing for over a century.",
  },
  {
    question: "What is the minimum order quantity for custom boxing gloves?",
    answer:
      "The minimum order quantity for custom boxing gloves at Gloves Storm is 25–50 pairs per design, depending on the style. We work with startup brands and established distributors alike.",
  },
  {
    question: "Do you manufacture custom boxing gloves for USA brands?",
    answer:
      "Yes. The USA is our primary export market. We manufacture custom boxing gloves, fight gear, sportswear and activewear for USA brands, gyms, sports teams and distributors with door-to-door DDP air and sea shipping.",
  },
  {
    question: "How long does it take to get a sample of custom boxing gloves?",
    answer:
      "Pre-production master samples for custom boxing gloves are produced in 7–10 working days at Gloves Storm. Samples are shipped directly to your doorstep for fit, feel and quality sign-off before bulk production begins.",
  },
  {
    question: "Can Gloves Storm manufacture private label sportswear for my brand?",
    answer:
      "Yes — Gloves Storm is a full private label manufacturer. Every product is produced with your branding: custom woven neck labels, hang tags, embossed patches, barcoding and retail-ready packaging. Your customers only ever see your brand.",
  },
];

export default function HomeFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 sm:py-32 bg-white border-b border-black/[0.07] relative">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-[11px] font-mono uppercase tracking-[0.2em] mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>OEM FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">
            COMMON QUESTIONS ABOUT WORKING WITH US
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal">
            Everything you need to know about our Sialkot manufacturing facility, minimum order quantities, and international delivery.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-slate-200/90 bg-slate-50/50 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-100/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-slate-900 text-white border-slate-900" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-amber-700 shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-amber-950">
              Have a custom tech pack or specific question not covered here?
            </span>
          </div>
          <a
            href="https://wa.me/923417146935?text=Hi%20Gloves%20Storm%2C%20I%20have%20a%20question%20about%20custom%20manufacturing."
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold uppercase tracking-wider whitespace-nowrap shrink-0 transition-all"
          >
            Chat With Factory Team
          </a>
        </div>
      </div>
    </section>
  );
}
