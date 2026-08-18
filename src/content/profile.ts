import type { Profile } from "@/types/content";

/**
 * PLACEHOLDER CONTENT — carried over from the design kit.
 * Swap the bio, contact details and handles for the real ones before shipping.
 */
export const profile: Profile = {
  displayName: "Akshay Venu",
  flipSentences: ["Software Engineer.", "Open source tinkerer.", "Building with code."],
  timeZone: "Asia/Kolkata",
  timeZoneLabel: "IST",
  bio: [
    "I'm Akshay Venu (call me Akshay) — a Software Engineer with 5+ years of experience, known for pixel-perfect execution and an obsessive attention to detail.",
    "Passionate about exploring new technologies and turning ideas into reality through polished, thoughtfully crafted projects.",
    "Creator of **Devgrid** (placeholder metrics), **Flowline** and **Palette** — replace with real projects.",
  ],
  overview: [
    { icon: "code-xml", label: "Software Engineer @acmelabs", mono: true },
    { icon: "lightbulb", label: "Maintainer @flowline", mono: true },
    { icon: "map-pin", label: "Bengaluru, India", mono: true },
    { icon: "phone", label: "+91 90000 00000", mono: true },
    { icon: "link", label: "akshayvenu.com", mono: true, href: "https://akshayvenu.com" },
  ],
  overviewRight: [
    { icon: "clock", dynamic: "local-time", mono: true },
    {
      icon: "mail",
      label: "hello@akshayvenu.com",
      mono: true,
      href: "mailto:hello@akshayvenu.com",
    },
    { icon: "mars", label: "he/him", mono: true },
  ],
};
