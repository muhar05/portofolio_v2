import siteData from "@/content/site.json";

export default function Footer() {
  return (
    <footer className="w-full bg-[#08080a] text-zinc-100 px-6 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-12">
      <div className="mx-auto w-full max-w-5xl flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <p className="font-sans text-lg font-bold tracking-tight text-white uppercase">
            {siteData.name}
          </p>
          <p className="mt-1 font-sans text-sm text-zinc-400">
            {siteData.statement}
          </p>
        </div>

        <div className="flex flex-col sm:items-end gap-3">
          <nav aria-label="Footer" className="flex items-center gap-5 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">
            <a href="#selected-work" className="hover:text-white transition-colors">
              Work
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </nav>
          <p className="font-mono text-[11px] text-zinc-600">
            © 2026 Muhar Ferdiansyah
          </p>
        </div>
      </div>
    </footer>
  );
}
