import PageLayout from "../components/PageLayout";

const About = () => {
  return (
    <PageLayout>
      <section className="bg-gray-50 px-4 py-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            About Me
          </p>

          <h1 className="mt-4 text-5xl font-bold md:text-6xl">
            More than a developer.
          </h1>

          <p className="mt-8 text-xl leading-9 text-gray-600">
            I’m Mehedi Hasan, a full-stack developer focused on turning ideas
            into useful digital products.
          </p>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Who I Am
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              I care about the product, not just the code.
            </h2>
          </div>

          <div className="space-y-5 leading-8 text-gray-600">
            <p>
              I enjoy taking an idea, understanding the problem behind it and
              turning it into a clear and useful digital experience.
            </p>

            <p>
              My approach combines frontend development, backend engineering
              and product thinking.
            </p>

            <p>
              I believe good software should be understandable, maintainable
              and genuinely useful to the people using it.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-950 px-4 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-widest text-blue-400">
            My Principles
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div>
              <span className="text-4xl font-bold">01</span>
              <h3 className="mt-4 text-xl font-bold">Think clearly</h3>
              <p className="mt-3 text-gray-400">
                Understand the problem before writing the solution.
              </p>
            </div>

            <div>
              <span className="text-4xl font-bold">02</span>
              <h3 className="mt-4 text-xl font-bold">Build simply</h3>
              <p className="mt-3 text-gray-400">
                Avoid unnecessary complexity when a simple solution works.
              </p>
            </div>

            <div>
              <span className="text-4xl font-bold">03</span>
              <h3 className="mt-4 text-xl font-bold">Improve continuously</h3>
              <p className="mt-3 text-gray-400">
                Every project is an opportunity to become better.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;