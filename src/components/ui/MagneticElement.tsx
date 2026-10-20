"use client";

import React, { useRef, useState, useEffect } from "react";

interface MagneticElementProps {
  children: React.ReactNode;
  strength?: number; // Distance multiplier (default 0.28)
  className?: string;
  onClick?: () => void;
}

export default function MagneticElement({
  children,
  strength = 0.28,
  className = "",
  onClick,
}: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const canHoverRef = useRef(false);

  useEffect(() => {
    // Only enable magnetic effect on devices with true mouse cursor / hover support
    if (typeof window !== "undefined") {
      canHoverRef.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canHoverRef.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseEnter = () => {
    if (!canHoverRef.current) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isHovered
          ? "transform 0.08s ease-out"
          : "transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
        willChange: isHovered ? "transform" : "auto",
      }}
      className={`inline-block ${className}`}
    >
      {children}
    </div>
  );
}
