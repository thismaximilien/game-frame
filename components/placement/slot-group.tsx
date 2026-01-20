"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Piece } from "../piece";
import { Draggable } from "./draggable";
import { Droppable } from "./droppable";
import { usePlacement } from "./placement-context";

export interface SlotGroupProps {
  className?: string;
}

export function SlotGroup({ className }: SlotGroupProps) {
  const { slots, size } = usePlacement();

  return (
    <div className={cn("flex justify-center gap-3", className)}>
      {slots.map((item, index) => (
        <Droppable key={index} id={`slot-${index}`} size={size}>
          {item && (
            <Draggable id={item.id}>
              <Piece size={size}>{item.content as React.ReactNode}</Piece>
            </Draggable>
          )}
        </Droppable>
      ))}
    </div>
  );
}
