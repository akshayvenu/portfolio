"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { pageTabs } from "@/content";
import { cn } from "@/lib/utils";

/**
 * The header's two-up switch between the professional page and the training
 * page.
 *
 * Rendered as a hairline-framed segmented control rather than two more nav
 * links, because these are *modes* of the site, not sections of a page — the
 * sliding active pill makes that hierarchy legible at a glance.
 */
export function PageSwitch({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Site mode"
      className={cn(
        "flex items-center gap-0.5 rounded-full border border-line bg-surface p-0.5",
        className,
      )}
    >
      {pageTabs.map((tab) => {
        const active = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);

        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-full px-3 py-1 text-[0.8125rem] font-medium whitespace-nowrap no-underline transition-colors duration-[var(--duration-fast)]",
              active
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}

/** Section links for whichever page is currently open. */
export function SectionNav({ className }: { className?: string }) {
  const pathname = usePathname();
  const tab = pageTabs.find((entry) =>
    entry.href === "/" ? pathname === "/" : pathname.startsWith(entry.href),
  );

  if (!tab) return null;

  return (
    <nav aria-label="Sections" className={cn("gap-5 text-[0.875rem] font-medium", className)}>
      {tab.sections.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="text-muted-foreground no-underline transition-colors hover:text-foreground"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
