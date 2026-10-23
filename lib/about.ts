export type SkillGroup = {
  title: string;
  items: string[];
};

export const aboutLinks = {
  github: "https://github.com/pramod12e",
  // Add your personal profile URL when ready.
  linkedin: "",
  // Add your public contact email when ready.
  email: "",
};

export const educationEntries = [
  {
    level: "Undergraduate",
    program: "B.Tech in Computer Science Engineering",
    institution: "Government College of Engineering, Keonjhar",
    period: "Expected graduation 2028",
  },
  {
    level: "Higher Secondary",
    program: "Add your qualification or stream",
    institution: "Add your school or college name",
    period: "Add years attended",
  },
  {
    level: "Secondary",
    program: "Add your qualification",
    institution: "Add your school name",
    period: "Add years attended",
  },
];

export const certificationEntries = Array.from({ length: 6 }, (_, index) => ({
  number: String(index + 1).padStart(2, "0"),
  title: "Add Coursera certificate title",
  issuer: "Coursera",
  detail: "Add the course name, completion date, and certificate link.",
}));

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    items: ["Java", "C", "JavaScript"],
  },
  {
    title: "Frontend",
    items: ["HTML", "CSS", "React.js"],
  },
  {
    title: "Backend & Database",
    items: ["Node.js", "Express.js", "REST APIs", "MongoDB", "MySQL"],
  },
  {
    title: "Tools",
    items: ["Codex", "Claude", "DeepSeek", "Git", "GitHub", "WebRTC"],
  },
  {
    title: "Currently learning",
    items: ["TypeScript", "Next.js", "Tailwind CSS", "MDX"],
  },
];
