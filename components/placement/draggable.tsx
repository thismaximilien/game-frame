"use client";

import * as React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export interface DraggableProps {
  id: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export function Draggable({ id, children, disabled }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    disabled,
  });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    cursor: disabled ? "default" : isDragging ? "grabbing" : "grab",
    touchAction: "none",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<{ state?: string }>, {
            state: isDragging ? "dragging" : undefined,
          })
        : children}
    </div>
  );
}
