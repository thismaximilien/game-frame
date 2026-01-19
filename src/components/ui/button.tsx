import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-2xl font-[700] uppercase transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-orange-500 text-white shadow-[0_4px_0_#ca3500] active:translate-y-[2px] active:shadow-none",

        secondary:
          "bg-indigo-700 text-white shadow-[0_4px_0_#1e1a4d] active:translate-y-[2px] active:shadow-none",
                outline:
          "border-2 border-indigo-700 text-indigo-700 shadow-[0_4px_0_#1e1a4d] active:translate-y-[2px] active:shadow-none",
        ghost: "text-gray-500 hover:bg-gray-500/10",
        destructive:
          "bg-red-600 text-white shadow-[0_4px_0_#7f1d1d] active:translate-y-[2px] active:shadow-none",
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

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
