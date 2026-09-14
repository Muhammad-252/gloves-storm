"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Play, Pause, Film } from "lucide-react";
import GooeyButton from "../ui/GooeyButton";
import MagneticElement from "../ui/MagneticElement";

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(true);
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16 bg-[#0f172a]">
      {/* Background High-Resolution Varsity Jacket Video & Light Black Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-100 contrast-105"
        >
          <source src="/videos/varsity-jacket-hero.mp4" type="video/mp4" />
        </video>

        {/* Clean, Light Black Overlay - reveals the varsity jacket video clearly while ensuring crisp contrast */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

        {/* Bottom edge transition to white page */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />

        {/* Video Control Pill (Bottom Right) */}
        <button
          onClick={toggleVideo}
          className="absolute bottom-6 right-6 z-20 hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 hover:bg-black/75 border border-white/25 shadow-xl backdrop-blur-md text-[10px] font-mono uppercase text-white/90 hover:text-white transition-all cursor-pointer"
          title={isPlaying ? "Pause varsity jacket video" : "Play varsity jacket video"}
        >
          <Film className="w-3.5 h-3.5 text-amber-400" />
          <span>{isPlaying ? "Live Reel: Varsity Jacket" : "Reel Paused"}</span>
          {isPlaying ? (
            <Pause className="w-3 h-3 text-neutral-300" />
          ) : (
            <Play className="w-3 h-3 text-amber-400 fill-current" />
          )}
        </button>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full flex flex-col items-center text-center">
        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 border border-white/20 shadow-xl mb-8 animate-in fade-in slide-in-from-bottom-3 duration-700 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-amber-300 font-bold">
            Sialkot Global OEM & Private Label
          </span>
          <span className="text-white/30 text-xs">|</span>
          <span className="text-[10px] sm:text-xs text-white/90 font-medium">
            2026 Production Slots Open
          </span>
        </div>

        {/* Hero Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] uppercase text-white leading-[0.95] max-w-5xl mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
          BUILT FOR BRANDS. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
            MADE TO PERFORM.
          </span>
        </h1>

        {/* Supporting Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-white max-w-2xl font-normal leading-relaxed mb-10 drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
          Custom varsity letterman jackets, professional combat gear, and athletic apparel engineered with millimeter precision for luxury labels and fight clubs worldwide.
        </p>

        {/* Primary and Secondary Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <MagneticElement strength={0.3}>
            <GooeyButton
              href="/contact"
              variant="gold-solid"
              size="lg"
              className="w-full sm:w-auto shadow-xl"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </GooeyButton>
          </MagneticElement>

          <MagneticElement strength={0.2}>
            <GooeyButton
              href="/products"
              variant="outline-white"
              size="lg"
              className="w-full sm:w-auto"
            >
              <span className="text-white">EXPLORE PRODUCTS</span>
            </GooeyButton>
          </MagneticElement>
        </div>

        {/* Quick Highlights / Trust Metrics Cards */}
        <div className="mt-16 pt-8 border-t border-white/15 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left">
          <div className="p-5 rounded-2xl bg-black/40 hover:bg-black/55 border border-white/15 shadow-xl hover:border-amber-400/50 transition-all backdrop-blur-md group">
            <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400/90 mb-1 font-semibold">
              Location
            </span>
            <span className="text-sm font-bold text-white uppercase tracking-wider block">
              Sialkot, Pakistan
            </span>
          </div>
          <div className="p-5 rounded-2xl bg-black/40 hover:bg-black/55 border border-white/15 shadow-xl hover:border-amber-400/50 transition-all backdrop-blur-md group">
            <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400/90 mb-1 font-semibold">
              Minimum Order
            </span>
            <span className="text-sm font-bold text-white uppercase tracking-wider block">
              From 25 - 50 Units
            </span>
          </div>
          <div className="p-5 rounded-2xl bg-black/40 hover:bg-black/55 border border-white/15 shadow-xl hover:border-amber-400/50 transition-all backdrop-blur-md group">
            <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400/90 mb-1 font-semibold">
              Specialty
            </span>
            <span className="text-sm font-bold text-white uppercase tracking-wider block">
              Varsity & Leather OEM
            </span>
          </div>
          <div className="p-5 rounded-2xl bg-black/40 hover:bg-black/55 border border-white/15 shadow-xl hover:border-amber-400/50 transition-all backdrop-blur-md group">
            <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400/90 mb-1 font-semibold">
              Global Shipping
            </span>
            <span className="text-sm font-bold text-white uppercase tracking-wider block">
              DHL • FedEx • Air • Sea
            </span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 flex flex-col items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/70 font-semibold">
            SCROLL TO EXPLORE
          </span>
          <ChevronDown className="w-4 h-4 text-amber-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
