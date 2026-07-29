"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { disciplines } from "@/data/stack";

const services = disciplines.map((title) => ({ title }));

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const titleRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const items = titleRefs.current.slice(0, services.length);
    const vh = window.innerHeight;

    // Place each title far below initially (stacked by viewport) so they animate into a compact stack
    items.forEach((el, i) => {
      gsap.set(el, { y: i * vh });
    });

    // Measure title height to compute a tighter scroll area
    const compactHeight = items[0]?.getBoundingClientRect().height ?? 80;
    const gap = 8; // px between stacked titles
    // total scroll height: viewport + extra space needed to compress all titles into the compact stack
    const totalScroll = vh + (compactHeight + gap) * (services.length - 1);

    // Give the section the exact scroll space needed (prevents excessive white space after the section)
    sectionRef.current.style.height = `${Math.round(totalScroll)}px`;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${Math.round(totalScroll)}`,
        // use a numeric scrub to smooth animation (0.6s ease to target)
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Animate titles from big gaps → compact stacked column. Stagger makes them appear one-by-one.
    // Use a smaller gap between stacked titles for a tighter look.
    tl.to(items, {
      y: (i) => i * (compactHeight + gap),
      ease: "power3.out",
      // a slightly larger stagger combined with scrub smoothing makes the motion feel slower and more organic
      stagger: { each: 0.8, from: "start" },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      tl.kill();
      // reset inline height
      if (sectionRef.current) sectionRef.current.style.height = "";
    };
  }, []);

  return (
    <section id="services" className="w-full bg-white">
      <div ref={sectionRef} className="relative w-full">
        <div className="sticky top-0 h-screen w-full flex items-start">
          <div className="w-full px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
              {/* Heading moved inside the pinned area so it remains visible while items stack */}
              <div className="pb-10 border-b border-black mb-12">
                <h2 className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter text-black leading-[0.8]">
                  What I build
                </h2>
              </div>

              {/* Overlay container: titles are absolutely positioned layers that GSAP will move into a stacked layout */}
              <div className="relative w-full h-screen">
                {services.map((service, i) => (
                  <div
                    key={service.title}
                    ref={(el) => {
                      if (!el) return;
                      titleRefs.current[i] = el;
                    }}
                    className="absolute left-0 top-0 w-full bg-white"
                    style={{ willChange: "transform, opacity", zIndex: services.length - i }}
                  >
                    <div className="py-8 md:py-10 px-0 md:px-0">
                      <h3 className="text-5xl md:text-7xl lg:text-6xl font-black uppercase tracking-tighter text-black">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

              {/* descriptions removed — only titles are stacked now */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
