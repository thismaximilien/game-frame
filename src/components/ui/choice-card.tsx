import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const choiceCardVariants = cva(
  "flex w-full items-center gap-4 rounded-2xl border-2 bg-white p-4 text-left text-base font-semibold text-gray-900 shadow-[0_2px_0_rgba(0,0,0,0.08)] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:translate-y-[1px] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      state: {
        default: "border-gray-200",
        selected: "border-sky-300 bg-sky-50 text-sky-700 shadow-[0_3px_0_#a7d7f0]",
        correct: "border-green-300 bg-green-50 text-green-700 shadow-[0_3px_0_#b7e7a6]",
        incorrect: "border-red-200 bg-red-50 text-red-700 shadow-[0_3px_0_#f3c1c1]",
      },
      size: {
        sm: "min-h-[44px] px-3 py-2 text-sm",
        md: "min-h-[56px] px-4 py-3",
        lg: "min-h-[72px] px-5 py-4 text-lg",
      },
    },
    defaultVariants: {
      state: "default",
      size: "md",
    },
  },
);

export interface ChoiceCardProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof choiceCardVariants> {
  asChild?: boolean;
}

const ChoiceCard = React.forwardRef<HTMLButtonElement, ChoiceCardProps>(
  ({ className, state, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(choiceCardVariants({ state, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
ChoiceCard.displayName = "ChoiceCard";

export { ChoiceCard, choiceCardVariants };
