"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { stack } from "@/data/stack";

const TechStackSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!containerRef.current || !headingRef.current) return;
    if (typeof window === "undefined") return;
    // Pinning only earns its keep on a wide viewport with motion allowed.
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;

    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: () => `bottom top+=${(headingRef.current?.offsetHeight || 0) + 112}`,
      pin: headingRef.current,
      pinSpacing: false,
      anticipatePin: 1,
    });

    ScrollTrigger.refresh();
  }, { scope: containerRef });

  return (
    <section id="stack" ref={containerRef} className="w-full bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-12 items-start gap-6">
          <div className="col-span-12 md:col-span-4">
            <div ref={headingRef} className="z-10 self-start">
              <h2 className="text-left text-4xl font-black uppercase text-zinc-900 lg:text-6xl">
                Stack
              </h2>
              <p className="mt-6 max-w-md text-sm text-muted">
                What I actually reach for, and the work it earned its place on. Nothing is
                listed here that is not behind something else on this site.
              </p>
            </div>
          </div>

          <div className="col-span-12 flex justify-center md:col-span-8 md:justify-end">
            <div className="w-full border-t border-rule md:w-3/4 lg:w-2/3">
              {stack.map((t, i) => (
                <div
                  key={t.name}
                  className={`flex flex-col items-start px-4 py-5 md:flex-row md:items-center ${
                    i < stack.length - 1 ? "border-b border-rule" : ""
                  }`}
                >
                  <div className="hidden w-20 shrink-0 text-left font-mono text-[11px] uppercase tracking-wider text-zinc-400 md:block">
                    {t.kind}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-base font-bold text-zinc-900 md:text-lg">
                      {t.name}
                    </div>
                  </div>
                  <div className="hidden w-48 text-right font-mono text-[11px] text-zinc-400 md:block">
                    {t.where}
                  </div>

                  {/* Mobile: metadata drops below the name */}
                  <div className="mt-2 flex w-full justify-between font-mono text-[11px] text-zinc-400 md:hidden">
                    <span>{t.kind}</span>
                    <span>{t.where}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
