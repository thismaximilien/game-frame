import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-2xl font-[700] uppercase tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-orange-500 text-white shadow-[0_4px_0_#ca3500]",
        secondary:
          "border-2 border-stone-200 bg-white text-stone-400 shadow-[0_2px_0_#e7e5e4] hover:bg-stone-50",
        outline:
          "border-2 border-stone-200 bg-white text-stone-400 shadow-[0_2px_0_#e7e5e4] hover:bg-stone-50",
        ghost:
          "bg-transparent text-orange-500 shadow-none hover:bg-orange-50 hover:text-orange-600 active:bg-orange-100",
        correct: "bg-green-500 text-white shadow-[0_4px_0_#16a34a]",
        incorrect: "bg-red-500 text-white shadow-[0_4px_0_#dc2626]",
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

const tapOffset: Record<string, number> = {
  default: 2,
  correct: 2,
  incorrect: 2,
  secondary: 1,
  outline: 1,
  ghost: 1,
};

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof motion.button>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size, ...props }, ref) => (
    <motion.button
      whileTap={{ y: tapOffset[variant ?? "default"], boxShadow: "0 0 0 transparent" }}
      transition={{ duration: 0.08, ease: "easeOut" }}
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { Button, buttonVariants };
