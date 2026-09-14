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
    <section className="py-24 sm:py-32 bg-white border-b border-neutral-200/80 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-800 font-mono block mb-2 font-bold">
            Target Partners
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-neutral-950 leading-[1.0] mb-6">
            BUILT FOR BUSINESSES <br />
            <span className="text-neutral-500">THAT BUILD BRANDS.</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            Whether you are launching your initial 50-piece capsule drop or distributing 10,000 gloves across international gyms, we tailor our production lines to your operational stage.
          </p>
        </div>

        {/* 6 Segments Grid with Elevated Rounded Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {segments.map((seg) => {
            const Icon = seg.icon;
            return (
              <div
                key={seg.title}
                className="group bg-white rounded-3xl border border-neutral-200/90 hover:border-amber-500/50 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(180,83,9,0.12)] hover:-translate-y-1.5 p-8 flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-6 group-hover:bg-amber-500 group-hover:text-neutral-950 transition-all shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-tight text-neutral-950 mb-3 group-hover:text-amber-800 transition-colors">
                    {seg.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {seg.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>Custom OEM Terms</span>
                  <span className="text-amber-700 font-bold group-hover:underline">Active Support</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
