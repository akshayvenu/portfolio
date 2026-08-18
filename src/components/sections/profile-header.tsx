import { Icon } from "@/components/icons";
import { profile } from "@/content";
import { FlipSentences } from "./flip-sentences";
import { IsometricFigure } from "./isometric-figure";

/** Initials shown while no avatar image is supplied. */
function initialsOf(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Masthead: avatar column pinned to the bottom-left, decorative figure filling
 * the top-right, name and rotating tagline stacked beneath it. The two-row grid
 * (`1fr auto`) is what pushes both the avatar and the name block to the
 * baseline regardless of the figure's height.
 */
export function ProfileHeader() {
  return (
    <div className="relative grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] overflow-y-clip border-x border-b border-line">
      <IsometricFigure />

      <div className="col-start-1 row-span-2 row-start-1 flex flex-col">
        <div className="mt-auto shrink-0 border-t border-r border-line px-[2px] py-[3px]">
          <div className="flex size-[152px] items-center justify-center rounded-full border border-border bg-muted text-[34px] font-medium tracking-[-0.02em] text-muted-foreground select-none max-sm:size-24 max-sm:text-2xl">
            {initialsOf(profile.displayName)}
          </div>
        </div>
      </div>

      <div className="col-start-2 flex min-w-0 flex-col">
        <div className="z-[1] mt-auto border-t border-line">
          <div className="flex h-11 items-center gap-2 pl-4">
            <h1 className="m-0 -translate-y-px text-[2rem] leading-none font-medium tracking-[-0.025em] max-sm:text-2xl">
              {profile.displayName}
            </h1>
            <Icon name="badge-check" size={18} className="shrink-0 text-info" />
            <span className="sr-only">Verified</span>
          </div>
          <FlipSentences sentences={profile.flipSentences} />
        </div>
      </div>
    </div>
  );
}
