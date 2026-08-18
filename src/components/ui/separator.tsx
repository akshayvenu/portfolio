import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Thin vertical rule used between inline metadata and header actions.
 * Height is set by the caller so it can match its row.
 */
export function Separator({ className, ...props }: ComponentPropsWithoutRef<"span">) {
  return (
    <span aria-hidden="true" className={cn("w-px shrink-0 bg-border", className)} {...props} />
  );
}
