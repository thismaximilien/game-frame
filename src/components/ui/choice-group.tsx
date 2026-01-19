import * as React from "react";

import { cn } from "@/lib/utils";

export interface ChoiceGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4;
}

const columnsMap: Record<NonNullable<ChoiceGroupProps["columns"]>, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

const ChoiceGroup = React.forwardRef<HTMLDivElement, ChoiceGroupProps>(
  ({ className, columns = 1, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("grid gap-4", columnsMap[columns], className)}
      {...props}
    />
  ),
);
ChoiceGroup.displayName = "ChoiceGroup";

export { ChoiceGroup };
