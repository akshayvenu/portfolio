/** Time helpers shared by the greeting header and the overview clock. */

/**
 * Hour (0–23) of `date` as observed in `timeZone`.
 * Uses `Intl` so it is correct regardless of where the server runs.
 */
export function getHourInTimeZone(date: Date, timeZone: string): number {
  const hour = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: false,
    timeZone,
  }).format(date);

  // `hourCycle: h23` can format midnight as "24" in some runtimes.
  return Number.parseInt(hour, 10) % 24;
}

export type Greeting = "Good morning" | "Good afternoon" | "Good evening";

export function getGreeting(date: Date, timeZone: string): Greeting {
  const hour = getHourInTimeZone(date, timeZone);
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

/**
 * `05:40 PM // IST` — the clock format used in the overview panel.
 *
 * Pass `label` to override the zone abbreviation; `Intl` renders many zones as
 * a UTC offset ("GMT+5:30") instead of their local name ("IST").
 */
export function formatLocalTime(date: Date, timeZone: string, label?: string): string {
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone,
  }).format(date);

  const zone =
    label ??
    new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "short" })
      .formatToParts(date)
      .find((part) => part.type === "timeZoneName")?.value ??
    timeZone;

  return `${time} // ${zone}`;
}
