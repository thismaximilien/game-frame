import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { useChoiceGroupContext } from "./choice-group";

const choiceCardVariants = cva(
  "flex w-full items-center gap-4 rounded-2xl border-2 bg-white p-4 text-left text-base font-semibold text-stone-900 shadow-[0_2px_0_rgba(0,0,0,0.08)] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:translate-y-[1px] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      state: {
        default: "border-stone-200",
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
  value?: string | number;
  selected?: boolean;
  onSelectValue?: (value?: string | number) => void;
}

const ChoiceCard = React.forwardRef<HTMLButtonElement, ChoiceCardProps>(
  (
    {
      className,
      state,
      size,
      asChild = false,
      value,
      selected,
      onSelectValue,
      onClick,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const MotionComp = motion(Comp as any) as any;
    const group = useChoiceGroupContext();

    const isSelectedFromGroup =
      value !== undefined && group?.selectedValue !== undefined
        ? Array.isArray(group.selectedValue)
          ? group.selectedValue.includes(value)
          : group.selectedValue === value
        : false;

    const resolvedSelected =
      selected ?? isSelectedFromGroup ?? state === "selected";

    const resolvedDisabled = disabled ?? group?.disabled;

    const resolvedState = state ?? (resolvedSelected ? "selected" : "default");

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented || resolvedDisabled) {
        return;
      }

      if (group?.onSelect && value !== undefined) {
        group.onSelect(value);
      }
      onSelectValue?.(value);
    };

    return (
      <MotionComp
        layout
        data-state={resolvedState}
        data-selected={resolvedSelected ? "" : undefined}
        role={group?.multiple ? "checkbox" : "radio"}
        aria-checked={resolvedSelected}
        aria-disabled={resolvedDisabled}
        type={asChild ? undefined : type}
        whileTap={{ y: 2, boxShadow: "0 0 0 rgba(0,0,0,0)" }}
        transition={{ duration: 0.08, ease: "easeOut" }}
        className={cn(choiceCardVariants({ state: resolvedState, size, className }))}
        ref={ref}
        disabled={resolvedDisabled}
        onClick={handleClick}
        {...props}
      />
    );
  },
);
ChoiceCard.displayName = "ChoiceCard";

export { ChoiceCard, choiceCardVariants };
