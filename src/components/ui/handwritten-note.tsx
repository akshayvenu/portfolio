import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/** Marginalia in the handwritten face — the kit's "annotated print" motif. */
export function HandwrittenNote({ className, ...props }: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cn("font-handwritten text-[18px] leading-[1.2] text-muted-foreground", className)}
      {...props}
    />
  );
}
