import type { ContributionLevel, ContributionWeeks } from "@/types/content";

export const WEEKS_PER_YEAR = 53;
export const DAYS_PER_WEEK = 7;

/** Contributions credited per intensity step, used for the headline total. */
export const CONTRIBUTIONS_PER_LEVEL = 3;

/**
 * Deterministic pseudo-random contribution mosaic.
 *
 * A seeded linear congruential generator keeps the mosaic byte-identical
 * between the server render and the client hydration — a `Math.random()` mosaic
 * would mismatch on every load. Swap this for the GitHub GraphQL
 * `contributionsCollection` query when wiring real data; the return shape is
 * already what the `Contributions` component expects.
 */
export function generateContributions(seed = 1337): ContributionWeeks {
  let state = seed;
  const next = () => (state = (state * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;

  return Array.from({ length: WEEKS_PER_YEAR }, (_, week) =>
    Array.from({ length: DAYS_PER_WEEK }, () => {
      // Mid-year weeks lean busier so the mosaic reads like a real year.
      const bias = week > 20 && week < 46 ? 0.25 : 0;
      const value = next() + bias;
      return toLevel(value);
    }),
  );
}

function toLevel(value: number): ContributionLevel {
  if (value < 0.42) return 0;
  if (value < 0.62) return 1;
  if (value < 0.8) return 2;
  if (value < 0.93) return 3;
  return 4;
}

export function countContributions(weeks: ContributionWeeks): number {
  return weeks.flat().reduce<number>((total, level) => total + level * CONTRIBUTIONS_PER_LEVEL, 0);
}
