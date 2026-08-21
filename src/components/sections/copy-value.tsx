"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

/** How long the confirmed state stays on screen. Matches `--animate-copy-toast`. */
const CONFIRM_MS = 500;

/**
 * Click-to-copy value used by the overview rows (phone, email).
 *
 * On success the label shifts to the success green, a check pops in where the
 * copy glyph sat, and a "Copied" pill floats alongside — then everything
 * settles back. The label never changes width, so the row cannot reflow
 * mid-animation.
 */
export function CopyValue({
  value,
  label,
  className,
}: {
  /** Raw text placed on the clipboard. */
  value: string;
  /** Displayed text. Defaults to `value`. */
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return;
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), CONFIRM_MS);
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? `Copied ${value}` : `Copy ${value}`}
      className={cn(
        "group/copy relative -mx-1.5 -my-0.5 flex w-full cursor-pointer items-center gap-2 sm:inline-flex sm:w-auto",
        "rounded-md px-1.5 py-0.5 text-left transition-all duration-300",
        "focus-visible:outline-none active:scale-[0.985]",
        !copied &&
          "hover:bg-muted focus-visible:bg-muted focus-visible:shadow-[0_0_0_1px_var(--tile-ring)]",
        className,
      )}
    >
      <span className="relative">
        <span
          className={cn(
            "transition-colors duration-300",
            copied && "text-copy-success",
          )}
        >
          {label ?? value}
        </span>

        {/* Hover underline. */}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left",
            "transition-transform duration-300 ease-out",
            "scale-x-0 bg-current opacity-40 group-hover/copy:scale-x-100 group-focus-visible/copy:scale-x-100",
          )}
        />
      </span>

      <span
        aria-hidden
        className={cn(
          "relative inline-flex size-3.5 shrink-0 items-center justify-center transition-opacity duration-200",
          copied
            ? "text-copy-success opacity-100"
            : "text-muted-foreground opacity-50 group-hover/copy:opacity-100 group-focus-visible/copy:opacity-100",
        )}
      >
        {copied ? (
          <Icon name="check" size={12} className="animate-copy-pop" strokeWidth={2.75} />
        ) : (
          <Icon name="copy" size={12} />
        )}

        {/* Floating confirmation pill — anchored to the icon, not the full-width
            button. On narrow screens there's no room to float sideways (long
            labels already reach the row's edge), so it pops up above the icon
            instead, growing left/up from the icon's own edge — it can never
            spill past the row. From `sm` up there's room, so it floats beside
            the icon instead. */}
        {copied && (
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute right-0 bottom-full mb-1.5 whitespace-nowrap",
              "sm:bottom-auto sm:top-1/2 sm:right-auto sm:left-full sm:mb-0 sm:ml-2 sm:-translate-y-1/2",
              "animate-copy-toast rounded-full border border-copy-success/30 bg-copy-success/12",
              "px-2 py-0.5 font-mono text-[10px] tracking-wide text-copy-success uppercase",
            )}
          >
            Copied
          </span>
        )}
      </span>
    </button>
  );
}
