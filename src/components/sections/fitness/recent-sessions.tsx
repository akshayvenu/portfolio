"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import { IconTile, Panel, PanelHeader, PanelTitle } from "@/components/ui";
import type { WorkoutSummary } from "@/types/hevy";
import { Chevrons, CollapsibleRow, MetaSeparator } from "../shared";

function sessionDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function SessionItem({ workout, defaultOpen }: { workout: WorkoutSummary; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-line py-4 pr-2 pl-4 last:border-b-0">
      <CollapsibleRow open={open} onToggle={() => setOpen((value) => !value)}>
        <div className="mb-1 flex items-start gap-3">
          <IconTile>
            <Icon name="dumbbell" size={13} />
          </IconTile>

          <h3 className="m-0 flex-1 text-base font-medium">{workout.title}</h3>

          {workout.prCount > 0 && (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-training/40 px-1.5 py-0.5 font-mono text-[10px] text-training">
              <Icon name="trophy" size={10} />
              {workout.prCount} PR{workout.prCount === 1 ? "" : "s"}
            </span>
          )}

          <Chevrons open={open} />
        </div>

        <dl className="m-0 flex flex-wrap items-center gap-x-2 gap-y-0 pl-9 text-sm text-muted-foreground">
          <dd className="m-0 font-mono tabular-nums">{sessionDate(workout.startTime)}</dd>
          <MetaSeparator />
          <dd className="m-0 font-mono tabular-nums">{workout.durationMinutes} min</dd>
          <MetaSeparator />
          <dd className="m-0 font-mono tabular-nums">{workout.sets} sets</dd>
          <MetaSeparator />
          <dd className="m-0 font-mono tabular-nums">
            {workout.volumeKg.toLocaleString("en-US")} kg
          </dd>
        </dl>
      </CollapsibleRow>

      {open && (
        <ul className="m-0 mt-3 ml-[11px] flex list-none flex-col gap-1.5 border-l border-line pt-1 pb-1 pl-4">
          {workout.exercises.map((exercise) => (
            <li key={exercise.title} className="flex items-baseline gap-2 text-sm">
              <span className="min-w-0 flex-1 truncate">{exercise.title}</span>
              {exercise.muscle && (
                <span className="hidden shrink-0 font-mono text-[10px] text-muted-foreground sm:inline">
                  {exercise.muscle}
                </span>
              )}
              <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
                {exercise.sets} × {exercise.topSet}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * The last handful of sessions, newest first.
 *
 * Rows mirror the Experience timeline on the professional page — same tile,
 * same chevrons, same collapse behaviour — so the two halves of the site feel
 * like one document. Only the first row opens by default; the rest stay quiet.
 */
export function RecentSessions({ workouts }: { workouts: WorkoutSummary[] }) {
  return (
    <Panel id="sessions">
      <PanelHeader className="flex items-baseline justify-between gap-4">
        <PanelTitle>Recent sessions</PanelTitle>
        <span className="font-mono text-xs text-muted-foreground">newest first</span>
      </PanelHeader>

      {workouts.length === 0 ? (
        <p className="m-0 p-4 text-sm text-muted-foreground">Nothing logged yet.</p>
      ) : (
        workouts.map((workout, index) => (
          <SessionItem key={workout.id} workout={workout} defaultOpen={index === 0} />
        ))
      )}
    </Panel>
  );
}
