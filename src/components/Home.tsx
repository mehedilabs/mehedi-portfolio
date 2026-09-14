import PageLayout from "../components/PageLayout";

const Home = () => {
  return (
    <PageLayout>
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
      </section>
    </PageLayout>
  );
};

export default Home;