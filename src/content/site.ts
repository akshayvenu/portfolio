import type { NavItem } from "@/types/content";

/**
 * Global site metadata. `url` drives canonical links, Open Graph tags,
 * `sitemap.xml` and `robots.txt`, so it must be the deployed origin.
 */
export const siteConfig = {
  name: "Akshay Venu",
  title: "Akshay Venu — Software Engineer",
  description:
    "Software Engineer with 5+ years of experience, known for pixel-perfect execution and an obsessive attention to detail.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://akshayvenu.com",
  locale: "en_US",
  /** Shown next to the GitHub mark in the header. */
  githubStars: "1.2k",
  githubUrl: "https://github.com/akshayvenu",
} as const;

export const navItems: readonly NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
];
