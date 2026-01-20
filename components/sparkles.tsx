"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

const Sparkle = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
    <path d="M12 0L16 8L24 12L16 16L12 24L8 16L0 12L8 8L12 0Z" />
  </svg>
);

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

const generateSparkles = () =>
  [0, 0.06, 0.12].map((delay) => ({
    x: `calc(${Math.random() > 0.5 ? randomBetween(10, 30) : randomBetween(70, 90)}% + ${randomBetween(-10, 10)}px)`,
    y: randomBetween(-12, 12),
    size: randomBetween(7, 16),
    delay,
  }));

interface SparklesProps {
  show?: boolean;
  color?: string;
}

export function Sparkles({ show, color = "text-green-400" }: SparklesProps) {
  const sparkles = useMemo(() => generateSparkles(), []);

  if (!show) return null;

  return (
    <>
      {sparkles.map((spark, i) => (
        <motion.div
          key={i}
          className={`pointer-events-none absolute ${color}`}
          style={{ left: spark.x, top: spark.y, width: spark.size, height: spark.size }}
          initial={{ scale: 0, opacity: 0, rotate: 0 }}
          animate={{ scale: [0, 1.2, 1, 1, 1], opacity: [0, 1, 1, 1, 0], rotate: [0, 0, 45, 90, 90] }}
          transition={{ duration: 1.1, delay: spark.delay, times: [0, 0.15, 0.3, 0.9, 1], ease: "easeOut" }}
        >
          <Sparkle />
        </motion.div>
      ))}
    </>
  );
}
