"use client";

import { useRef, useState, type MouseEvent } from "react";
import type { ContributionCalendar } from "@/lib/contributions";
import type { ContributionDay, ContributionLevel } from "@/types/content";

const LEVELS: ContributionLevel[] = [0, 1, 2, 3, 4];

function levelBackground(level: ContributionLevel): string {
  return `var(--contribution-${level})`;
}

function contributionLabel(day: ContributionDay): string {
  const count = day.count === 0 ? "No contributions" : `${day.count} contribution${day.count === 1 ? "" : "s"}`;
  const date = new Date(`${day.date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  return `${count} on ${date}`;
}

interface Tooltip {
  x: number;
  text: string;
}

interface Props {
  calendar: ContributionCalendar;
  sourceLabel: string;
  sourceHref: string;
}

/** GitHub-style contribution mosaic with a hover readout. */
export function ContributionsMosaic({ calendar, sourceLabel, sourceHref }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

  const { weeks, total, from, to, months } = calendar;

  function showTooltip(event: MouseEvent<HTMLDivElement>, day: ContributionDay) {
    const container = containerRef.current;
    if (!container) return;

    const cell = event.currentTarget.getBoundingClientRect();
    const bounds = container.getBoundingClientRect();
    setTooltip({
      x: cell.left - bounds.left + cell.width / 2,
      text: contributionLabel(day),
    });
  }

  return (
    <div className="px-4 pt-3">
      {/* Below ~560px a 53-week grid stops being readable, so it scrolls
          horizontally rather than collapsing into sub-pixel cells. */}
      <div className="overflow-x-auto">
        <div ref={containerRef} className="relative min-w-[560px]">
          {tooltip && (
            <div
              role="status"
              className="pointer-events-none absolute top-0 z-[2] -translate-x-1/2 rounded-md bg-foreground px-2 py-[5px] text-xs whitespace-nowrap text-background"
              style={{ left: tooltip.x }}
            >
              {tooltip.text}
            </div>
          )}

          <div className="mb-1 flex gap-0.5 pl-px">
            {months.map((month, index) => (
              <div key={`${month}-${index}`} className="flex-1 text-xs text-muted-foreground">
                {month}
              </div>
            ))}
          </div>

          <div
            role="img"
            aria-label={`${total.toLocaleString()} contributions between ${from} and ${to}`}
            className="flex gap-0.5"
            onMouseLeave={() => setTooltip(null)}
          >
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-1 flex-col gap-0.5">
                {week.map((day) => (
                  <div
                    key={day.date}
                    aria-hidden="true"
                    onMouseEnter={(event) => showTooltip(event, day)}
                    className="aspect-square rounded-[2px]"
                    style={{ background: levelBackground(day.level) }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 py-3 text-sm text-foreground">
        <span>
          <span className="text-caption">Fig. 2.&nbsp;&nbsp;</span>
          {total.toLocaleString()} contributions, {from} – {to}. Source:{" "}
          <a
            href={sourceHref}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-inherit"
          >
            {sourceLabel}
          </a>
          .
        </span>

        <span className="inline-flex items-center gap-1 text-muted-foreground">
          Less
          {LEVELS.map((level) => (
            <span
              key={level}
              className="size-2.5 rounded-[2px]"
              style={{ background: levelBackground(level) }}
            />
          ))}
          More
        </span>
      </div>
    </div>
  );
}
