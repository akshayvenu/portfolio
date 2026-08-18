import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Panel — the site's core layout primitive: a section framed by hairline
 * top/bottom rules and vertical side borders, forming the signature "grid of
 * stacked panels" reading rhythm.
 *
 * Adjacent panels share a rule: pass `noTopLine` to collapse the seam (the
 * `-mt-px` pulls the panel up over its neighbour's bottom border).
 */
interface PanelProps extends ComponentPropsWithoutRef<"section"> {
  noTopLine?: boolean;
  noBottomLine?: boolean;
}

export function Panel({ className, noTopLine, noBottomLine, ...props }: PanelProps) {
  return (
    <section
      className={cn(
        "relative border-x border-line",
        noTopLine ? "-mt-px" : "border-t",
        !noBottomLine && "border-b",
        className,
      )}
      {...props}
    />
  );
}

export function PanelHeader({ className, ...props }: ComponentPropsWithoutRef<"header">) {
  return <header className={cn("border-b border-line px-4", className)} {...props} />;
}

export function PanelTitle({ className, ...props }: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      className={cn("m-0 py-4 font-heading text-3xl font-medium tracking-[-0.01em]", className)}
      {...props}
    />
  );
}

export function PanelDescription({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("py-4 text-base text-muted-foreground", className)} {...props} />;
}

export function PanelContent({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("p-4", className)} {...props} />;
}

/**
 * Visually hidden panel heading. Several panels are titled only for screen
 * readers because the design shows them as unlabelled data blocks.
 */
export function PanelSrTitle({ className, ...props }: ComponentPropsWithoutRef<"h2">) {
  return <h2 className={cn("sr-only", className)} {...props} />;
}
