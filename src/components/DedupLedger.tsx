"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * The hero's signature panel.
 *
 * Dramatises one real step of the job aggregation pipeline: the same role arrives from a
 * company board, an aggregator, and a recruiter feed under three different titles, and a
 * three-layer Redis dedupe collapses them into one lead. 1,000+ listings in, 500-750+ out.
 *
 * The figures are the real daily ones from the project. This is a dramatisation of a typical
 * run, labelled as such - it is never presented as live telemetry.
 */

type Row = { id: string; role: string; source: string; dupe: boolean };

// Fixed, not randomised: random values would desync between server and client render.
const ROWS: Row[] = [
  { id: "7f2a", role: "backend engineer", source: "greenhouse", dupe: false },
  { id: "7f2b", role: "backend engineer", source: "linkedin", dupe: true },
  { id: "7f2c", role: "full stack developer", source: "lever", dupe: false },
  { id: "7f2d", role: "sr. backend engineer", source: "aggregator", dupe: true },
  { id: "7f2e", role: "ml engineer", source: "careers", dupe: false },
  { id: "7f2f", role: "data engineer", source: "ashby", dupe: false },
  { id: "7f30", role: "full stack developer", source: "aggregator", dupe: true },
  { id: "7f31", role: "platform engineer", source: "greenhouse", dupe: false },
  { id: "7f32", role: "ml engineer", source: "linkedin", dupe: true },
  { id: "7f33", role: "python developer", source: "careers", dupe: false },
  { id: "7f34", role: "data engineer", source: "recruiter", dupe: true },
  { id: "7f35", role: "api engineer", source: "workday", dupe: false },
];

const IN_TOTAL = 1043;
const OUT_TOTAL = 612;

const DedupLedger = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const inRef = useRef<HTMLSpanElement>(null);
  const outRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reduced motion: render the settled end state, no animation at all.
    if (reduced) {
      if (inRef.current) inRef.current.textContent = IN_TOTAL.toLocaleString();
      if (outRef.current) outRef.current.textContent = OUT_TOTAL.toLocaleString();
      gsap.set(root.querySelectorAll<HTMLElement>("[data-row]"), { opacity: 1, x: 0 });
      gsap.set(root.querySelectorAll<HTMLElement>('[data-row="dupe"]'), { opacity: 0.28 });
      gsap.set(root.querySelectorAll<HTMLElement>("[data-strike]"), { scaleX: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-row]");
      const dupes = gsap.utils.toArray<HTMLElement>('[data-row="dupe"]');
      const counters = { in: 0, out: 0 };

      const write = () => {
        if (inRef.current) inRef.current.textContent = Math.round(counters.in).toLocaleString();
        if (outRef.current) outRef.current.textContent = Math.round(counters.out).toLocaleString();
      };

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.2 });

      // 1. Listings arrive.
      tl.set(rows, { opacity: 0, x: -12 })
        .set(root.querySelectorAll("[data-strike]"), { scaleX: 0 })
        .set(counters, { in: 0, out: 0 })
        .call(write)
        .to(rows, {
          opacity: 1,
          x: 0,
          duration: 0.34,
          stagger: 0.075,
          ease: "power2.out",
        })
        .to(
          counters,
          { in: IN_TOTAL, duration: 1.5, ease: "power1.out", onUpdate: write },
          0
        );

      // 2. Duplicates are struck through, then dim out of the count.
      tl.to(
        dupes.map((d) => d.querySelector("[data-strike]")),
        { scaleX: 1, duration: 0.3, stagger: 0.09, ease: "power2.inOut" },
        "+=0.35"
      )
        .to(dupes, { opacity: 0.28, duration: 0.45, stagger: 0.09 }, "<0.12")
        // 3. What survives is the deduplicated lead count.
        .to(
          counters,
          { out: OUT_TOTAL, duration: 1.1, ease: "power2.out", onUpdate: write },
          "<"
        );

      // 4. Hold the result, then fade for the next run.
      tl.to({}, { duration: 2.4 }).to(rows, { opacity: 0, duration: 0.5 });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="flex h-full w-full flex-col justify-end md:justify-center pb-28 sm:pb-20 md:pb-0 bg-machine pl-4 sm:pl-6 pr-4 sm:pr-32 pt-24 sm:py-10 font-mono md:pr-48 lg:pr-64"
      aria-label="Illustration of the job pipeline deduplicating a typical day of listings"
    >
      {/* Header: what this is, stated plainly so it is never mistaken for live data */}
      <div className="mb-4 sm:mb-8 flex flex-col sm:flex-row items-start justify-between gap-4 border-b border-white/10 pb-4 sm:pb-6 mt-16 sm:mt-0">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">
            Job pipeline
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/25">
            Typical daily run
          </p>
        </div>
        <div className="flex gap-6 text-left sm:text-right sm:gap-9">
          <div>
            <span
              ref={inRef}
              className="block text-xl tabular-nums text-white/50 sm:text-2xl"
            >
              0
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-white/30">
              listings
            </span>
          </div>
          <div>
            <span
              ref={outRef}
              className="block text-xl tabular-nums text-signal sm:text-2xl"
            >
              0
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-white/30">
              leads
            </span>
          </div>
        </div>
      </div>

      {/* The ledger */}
      <ul className="space-y-[5px] sm:space-y-[7px] text-[10px] sm:text-xs leading-none">
        {ROWS.map((row, i) => (
          <li
            key={row.id}
            data-row={row.dupe ? "dupe" : "keep"}
            className={`flex items-center gap-2 sm:gap-4 opacity-0 ${i >= 5 ? "hidden sm:flex" : ""}`}
          >
            <span className="w-8 sm:w-9 shrink-0 text-white/25">{row.id}</span>

            <span className="min-w-0 flex-1 truncate text-white/70">
              <span className="relative inline-block">
                {row.role}
                {/* Strike-through drawn by GSAP rather than a CSS toggle, so it wipes across */}
                <span
                  data-strike
                  aria-hidden
                  className="absolute left-0 top-1/2 h-px w-full origin-left bg-signal"
                  style={{ transform: "scaleX(0)" }}
                />
              </span>
            </span>

            <span className="w-16 sm:w-24 shrink-0 text-right text-white/25">
              {row.source}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-6 sm:mt-8 border-t border-white/10 pt-4 sm:pt-5 text-[9px] sm:text-[10px] leading-relaxed text-white/30">
        Three-layer Redis dedupe. The same role posted to a board, an aggregator, and a
        recruiter feed counts once.
      </p>
    </div>
  );
};

export default DedupLedger;
