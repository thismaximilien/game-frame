import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { ClockIcon } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

const countdownTimerVariants = cva(
  "inline-flex items-center gap-2 font-bold tabular-nums",
  {
    variants: {
      color: {
        purple: "text-purple-400",
        green: "text-green-400",
        orange: "text-orange-400",
        red: "text-red-400",
        blue: "text-blue-400",
        cyan: "text-cyan-400",
      },
      size: {
        sm: "text-lg gap-1.5",
        md: "text-2xl gap-2",
        lg: "text-3xl gap-2.5",
      },
    },
    defaultVariants: {
      color: "purple",
      size: "md",
    },
  },
);

const iconSize = { sm: 20, md: 28, lg: 36 } as const;

export interface CountdownTimerProps
  extends Omit<HTMLMotionProps<"div">, "color">,
    VariantProps<typeof countdownTimerVariants> {
  /** Time remaining in seconds */
  seconds: number;
  /** Threshold in seconds to trigger urgent state */
  urgentAt?: number;
}

function formatTime(totalSeconds: number) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

const CountdownTimer = React.forwardRef<HTMLDivElement, CountdownTimerProps>(
  ({ className, color, size = "md", seconds, urgentAt = 10, ...props }, ref) => {
    const isUrgent = seconds <= urgentAt && seconds > 0;
    const resolvedColor = isUrgent ? "red" : color;

    return (
      <motion.div
        ref={ref}
        className={cn(countdownTimerVariants({ color: resolvedColor, size, className }))}
        animate={isUrgent ? { scale: [1, 1.05, 1] } : { scale: 1 }}
        transition={isUrgent ? { duration: 0.5, repeat: Infinity } : undefined}
        {...props}
      >
        <ClockIcon weight="fill" size={iconSize[size ?? "md"]} />
        <span>{formatTime(Math.max(0, seconds))}</span>
      </motion.div>
    );
  },
);
CountdownTimer.displayName = "CountdownTimer";

export { CountdownTimer, countdownTimerVariants };
