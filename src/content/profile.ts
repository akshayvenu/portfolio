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
    { icon: "code-xml", label: "AI & Backend Engineer @AIVision21", mono: true },
    { icon: "map-pin", label: "Mumbai, India", mono: true },
    { icon: "phone", label: "+91 9136839960", mono: true },
  ],
  overviewRight: [
    { icon: "clock", dynamic: "local-time", mono: true },
    {
      icon: "mail",
      label: "akshayvenugopal2002@gmail.com",
      mono: true,
      href: "mailto:akshayvenugopal2002@gmail.com",
    },
    { icon: "mars", label: "he/him", mono: true },
  ],
};
