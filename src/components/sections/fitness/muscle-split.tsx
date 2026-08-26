import { Panel, PanelHeader, PanelTitle } from "@/components/ui";
import type { MuscleSplitSlice } from "@/types/hevy";

/**
 * Where the working sets actually went, by primary muscle group.
 *
 * Bars are drawn as a background fill on the row itself rather than as a chart
 * widget: at six categories a labelled bar list out-reads a pie, and it keeps
 * the panel on the same 4px rhythm as everything else on the page.
 */
export function MuscleSplit({ split }: { split: MuscleSplitSlice[] }) {
  const max = Math.max(...split.map((slice) => slice.share), 0.0001);

  return (
    <Panel className="flex-1">
      <PanelHeader>
        <PanelTitle className="text-xl">Where the sets go</PanelTitle>
      </PanelHeader>

      {split.length === 0 ? (
        <p className="m-0 p-4 text-sm text-muted-foreground">
          No set data in the current window yet.
        </p>
      ) : (
        <ul className="m-0 flex list-none flex-col gap-2 p-4">
          {split.map((slice) => (
            <li key={slice.muscle} className="relative isolate overflow-hidden rounded-md">
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 -z-10 rounded-md bg-training-muted"
                style={{ width: `${(slice.share / max) * 100}%` }}
              />
              <div className="flex items-center justify-between gap-3 px-2 py-1.5">
                <span className="truncate text-sm">{slice.muscle}</span>
                <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
                  {slice.sets} sets · {Math.round(slice.share * 100)}%
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}
