export type SkillGroup = {
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    items: ["JavaScript", "Java", "C", "SQL", "HTML", "CSS"],
  },
  {
    title: "Frontend",
    items: ["React.js"],
  },
  {
    title: "Backend & Database",
    items: ["Node.js", "Express.js", "REST APIs", "MongoDB"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "WebRTC"],
  },
  {
    title: "Currently learning",
    items: ["TypeScript", "Next.js", "Tailwind CSS", "MDX"],
  },
];