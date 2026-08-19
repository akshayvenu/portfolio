import type { Profile } from "@/types/content";

/**
 * PLACEHOLDER CONTENT — carried over from the design kit.
 * Swap the bio, contact details and handles for the real ones before shipping.
 */
export const profile: Profile = {
  displayName: "Akshay Venu",
  avatarUrl: "/images/asta.jpg",
  flipSentences: ["Software Engineer.", "Open source tinkerer.", "Building with code."],
  timeZone: "Asia/Kolkata",
  timeZoneLabel: "IST",
  bio: [
    "AI Backend Engineer passionate about building scalable backend systems and Generative AI applications. Experienced with Python, FastAPI, LLMs, LangChain, LangGraph, Google Gemini, Vertex AI, MongoDB, Docker, and GCP.",
    "I enjoy building products from the ground up, solving real-world problems, and working in small, high-impact teams where ownership is high and the focus is on tackling meaningful challenges. Always eager to learn, build, and contribute to products that make a difference.",
  ],
  overview: [
    { icon: "code-xml", label: "AI & Backend Engineer @AIVision21", mono: true },
    { icon: "map-pin", label: "Mumbai, India", mono: true },
    { icon: "phone", label: "+91 9136839960", mono: true, copy: "+919136839960" },
  ],
  overviewRight: [
    { icon: "clock", dynamic: "local-time", mono: true },
    {
      icon: "mail",
      label: "akshayvenugopal2002@gmail.com",
      mono: true,
      copy: "akshayvenugopal2002@gmail.com",
    },
    { icon: "mars", label: "he/him", mono: true },
  ],
};
