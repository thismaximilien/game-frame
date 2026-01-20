import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { CheckCircleIcon, XCircleIcon } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

const feedbackPanelVariants = cva("fixed inset-x-0 bottom-0 w-full p-4 pb-6 md:px-6", {
  variants: {
    variant: {
      correct: "bg-green-100 text-green-700",
      incorrect: "bg-red-100 text-red-700",
    },
  },
  defaultVariants: {
    variant: "correct",
  },
});

export type FeedbackPanelProps = Omit<
  React.ComponentPropsWithoutRef<typeof motion.div>,
  "children"
> &
  VariantProps<typeof feedbackPanelVariants> & {
    title?: string;
    children?: React.ReactNode;
  };

const FeedbackPanel = React.forwardRef<HTMLDivElement, FeedbackPanelProps>(
  ({ className, variant, title, children, ...props }, ref) => {
    const Icon = variant === "incorrect" ? XCircleIcon : CheckCircleIcon;
    const defaultTitle = variant === "incorrect" ? "Incorrect" : "Amazing!";

    return (
      <motion.div
        ref={ref}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 400 }}
        className={cn(feedbackPanelVariants({ variant, className }))}
        {...props}
      >
        <div className="mx-auto max-w-2xl">
          <div className="mb-3 flex items-center gap-2">
            <Icon className="size-8 shrink-0" weight="fill" />
            <span className="text-xl font-bold">{title ?? defaultTitle}</span>
          </div>
          {children}
        </div>
      </motion.div>
    );
  },
);
FeedbackPanel.displayName = "FeedbackPanel";

export { FeedbackPanel, feedbackPanelVariants };
