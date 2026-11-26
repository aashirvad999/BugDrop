"use client";

import React, { useEffect } from "react";
import { motion, useSpring, useTransform } from "motion/react";

interface SlidingNumberProps {
  value: number;
  className?: string;
}

/**
 * Smoothly animates numeric transitions with spring physics and tabular numerals.
 */
export function SlidingNumber({ value, className = "" }: SlidingNumberProps) {
  const spring = useSpring(value, {
    stiffness: 220,
    damping: 26,
    mass: 0.8,
  });

  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <motion.span className={`tabular-nums ${className}`}>
      {display}
    </motion.span>
  );
}
