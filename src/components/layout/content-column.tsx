import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/**
 * The single measure the whole page is built around. Every panel border,
 * hashed band and footer rule aligns to this column, so its width lives in one
 * token (`--content-max-width`) rather than being repeated per section.
 */
export function ContentColumn({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("mx-auto w-full max-w-[var(--content-max-width)]", className)} {...props} />
  );
}
