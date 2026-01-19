import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "w-full rounded-2xl border-2 bg-white p-4 text-gray-900 shadow-[0_2px_0_rgba(0,0,0,0.08)]",
  {
    variants: {
      variant: {
        default: "border-gray-200",
        muted: "border-gray-200 bg-gray-50 text-gray-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        className={cn(cardVariants({ variant, className }))}
        {...props}
      />
    );
  },
);
Card.displayName = "Card";

export { Card, cardVariants };
