import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/types/database";
import GooeyButton from "../ui/GooeyButton";

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjectsSection({ projects }: FeaturedProjectsProps) {
  return (
    <section className="py-28 sm:py-36 bg-[#F9FAFB] border-b border-black/[0.07] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-black/[0.07] gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-amber-800 font-mono block mb-2 font-bold">
              Case Studies & Deliveries
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-[-0.035em] text-[#1A1A1A]">
              FEATURED PROJECTS
            </h2>
          </div>
          <GooeyButton
            href="/projects"
            variant="outline"
            size="sm"
          >
            <span>View All Case Studies</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </GooeyButton>
        </div>

        {/* Projects Grid with Elevated Rounded Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.slice(0, 3).map((proj) => (
            <Link
              key={proj.id}
              href={`/projects/${proj.slug}`}
              className="group bg-white rounded-3xl border border-black/[0.08] hover:border-amber-500/50 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.10)] hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden transition-all duration-300"
            >
              {/* Image banner */}
              <div className="relative h-64 w-full overflow-hidden bg-neutral-100">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${proj.featured_image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                <span className="absolute top-4 left-4 bg-white/95 px-3.5 py-1 text-[10px] font-mono uppercase tracking-wider text-[#1A1A1A] font-bold rounded-full border border-black/[0.08] shadow-xs">
                  {proj.industry}
                </span>
              </div>

              {/* Body Content */}
              <div className="p-7 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-[#1A1A1A] mb-3 group-hover:text-amber-800 transition-colors line-clamp-2">
                    {proj.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed line-clamp-3 mb-6">
                    {proj.description}
                  </p>
                </div>

                <div className="border-t border-black/[0.06] pt-5">
                  {proj.outcome && (
                    <div className="mb-4">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#9CA3AF] block mb-1">
                        Outcome
                      </span>
                      <p className="text-xs text-[#6B7280] line-clamp-2 italic font-medium">
                        &quot;{proj.outcome}&quot;
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-amber-800 group-hover:text-[#1A1A1A] transition-colors">
                    <span>Read Full Case Study</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
