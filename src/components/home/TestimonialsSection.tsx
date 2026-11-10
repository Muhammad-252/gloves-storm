
import React from "react";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, Factory, Clock, Award, Globe, Truck } from "lucide-react";

export default function TestimonialsSection() {
  const regions = [
    {
      flag: "🇺🇸",
      country: "United States",
      role: "Primary Export Market",
      desc: "Sports apparel brands, collegiate teams, Amazon FBA sellers & streetwear labels across California, Texas, Florida & New York.",
      speed: "4–7 Days Air",
      href: "/manufacturers-usa",
    },
    {
      flag: "🇬🇧",
      country: "United Kingdom",
      role: "Athletic Clubs & Teamwear",
      desc: "Premier sports academies, athletic clubs & sportswear brands in London, Manchester, Birmingham & Leeds.",
      speed: "4–7 Days Air Express",
      href: "/manufacturers-uk",
    },
    {
      flag: "🇦🇺",
      country: "Australia",
      role: "Fitness & Athleisure",
      desc: "Fitness studios, training gyms & outdoor activewear brands in Sydney, Melbourne, Brisbane & Perth.",
      speed: "5–7 Days Air",
      href: "/contact",
    },
    {
      flag: "🇩🇪",
      country: "Germany",
      role: "Technical Sportswear",
      desc: "Performance fitness labels, athletic distributors & club sportswear across Berlin, Munich & Hamburg.",
      speed: "4–5 Days Air Cargo",
      href: "/manufacturers-germany",
    },
    {
      flag: "🇫🇷",
      country: "France",
      role: "Activewear & Streetwear",
      desc: "Sports clubs, training studios & bespoke luxury streetwear labels in Paris & Lyon.",
      speed: "4–5 Days Air Freight",
      href: "/manufacturers-france",
    },
    {
      flag: "🇨🇦",
      country: "Canada",
      role: "Gym & Outerwear",
      desc: "Athletic clubs, collegiate athletics & heavyweight fleece streetwear across Toronto, Vancouver & Montreal.",
      speed: "4–6 Days Door-to-Door",
      href: "/contact",
    },
  ];

  const trustStats = [
    {
      icon: Factory,
      value: "Direct Sialkot Factory",
      label: "Zero Middlemen · Direct Pricing",
      sub: "Established 2019 in Punjab, Pakistan",
    },
    {
      icon: Award,
      value: "90+ Product Specs",
      label: "Verified Technical Patterns",
      sub: "Teamwear, Gym Wear, Streetwear & Private Label",
    },
    {
      icon: Clock,
      value: "5–7 Day Prototyping",
      label: "Fast Pre-Production Samples",
      sub: "Signed off before bulk cut",
    },
    {
      icon: ShieldCheck,
      value: "AQL 2.5 Inspection",
      label: "Multi-Stage Quality Control",
      sub: "100% pre-dispatch verification",
    },
    {
      icon: Truck,
      value: "DDP Door-to-Door",
      label: "Customs & Duties Pre-Cleared",
      sub: "Delivered to any warehouse or 3PL",
    },
  ];

  return (
    <section className="py-12 sm:py-20 lg:py-28 border-b border-line relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-slate-900 text-white text-[10px] sm:text-[11px] mb-3 sm:mb-4 shadow-xs">
            <Globe className="w-3.5 h-3.5 text-white" />
            <span>Global B2B export network</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-ink tracking-[-0.04em] leading-[1.12] sm:leading-[1.1]">
            Trusted by brands worldwide
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed font-normal">
            Gloves Storm manufactures custom sportswear, athletic team uniforms, gym fitness wear, and private label streetwear collections for independent labels, professional academies, and wholesale distributors across 6 primary international territories.
          </p>
        </div>

        {/* Flag Ticker / Regional Hub Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5 mb-8 sm:mb-14">
          {regions.map((reg) => (
            <Link
              key={reg.country}
              href={reg.href || "/contact"}
              className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-black/30 hover:shadow-md transition-all group block"
            >
              <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <span className="text-2xl sm:text-3xl" role="img" aria-label={reg.country}>
                    {reg.flag}
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-ink tracking-[-0.02em]">
                      {reg.country}
                    </h3>
                    <span className="text-[10px] text-slate-500 block">
                      {reg.role}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                  {reg.speed}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {reg.desc}
              </p>
            </Link>
          ))}
        </div>

        {/* Verified Technical Stats Horizontal Band */}
        <div className="p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
            {trustStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.value}
                  className="p-3.5 sm:p-4 rounded-xl bg-slate-800/50 border border-slate-700/60"
                >
                  <div className="flex items-center gap-2 mb-1.5 sm:mb-2 text-white">
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-[#FFB900]" />
                    <span className="text-[10px] text-slate-400">
                      Verified fact
                    </span>
                  </div>
                  <div className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-slate-300 mt-1">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
                    {stat.sub}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
              <span>
                Confidential OEM manufacturing contracts with NDAs standard on all private label orders.
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-slate-300 font-medium shrink-0">
              Sialkot Industrial Zone · Direct Factory Access
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
