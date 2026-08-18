import type { Project } from "@/types/content";

/** PLACEHOLDER CONTENT — replace with real projects. */
export const projects: readonly Project[] = [
  {
    title: "Devgrid",
    start: "05.2025",
    end: null,
    link: "#",
    expanded: true,
    description:
      "A minimal dashboard for tracking side-project metrics, with a plugin API for custom sources.",
    bullets: [
      "Real-time metric streams with offline replay",
      "Plugin API for custom data sources",
      "Unstyled core for complete style customization",
      "Full keyboard navigation and type-ahead search",
    ],
    skills: [
      "Open Source",
      "React",
      "TypeScript",
      "Monorepo",
      "Turborepo",
      "NPM Registry",
      "GitHub Actions",
    ],
  },
  {
    title: "Flowline",
    start: "01.2024",
    end: null,
    link: "#",
    expanded: false,
    description: "CLI for scaffolding internal tools from a single config file.",
    bullets: [],
    skills: ["Node.js", "Bun", "TypeScript"],
  },
  {
    title: "Palette",
    start: "03.2022",
    end: "11.2022",
    link: "#",
    expanded: false,
    description: "Color-token generator for design systems.",
    bullets: [],
    skills: ["TypeScript", "CSS"],
  },
];
