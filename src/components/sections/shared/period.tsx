import { Icon } from "@/components/icons";

interface PeriodProps {
  /** `MM.YYYY` */
  start: string;
  /** `MM.YYYY`, or `null` for an ongoing period. */
  end: string | null;
}

/** `01.2024 — ∞` date range. Ongoing periods render an infinity glyph. */
export function Period({ start, end }: PeriodProps) {
  return (
    <span className="inline-flex items-center gap-0.5 tabular-nums">
      <span>{start}</span>
      <span className="font-mono">—</span>
      {end ? (
        <span>{end}</span>
      ) : (
        <>
          <Icon name="infinity" size={17} className="translate-y-px" />
          <span className="sr-only">Present</span>
        </>
      )}
    </span>
  );
}
