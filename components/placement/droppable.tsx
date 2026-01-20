"use client";

import * as React from "react";
import { useDroppable } from "@dnd-kit/core";

import { cn } from "@/lib/utils";
import { Piece } from "../piece";

export interface DroppableProps {
  id: string;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Droppable({ id, children, size = "md", className }: DroppableProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className={cn("relative", className)}>
      <Piece
        empty
        size={size}
        className={cn(isOver && "border-sky-300 bg-sky-50/50")}
      />
      {children && <div className="absolute inset-0">{children}</div>}
    </div>
  );
}
