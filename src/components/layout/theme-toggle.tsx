"use client";

import { useTheme } from "next-themes";
import { Icon } from "@/components/icons";
import { useMounted } from "@/hooks/use-mounted";

/**
 * Light/dark switch. The icon depends on the resolved theme, which is only
 * known in the browser, so until mount we render a fixed placeholder — that
 * keeps the server and client markup identical instead of flashing a mismatch.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
      className="inline-flex size-7 cursor-pointer items-center justify-center rounded-md border-none bg-transparent text-muted-foreground transition-colors hover:text-foreground"
    >
      <Icon name={isDark ? "moon" : "sun"} size={16} />
    </button>
  );
}
