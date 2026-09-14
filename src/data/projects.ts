import type { Project } from "../types/project";

export const projects: Project[] = [
  {
    id: 1,
    title: "Dev Stack Builder",
    slug: "dev-stack-builder",
    description:
      "A web application for building and managing a personalized development stack.",
    image: "/projects/dev-stack-builder.png",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "DaisyUI",
    ],
    liveLink: "#",
    githubLink: "#",
    category: "Frontend",
    featured: true,
  },

  {
    id: 2,
    title: "Pricing Card",
    slug: "pricing-card",
    description:
      "A clean responsive pricing interface designed for modern web products.",
    image: "/projects/pricing-card.png",
    technologies: ["React", "Tailwind CSS"],
    liveLink: "#",
    githubLink: "#",
    category: "Frontend",
    featured: true,
  },

  {
    id: 3,
    title: "Login Page",
    slug: "login-page",
    description:
      "A modern responsive authentication interface with a clean user experience.",
    image: "/projects/login-page.png",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    liveLink: "#",
    githubLink: "#",
    category: "Frontend",
    featured: false,
  },
];