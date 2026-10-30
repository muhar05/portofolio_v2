import siteData from "@/content/site.json";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="w-full border-t border-line px-[var(--page-pad)] pb-4 pt-14">
      <div className="mx-auto w-full max-w-[90rem]">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <p className="flex items-center gap-2.5 font-display text-2xl font-semibold tracking-[-0.03em] text-foreground">
              <Logo className="h-7 w-7" />
              <span>muhar</span>
            </p>
            <p className="mt-2 max-w-[26rem] text-[14px] leading-relaxed text-ink-muted">
              {siteData.statement}
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-12 gap-y-2.5 text-[13px] font-medium"
          >
            <a
              href="#selected-work"
              className="block py-1 text-ink-muted transition-colors hover:text-foreground"
            >
              Work
            </a>
            <a
              href="#stack"
              className="block py-1 text-ink-muted transition-colors hover:text-foreground"
            >
              Stack
            </a>
            <a
              href="#about"
              className="block py-1 text-ink-muted transition-colors hover:text-foreground"
            >
              About
            </a>
            <a
              href="#contact"
              className="block py-1 text-ink-muted transition-colors hover:text-foreground"
            >
              Contact
            </a>
            <a
              href={siteData.contact.github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-1 text-ink-muted transition-colors hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href={`mailto:${siteData.email}`}
              className="block py-1 text-ink-muted transition-colors hover:text-foreground"
            >
              Email
            </a>
            <a
              href="#hero"
              className="col-span-2 mt-1 block py-1 text-ink-muted transition-colors hover:text-foreground"
            >
              Back to top ↑
            </a>
          </nav>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-2 border-t border-line pt-5 text-[11px] text-ink-muted sm:flex-row sm:items-center">
          <p>© 2026 Muhar Ferdiansyah</p>
          <p>Jakarta, Indonesia (UTC+7)</p>
        </div>

        <div className="mt-10 overflow-hidden" aria-hidden="true">
          <p className="footer-wordmark select-none font-display text-[clamp(4.5rem,18vw,16rem)] font-semibold leading-[0.78] tracking-[-0.055em]">
            MUHAR<span className="footer-wordmark__dot">.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
