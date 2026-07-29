"use client";

import { useState, useEffect } from "react";
import gsap from "gsap";

import ScrambledText from "@/components/ScrambledText";
import DedupLedger from "@/components/DedupLedger";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ServicesSection from "@/components/ServicesSection";
import ManifestoSection from "@/components/ManifestoSection";
import TechStackSection from "@/components/TechStackSection";
import ExperienceSection from "@/components/ExperienceSection";
import ConnectSection from "@/components/ConnectSection";
import TextType from "@/components/TextType";
import Footer from "@/components/Footer";
import { profile, education, intro } from "@/data/profile";

/**
 * The hero headline is painted twice: black underneath, and white clipped to the dark
 * ledger panel on the left. Where the type crosses the panel edge it flips colour.
 * Defined outside Home so React never remounts it on a state change.
 */
const HeroText = ({
  color,
  startAnimate,
}: {
  color: "text-black" | "text-white";
  startAnimate: boolean;
}) => {
  const key = color === "text-white" ? "white" : "black";

  useEffect(() => {
    if (!startAnimate) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(`.hero-line-${key}`, { opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(
      `.hero-line-${key}`,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", stagger: 0.09 }
    );
  }, [startAnimate, key]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 flex flex-col justify-start ${color}`}
      aria-hidden={color === "text-white"}
    >
      <div className="w-full px-4">
        <h1 className="m-0 flex w-full flex-col p-0 text-[10vw] font-black uppercase leading-[0.8] tracking-[-0.05em]">
          <span className={`hero-line-${key} mr-5 block text-right opacity-0`}>
            Built to
          </span>
          <span className={`hero-line-${key} mt-2 block text-right opacity-0 md:mr-5`}>
            Run alone
          </span>
        </h1>
      </div>
    </div>
  );
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [startAnimate, setStartAnimate] = useState(false);

  const navItems = [
    { label: "WORK", href: "#work" },
    { label: "STACK", href: "#stack" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "RESUME", href: profile.resume },
    { label: "CONTACT", href: "#get-in-touch" },
  ];

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setLoading(false);
      setStartAnimate(true);
      return;
    }
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setLoading(false);
        setStartAnimate(true);
      }, 700);
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && (
        <div
          className={`fixed inset-0 z-100 flex flex-col items-center justify-center bg-machine font-mono text-white transition-opacity duration-700 ${
            isFadingOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="text-xs uppercase tracking-[0.3em] text-white/60">
            {profile.name}
          </div>
        </div>
      )}

      <main id="home" className="relative left-0 top-0 min-h-screen w-full bg-paper">
        {/* Base layer: black headline, visible over the white right half */}
        <div className="absolute inset-0 z-0">
          <HeroText color="text-black" startAnimate={startAnimate} />
        </div>

        <div className="relative flex min-h-screen w-full flex-col md:flex-row">
          {/* Left: the machine */}
          <div className="relative z-10 h-[68vh] overflow-hidden md:h-screen md:w-1/2">
            <div className="absolute inset-0 z-0">
              <DedupLedger />
            </div>

            {/* White headline, clipped to this half so the type inverts at the seam */}
            <div className="pointer-events-none absolute inset-0 w-screen">
              <HeroText color="text-white" startAnimate={startAnimate} />
            </div>

            <nav
              aria-label="Primary"
              className="absolute bottom-8 right-8 z-50 flex flex-col items-end gap-1 md:bottom-12 md:right-12"
            >
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.label === "RESUME" ? "_blank" : undefined}
                  rel={item.label === "RESUME" ? "noopener noreferrer" : undefined}
                  className="text-right text-lg font-bold uppercase text-white transition-opacity hover:opacity-70 md:text-2xl"
                >
                  <ScrambledText text={item.label} />
                </a>
              ))}
            </nav>
          </div>

          {/* Right: who it belongs to */}
          <div className="relative z-20 flex flex-col justify-start px-6 pt-16 md:h-screen md:w-1/2 md:items-end md:pl-0 md:pr-8 md:pt-[38vh]">
            <div className="flex max-w-md flex-col items-start gap-5">
              <div className="flex items-center gap-3">
                <span className="animate-pulse-glow block h-2.5 w-2.5 rounded-full bg-signal" />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  Open to work
                </span>
              </div>

              <div>
                <p className="font-display text-xl font-black uppercase tracking-tight text-ink">
                  {profile.name}
                </p>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                  {profile.role} · {profile.location}
                </p>
              </div>

              <p className="text-lg font-medium leading-relaxed text-zinc-500">{intro}</p>

              <p className="font-mono text-[11px] leading-relaxed text-zinc-400">
                {education.degree}, {education.institution} · {education.university} ·{" "}
                {education.graduation}
              </p>
            </div>
          </div>
        </div>

        <AboutSection />
        <ProjectsSection />
        <ServicesSection />
        <ManifestoSection />
        <TechStackSection />
        <ExperienceSection />
        <ConnectSection />

        <section className="relative z-10 flex w-full items-center justify-center bg-paper py-16 md:py-24">
          <TextType
            text={["LET'S BUILD SOMETHING", "THAT RUNS ITSELF"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor
            cursorCharacter="|"
            deletingSpeed={50}
            cursorBlinkDuration={0.5}
            className="px-4 text-center font-display text-4xl font-semibold uppercase text-zinc-900 md:text-6xl lg:text-8xl"
          />
        </section>

        <Footer />
      </main>
    </>
  );
}
