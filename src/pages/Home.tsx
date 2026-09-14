import PageLayout from "../components/PageLayout";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

const Home = () => {
  return (
    <PageLayout>

      {/* ==================== Hero Section ==================== */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 md:grid-cols-2">
          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-blue-600">
              Mehedi Hasan · Full-Stack Developer
            </p>

            <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-7xl">
              I build digital products{" "}
              <span className="gradient-text">people want to use.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              From interface to backend, I care about building products that
              feel simple, useful and intentional.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#featured-projects"
                className="rounded-full bg-gray-900 px-6 py-3 font-medium text-white"
              >
                See My Work
              </a>

              <a
                href="/about"
                className="rounded-full border border-gray-300 px-6 py-3 font-medium"
              >
                Get to Know Me
              </a>
            </div>
          </div>

          <div className="rounded-3xl bg-gray-100 p-8">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Currently building</p>

              <h2 className="mt-3 text-2xl font-bold">
                Useful digital experiences.
              </h2>

              <div className="mt-6 flex flex-wrap gap-2">
                {["React", "TypeScript", "Node.js", "MongoDB"].map(
                  (technology) => (
                    <span
                      key={technology}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm"
                    >
                      {technology}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== Philosophy Section ==================== */}
      <section className="border-y border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-10 text-center">
          <p className="text-xl font-semibold md:text-2xl">
            Anyone can make a website work.
            <span className="text-gray-500">
              {" "}
              I care about making it worth using.
            </span>
          </p>
        </div>
      </section>

      {/* ==================== Featured Projects Section ==================== */}
      <section id="featured-projects" className="px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Selected Work
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Things I’ve actually built.
          </h2>

          <p className="mt-4 max-w-2xl text-gray-600">
            A selection of projects where I turned ideas into working digital
            products.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {projects
            .filter((project) => project.featured)
            .map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
        </div>
      </section>

      {/* ==================== Skills Preview Section ==================== */}
      <section className="bg-gray-50 px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            My Stack
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Tools I use to build.
          </h2>

          <div className="mt-8 flex flex-wrap gap-3">
            {[
              "React",
              "TypeScript",
              "JavaScript",
              "Tailwind CSS",
              "Node.js",
              "Express.js",
              "MongoDB",
            ].map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-gray-200 bg-white px-4 py-2"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== Thinking Preview Section ==================== */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            How I Think
          </p>

          <h2 className="mt-4 text-4xl font-bold">
            Good engineering is about removing unnecessary complexity.
          </h2>

          <a
            href="/thinking"
            className="mt-8 inline-block rounded-full bg-gray-900 px-6 py-3 text-white"
          >
            Explore My Thinking
          </a>
        </div>
      </section>

      {/* ==================== Contact CTA Section ==================== */}
      <section className="bg-blue-600 px-4 py-24 text-white">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl font-bold md:text-5xl">
            Have a problem worth solving?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-blue-100">
            Let's talk about your idea and see what we can build together.
          </p>

          <a
            href="/contact"
            className="mt-8 inline-block rounded-full bg-white px-7 py-3 font-medium text-gray-900"
          >
            Get in Touch
          </a>
        </div>
      </section>

    </PageLayout>
  );
};

export default Home;