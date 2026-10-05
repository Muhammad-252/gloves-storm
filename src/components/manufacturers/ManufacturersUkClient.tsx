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
  PoundSterling,
  ArrowUpRight,
  ChevronDown,
  HelpCircle,
  Clock,
  Box,
  BadgeCheck,
  ShoppingBag,
} from "lucide-react";
import { ukFaqs } from "@/lib/data/exportFaqs";

const ukCategories = [
  {
    title: "Custom Boxing Gloves",
    link: "/products/boxing-equipment",
    image: "/images/products/boxing-gloves-black.png",
    desc: "10oz, 12oz, 14oz, 16oz. 1.2mm AAA cowhide leather, 5-layer composite foam core, lace-up or hook-and-loop. British Boxing Board of Control (BBBofC) specification compatible for gym and sparring use.",
    tag: "UK Fight Brands",
  },
  {
    title: "Combat Sports Equipment",
    link: "/products/boxing-equipment",
    image: "/images/products/boxing-mma-gloves.jpg",
    desc: "Open-palm MMA gloves, high-density curved shin guards, padded headgear, heavy-duty punch bags, and focus mitts engineered for UK combat gyms and martial arts clubs.",
    tag: "UK Martial Arts",
  },
  {
    title: "Football & Rugby Teamwear",
    link: "/products/sportswear-teamwear",
    image: "/images/products/basketball-uniform.jpg",
    desc: "Full dye-sublimated kits, match jerseys, training bibs, and weather-resistant tracksuits. Durable technical fabrics with moisture-wicking and thermal retention built for British weather.",
    tag: "UK Clubs & Academies",
  },
  {
    title: "Private Label Activewear",
    link: "/products/gym-fitness-wear",
    image: "/images/products/gym-leggings.jpg",
    desc: "Squat-proof 280–320 GSM recycled nylon-spandex leggings, high-support sports bras, compression base layers, and seamless sets for UK boutique fitness brands.",
    tag: "UK Fitness Labels",
  },
  {
    title: "Heavyweight Streetwear",
    link: "/products/clothing-streetwear",
    image: "/images/products/hoodie-black.png",
    desc: "400+ GSM combed cotton French Terry hoodies, oversized boxy tees, track pants, and custom varsity jackets tailored for the UK streetwear and urban fashion scene.",
    tag: "UK Clothing Labels",
  },
  {
    title: "Club Merchandise & Accessories",
    link: "/products/custom-manufacturing-private-label",
    image: "/images/products/rash-guard.jpg",
    desc: "Custom knit beanies, barrel gym duffels, water-resistant coach jackets, silicone caps, and branded club accessories for British sports teams and fitness studios.",
    tag: "UK Gyms & Merch",
  },
];

const ukOrders = [
  {
    profile: "Independent UK Fight Brand Launch",
    volume: "50 Pairs Gloves + 100 Rash Guards",
    specs: "50 pairs 14oz & 16oz cowhide gloves + 100 sublimated 250 GSM rash guards. Custom embossed wrist patches, woven neck labels, and retail zip polybags.",
    leadTime: "21 days from sample approval",
  },
  {
    profile: "London & Manchester Gym Merch",
    volume: "100 Pairs Gloves + 250 Apparel Units",
    specs: "100 pairs gym-branded training gloves + 200 heavyweight 240 GSM tees + 50 custom 420 GSM French Terry hoodies. Retail-ready barcode tags.",
    leadTime: "24 days from sample approval",
  },
  {
    profile: "Amateur Football & Rugby Club Kits",
    volume: "30 Complete Kits + 15 Coach Jackets",
    specs: "30 full team kits (sublimated match shirts, shorts, socks) + 15 water-resistant fleece-lined coach jackets. Italian Kiian vibrant ink sublimation.",
    leadTime: "14 days from design sign-off",
  },
  {
    profile: "Boutique UK Fitness Brand Activewear",
    volume: "300 Matching Athletic Sets",
    specs: "150 seamless compression leggings + 150 high-support sports bras across 3 custom Pantone colourways. 300 GSM squat-proof fabric with silicone logos.",
    leadTime: "25 days from sample approval",
  },
];

