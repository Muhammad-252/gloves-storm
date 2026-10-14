import { Trophy, Dumbbell, Rocket, Store, Users, ShoppingBag } from "lucide-react";

const segments = [
  {
    title: "CLOTHING & STREETWEAR LABELS",
    desc: "Established fashion labels and independent streetwear brands looking to elevate fabric weights (450 GSM French Terry), eliminate defect rates, and scale recurring collections.",
    icon: ShoppingBag,
  },
  {
    title: "SPORTS TEAMS & ACADEMIES",
    desc: "Collegiate programs, professional clubs, and athletic academies requiring high-durability match kits, tracksuits, and training uniforms.",
    icon: Trophy,
  },
  {
    title: "COMMERCIAL GYMS",
    desc: "Fitness studios, CrossFit boxes, and athletic facilities needing custom branded activewear, compression wear, and retail apparel.",
    icon: Dumbbell,
  },
  {
    title: "EMERGING STARTUPS",
    desc: "Founder-led brands looking for low MOQ sampling, tech pack advisory, and reliable guidance from an experienced factory partner.",
    icon: Rocket,
  },
  {
    title: "DISTRIBUTORS & AGENTS",
    desc: "Regional equipment distributors seeking reliable volume supply, guaranteed delivery schedules, and competitive factory-direct pricing.",
    icon: Users,
  },
  {
    title: "WHOLESALE SUPPLIERS",
    desc: "Wholesalers requiring bulk container-load production of certified sportswear, team uniforms, and activewear with consistent QC.",
    icon: Store,
  },
];

export default function WhoWeWorkWithSection() {
  return (
    <section className="py-12 sm:py-20 lg:py-28 bg-white border-b border-black/[0.07] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-14">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-neutral-500 font-mono block mb-2 font-bold">
            Target Partners
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-[-0.035em] text-[#1A1A1A] leading-[1.08] sm:leading-[1.0] mb-3 sm:mb-5">
            BUILT FOR BUSINESSES <br />
            <span className="text-[#6B7280]">THAT BUILD BRANDS.</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#6B7280] leading-relaxed">
            Whether you are launching your initial 30-piece capsule drop or distributing 10,000 custom uniforms across nationwide athletic programs, we tailor our production lines to your operational stage.
          </p>
        </div>

        {/* 6 Segments Grid with Elevated Rounded Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {segments.map((seg) => {
            const Icon = seg.icon;
            return (
              <div
                key={seg.title}
                className="group bg-[#F9FAFB] rounded-2xl sm:rounded-3xl border border-black/[0.08] hover:border-black/30 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:bg-white hover:shadow-[0_20px_48px_rgba(0,0,0,0.10)] hover:-translate-y-1.5 p-4 sm:p-6 lg:p-8 flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-900 mb-4 sm:mb-6 group-hover:bg-[#1A1A1A] group-hover:text-white group-hover:border-[#1A1A1A] transition-all shadow-xs">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold uppercase tracking-tight text-[#1A1A1A] mb-2 sm:mb-3 group-hover:text-black transition-colors">
                    {seg.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                    {seg.desc}
                  </p>
                </div>

                <div className="mt-6 sm:mt-8 pt-3.5 sm:pt-4 border-t border-black/[0.06] flex items-center justify-between text-[11px] font-mono text-[#9CA3AF]">
                  <span>Custom OEM Terms</span>
                  <span className="text-neutral-900 font-bold group-hover:text-[#FFB900] transition-colors">Active Support</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
