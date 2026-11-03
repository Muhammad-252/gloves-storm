"use client";

import { useState } from "react";
import Image from "next/image";
import { CaseStudy } from "@/lib/data/caseStudies";
import {
  Calendar,
  Layers,
  MapPin,
  Package,
  Scissors,
  Sparkles,
  Tag,
  CheckCircle2,
} from "lucide-react";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const activePhoto =
    caseStudy.photos[activePhotoIndex] ||
    caseStudy.photos[0] ||
    "/images/products/varsity-jacket.jpg";

  return (
    <article className="rounded-2xl sm:rounded-3xl bg-white border border-neutral-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col lg:flex-row transition-all duration-300 hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)]">
      {/* 1. Photo Showcase Gallery (3–6 Photos) */}
      <div className="lg:w-1/2 p-4 sm:p-6 bg-neutral-50 flex flex-col justify-between">
        <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-neutral-200 mb-3 sm:mb-4 border border-neutral-200/80">
          <Image
            src={activePhoto}
            alt={`${caseStudy.title} production run sample`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          {caseStudy.isPlaceholder && (
            <div className="absolute top-3 left-3 bg-[#FFB900] text-black font-mono font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
              Template Placeholder
            </div>
          )}
        </div>

        {/* Thumbnail Selector */}
        {caseStudy.photos.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {caseStudy.photos.map((photo, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActivePhotoIndex(idx)}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                  activePhotoIndex === idx
                    ? "border-black shadow-xs scale-95"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
                aria-label={`View photo ${idx + 1}`}
              >
                <Image
                  src={photo}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 2. Structured Case Study Details */}
      <div className="lg:w-1/2 p-5 sm:p-8 flex flex-col justify-between space-y-6">
        <div>
          {/* Header & Meta Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[10px] font-mono font-semibold">
              <MapPin className="w-3 h-3 text-neutral-600" />
              <span>{caseStudy.country}</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[10px] font-mono font-semibold">
              <Tag className="w-3 h-3 text-neutral-600" />
              <span>{caseStudy.clientType}</span>
            </span>
          </div>

          <h3 className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight text-neutral-900 mb-2">
            {caseStudy.title}
          </h3>

          <p className="text-xs font-mono text-neutral-500 uppercase tracking-wider mb-6">
            Division: {caseStudy.productCategory}
          </p>

          {/* Key Manufacturing Specifications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6 text-xs">
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/70">
              <span className="text-[10px] uppercase font-mono text-neutral-500 flex items-center gap-1 mb-1">
                <Layers className="w-3 h-3" />
                <span>Fabric &amp; GSM</span>
              </span>
              <span className="font-bold text-neutral-900 block">
                {caseStudy.fabricAndGsm}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/70">
              <span className="text-[10px] uppercase font-mono text-neutral-500 flex items-center gap-1 mb-1">
                <Scissors className="w-3 h-3" />
                <span>Decoration</span>
              </span>
              <span className="font-bold text-neutral-900 block">
                {caseStudy.decorationMethod}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/70">
              <span className="text-[10px] uppercase font-mono text-neutral-500 flex items-center gap-1 mb-1">
                <Package className="w-3 h-3" />
                <span>Production Run</span>
              </span>
              <span className="font-bold text-neutral-900 block">
                {caseStudy.quantity}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/70">
              <span className="text-[10px] uppercase font-mono text-neutral-500 flex items-center gap-1 mb-1">
                <Calendar className="w-3 h-3" />
                <span>Timeline</span>
              </span>
              <span className="font-bold text-neutral-900 block">
                {caseStudy.timeline}
              </span>
            </div>
          </div>

          {/* Result Summary */}
          <div className="p-4 rounded-xl bg-[#FFFDF5] border border-[#FFE8A3] text-xs">
            <span className="text-[10px] font-mono font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Production Result &amp; QC Outcome</span>
            </span>
            <p className="text-neutral-700 leading-relaxed">
              {caseStudy.resultSummary}
            </p>
          </div>
        </div>

        {caseStudy.isPlaceholder && (
          <div className="pt-2 text-[11px] font-mono text-neutral-400">
            * TODO for business owner: Replace this template entry with real case study details and production photography.
          </div>
        )}
      </div>
    </article>
  );
}
