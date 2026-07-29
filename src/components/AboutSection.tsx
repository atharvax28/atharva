"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const text =
  "I like the problems that only appear at scale. The duplicate that arrives under a different name. The source that changes its markup overnight. The credit score nobody can defend to a regulator. Most of what I build is meant to survive contact with those while I am asleep, which means the interesting work is in the failure paths, not the happy one.";

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || !sectionRef.current || !containerRef.current) return;

    // Reduced motion: leave the paragraph fully legible, skip the scrub entirely.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      textRef.current.style.color = "#0a0a0a";
      sectionRef.current.style.height = "auto";
      containerRef.current.style.height = "auto";
      return;
    }

    // Split text into character spans
    textRef.current.innerHTML = "";
    const characters = text.split("").map((char) => {
      const span = document.createElement("span");
      span.innerText = char;
      span.style.opacity = "0.2";
      span.style.color = "#a1a1aa";
      span.style.display = "inline-block";
      span.style.whiteSpace = char === " " ? "pre" : "normal";
      textRef.current!.appendChild(span);
      return span;
    });

    // Pin the container at the bottom-left while letters animate
    const pinST = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: containerRef.current,
      pinSpacing: false,
    });

    // Animate letters from dim → black over the full scroll of the section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
      },
    });

    tl.to(characters, {
      opacity: 1,
      color: "#000000",
      stagger: { each: 0.1, from: "start" },
      ease: "none",
      onUpdate: function () {
        const progress = this.progress();
        const activeIndex = Math.floor(progress * characters.length);
        characters.forEach((span, i) => {
          if (i === activeIndex) {
            span.style.textShadow = "0 0 20px rgba(0,0,0,0.45)";
          } else if (Math.abs(i - activeIndex) < 5) {
            span.style.textShadow = "0 0 10px rgba(0,0,0,0.15)";
          } else {
            span.style.textShadow = "none";
          }
        });
      },
    });

    return () => {
      pinST.kill();
      tl.kill();
    };
  }, []);

  return (
    // 150vh gives the scroll room for the letter animation
    <section id="about" ref={sectionRef} className="relative w-full bg-white" style={{ height: "150vh" }}>
      {/* This container gets pinned by GSAP — sits at bottom-left of viewport */}
      <div
        ref={containerRef}
        className="w-full flex flex-col justify-end px-8 md:px-16 pb-6 md:pb-8"
        style={{ height: "100vh" }}
      >
        <div className="max-w-5xl">
          <p className="text-zinc-400 uppercase tracking-widest text-xs mb-2 font-bold">
            Approach
          </p>
          <h2
            ref={textRef}
            className="text-[4.5vw] md:text-[2.3vw] leading-[1.15] font-black text-zinc-300"
          >
            {text}
          </h2>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
