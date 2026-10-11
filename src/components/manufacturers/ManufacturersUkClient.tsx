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
    title: "Football & Rugby Teamwear",
    link: "/products/sportswear-teamwear",
    image: "/images/products/basketball-uniform.jpg",
    desc: "Full dye-sublimated match kits, training shirts, rugby jerseys, shorts, and thermal tracksuits engineered with breathable, moisture-wicking technical fabrics built for British sports seasons.",
    tag: "UK Clubs & Academies",
  },
  {
    title: "Private Label Activewear",
    link: "/products/gym-fitness-wear",
    image: "/images/products/gym-leggings.jpg",
    desc: "Squat-proof 280–320 GSM recycled nylon-spandex leggings, high-support sports bras, compression base layers, and seamless matching sets for UK fitness and athleisure brands.",
    tag: "UK Fitness Labels",
  },
  {
    title: "Heavyweight Streetwear Hoodies",
    link: "/products/clothing-streetwear",
    image: "/images/products/hoodie-black.png",
    desc: "400–500 GSM combed cotton French Terry hoodies, oversized boxy tees, heavyweight joggers, and track pants tailored for UK streetwear and urban fashion labels.",
    tag: "UK Streetwear Brands",
  },
  {
    title: "Custom Varsity & Club Jackets",
    link: "/products/clothing-streetwear",
    image: "/images/products/varsity-jacket.jpg",
    desc: "Bespoke Melton wool varsity jackets with genuine leather or vegan sleeves, 3D chenille embroidery patches, metal snap buttons, and quilted diamond lining for British apparel brands.",
    tag: "UK Outerwear & Varsity",
  },
  {
    title: "Performance Gym & Training Wear",
    link: "/products/gym-fitness-wear",
    image: "/images/products/rash-guard.jpg",
    desc: "Technical dry-fit tees, gym stringers, 2-in-1 compression shorts, and fleece hoodies tailored for British commercial gym chains, CrossFit boxes, and athletic clubs.",
    tag: "UK Athletic & Gyms",
  },
  {
    title: "Club Merch & Private Label Packaging",
    link: "/products/custom-manufacturing-private-label",
    image: "/images/products/luxury-packaging.jpg",
    desc: "Custom woven damask neck labels, soft-touch hang tags, barcoded zip polybags, and complete retail packaging ready for UK warehousing and 3PL fulfillment.",
    tag: "UK Private Label & Merch",
  },
];

