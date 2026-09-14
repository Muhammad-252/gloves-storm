import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import GooeyButton from "../ui/GooeyButton";

const capabilities = [
  {
    title: "Automated Laser & Die Cutting",
    category: "Cutting",
    description:
      "Computerized Gerber spreading and high-precision laser cutters ensuring sub-millimeter edge tolerances across complex fight glove and jersey patterns.",
    image:
      "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Master Industrial Stitching",
    category: "Stitching",
    description:
      "Dedicated production lines equipped with Juki heavy-duty cylinder-bed, 4-needle flatlock, and automatic bar-tack sewing stations for indestructible seams.",
    image:
      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Italian Digital Sublimation",
    category: "Sublimation",
    description:
      "Industrial wide-format digital dye transfer machines running authentic Italian Kiian inks for deep, non-fading photographic sportswear prints.",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Tajima Computerized Embroidery",
    category: "Embroidery",
    description:
      "Multi-head computerized embroidery suites capable of 3D puff, metallic gold/silver thread, and complex felt collegiate badges.",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Automated Screen & DTF Printing",
    category: "Printing",
    description:
      "Automatic carousel screen presses supporting discharge inks, high-density silicone, reflective 3M coatings, and direct-to-film transfers.",
    image:
      "https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "In-Line Multi-Point QC & Finishing",
    category: "Quality Control",
    description:
      "Rigorous needle detection, pull-force hardware testing, color fastness checks, and dimensional verification before custom branded packing.",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
  },
];

export default function FactoryCapabilitiesSection() {
  return (
    <section className="py-28 sm:py-36 bg-[#111214] border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/[0.07] gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#FF6B00] font-mono block mb-2 font-bold">
              Sialkot Industrial Facility
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-[-0.035em] text-[#F5F5F7] leading-[1.0]">
              PRECISION BEHIND <br />
              <span className="text-[#9E9EA7]">EVERY PRODUCT.</span>
            </h2>
          </div>
          <GooeyButton
            href="/manufacturing"
            variant="outline"
            size="sm"
          >
            <span>Explore Technical Equipment</span>
            <ArrowUpRight className="w-4 h-4" />
          </GooeyButton>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="group bg-[#0C0D0E] rounded-3xl border border-white/[0.07] hover:border-[#FF6B00]/40 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(0,0,0,0.7)] flex flex-col justify-between overflow-hidden transition-all duration-300"
            >
              <div className="relative h-52 w-full overflow-hidden bg-[#0C0D0E]">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 brightness-75 group-hover:brightness-90"
                  style={{ backgroundImage: `url(${cap.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D0E]/70 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 bg-[#0C0D0E]/80 border border-[#FF6B00]/30 text-[#FF6B00] px-3.5 py-1 text-[10px] font-mono uppercase tracking-wider font-bold rounded-full backdrop-blur-md">
                  {cap.category}
                </span>
              </div>

              <div className="p-7">
                <h3 className="text-lg font-bold uppercase tracking-tight text-[#F5F5F7] mb-2 group-hover:text-[#FF6B00] transition-colors">
                  {cap.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#9E9EA7] leading-relaxed">
                  {cap.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
