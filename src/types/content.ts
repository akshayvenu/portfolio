import type { IconName } from "@/lib/icons";

/**
 * Shape of every piece of portfolio content.
 *
 * Content is plain, serialisable data (no JSX, no component references) so the
 * `src/content` modules can later be swapped for a CMS or MDX loader without
 * touching a single component.
 */

export interface OverviewItem {
  icon: IconName;
  /** Static label. Omit when `dynamic` supplies the value at runtime. */
  label?: string;
  /** Render in the mono face — used for "data-like" values. */
  mono?: boolean;
  href?: string;
  /** Click-to-copy: the raw text placed on the clipboard. */
  copy?: string;
  /** Values that cannot be known at build time. */
  dynamic?: "local-time";
}

export interface Profile {
  displayName: string;
  /** Avatar image served from `public/`. Omit to fall back to initials. */
  avatarUrl?: string;
  /** Rotating one-liners under the name. */
  flipSentences: string[];
  /** Bio paragraphs. `**bold**` spans render as underlined links. */
  bio: string[];
  /** IANA zone used by the live clock in the overview panel. */
  timeZone: string;
  /**
   * Abbreviation shown beside the clock. Optional — without it the zone name
   * comes from `Intl`, which renders many zones as a UTC offset ("GMT+5:30")
   * rather than the local abbreviation ("IST").
   */
  timeZoneLabel?: string;
  overview: OverviewItem[];
  overviewRight: OverviewItem[];
}

export type SocialPlatform = "github" | "x" | "linkedin";

export interface SocialLink {
  title: string;
  handle: string;
  href: string;
  platform: SocialPlatform;
}

export interface TechStackGroup {
  category: string;
  items: string[];
}

export interface Role {
  title: string;
  employmentType: string;
  /** `MM.YYYY` */
  start: string;
  /** `MM.YYYY`, or `null` for "present". */
  end: string | null;
  duration: string;
  /** Open on first paint. */
  expanded: boolean;
  description: string[];
  skills: string[];
}

export interface Company {
  company: string;
  location: string;
  current: boolean;
  roles: Role[];
}

export interface EducationEntry {
  school: string;
  start: string;
  end: string | null;
  degree: string | null;
  field: string | null;
  /** `null` makes the row non-collapsible. */
  description: string[] | null;
  skills: string[];
}

export interface Project {
  title: string;
  start: string;
  end: string | null;
  link: string;
  expanded: boolean;
  description: string;
  bullets: string[];
  skills: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  /** `DD.MM.YYYY` */
  date: string;
  href: string;
}

/** GitHub-style contribution intensity, 0 (none) through 4 (most). */
export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

/** A single day in the contribution mosaic. */
export interface ContributionDay {
  /** ISO `YYYY-MM-DD`. */
  date: string;
  count: number;
  level: ContributionLevel;
}

/** One entry per week, each holding seven days (oldest week first). */
export type ContributionWeeks = ContributionDay[][];

export interface NavItem {
  label: string;
  href: string;
}