const ukOrders = [
  {
    profile: "Independent UK Streetwear Brand Launch",
    volume: "150 Heavyweight Hoodies & Tees",
    specs: "75 custom 450 GSM French Terry hoodies with 3D puff embroidery + 75 oversized 240 GSM combed cotton tees. Custom woven damask labels and retail polybags.",
    leadTime: "18 days from sample approval",
  },
  {
    profile: "London & Manchester Gym Athletic Merch",
    volume: "250 Performance Apparel Units",
    specs: "100 moisture-wicking gym tees + 100 compression training shorts + 50 custom fleece zip jackets with silicone branding and barcoded hangtags.",
    leadTime: "20 days from sample approval",
  },
  {
    profile: "Amateur Football & Rugby Club Kits",
    volume: "50 Complete Kits + 20 Tracksuits",
    specs: "50 full team kits (sublimated match shirts, shorts, socks) + 20 water-resistant fleece-lined tracksuits. Italian Kiian vibrant ink sublimation.",
    leadTime: "14 days from design sign-off",
  },
  {
    profile: "Boutique UK Fitness Brand Activewear",
    volume: "300 Matching Athletic Sets",
    specs: "150 seamless compression leggings + 150 high-support sports bras across 3 custom Pantone colourways. 300 GSM squat-proof fabric with silicone logos.",
    leadTime: "22 days from sample approval",
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
            <span className="w-2 h-2 rounded-full bg-[#FFB900] animate-pulse" />
            <span>🇬🇧 EXPORT MARKET CORRIDOR · DIRECT UK PARTNERSHIP</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-[1.08] uppercase">
            CUSTOM CLOTHING &amp; SPORTSWEAR MANUFACTURER FOR UK BRANDS
          </h1>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            Gloves Storm is a direct Sialkot OEM clothing and sportswear manufacturing partner for British apparel brands, gym chains, football and rugby clubs, streetwear labels, and fitness startups across the United Kingdom. Operating directly out of Sialkot, Pakistan — the global powerhouse of precision textile and athletic apparel manufacturing — we engineer custom sportswear, athletic team kits, seamless activewear, heavyweight hoodies, and varsity jackets. We deliver directly to London, Manchester, Birmingham, Glasgow, Leeds, and throughout Great Britain with door-to-door DDP air freight via Heathrow and Manchester airports, full UK customs and VAT clearance, GBP (£) invoicing, and low MOQs starting from 35–50 pieces per design.
          </p>
        </div>

        {/* UK Trust Bar */}
        <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl mb-20">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🇬🇧</span>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block font-bold">
                  United Kingdom Corridor
                </span>
                <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Active Export Market Since 2019
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-white/80 shrink-0" />
                <span>DDP UK shipping — all duty &amp; VAT handled</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-white/80 shrink-0" />
                <span>Invoicing in GBP (£) or USD available</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-white/80 shrink-0" />
                <span>UK REACH &amp; OEKO-TEX compliant fabrics</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-white/80 shrink-0" />
                <span>EORI &amp; UK DCTS trade documentation ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Why UK Clothing Brands & Sportswear Labels Source From Sialkot */}
        <div className="mb-24">
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-mono block mb-2 font-bold">
              The Manufacturing Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900">
              WHY UK CLOTHING BRANDS &amp; SPORTSWEAR LABELS SOURCE FROM SIALKOT
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm sm:text-base text-slate-600 leading-relaxed">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Building2 className="w-5 h-5 text-slate-900" />
                Sialkot&apos;s Textile &amp; Apparel Manufacturing Heritage
              </h3>
              <p>
                For decades, Sialkot has evolved into one of the world&apos;s premier production clusters for high-performance athletic apparel, technical sportswear, and custom clothing. Renowned for precision stitching, advanced knit engineering, and durable performance blends, Sialkot manufactures for top international athletic brands.
              </p>
              <p>
                Gloves Storm pairs this industrial heritage with automated CAD laser cutting, Tajima multi-head computerized embroidery, and Italian digital sublimation printing, providing UK brands with master-grade apparel at factory-direct pricing.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Truck className="w-5 h-5 text-slate-900" />
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
                <ShieldCheck className="w-5 h-5 text-slate-900" />
                UK REACH &amp; OEKO-TEX Standard Compliance
              </h3>
              <p>
                For UK fashion brands, fitness labels, and school or club academies, material safety and fabric durability are non-negotiable. Gloves Storm manufactures clothing and sportswear in strict adherence to UK REACH chemical regulations, azo-free dyeing standards, and OEKO-TEX certified fabrics.
              </p>
              <p>
                We ensure anti-pilling treatments, four-way stretch recovery, colourfastness to British washing standards, and hypoallergenic properties across all activewear, teamwear, and streetwear lines.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <PoundSterling className="w-5 h-5 text-slate-900" />
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
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-mono block mb-2 font-bold">
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
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FFB900] transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900">
                  <span>View Specifications</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-900 group-hover:text-[#FFB900] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Section: Shipping & Logistics to the United Kingdom */}
        <div className="mb-24 p-8 sm:p-12 rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800">
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-mono block mb-2 font-bold">
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
              <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center">
                <Plane className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Air Freight: 4–6 Days</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Direct express air via DHL and FedEx into London Heathrow (LHR) or Manchester (MAN). Best for samples and production runs under 500 pcs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center">
                <Ship className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Sea Freight: 20–25 Days</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cost-effective LCL and FCL ocean container shipping from Karachi port to Southampton, Felixstowe, or London Gateway for orders 500+ pcs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Turnkey DDP Shipping</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Gloves Storm handles Pakistan export clearance, UK customs entry, import VAT, and final-mile courier delivery directly to your facility.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Post-Brexit EORI Support</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We provide commercial invoices with correct 8-digit UK commodity codes, Certificate of Origin, and assist with GB EORI paperwork.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center">
                <PoundSterling className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">GBP (£) Invoicing Available</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Invoices and payment details provided in British Pounds Sterling (GBP) to streamline bookkeeping and avoid foreign exchange volatility.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center">
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
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-mono block mb-2 font-bold">
              Proven Production Profiles
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900">
              MOST POPULAR UK ORDERS
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Representative examples of regular apparel production runs dispatched from our Sialkot factory to UK streetwear labels, gym operators, and athletic clubs.
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
                      <ShoppingBag className="w-3 h-3 text-neutral-800" />
                      <span>{ord.volume}</span>
                    </span>
                    <span className="text-[11px] font-mono text-neutral-800 font-bold bg-neutral-100 px-2.5 py-0.5 rounded-full border border-neutral-200">
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
                  <span>From 35–50 Pcs</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: How to Start Your UK Order */}
        <div className="mb-24">
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-mono block mb-2 font-bold">
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
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:border-neutral-900 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-black font-mono text-slate-900 block mb-2">
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
              <HelpCircle className="w-3.5 h-3.5 text-neutral-900" />
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
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-2 font-bold">
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
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FFB900] hover:bg-[#E5A700] text-black font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_4px_24px_rgba(255,185,0,0.4)]"
            >
              <span>Request UK Quote</span>
              <ArrowUpRight className="w-4 h-4 text-black" />
            </Link>
            <a
              href="https://wa.me/923417146935?text=Hi%20Gloves%20Storm%2C%20I'm%20a%20UK%20brand%20interested%20in%20custom%20manufacturing."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition-all"
            >
              WhatsApp Direct
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
