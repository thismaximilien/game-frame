import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { useChoiceGroupContext } from "./choice-group";
import { Sparkles } from "./sparkles";

const choiceCardVariants = cva(
  "flex w-full items-center gap-4 rounded-2xl border-2 bg-white p-4 text-left text-base font-semibold text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      state: {
        default: "border-stone-200",
        selected: "border-sky-300 bg-sky-50 text-sky-700",
        correct: "border-green-300 bg-green-50 text-green-700",
        incorrect: "border-red-200 bg-red-50 text-red-700",
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
  extends React.ComponentPropsWithoutRef<typeof motion.button>,
    VariantProps<typeof choiceCardVariants> {
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
      if (event.defaultPrevented || resolvedDisabled) return;

      if (group?.onSelect && value !== undefined) {
        group.onSelect(value);
      }
      onSelectValue?.(value);
    };

    return (
      <div className="relative">
        <motion.button
          layout
          data-state={resolvedState}
          data-selected={resolvedSelected ? "" : undefined}
          role={group?.multiple ? "checkbox" : "radio"}
          aria-checked={resolvedSelected}
          aria-disabled={resolvedDisabled}
          type={type}
          animate={{
            scale: resolvedState === "correct" ? [1, 1.05, 1] : 1,
            boxShadow:
              resolvedState === "selected" ? "0 3px 0 #7dd3fc"
              : resolvedState === "correct" ? "0 3px 0 #86efac"
              : resolvedState === "incorrect" ? "0 3px 0 #fecaca"
              : "0 2px 0 rgba(0,0,0,0.08)",
          }}
          whileTap={{ y: 3, boxShadow: "0 0 0 rgba(0,0,0,0)" }}
          transition={{
            scale: { duration: 0.25, times: [0, 0.35, 1], ease: [0.34, 1.3, 0.64, 1] },
            boxShadow: { duration: 0.08, ease: "easeOut" },
            y: { duration: 0.08, ease: "easeOut" },
          }}
          className={cn(choiceCardVariants({ state: resolvedState, size, className }))}
          ref={ref}
          disabled={resolvedDisabled}
          onClick={handleClick}
          {...props}
        />
        <Sparkles show={resolvedState === "correct"} />
      </div>
    );
  },
);
ChoiceCard.displayName = "ChoiceCard";

export { ChoiceCard, choiceCardVariants };
