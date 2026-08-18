import { generateContributions } from "@/lib/contributions";
import type { ContributionWeeks } from "@/types/content";

/**
 * PLACEHOLDER DATA — a deterministic mosaic stands in for the real GitHub
 * contribution graph. See `src/lib/contributions.ts` for how to swap in the API.
 */
export const contributionWeeks: ContributionWeeks = generateContributions();

/** Window the mosaic covers, rendered in the figure caption. */
export const contributionRange = {
  from: "17.08.2025",
  to: "17.08.2026",
  sourceLabel: "GitHub",
  sourceHref: "https://github.com/akshayvenu",
} as const;

/** Column headings across the mosaic, oldest month first. */
export const contributionMonths = [
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
] as const;
