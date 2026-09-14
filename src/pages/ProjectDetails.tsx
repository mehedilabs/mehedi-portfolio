import { Link, useParams } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import { projects } from "../data/projects";

const ProjectDetails = () => {
  const { slug } = useParams();

  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <PageLayout>
        <section className="px-4 py-32 text-center">
          <h1 className="text-4xl font-bold">Project not found</h1>

          <Link
            to="/projects"
            className="mt-6 inline-block rounded-full bg-gray-900 px-6 py-3 text-white"
          >
            Back to Projects
          </Link>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <section className="bg-gray-950 px-4 py-24 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm uppercase tracking-widest text-blue-400">
            {project.category}
          </p>

          <h1 className="mt-4 text-5xl font-bold md:text-7xl">
            {project.title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-400">
            {project.description}
          </p>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full rounded-3xl border border-gray-200"
          />

          <div className="mt-16 grid gap-12 md:grid-cols-3">
            <div>
              <h2 className="text-xl font-bold">Why I built it</h2>

              <p className="mt-4 leading-8 text-gray-600">
                This project was built to solve a practical problem while
                creating a clear and useful user experience.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold">What I focused on</h2>

              <p className="mt-4 leading-8 text-gray-600">
                I focused on reusable components, responsive design,
                maintainable code and a simple user experience.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold">Technology</h2>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap gap-4">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-gray-900 px-6 py-3 font-medium text-white"
            >
              Live Website
            </a>

            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-gray-300 px-6 py-3 font-medium"
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ProjectDetails;