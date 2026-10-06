"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Layers, Ruler, Sparkles, Truck, CheckCircle2 } from "lucide-react";
import { Category } from "@/types/database";

interface CollectionBuyingGuideProps {
  category?: Category;
  faqs?: { q: string; a: string }[];
  categories?: Category[];
}

export default function CollectionBuyingGuide({
  category,
  faqs = [],
  categories = [],
}: CollectionBuyingGuideProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const categoryName = category?.name || "Custom Apparel & Combat Equipment";

  const defaultFaqs = faqs.length > 0 ? faqs : [
    {
      q: `What is the minimum order quantity (MOQ) for ${categoryName}?`,
      a: "Our standard starting MOQ is 30 to 50 pieces per style/colorway across standard size ranges. For comprehensive multi-category drops or trial programs, we offer flexible low-MOQ programs.",
    },
    {
      q: "How fast can I receive a physical pre-production prototype sample?",
      a: "Master physical samples are handcrafted and dispatched via express air courier (DHL Express / FedEx) within 5 to 7 business days following tech pack sign-off.",
    },
    {
      q: "Can you produce custom woven labels, neck tags, and branded packaging?",
      a: "Yes. We offer complete turnkey private label solutions: custom damask neck labels, tyvek side tabs, embossed leather patches, barcode hang tags, and frosted biodegradable zip mailers.",
    },
    {
      q: "Do you ship door-to-door with customs clearance included?",
      a: "Yes. We provide DDP (Delivered Duty Paid) express air and ocean freight to the United States, United Kingdom, Canada, Australia, and European Union with all customs duties handled.",
    },
  ];

  return (
    <section className="mt-20 pt-16 border-t border-neutral-200/90 text-neutral-900">
      {/* 1. Guide Header */}
      <div className="max-w-3xl mb-12">
        <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500 font-bold block mb-2">
          Technical Buyer&apos;s Guide &amp; Factory Specifications
        </span>
        <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-neutral-950 mb-4 leading-tight">
          {categoryName} Procurement &amp; Manufacturing Guide
        </h2>
        <p className="text-sm text-neutral-600 leading-relaxed font-normal">
          Designed for independent brands, athletic clubs, and commercial apparel buyers. Learn how GLOVES STORM engineers premium craftsmanship with direct Sialkot OEM factory pricing, strict quality tolerances, and worldwide export compliance.
        </p>
      </div>

      {/* 2. Four Technical Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 hover:border-neutral-900 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-900 mb-4 shadow-2xs">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-tight text-neutral-950 mb-2">
            1. Premium Raw Materials
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            From certified full-grain cowhides and butter-soft sheepskin to 450+ GSM loopback French Terry and Italian sublimation inks, all textiles undergo colorfastness and tensile stress testing.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 hover:border-neutral-900 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-900 mb-4 shadow-2xs">
            <Ruler className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-tight text-neutral-950 mb-2">
            2. Precision Pattern CAD
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            In-house computerized pattern grading across standard US/EU sizing blocks (XS to 5XL) or tailored made-to-measure custom dimensions with millimeter accuracy.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 hover:border-neutral-900 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-900 mb-4 shadow-2xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-tight text-neutral-950 mb-2">
            3. Turnkey Private Label
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Full bespoke decoration capabilities: 3D high-density silicone prints, chenille varsity patches, laser debossing, direct computerized embroidery, and custom hardware.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 hover:border-neutral-900 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-900 mb-4 shadow-2xs">
            <Truck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-tight text-neutral-950 mb-2">
            4. Global Express Logistics
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Rapid 5–7 day sample delivery with 3–4 week bulk production cycles. Seamless door-to-door air freight with customs duties prepaid to USA, UK, and European ports.
          </p>
        </div>
      </div>

      {/* 3. High-Converting FAQ Accordion with Schema Support */}
      <div className="bg-neutral-50 rounded-3xl border border-neutral-200/80 p-6 sm:p-10 mb-16">
        <div className="max-w-2xl mb-8">
          <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-bold block mb-1">
            Frequently Asked Questions
          </span>
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-950">
            Common Questions About Manufacturing &amp; Ordering
          </h3>
        </div>

        <div className="space-y-3">
          {defaultFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-neutral-200/90 overflow-hidden transition-all duration-200 shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full py-4 px-5 sm:px-6 flex items-center justify-between text-left gap-4 cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-neutral-950 tracking-tight">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-neutral-950 text-white" : "text-neutral-700"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Related Collections Internal Linking Strip (SEO Power) */}
      {categories && categories.length > 0 && (
        <div className="pt-8 border-t border-neutral-200">
          <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-bold block mb-4">
            Explore Sister Production Categories:
          </span>
          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products/${cat.slug}`}
                className="px-4 py-2 rounded-full bg-white border border-neutral-200 hover:border-neutral-900 text-xs font-semibold text-neutral-800 hover:text-neutral-950 transition-colors shadow-2xs"
              >
                Custom {cat.name}
              </Link>
            ))}
            <Link
              href="/manufacturers-usa"
              className="px-4 py-2 rounded-full bg-neutral-100 border border-neutral-200 hover:border-neutral-900 text-xs font-semibold text-neutral-800 hover:text-neutral-950 transition-colors"
            >
              USA Apparel Exporter
            </Link>
            <Link
              href="/manufacturers-uk"
              className="px-4 py-2 rounded-full bg-neutral-100 border border-neutral-200 hover:border-neutral-900 text-xs font-semibold text-neutral-800 hover:text-neutral-950 transition-colors"
            >
              UK Apparel Exporter
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
