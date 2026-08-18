import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/**
 * StackBadge — translucent pill for the tech-stack grid. Distinct from `Tag`:
 * it sits on a surface wash with an inset hairline rather than a solid border,
 * and reads at full foreground contrast.
 */
export function StackBadge({ className, ...props }: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center justify-center gap-[5px] rounded-full bg-stack-badge px-2.5 font-mono text-xs text-foreground shadow-[inset_0_0_0_1px_var(--border)]",
        className,
      )}
      {...props}
    />
  );
}
