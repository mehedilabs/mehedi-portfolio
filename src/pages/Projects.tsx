import PageLayout from "../components/PageLayout";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

const Projects = () => {
  return (
    <PageLayout>
      <section className="bg-gray-50 px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            My Work
          </p>

          <h1 className="mt-4 text-5xl font-bold md:text-6xl">
            Projects I’ve built.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Real projects that demonstrate how I approach design, frontend
            development and full-stack engineering.
          </p>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </PageLayout>
  );
};

export default Projects;