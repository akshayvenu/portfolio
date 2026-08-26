import { Icon } from "@/components/icons";
import { Panel, PanelSrTitle } from "@/components/ui";
import type { IconName } from "@/lib/icons";
import type { TrainingStat } from "@/types/hevy";

/** Stat id → leading icon. Unknown ids fall back to the generic activity mark. */
const STAT_ICONS: Record<string, IconName> = {
  workouts: "dumbbell",
  volume: "activity",
  streak: "flame",
  cadence: "calendar-days",
  duration: "timer",
};

/**
 * The headline numbers.
 *
 * A borderless grid whose cells are separated by the page's own hairlines
 * (negative-margin ring trick) rather than by cards — five figures should read
 * as one instrument panel, not five boxes.
 */
export function TrainingStats({ stats }: { stats: TrainingStat[] }) {
  return (
    <Panel id="numbers">
      <PanelSrTitle>Training numbers</PanelSrTitle>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="flex min-w-0 flex-col gap-1 border-r border-b border-line p-4 last:border-r-0"
          >
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Icon name={STAT_ICONS[stat.id] ?? "activity"} size={13} className="text-training" />
              {stat.label}
            </span>

            <span className="font-mono text-2xl leading-none font-medium tabular-nums">
              {stat.value}
              {stat.unit && (
                <span className="ml-1 text-sm font-normal text-muted-foreground">{stat.unit}</span>
              )}
            </span>

            {stat.hint && (
              <span className="truncate text-xs text-muted-foreground" title={stat.hint}>
                {stat.hint}
              </span>
            )}
          </div>
        ))}
      </div>
    </Panel>
  );
}
