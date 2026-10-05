"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  CheckCircle2,
  Plane,
  Ship,
  Truck,
  FileCheck,
  Building2,
  DollarSign,
  ArrowUpRight,
  ChevronDown,
  HelpCircle,
  Clock,
  Box,
} from "lucide-react";
import { usaFaqs } from "@/lib/data/exportFaqs";

const usaCategories = [
  {
    title: "Custom Team Sports Uniforms",
    link: "/products/sportswear-teamwear",
    image: "/images/products/basketball-uniform.jpg",
    desc: "Full dye-sublimated football uniforms, basketball jerseys, baseball kits, and tracksuits printed with authentic Italian Kiian non-fading inks.",
    tag: "USA Sports Leagues",
  },
  {
    title: "Private Label Activewear",
    link: "/products/gym-fitness-wear",
    image: "/images/products/gym-leggings.jpg",
    desc: "Squat-proof 280–320 GSM recycled nylon-spandex leggings, high-support sports bras, and seamless athletic sets for American fitness brands.",
    tag: "USA Fitness Labels",
  },
  {
    title: "Heavyweight Streetwear Hoodies",
    link: "/products/clothing-streetwear",
    image: "/images/products/hoodie-black.png",
    desc: "450–500 GSM combed cotton French Terry hoodies, oversized boxy tees, and sweatpants with 3D puff embroidery and high-density screen prints.",
    tag: "US Streetwear Labels",
  },
  {
    title: "Custom Varsity & Outerwear Jackets",
    link: "/products/clothing-streetwear",
    image: "/images/products/varsity-jacket.jpg",
    desc: "Premium wool body varsity jackets with genuine leather sleeves, custom chenille patches, metal snap buttons, and quilted diamond lining.",
    tag: "American Apparel Brands",
  },
  {
    title: "Performance Gym & Training Wear",
    link: "/products/gym-fitness-wear",
    image: "/images/products/rash-guard.jpg",
    desc: "Moisture-wicking athletic tees, dry-fit training tanks, 2-in-1 compression shorts, and fleece joggers tailored for American fitness culture.",
    tag: "USA Gym Brands",
  },
  {
    title: "Custom Private Label Packaging",
    link: "/products/custom-manufacturing-private-label",
    image: "/images/products/luxury-packaging.jpg",
    desc: "Custom woven damask neck labels, soft-touch matte hang tags, barcoded polybags, and retail-ready packaging optimized for USA warehousing.",
    tag: "Turnkey OEM/ODM",
  },
];

const usaSteps = [
  {
    step: "01",
    title: "Submit Requirements",
    desc: "Provide your tech pack, sketch, or physical reference garment specifying product style, sizing curves, and quantity.",
  },
  {
    step: "02",
    title: "24-Hour Quote",
    desc: "Our production engineering team reviews your specs and delivers an itemized USD manufacturing quote and timeline.",
  },
  {
    step: "03",
    title: "Prototype Sampling",
    desc: "A physical master prototype is handcrafted in 5 to 7 days, complete with your custom branding and embroidery.",
  },
  {
    step: "04",
    title: "Air Delivery to USA",
    desc: "Your sample is couriered directly to your US address for fit, feel, material, and construction sign-off.",
  },
  {
    step: "05",
    title: "Bulk Production & QC",
    desc: "Upon approval, bulk cutting and stitching commence under strict AQL 2.5 multi-point quality control.",
  },
  {
    step: "06",
    title: "Insured DDP Delivery",
    desc: "Finished export cartons ship DDP directly to your US warehouse, 3PL, or Amazon FBA center.",
  },
];

