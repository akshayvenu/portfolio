import { Icon } from "@/components/icons";
import { Panel } from "@/components/ui";
import { fitness } from "@/content";
import type { TrainingSnapshot } from "@/types/hevy";

/**
 * Side Quest hero.
 *
 * Deliberately quieter than the professional profile header: an eyebrow, a
 * heading, one paragraph, and a provenance strip. The provenance is the point —
 * the page's whole claim is "these numbers aren't mine to edit".
 */
export function TrainingHeader({ snapshot }: { snapshot: TrainingSnapshot }) {
  const synced = new Date(snapshot.syncedAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <Panel className="px-4 py-8">
      <p className="m-0 flex items-center gap-2 font-mono text-xs tracking-[0.18em] text-training uppercase">
        <Icon name="dumbbell" size={14} />
        {fitness.eyebrow}
      </p>

      <h1 className="mt-3 mb-0 font-heading text-4xl font-medium tracking-[-0.02em] sm:text-5xl">
        {fitness.title}
      </h1>

      <p className="mt-3 mb-0 max-w-[52ch] text-base text-muted-foreground">{fitness.lede}</p>

      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2 py-1 font-mono">
          <span
            aria-hidden="true"
            className={
              snapshot.source === "live"
                ? "size-1.5 rounded-full bg-training"
                : "size-1.5 rounded-full bg-muted-foreground"
            }
          />
          {snapshot.source === "live" ? "Live from Hevy" : "Sample data"}
        </span>

        <span className="font-mono">Synced {synced}</span>

        <a
          href={fitness.hevyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-mono text-foreground no-underline transition-colors hover:text-training"
        >
          hevy.com
          <Icon name="arrow-up-right" size={12} />
        </a>
      </div>

      {snapshot.source === "sample" && (
        <p className="mt-4 mb-0 max-w-[60ch] border-l-2 border-training pl-3 text-xs text-muted-foreground">
          {fitness.sampleNotice}
        </p>
      )}
    </Panel>
  );
}
