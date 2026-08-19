import type { Company } from "@/types/content";

export const experience: readonly Company[] = [
  {
    company: "AIVision21",
    location: "South Mumbai, Maharashtra, India (On-site)",
    current: true,
    roles: [
      {
        title: "AI & Backend Developer",
        employmentType: "Full-time",
        start: "02.2026",
        end: "08.2026",
        duration: "7m",
        expanded: true,
        description: [
          "Owned the Blue Collar Interviewer platform from POC to Production, building backend systems for interview workflows, evaluation logic, and admin modules.",
          "Reduced interview processing time from 15s to 2–5s by optimizing backend pipelines and integrating Bulbul V3 (TTS) and Saras V3 (STT).",
          "Built scalable FastAPI and MongoDB backend services for interview platforms, billing systems, authentication modules, and admin dashboards.",
          "Implemented CI/CD pipelines using Google Cloud Build, Cloud Run, deployment triggers, and substitution variables to automate releases.",
          "Integrated Razorpay payment gateway and developed a wallet system supporting credits, transaction history, and payment workflows.",
        ],
        skills: [
          "Python",
          "FastAPI",
          "MongoDB",
          "Google Cloud Platform (GCP)",
          "Cloud Run",
          "Cloud Build",
          "Docker",
          "LangChain",
          "LangGraph",
          "Google Gemini",
          "Vertex AI",
          "Razorpay",
        ],
      },
    ],
  },
];
