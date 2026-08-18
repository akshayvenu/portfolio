"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import { IconTile, Panel, PanelHeader, PanelTitle } from "@/components/ui";
import { experience } from "@/content";
import type { Role } from "@/types/content";
import { Bullets, Chevrons, CollapsibleRow, MetaSeparator, Period, TagList } from "./shared";

function RoleItem({ role }: { role: Role }) {
  const [open, setOpen] = useState(role.expanded);

  return (
    <div>
      <CollapsibleRow open={open} onToggle={() => setOpen((value) => !value)}>
        <div className="mb-1 flex items-start gap-3">
          <IconTile>
            <Icon name="code-xml" size={13} />
          </IconTile>
          <h4 className="m-0 flex-1 text-base font-medium">{role.title}</h4>
          <Chevrons open={open} />
        </div>

        <dl className="m-0 flex flex-wrap items-center gap-x-2 gap-y-0 pl-9 text-sm text-muted-foreground">
          <dd className="m-0">{role.employmentType}</dd>
          <MetaSeparator />
          <dd className="m-0">
            <Period start={role.start} end={role.end} />
          </dd>
          <MetaSeparator />
          <dd className="m-0">{role.duration}</dd>
        </dl>
      </CollapsibleRow>

      {open && (
        <div className="pt-3 pl-9">
          <Bullets items={role.description} />
        </div>
      )}

      <TagList skills={role.skills} className="pt-3 pl-9" />
    </div>
  );
}

export function Experience() {
  return (
    <Panel id="experience">
      <PanelHeader>
        <PanelTitle>Experience</PanelTitle>
      </PanelHeader>

      {experience.map((company) => (
        <div
          key={company.company}
          className="flex flex-col gap-4 border-b border-line py-4 pr-2 pl-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-foreground text-[11px] font-semibold text-background">
              {company.company.charAt(0)}
            </div>
            <h3 className="m-0 flex-1 text-lg font-medium">{company.company}</h3>
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              {company.location}
              {company.current && (
                <>
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-info" />
                  <span className="sr-only">Current role</span>
                </>
              )}
            </span>
          </div>

          {company.roles.map((role) => (
            <RoleItem key={role.title} role={role} />
          ))}
        </div>
      ))}
    </Panel>
  );
}
