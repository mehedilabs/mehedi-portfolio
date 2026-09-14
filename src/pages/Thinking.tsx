import PageLayout from "../components/PageLayout";

const thinkingSteps = [
  {
    number: "01",
    title: "Understand",
    description:
      "Before writing code, understand the problem, user and desired outcome.",
  },
  {
    number: "02",
    title: "Break it down",
    description:
      "Turn a large problem into smaller and manageable pieces.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Choose the simplest architecture that can solve the actual problem.",
  },
  {
    number: "04",
    title: "Improve",
    description:
      "Test, review and improve the product instead of treating the first version as final.",
  },
];

const Thinking = () => {
  return (
    <PageLayout>
      <section className="bg-gray-950 px-4 py-28 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            How I Think
          </p>

          <h1 className="mt-5 text-5xl font-bold leading-tight md:text-7xl">
            Good engineering is not about writing more code.
          </h1>

          <p className="mt-8 max-w-3xl text-xl leading-9 text-gray-400">
            It is about understanding the problem well enough to remove
            unnecessary complexity.
          </p>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2">
            {thinkingSteps.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-gray-200 p-8"
              >
                <span className="text-sm font-bold text-blue-600">
                  {step.number}
                </span>

                <h2 className="mt-4 text-2xl font-bold">{step.title}</h2>

                <p className="mt-4 leading-8 text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Thinking;