import {
  ArrowUpRight,
  BadgeCheck,
  Box,
  ChevronsDownUp,
  ChevronsUpDown,
  CircleCheckBig,
  Clock,
  CodeXml,
  GraduationCap,
  Infinity as InfinityIcon,
  Lightbulb,
  Link as LinkIcon,
  Mail,
  MapPin,
  Mars,
  Moon,
  Phone,
  Search,
  Sun,
  type LucideIcon,
} from "lucide-react";

/**
 * The single place icons are resolved.
 *
 * The design kit referenced the `lucide-static` icon font by class name
 * (`icon-code-xml`). Here the same names key into tree-shaken `lucide-react`
 * components, which keeps `src/content` free of JSX while staying type-safe:
 * an unknown icon name is a compile error, not a missing glyph at runtime.
 */
export const iconRegistry = {
  "arrow-up-right": ArrowUpRight,
  "badge-check": BadgeCheck,
  box: Box,
  "chevrons-down-up": ChevronsDownUp,
  "chevrons-up-down": ChevronsUpDown,
  "circle-check-big": CircleCheckBig,
  clock: Clock,
  "code-xml": CodeXml,
  "graduation-cap": GraduationCap,
  infinity: InfinityIcon,
  lightbulb: Lightbulb,
  link: LinkIcon,
  mail: Mail,
  "map-pin": MapPin,
  mars: Mars,
  moon: Moon,
  phone: Phone,
  search: Search,
  sun: Sun,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconRegistry;

export function getIcon(name: IconName): LucideIcon {
  return iconRegistry[name];
}
