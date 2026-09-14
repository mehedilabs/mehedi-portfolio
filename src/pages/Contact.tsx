import PageLayout from "../components/PageLayout";

const Contact = () => {
  return (
    <PageLayout>
      <section className="bg-gray-950 px-4 py-28 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            Contact
          </p>

          <h1 className="mt-5 text-5xl font-bold md:text-7xl">
            Have a problem worth solving?
          </h1>

          <p className="mt-8 text-xl leading-9 text-gray-400">
            Tell me about it. I’m always interested in meaningful products,
            interesting problems and good ideas.
          </p>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <form className="space-y-6">
            <div>
              <label className="mb-2 block font-medium">Name</label>

              <input
                type="text"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">Email</label>

              <input
                type="email"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">Message</label>

              <textarea
                rows={6}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                placeholder="Tell me about your idea..."
              />
            </div>

            <button
              type="submit"
              className="rounded-full bg-gray-900 px-7 py-3 font-medium text-white"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;