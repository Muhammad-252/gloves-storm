import Link from "next/link";
import { ArrowUpRight, Play, CheckCircle2, Heart } from "lucide-react";
import { InstagramIcon } from "../ui/SocialIcons";
import GooeyButton from "../ui/GooeyButton";

const PREVIEW_DROPS = [
  {
    id: "ig-01",
    client: "Apex Combat UK",
    tag: "@apexcombat.uk",
    country: "London, UK",
    type: "Reel",
    views: "54.8K",
    likes: "3.1K",
    title: "Championship 16oz Metallic Gold Sparring Gloves",
    desc: "1.2mm AAA full-grain cowhide leather with 4-layer EVA/latex knuckle matrix. Laser-cut leather and metallic foil wrist patch.",
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop",
    category: "Boxing & Combat",
  },
  {
    id: "ig-02",
    client: "Aura Apparel LA",
    tag: "@aura.athletics",
    country: "Los Angeles, USA",
    type: "Drop",
    likes: "4.2K",
    title: "460 GSM Heavyweight French Terry Tracksuits",
    desc: "Bespoke acid mineral enzyme wash with 3D high-density silicone typography and double-stitched kangaroo pocket.",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
    category: "Streetwear & Fashion",
  },
  {
    id: "ig-03",
    client: "Vanquish Fight Club",
    tag: "@vanquishfight",
    country: "Melbourne, Australia",
    type: "Reel",
    views: "92.4K",
    likes: "5.8K",
    title: "Tajima 12-Needle Gold Bullion Embroidery Trunks",
    desc: "22,000 stitches of metallic Japanese bullion thread stitched onto heavy satin fight trunks. Zero puckering or thread breaks.",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
    category: "Embroidery & Fightwear",
  },
];

export default function FeaturedProjectsSection({ projects = [] }: { projects?: any[] }) {
  return (
    <section className="py-24 sm:py-32 bg-[#F9FAFB] border-b border-black/[0.07] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-black/[0.07] gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              <span className="text-xs uppercase tracking-[0.25em] text-pink-700 font-mono font-bold">
                Follow @glovesstorm on Instagram
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-[-0.035em] text-[#1A1A1A]">
              PREVIOUS WORK & REELS
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mt-2 leading-relaxed">
              Every production run manufactured at our Sialkot factory is documented live on our official Instagram feed. Inspect real client unboxings, embroidery close-ups, and fight night deliveries.
            </p>
          </div>
          <GooeyButton
            href="/previous-work"
            variant="outline"
            size="sm"
            className="shrink-0"
          >
            <span>View Full Instagram Archive</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </GooeyButton>
        </div>

        {/* Previous Work Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {PREVIEW_DROPS.map((drop) => {
            const isReel = drop.type === "Reel";
            return (
              <Link
                key={drop.id}
                href="/previous-work"
                className="group bg-white rounded-3xl border border-black/[0.08] hover:border-pink-500/40 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.09)] hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden transition-all duration-300"
              >
                {/* Media banner */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-neutral-900">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url(${drop.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Top Left: Category Badge */}
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[#1A1A1A] font-bold rounded-full border border-black/[0.08] shadow-xs">
                    {drop.category}
                  </span>

                  {/* Top Right: Instagram Badge / Reel Indicator */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5">
                    {isReel && (
                      <span className="bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-mono flex items-center gap-1 border border-white/20">
                        <Play className="w-2.5 h-2.5 fill-current text-amber-400" />
                        <span>{drop.views}</span>
                      </span>
                    )}
                    <span className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-pink-600 shadow-sm border border-white/40">
                      <InstagramIcon className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Center Play Icon for Reels */}
                  {isReel && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-115 shadow-lg">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Bottom Image Overlay: Client Tag */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                    <span className="font-bold truncate">{drop.client}</span>
                    <span className="text-[11px] text-neutral-300">{drop.country}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-lg font-bold uppercase tracking-tight text-[#1A1A1A] mb-2 group-hover:text-amber-800 transition-colors line-clamp-2">
                      {drop.title}
                    </h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-2 mb-4">
                      {drop.desc}
                    </p>
                  </div>

                  <div className="border-t border-black/[0.06] pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-mono">
                      <Heart className="w-3.5 h-3.5 fill-red-500/20 text-red-500" />
                      <span>{drop.likes} likes</span>
                    </div>

                    <span className="text-xs font-bold uppercase tracking-wider text-amber-800 group-hover:text-[#1A1A1A] transition-colors inline-flex items-center gap-1">
                      <span>Inspect On Reel</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
