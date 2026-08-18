import type { EducationEntry } from "@/types/content";

/** PLACEHOLDER CONTENT — replace with real institutions. */
export const education: readonly EducationEntry[] = [
  {
    school: "Indian Institute of Technology",
    start: "08.2015",
    end: "06.2019",
    degree: "Bachelor's degree",
    field: "Computer Science",
    description: [
      "Coursework across systems design, distributed systems and advanced databases.",
      "Final-year project: a distributed job scheduler with at-least-once delivery.",
    ],
    skills: ["C++", "Java", "Python", "DSA", "Systems Design", "Distributed Systems"],
  },
  {
    school: "Placeholder Higher Secondary School",
    start: "06.2013",
    end: "05.2015",
    degree: null,
    field: "Computer Science",
    description: null,
    skills: ["Algorithms", "C++", "MySQL", "PHP"],
  },
];
