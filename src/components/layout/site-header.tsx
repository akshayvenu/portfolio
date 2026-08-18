import Link from "next/link";
import { GitHubIcon } from "@/components/icons";
import { Separator } from "@/components/ui";
import { navItems, siteConfig } from "@/content";
import { CommandMenu } from "./command-menu";
import { ThemeToggle } from "./theme-toggle";

/**
 * Sticky header. Note the deliberately asymmetric frame from the design kit:
 * a hairline top and right rule in `--line`, a heavier bottom rule in
 * `--border`, and no left rule — so the header reads as the opening cell of the
 * page's panel grid rather than a closed box.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 overflow-x-clip bg-background px-2">
      <div className="mx-auto flex h-[var(--header-height)] w-full max-w-[var(--content-max-width)] items-center gap-4 border-t border-r border-b border-t-line border-r-line border-b-border pr-2">
        <Link
          href="/"
          aria-label="Home"
          className="flex h-8 items-center pl-3 text-xl font-semibold tracking-[-0.03em] text-foreground no-underline"
        >
          {siteConfig.name}
        </Link>

        <div className="flex-1" />

        <nav aria-label="Sections" className="hidden gap-5 text-[0.875rem] font-medium md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-muted-foreground no-underline transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Separator className="hidden h-5 md:block" />

        <CommandMenu />

        <Separator className="hidden h-5 sm:block" />

        <a
          href={siteConfig.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-1.5 text-[0.875rem] text-muted-foreground no-underline transition-colors hover:text-foreground sm:inline-flex"
        >
          <GitHubIcon width={16} height={16} className="block" />
          <span className="tabular-nums">{siteConfig.githubStars}</span>
          <span className="sr-only">GitHub stars</span>
        </a>

        <Separator className="h-5" />

        <ThemeToggle />
      </div>
    </header>
  );
}
