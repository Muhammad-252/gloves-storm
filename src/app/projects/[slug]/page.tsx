import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectBySlug, getProjects } from "@/lib/data/store";
import { ArrowUpRight, ChevronRight, CheckCircle2, ShieldCheck, Factory } from "lucide-react";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Case Study`,
    description: project.description.slice(0, 160),
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-28 pb-24 bg-[#fafafa] min-h-screen">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 mb-8 font-medium">
          <Link href="/" className="hover:text-[#0f172a] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <Link href="/projects" className="hover:text-[#0f172a] transition-colors">
            Projects
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-amber-600 truncate font-semibold">{project.title}</span>
        </nav>

        {/* Case Study Header */}
        <div className="mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-600 font-mono block mb-2 font-bold">
            Case Study • {project.industry}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0f172a] mb-6 leading-tight">
            {project.title}
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-sm mb-16">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${project.featured_image})` }}
          />
        </div>

        {/* Challenge & Approach */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {project.challenge && (
            <div className="p-8 bg-white rounded-3xl border border-neutral-200 shadow-sm">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-600 block mb-2 font-bold">
                Phase 01: The Problem
              </span>
              <h2 className="text-xl font-bold uppercase tracking-tight text-[#0f172a] mb-4">
                The Client Challenge
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {project.challenge}
              </p>
            </div>
          )}

          {project.approach && (
            <div className="p-8 bg-white rounded-3xl border border-neutral-200 shadow-sm">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-600 block mb-2 font-bold">
                Phase 02: Factory Strategy
              </span>
              <h2 className="text-xl font-bold uppercase tracking-tight text-[#0f172a] mb-4">
                Engineering Approach
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {project.approach}
              </p>
            </div>
          )}
        </div>

        {/* Solution & Outcome */}
        <div className="space-y-8 mb-16">
          {project.solution && (
            <div className="p-8 bg-white rounded-3xl border border-neutral-200 shadow-sm">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-600 block mb-2 font-bold">
                Phase 03: Execution
              </span>
              <h2 className="text-xl font-bold uppercase tracking-tight text-[#0f172a] mb-4">
                The Manufacturing Solution
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {project.solution}
              </p>
            </div>
          )}

          {project.outcome && (
            <div className="p-8 rounded-3xl bg-emerald-50/70 border border-emerald-200 shadow-sm">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-700 font-bold block mb-2">
                Phase 04: Measured Results
              </span>
              <h2 className="text-xl font-bold uppercase tracking-tight text-[#0f172a] mb-4">
                Verified Outcome
              </h2>
              <p className="text-sm sm:text-base text-emerald-950 leading-relaxed italic">
                &ldquo;{project.outcome}&rdquo;
              </p>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-12 bg-white rounded-3xl border border-neutral-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold uppercase tracking-tight text-[#0f172a] mb-2">
              Have a similar custom project in mind?
            </h3>
            <p className="text-xs text-neutral-600">
              Send your tech pack or reference images and our engineering team will provide a comprehensive production roadmap.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#0f172a] text-white hover:bg-neutral-800 rounded-full px-8 py-3.5 font-bold text-xs uppercase tracking-wider shrink-0 transition-colors shadow-sm"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
