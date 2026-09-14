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
    desc: "Consistent premium materials, high-density thread count, and professional finishing engineered to rival Tier-1 global labels.",
    icon: ShieldCheck,
  },
  {
    title: "Customization",
    desc: "Every product is developed around your brand DNA—custom cuts, unique ounce calibrations, bespoke fabrics, and specialized pantone shades.",
    icon: Sliders,
  },
  {
    title: "OEM & Private Label",
    desc: "Full private-label capability. Custom neck labels, embossed leather tags, hang tags, barcoding, and retail-ready packaging.",
    icon: Tag,
  },
  {
    title: "Flexible Production",
    desc: "Accessible minimums starting from 25–50 units for emerging startups, with capacity scaling to 50,000+ units for established distributors.",
    icon: Repeat,
  },
  {
    title: "Clear Communication",
    desc: "Direct access to our English-speaking production team via WhatsApp, Zoom, and email. Real-time video updates from the stitching floor.",
    icon: MessagesSquare,
  },
  {
    title: "Rigorous Quality Control",
    desc: "Multi-point inspection during raw material prep, panel printing, assembly, and final pre-dispatch packing to ensure zero defects.",
    icon: SearchCheck,
  },
  {
    title: "Worldwide Shipping",
    desc: "Reliable air express and consolidated sea freight shipping directly to your warehouse with customs documentation provided.",
    icon: Truck,
  },
];

export default function WhyUsSection() {
  return (
    <section className="py-28 sm:py-36 bg-[#0C0D0E] border-b border-white/[0.06] relative">
      {/* Atmospheric glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF6B00]/[0.035] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#FF6B00] font-mono block mb-2 font-bold">
            The Partnership Advantage
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-[-0.035em] text-[#F5F5F7] leading-[1.0] mb-6">
            MORE THAN A SUPPLIER. <br />
            <span className="text-[#9E9EA7]">A MANUFACTURING PARTNER.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#9E9EA7] leading-relaxed">
            We don&apos;t treat production as simple transactional work. We act as an extension of your product design and supply chain team, protecting your brand reputation with every stitch.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className={`group bg-[#111214] rounded-3xl border border-white/[0.07] hover:border-[#FF6B00]/40 p-8 flex flex-col justify-between hover:-translate-y-2 hover:shadow-[0_20px_48px_rgba(0,0,0,0.6)] transition-all duration-300 ${
                  idx === 0
                    ? "sm:col-span-2 lg:col-span-2"
                    : ""
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00] mb-6 group-hover:bg-[#FF6B00] group-hover:text-black transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-[#F5F5F7] mb-3 group-hover:text-[#FF6B00] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9E9EA7] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.06] text-[10px] font-mono uppercase tracking-widest text-[#9E9EA7]/40 flex items-center justify-between">
                  <span>Pillar 0{idx + 1}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_rgba(255,107,0,0.8)]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
