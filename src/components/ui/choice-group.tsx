import * as React from "react";

import { cn } from "@/lib/utils";

type ChoiceValue = string | number;
type ChoiceSelection = ChoiceValue | ChoiceValue[] | undefined;

interface ChoiceGroupContextValue {
  selectedValue?: ChoiceSelection;
  onSelect?: (value: ChoiceValue) => void;
  disabled?: boolean;
  multiple?: boolean;
}

const ChoiceGroupContext = React.createContext<ChoiceGroupContextValue | null>(
  null,
);

export const useChoiceGroupContext = () => React.useContext(ChoiceGroupContext);

export interface ChoiceGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "value"> {
  columns?: 1 | 2 | 3 | 4;
  value?: ChoiceSelection;
  defaultValue?: ChoiceSelection;
  onValueChange?: (value: ChoiceSelection) => void;
  disabled?: boolean;
  multiple?: boolean;
}

const columnsMap: Record<NonNullable<ChoiceGroupProps["columns"]>, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

const ChoiceGroup = React.forwardRef<HTMLDivElement, ChoiceGroupProps>(
  (
    {
      className,
      columns = 1,
      value,
      defaultValue,
      onValueChange,
      disabled = false,
      multiple = false,
      children,
      ...props
    },
    ref,
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] =
      React.useState<ChoiceSelection>(defaultValue);

    React.useEffect(() => {
      if (!isControlled) {
        setInternalValue(defaultValue);
      }
    }, [defaultValue, isControlled]);

    const selectedValue = isControlled ? value : internalValue;

    const handleSelect = React.useCallback(
      (next: ChoiceValue) => {
        let newValue: ChoiceSelection = next;
        if (multiple) {
          const current = Array.isArray(selectedValue)
            ? selectedValue
            : selectedValue !== undefined
              ? [selectedValue]
              : [];
          const exists = current.includes(next);
          newValue = exists
            ? current.filter((item) => item !== next)
            : [...current, next];
        }

        if (!isControlled) {
          setInternalValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [isControlled, multiple, onValueChange, selectedValue],
    );

    const contextValue = React.useMemo<ChoiceGroupContextValue>(
      () => ({
        selectedValue,
        onSelect: disabled ? undefined : handleSelect,
        disabled,
        multiple,
      }),
      [disabled, handleSelect, multiple, selectedValue],
    );

    return (
      <ChoiceGroupContext.Provider value={contextValue}>
        <div
          ref={ref}
          role={multiple ? "group" : "radiogroup"}
          aria-disabled={disabled}
          aria-multiselectable={multiple || undefined}
          className={cn("grid gap-4", columnsMap[columns], className)}
          {...props}
        >
          {children}
        </div>
      </ChoiceGroupContext.Provider>
    );
  },
);
ChoiceGroup.displayName = "ChoiceGroup";

export { ChoiceGroup };
