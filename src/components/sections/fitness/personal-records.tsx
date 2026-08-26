import { Icon } from "@/components/icons";
import { IconTile, Panel, PanelHeader, PanelTitle } from "@/components/ui";
import { formatKg } from "@/lib/utils";
import type { PersonalRecord } from "@/types/hevy";

/**
 * Best working set per lift, ranked by estimated 1RM (Epley — the same formula
 * Hevy shows in-app, so the numbers here agree with the source).
 */
export function PersonalRecords({ records }: { records: PersonalRecord[] }) {
  return (
    <Panel id="records" className="flex-1">
      <PanelHeader>
        <PanelTitle className="text-xl">Personal bests</PanelTitle>
      </PanelHeader>

      {records.length === 0 ? (
        <p className="m-0 p-4 text-sm text-muted-foreground">No logged sets to rank yet.</p>
      ) : (
        <ol className="m-0 flex list-none flex-col p-0">
          {records.map((record, index) => (
            <li
              key={record.exerciseTemplateId}
              className="flex items-center gap-3 border-b border-line px-4 py-3 last:border-b-0"
            >
              <IconTile className={index === 0 ? "border-training/40 text-training" : undefined}>
                <Icon name={index === 0 ? "trophy" : "dumbbell"} size={13} />
              </IconTile>

              <div className="min-w-0 flex-1">
                <p className="m-0 truncate text-sm font-medium">{record.exercise}</p>
                <p className="m-0 font-mono text-xs text-muted-foreground tabular-nums">
                  {formatKg(record.weightKg)} × {record.reps} ·{" "}
                  {new Date(record.date).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <p className="m-0 font-mono text-sm font-medium tabular-nums">
                  {record.estimatedOneRepMaxKg}
                  <span className="ml-0.5 text-xs font-normal text-muted-foreground">kg</span>
                </p>
                <p className="m-0 text-[10px] tracking-wide text-muted-foreground uppercase">
                  est. 1RM
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </Panel>
  );
}
