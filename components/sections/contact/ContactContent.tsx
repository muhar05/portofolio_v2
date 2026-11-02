"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { trackEvent } from "@/lib/analytics";
import {
  EmailAction,
  WhatsAppAction,
} from "@/components/ui/ContactActions";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface ContactChannel {
  id: "email" | "whatsapp" | "github" | "linkedin";
  label: string;
  display: string;
  action: "email" | "whatsapp" | "link";
  href?: string;
  external: boolean;
}

interface ContactData {
  chapter: string;
  headline: string;
  description: string;
  github: { display: string; href: string };
  linkedin: { display: string; href: string };
  cv: string;
}

interface ContactContentProps {
  contact: ContactData;
  cvAvailable: boolean;
}

export default function ContactContent({
  contact,
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
      display: "Send a message",
      action: "email",
      external: false,
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      display: "Message on WhatsApp",
      action: "whatsapp",
      external: true,
    },
    {
      id: "github",
      label: "GitHub",
      display: contact.github.display,
      href: contact.github.href,
      action: "link",
      external: true,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      display: contact.linkedin.display,
      href: contact.linkedin.href,
      action: "link",
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
        inert={isCvOpen}
        aria-hidden={isCvOpen ? true : undefined}
        className="mx-auto w-full max-w-[80rem] overflow-hidden rounded-[2rem] bg-[var(--panel)] px-6 py-14 text-[var(--panel-foreground)] sm:px-10 sm:py-20 lg:px-16 lg:py-24"
      >
        <div className="mx-auto max-w-[46rem] text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--panel-muted)]">
            {contact.chapter}
          </p>

          <h2
            id="contact-heading"
            aria-label={contact.headline}
            className="mt-5 font-display text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.04] tracking-[-0.04em]"
          >
            {headlineWords.slice(0, 2).join(" ")}
            <br />
            {headlineWords.slice(2).join(" ")}
          </h2>

          <p className="mx-auto mt-5 max-w-[30rem] text-[15px] leading-relaxed text-[var(--panel-muted)]">
            {contact.description}
          </p>

          <div className="mt-9 grid gap-3 text-left sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--panel-line)] p-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--panel-accent)]">
                Hiring
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--panel-muted)]">
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
                    className="btn-pill bg-[var(--panel-foreground)] text-[var(--panel)] transition-colors hover:bg-white"
                  >
                    Download CV
                  </a>
                ) : (
                  <EmailAction
                    subject="Full-time role"
                    location="finale_hiring"
                    ariaLabel="Email about a role"
                    className="btn-pill bg-[var(--panel-foreground)] text-[var(--panel)] transition-colors hover:bg-white"
                  >
                    Email about a role
                  </EmailAction>
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
                    className="btn-pill border border-[var(--panel-line-strong)] text-[var(--panel-foreground)] transition-colors hover:bg-white/10"
                  >
                    Preview
                  </button>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--panel-line)] p-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--panel-accent)]">
                Project
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--panel-muted)]">
                An existing system, a new build, or extra hands for your team.
              </p>
              <EmailAction
                subject="Project inquiry"
                location="finale_project"
                ariaLabel="Describe the project by email"
                className="btn-pill mt-4 border border-[var(--panel-line-strong)] text-[var(--panel-foreground)] transition-colors hover:bg-white/10"
              >
                Describe the project
              </EmailAction>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-[54rem] border-t border-[var(--panel-line)]">
          {channels.map((channel) => {
            const rowClassName =
              "group grid w-full grid-cols-12 items-baseline gap-2 border-b border-[var(--panel-line)] py-4 text-left sm:gap-4 sm:py-5";
            const content = (
              <>
                <span className="col-span-4 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--panel-faint)] transition-colors group-hover:text-[var(--panel-soft)] sm:col-span-3">
                  {channel.label}
                </span>
                <span className="col-span-7 min-w-0 break-words text-[14px] font-medium text-[var(--panel-foreground)] sm:col-span-8 sm:text-[15px]">
                  {channel.display}
                </span>
                <span className="col-span-1 flex justify-end">
                  <span
                    className={`text-[var(--panel-faint)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-[var(--panel-foreground)] ${
                      channel.external ? "group-hover:-translate-y-0.5" : ""
                    }`}
                    aria-hidden="true"
                  >
                    {channel.external ? "↗" : "→"}
                  </span>
                </span>
              </>
            );

            if (channel.action === "email") {
              return (
                <EmailAction
                  key={channel.id}
                  subject="Portfolio inquiry"
                  location="contact"
                  ariaLabel="Email: send a message to Muhar Ferdiansyah"
                  className={rowClassName}
                >
                  {content}
                </EmailAction>
              );
            }

            if (channel.action === "whatsapp") {
              return (
                <WhatsAppAction
                  key={channel.id}
                  location="contact"
                  ariaLabel="WhatsApp: message Muhar Ferdiansyah on WhatsApp"
                  className={rowClassName}
                >
                  {content}
                </WhatsAppAction>
              );
            }

            if (!channel.href) return null;

            return (
              <a
                key={channel.id}
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noopener noreferrer" : undefined}
                aria-label={
                  channel.external
                    ? `${channel.label}: ${channel.display} (opens in a new tab)`
                    : `${channel.label}: ${channel.display}`
                }
                onClick={() => {
                  if (channel.id === "github") {
                    trackEvent("github_click", { location: "contact" });
                  }
                }}
                className={rowClassName}
              >
                {content}
              </a>
            );
          })}
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
            className="absolute inset-0 h-full w-full cursor-default bg-black/70 backdrop-blur-sm"
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
