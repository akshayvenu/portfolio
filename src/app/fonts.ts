import { Caveat, Geist, Geist_Mono, IBM_Plex_Serif } from "next/font/google";

/**
 * Self-hosted via `next/font` — the files are fetched at build time and served
 * from our own origin, so there is no CDN round-trip and no layout shift.
 * Each font exposes a CSS variable consumed by `styles/tokens/typography.css`.
 */

export const geistSans = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const plexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-plex-serif",
  display: "swap",
});

export const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-caveat",
  display: "swap",
});

export const fontVariables = [
  geistSans.variable,
  geistMono.variable,
  plexSerif.variable,
  caveat.variable,
].join(" ");
