import type { ContributionDay, ContributionLevel, ContributionWeeks } from "@/types/content";

/** Public mirror of the GitHub contributions calendar — no token required. */
const CONTRIBUTIONS_API = "https://github-contributions-api.jogruber.de/v4";

/** Re-fetch the calendar at most once an hour. */
const REVALIDATE_SECONDS = 60 * 60;

export interface ContributionCalendar {
  weeks: ContributionWeeks;
  total: number;
  /** `DD.MM.YYYY`, matching the figure caption. */
  from: string;
  to: string;
  /** Month headings across the mosaic, oldest first. */
  months: string[];
}

interface ApiResponse {
  total: Record<string, number>;
  contributions: { date: string; count: number; level: number }[];
}

/**
 * Fetches the last year of real contributions for `username`.
 *
 * Returns `null` when the API is unreachable or the shape is unexpected so the
 * caller can fall back rather than break the page build.
 */
export async function fetchContributions(username: string): Promise<ContributionCalendar | null> {
  try {
    const response = await fetch(`${CONTRIBUTIONS_API}/${username}?y=last`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!response.ok) return null;

    const data = (await response.json()) as ApiResponse;
    const days = data.contributions;
    if (!Array.isArray(days) || days.length === 0) return null;

    return buildCalendar(
      days.map((day) => ({
        date: day.date,
        count: day.count,
        level: clampLevel(day.level),
      })),
    );
  } catch {
    return null;
  }
}

/** Groups a flat day list into calendar weeks (Sunday-first, like GitHub). */
export function buildCalendar(days: ContributionDay[]): ContributionCalendar {
  const weeks: ContributionWeeks = [];

  for (const day of days) {
    const weekday = new Date(`${day.date}T00:00:00Z`).getUTCDay();
    // The first week is partial unless the range happens to start on a Sunday.
    if (weeks.length === 0 || weekday === 0) weeks.push([]);
    weeks[weeks.length - 1]!.push(day);
  }

  const first = days[0]!;
  const last = days[days.length - 1]!;

  return {
    weeks,
    total: days.reduce((sum, day) => sum + day.count, 0),
    from: formatDate(first.date),
    to: formatDate(last.date),
    months: monthHeadings(weeks),
  };
}

/** One heading per month the mosaic spans, oldest first. */
function monthHeadings(weeks: ContributionWeeks): string[] {
  const seen = new Set<string>();
  const labels: string[] = [];

  for (const week of weeks) {
    const day = week[0];
    if (!day) continue;
    const date = new Date(`${day.date}T00:00:00Z`);
    const key = `${date.getUTCFullYear()}-${date.getUTCMonth()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    labels.push(date.toLocaleString("en-US", { month: "short", timeZone: "UTC" }));
  }

  return labels;
}

function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  return `${day}.${month}.${year}`;
}

function clampLevel(level: number): ContributionLevel {
  const rounded = Math.round(level);
  if (rounded <= 0) return 0;
  if (rounded >= 4) return 4;
  return rounded as ContributionLevel;
}

/**
 * Empty year-long calendar ending today, used when the GitHub API is
 * unavailable so the section still renders at its usual size.
 */
export function emptyCalendar(): ContributionCalendar {
  const today = new Date();
  const days: ContributionDay[] = Array.from({ length: 371 }, (_, index) => {
    const date = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - (370 - index)),
    );
    return { date: date.toISOString().slice(0, 10), count: 0, level: 0 as ContributionLevel };
  });
  return buildCalendar(days);
}
