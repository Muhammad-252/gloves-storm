"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Plane,
  Ship,
  Truck,
  Building2,
  Euro,
  ArrowUpRight,
  ChevronDown,
  HelpCircle,
  Clock,
  Box,
  BadgeCheck,
  Ruler,
  Globe,
  Sparkles,
} from "lucide-react";
import { ExportFaqItem } from "@/lib/data/exportFaqs";
import { BUSINESS_CONFIG } from "@/lib/business";

export interface EuropeCorridorConfig {
  countrySlug: string;
  countryName: string;
  flag: string;
  heroTag: string;
  heroTitle: string;
  heroDescription: string;
  currency: string;
  airHub: string;
  vatNotice: string;
  sizingNotice: string;
  /** Category slugs, in order of preference, for the live product grid */
  productCategories: string[];
  faqs: ExportFaqItem[];
}

export default function EuropeCorridorClient({
  config,
  productSection,
}: {
  config: EuropeCorridorConfig;
  /** Live product grid rendered on the server (DynamicProductGrid) */
  productSection?: React.ReactNode;
}) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="pt-20 sm:pt-28 pb-16 sm:pb-24 bg-transparent text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Hero Section */}
        <div className="rounded-2xl sm:rounded-3xl bg-white/80 backdrop-blur-xl border border-white/90 p-5 sm:p-8 md:p-12 lg:p-16 mb-8 sm:mb-14 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 mb-4 sm:mb-5 shadow-2xs">
              <span className="text-sm">{config.flag}</span>
              <span className="text-[10px] sm:text-xs text-neutral-800 font-medium">
                {config.heroTag}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] text-ink leading-[1.1] mb-4 sm:mb-6">
              {config.heroTitle}
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed font-normal mb-6 sm:mb-8">
              {config.heroDescription}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#FFB900] hover:bg-[#E5A700] text-black font-medium text-xs transition-all shadow-md"
              >
                <span>Request sampling &amp; RFQ</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-neutral-50 text-slate-900 font-medium text-xs border border-slate-200 transition-all shadow-2xs"
              >
                <span>Explore catalog specifications</span>
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200/80 relative z-10">
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/70 backdrop-blur-md border border-white/80">
              <span className="text-lg sm:text-2xl font-black font-mono text-slate-900 block">
                {BUSINESS_CONFIG.moqShort}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-medium">Low Factory MOQ</span>
            </div>
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/70 backdrop-blur-md border border-white/80">
              <span className="text-lg sm:text-2xl font-black font-mono text-slate-900 block">
                {BUSINESS_CONFIG.samplingDaysShort}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-medium">Physical Master Samples</span>
            </div>
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/70 backdrop-blur-md border border-white/80">
              <span className="text-lg sm:text-2xl font-black font-mono text-slate-900 block">DDP EU</span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-medium">Door-to-Door Freight</span>
            </div>
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/70 backdrop-blur-md border border-white/80">
              <span className="text-lg sm:text-2xl font-black font-mono text-slate-900 block">Metric</span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-medium">European Size Curves</span>
            </div>
          </div>
        </div>

        {/* 2. DDP Shipping, VAT & Quality Standards Pillars */}
        <div className="mb-12 sm:mb-20">
          <div className="max-w-3xl mb-8">
            <span className="text-[10px] sm:text-xs text-neutral-500 block mb-2 font-medium">
              European trade advantage
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.04em] text-ink leading-tight">
              Direct Sialkot manufacturing with European logistics
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-ink tracking-[-0.02em] flex items-center gap-2">
                <Truck className="w-5 h-5 text-slate-900 shrink-0" />
                <span>Turnkey DDP Delivery &amp; Air Express</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                On DDP (Delivered Duty Paid) orders, Gloves Storm manages the entire logistics chain from our Sialkot factory to your doorstep. Express air cargo departs directly into major European transit gateways ({config.airHub}) with final delivery via DHL, UPS, or DPD in 4 to 7 working days.
              </p>
            </div>

            <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-ink tracking-[-0.02em] flex items-center gap-2">
                <Euro className="w-5 h-5 text-slate-900 shrink-0" />
                <span>EU VAT &amp; Customs Compliance</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {config.vatNotice}
              </p>
            </div>

            <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-ink tracking-[-0.02em] flex items-center gap-2">
                <Ruler className="w-5 h-5 text-slate-900 shrink-0" />
                <span>Metric EU Sizing &amp; Grading</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {config.sizingNotice}
              </p>
            </div>

            <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-ink tracking-[-0.02em] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-slate-900 shrink-0" />
                <span>EU REACH &amp; OEKO-TEX Standard 100</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                All performance textiles, synthetic blends, dyes, and trims meet European REACH chemical safety requirements and OEKO-TEX parameters. We use certified non-toxic Italian sublimation inks, nickel-free hardware, and hypoallergenic combed cottons.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Live products from the admin catalog */}
        {productSection}

        {/* 4. FAQs Section */}
        <div className="mb-12 sm:mb-20">
          <div className="max-w-3xl mb-8">
            <span className="text-[10px] sm:text-xs text-neutral-500 block mb-2 font-medium">
              TRADE &amp; LOGISTICS QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.04em] text-ink leading-tight">
              Frequently asked questions ({config.countryName})
            </h2>
          </div>

          <div className="space-y-3">
            {config.faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-slate-700 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-black" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Direct RFQ Banner */}
        <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-neutral-950 text-white text-center relative overflow-hidden shadow-xl">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#FFB900] text-[10px] font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct factory partnership</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-[-0.04em]">
              Start manufacturing for {config.countryName}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Send your tech pack, mockup, or reference sample. We provide direct Sialkot factory pricing, European metric grading, and rapid DDP air shipping.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#FFB900] hover:bg-[#E5A700] text-black font-medium text-xs transition-all shadow-md"
              >
                REQUEST FACTORY QUOTE &amp; SAMPLE
              </Link>
              <a
                href="https://wa.me/923417146935?text=Hi%20Gloves%20Storm%2C%20I'm%20interested%20in%20custom%20manufacturing%20for%20European%20export."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/20 transition-all"
              >
                Whatsapp factory director
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
