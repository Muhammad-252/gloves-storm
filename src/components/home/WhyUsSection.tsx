import {
  ShieldCheck,
  Sliders,
  Tag,
  Repeat,
  MessagesSquare,
  SearchCheck,
  Truck,
} from "lucide-react";

const pillars = [
  {
    title: "Quality",
    desc: "Consistent premium textiles, high-density stitching, and professional finishing engineered to rival Tier-1 international labels.",
    icon: ShieldCheck,
  },
  {
    title: "Customization",
    desc: "Every garment is developed around your brand DNA—custom apparel patterns, bespoke fabric knits, technical blends, and specialized pantone shades.",
    icon: Sliders,
  },
  {
    title: "OEM & Private Label",
    desc: "Full private-label capability. Custom woven neck labels, satin wash tags, silicone badges, hang tags, barcoding, and retail-ready packaging.",
    icon: Tag,
  },
  {
    title: "Flexible Production",
    desc: "Accessible minimums starting from 35–50 units for emerging brands, with capacity scaling to 50,000+ units for established international distributors.",
    icon: Repeat,
  },
  {
    title: "Clear Communication",
    desc: "Direct access to our English-speaking production team via WhatsApp, video calls, and email. Real-time visual updates from the sewing floor.",
    icon: MessagesSquare,
  },
  {
    title: "Rigorous Quality Control",
    desc: "Multi-point inspection during fabric cutting, panel printing, assembly, and final pre-dispatch packing adhering strictly to AQL 2.5 standards.",
    icon: SearchCheck,
  },
  {
    title: "Worldwide DDP Freight",
    desc: "Reliable door-to-door DDP air express (3–5 days) and consolidated ocean freight directly to your warehouse with all customs clearance handled.",
    icon: Truck,
  },
];

export default function WhyUsSection() {
  return (
    <section className="py-12 sm:py-20 lg:py-28 bg-[#F9FAFB] border-b border-black/[0.07] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Rewritten SEO Title & Subtitle */}
        <div className="max-w-4xl mb-8 sm:mb-14">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-neutral-500 font-mono block mb-2 font-bold">
            The Partnership Advantage
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-[-0.035em] text-[#1A1A1A] leading-[1.08] sm:leading-[1.05] mb-3 sm:mb-5">
            WHY INTERNATIONAL BRANDS CHOOSE GLOVES STORM
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed font-normal">
            With world-class textile engineering and automated industrial manufacturing lines, Gloves Storm delivers consistent, retail-grade custom apparel and sportswear for international brands across the USA, UK, Europe, and worldwide.
          </p>
        </div>

        {/* Pillars Grid with Elevated Rounded Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className={`group bg-white rounded-2xl sm:rounded-3xl border border-black/[0.08] hover:border-black/30 p-4 sm:p-6 lg:p-8 flex flex-col justify-between hover:-translate-y-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.10)] transition-all duration-300 ${
                  idx === 0
                    ? "sm:col-span-2 lg:col-span-2 bg-white"
                    : ""
                }`}
              >
                <div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-900 mb-4 sm:mb-6 group-hover:bg-[#1A1A1A] group-hover:text-white group-hover:border-[#1A1A1A] transition-all shadow-xs">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-tight text-[#1A1A1A] mb-2 sm:mb-3 group-hover:text-black transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 sm:mt-8 pt-3.5 sm:pt-4 border-t border-black/[0.06] text-[10px] font-mono uppercase tracking-widest text-[#9CA3AF] flex items-center justify-between">
                  <span>Pillar 0{idx + 1}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFB900] opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_6px_rgba(255,185,0,0.6)]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
