"use client";

import React from "react";
import { motion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  className?: string;
  once?: boolean;
  layout?: boolean | "position" | "size";
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  direction = "up",
  duration = 0.7,
  className = "",
  once = true,
  layout,
  onMouseEnter,
  onMouseLeave,
}) => {
  const directions = {
    up: { y: 35, x: 0 },
    down: { y: -35, x: 0 },
    left: { x: 35, y: 0 },
    right: { x: -35, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      layout={layout}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      initial={{
        opacity: 0,
        ...directions[direction],
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once, amount: 0.12 }}
      transition={{
        duration,
        delay,
        ease: [0.215, 0.610, 0.355, 1.000],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
