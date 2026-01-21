import * as React from "react";
import { useRef, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const progressBarVariants = cva(
  "relative w-full overflow-visible rounded-full bg-stone-200",
  {
    variants: {
      size: {
        sm: "h-2",
        md: "h-3.5",
        lg: "h-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const bulgeSize = { sm: 16, md: 28, lg: 40 } as const;

const bubbles = [
  { angle: 30, distance: 26, size: 5, delay: 0 },
  { angle: 160, distance: 22, size: 4, delay: 0.04 },
  { angle: 260, distance: 28, size: 4, delay: 0.02 },
] as const;

const colorConfig = {
  green: { indicator: "bg-green-400", ring: "#4ade80" },
  orange: { indicator: "bg-orange-400", ring: "#fb923c" },
  blue: { indicator: "bg-blue-400", ring: "#60a5fa" },
  red: { indicator: "bg-red-400", ring: "#f87171" },
  yellow: { indicator: "bg-yellow-400", ring: "#facc15" },
  purple: { indicator: "bg-purple-400", ring: "#c084fc" },
  pink: { indicator: "bg-pink-400", ring: "#f472b6" },
  cyan: { indicator: "bg-cyan-400", ring: "#22d3ee" },
} as const;

type ProgressColor = keyof typeof colorConfig;

export interface ProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressBarVariants> {
  value: number;
  max?: number;
  color?: ProgressColor;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, size = "md", color = "green", value, max = 100, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const highlightClass = size === "lg" ? "top-1 h-1" : "top-0.5 h-0.5";
    const bulge = bulgeSize[size ?? "md"];
    const { indicator, ring } = colorConfig[color];

    const prevPercentage = useRef(percentage);
    const isInitialMount = useRef(true);
    const bulgeControls = useAnimationControls();
    const [burstKey, setBurstKey] = React.useState(0);

    useEffect(() => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
        prevPercentage.current = percentage;
        return;
      }
      if (percentage !== prevPercentage.current) {
        bulgeControls.start({
          scale: [0, 1.6],
          opacity: [1, 0],
          transition: { duration: 0.7, ease: "easeOut" },
        });
        setBurstKey((k) => k + 1);
        prevPercentage.current = percentage;
      }
    }, [percentage, bulgeControls]);

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn(progressBarVariants({ size, className }))}
        {...props}
      >
        <motion.div
          className={cn("relative h-full rounded-full", indicator)}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        >
          <div
            className={cn(
              "absolute left-2 right-2 rounded-full bg-white/20",
              highlightClass,
            )}
          />
          <motion.div
            className="absolute rounded-full border-[3px]"
            style={{
              right: -bulge / 2,
              top: "50%",
              width: bulge,
              height: bulge,
              y: "-50%",
              borderColor: ring,
            }}
            animate={bulgeControls}
            initial={{ scale: 0, opacity: 0 }}
          />
          {bubbles.map((b, i) => (
            <motion.div
              key={`${burstKey}-${i}`}
              className="absolute rounded-full"
              style={{
                right: 0,
                top: "50%",
                width: b.size,
                height: b.size,
                backgroundColor: ring,
              }}
              initial={{ x: 0, y: "-50%", opacity: 0 }}
              animate={{
                x: Math.cos((b.angle * Math.PI) / 180) * b.distance,
                y: `calc(-50% + ${Math.sin((b.angle * Math.PI) / 180) * b.distance}px)`,
                opacity: [0, 0.9, 0],
              }}
              transition={{ duration: 0.6, delay: b.delay, ease: "easeOut" }}
            />
          ))}
        </motion.div>
      </div>
    );
  },
);
ProgressBar.displayName = "ProgressBar";

export { ProgressBar, progressBarVariants, type ProgressColor };
