export type Project = {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  technologies: string[];
  liveLink: string;
  githubLink: string;
  category: string;
  featured: boolean;
};