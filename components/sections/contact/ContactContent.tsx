"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface ContactChannel {
  label: string;
  display: string;
  href: string;
  note: string;
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
  const headerRef = useRef<HTMLDivElement>(null);
  const chapterRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const cvRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [isCvOpen, setIsCvOpen] = useState(false);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    if (prefersReducedMotion) {
      if (headerRef.current) gsap.set(headerRef.current, { opacity: 1, y: 0 });
      if (linksRef.current) gsap.set(linksRef.current, { opacity: 1, y: 0 });
      if (cvRef.current) gsap.set(cvRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
            refreshPriority: -4,
          },
        });

        if (chapterRef.current) {
          headerTl.fromTo(
            chapterRef.current,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
          );
        }

        if (headlineRef.current) {
          headerTl.fromTo(
            headlineRef.current,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            "-=0.3"
          );
        }

        if (descriptionRef.current) {
          headerTl.fromTo(
            descriptionRef.current,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
            "-=0.35"
          );
        }
      }

      if (linksRef.current) {
        const linkRows = linksRef.current.querySelectorAll(".contact-row");
        gsap.fromTo(
          linkRows,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: linksRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
              refreshPriority: -4,
            },
          }
        );
      }

      if (cvRef.current) {
        gsap.fromTo(
          cvRef.current,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cvRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
              refreshPriority: -4,
            },
          }
        );
      }

      ScrollTrigger.sort();
    }, sectionEl);

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (!isCvOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsCvOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isCvOpen]);

  const headlineWords = contact.headline.split(" ");

  const channels: ContactChannel[] = [
    {
      label: "EMAIL",
      display: email,
      href: `mailto:${email}`,
      note: "PREFERRED",
      external: false,
    },
    {
      label: "WHATSAPP",
      display: contact.whatsapp.display,
      href: contact.whatsapp.href,
      note: "DIRECT MESSAGE",
      external: true,
    },
    {
      label: "GITHUB",
      display: contact.github.display,
      href: contact.github.href,
      note: "CODE",
      external: true,
    },
    {
      label: "LINKEDIN",
      display: contact.linkedin.display,
      href: contact.linkedin.href,
      note: "PROFILE",
      external: true,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      className="relative w-full bg-[#08080a] text-zinc-100 px-6 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 md:py-24 overflow-hidden border-b border-zinc-800/40"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div ref={headerRef} className="max-w-3xl will-change-transform will-change-opacity">
          <div
            ref={chapterRef}
            className="flex items-center gap-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-[0.24em] text-[#f97316] font-semibold will-change-transform will-change-opacity"
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-[#f97316]"
              aria-hidden="true"
            />
            <span>{contact.chapter}</span>
            <span className="h-px w-6 sm:w-8 bg-zinc-800" aria-hidden="true" />
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
              CLOSING CHAPTER
            </span>
          </div>

          <h2
            id="contact-heading"
            ref={headlineRef}
            className="mt-6 sm:mt-8 font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-white leading-[1.12] uppercase will-change-transform will-change-opacity"
          >
            {headlineWords.slice(0, 2).join(" ")}
            <br />
            {headlineWords.slice(2).join(" ")}
          </h2>

          <p
            ref={descriptionRef}
            className="mt-4 sm:mt-6 font-sans text-base sm:text-lg text-zinc-300 leading-relaxed font-normal max-w-xl will-change-transform will-change-opacity"
          >
            {contact.description}
          </p>
        </div>

        <div
          ref={linksRef}
          className="mt-12 sm:mt-16 border-t border-zinc-800/60 will-change-transform will-change-opacity"
        >
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
              className="contact-row group grid grid-cols-12 items-baseline gap-2 sm:gap-4 py-5 sm:py-6 border-b border-zinc-800/40"
            >
              <span className="col-span-3 font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-zinc-400 group-hover:text-zinc-200 transition-colors">
                {channel.label}
              </span>
              <span className="col-span-8 min-w-0 break-all font-sans text-base sm:text-lg text-zinc-100 font-medium tracking-tight">
                {channel.display}
              </span>
              <span className="col-span-1 flex justify-end items-center gap-2">
                <span className="hidden md:inline font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                  {channel.note}
                </span>
                <span
                  className="text-[#f97316] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </span>
            </a>
          ))}
        </div>

        {cvAvailable && (
          <div
            ref={cvRef}
            className="mt-10 sm:mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 will-change-transform will-change-opacity"
          >
            <button
              type="button"
              onClick={() => setIsCvOpen(true)}
              aria-haspopup="dialog"
              className="group inline-flex items-center gap-2.5 font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-zinc-100 hover:text-white transition-colors"
            >
              <span className="border-b border-zinc-700 group-hover:border-white pb-0.5 transition-colors font-medium">
                PREVIEW CV
              </span>
              <span
                className="text-[#f97316] transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </button>

            <a
              href={contact.cv}
              download
              aria-label="Download Muhar Ferdiansyah CV as PDF"
              className="group inline-flex items-center gap-2.5 font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors"
            >
              <span className="border-b border-transparent group-hover:border-white pb-0.5 transition-colors">
                DOWNLOAD CV
              </span>
              <span
                className="text-[#f97316] transition-transform duration-200 group-hover:translate-y-0.5"
                aria-hidden="true"
              >
                ↓
              </span>
            </a>
          </div>
        )}
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
            aria-label="Close CV preview"
            onClick={() => setIsCvOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-black/80 backdrop-blur-sm"
          />

          <div className="relative z-10 flex h-full max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/70">
            <div className="flex items-center justify-between gap-4 border-b border-zinc-800 px-4 py-3 sm:px-5">
              <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[#f97316]"
                  aria-hidden="true"
                />
                <span className="text-zinc-200">MUHAR FERDIANSYAH / CV</span>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href={contact.cv}
                  download
                  className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-300 transition-colors hover:text-white sm:inline"
                >
                  DOWNLOAD
                </a>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setIsCvOpen(false)}
                  aria-label="Close"
                  className="flex h-8 w-8 items-center justify-center rounded border border-zinc-800 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-white"
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
