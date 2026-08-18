"use client";

import { useRef, useState, type MouseEvent } from "react";
import { Panel, PanelSrTitle } from "@/components/ui";
import { contributionMonths, contributionRange, contributionWeeks } from "@/content";
import { CONTRIBUTIONS_PER_LEVEL, countContributions } from "@/lib/contributions";
import type { ContributionLevel } from "@/types/content";

const LEVELS: ContributionLevel[] = [0, 1, 2, 3, 4];

function levelBackground(level: ContributionLevel): string {
  return `var(--contribution-${level})`;
}

function contributionLabel(level: ContributionLevel): string {
  const count = level * CONTRIBUTIONS_PER_LEVEL;
  return `${count === 0 ? "No" : count} contributions`;
}

interface Tooltip {
  x: number;
  text: string;
}

/** GitHub-style contribution mosaic with a hover readout. */
export function Contributions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

  const total = countContributions(contributionWeeks);

  function showTooltip(event: MouseEvent<HTMLDivElement>, level: ContributionLevel) {
    const container = containerRef.current;
    if (!container) return;

    const cell = event.currentTarget.getBoundingClientRect();
    const bounds = container.getBoundingClientRect();
    setTooltip({
      x: cell.left - bounds.left + cell.width / 2,
      text: contributionLabel(level),
    });
  }

  return (
    <Panel noTopLine>
      <PanelSrTitle>Contributions</PanelSrTitle>

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
              {contributionMonths.map((month) => (
                <div key={month} className="flex-1 text-xs text-muted-foreground">
                  {month}
                </div>
              ))}
            </div>

            <div
              role="img"
              aria-label={`${total.toLocaleString()} contributions between ${contributionRange.from} and ${contributionRange.to}`}
              className="flex gap-0.5"
              onMouseLeave={() => setTooltip(null)}
            >
              {contributionWeeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-1 flex-col gap-0.5">
                  {week.map((level, dayIndex) => (
                    <div
                      key={dayIndex}
                      aria-hidden="true"
                      onMouseEnter={(event) => showTooltip(event, level)}
                      className="aspect-square rounded-[2px]"
                      style={{ background: levelBackground(level) }}
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
            {total.toLocaleString()} contributions, {contributionRange.from} –{" "}
            {contributionRange.to}. Source:{" "}
            <a
              href={contributionRange.sourceHref}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-inherit"
            >
              {contributionRange.sourceLabel}
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
    </Panel>
  );
}
