import type { TechStackGroup } from "@/types/content";

export const techStack: readonly TechStackGroup[] = [
  { category: "Language", items: ["TypeScript", "JavaScript", "Python", "Go"] },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "shadcn/ui", "Radix UI", "Motion"],
  },
  { category: "Backend & Database", items: ["Node.js", "Bun", "PostgreSQL", "Redis", "nginx"] },
  { category: "Workflow & AI", items: ["Claude", "Cursor", "Git", "GitHub", "Docker", "Vercel"] },
  { category: "Analytics", items: ["PostHog", "OpenPanel"] },
  { category: "Design", items: ["Figma", "Photoshop"] },
];
