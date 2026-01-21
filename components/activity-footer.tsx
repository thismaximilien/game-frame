import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon, XCircleIcon } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/button";

type ActivityFooterState = "idle" | "correct" | "incorrect";

export interface ActivityFooterProps {
  state: ActivityFooterState;
  actionLabel: string;
  actionDisabled?: boolean;
  onAction: () => void;
  feedbackTitle?: string;
  className?: string;
}

const stateStyles = {
  idle: { buttonVariant: "secondary", barBg: "" },
  correct: { buttonVariant: "correct", barBg: "bg-green-100", feedbackText: "text-green-700", Icon: CheckCircleIcon },
  incorrect: { buttonVariant: "incorrect", barBg: "bg-red-100", feedbackText: "text-red-700", Icon: XCircleIcon },
} as const;

export function ActivityFooter({
  state,
  actionLabel,
  actionDisabled,
  onAction,
  feedbackTitle,
  className,
}: ActivityFooterProps) {
  const styles = stateStyles[state];
  const showFeedback = state !== "idle" && feedbackTitle;

  return (
    <>
      <AnimatePresence>
        {showFeedback && "Icon" in styles && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
            className={cn("fixed inset-x-0 bottom-0 z-40", styles.barBg, styles.feedbackText)}
          >
            <div className="mx-auto max-w-xl px-6 pb-32 pt-4">
              <div className="flex items-center gap-3">
                <styles.Icon className="size-8 shrink-0" weight="fill" />
                <span className="text-2xl font-bold">{feedbackTitle}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={cn("fixed inset-x-0 bottom-0 z-50", className)}>
        <div className="mx-auto max-w-xl px-6 pb-12">
          <Button
            variant={styles.buttonVariant}
            disabled={actionDisabled}
            onClick={onAction}
            className="w-full"
            size="lg"
          >
            {actionLabel}
          </Button>
        </div>
      </div>
    </>
  );
}
