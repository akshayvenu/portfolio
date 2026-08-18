"use client";

import { useState, type KeyboardEvent } from "react";
import { Icon } from "@/components/icons";
import { IconTile, Panel, PanelHeader, PanelTitle } from "@/components/ui";
import { projects } from "@/content";
import type { Project } from "@/types/content";
import { Bullets, Chevrons, Period, TagList } from "./shared";

/** Placeholder links in the content layer are `#`; don't render those as links. */
function isRealLink(href: string): boolean {
  return href.length > 0 && href !== "#";
}

function ProjectItem({ project }: { project: Project }) {
  const [open, setOpen] = useState(project.expanded);
  const toggle = () => setOpen((value) => !value);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    toggle();
  }

  return (
    <div className="border-b border-line">
      <div
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={toggle}
        onKeyDown={onKeyDown}
        className="flex cursor-pointer items-stretch transition-colors duration-150 hover:bg-accent-muted"
      >
        <div className="mx-4 flex items-center">
          <IconTile>
            <Icon name="box" size={13} />
          </IconTile>
        </div>

        <div className="flex flex-1 items-center gap-2 border-l border-dashed border-line py-3.5 pr-2 pl-4">
          <div className="min-w-0 flex-1">
            <h3 className="m-0 mb-0.5 text-base font-medium">{project.title}</h3>
            <div className="text-sm text-muted-foreground">
              <Period start={project.start} end={project.end} />
            </div>
          </div>

          {isRealLink(project.link) ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              aria-label={`Open ${project.title}`}
              className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon name="link" size={15} />
            </a>
          ) : (
            <Icon name="link" size={15} className="shrink-0 text-muted-foreground" />
          )}

          <Chevrons open={open} />
        </div>
      </div>

      {open && (
        <div className="flex flex-col gap-3.5 border-t border-line p-4">
          <p className="m-0 text-base leading-[1.6]">{project.description}</p>
          {project.bullets.length > 0 && <Bullets items={project.bullets} />}
          <TagList skills={project.skills} />
        </div>
      )}
    </div>
  );
}

export function Projects() {
  return (
    <Panel id="projects">
      <PanelHeader>
        <PanelTitle>
          Projects
          <sup className="ml-0.5 text-[0.45em] font-normal text-muted-foreground">
            ({projects.length})
          </sup>
        </PanelTitle>
      </PanelHeader>

      {projects.map((project) => (
        <ProjectItem key={project.title} project={project} />
      ))}
    </Panel>
  );
}
