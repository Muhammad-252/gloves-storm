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
    <section className="py-24 sm:py-32 bg-[#fafafa] border-b border-neutral-200/80 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-800 font-mono block mb-2 font-bold">
            The Partnership Advantage
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-neutral-950 leading-[1.0] mb-6">
            MORE THAN A SUPPLIER. <br />
            <span className="text-neutral-500">A MANUFACTURING PARTNER.</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            We don’t treat production as simple transactional work. We act as an extension of your product design and supply chain team, protecting your brand reputation with every stitch.
          </p>
        </div>

        {/* Pillars Grid with Elevated Rounded Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className={`group bg-white rounded-3xl border border-neutral-200/90 hover:border-amber-500/50 p-8 flex flex-col justify-between hover:-translate-y-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(180,83,9,0.12)] transition-all duration-300 ${
                  idx === 0
                    ? "sm:col-span-2 lg:col-span-2 bg-gradient-to-br from-white via-amber-50/20 to-white"
                    : ""
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-6 group-hover:bg-amber-500 group-hover:text-neutral-950 transition-all shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-neutral-950 mb-3 group-hover:text-amber-800 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-100 text-[10px] font-mono uppercase tracking-widest text-neutral-400 flex items-center justify-between">
                  <span>Pillar 0{idx + 1}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_6px_rgba(217,119,6,0.6)]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
