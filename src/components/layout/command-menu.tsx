"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { Icon } from "@/components/icons";
import { Kbd, KbdGroup } from "@/components/ui";
import { navItems, socialLinks } from "@/content";
import { cn } from "@/lib/utils";

interface CommandEntry {
  id: string;
  label: string;
  group: "Sections" | "Links";
  href: string;
  external: boolean;
}

/**
 * Ctrl/Cmd-K quick navigation.
 *
 * Built on the native `<dialog>` element so focus trapping, the backdrop and
 * Escape-to-close come from the platform rather than another dependency.
 */
export function CommandMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  /** Selector to scroll to once the dialog has finished closing. */
  const pendingTargetRef = useRef<string | null>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const entries = useMemo<CommandEntry[]>(
    () => [
      ...navItems.map((item) => ({
        id: `section:${item.href}`,
        label: item.label,
        group: "Sections" as const,
        href: item.href,
        external: false,
      })),
      ...socialLinks.map((link) => ({
        id: `link:${link.platform}`,
        label: `${link.title} — ${link.handle}`,
        group: "Links" as const,
        href: link.href,
        external: true,
      })),
    ],
    [],
  );

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return entries;
    return entries.filter((entry) => entry.label.toLowerCase().includes(needle));
  }, [entries, query]);

  const close = useCallback(() => dialogRef.current?.close(), []);

  const open = useCallback(() => {
    setQuery("");
    setActiveIndex(0);
    dialogRef.current?.showModal();
  }, []);

  // Global shortcut.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() !== "k" || !(event.metaKey || event.ctrlKey)) return;
      event.preventDefault();
      if (dialogRef.current?.open) close();
      else open();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [close, open]);

  const select = useCallback(
    (entry: CommandEntry | undefined) => {
      if (!entry) return;

      // External links must open inside the user gesture or the popup blocker
      // eats them; in-page scrolls are deferred to `onClose` instead, because
      // the dialog's focus restoration cancels a smooth scroll started here.
      if (entry.external) {
        window.open(entry.href, "_blank", "noopener,noreferrer");
      } else {
        pendingTargetRef.current = entry.href;
      }
      close();
    },
    [close],
  );

  function onDialogClose() {
    setQuery("");

    const target = pendingTargetRef.current;
    pendingTargetRef.current = null;
    if (!target) return;

    // One frame later the dialog has released focus and the scroll sticks.
    requestAnimationFrame(() => {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function onListKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (results.length ? (index + 1) % results.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) =>
        results.length ? (index - 1 + results.length) % results.length : 0,
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      select(results[activeIndex]);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label="Search"
        className="hidden h-7 cursor-pointer items-center gap-1.5 rounded-md border-none bg-transparent px-1.5 text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
      >
        <Icon name="search" size={16} />
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Quick navigation"
        onClose={onDialogClose}
        onClick={(event) => {
          // Clicks that land on the dialog element itself are backdrop clicks.
          if (event.target === dialogRef.current) close();
        }}
        className="m-auto w-[min(30rem,calc(100vw-2rem))] rounded-xl border border-border bg-popover p-0 text-popover-foreground shadow-lg backdrop:bg-black/40 backdrop:backdrop-blur-[2px]"
      >
        <div onKeyDown={onListKeyDown}>
          <div className="flex items-center gap-2 border-b border-line px-4">
            <Icon name="search" size={16} className="shrink-0 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(0);
              }}
              placeholder="Jump to a section or link…"
              aria-label="Search sections and links"
              role="combobox"
              aria-expanded="true"
              aria-controls="command-menu-results"
              className="h-12 w-full border-none bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>

          <ul id="command-menu-results" role="listbox" className="max-h-80 overflow-y-auto p-2">
            {results.length === 0 && (
              <li className="px-3 py-6 text-center text-sm text-muted-foreground">
                Nothing matches “{query}”.
              </li>
            )}
            {results.map((entry, index) => (
              <li key={entry.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={index === activeIndex}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => select(entry)}
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border-none bg-transparent px-3 py-2 text-left text-sm transition-colors",
                    index === activeIndex ? "bg-accent text-accent-foreground" : "text-foreground",
                  )}
                >
                  <span>{entry.label}</span>
                  <span className="font-mono text-xs text-muted-foreground">{entry.group}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  );
}
