"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

const pieceVariants = cva(
  "flex select-none items-center justify-center rounded-2xl border-2 font-semibold transition-colors",
  {
    variants: {
      state: {
        idle: "border-stone-200 bg-white text-stone-900",
        active: "border-sky-300 bg-sky-50 text-sky-700",
        dragging: "border-sky-300 bg-sky-100 text-sky-700 opacity-50",
        success: "border-green-300 bg-green-50 text-green-700",
        error: "border-red-200 bg-red-50 text-red-700",
      },
      size: {
        sm: "h-12 w-12 text-lg",
        md: "h-16 w-16 text-2xl",
        lg: "h-20 w-20 text-3xl",
      },
      empty: {
        true: "border-dashed border-stone-300 bg-stone-100/50",
        false: "",
      },
    },
    defaultVariants: {
      state: "idle",
      size: "md",
      empty: false,
    },
  },
);

const shadowByState = {
  idle: "0 2px 0 rgba(0,0,0,0.08)",
  active: "0 3px 0 #7dd3fc",
  dragging: "0 6px 12px rgba(0,0,0,0.15)",
  success: "0 3px 0 #86efac",
  error: "0 3px 0 #fecaca",
} as const;

export interface PieceProps
  extends Omit<HTMLMotionProps<"div">, "children">,
    VariantProps<typeof pieceVariants> {
  children?: React.ReactNode;
}

const Piece = React.forwardRef<HTMLDivElement, PieceProps>(
  ({ className, state = "idle", size, empty, children, style, ...props }, ref) => {
    const resolvedState = empty ? "idle" : state ?? "idle";

    return (
      <motion.div
        ref={ref}
        className={cn(pieceVariants({ state: resolvedState, size, empty, className }))}
        animate={{
          scale: resolvedState === "success" ? [1, 1.08, 1] : 1,
          boxShadow: empty ? "none" : shadowByState[resolvedState],
        }}
        transition={{
          scale: { duration: 0.25, times: [0, 0.35, 1], ease: [0.34, 1.3, 0.64, 1] },
          boxShadow: { duration: 0.1 },
        }}
        style={style}
        {...props}
      >
        {!empty && children}
      </motion.div>
    );
  },
);
Piece.displayName = "Piece";

export { Piece, pieceVariants };
