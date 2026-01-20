"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { cn } from "@/lib/utils";

type SliderColor = "green" | "blue";

export interface SliderProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  tickStep?: number;
  marks?: number[];
  color?: SliderColor;
  snap?: "step" | "tick";
}

const palette: Record<
  SliderColor,
  {
    trackMuted: string;
    progress: string;
    tickActive: string;
    tickMuted: string;
    label: string;
    labelMuted: string;
    handleFill: string;
    handleEdge: string;
    handleSurface: string;
  }
> = {
  green: {
    trackMuted: "bg-green-200",
    progress: "bg-green-400",
    tickActive: "bg-green-500",
    tickMuted: "bg-green-300",
    label: "text-green-500",
    labelMuted: "text-green-300",
    handleFill: "#1fc15c",
    handleEdge: "#18a44f",
    handleSurface: "#21d26c",
  },
  blue: {
    trackMuted: "bg-sky-200",
    progress: "bg-sky-400",
    tickActive: "bg-sky-500",
    tickMuted: "bg-sky-300",
    label: "text-sky-500",
    labelMuted: "text-sky-300",
    handleFill: "#28afff",
    handleEdge: "#1295dc",
    handleSurface: "#31b9ff",
  },
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      value,
      onValueChange,
      min = 0,
      max = 3,
      step = 0.05,
      tickStep = 0.1,
      marks,
      color = "green",
      snap = "tick",
      ...props
    },
    ref,
  ) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = useState(false);

    const majorMarks = useMemo(() => {
      if (marks?.length) return marks;

      const count = Math.max(0, Math.floor(max - min));
      const generated = Array.from(
        { length: count + 1 },
        (_, idx) => min + idx,
      );
      if (!generated.includes(max)) {
        generated.push(max);
      }

      return generated;
    }, [marks, max, min]);

    const normalizedValue =
      max === min ? 0 : clamp((value - min) / (max - min), 0, 1);
    const colors = palette[color];

    const ticks = useMemo(() => {
      const range = max - min;
      if (range <= 0) return [];
      const steps = Math.max(1, Math.round(range / tickStep));
      const result: { ratio: number; major: boolean; value: number }[] = [];

      const threshold = Math.max(tickStep / 2, range / steps / 2);

      for (let i = 0; i <= steps; i++) {
        const raw = min + (i / steps) * range;
        const ratio = clamp((raw - min) / range, 0, 1);
        const major = majorMarks.some(
          (mark) => Math.abs(mark - raw) < threshold,
        );
        result.push({ ratio, major, value: Number(raw.toFixed(4)) });
      }

      return result;
    }, [majorMarks, max, min, tickStep]);

    const snapTargets = useMemo(() => {
      const values = new Set<number>();
      ticks.forEach((tick) => values.add(Number(tick.value.toFixed(4))));
      majorMarks.forEach((mark) =>
        values.add(Number(clamp(mark, min, max).toFixed(4))),
      );
      return Array.from(values).sort((a, b) => a - b);
    }, [majorMarks, max, min, ticks]);

    const snapValue = useCallback(
      (raw: number) => {
        const clamped = clamp(raw, min, max);
        if (snap === "tick" && snapTargets.length) {
          let closest = snapTargets[0];
          let smallestDistance = Math.abs(clamped - closest);

          for (let i = 1; i < snapTargets.length; i++) {
            const distance = Math.abs(snapTargets[i] - clamped);
            if (distance < smallestDistance - 1e-9) {
              smallestDistance = distance;
              closest = snapTargets[i];
            }
          }

          return closest;
        }

        const snapped = Math.round((clamped - min) / step) * step + min;
        const precision = step < 0.01 ? 3 : 2;
        return Number(clamp(snapped, min, max).toFixed(precision));
      },
      [max, min, snap, snapTargets, step],
    );

    const updateFromClientX = useCallback(
      (clientX: number) => {
        if (!trackRef.current) return;
        const rect = trackRef.current.getBoundingClientRect();
        const pct = clamp((clientX - rect.left) / rect.width, 0, 1);
        const raw = min + pct * (max - min);
        onValueChange?.(snapValue(raw));
      },
      [max, min, onValueChange, snapValue],
    );

    useEffect(() => {
      if (!dragging) return;

      const handleMove = (event: globalThis.PointerEvent) => {
        updateFromClientX(event.clientX);
      };
      const stopDrag = () => setDragging(false);

      window.addEventListener("pointermove", handleMove);
      window.addEventListener("pointerup", stopDrag);

      return () => {
        window.removeEventListener("pointermove", handleMove);
        window.removeEventListener("pointerup", stopDrag);
      };
    }, [dragging, updateFromClientX]);

    const startDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragging(true);
      updateFromClientX(event.clientX);
    };

    const nudgeValue = useCallback(
      (direction: -1 | 1) => {
        if (snap === "tick" && snapTargets.length) {
          const epsilon = 1e-6;
          const current = clamp(value, min, max);

          if (direction > 0) {
            const next =
              snapTargets.find((target) => target - current > epsilon) ??
              snapTargets[snapTargets.length - 1];
            onValueChange?.(next);
            return;
          }

          const prev =
            [...snapTargets]
              .reverse()
              .find((target) => current - target > epsilon) ?? snapTargets[0];
          onValueChange?.(prev);
          return;
        }

        onValueChange?.(snapValue(value + direction * step));
      },
      [min, max, onValueChange, snap, snapTargets, snapValue, step, value],
    );

    const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
        event.preventDefault();
        nudgeValue(-1);
      }
      if (event.key === "ArrowRight" || event.key === "ArrowUp") {
        event.preventDefault();
        nudgeValue(1);
      }
    };

    const handlePath =
      "M28 3 C29.6 3 31.2 3.6 32.5 4.6 L48.2 18.7 C49.8 20 50.7 21.9 50.7 24.1 V38.8 C50.7 44.2 46.3 48.6 40.9 48.6 H15.1 C9.7 48.6 5.3 44.2 5.3 38.8 V24.1 C5.3 21.9 6.2 20 7.8 18.7 L23.5 4.6 C24.8 3.6 26.4 3 28 3 Z";

    return (
      <div
        ref={ref}
        className={cn("w-full select-none", className)}
        onPointerDown={startDrag}
        {...props}
      >
        <div className="relative h-7 text-xl font-extrabold leading-none tracking-tight sm:text-2xl">
          {majorMarks.map((mark) => {
            const ratio = max === min ? 0 : (mark - min) / (max - min);
            const active = ratio <= normalizedValue + 0.001;
            return (
              <span
                key={mark}
                className={cn(
                  "absolute -translate-x-1/2",
                  active ? colors.label : colors.labelMuted,
                )}
                style={{ left: `${ratio * 100}%` }}
              >
                {mark}
              </span>
            );
          })}
        </div>

        <div className="relative mt-4 h-24">
          <div
            ref={trackRef}
            className={cn(
              "absolute left-0 right-0 top-6 h-[12px] cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]",
              colors.trackMuted,
              "after:absolute after:inset-[-6px] after:bg-black/0",
            )}
          >
            <div
              className={cn(
                "absolute left-0 top-0 h-full transition-[width]",
                colors.progress,
              )}
              style={{ width: `${normalizedValue * 100}%` }}
            />
          </div>

          <div className="pointer-events-none absolute inset-0">
            {ticks.map((tick, idx) => {
              const active = tick.ratio <= normalizedValue + 0.001;
              return (
                <span
                  key={`${tick.ratio}-${idx}`}
                  className={cn(
                    "absolute top-[30px] block -translate-x-1/2 -translate-y-1/2 rounded-full",
                    tick.major ? "h-12 w-[5px]" : "h-9 w-[3px]",
                    active ? colors.progress : colors.trackMuted,
                  )}
                  style={{ left: `${tick.ratio * 100}%` }}
                />
              );
            })}
          </div>

          <div
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={Number(value.toFixed(2))}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className={cn(
              "absolute h-14 w-14 -translate-x-1/2 cursor-grab outline-none transition-transform focus-visible:ring-4 focus-visible:ring-black/10",
              dragging && "scale-105 cursor-grabbing",
            )}
            style={{
              left: `${normalizedValue * 100}%`,
              top: 56,
            }}
          >
            <svg
              className="h-full w-full"
              viewBox="0 0 56 56"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d={handlePath}
                fill={colors.handleFill}
                stroke={colors.handleEdge}
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M28 7 C29.1 7 30.2 7.4 31.1 8.1 L43.8 19.1 C44.5 19.7 44.9 20.6 44.9 21.5 V36.8 C44.9 39.9 42.4 42.4 39.3 42.4 H16.7 C13.6 42.4 11.1 39.9 11.1 36.8 V21.5 C11.1 20.6 11.5 19.7 12.2 19.1 L24.9 8.1 C25.8 7.4 26.9 7 28 7 Z"
                fill={colors.handleSurface}
              />
            </svg>
          </div>
        </div>
      </div>
    );
  },
);
Slider.displayName = "Slider";

export { Slider };
