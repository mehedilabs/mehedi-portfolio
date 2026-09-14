import PageLayout from "../components/PageLayout";
import { skills } from "../data/skills";

const Skills = () => {
  return (
    <PageLayout>
      <section className="bg-gray-50 px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Skills
          </p>

          <h1 className="mt-4 text-5xl font-bold md:text-6xl">
            The tools I use to build.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            I choose technologies based on the problem, the product and the
            long-term maintainability of the solution.
          </p>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl space-y-16">
          {skills.map((group) => (
            <div key={group.category}>
              <h2 className="text-2xl font-bold">{group.category}</h2>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {group.items.map((skill) => (
                  <div
                    key={skill.name}
                    className="rounded-2xl border border-gray-200 p-6"
                  >
                    <h3 className="text-xl font-bold">{skill.name}</h3>

                    <p className="mt-3 leading-7 text-gray-600">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
};

export default Skills;