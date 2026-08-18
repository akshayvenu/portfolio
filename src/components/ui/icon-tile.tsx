import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/**
 * IconTile — small square chip that frames a leading icon in list rows
 * (projects, timeline, overview). The layered border + outer ring is a
 * signature detail of the kit; keep both.
 */
export function IconTile({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-md border border-tile-border bg-muted text-muted-foreground shadow-[0_0_0_1px_var(--tile-ring)]",
        className,
      )}
      {...props}
    />
  );
}
