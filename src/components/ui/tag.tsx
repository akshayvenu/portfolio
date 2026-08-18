import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Tag — small mono-font pill used for skill and keyword lists inside project,
 * experience and education entries.
 */
export function Tag({ className, ...props }: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface px-1.5 py-0.5 font-mono text-xs text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
