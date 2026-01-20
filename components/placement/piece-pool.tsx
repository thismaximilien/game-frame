"use client";

import * as React from "react";
import { useDroppable } from "@dnd-kit/core";

import { cn } from "@/lib/utils";
import { Piece } from "../piece";
import { Draggable } from "./draggable";
import { usePlacement } from "./placement-context";

export interface PiecePoolProps {
  className?: string;
}

export function PiecePool({ className }: PiecePoolProps) {
  const { pool, size } = usePlacement();
  const { setNodeRef } = useDroppable({ id: "pool" });

  return (
    <div
      ref={setNodeRef}
      className={cn("flex flex-wrap justify-center gap-3", className)}
    >
      {pool.map((item) => (
        <Draggable key={item.id} id={item.id}>
          <Piece size={size}>{item.content as React.ReactNode}</Piece>
        </Draggable>
      ))}
    </div>
  );
}
