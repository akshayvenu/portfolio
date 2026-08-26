import { Panel, PanelHeader, PanelTitle, Tag } from "@/components/ui";
import type { RoutineSummary } from "@/types/hevy";

/**
 * The routines currently in rotation — the plan behind the log.
 */
export function CurrentProgram({ routines }: { routines: RoutineSummary[] }) {
  if (routines.length === 0) return null;

  return (
    <Panel>
      <PanelHeader className="flex items-baseline justify-between gap-4">
        <PanelTitle className="text-xl">Current split</PanelTitle>
        <span className="font-mono text-xs text-muted-foreground">{routines.length} routines</span>
      </PanelHeader>

      <div className="grid sm:grid-cols-2">
        {routines.map((routine) => (
          <div key={routine.id} className="border-r border-b border-line p-4 last:border-r-0">
            <p className="m-0 text-sm font-medium">{routine.title}</p>
            <p className="m-0 mt-1 font-mono text-xs text-muted-foreground tabular-nums">
              {routine.exerciseCount} exercises · {routine.setCount} sets
            </p>

            {routine.focus.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {routine.focus.map((muscle) => (
                  <Tag key={muscle}>{muscle}</Tag>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Panel>
  );
}
