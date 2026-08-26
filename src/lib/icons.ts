import {
  Activity,
  ArrowUpRight,
  BadgeCheck,
  Box,
  ChevronsDownUp,
  ChevronsUpDown,
  CircleCheckBig,
  Check,
  CalendarDays,
  Clock,
  CodeXml,
  Copy,
  Dumbbell,
  Flame,
  GraduationCap,
  Infinity as InfinityIcon,
  Lightbulb,
  Link as LinkIcon,
  Mail,
  MapPin,
  Mars,
  Phone,
  Repeat,
  Search,
  Timer,
  Trophy,
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
  activity: Activity,
  "arrow-up-right": ArrowUpRight,
  "badge-check": BadgeCheck,
  box: Box,
  "chevrons-down-up": ChevronsDownUp,
  "chevrons-up-down": ChevronsUpDown,
  "circle-check-big": CircleCheckBig,
  check: Check,
  clock: Clock,
  "calendar-days": CalendarDays,
  "code-xml": CodeXml,
  copy: Copy,
  dumbbell: Dumbbell,
  flame: Flame,
  "graduation-cap": GraduationCap,
  infinity: InfinityIcon,
  lightbulb: Lightbulb,
  link: LinkIcon,
  mail: Mail,
  "map-pin": MapPin,
  mars: Mars,
  phone: Phone,
  repeat: Repeat,
  search: Search,
  timer: Timer,
  trophy: Trophy,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconRegistry;

export function getIcon(name: IconName): LucideIcon {
  return iconRegistry[name];
}
