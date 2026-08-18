"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import { IconTile, Panel, PanelHeader, PanelTitle } from "@/components/ui";
import { education } from "@/content";
import type { EducationEntry } from "@/types/content";
import { Bullets, Chevrons, CollapsibleRow, MetaSeparator, Period, TagList } from "./shared";

/**
 * One timeline entry. The vertical rule runs the full height of every entry;
 * the final entry caps it with a rounded elbow drawn from two borders on a
 * background-coloured mask.
 */
function EducationItem({ item, isLast }: { item: EducationEntry; isLast: boolean }) {
  const [open, setOpen] = useState(false);
  const collapsible = item.description !== null;

  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute top-0 left-3 h-full w-px bg-border" />

      {isLast && (
        <div aria-hidden="true" className="absolute bottom-0 left-3 size-4 bg-background">
          <span className="block size-full -translate-y-[9px] rounded-bl-[3px] border-b border-l border-border" />
        </div>
      )}

      <CollapsibleRow
        open={open}
        onToggle={() => setOpen((value) => !value)}
        disabled={!collapsible}
      >
        <div className="mb-1 flex items-start gap-3">
          <IconTile>
            <Icon name="graduation-cap" size={13} />
          </IconTile>
          <h3 className="m-0 flex-1 text-base font-medium">{item.school}</h3>
          {collapsible && <Chevrons open={open} />}
        </div>

        <dl className="m-0 flex flex-wrap items-center gap-x-2 gap-y-0 pl-9 text-sm text-muted-foreground">
          <dd className="m-0">
            <Period start={item.start} end={item.end} />
          </dd>
          {item.degree && (
            <>
              <MetaSeparator />
              <dd className="m-0">{item.degree}</dd>
            </>
          )}
          {item.field && (
            <>
              <MetaSeparator />
              <dd className="m-0">{item.field}</dd>
            </>
          )}
        </dl>
      </CollapsibleRow>

      {open && collapsible && item.description && (
        <div className="pt-3 pl-9">
          <Bullets items={item.description} />
        </div>
      )}

      <TagList skills={item.skills} className="pt-3 pl-9" />
    </div>
  );
}

export function Education() {
  return (
    <Panel id="education">
      <PanelHeader>
        <PanelTitle>Education</PanelTitle>
      </PanelHeader>

      {education.map((item, index) => (
        <div key={item.school} className="border-b border-line py-4 pr-2 pl-4">
          <EducationItem item={item} isLast={index === education.length - 1} />
        </div>
      ))}
    </Panel>
  );
}
