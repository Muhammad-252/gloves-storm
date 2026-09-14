"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth Apple-style spring physics
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch-only devices to prevent duplicate/stuck cursor
    if (typeof window !== "undefined") {
      const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
      setIsTouchDevice(isTouch);
      if (isTouch) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      setMounted(true);

      const handleMouseMove = (e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      };

      const handleMouseDown = () => setIsClicking(true);
      const handleMouseUp = () => setIsClicking(false);

      // Track interactive elements
      const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        if (!target) return;

        const interactive = target.closest(
          'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
        );
        if (interactive) {
          setIsHovered(true);
          const customText = interactive.getAttribute("data-cursor-text");
          setCursorText(customText || "");
        } else {
          setIsHovered(false);
          setCursorText("");
        }
      };

      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("mouseover", handleMouseOver, { passive: true });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("mouseover", handleMouseOver);
      };
    }
  }, [mouseX, mouseY]);

  if (!mounted || isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Spring Ring */}
      <motion.div
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-800/30 backdrop-blur-[1px]"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          width: isHovered ? 48 : 26,
          height: isHovered ? 48 : 26,
          borderColor: isHovered ? "rgba(180, 83, 9, 0.8)" : "rgba(15, 23, 42, 0.35)",
          backgroundColor: isHovered ? "rgba(254, 243, 199, 0.35)" : "rgba(254, 243, 199, 0)",
          scale: isClicking ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 450, damping: 30 }}
      >
        {cursorText && (
          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono font-bold uppercase tracking-widest text-[#b45309]">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner Precision Dot */}
      <motion.div
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#0f172a] shadow-[0_0_6px_rgba(15,23,42,0.4)]"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: isClicking ? 1.5 : isHovered ? 0 : 1,
          opacity: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
}