const ukSteps = [
  {
    step: "01",
    title: "Submit Requirements",
    desc: "Share your tech pack, CAD drawing, or physical reference garment outlining sizing curves, materials, and target quantity.",
  },
  {
    step: "02",
    title: "24-Hour GBP Quote",
    desc: "Our production engineers review specs and provide an itemized quote in British Pounds (£) or USD with realistic timelines.",
  },
  {
    step: "03",
    title: "Prototype Sampling",
    desc: "Your master prototype is handcrafted in Sialkot in 7 to 10 days, complete with bespoke embroidery, print, and branding.",
  },
  {
    step: "04",
    title: "Express Courier to UK",
    desc: "The prototype is flown via DHL/FedEx to London, Manchester, Birmingham, or any UK address for fit and material sign-off.",
  },
  {
    step: "05",
    title: "Bulk Production & QC",
    desc: "Stitching and assembly proceed under strict AQL 2.5 quality control, with full video documentation from the factory floor.",
  },
  {
    step: "06",
    title: "Insured DDP UK Delivery",
    desc: "Finished cartons clear HMRC customs and are delivered directly to your gym, warehouse, or 3PL facility with zero import hassle.",
  },
];

export default function ManufacturersUkClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="pt-28 pb-24 bg-transparent min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Hero Section */}
        <div className="max-w-4xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-[11px] font-mono uppercase tracking-[0.2em] mb-5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>🇬🇧 EXPORT MARKET CORRIDOR · DIRECT UK PARTNERSHIP</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-[1.08] uppercase">
            CUSTOM BOXING GLOVES &amp; SPORTSWEAR MANUFACTURER FOR UK BRANDS
          </h1>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            Gloves Storm is a direct Sialkot OEM manufacturing partner for British combat fight brands, boxing gyms, martial arts academies, sports clubs, and streetwear labels across the United Kingdom. Operating directly out of Sialkot, Pakistan — the global epicentre of leather craftsmanship producing over 70% of the world&apos;s hand-stitched sports goods — we engineer custom boxing gloves, MMA equipment, football and rugby kits, activewear, and heavyweight streetwear. We deliver directly to London, Manchester, Birmingham, Glasgow, and throughout Great Britain with door-to-door DDP air freight via Heathrow and Manchester airports, full UK customs and VAT clearance, GBP (£) invoicing, and full compliance with CE and UKCA safety standards.
          </p>
        </div>

        {/* UK Trust Bar */}
        <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl mb-20">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🇬🇧</span>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block font-bold">
                  United Kingdom Corridor
                </span>
                <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Active Export Market Since 2019
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>DDP UK shipping — all duty &amp; VAT handled</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Invoicing in GBP (£) or USD available</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>CE &amp; UKCA compliance documentation</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>EORI &amp; EUR.1 trade documentation ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Why UK Fight Brands & Sportswear Labels Source From Sialkot */}
        <div className="mb-24">
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-amber-800 font-mono block mb-2 font-bold">
              The Manufacturing Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900">
              WHY UK FIGHT BRANDS &amp; SPORTSWEAR LABELS SOURCE FROM SIALKOT
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm sm:text-base text-slate-600 leading-relaxed">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-700" />
                Sialkot&apos;s Leather Craftsmanship Heritage
              </h3>
              <p>
                For generations, master tanners, cutters, and leather artisans in Sialkot have perfected the exact ergonomics, ounce weight distributions, and multi-layer foam padding required by combat sports commissions. Sialkot produces over 70% of the world&apos;s premium hand-stitched sports goods. Pakistani cowhide leather is famed worldwide for its superior tensile strength, rich grain, and supple hand-feel that outlasts synthetic alternatives.
              </p>
              <p>
                Gloves Storm pairs this artisan legacy with automated CAD laser cutting, Tajima multi-head computerized embroidery, and Italian digital sublimation printing, providing UK brands with master-grade craftsmanship at industrial scale.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Truck className="w-5 h-5 text-emerald-700" />
                The DDP UK Advantage (Post-Brexit Simplicity)
              </h3>
              <p>
                Navigating international import paperwork post-Brexit can be daunting for UK business owners. Gloves Storm eliminates all freight friction by operating under full DDP (Delivered Duty Paid) shipping terms.
              </p>
              <p>
                We handle export clearances from Pakistan, international air carriage into London Heathrow (LHR) or Manchester (MAN), HMRC UK customs declaration, import VAT, and final-mile courier delivery via DPD or Parcelforce directly to your door. You receive your finished products without surprise fees, customs delays, or clearance headaches.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-700" />
                UKCA &amp; CE Marking Compliance
              </h3>
              <p>
                For UK fight clubs, commercial boxing gyms, and retail sports brands, safety compliance is non-negotiable. Gloves Storm manufactures boxing gloves, sparring equipment, and protective gear according to stringent European CE (EN 13277) benchmarks and UKCA technical standards.
              </p>
              <p>
                We provide material batch testing, multi-layer high-density shock-absorbing foams, anatomical thumb locks, and reinforced wrist wraps designed to pass gym safety audits and protect athletes in sparring and competition.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <PoundSterling className="w-5 h-5 text-indigo-700" />
                50%–70% Gross Margins for UK Resellers
              </h3>
              <p>
                UK brand owners sourcing through domestic wholesalers or London and Manchester middlemen frequently sacrifice 40% or more of their gross profit margin to broker markups. By establishing a direct OEM factory partnership with Gloves Storm in Sialkot, you purchase at genuine factory-gate prices.
              </p>
              <p>
                This delivers healthy 50% to 70% gross margins on your retail sales, enabling you to competitively price your gear, invest aggressively in UK digital advertising, and scale your brand sustainably.
              </p>
            </div>
          </div>
        </div>

        {/* Section: What We Manufacture for UK Clients */}
        <div className="mb-24">
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-amber-800 font-mono block mb-2 font-bold">
              Product Catalog for British Brands
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900">
              WHAT WE MANUFACTURE FOR UK CLIENTS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {ukCategories.map((item) => (
              <Link
                key={item.title}
                href={item.link}
                className="group p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)] hover:-translate-y-1.5 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 w-full rounded-2xl overflow-hidden bg-slate-900 mb-4">
                    <Image
                      src={item.image}
                      alt={`${item.title} manufacturer for UK brands`}
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

        {/* Section: Shipping & Logistics to the United Kingdom */}
        <div className="mb-24 p-8 sm:p-12 rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800">
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-amber-400 font-mono block mb-2 font-bold">
              Door-to-Door Logistics
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              SHIPPING &amp; LOGISTICS TO THE UNITED KINGDOM
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300">
              We eliminate post-Brexit customs friction. From Pakistan export clearance to HMRC declarations and final delivery via DPD or Parcelforce, your shipment is fully tracked and insured.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center">
                <Plane className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Air Freight: 4–6 Days</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Direct express air via DHL and FedEx into London Heathrow (LHR) or Manchester (MAN). Best for samples and production runs under 500 pcs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-400/20 text-blue-400 flex items-center justify-center">
                <Ship className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Sea Freight: 20–25 Days</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cost-effective LCL and FCL ocean container shipping from Karachi port to Southampton, Felixstowe, or London Gateway for orders 500+ pcs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/20 text-emerald-400 flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Turnkey DDP Shipping</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Gloves Storm handles Pakistan export clearance, UK customs entry, import VAT, and final-mile courier delivery directly to your facility.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-400/20 text-purple-400 flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Post-Brexit EORI Support</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We provide commercial invoices with correct 8-digit UK commodity codes, Certificate of Origin, and assist with GB EORI paperwork.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-400/20 text-rose-400 flex items-center justify-center">
                <PoundSterling className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">GBP (£) Invoicing Available</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Invoices and payment details provided in British Pounds Sterling (GBP) to streamline bookkeeping and avoid foreign exchange volatility.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Total Timeline: 4–7 Weeks</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                From initial tech pack review and 7–10 day prototype sign-off to bulk stitching, AQL 2.5 inspection, and final doorstep delivery in the UK.
              </p>
            </div>
          </div>
        </div>

        {/* Section: Most Popular UK Orders (Real Specs) */}
        <div className="mb-24">
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-amber-800 font-mono block mb-2 font-bold">
              Proven Production Profiles
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900">
              MOST POPULAR UK ORDERS
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Representative examples of regular production runs dispatched from our Sialkot factory to UK fight brands, gym operators, and athletic clubs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {ukOrders.map((ord) => (
              <div
                key={ord.profile}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[10px] font-mono uppercase font-bold tracking-wider">
                      <ShoppingBag className="w-3 h-3 text-amber-700" />
                      <span>{ord.volume}</span>
                    </span>
                    <span className="text-[11px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                      {ord.leadTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-2">
                    {ord.profile}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {ord.specs}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900">
                  <span className="text-slate-500 font-normal">Standard MOQ</span>
                  <span>From 25 Pcs / Pairs</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: How to Start Your UK Order */}
        <div className="mb-24">
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-amber-800 font-mono block mb-2 font-bold">
              Simple 6-Stage Process
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900">
              HOW TO START YOUR UK ORDER
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ukSteps.map((step) => (
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
              <span>UK EXPORT FAQS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase">
              FREQUENTLY ASKED QUESTIONS — UK CLIENTS
            </h2>
          </div>

          <div className="space-y-4">
            {ukFaqs.map((faq, idx) => {
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
              Fast 24-Hour UK Quotation
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-3">
              GET A FREE QUOTE FOR YOUR UK ORDER
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
              <span>Request UK Quote</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/923417146935?text=Hi%20Gloves%20Storm%2C%20I'm%20a%20UK%20brand%20interested%20in%20custom%20manufacturing."
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
