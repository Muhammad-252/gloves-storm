import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/types/database";
import GooeyButton from "../ui/GooeyButton";

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjectsSection({ projects }: FeaturedProjectsProps) {
  return (
    <section className="py-28 sm:py-36 bg-[#0C0D0E] border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/[0.07] gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#FF6B00] font-mono block mb-2 font-bold">
              Case Studies &amp; Deliveries
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-[-0.035em] text-[#F5F5F7]">
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((proj) => (
            <Link
              key={proj.id}
              href={`/projects/${proj.slug}`}
              className="group bg-[#111214] rounded-3xl border border-white/[0.07] hover:border-[#FF6B00]/40 hover:-translate-y-2 hover:shadow-[0_20px_48px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden transition-all duration-300"
            >
              {/* Image banner */}
              <div className="relative h-64 w-full overflow-hidden bg-[#0C0D0E]">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 brightness-70 group-hover:brightness-80"
                  style={{ backgroundImage: `url(${proj.featured_image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111214]/80 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 bg-[#0C0D0E]/80 border border-[#FF6B00]/30 text-[#FF6B00] px-3.5 py-1 text-[10px] font-mono uppercase tracking-wider font-bold rounded-full backdrop-blur-md">
                  {proj.industry}
                </span>
              </div>

              {/* Body Content */}
              <div className="p-7 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-[#F5F5F7] mb-3 group-hover:text-[#FF6B00] transition-colors line-clamp-2">
                    {proj.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9E9EA7] leading-relaxed line-clamp-3 mb-6">
                    {proj.description}
                  </p>
                </div>

                <div className="border-t border-white/[0.06] pt-5">
                  {proj.outcome && (
                    <div className="mb-4">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#9E9EA7]/50 block mb-1">
                        Outcome
                      </span>
                      <p className="text-xs text-[#9E9EA7] line-clamp-2 italic font-medium">
                        &quot;{proj.outcome}&quot;
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#FF6B00] group-hover:text-[#ff8533] transition-colors">
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
