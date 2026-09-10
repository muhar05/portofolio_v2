export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-[#08080a] px-6 py-28 text-zinc-100"
    >
      <div className="mx-auto w-full max-w-3xl">
        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-zinc-500">
          Contact
        </p>
        <h2 className="text-3xl font-medium tracking-tight text-zinc-100 sm:text-4xl">
          Contact
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-zinc-400">
          Available for select projects and collaborations.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <span className="rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-zinc-300">
            muhar@example.com
          </span>
        </div>
      </div>
    </section>
  );
}
