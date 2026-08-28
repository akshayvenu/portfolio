import type { NavItem, PageTab } from "@/types/content";

/**
 * Global site metadata. `url` drives canonical links, Open Graph tags,
 * `sitemap.xml` and `robots.txt`, so it must be the deployed origin.
 */
const FALLBACK_SITE_URL = "https://akshayvenu.com";

/**
 * Some hosts inject `NEXT_PUBLIC_SITE_URL` as an empty string, which `??` would
 * happily pass through to `new URL("")` and fail the build — so treat blank and
 * unset the same, and require an absolute origin.
 */
function resolveSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configured) return FALLBACK_SITE_URL;

  const withProtocol = /^https?:\/\//.test(configured) ? configured : `https://${configured}`;
  try {
    return new URL(withProtocol).origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export const siteConfig = {
  name: "Akshay Venu",
  title: "Akshay Venu — AI Backend Developer",
  description:
    "AI Backend Engineer passionate about building scalable backend systems and Generative AI applications.",
  url: resolveSiteUrl(),
  locale: "en_US",
  githubUrl: "https://github.com/akshayvenu",
} as const;

export const navItems: readonly NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
];

export const fitnessNavItems: readonly NavItem[] = [
  { label: "Numbers", href: "#numbers" },
  { label: "Consistency", href: "#consistency" },
  { label: "Records", href: "#records" },
  { label: "Sessions", href: "#sessions" },
];

/** Order matters — this is the left-to-right order of the header switch. */
export const pageTabs: readonly PageTab[] = [
  { label: "Professional", href: "/", sections: navItems },
  { label: "Side Quest", href: "/side-quest", sections: fitnessNavItems },
];
