import { getIcon, type IconName } from "@/lib/icons";
import type { LucideProps } from "lucide-react";

interface IconProps extends Omit<LucideProps, "ref"> {
  name: IconName;
}

/**
 * Resolves a content-layer icon name to its Lucide component.
 * Keeps `src/content` free of component imports.
 */
export function Icon({ name, ...props }: IconProps) {
  const Component = getIcon(name);
  return <Component aria-hidden="true" {...props} />;
}
