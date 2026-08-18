"use client";

import { useState } from "react";
import { useInterval } from "@/hooks/use-interval";

const ROTATION_MS = 3200;

/**
 * Rotating tagline under the display name. The `key` on the span restarts the
 * fade-up animation on every change; index starts at 0 on both server and
 * client so the first paint is identical.
 */
export function FlipSentences({ sentences }: { sentences: readonly string[] }) {
  const [index, setIndex] = useState(0);

  useInterval(
    () => setIndex((current) => (current + 1) % sentences.length),
    sentences.length > 1 ? ROTATION_MS : null,
  );

  return (
    <div className="flex h-9 items-center overflow-hidden border-t border-line py-1 pl-4">
      <span
        key={index}
        className="animate-fade-up font-mono text-sm text-muted-foreground"
        aria-live="polite"
      >
        {sentences[index]}
      </span>
    </div>
  );
}
