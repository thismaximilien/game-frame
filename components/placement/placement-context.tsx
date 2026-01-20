"use client";

import * as React from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";

import { Piece } from "../piece";

// Types
export interface PlacementItem<T = React.ReactNode> {
  id: string;
  content: T;
}

interface PlacementState {
  slots: (string | null)[];
  pool: string[];
}

interface PlacementContextValue<T = React.ReactNode> {
  items: PlacementItem<T>[];
  slots: (PlacementItem<T> | null)[];
  pool: PlacementItem<T>[];
  activeId: string | null;
  size: "sm" | "md" | "lg";
  getItem: (id: string) => PlacementItem<T> | undefined;
  reset: () => void;
}

const PlacementContext = React.createContext<PlacementContextValue | null>(null);

export function usePlacement<T = React.ReactNode>() {
  const ctx = React.useContext(PlacementContext) as PlacementContextValue<T> | null;
  if (!ctx) throw new Error("usePlacement must be used within PlacementProvider");
  return ctx;
}

// Provider
export interface PlacementProviderProps<T = React.ReactNode> {
  items: PlacementItem<T>[];
  slotCount: number;
  initialSlots?: (string | null)[];
  size?: "sm" | "md" | "lg";
  onPlacementChange?: (slots: (string | null)[]) => void;
  children: React.ReactNode;
}

export function PlacementProvider<T = React.ReactNode>({
  items,
  slotCount,
  initialSlots,
  size = "md",
  onPlacementChange,
  children,
}: PlacementProviderProps<T>) {
  const itemMap = React.useMemo(
    () => new Map(items.map((item) => [item.id, item])),
    [items],
  );

  const getInitialState = React.useCallback((): PlacementState => {
    const slots = initialSlots ?? Array(slotCount).fill(null);
    const usedIds = new Set(slots.filter(Boolean));
    const pool = items.map((i) => i.id).filter((id) => !usedIds.has(id));
    return { slots, pool };
  }, [items, slotCount, initialSlots]);

  const [state, setState] = React.useState<PlacementState>(getInitialState);
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } }),
    useSensor(KeyboardSensor),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    const draggedId = active.id as string;
    const targetId = over.id as string;

    setState((prev) => {
      const next = { slots: [...prev.slots], pool: [...prev.pool] };

      // Find where the dragged item currently is
      const fromSlotIndex = prev.slots.indexOf(draggedId);
      const fromPool = prev.pool.includes(draggedId);

      // Determine target
      const isTargetSlot = targetId.startsWith("slot-");
      const targetSlotIndex = isTargetSlot ? parseInt(targetId.replace("slot-", ""), 10) : -1;

      if (isTargetSlot && targetSlotIndex >= 0) {
        const existingInSlot = prev.slots[targetSlotIndex];

        // Remove from current location
        if (fromSlotIndex >= 0) {
          next.slots[fromSlotIndex] = existingInSlot; // Swap
        } else if (fromPool) {
          next.pool = next.pool.filter((id) => id !== draggedId);
          if (existingInSlot) next.pool.push(existingInSlot); // Return displaced item to pool
        }

        // Place in target slot
        next.slots[targetSlotIndex] = draggedId;
      } else if (targetId === "pool") {
        // Return to pool
        if (fromSlotIndex >= 0) {
          next.slots[fromSlotIndex] = null;
          next.pool.push(draggedId);
        }
      }

      return next;
    });
  };

  // Notify parent of changes
  React.useEffect(() => {
    onPlacementChange?.(state.slots);
  }, [state.slots, onPlacementChange]);

  const getItem = React.useCallback(
    (id: string) => itemMap.get(id) as PlacementItem<T> | undefined,
    [itemMap],
  );

  const reset = React.useCallback(() => {
    setState(getInitialState());
  }, [getInitialState]);

  const contextValue = React.useMemo<PlacementContextValue<T>>(
    () => ({
      items: items as PlacementItem<T>[],
      slots: state.slots.map((id) => (id ? (itemMap.get(id) as PlacementItem<T>) : null)),
      pool: state.pool.map((id) => itemMap.get(id) as PlacementItem<T>),
      activeId,
      size,
      getItem,
      reset,
    }),
    [items, state.slots, state.pool, activeId, size, itemMap, getItem, reset],
  );

  const activeItem = activeId ? itemMap.get(activeId) : null;

  return (
    <PlacementContext.Provider value={contextValue as PlacementContextValue}>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {children}
        <DragOverlay>
          {activeItem && (
            <Piece state="active" size={size}>
              {activeItem.content as React.ReactNode}
            </Piece>
          )}
        </DragOverlay>
      </DndContext>
    </PlacementContext.Provider>
  );
}
