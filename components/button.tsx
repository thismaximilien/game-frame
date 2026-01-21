import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-2xl font-[700] uppercase tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-orange-500 text-white",
        secondary: "border-2 border-stone-200 bg-white text-stone-400 hover:bg-stone-50",
        outline: "border-2 border-stone-200 bg-white text-stone-400 hover:bg-stone-50",
        ghost: "bg-transparent text-orange-500 hover:bg-orange-50 hover:text-orange-600 active:bg-orange-100",
        correct: "bg-green-500 text-white",
        incorrect: "bg-red-500 text-white",
      },
      size: {
        default: "px-6 py-3 text-md",
        sm: "px-4 py-2 text-sm",
        lg: "px-8 py-4 text-lg",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const shadowRest: Record<string, string> = {
  default: "0 4px 0 #ca3500",
  correct: "0 4px 0 #16a34a",
  incorrect: "0 4px 0 #dc2626",
  secondary: "0 2px 0 #e7e5e4",
  outline: "0 2px 0 #e7e5e4",
  ghost: "0 0 0 transparent",
};

const tapOffset: Record<string, number> = {
  default: 4,
  correct: 4,
  incorrect: 4,
  secondary: 2,
  outline: 2,
  ghost: 0,
};

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof motion.button>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size, ...props }, ref) => {
    const v = variant ?? "default";
    return (
      <motion.button
        animate={{ y: 0, boxShadow: shadowRest[v] }}
        whileTap={{ y: tapOffset[v], boxShadow: "0 0 0 transparent" }}
        transition={{ duration: 0.08, ease: "easeOut" }}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
