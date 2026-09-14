import Link from "next/link";
import { getProjects } from "@/lib/data/store";
import { ArrowUpRight } from "lucide-react";
import GooeyButton from "@/components/ui/GooeyButton";

export const metadata = {
  title: "Case Studies & Production Deliveries | GLOVES STORM",
  description:
    "Explore how GLOVES STORM delivers custom combat gear, streetwear drops, and athletic match uniforms for global brands.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="pt-28 pb-24 bg-[#fafafa] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 pb-8 border-b border-neutral-200">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-600 font-mono block mb-2 font-bold">
            Documented Results
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#0f172a] mb-4">
            PRODUCTION CASE STUDIES
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            Real manufacturing case studies demonstrating how we resolve technical challenges, adhere to tight tournament deadlines, and engineer custom collections for international brands.
          </p>
        </div>

        {/* Projects List with Rounded Luxury Cards */}
        <div className="space-y-16">
          {projects.map((proj, idx) => (
            <div
              key={proj.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white rounded-3xl border border-neutral-200 hover:border-amber-500/50 shadow-sm hover:shadow-md transition-all duration-500 p-6 sm:p-8 overflow-hidden"
            >
              {/* Image banner (5 cols) */}
              <div className="lg:col-span-5 relative aspect-square sm:aspect-[4/3] lg:aspect-auto rounded-2xl overflow-hidden bg-neutral-100 min-h-[300px] border border-neutral-200">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{ backgroundImage: `url(${proj.featured_image})` }}
                />
                <span className="absolute top-4 left-4 bg-white/90 px-3.5 py-1 text-[10px] font-mono uppercase tracking-wider text-amber-700 font-bold rounded-full border border-neutral-200 shadow-sm backdrop-blur-md">
                  {proj.industry}
                </span>
              </div>

              {/* Story & Breakdown (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs font-mono text-neutral-500 mb-2">
                    <span>CASE STUDY #{String(idx + 1).padStart(2, "0")}</span>
                    <span>•</span>
                    <span className="text-amber-600 font-medium">{proj.industry}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#0f172a] mb-4">
                    {proj.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
                    {proj.description}
                  </p>

                  {/* Challenge & Solution snippets */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {proj.challenge && (
                      <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-amber-600 font-bold block mb-1">
                          The Challenge
                        </span>
                        <p className="text-xs text-neutral-600 line-clamp-3">
                          {proj.challenge}
                        </p>
                      </div>
                    )}
                    {proj.solution && (
                      <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-amber-600 font-bold block mb-1">
                          Our Solution
                        </span>
                        <p className="text-xs text-neutral-600 line-clamp-3">
                          {proj.solution}
                        </p>
                      </div>
                    )}
                  </div>

                  {proj.outcome && (
                    <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 mb-6">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-bold block mb-1">
                        Verified Outcome
                      </span>
                      <p className="text-xs text-emerald-950 italic">
                        &quot;{proj.outcome}&quot;
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <GooeyButton
                    href={`/projects/${proj.slug}`}
                    variant="outline"
                    size="sm"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </GooeyButton>

                  <Link
                    href="/contact"
                    className="text-xs uppercase tracking-wider text-neutral-500 hover:text-amber-600 transition-colors font-mono font-medium"
                  >
                    Request Similar Build →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
