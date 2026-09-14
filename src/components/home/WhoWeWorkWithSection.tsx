import { Trophy, Dumbbell, Rocket, Store, Users, ShoppingBag } from "lucide-react";

const segments = [
  {
    title: "CLOTHING & FIGHT BRANDS",
    desc: "Established fashion labels and combat brands looking to elevate garment weights, reduce defect rates, and scale recurring collections.",
    icon: ShoppingBag,
  },
  {
    title: "SPORTS TEAMS & ACADEMIES",
    desc: "Collegiate programs, professional clubs, and martial arts academies requiring high-durability match kits, tracksuits, and fight uniforms.",
    icon: Trophy,
  },
  {
    title: "COMMERCIAL GYMS",
    desc: "Boutique boxing gyms, CrossFit boxes, and fitness facilities needing heavy-duty custom branded punching bags, gloves, and retail apparel.",
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
    desc: "Wholesalers requiring bulk container-load production of certified sports goods, boxing gear, and activewear with consistent QC.",
    icon: Store,
  },
];

export default function WhoWeWorkWithSection() {
  return (
    <section className="py-28 sm:py-36 bg-[#111214] border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#FF6B00] font-mono block mb-2 font-bold">
            Target Partners
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-[-0.035em] text-[#F5F5F7] leading-[1.0] mb-6">
            BUILT FOR BUSINESSES <br />
            <span className="text-[#9E9EA7]">THAT BUILD BRANDS.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#9E9EA7] leading-relaxed">
            Whether you are launching your initial 50-piece capsule drop or distributing 10,000 gloves across international gyms, we tailor our production lines to your operational stage.
          </p>
        </div>

        {/* 6 Segments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {segments.map((seg) => {
            const Icon = seg.icon;
            return (
              <div
                key={seg.title}
                className="group bg-[#0C0D0E] rounded-3xl border border-white/[0.07] hover:border-[#FF6B00]/40 hover:-translate-y-2 hover:shadow-[0_20px_48px_rgba(0,0,0,0.6)] p-8 flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00] mb-6 group-hover:bg-[#FF6B00] group-hover:text-black transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-tight text-[#F5F5F7] mb-3 group-hover:text-[#FF6B00] transition-colors">
                    {seg.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9E9EA7] leading-relaxed">
                    {seg.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#9E9EA7]/40">
                  <span>Custom OEM Terms</span>
                  <span className="text-[#FF6B00] font-bold group-hover:underline">Active Support</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
