import { Icon } from "@/components/icons";
import { IconTile, Panel, PanelSrTitle } from "@/components/ui";
import { profile } from "@/content";
import { cn } from "@/lib/utils";
import type { OverviewItem } from "@/types/content";
import { LocalTime } from "./local-time";

function OverviewRow({ item }: { item: OverviewItem }) {
  const value =
    item.dynamic === "local-time" ? (
      <LocalTime timeZone={profile.timeZone} label={profile.timeZoneLabel} />
    ) : (
      item.label
    );

  const text = (
    <span className={cn("text-sm text-foreground", item.mono ? "font-mono" : "font-sans")}>
      {value}
    </span>
  );

  return (
    <div className="flex items-center gap-3 py-[5px]">
      <IconTile>
        <Icon name={item.icon} size={13} />
      </IconTile>
      {item.href ? (
        <a href={item.href} className="link-underline text-inherit no-underline">
          {text}
        </a>
      ) : (
        text
      )}
    </div>
  );
}

/** At-a-glance facts: role, location and contact, split into two columns. */
export function Overview() {
  return (
    <Panel noBottomLine id="about">
      <PanelSrTitle>Overview</PanelSrTitle>
      <div className="grid grid-cols-1 gap-y-1 p-4 sm:grid-cols-2 sm:gap-y-0">
        <div className="border-line sm:border-r sm:border-dashed sm:pr-4">
          {profile.overview.map((item) => (
            <OverviewRow key={item.icon + (item.label ?? "")} item={item} />
          ))}
        </div>
        <div className="sm:pl-4">
          {profile.overviewRight.map((item) => (
            <OverviewRow key={item.icon + (item.label ?? "")} item={item} />
          ))}
        </div>
      </div>
    </Panel>
  );
}
