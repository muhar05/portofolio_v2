export default function Works() {
  return (
    <section
      id="works"
      className="border-b border-zinc-900 bg-[#08080a] px-6 py-28 text-zinc-100"
    >
      <div className="mx-auto w-full max-w-3xl">
        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-zinc-500">
          Works — Archive
        </p>
        <h2 className="text-3xl font-medium tracking-tight text-zinc-100 sm:text-4xl">
          Works
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-zinc-400">
          Selected systems, experiments, and digital projects.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md border border-zinc-800/80 bg-zinc-900/40 p-6">
            <p className="text-xs uppercase tracking-widest text-zinc-500">01</p>
            <p className="mt-2 text-sm font-medium text-zinc-300">System Architecture</p>
          </div>
          <div className="rounded-md border border-zinc-800/80 bg-zinc-900/40 p-6">
            <p className="text-xs uppercase tracking-widest text-zinc-500">02</p>
            <p className="mt-2 text-sm font-medium text-zinc-300">Generative Space</p>
          </div>
          <div className="rounded-md border border-zinc-800/80 bg-zinc-900/40 p-6">
            <p className="text-xs uppercase tracking-widest text-zinc-500">03</p>
            <p className="mt-2 text-sm font-medium text-zinc-300">Interactive Display</p>
          </div>
          <div className="rounded-md border border-zinc-800/80 bg-zinc-900/40 p-6">
            <p className="text-xs uppercase tracking-widest text-zinc-500">04</p>
            <p className="mt-2 text-sm font-medium text-zinc-300">Algorithmic Chaos</p>
          </div>
        </div>
      </div>
    </section>
  );
}
