"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const text =
  "I like the problems that only appear at scale. The duplicate that arrives under a different name. The source that changes its markup overnight. The credit score nobody can defend to a regulator. Most of what I build is meant to survive contact with all three while I am asleep, which means the interesting work is in the failure paths, not the happy one.";

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!textRef.current || !sectionRef.current || !containerRef.current) return;

    // Reduced motion: leave the paragraph fully legible, skip the scrub entirely.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      textRef.current.style.color = "#0a0a0a";
      sectionRef.current.style.height = "auto";
      containerRef.current.style.height = "auto";
      return;
    }

    // Split into words first, then characters inside each word. The word wrapper is
    // the atomic unit for line breaking, so the browser can only break at the real
    // spaces between words — never mid-word. Character spans stay plain inline
    // elements: opacity/color/text-shadow animate fine without inline-block.
    textRef.current.innerHTML = "";
    const characters: HTMLSpanElement[] = [];
    const words = text.split(" ");

    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement("span");
      wordSpan.style.display = "inline-block";
      wordSpan.style.whiteSpace = "nowrap";

      word.split("").forEach((char) => {
        const span = document.createElement("span");
        span.innerText = char;
        span.style.opacity = "0.2";
        span.style.color = "#a1a1aa";
        wordSpan.appendChild(span);
        characters.push(span);
      });

      textRef.current!.appendChild(wordSpan);

      // A real space between words — the only place a line is allowed to break.
      if (wordIndex < words.length - 1) {
        textRef.current!.appendChild(document.createTextNode(" "));
      }
    });

    // Pin the container at the bottom-left while letters animate
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: containerRef.current,
      pinSpacing: false,
    });

    // Animate letters from dim → black. The reveal deliberately finishes at 65% of
    // the pinned scroll rather than at the very end, so the closing words sit fully
    // black while the section scrolls away instead of still catching up as it
    // leaves. The tighter scrub keeps the darkening near the actual scroll position
    // rather than trailing it by most of a second.
    const scrollable = () => sectionRef.current!.offsetHeight - window.innerHeight;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => "+=" + scrollable() * 0.65,
        scrub: 0.3,
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
  }, { scope: sectionRef });

  return (
    // 260vh leaves 160vh of real scroll under the 100vh pin (pinSpacing is off, so
    // the pin adds none of its own). 150vh gave only 50vh for 335 characters, which
    // the reveal could technically finish — but only if you stopped and waited at
    // the bottom. At any normal scrolling speed most of the paragraph was still
    // grey as the section left the viewport.
    <section id="about" ref={sectionRef} className="relative w-full bg-white" style={{ height: "260vh" }}>
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
