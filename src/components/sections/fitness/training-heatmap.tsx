"use client";

import { useMemo, useRef, useState, type MouseEvent } from "react";
import type { HeatmapDay } from "@/types/hevy";

const WEEKDAY_LABELS = ["Mon", "", "Wed", "", "Fri", "", ""];

function readout(day: HeatmapDay): string {
  const date = new Date(`${day.date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  if (day.workouts === 0) return `Rest — ${date}`;
  return `${day.workouts} session${day.workouts === 1 ? "" : "s"} · ${day.volumeKg.toLocaleString("en-US")} kg — ${date}`;
}

interface Tooltip {
  x: number;
  text: string;
}

/**
 * Six months of training days, one column per week.
 *
 * Same mosaic geometry as the contributions map on the professional page — the
 * rhyme is intentional: one page shows commits, the other shows sessions, and
 * the argument is that they're the same habit. Only the ramp hue differs.
 */
export function TrainingHeatmap({ days }: { days: HeatmapDay[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

  const weeks = useMemo(() => {
    const columns: HeatmapDay[][] = [];
    for (let index = 0; index < days.length; index += 7) {
      columns.push(days.slice(index, index + 7));
    }
    return columns;
  }, [days]);

  const months = useMemo(() => {
    const labels: { column: number; label: string }[] = [];
    let previous = "";
    weeks.forEach((week, column) => {
      const first = week[0];
      if (!first) return;
      const label = new Date(`${first.date}T00:00:00`).toLocaleDateString("en-US", {
        month: "short",
      });
      if (label !== previous) {
        labels.push({ column, label });
        previous = label;
      }
    });
    return labels;
  }, [weeks]);

  const trainedDays = days.filter((day) => day.workouts > 0).length;

  function showTooltip(event: MouseEvent<HTMLDivElement>, day: HeatmapDay) {
    const container = containerRef.current;
    if (!container) return;
    const cell = event.currentTarget.getBoundingClientRect();
    const bounds = container.getBoundingClientRect();
    setTooltip({ x: cell.left - bounds.left + cell.width / 2, text: readout(day) });
  }

  return (
    <div className="px-4 pt-3 pb-4">
      {/* Below ~560px a 26-week grid stops being readable, so it scrolls rather
          than collapsing into sub-pixel cells. */}
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

          <div className="mt-6 mb-1 flex gap-0.5 pl-9">
            {weeks.map((_, column) => {
              const month = months.find((entry) => entry.column === column);
              return (
                <div key={column} className="w-3 shrink-0 text-[10px] text-muted-foreground">
                  {month?.label ?? ""}
                </div>
              );
            })}
          </div>

          <div className="flex gap-0.5" onMouseLeave={() => setTooltip(null)}>
            <div className="mr-1 flex w-8 shrink-0 flex-col gap-0.5">
              {WEEKDAY_LABELS.map((label, index) => (
                <div
                  key={index}
                  className="h-3 text-[10px] leading-3 text-muted-foreground"
                  aria-hidden="true"
                >
                  {label}
                </div>
              ))}
            </div>

            {weeks.map((week, column) => (
              <div key={column} className="flex flex-col gap-0.5">
                {week.map((day) => (
                  <div
                    key={day.date}
                    role="img"
                    aria-label={readout(day)}
                    title={readout(day)}
                    onMouseEnter={(event) => showTooltip(event, day)}
                    className="size-3 rounded-[2px] transition-transform duration-150 hover:scale-125"
                    style={{ background: `var(--training-${day.level})` }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-4 text-xs text-muted-foreground">
        <span className="font-mono tabular-nums">
          {trainedDays} training days in the last 26 weeks
        </span>

        <span className="flex items-center gap-1">
          Less
          {[0, 1, 2, 3, 4].map((level) => (
            <span
              key={level}
              aria-hidden="true"
              className="size-3 rounded-[2px]"
              style={{ background: `var(--training-${level})` }}
            />
          ))}
          More
        </span>
      </div>
    </div>
  );
}
