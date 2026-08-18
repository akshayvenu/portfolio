import type { Company } from "@/types/content";

/** PLACEHOLDER CONTENT — replace with real roles. */
export const experience: readonly Company[] = [
  {
    company: "Acme Labs",
    location: "Bengaluru, India (Remote)",
    current: true,
    roles: [
      {
        title: "Senior Frontend Engineer",
        employmentType: "Full-time",
        start: "01.2024",
        end: null,
        duration: "2y 7m",
        expanded: true,
        description: [
          "Own the design-system layer, from Figma to production-ready React.",
          "Build and maintain the internal component registry.",
          "Ship features for the marketing website.",
          "Maintain Storybook documentation.",
        ],
        skills: ["TypeScript", "Next.js", "Tailwind CSS", "Storybook", "Figma", "Design"],
      },
    ],
  },
  {
    company: "Northwind Systems",
    location: "Bengaluru, India (Hybrid)",
    current: false,
    roles: [
      {
        title: "Software Engineer",
        employmentType: "Full-time",
        start: "06.2021",
        end: "12.2023",
        duration: "2y 7m",
        expanded: false,
        description: ["Built internal tooling and customer-facing dashboards."],
        skills: ["React", "Node.js", "PostgreSQL"],
      },
    ],
  },
];
