"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { trackEvent } from "@/lib/analytics";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface ContactChannel {
  id: "email" | "whatsapp" | "github" | "linkedin";
  label: string;
  display: string;
  href: string;
  external: boolean;
}

interface ContactData {
  chapter: string;
  headline: string;
  description: string;
  whatsapp: { display: string; href: string };
  github: { display: string; href: string };
  linkedin: { display: string; href: string };
  cv: string;
}

interface ContactContentProps {
  contact: ContactData;
  email: string;
  cvAvailable: boolean;
}

export default function ContactContent({
  contact,
  email,
  cvAvailable,
}: ContactContentProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [isCvOpen, setIsCvOpen] = useState(false);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const sectionEl = sectionRef.current;
    if (!sectionEl || !panelRef.current) return;

    if (prefersReducedMotion) {
      gsap.set(panelRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: panelRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        }
      );

      ScrollTrigger.sort();
    }, sectionEl);

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (!isCvOpen) return;

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const dialog = dialogRef.current;
    const getFocusable = () =>
      dialog
        ? Array.from(
            dialog.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'
            )
          )
        : [];

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsCvOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [isCvOpen]);

  const headlineWords = contact.headline.split(" ");

  const channels: ContactChannel[] = [
    {
      id: "email",
      label: "Email",
      display: email,
      href: `mailto:${email}?subject=Portfolio%20inquiry`,
      external: false,
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      display: contact.whatsapp.display,
      href: contact.whatsapp.href,
      external: true,
    },
    {
      id: "github",
      label: "GitHub",
      display: contact.github.display,
      href: contact.github.href,
      external: true,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      display: contact.linkedin.display,
      href: contact.linkedin.href,
      external: true,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      className="relative w-full border-t border-line px-[var(--page-pad)] py-20 sm:py-24 lg:py-32"
    >
      <div
        ref={panelRef}
        className="mx-auto w-full max-w-[80rem] overflow-hidden rounded-[2rem] bg-[#111c17] px-6 py-14 text-[#edf0ea] sm:px-10 sm:py-20 lg:px-16 lg:py-24"
      >
        <div className="mx-auto max-w-[46rem] text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#edf0ea]/55">
            {contact.chapter}
          </p>

          <h2
            id="contact-heading"
            className="mt-5 font-display text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.04] tracking-[-0.04em]"
          >
            {headlineWords.slice(0, 2).join(" ")}
            <br />
            {headlineWords.slice(2).join(" ")}
          </h2>

          <p className="mx-auto mt-5 max-w-[30rem] text-[15px] leading-relaxed text-[#edf0ea]/65">
            {contact.description}
          </p>

          <div className="mt-9 grid gap-3 text-left sm:grid-cols-2">
            <div className="rounded-2xl border border-white/12 p-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#e07a52]">
                Hiring
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-[#edf0ea]/65">
                Full-time remote roles and freelance projects.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {cvAvailable ? (
                  <a
                    href={contact.cv}
                    download
                    onClick={() =>
                      trackEvent("resume_click", {
                        source: "contact",
                        action: "download",
                      })
                    }
                    aria-label="Download Muhar Ferdiansyah CV as PDF"
                    className="btn-pill bg-[#edf0ea] text-[#111c17] transition-colors hover:bg-white"
                  >
                    Download CV
                  </a>
                ) : (
                  <a
                    href={`mailto:${email}?subject=Full-time%20role`}
                    onClick={() =>
                      trackEvent("contact_click", {
                        channel: "email",
                        location: "finale_hiring",
                      })
                    }
                    className="btn-pill bg-[#edf0ea] text-[#111c17] transition-colors hover:bg-white"
                  >
                    Email about a role
                  </a>
                )}
                {cvAvailable && (
                  <button
                    type="button"
                    onClick={() => {
                      trackEvent("resume_click", {
                        source: "contact",
                        action: "preview",
                      });
                      setIsCvOpen(true);
                    }}
                    aria-haspopup="dialog"
                    className="btn-pill border border-white/20 text-[#edf0ea] transition-colors hover:bg-white/10"
                  >
                    Preview
                  </button>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-white/12 p-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#e07a52]">
                Project
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-[#edf0ea]/65">
                An existing system, a new build, or extra hands for your team.
              </p>
              <a
                href={`mailto:${email}?subject=Project%20inquiry`}
                onClick={() =>
                  trackEvent("contact_click", {
                    channel: "email",
                    location: "finale_project",
                  })
                }
                className="btn-pill mt-4 border border-white/20 text-[#edf0ea] transition-colors hover:bg-white/10"
              >
                Describe the project
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-[54rem] border-t border-white/12">
          {channels.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              target={channel.external ? "_blank" : undefined}
              rel={channel.external ? "noopener noreferrer" : undefined}
              aria-label={
                channel.external
                  ? `${channel.label}: ${channel.display} (opens in a new tab)`
                  : `${channel.label}: ${channel.display}`
              }
              onClick={() => {
                if (channel.id === "email" || channel.id === "whatsapp") {
                  trackEvent("contact_click", {
                    channel: channel.id,
                    location: "contact",
                  });
                }

                if (channel.id === "github") {
                  trackEvent("github_click", { location: "contact" });
                }
              }}
              className="group grid grid-cols-12 items-baseline gap-2 border-b border-white/12 py-4 sm:gap-4 sm:py-5"
            >
              <span className="col-span-4 text-[11px] font-medium uppercase tracking-[0.16em] text-[#edf0ea]/50 transition-colors group-hover:text-[#edf0ea]/80 sm:col-span-3">
                {channel.label}
              </span>
              <span className="col-span-7 min-w-0 break-all text-[14px] font-medium text-[#edf0ea] sm:col-span-8 sm:text-[15px]">
                {channel.display}
              </span>
              <span className="col-span-1 flex justify-end">
                <span
                  className="text-[#edf0ea]/50 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#edf0ea]"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>

      {isCvOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="CV preview"
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
        >
          <button
            type="button"
            tabIndex={-1}
            aria-label="Close CV preview"
            onClick={() => setIsCvOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-[#111c17]/70 backdrop-blur-sm"
          />

          <div
            ref={dialogRef}
            className="relative z-10 flex h-full max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-line bg-[var(--background)] shadow-2xl shadow-black/30"
          >
            <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 sm:px-5">
              <div className="flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-muted">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
                  aria-hidden="true"
                />
                <span className="text-foreground">Muhar Ferdiansyah / CV</span>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href={contact.cv}
                  download
                  onClick={() =>
                    trackEvent("resume_click", {
                      source: "cv_modal",
                      action: "download",
                    })
                  }
                  className="hidden text-[11px] font-medium uppercase tracking-[0.16em] text-ink-muted transition-colors hover:text-foreground sm:inline"
                >
                  Download
                </a>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setIsCvOpen(false)}
                  aria-label="Close"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:border-foreground/40 hover:text-foreground"
                >
                  <span aria-hidden="true" className="text-sm leading-none">
                    ✕
                  </span>
                </button>
              </div>
            </div>

            <iframe
              src={contact.cv}
              title="Muhar Ferdiansyah CV"
              className="min-h-0 w-full flex-1 bg-white"
            />
          </div>
        </div>
      )}
    </section>
  );
}
