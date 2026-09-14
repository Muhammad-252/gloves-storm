"use client";

import React from "react";
import Link from "next/link";

export type GooeyButtonVariant = "gold" | "gold-solid" | "dark" | "outline" | "outline-white" | "outline-gold";
export type GooeyButtonSize = "sm" | "md" | "lg";

export interface GooeyButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  variant?: GooeyButtonVariant;
  size?: GooeyButtonSize;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

export default function GooeyButton({
  children,
  href,
  onClick,
  variant = "gold",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
  target,
  rel,
  ariaLabel,
}: GooeyButtonProps) {
  // Size configurations (all pill-shaped rounded-full)
  const sizeClasses = {
    sm: "px-5 py-2.5 text-[11px] tracking-[0.16em]",
    md: "px-7 py-3.5 text-xs tracking-[0.2em]",
    lg: "px-9 py-4 text-xs sm:text-sm tracking-[0.22em]",
  }[size];

  // Base colors & contrasting hover text colors
  const variantStyles = {
    gold: {
      base: "bg-amber-500/10 border border-amber-600/40 text-amber-900 shadow-xs hover:border-amber-600 hover:shadow-[0_4px_20px_rgba(217,119,6,0.2)]",
      blobBg: "bg-amber-600",
      textTransition: "text-amber-900 group-hover:text-white",
    },
    "gold-solid": {
      base: "bg-amber-500 border border-amber-500 text-neutral-950 shadow-[0_4px_18px_rgba(245,158,11,0.35)] hover:bg-amber-400 hover:border-amber-400 font-extrabold",
      blobBg: "bg-neutral-950",
      textTransition: "text-neutral-950 group-hover:text-amber-300",
    },
    dark: {
      base: "bg-neutral-900 border border-neutral-900 text-white shadow-sm hover:border-neutral-800",
      blobBg: "bg-amber-500",
      textTransition: "text-white group-hover:text-neutral-950",
    },
    outline: {
      base: "bg-white border border-neutral-300 text-neutral-800 shadow-xs hover:border-neutral-900 hover:shadow-sm",
      blobBg: "bg-neutral-900",
      textTransition: "text-neutral-800 group-hover:text-white",
    },
    "outline-white": {
      base: "bg-black/40 border border-white/35 text-white shadow-xl hover:border-white/70 backdrop-blur-md",
      blobBg: "bg-white",
      textTransition: "text-white group-hover:text-neutral-950",
    },
    "outline-gold": {
      base: "bg-black/40 border border-amber-400/50 text-amber-300 shadow-xl hover:border-amber-400 backdrop-blur-md",
      blobBg: "bg-amber-400",
      textTransition: "text-amber-300 group-hover:text-neutral-950",
    },
  }[variant];

  const commonClass = `
    group relative inline-flex items-center justify-center rounded-full overflow-hidden uppercase font-bold
    transition-all duration-300 ease-out transform active:scale-[0.98] select-none
    ${sizeClasses}
    ${variantStyles.base}
    ${disabled ? "opacity-50 pointer-events-none" : "cursor-pointer"}
    ${className}
  `.trim();

  // Internal gooey liquid animation element
  const liquidEffect = (
    <span
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-full z-0"
      style={{
        filter: "url(#gooey-filter)",
        WebkitFilter: "url(#gooey-filter)",
      }}
      aria-hidden="true"
    >
      {/* 4 organic rising liquid blobs with staggered delays and fluid cubic-bezier curves */}
      {/* Blob 1 */}
      <span
        className={`absolute rounded-full transition-transform duration-500 ease-[cubic-bezier(0.34,1.3,0.64,1)] group-hover:translate-y-[-28%] group-hover:scale-[1.85] ${variantStyles.blobBg}`}
        style={{
          width: "48%",
          height: "175%",
          left: "-8%",
          bottom: "-60%",
          transform: "translateY(120%) scale(0.8)",
          transitionDelay: "0ms",
        }}
      />
      {/* Blob 2 */}
      <span
        className={`absolute rounded-full transition-transform duration-550 ease-[cubic-bezier(0.34,1.3,0.64,1)] group-hover:translate-y-[-28%] group-hover:scale-[1.95] ${variantStyles.blobBg}`}
        style={{
          width: "52%",
          height: "185%",
          left: "18%",
          bottom: "-60%",
          transform: "translateY(120%) scale(0.9)",
          transitionDelay: "40ms",
        }}
      />
      {/* Blob 3 */}
      <span
        className={`absolute rounded-full transition-transform duration-520 ease-[cubic-bezier(0.34,1.3,0.64,1)] group-hover:translate-y-[-28%] group-hover:scale-[1.85] ${variantStyles.blobBg}`}
        style={{
          width: "50%",
          height: "180%",
          left: "46%",
          bottom: "-60%",
          transform: "translateY(120%) scale(0.85)",
          transitionDelay: "80ms",
        }}
      />
      {/* Blob 4 */}
      <span
        className={`absolute rounded-full transition-transform duration-580 ease-[cubic-bezier(0.34,1.3,0.64,1)] group-hover:translate-y-[-28%] group-hover:scale-[1.95] ${variantStyles.blobBg}`}
        style={{
          width: "48%",
          height: "185%",
          left: "72%",
          bottom: "-60%",
          transform: "translateY(120%) scale(0.9)",
          transitionDelay: "120ms",
        }}
      />
      {/* Base flood layer that seamlessly seals the entire fill over the pill button background */}
      <span
        className={`absolute inset-0 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${variantStyles.blobBg}`}
        style={{
          transitionDelay: "140ms",
        }}
      />
    </span>
  );

  const content = (
    <>
      {liquidEffect}
      <span
        className={`relative z-10 inline-flex items-center justify-center gap-2 transition-colors duration-300 font-bold ${variantStyles.textTransition}`}
      >
        {children}
      </span>
    </>
  );

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("https://wa.me");
    if (isExternal) {
      return (
        <a
          href={href}
          target={target || "_blank"}
          rel={rel || "noopener noreferrer"}
          className={commonClass}
          aria-label={ariaLabel}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={commonClass} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={commonClass}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
