"use client";

import { useEffect, useState } from "react";

/**
 * `false` during SSR and the first client render, `true` afterwards.
 * Use it to defer browser-only output (theme, live clocks) past hydration
 * instead of guessing a value the server cannot know.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
