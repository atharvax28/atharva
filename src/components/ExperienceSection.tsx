"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { experience, freelance } from "@/data/experience";

const ExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!containerRef.current || !headingRef.current) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;

    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: () => `+=${container.offsetHeight - 200}`,
      pin: headingRef.current,
      pinSpacing: false,
      anticipatePin: 1,
    });

    gsap.fromTo(
      ".role-item",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: ".role-list", start: "top 80%" },
      }
    );

    ScrollTrigger.refresh();
  }, { scope: containerRef });

  return (
    <section
      id="experience"
      ref={containerRef}
      className="w-full bg-paper py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-12 items-start gap-6">
          <div className="col-span-12 md:col-span-4">
            <div ref={headingRef} className="z-10 self-start">
              <h2 className="text-left text-4xl font-black uppercase text-zinc-900 lg:text-6xl">
                Experience
              </h2>
              <p className="mt-6 max-w-md text-sm text-muted">
                Freelance since 2023, plus a software internship. Numbers below are the ones
                I measured, not estimates.
              </p>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8">
            <div className="role-list w-full border-t border-rule md:ml-auto md:w-11/12">
              {experience.map((role) => (
                <article
                  key={role.company}
                  className="role-item border-b border-rule py-8"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-xl font-black uppercase tracking-tight text-zinc-900 md:text-2xl">
                      {role.company}
                    </h3>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                      {role.dates} · {role.location}
                    </span>
                  </div>

                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-signal">
                    {role.title}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {role.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex gap-3 text-sm leading-relaxed text-zinc-600"
                      >
                        <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-zinc-300" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {role.company === "Freelance" && (
                    <div className="mt-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">
                        Live
                      </p>
                      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                        {freelance.map((site) => (
                          <li key={site.url}>
                            <a
                              href={site.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-[11px] text-zinc-500 underline decoration-zinc-200 underline-offset-4 transition-colors hover:text-signal hover:decoration-signal"
                            >
                              {site.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
