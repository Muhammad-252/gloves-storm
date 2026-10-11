import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Play, CheckCircle2, Heart } from "lucide-react";
import { InstagramIcon } from "../ui/SocialIcons";
import GooeyButton from "../ui/GooeyButton";

const PREVIEW_DROPS = [
  {
    id: "ig-01",
    client: "Apex Athletics UK",
    tag: "@apexathletics.uk",
    country: "London, UK",
    type: "Reel",
    views: "54.8K",
    likes: "3.1K",
    title: "Pro Performance Sublimated Football Match Kits",
    desc: "Italian digital dye sublimation on moisture-wicking micro-mesh with reinforced flatlock stitching and 3D silicone club badges.",
    image: "/images/products/football-jersey-black.jpg",
    category: "Sportswear & Teamwear",
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
    image: "/images/products/hoodie-black.png",
    category: "Clothing & Streetwear",
  },
  {
    id: "ig-03",
    client: "Vanquish Athletics",
    tag: "@vanquishathletics",
    country: "Melbourne, Australia",
    type: "Reel",
    views: "92.4K",
    likes: "5.8K",
    title: "Custom Wool & Leather Varsity Jackets",
    desc: "24oz Melton wool body with genuine top-grain cowhide leather sleeves, chenille chain-stitch chest crests, and quilted satin lining.",
    image: "/images/products/varsity-jacket.jpg",
    category: "Custom Manufacturing & Private Label",
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
              <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
              <span className="text-xs uppercase tracking-[0.25em] text-neutral-800 font-mono font-bold">
                Follow @glovesstorm on Instagram
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-[-0.035em] text-[#1A1A1A]">
              PREVIOUS WORK & REELS
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mt-2 leading-relaxed">
              Every production run manufactured at our Sialkot factory is documented live on our official Instagram feed. Inspect real client unboxings, embroidery close-ups, and teamwear deliveries.
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
                className="group bg-white rounded-3xl border border-black/[0.08] hover:border-black/30 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.09)] hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden transition-all duration-300"
              >
                {/* Media banner */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-neutral-900">
                  <Image
                    src={drop.image}
                    alt={`${drop.title} - Custom Manufacturing by Gloves Storm`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
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
                        <Play className="w-2.5 h-2.5 fill-current text-white" />
                        <span>{drop.views}</span>
                      </span>
                    )}
                    <span className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-black shadow-sm border border-white/40">
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
                    <h3 className="text-lg font-bold uppercase tracking-tight text-[#1A1A1A] mb-2 group-hover:text-black transition-colors line-clamp-2">
                      {drop.title}
                    </h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-2 mb-4">
                      {drop.desc}
                    </p>
                  </div>

                  <div className="border-t border-black/[0.06] pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-mono">
                      <Heart className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{drop.likes} likes</span>
                    </div>

                    <span className="text-xs font-bold uppercase tracking-wider text-black group-hover:text-[#FFB900] transition-colors inline-flex items-center gap-1">
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
