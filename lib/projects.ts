export type Project = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  tags: string[];
  live: string;
  github: string;
};

export const projects: Project[] = [
  {
    slug: "stayfinder",
    title: "StayFinder",
    description:
      "A property listing platform where users can browse, search, and list places to stay.",
    longDescription:
      "StayFinder is a full-stack platform that connects people looking for a place to stay with property owners. Users can explore listings, and owners can publish and manage their properties.",
    features: [
      "Browse and search property listings",
      "Add and manage your own listings",
      "REST API built with Node.js and Express",
      "MongoDB database for listings and users",
    ],
    tags: ["React", "Node.js", "Express", "MongoDB"],
    live: "https://stayfinder-2-14cs.onrender.com/listings/",
    github: "https://github.com/pramod12e/StayFinder",
  },
  {
    slug: "health-tech-telemedicine",
    title: "Health-Tech Telemedicine",
    description:
      "A telemedicine platform with real-time video consultations between doctors and patients.",
    longDescription:
      "A MERN stack platform that lets patients consult doctors remotely. Video calls run in real time using WebRTC, so consultations work directly in the browser.",
    features: [
      "Real-time video consultations with WebRTC",
      "Separate flows for doctors and patients",
      "REST APIs for appointments and users",
      "MongoDB for storing records",
    ],
    tags: ["MERN", "WebRTC", "REST APIs"],
    live: "https://health-tech-cimc.onrender.com",
    github: "https://github.com/Pramod12e/Health-Tech",
  },
  {
    slug: "admin-dashboard",
    title: "Admin Dashboard",
    description:
      "A dashboard and user management system with role-based access and clean data views.",
    longDescription:
      "An admin dashboard for managing users and viewing data in one place, with a clean interface and a backend that controls who can do what.",
    features: [
      "User management: create, edit, and delete users",
      "Role-based access control",
      "Clean tables and data views",
      "Backend API with SQL database",
    ],
    tags: ["React", "Node.js", "SQL"],
    live: "https://github.com/pramod12e",
    github: "https://github.com/pramod12e",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
