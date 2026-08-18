"use client";

import { useEffect, useRef } from "react";

/**
 * Declarative `setInterval`. The callback is kept in a ref so changing it does
 * not restart the timer; pass `delay = null` to pause.
 */
export function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
