"use client";

import React from "react";
import { Cpu, Scissors, Layers, Printer, Sparkles, CheckCircle2, ShieldAlert } from "lucide-react";

interface FactoryPhotoPlaceholderProps {
  machineName: string;
  processName: string;
  specification?: string;
  alt: string;
  iconType?: "laser" | "stitching" | "sublimation" | "embroidery" | "printing" | "qc";
  className?: string;
}

export default function FactoryPhotoPlaceholder({
  machineName,
  processName,
  specification = "In-House Industrial Grade",
  alt,
  iconType = "laser",
  className = "",
}: FactoryPhotoPlaceholderProps) {
  const getIcon = () => {
    switch (iconType) {
      case "laser":
        return <Scissors className="w-8 h-8 text-white" />;
      case "stitching":
        return <Layers className="w-8 h-8 text-white" />;
      case "sublimation":
        return <Printer className="w-8 h-8 text-white" />;
      case "embroidery":
        return <Sparkles className="w-8 h-8 text-white" />;
      case "printing":
        return <Cpu className="w-8 h-8 text-white" />;
      case "qc":
        return <CheckCircle2 className="w-8 h-8 text-white" />;
      default:
        return <Cpu className="w-8 h-8 text-white" />;
    }
  };

  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative w-full h-full min-h-[220px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex flex-col items-center justify-center p-6 text-center select-none shadow-inner ${className}`}
    >
      {/* Background Technical Grid Pattern */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#334155 1px, transparent 1px), linear-gradient(to right, #334155 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Hidden crawlable alt tag element for SEO spiders */}
      <span className="sr-only">{alt}</span>

      {/* Center Icon & Machine Spec */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-14 h-14 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center mb-3.5 shadow-md">
          {getIcon()}
        </div>

        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-300 font-bold mb-1">
          {processName}
        </span>

        <h4 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug max-w-[260px]">
          {machineName}
        </h4>

        <span className="text-[11px] font-mono text-slate-400 mt-1">
          {specification}
        </span>

        {/* Subtle note requested */}
        <div className="mt-4 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-[10px] font-mono text-slate-400 tracking-wide">
          Real facility photo coming soon
        </div>
      </div>

      {/* Corner Status Badge */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900/90 border border-slate-800 text-[9px] font-mono text-neutral-300">
        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 animate-pulse" />
        <span>Sialkot Unit #1</span>
      </div>
    </div>
  );
}
