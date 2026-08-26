import { Icon } from "@/components/icons";
import { IconTile, Panel, PanelHeader, PanelTitle } from "@/components/ui";
import { fitness } from "@/content";
import type { HeatmapDay } from "@/types/hevy";
import { TrainingHeatmap } from "./training-heatmap";

/**
 * Consistency block: the heatmap, plus the three rules it's the evidence for.
 * The principles sit *under* the data on purpose — the claim comes after the
 * proof, not before it.
 */
export function Consistency({ days }: { days: HeatmapDay[] }) {
  return (
    <Panel id="consistency">
      <PanelHeader className="flex items-baseline justify-between gap-4">
        <PanelTitle>Consistency</PanelTitle>
        <span className="font-mono text-xs text-muted-foreground">26 weeks</span>
      </PanelHeader>

      <TrainingHeatmap days={days} />

      <div className="grid border-t border-line sm:grid-cols-3">
        {fitness.principles.map((principle) => (
          <div key={principle.title} className="border-r border-line p-4 last:border-r-0">
            <div className="flex items-center gap-2">
              <IconTile>
                <Icon name={principle.icon} size={13} />
              </IconTile>
              <p className="m-0 text-sm font-medium">{principle.title}</p>
            </div>
            <p className="m-0 mt-2 text-sm text-muted-foreground">{principle.body}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}
