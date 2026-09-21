import Link from "next/link";
import Image from "next/image";
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
    <section className="py-28 sm:py-36 bg-white border-b border-black/[0.07] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-black/[0.07] gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-amber-800 font-mono block mb-2 font-bold">
              Sialkot Industrial Facility
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-[-0.035em] text-[#1A1A1A] leading-[1.0]">
              PRECISION BEHIND <br />
              <span className="text-[#6B7280]">EVERY PRODUCT.</span>
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

        {/* Capabilities Grid with Modern Rounded Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="group bg-[#F9FAFB] rounded-3xl border border-black/[0.08] hover:border-amber-500/50 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:bg-white hover:shadow-[0_20px_48px_rgba(0,0,0,0.10)] hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden transition-all duration-300"
            >
              <div className="relative h-52 w-full overflow-hidden bg-neutral-100">
                <Image
                  src={cap.image}
                  alt={`${cap.title} - Sialkot Manufacturing Facility (GLOVES STORM)`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                <span className="absolute top-4 left-4 bg-white/95 px-3.5 py-1 text-[10px] font-mono uppercase tracking-wider text-[#1A1A1A] font-bold rounded-full border border-black/[0.08] shadow-xs z-10">
                  {cap.category}
                </span>
              </div>

              <div className="p-7">
                <h3 className="text-lg font-bold uppercase tracking-tight text-[#1A1A1A] mb-2 group-hover:text-amber-800 transition-colors">
                  {cap.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
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
