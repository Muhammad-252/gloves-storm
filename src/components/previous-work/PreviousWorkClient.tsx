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

  // Helper to extract clean array of image URLs for any project in sort_order
  const getProjectImages = useCallback((proj: Project): string[] => {
    const list: string[] = [];
    if (Array.isArray(proj.images) && proj.images.length > 0) {
      const sorted = [...proj.images].sort(
        (a: any, b: any) => (a?.sort_order ?? 0) - (b?.sort_order ?? 0)
      );
      for (const img of sorted) {
        const url = typeof img === "string" ? img : img?.image_url;
        if (url && !list.includes(url)) {
          list.push(url);
        }
      }
    }
    if (proj.featured_image && !list.includes(proj.featured_image)) {
      list.unshift(proj.featured_image);
    }
    return list.length > 0
      ? list
      : [proj.featured_image || "/images/products/basketball-uniform.jpg"];
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
    <div className="min-h-screen bg-transparent text-slate-900 pt-20 sm:pt-28 pb-16 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Editorial Header Section */}
        <section className="rounded-2xl sm:rounded-3xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-5 sm:p-8 md:p-12 lg:p-14 relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/90 mb-3 sm:mb-4 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFB900] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] text-slate-800 font-bold">
                FACTORY PRODUCTION ARCHIVE
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-900 leading-[1.1] mb-3 sm:mb-5">
              PREVIOUS WORK &amp; COMPLETED ORDERS
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl font-normal">
              Every order shown here was manufactured at our direct Sialkot facility — from single prototype samples to full container-load bulk orders. Browse custom sportswear, athletic team uniforms, seamless activewear, heavyweight hoodies, and private label garments manufactured for brands across the USA, United Kingdom, and international export markets.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mt-6 sm:mt-10 pt-6 sm:pt-8 border-t border-slate-200/80 relative z-10">
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/70 backdrop-blur-md border border-white/80">
              <span className="text-lg sm:text-2xl font-black font-mono text-slate-900 block">100%</span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-medium">Direct Sialkot OEM</span>
            </div>
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/70 backdrop-blur-md border border-white/80">
              <span className="text-lg sm:text-2xl font-black font-mono text-slate-900 block">&lt;0.4%</span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-medium">Defect Tolerance</span>
            </div>
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/70 backdrop-blur-md border border-white/80">
              <span className="text-lg sm:text-2xl font-black font-mono text-slate-900 block">4-Tier</span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-medium">Inline QC Audits</span>
            </div>
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/70 backdrop-blur-md border border-white/80">
              <span className="text-lg sm:text-2xl font-black font-mono text-slate-900 block">Global</span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-medium">Express Air Export</span>
            </div>
          </div>
        </section>

        {/* Main Gallery Section */}
        <section className="space-y-6 sm:space-y-8">
          {/* Category Filter Pills (Floating Frosted Dock) */}
          <div className="p-1.5 sm:p-2 rounded-xl sm:rounded-2xl bg-white/80 backdrop-blur-md border border-white/90 shadow-sm flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setSelectedCategoryId("all")}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategoryId === "all"
                  ? "bg-[#FFB900] text-black font-extrabold shadow-sm"
                  : "text-slate-600 hover:bg-white/90 hover:text-slate-900"
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
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategoryId === cat.id
                      ? "bg-[#FFB900] text-black font-extrabold shadow-sm"
                      : "text-slate-600 hover:bg-white/90 hover:text-slate-900"
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Work Cards Grid */}
          {filteredProjects.length === 0 ? (
            <div className="py-16 sm:py-20 text-center rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white/80 backdrop-blur-md p-6 sm:p-8">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-900 flex items-center justify-center mx-auto mb-3">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1">
                No work items in this category yet
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
                We are actively uploading recent client production runs. Select another category or contact our team to view private portfolio samples.
              </p>
              <button
                onClick={() => setSelectedCategoryId("all")}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors"
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
                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl p-3 sm:p-4 bg-white/75 backdrop-blur-md border border-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >
                    <div>
                      {/* Primary Image Container */}
                      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-slate-100/80 mb-3 sm:mb-3.5">
                        <Image
                          src={images[0]}
                          alt={project.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                        />

                        {/* Category Badge (Top-Left) */}
                        <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 bg-white/85 backdrop-blur-md px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-white/90 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-slate-800 font-bold shadow-2xs">
                          {category ? category.name : project.industry || "Custom OEM"}
                        </span>

                        {/* Multiple Images Indicator (Top-Right) */}
                        {images.length > 1 && (
                          <span className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 inline-flex items-center gap-1 bg-slate-900/80 backdrop-blur-md text-white px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono shadow-2xs">
                            <Layers className="w-3 h-3 text-white" />
                            <span>{images.length} Photos</span>
                          </span>
                        )}

                        {/* Hover Overlay with Action Icon */}
                        <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                            <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-slate-900" />
                          </div>
                        </div>
                      </div>

                      {/* Card Content */}
                      <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-slate-700 transition-colors line-clamp-1 mb-1">
                        {project.title}
                      </h3>
                      {project.description && (
                        <p className="text-[11px] sm:text-xs text-slate-600 line-clamp-2 leading-relaxed mb-2.5 sm:mb-3">
                          {project.description}
                        </p>
                      )}

                      {/* Verified Order Specification Badge */}
                      <div className="mb-2.5 sm:mb-3 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-200/80 text-[10px] sm:text-[11px] font-mono text-slate-700 leading-snug flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-900 shrink-0" />
                        <span className="truncate">
                          {project.solution ? project.solution.replace(/\.$/, "") : "250+ Custom Uniforms"} — Delivered to USA / UK Client
                        </span>
                      </div>
                    </div>

                    <div className="pt-2.5 sm:pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] sm:text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                        Sialkot Factory Run
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
                        <span>Inspect Specs</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* COMPACT PRODUCT WORK POPUP WITH IMAGE SLIDER */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseModal();
          }}
        >
          {/* Compact Modal Container */}
          <div className="relative w-full max-w-lg sm:max-w-[540px] bg-white border border-slate-200/90 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[92vh] animate-in zoom-in-95 duration-150">
            {/* Compact Top Header */}
            <div className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 border-b border-slate-100 bg-white z-20">
              <div className="flex items-center gap-2 min-w-0 pr-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono uppercase font-bold bg-slate-100 text-slate-800 border border-slate-200/70 shrink-0">
                  {categories.find((c) => c.id === activeProject.category_id)?.name ||
                    activeProject.industry ||
                    "OEM Work"}
                </span>
                <h2
                  id="modal-project-title"
                  className="text-xs sm:text-sm font-bold text-slate-900 truncate"
                >
                  {activeProject.title}
                </h2>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                  {activeImageIndex + 1} / {activeImages.length}
                </span>
                <button
                  onClick={handleCloseModal}
                  aria-label="Close modal"
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Full-Bleed Image Stage */}
            <div className="relative w-full aspect-[4/3] bg-slate-900 select-none overflow-hidden">
              <Image
                key={activeImages[activeImageIndex]}
                src={activeImages[activeImageIndex]}
                alt={`${activeProject.title} — Photo ${activeImageIndex + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, 540px"
                priority
                className="object-cover transition-all duration-200"
              />

              {/* Left & Right Navigation Arrows */}
              {activeImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImage();
                    }}
                    aria-label="Previous image"
                    className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 border border-slate-200/80 flex items-center justify-center shadow-md hover:scale-105 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage();
                    }}
                    aria-label="Next image"
                    className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 border border-slate-200/80 flex items-center justify-center shadow-md hover:scale-105 transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>

                  {/* Slide Indicator Dots */}
                  <div className="absolute bottom-2.5 sm:bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/60 backdrop-blur-sm">
                    {activeImages.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIndex(idx);
                        }}
                        aria-label={`Go to image ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          activeImageIndex === idx
                            ? "w-4 bg-white"
                            : "w-1.5 bg-white/50 hover:bg-white/80"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Compact Thumbnail Strip (when multiple images exist) */}
            {activeImages.length > 1 && (
              <div className="px-3 sm:px-4 py-2 sm:py-2.5 bg-slate-50 border-t border-slate-100 overflow-x-auto scrollbar-none flex items-center justify-center gap-1.5 sm:gap-2">
                {activeImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? "border-slate-900 ring-1 ring-slate-900/20 opacity-100"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={imgUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Compact Footer / CTA */}
            <div className="px-3.5 sm:px-4 py-2.5 sm:py-3 bg-white border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
              <p className="text-[11px] sm:text-xs text-slate-600 line-clamp-2 leading-snug flex-1">
                {activeProject.description ||
                  "Direct factory production run manufactured to international export standards."}
              </p>

              <button
                type="button"
                onClick={() => setIsQuoteModalOpen(true)}
                className="shrink-0 inline-flex items-center justify-center gap-1.5 bg-[#FFB900] hover:bg-[#E5A700] text-black px-4 py-2 rounded-xl font-extrabold text-[11px] uppercase tracking-wider shadow-[0_4px_16px_rgba(255,185,0,0.3)] transition-all cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-black" />
                <span>Inquire Similar</span>
              </button>
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
