import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import GooeyButton from "../ui/GooeyButton";
import type { Project } from "@/types/database";

/**
 * Homepage preview of Previous Work, taken live from the projects added in
 * admin. Picks one project per product type in turn so the row stays varied.
 */
function pickVaried(projects: Project[], limit: number): Project[] {
  const withImage = projects.filter((p) => p.featured_image || p.images?.[0]?.image_url);
  const groups = new Map<string, Project[]>();
  for (const p of withImage) {
    const key = p.industry?.trim() || "Other";
    groups.set(key, [...(groups.get(key) ?? []), p]);
  }
  const picked: Project[] = [];
  const lists = [...groups.values()];
  for (let i = 0; picked.length < limit && lists.some((l) => l[i]); i++) {
    for (const l of lists) if (l[i] && picked.length < limit) picked.push(l[i]);
  }
  return picked;
}

export default function FeaturedProjectsSection({ projects = [] }: { projects?: Project[] }) {
  const items = pickVaried(projects, 6);
  if (items.length === 0) return null;

  return (
    <section className="py-12 sm:py-20 lg:py-28 border-b border-line relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-14 pb-5 sm:pb-6 border-b border-line gap-5 sm:gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-black" />
              <span className="text-[12px] sm:text-[13px] text-neutral-800 font-medium">Made in our Sialkot factory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-[-0.04em] text-ink">
              Previous work
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mt-2 leading-relaxed">
              A selection of uniforms and apparel we have produced for teams, clubs and brands.
            </p>
          </div>
          <GooeyButton href="/previous-work" variant="outline" size="sm" className="shrink-0 w-full sm:w-auto">
            <span>View all previous work</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </GooeyButton>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {items.map((p) => {
            const image = p.images?.[0]?.image_url || p.featured_image;
            return (
              <Link
                key={p.id}
                href="/previous-work"
                className="group bg-white rounded-2xl sm:rounded-3xl border border-black/[0.08] hover:border-black/30 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.09)] hover:-translate-y-1 flex flex-col overflow-hidden transition-all duration-300"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={image}
                    alt={p.images?.[0]?.alt_text || `${p.title}, made by Gloves Storm`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {p.industry && (
                    <span className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 bg-white/95 backdrop-blur-md px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[10px] text-[#1A1A1A] font-medium rounded-full border border-black/[0.08] max-w-[calc(100%-1.25rem)] truncate">
                      {p.industry}
                    </span>
                  )}
                </div>
                <div className="p-3 sm:p-5 flex flex-col gap-1.5 flex-1">
                  <h3 className="text-xs sm:text-base font-bold tracking-[-0.02em] text-ink line-clamp-2">{p.title}</h3>
                  {p.description && (
                    <p className="hidden sm:block text-xs text-[#6B7280] leading-relaxed line-clamp-2">{p.description}</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
