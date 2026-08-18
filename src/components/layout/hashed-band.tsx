import { cn } from "@/lib/utils";

/**
 * The diagonal-stripe band that separates major page regions.
 *
 * Stripes run full-bleed while an opaque inset panel masks them back out inside
 * the content column, so the column's side rules read as one continuous line
 * down the page.
 */
export function HashedBand({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("diagonal-stripes relative h-6 border-y border-line", className)}
    >
      <div className="absolute inset-0 mx-auto max-w-[var(--content-max-width)] border-x border-line bg-background" />
    </div>
  );
}
