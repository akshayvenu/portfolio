# portfolio-akshay

Personal portfolio for **Akshay Venu** — a single-page, print-inspired site built as a
grid of hairline-framed panels.

Implemented from the `ui_kits/portfolio/index.html` kit in the
[Claude Design](https://claude.ai/design) design system project
`f4fb2265-9b18-45a4-bd05-d33f94b10ac2`.

|                           |                                                                         |
| ------------------------- | ----------------------------------------------------------------------- |
| Framework                 | Next.js 15 (App Router, React 19, Server Components)                    |
| Runtime & package manager | Bun                                                                     |
| Language                  | TypeScript (strict, `noUncheckedIndexedAccess`)                         |
| Styling                   | Tailwind CSS v4 + design-system CSS custom properties                   |
| Theming                   | `next-themes` (`class` strategy, system-aware)                          |
| Icons                     | `lucide-react`, plus inlined brand marks                                |
| Fonts                     | Geist, Geist Mono, IBM Plex Serif, Caveat — self-hosted via `next/font` |

---

## Getting started

```bash
bun install
cp .env.example .env.local   # then set NEXT_PUBLIC_SITE_URL
bun run dev                  # http://localhost:3000
```

### Scripts

| Command                           | What it does                                    |
| --------------------------------- | ----------------------------------------------- |
| `bun run dev`                     | Dev server with Fast Refresh                    |
| `bun run build`                   | Production build (fails on type or lint errors) |
| `bun run start`                   | Serve the production build                      |
| `bun run typecheck`               | `tsc --noEmit`                                  |
| `bun run lint` / `lint:fix`       | ESLint                                          |
| `bun run format` / `format:check` | Prettier (with Tailwind class sorting)          |
| `bun run check`                   | Typecheck + lint + format check — what CI runs  |

---

## Project structure

```
src/
├─ app/                    Route layer only — thin, no business logic
│  ├─ layout.tsx           Fonts, metadata, ThemeProvider
│  ├─ page.tsx             Composes the sections; Person JSON-LD
│  ├─ fonts.ts             next/font declarations
│  ├─ globals.css          Tailwind entry + theme bridge
│  ├─ icon.svg             Favicon
│  ├─ not-found.tsx  robots.ts  sitemap.ts
│
├─ components/
│  ├─ ui/                  Design-system primitives (Panel, Tag, Kbd, IconTile…)
│  │                       Presentational and content-agnostic.
│  ├─ layout/              Page chrome: header, footer, bands, theme, command menu
│  ├─ sections/            One file per page section
│  │  └─ shared/           Cross-section pieces (Period, Bullets, CollapsibleRow…)
│  └─ icons/               Icon resolver + inlined brand marks
│
├─ content/                ALL copy and data — the only files you edit routinely
├─ types/content.ts        The contract `content/` must satisfy
├─ lib/                    Pure helpers (cn, datetime, contributions, icon registry)
├─ hooks/                  useInterval, useMounted
└─ styles/tokens/          Design tokens: colors, typography, spacing, derived, effects
```

The dependency rule is one-directional: **`app` → `components` → `lib`/`content`/`types`.**
Nothing in `components/ui` imports content; nothing in `content` imports a component.

---

## Editing the site

### Content

Everything visible lives in `src/content/`, typed against `src/types/content.ts`:

| File                                                                   | Contents                                                      |
| ---------------------------------------------------------------------- | ------------------------------------------------------------- |
| `site.ts`                                                              | Site name, description, canonical URL, nav items, GitHub link |
| `profile.ts`                                                           | Name, taglines, bio, timezone, the overview grid              |
| `social.ts`                                                            | Social links                                                  |
| `stack.ts`                                                             | Tech-stack groups                                             |
| `experience.ts` · `education.ts` · `projects.ts` · `certifications.ts` | Timeline data                                                 |
| `contributions.ts`                                                     | Contribution mosaic + its caption                             |

Because it is plain serialisable data, swapping `content/` for a CMS or MDX loader
later requires no component changes.

Two conventions worth knowing:

- In `profile.bio`, `**text**` renders as emphasised, underlined text. It is parsed
  into real React nodes (`components/sections/shared/rich-text.tsx`) — never
  `dangerouslySetInnerHTML` — so content cannot inject markup.
- A `href` of `"#"` is treated as "no link yet": projects and certifications render
  the affordance without an anchor rather than shipping a dead link. Replace `"#"`
  with a real URL to activate it.

### Design tokens

`src/styles/tokens/` is a direct port of the design system. `globals.css` bridges it
into Tailwind's `--color-*` namespace, so `bg-background`, `border-line` and
`text-muted-foreground` all resolve to the same variables the kit defines — and dark
mode works with no per-utility overrides.

Names that already sit in a Tailwind v4 theme namespace (`--font-*`, `--text-*`,
`--radius-*`, `--shadow-*`, `--ease-*`) are declared inside `@theme` blocks rather
than `:root`, which keeps one source of truth and avoids a circular `var()`.

`tokens/derived.css` names the multi-argument `color-mix()` expressions the kit
inlined at each call site (`--tile-ring`, `--bullet`, `--contribution-3`, …).

---

## Placeholder content

The design kit shipped with sample data, which is carried over verbatim and marked
`PLACEHOLDER CONTENT` in each file. Replace before deploying:

- Bio, phone number, email and handles in `content/profile.ts` and `content/social.ts`
- Companies, schools, projects and certifications, plus their `"#"` links
- `content/contributions.ts` — a seeded pseudo-random mosaic, not real GitHub data.
  `lib/contributions.ts` documents the shape the GitHub GraphQL
  `contributionsCollection` query needs to return.
- `public/images/figure-mark.jpeg` — the decorative masthead figure
- `siteConfig.githubStars` in `content/site.ts` is a static string

---

## Notes on a few decisions

**Server Components by default.** Only components that need state or browser APIs
carry `"use client"`: the theme toggle, command menu, collapsible rows, the rotating
tagline, the live clock and the contribution tooltip. Everything else renders on the
server.

**Hydration.** Time-dependent output is handled explicitly rather than papered over.
The greeting renders in the profile's timezone on the server — the same value the
client computes on its first pass — then re-derives from the visitor's real timezone
after mount, so hydration stays clean and the greeting stays true.

**Command menu.** The kit shows a `Ctrl K` affordance, so it is wired to a working
quick-nav built on the native `<dialog>` element: focus trapping, the backdrop and
Escape-to-close come from the platform rather than another dependency.

**Accessibility.** Panels that the design leaves visually unlabelled carry screen-reader
headings; collapsible rows expose `aria-expanded`; the mosaic has a text summary;
`prefers-reduced-motion` disables animation and smooth scrolling.

---

## Deploying

Any Node or Bun host works; Vercel needs no configuration beyond setting
`NEXT_PUBLIC_SITE_URL` so canonical URLs, Open Graph tags, `sitemap.xml` and
`robots.txt` point at the real origin.

```bash
bun run build && bun run start
```
