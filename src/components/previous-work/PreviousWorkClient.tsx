"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project, Category } from "@/types/database";
import {
  Layers,
  ChevronLeft,
  ChevronRight,
  X,
  Eye,
  Maximize2,
  Sparkles,
  ArrowUpRight,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import QuoteModal from "@/components/ui/QuoteModal";

interface PreviousWorkClientProps {
  initialProjects: Project[];
  categories: Category[];
}

export default function PreviousWorkClient({
  initialProjects,
  categories,
}: PreviousWorkClientProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Helper to extract clean array of image URLs for any project
  const getProjectImages = useCallback((proj: Project): string[] => {
    const list: string[] = [];
    if (proj.featured_image) {
      list.push(proj.featured_image);
    }
    if (Array.isArray(proj.images)) {
      for (const img of proj.images) {
        const url = typeof img === "string" ? img : img?.image_url;
        if (url && !list.includes(url)) {
          list.push(url);
        }
      }
    }
    return list.length > 0 ? list : [proj.featured_image || "/images/products/boxing-gloves-black.png"];
  }, []);

  // Filter projects based on selected category
  const filteredProjects = useMemo(() => {
    if (selectedCategoryId === "all") return initialProjects;
    return initialProjects.filter((p) => p.category_id === selectedCategoryId);
  }, [initialProjects, selectedCategoryId]);

  // Open modal for a specific project
  const handleOpenModal = (project: Project, imageIndex = 0) => {
    setActiveProject(project);
    setActiveImageIndex(imageIndex);
  };

  // Close modal
  const handleCloseModal = useCallback(() => {
    setActiveProject(null);
    setActiveImageIndex(0);
  }, []);

  // Modal navigation controls
  const activeImages = useMemo(() => {
    return activeProject ? getProjectImages(activeProject) : [];
  }, [activeProject, getProjectImages]);

  const handleNextImage = useCallback(() => {
    if (activeImages.length <= 1) return;
    setActiveImageIndex((prev) => (prev + 1) % activeImages.length);
  }, [activeImages.length]);

  const handlePrevImage = useCallback(() => {
    if (activeImages.length <= 1) return;
    setActiveImageIndex((prev) => (prev - 1 + activeImages.length) % activeImages.length);
  }, [activeImages.length]);

  // Keyboard navigation for modal (ESC to close, Left/Right arrows to slide)
  useEffect(() => {
    if (!activeProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseModal();
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      } else if (e.key === "ArrowLeft") {
        handlePrevImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeProject, handleCloseModal, handleNextImage, handlePrevImage]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A]">
      {/* Editorial Header Section */}
      <section className="pt-28 pb-14 sm:pt-36 sm:pb-16 bg-white border-b border-black/[0.07] relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-800 font-bold">
                FACTORY PRODUCTION ARCHIVE
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-[-0.035em] text-[#1A1A1A] leading-[1.0] mb-5">
              PREVIOUS WORK & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-700 to-neutral-700">
                CLIENT SHOWCASE.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Explore authentic production runs, custom fight gear lines, sublimated athletic teamwear, and private label apparel crafted directly in our Sialkot manufacturing plant for brands worldwide.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10 pt-8 border-t border-black/[0.06]">
            <div>
              <span className="text-xl sm:text-2xl font-black font-mono text-[#1A1A1A] block">100%</span>
              <span className="text-xs text-neutral-500 font-medium">Direct Factory OEM</span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black font-mono text-[#1A1A1A] block">&lt;0.4%</span>
              <span className="text-xs text-neutral-500 font-medium">Defect Tolerance</span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black font-mono text-[#1A1A1A] block">4-Tier</span>
              <span className="text-xs text-neutral-500 font-medium">Inline QC Audits</span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black font-mono text-[#1A1A1A] block">Worldwide</span>
              <span className="text-xs text-neutral-500 font-medium">Insured Express Export</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Gallery Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-8">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategoryId("all")}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border shrink-0 ${
                selectedCategoryId === "all"
                  ? "bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-sm"
                  : "bg-white text-neutral-600 border-black/[0.08] hover:border-black/20 hover:text-black"
              }`}
            >
              All Work ({initialProjects.length})
            </button>

            {categories.map((cat) => {
              const count = initialProjects.filter((p) => p.category_id === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border shrink-0 ${
                    selectedCategoryId === cat.id
                      ? "bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-sm"
                      : "bg-white text-neutral-600 border-black/[0.08] hover:border-black/20 hover:text-black"
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Work Cards Grid */}
          {filteredProjects.length === 0 ? (
            <div className="py-20 text-center rounded-3xl border border-dashed border-black/[0.12] bg-white p-8">
              <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center mx-auto mb-3">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#1A1A1A] mb-1">
                No work items in this category yet
              </h3>
              <p className="text-xs text-neutral-500 max-w-md mx-auto mb-4">
                We are actively uploading recent client production runs. Select another category or contact our team to view private portfolio samples.
              </p>
              <button
                onClick={() => setSelectedCategoryId("all")}
                className="px-5 py-2 rounded-full bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-wider hover:bg-amber-600 transition-colors"
              >
                View All Work
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredProjects.map((project) => {
                const images = getProjectImages(project);
                const category = categories.find((c) => c.id === project.category_id);

                return (
                  <div
                    key={project.id}
                    onClick={() => handleOpenModal(project, 0)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleOpenModal(project, 0);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`View production gallery for ${project.title}`}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.11)] hover:border-amber-500/40 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
                  >
                    {/* Primary Image Container */}
                    <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
                      <Image
                        src={images[0]}
                        alt={project.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                      />

                      {/* Category Badge (Top-Left) */}
                      <span className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-black/[0.08] text-[10px] font-mono uppercase tracking-wider text-[#1A1A1A] font-bold shadow-xs">
                        {category ? category.name : project.industry || "Custom OEM"}
                      </span>

                      {/* Multiple Images Indicator (Top-Right) */}
                      {images.length > 1 && (
                        <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 bg-black/75 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-mono shadow-xs border border-white/10">
                          <Layers className="w-3 h-3 text-amber-400" />
                          <span>{images.length} Photos</span>
                        </span>
                      )}

                      {/* Hover Overlay with Action Icon */}
                      <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                        <div className="w-12 h-12 rounded-full bg-white/95 text-[#1A1A1A] flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                          <Eye className="w-5 h-5 text-amber-800" />
                        </div>
                      </div>
                    </div>

                    {/* Card Content Footer */}
                    <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-white">
                      <div>
                        <h3 className="font-bold text-sm sm:text-base text-[#1A1A1A] group-hover:text-amber-800 transition-colors line-clamp-1 mb-1.5">
                          {project.title}
                        </h3>
                        {project.description && (
                          <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                            {project.description}
                          </p>
                        )}
                      </div>

                      <div className="mt-3 pt-3 border-t border-black/[0.06] flex items-center justify-between">
                        <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                          Inspect Photos
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 group-hover:text-[#1A1A1A] transition-colors">
                          <span>View Slider</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* BIG VIEW MODAL WITH IMAGE SLIDER */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseModal();
          }}
        >
          {/* Modal Container */}
          <div className="relative w-full max-w-5xl bg-neutral-900 border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[95vh]">
            {/* Top Modal Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 bg-neutral-900/90 backdrop-blur-sm z-20">
              <div className="flex items-center gap-3 min-w-0 pr-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                  {categories.find((c) => c.id === activeProject.category_id)?.name ||
                    activeProject.industry ||
                    "OEM Production"}
                </span>
                <h2
                  id="modal-project-title"
                  className="text-sm sm:text-base font-bold text-white truncate"
                >
                  {activeProject.title}
                </h2>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-mono text-white/60">
                  {activeImageIndex + 1} / {activeImages.length}
                </span>
                <button
                  onClick={handleCloseModal}
                  aria-label="Close modal"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Central Slider Area */}
            <div className="relative flex-1 flex items-center justify-center bg-black min-h-[320px] sm:min-h-[460px] max-h-[65vh] p-4 sm:p-6 select-none overflow-hidden">
              {/* Active Image Presentation */}
              <div className="relative w-full h-full max-w-4xl aspect-[4/3] sm:aspect-[16/10] max-h-[58vh]">
                <Image
                  src={activeImages[activeImageIndex]}
                  alt={`${activeProject.title} — Photo ${activeImageIndex + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1200px"
                  priority
                  className="object-contain transition-all duration-200"
                />
              </div>

              {/* Slider Arrows (Only if multiple images) */}
              {activeImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    aria-label="Previous image"
                    className="absolute left-3 sm:left-6 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-amber-600 text-white border border-white/20 hover:border-amber-600 flex items-center justify-center shadow-lg transition-all"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>

                  <button
                    onClick={handleNextImage}
                    aria-label="Next image"
                    className="absolute right-3 sm:right-6 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-amber-600 text-white border border-white/20 hover:border-amber-600 flex items-center justify-center shadow-lg transition-all"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Thumbnail Strip (if multiple images) */}
            {activeImages.length > 1 && (
              <div className="px-4 py-3 bg-neutral-950/80 border-t border-white/10 overflow-x-auto scrollbar-none flex items-center justify-center gap-2 sm:gap-3">
                {activeImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx
                        ? "border-amber-400 scale-105 shadow-md"
                        : "border-white/20 hover:border-white/60 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={imgUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="60px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Modal Bottom Footer / CTA */}
            <div className="px-5 sm:px-6 py-4 bg-neutral-900 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="max-w-xl">
                {activeProject.description ? (
                  <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                    {activeProject.description}
                  </p>
                ) : (
                  <p className="text-xs text-white/60">
                    Direct factory production run manufactured to international standards.
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Inquire Similar Production</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quote Modal Integration */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        defaultCategory={
          activeProject
            ? categories.find((c) => c.id === activeProject.category_id)?.name
            : undefined
        }
        defaultProductName={activeProject?.title}
      />
    </div>
  );
}