export default function ManufacturersUsaClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="pt-28 pb-24 bg-transparent min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Hero Section */}
        <div className="max-w-4xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-[11px] font-mono uppercase tracking-[0.2em] mb-5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>🇺🇸 EXPORT MARKET CORRIDOR · DIRECT USA APPAREL PARTNERSHIP</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-[1.08] uppercase">
            CUSTOM CLOTHING &amp; SPORTSWEAR MANUFACTURER FOR USA BRANDS
          </h1>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            Gloves Storm is a direct OEM apparel manufacturing partner for sportswear brands, athletic organizations, collegiate teams, and clothing labels across the United States. We manufacture custom athletic uniforms, technical activewear, heavyweight streetwear, and turnkey private label apparel direct to USA clients with door-to-door DDP air freight, full US customs documentation, and insured delivery to any US warehouse, 3PL, or Amazon FBA center.
          </p>
        </div>

        {/* USA Trust Bar */}
        <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl mb-20">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🇺🇸</span>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block font-bold">
                  United States Corridor
                </span>
                <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                  USA is Our Primary Export Market
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>DDP Air in 3–5 days after dispatch</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Full US customs docs provided</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Ships to any 3PL or Amazon FBA</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Standard USD invoicing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Why USA Brands Source From Sialkot */}
        <div className="mb-24">
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-amber-800 font-mono block mb-2 font-bold">
              The Manufacturing Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900">
              WHY USA APPAREL &amp; SPORTS BRANDS SOURCE FROM GLOVES STORM
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm sm:text-base text-slate-600 leading-relaxed">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-700" />
                Global Hub of Textile &amp; Sports Apparel Craftsmanship
              </h3>
              <p>
                Sialkot, Pakistan is recognized globally as the premier export epicenter of high-performance sports goods and technical apparel. For decades, master textile technicians, pattern makers, and stitchers have refined precision grading, multi-panel athletic compression, and seam reinforcement required by leading international athletic brands.
              </p>
              <p>
                Gloves Storm elevates this foundation with computerized Gerber laser spreading tables, Tajima multi-head 3D embroidery, and Italian digital sublimation machinery, giving American brand owners uncompromised craftsmanship married with automated industrial repeatability.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-700" />
                60%–80% Cost Advantage vs Domestic US Manufacturing
              </h3>
              <p>
                Domestic cut-and-sew factories in the United States face severe labor and overhead constraints, routinely charging $35 to $65 for an unbranded basic fleece hoodie or blank boxing glove. By partnering directly with Gloves Storm in Sialkot, American brands obtain full retail-grade, custom-milled, fully branded products at 60% to 80% lower unit costs.
              </p>
              <p>
                These savings allow American brands to preserve healthy 65%+ gross margins, fund digital customer acquisition, and scale inventory without surrendering product quality or craftsmanship.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Box className="w-5 h-5 text-blue-700" />
                Startup-Accessible Low MOQs (From 25 Pieces)
              </h3>
              <p>
                Most large overseas and domestic factories demand rigid minimum order quantities of 300 to 500 units per colorway, locking emerging brands out of custom manufacturing. Gloves Storm offers flexible startup tiers starting at just 25 to 50 pieces per style.
              </p>
              <p>
                This allows American gym owners, collegiate clubs, and direct-to-consumer founders to validate new product silhouettes, test limited-edition drops, and manage cash flow responsibly without dead stock.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-700" />
                Direct Factory Partnership with Zero Middlemen
              </h3>
              <p>
                When you work with Gloves Storm, there are no trading houses, third-party sales brokers, or overseas agents inflating prices and distorting communication. You communicate directly with English-speaking factory engineers and master pattern makers who read tech packs, review CAD sizing curves, and provide unedited video updates from the stitching floor.
              </p>
              <p>
                Confidentiality agreements (NDAs) are standard, ensuring your proprietary patterns, tech packs, and brand assets remain 100% protected.
              </p>
            </div>
          </div>
        </div>

        {/* Section: What We Manufacture for USA Clients */}
        <div className="mb-24">
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-amber-800 font-mono block mb-2 font-bold">
              Product Catalog for American Brands
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900">
              WHAT WE MANUFACTURE FOR USA CLIENTS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {usaCategories.map((item) => (
              <Link
                key={item.title}
                href={item.link}
                className="group p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)] hover:-translate-y-1.5 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 w-full rounded-2xl overflow-hidden bg-slate-900 mb-4">
                    <Image
                      src={item.image}
                      alt={`${item.title} manufacturer for USA brands`}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-mono text-slate-900 font-bold">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-800 transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900">
                  <span>View Specifications</span>
                  <ArrowUpRight className="w-4 h-4 text-amber-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Section: Shipping & Logistics to the USA */}
        <div className="mb-24 p-8 sm:p-12 rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800">
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-amber-400 font-mono block mb-2 font-bold">
              Door-to-Door Logistics
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              SHIPPING &amp; LOGISTICS TO THE USA
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300">
              We eliminate international freight anxiety. From customs clearance to final delivery at your loading dock, your shipment is fully tracked and insured.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center">
                <Plane className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Air Freight: 3–5 Days</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Direct express air via DHL Express and FedEx. Ideal for master sample prototypes, urgent replenishment runs, and high-margin seasonal drops.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-400/20 text-blue-400 flex items-center justify-center">
                <Ship className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Sea Freight: 24–30 Days</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cost-effective LCL and FCL ocean container shipping into major US ports (Long Beach, Los Angeles, New York/New Jersey, Savannah).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/20 text-emerald-400 flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Turnkey DDP Delivery</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We handle export documentation in Pakistan, international transit, US customs duties, and final delivery to any US commercial address or 3PL.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-400/20 text-purple-400 flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Complete US Documentation</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Full documentation pack supplied: Commercial Invoice, Packing List, Bill of Lading / Airway Bill, and Certificate of Origin for US Customs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-400/20 text-rose-400 flex items-center justify-center">
                <Box className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Amazon FBA &amp; 3PL Ready</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                FNSKU item barcoding, suffocation warning polybags, and Amazon-compliant carton dimensions applied at the factory before export.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Total Timeline: 6–8 Weeks</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                From initial tech pack review and prototype sign-off to bulk stitching, AQL 2.5 inspection, and final doorstep delivery in the USA.
              </p>
            </div>
          </div>
        </div>

        {/* Section: How to Start Your USA Order */}
        <div className="mb-24">
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-amber-800 font-mono block mb-2 font-bold">
              Simple 6-Stage Process
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900">
              HOW TO START YOUR USA ORDER
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {usaSteps.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:border-amber-400/60 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-black font-mono text-amber-700 block mb-2">
                    {step.step}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-24 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-mono uppercase tracking-[0.2em] mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
              <span>USA EXPORT FAQS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase">
              FREQUENTLY ASKED QUESTIONS — USA CLIENTS
            </h2>
          </div>

          <div className="space-y-4">
            {usaFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-base font-bold text-slate-900 tracking-tight">
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 transition-transform ${
                        isOpen ? "rotate-180 bg-slate-900 text-white" : ""
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 sm:p-14 rounded-3xl bg-slate-900 text-white shadow-2xl border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-400 block mb-2 font-bold">
              Fast 24-Hour Quotation
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-3">
              GET A FREE QUOTE FOR YOUR USA ORDER
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Share your tech packs, target quantities, and design specifications. Our direct Sialkot engineering team will review requirements and respond with tiered pricing within 24 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 shrink-0">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Request USA Quote</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/923417146935?text=Hi%20Gloves%20Storm%2C%20I'm%20a%20USA%20brand%20interested%20in%20custom%20manufacturing."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-full bg-emerald-600/30 border border-emerald-500/50 text-emerald-300 font-bold text-xs uppercase tracking-wider hover:bg-emerald-600/40 transition-all"
            >
              WhatsApp Direct
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
