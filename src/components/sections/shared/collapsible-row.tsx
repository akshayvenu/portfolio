"use client";

import type { KeyboardEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CollapsibleRowProps {
  children: ReactNode;
  open: boolean;
  onToggle: () => void;
  /** Rows with nothing to reveal render as inert content. */
  disabled?: boolean;
  className?: string;
}

/**
 * Clickable header for an expandable entry.
 *
 * The hover tint sits on a rounded layer *behind* the content and is inset from
 * the left so it starts after the row's icon tile — matching the kit's
 * `before:rounded-lg hover:bg-accent-muted` treatment rather than tinting the
 * full-bleed row.
 */
export function CollapsibleRow({
  children,
  open,
  onToggle,
  disabled = false,
  className,
}: CollapsibleRowProps) {
  if (disabled) {
    return <div className={cn("relative w-full text-left", className)}>{children}</div>;
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    onToggle();
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={open}
      onClick={onToggle}
      onKeyDown={onKeyDown}
      className={cn("group relative w-full cursor-pointer text-left", className)}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-1 -right-1 -bottom-1.5 left-7 rounded-lg bg-accent-muted opacity-0 transition-opacity duration-150 group-hover:opacity-100"
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
