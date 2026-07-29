"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WORDS = ["AUTOMATE", "THE", "PART", "YOU", "KEEP", "DOING", "TWICE"];

const ManifestoSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const wordRefs = useRef<HTMLDivElement[]>([]);
  const counterRef = useRef<HTMLDivElement | null>(null);
  const scatterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    // clear any previous refs
    wordRefs.current = wordRefs.current.slice(0, WORDS.length);

    const endPercent = WORDS.length * 15; // shorten pinned scroll distance to avoid large empty area
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${endPercent}%`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    // prepare words: from opacity 0, y: -50 to opacity 1, y:0
    tl.fromTo(
      wordRefs.current,
      { opacity: 0, y: -80 },
      { opacity: 1, y: 0, stagger: 1, ease: "none" },
      0
    );

    // animate counter into view together with the first word and fade out near the end
    if (counterRef.current) {
      // start hidden
      gsap.set(counterRef.current, { opacity: 0, scale: 0.98 });

      // animate counter in at the same time as words timeline start
      tl.fromTo(
        counterRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" },
        0
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-white">
      <div style={{ height: `${WORDS.length * 15}vh` }}>
        <div className="sticky top-0 h-screen w-full flex items-center">
          <div className="w-full px-4 md:px-8">
            <div className="w-full h-[30vh] md:h-[40vh] lg:h-[36vh] flex flex-col justify-center gap-2 md:gap-3 lg:gap-4">
              {WORDS.map((word, i) => (
                <div
                  key={word + i}
                  ref={(el) => {
                    if (!el) return;
                    wordRefs.current[i] = el;
                  }}
                  className="flex items-center justify-start opacity-0"
                  style={{ transform: "translateY(-40px)" }}
                >
                  <h1 className="m-0 text-[10vw] md:text-[6.5vw] lg:text-[5.5vw] leading-[0.9] font-black uppercase tracking-[-0.03em] text-zinc-900">
                    {word}
                  </h1>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Counterweight to the stacked words while the section is pinned */}
        <div
          ref={counterRef}
          className="pointer-events-none fixed right-10 top-24 z-30 hidden max-w-[16rem] md:block lg:right-20"
          aria-hidden
        >
          <p className="font-mono text-[11px] leading-relaxed text-zinc-400">
            Every project here started as something done by hand until it was worth not
            doing by hand.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
