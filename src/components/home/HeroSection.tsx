"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Play, Pause } from "lucide-react";
import MagneticElement from "../ui/MagneticElement";
import InteractiveRfqModal from "../ui/InteractiveRfqModal";
import { BUSINESS_CONFIG } from "@/lib/business";

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Only auto-load background video on desktop viewports (>= 768px) and when user doesn't have Save-Data enabled
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
    const isSaveData = typeof navigator !== "undefined" && (navigator as any)?.connection?.saveData === true;

    if (isDesktop && !isSaveData) {
      // Defer video loading slightly so initial CSS, fonts, and H1 paint with zero network contention
      const timer = setTimeout(() => {
        setVideoSrc("/videos/varsity-jacket-hero.mp4");
        setIsPlaying(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const toggleVideo = () => {
    if (!videoSrc) {
      setVideoSrc("/videos/varsity-jacket-hero.mp4");
      setIsPlaying(true);
      setTimeout(() => {
        videoRef.current?.play().catch(() => {});
      }, 50);
      return;
    }

    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const facts = [
    { value: `${BUSINESS_CONFIG.moq} pcs`, label: "Minimum per style" },
    { value: BUSINESS_CONFIG.samplingDaysShort, label: "Physical samples" },
    { value: "AQL 2.5", label: "Pre-shipment inspection" },
    { value: "4–7 days", label: "Courier to USA, UK & EU" },
  ];

  return (
    <section className="relative w-full px-2 sm:px-3 pt-2 sm:pt-3 pb-10 sm:pb-16">
      {/* ─── Inset media frame ─── */}
      <div className="relative overflow-hidden rounded-[22px] sm:rounded-[32px] min-h-[88svh] sm:min-h-[92svh] flex flex-col justify-end bg-ink">
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0" aria-hidden="true">
          <video
            ref={videoRef}
            autoPlay={isPlaying}
            loop
            muted
            playsInline
            preload="none"
            poster="/images/hero-poster.webp"
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
            {videoSrc && <source src={videoSrc} type="video/mp4" />}
            <track
              kind="captions"
              src="data:text/vtt,WEBVTT%0A%0A00:00:00.000%20--%3E%2000:00:10.000%0AAmbient%20background%20video"
              srcLang="en"
              label="Ambient video"
              default
            />
          </video>

          {/* Soft cinematic grade: dark at the bottom where the copy sits */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a09] via-[#0b0a09]/55 to-[#0b0a09]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0a09]/70 via-transparent to-transparent" />
        </div>

        {/* ─── Hero content ─── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 pb-8 sm:pb-10 lg:pb-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] font-medium text-white/75 mb-5 sm:mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB900]" />
                Sialkot, Pakistan · Exporting since 2019
              </span>

              <h1 className="display-xl text-white">
                Custom clothing &amp; sportswear manufacturer,{" "}
                <em className="accent-serif text-[#FFD466]">made to your spec.</em>
              </h1>

              <p className="mt-5 sm:mt-7 text-[15px] sm:text-lg text-white/75 leading-relaxed max-w-xl">
                Private label teamwear, gym wear and heavyweight streetwear for brands in the USA, UK and Europe.
                From {BUSINESS_CONFIG.moq} pieces per style, samples in {BUSINESS_CONFIG.samplingDaysShort}, DDP delivery on request.
              </p>

              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3">
                <MagneticElement strength={0.25} className="w-full sm:w-auto">
                  <button
                    onClick={() => setQuoteModalOpen(true)}
                    className="group w-full sm:w-auto inline-flex items-center justify-between sm:justify-center gap-3 pl-6 pr-2 py-2 rounded-full bg-[#FFB900] hover:bg-[#FFC633] text-ink font-semibold text-[15px] tracking-[-0.01em] transition-colors cursor-pointer"
                  >
                    <span>Request a quote</span>
                    <span className="w-10 h-10 rounded-full bg-ink flex items-center justify-center transition-transform group-hover:rotate-45">
                      <ArrowUpRight className="w-4 h-4 text-[#FFB900]" />
                    </span>
                  </button>
                </MagneticElement>

                <Link
                  href="/products"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-medium text-[15px] tracking-[-0.01em] transition-colors"
                >
                  Browse the catalog
                </Link>
              </div>
            </div>

            {/* Video control */}
            <button
              onClick={toggleVideo}
              className="self-start lg:self-end shrink-0 whitespace-nowrap inline-flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-[13px] text-white/85 transition-colors cursor-pointer"
              title={isPlaying ? "Pause background video" : "Play background video"}
              aria-label={isPlaying ? "Pause background video" : "Play background video"}
            >
              <span className="w-8 h-8 rounded-full bg-white text-ink flex items-center justify-center">
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
              </span>
              <span>{isPlaying ? "Pause film" : "Watch the factory"}</span>
            </button>
          </div>

          {/* Fact strip */}
          <dl className="mt-10 sm:mt-14 grid grid-cols-2 lg:grid-cols-4 border-t border-white/15">
            {facts.map((fact, i) => (
              <div
                key={fact.label}
                className={`pt-5 sm:pt-6 pr-4 ${i % 2 === 1 ? "pl-4 lg:pl-6 border-l border-white/15" : ""} ${i === 2 ? "lg:pl-6 lg:border-l lg:border-white/15" : ""} ${i >= 2 ? "mt-5 lg:mt-0" : ""}`}
              >
                <dt className="text-[12px] sm:text-[13px] text-white/55 order-2">{fact.label}</dt>
                <dd className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-white mt-1">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
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
