"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticElementProps {
  children: React.ReactNode;
  strength?: number; // Distance multiplier (default 0.25)
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = (clientX - centerX) * strength;
    const distanceY = (clientY - centerY) * strength;
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.2 }}
      className={`inline-block ${className}`}
      data-cursor-hover="true"
    >
      {children}
    </motion.div>
  );
}
