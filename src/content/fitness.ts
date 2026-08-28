import type { IconName } from "@/lib/icons";

/**
 * Static copy for the Side Quest page. Everything numeric comes from Hevy at
 * request time (see `src/lib/hevy`) — this file only holds the words around it.
 */
export const fitness = {
  eyebrow: "Side quest",
  title: "Training log",
  lede: "The other half of the discipline. Every set below is pulled from my Hevy log through their public API — no hand-typed numbers, no rounding in my favour.",
  hevyUrl: "https://hevy.com/user/zaibonk",
  /** Shown when the page renders seeded stand-in data instead of live API data. */
  sampleNotice:
    "Showing representative sample data — the live Hevy key isn’t configured in this environment.",
  principles: [
    {
      icon: "repeat" as IconName,
      title: "Consistency over intensity",
      body: "Four sessions a week, held for months. Boring beats heroic.",
    },
    {
      icon: "activity" as IconName,
      title: "Progressive overload",
      body: "Small, tracked jumps. If the log doesn’t move, the plan changes.",
    },
    {
      icon: "flame" as IconName,
      title: "Same loop as engineering",
      body: "Measure, ship a small change, read the data, repeat.",
    },
  ],
} as const;
