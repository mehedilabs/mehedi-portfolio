import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { Link } from "react-router-dom";

import type { Project } from "../types/project";

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <article className="overflow-hidden rounded-3xl border border-gray-200 bg-white">
      <div className="aspect-video overflow-hidden bg-gray-100">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-6">
        <p className="text-sm font-medium text-blue-600">
          {project.category}
        </p>

        <h2 className="mt-2 text-2xl font-bold">{project.title}</h2>

        <p className="mt-3 leading-7 text-gray-600">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium"
            >
              {technology}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-4">
          <Link
            to={`/projects/${project.slug}`}
            className="flex items-center gap-2 font-medium hover:text-blue-600"
          >
            View Project
            <FiArrowUpRight />
          </Link>

          <a
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-gray-600 hover:text-black"
          >
            <FiGithub />
            GitHub
          </a>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;