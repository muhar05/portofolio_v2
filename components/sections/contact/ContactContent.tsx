"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface ContactChannel {
  label: string;
  display: string;
  href: string;
  note: string;
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
  cvAvailable: boolean;
}

export default function ContactContent({ contact, cvAvailable }: ContactContentProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const chapterRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const cvRef = useRef<HTMLDivElement>(null);

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

  const headlineWords = contact.headline.split(" ");

  const channels: ContactChannel[] = [
    {
      label: "WHATSAPP",
      display: contact.whatsapp.display,
      href: contact.whatsapp.href,
      note: "DIRECT MESSAGE",
    },
    {
      label: "GITHUB",
      display: contact.github.display,
      href: contact.github.href,
      note: "CODE",
    },
    {
      label: "LINKEDIN",
      display: contact.linkedin.display,
      href: contact.linkedin.href,
      note: "PROFILE",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      className="relative w-full bg-[#08080a] text-zinc-100 px-6 sm:px-8 md:px-12 lg:px-16 py-28 sm:py-36 md:py-44 overflow-hidden border-b border-zinc-800/40"
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
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${channel.label}: ${channel.display} (opens in a new tab)`}
              className="contact-row group grid grid-cols-12 items-baseline gap-2 sm:gap-4 py-5 sm:py-6 border-b border-zinc-800/40"
            >
              <span className="col-span-4 sm:col-span-3 font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-300 transition-colors">
                {channel.label}
              </span>
              <span className="col-span-7 sm:col-span-8 font-sans text-base sm:text-lg text-zinc-100 font-medium tracking-tight">
                {channel.display}
              </span>
              <span className="col-span-1 flex justify-end items-center gap-2">
                <span className="hidden md:inline font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
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
          <div ref={cvRef} className="mt-10 sm:mt-12 will-change-transform will-change-opacity">
            <a
              href={contact.cv}
              download
              aria-label="Download Muhar Ferdiansyah CV as PDF"
              className="group inline-flex items-center gap-2.5 font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-zinc-100 hover:text-white transition-colors"
            >
              <span className="border-b border-zinc-700 group-hover:border-white pb-0.5 transition-colors font-medium">
                DOWNLOAD CV
              </span>
              <span
                className="text-[#f97316] transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
