"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Play, Pause, Film, Box, Clock, ShieldCheck, Globe2 } from "lucide-react";
import MagneticElement from "../ui/MagneticElement";
import InteractiveRfqModal from "../ui/InteractiveRfqModal";

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative overflow-hidden min-h-[100dvh] w-full flex items-center justify-center pt-24 pb-12 sm:pt-36 sm:pb-16 md:pt-40 md:pb-20">
      {/* ─── 100% Full-Bleed Background Video (Covers entire section from top to bottom on all screens) ─── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/hero-poster.jpg"
          className="hero-bg-media"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            minWidth: "100%",
            minHeight: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        >
          <source src="/videos/varsity-jacket-hero.mp4" type="video/mp4" />
        </video>

        {/* Clean, High-Contrast Dark Overlay for Maximum Legibility */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/60" />
      </div>

      {/* ─── Hero Content (Perfect Center Balance on Mobile & Desktop) ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center my-auto">
        {/* Eyebrow Status Badge with #FFB900 Interactive Pulse Dot */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow-xs mb-3.5 sm:mb-5 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <span className="w-2 h-2 rounded-full bg-[#FFB900] animate-pulse shrink-0 shadow-[0_0_8px_rgba(255,185,0,0.8)]" />
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-white/90 font-bold">
            INTERNATIONAL APPAREL OEM &amp; EXPORTER · EST. 2019
          </span>
        </div>

        {/* Target H1 */}
        <h1 className="tracking-tight text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.08] max-w-5xl mb-3 sm:mb-4 uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
          CUSTOM CLOTHING &amp; SPORTSWEAR MANUFACTURER
        </h1>

        {/* Subheadline (Clean High-Contrast White) */}
        <p className="text-sm sm:text-lg md:text-xl font-bold text-neutral-100 tracking-tight max-w-3xl mb-3 sm:mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          Direct OEM Factory &amp; Private Label Apparel Exporter for International Brands
        </p>

        {/* Body Copy */}
        <p className="text-xs sm:text-sm md:text-base text-white/90 max-w-2xl font-normal leading-relaxed mb-6 sm:mb-8 px-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
          Gloves Storm is an international OEM/ODM apparel manufacturer and exporter specializing in custom sportswear, athletic uniforms, gym activewear, heavyweight streetwear, and private label collections. Direct Sialkot factory production, low MOQ from 35 pieces, 5–7 day prototyping, and insured DDP global shipping.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto max-w-xs sm:max-w-none">
          <MagneticElement strength={0.3} className="w-full sm:w-auto">
            <button
              onClick={() => setQuoteModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:px-9 sm:py-4 rounded-full bg-[#FFB900] hover:bg-[#E5A700] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_4px_24px_rgba(255,185,0,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>REQUEST OEM QUOTE</span>
              <ArrowUpRight className="w-4 h-4 text-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </MagneticElement>

          <MagneticElement strength={0.2} className="w-full sm:w-auto">
            <Link
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-black/40 hover:bg-black/60 border border-white/25 hover:border-[#FFB900] text-white hover:text-white backdrop-blur-md font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              <span>BROWSE CATALOG</span>
              <ArrowUpRight className="w-4 h-4 text-white/80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </MagneticElement>
        </div>

        {/* 4-Column Trust Bar (Balanced & Compact on Mobile) */}
        <div className="mt-8 sm:mt-12 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5 text-left">
          <div className="p-3 sm:p-4 rounded-xl bg-black/55 backdrop-blur-md border border-white/15 hover:border-[#FFB900]/40 transition-colors">
            <div className="flex items-center gap-1.5 mb-1">
              <Box className="w-3.5 h-3.5 text-[#FFB900]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-neutral-300 font-semibold">
                Low MOQ
              </span>
            </div>
            <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight block">
              35–50 Pcs / Style
            </span>
            <span className="text-[10px] sm:text-[11px] text-neutral-300/80 block mt-0.5">
              Flexible sizing &amp; colors
            </span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-black/55 backdrop-blur-md border border-white/15 hover:border-[#FFB900]/40 transition-colors">
            <div className="flex items-center gap-1.5 mb-1">
              <Clock className="w-3.5 h-3.5 text-[#FFB900]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-neutral-300 font-semibold">
                Sampling
              </span>
            </div>
            <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight block">
              5–7 Days
            </span>
            <span className="text-[10px] sm:text-[11px] text-neutral-300/80 block mt-0.5">
              Rapid master prototype
            </span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-black/55 backdrop-blur-md border border-white/15 hover:border-[#FFB900]/40 transition-colors">
            <div className="flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FFB900]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-neutral-300 font-semibold">
                QC Standard
              </span>
            </div>
            <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight block">
              AQL 2.5 Strict QC
            </span>
            <span className="text-[10px] sm:text-[11px] text-neutral-300/80 block mt-0.5">
              100% pre-shipment audit
            </span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-black/55 backdrop-blur-md border border-white/15 hover:border-[#FFB900]/40 transition-colors">
            <div className="flex items-center gap-1.5 mb-1">
              <Globe2 className="w-3.5 h-3.5 text-[#FFB900]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-neutral-300 font-semibold">
                Global Export
              </span>
            </div>
            <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight block">
              USA, UK &amp; Worldwide
            </span>
            <span className="text-[10px] sm:text-[11px] text-neutral-300/80 block mt-0.5">
              DDP Air 3–5 Days &amp; Ocean
            </span>
          </div>
        </div>

        {/* Video Play/Pause Control Button */}
        <button
          onClick={toggleVideo}
          className="mt-4 sm:mt-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 hover:bg-black/70 border border-white/20 hover:border-[#FFB900]/60 shadow-sm backdrop-blur-md text-[10px] font-mono uppercase text-white/80 transition-all cursor-pointer"
          title={isPlaying ? "Pause background video" : "Play background video"}
        >
          <Film className="w-3 h-3 text-[#FFB900]" />
          <span>{isPlaying ? "Pause Video" : "Play Video"}</span>
          {isPlaying ? (
            <Pause className="w-2.5 h-2.5 text-white/80" />
          ) : (
            <Play className="w-2.5 h-2.5 text-[#FFB900] fill-current" />
          )}
        </button>
      </div>

      {/* Quote / RFQ Modal */}
      <InteractiveRfqModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialProduct="Custom Clothing & Sportswear"
        initialCategory="Custom Apparel Manufacturing"
      />
    </section>
  );
}
