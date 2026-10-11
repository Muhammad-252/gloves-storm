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
    sm: "px-4 sm:px-5 py-2 sm:py-2.5 text-[10px] sm:text-[11px] tracking-[0.14em] sm:tracking-[0.16em]",
    md: "px-5 sm:px-7 py-2.5 sm:py-3.5 text-[11px] sm:text-xs tracking-[0.16em] sm:tracking-[0.2em]",
    lg: "px-6 sm:px-9 py-3.5 sm:py-4 text-xs sm:text-sm tracking-[0.16em] sm:tracking-[0.22em]",
  }[size];

  // Base colors & contrasting hover text colors (Black & White with #FFB900 interactive accent)
  const variantStyles = {
    gold: {
      base: "bg-[#FFB900] border border-[#FFB900] text-black shadow-[0_4px_18px_rgba(255,185,0,0.35)] hover:bg-[#E5A700] hover:border-[#E5A700] font-extrabold",
      blobBg: "bg-black",
      textTransition: "text-black group-hover:text-white",
    },
    "gold-solid": {
      base: "bg-[#FFB900] border border-[#FFB900] text-black shadow-[0_4px_18px_rgba(255,185,0,0.35)] hover:bg-[#E5A700] hover:border-[#E5A700] font-extrabold",
      blobBg: "bg-black",
      textTransition: "text-black group-hover:text-white",
    },
    dark: {
      base: "bg-black border border-black text-white shadow-sm hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] hover:border-[#FFB900]",
      blobBg: "bg-[#FFB900]",
      textTransition: "text-white group-hover:text-black",
    },
    outline: {
      base: "bg-white border border-neutral-300 text-black shadow-2xs hover:border-[#FFB900]",
      blobBg: "bg-[#FFB900]",
      textTransition: "text-black group-hover:text-black",
    },
    "outline-white": {
      base: "bg-black/50 border border-white/35 text-white shadow-xl hover:border-[#FFB900] backdrop-blur-md",
      blobBg: "bg-[#FFB900]",
      textTransition: "text-white group-hover:text-black",
    },
    "outline-gold": {
      base: "bg-black/50 border border-[#FFB900] text-[#FFB900] shadow-xl hover:bg-[#FFB900] hover:text-black backdrop-blur-md",
      blobBg: "bg-[#FFB900]",
      textTransition: "text-[#FFB900] group-hover:text-black",
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
