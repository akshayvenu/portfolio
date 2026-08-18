import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/** Kbd — keyboard key glyph, used in command-menu hints and shortcut lists. */
export function Kbd({ className, ...props }: ComponentPropsWithoutRef<"kbd">) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-6 items-center justify-center rounded-sm bg-kbd-background px-1 font-sans text-sm leading-none text-muted-foreground shadow-[inset_0_0_1px_var(--kbd-ring)] select-none",
        className,
      )}
      {...props}
    />
  );
}

export function KbdGroup({ className, ...props }: ComponentPropsWithoutRef<"span">) {
  return <span className={cn("inline-flex items-center gap-1", className)} {...props} />;
}
