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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16 bg-[#0C0D0E]">
      {/* Background Video & Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-90 contrast-110"
        >
          <source src="/videos/varsity-jacket-hero.mp4" type="video/mp4" />
        </video>

        {/* Dark obsidian overlay system */}
        <div className="absolute inset-0 bg-[#0C0D0E]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D0E]/90 via-transparent to-[#0C0D0E]/40" />

        {/* Accent glow — top left atmospheric light */}
        <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-[#FF6B00]/[0.06] rounded-full blur-[120px] pointer-events-none" />

        {/* Bottom edge transition into page body */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0C0D0E] to-transparent pointer-events-none" />

        {/* Video Control Pill */}
        <button
          onClick={toggleVideo}
          className="absolute bottom-6 right-6 z-20 hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/15 shadow-xl backdrop-blur-md text-[10px] font-mono uppercase text-white/80 hover:text-white transition-all cursor-pointer"
          title={isPlaying ? "Pause varsity jacket video" : "Play varsity jacket video"}
        >
          <Film className="w-3.5 h-3.5 text-[#FF6B00]" />
          <span>{isPlaying ? "Live Reel: Varsity Jacket" : "Reel Paused"}</span>
          {isPlaying ? (
            <Pause className="w-3 h-3 text-white/60" />
          ) : (
            <Play className="w-3 h-3 text-[#FF6B00] fill-current" />
          )}
        </button>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full flex flex-col items-center text-center">
        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/30 shadow-[0_0_20px_rgba(255,107,0,0.15)] mb-8 animate-in fade-in slide-in-from-bottom-3 duration-700 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse shadow-[0_0_6px_rgba(255,107,0,0.9)]" />
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#FF6B00] font-bold">
            Sialkot Global OEM &amp; Private Label
          </span>
          <span className="text-white/20 text-xs">|</span>
          <span className="text-[10px] sm:text-xs text-[#F5F5F7]/80 font-medium">
            2026 Production Slots Open
          </span>
        </div>

        {/* Hero Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[90px] font-black tracking-[-0.04em] uppercase text-[#F5F5F7] leading-[0.93] max-w-5xl mb-6">
          BUILT FOR BRANDS.{" "}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#ff8533] to-[#FF6B00]">
            MADE TO PERFORM.
          </span>
        </h1>

        {/* Supporting Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-[#F5F5F7]/75 max-w-2xl font-normal leading-relaxed mb-10">
          Custom varsity letterman jackets, professional combat gear, and athletic apparel engineered with millimeter precision for luxury labels and fight clubs worldwide.
        </p>

        {/* Primary and Secondary CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <MagneticElement strength={0.3}>
            <GooeyButton
              href="/contact"
              variant="gold-solid"
              size="lg"
              className="w-full sm:w-auto shadow-[0_8px_32px_rgba(255,107,0,0.35)]"
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
        <div className="mt-16 pt-8 border-t border-white/[0.08] w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 text-left">
          {[
            { label: "Location", value: "Sialkot, Pakistan" },
            { label: "Minimum Order", value: "From 25 – 50 Units" },
            { label: "Specialty", value: "Varsity & Leather OEM" },
            { label: "Global Shipping", value: "DHL • FedEx • Air • Sea" },
          ].map((item) => (
            <div
              key={item.label}
              className="p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] hover:border-[#FF6B00]/40 shadow-lg transition-all duration-300 backdrop-blur-md group"
            >
              <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#FF6B00]/80 mb-1 font-semibold">
                {item.label}
              </span>
              <span className="text-sm font-bold text-[#F5F5F7] uppercase tracking-wider block">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/60 font-semibold">
            SCROLL TO EXPLORE
          </span>
          <ChevronDown className="w-4 h-4 text-[#FF6B00] animate-bounce" />
        </div>
      </div>
    </section>
  );
}
