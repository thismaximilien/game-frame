import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const progressBarVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-stone-200",
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

export interface ProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressBarVariants> {
  value: number;
  max?: number;
  indicatorClassName?: string;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    { className, indicatorClassName, size, value, max = 100, ...props },
    ref,
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const highlightClass =
      size === "lg" ? "top-1 h-1" : "top-0.5 h-0.5";

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
        <div
          className={cn(
            "relative h-full rounded-full bg-green-400 transition-[width] duration-300",
            indicatorClassName,
          )}
          style={{ width: `${percentage}%` }}
        >
          <div
            className={cn(
              "absolute left-2 right-2 rounded-full bg-white/20",
              highlightClass,
            )}
          />
        </div>
      </div>
    );
  },
);
ProgressBar.displayName = "ProgressBar";

export { ProgressBar, progressBarVariants };
