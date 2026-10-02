"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Play, Pause, Film, ShieldCheck, Box, Clock, Globe2, Sparkles, MessageSquare } from "lucide-react";
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
    <section className="relative overflow-hidden min-h-[85vh] sm:min-h-[92vh] flex items-center justify-center pt-32 pb-16 sm:pt-44 sm:pb-24">
      {/* Complete Full-Bleed Hero Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/products/varsity-jacket.jpg"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-fade-in"
        >
          <source src="/videos/varsity-jacket-hero.mp4" type="video/mp4" />
        </video>

        {/* Reduced Black Overlay for High Video Clarity & Visibility */}
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full flex flex-col items-center text-center">
        {/* Eyebrow Badge with Pulsing Emerald Status Dot */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-sm mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-white/90 font-bold">
            CUSTOM OEM/ODM APPAREL &amp; GEAR
          </span>
        </div>

        {/* Short, Punchy, Bold Luxury Technical Heading */}
        <h1 className="tracking-tight text-4xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.06] max-w-4xl mb-5 drop-shadow-[0_3px_10px_rgba(0,0,0,0.8)]">
          PRECISION GEAR &amp; APPAREL.
        </h1>

        {/* Technical Value Proposition Subheading */}
        <p className="text-sm sm:text-base md:text-lg text-white/95 max-w-2xl font-medium leading-relaxed mb-9 px-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
          Direct factory OEM and private label manufacturing for custom combat sports equipment and performance apparel. Low MOQ starting at 30 pcs per design with rapid 7-day sampling.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 w-full sm:w-auto max-w-xs sm:max-w-none">
          <MagneticElement strength={0.3} className="w-full sm:w-auto">
            <button
              onClick={() => setQuoteModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>REQUEST OEM QUOTE</span>
              <ArrowUpRight className="w-4 h-4 text-slate-900 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </MagneticElement>

          <MagneticElement strength={0.2} className="w-full sm:w-auto">
            <Link
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white backdrop-blur-md font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              <span>BROWSE CATALOG</span>
              <ArrowUpRight className="w-4 h-4 text-white/80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </MagneticElement>

          <MagneticElement strength={0.2} className="w-full sm:w-auto">
            <a
              href="https://wa.me/923417146935?text=Hi%20Gloves%20Storm%2C%20I'm%20interested%20in%20custom%20manufacturing%20and%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-emerald-500/40 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold text-xs uppercase tracking-wider transition-all shadow-xs backdrop-blur-md"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Direct</span>
            </a>
          </MagneticElement>
        </div>

        {/* Instant Trust Bar: 4-Column Frosted Glass Stat Grid */}
        <div className="mt-12 sm:mt-16 w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-3.5 text-left">
          <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-white/15 transition-all group">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Box className="w-3.5 h-3.5 text-slate-300" />
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-300 font-semibold">
                Low MOQ
              </span>
            </div>
            <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight block">
              30 Pcs / Design
            </span>
            <span className="text-[11px] text-slate-300/80 block mt-0.5">
              Accessible startup batch
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-white/15 transition-all group">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-300" />
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-300 font-semibold">
                Sample Turnaround
              </span>
            </div>
            <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight block">
              7 Days
            </span>
            <span className="text-[11px] text-slate-300/80 block mt-0.5">
              Rapid master prototype
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-white/15 transition-all group">
            <div className="flex items-center gap-1.5 mb-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-300" />
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-300 font-semibold">
                Production Time
              </span>
            </div>
            <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight block">
              7–14 Working Days
            </span>
            <span className="text-[11px] text-slate-300/80 block mt-0.5">
              High-speed bulk flow
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-white/15 transition-all group">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Globe2 className="w-3.5 h-3.5 text-slate-300" />
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-300 font-semibold">
                Global Export
              </span>
            </div>
            <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight block">
              USA, UK &amp; Europe
            </span>
            <span className="text-[11px] text-slate-300/80 block mt-0.5">
              Door-to-Door DDP Air
            </span>
          </div>
        </div>

        {/* Video Play/Pause Control Pill (Bottom Right Floating) */}
        <button
          onClick={toggleVideo}
          className="mt-6 sm:mt-8 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 shadow-md backdrop-blur-xl text-[10px] font-mono uppercase text-white/80 transition-all cursor-pointer"
          title={isPlaying ? "Pause background video" : "Play background video"}
        >
          <Film className="w-3 h-3 text-slate-300" />
          <span>{isPlaying ? "Pause Video" : "Play Video"}</span>
          {isPlaying ? (
            <Pause className="w-2.5 h-2.5 text-slate-300" />
          ) : (
            <Play className="w-2.5 h-2.5 text-emerald-400 fill-current" />
          )}
        </button>
      </div>

      {/* Quote / RFQ Modal */}
      <InteractiveRfqModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialProduct="Combat Equipment & Custom Apparel"
        initialCategory="OEM Manufacturing"
      />
    </section>
  );
}
