"use client";

import { useEffect, useState } from "react";
import { useInterval } from "@/hooks/use-interval";
import { formatLocalTime } from "@/lib/datetime";

const TICK_MS = 30_000;

interface LocalTimeProps {
  timeZone: string;
  label?: string;
}

/**
 * Live clock in the profile's home timezone.
 *
 * Server and client both format from `Intl` in the same IANA zone, so the two
 * renders agree except across a minute boundary — `suppressHydrationWarning`
 * covers that one-tick window rather than blanking the value until mount.
 */
export function LocalTime({ timeZone, label }: LocalTimeProps) {
  const [now, setNow] = useState(() => new Date());

  // Re-read the clock once on mount so a cached server render is never stale.
  useEffect(() => setNow(new Date()), []);
  useInterval(() => setNow(new Date()), TICK_MS);

  return <span suppressHydrationWarning>{formatLocalTime(now, timeZone, label)}</span>;
}
