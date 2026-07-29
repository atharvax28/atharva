"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import ScrambledText from "@/components/ScrambledText";
import DedupLedger from "@/components/DedupLedger";
import { profile, education, intro } from "@/data/profile";

const HeroText = ({
  color,
  startAnimate,
}: {
  color: "text-black" | "text-white";
  startAnimate: boolean;
}) => {
  const key = color === "text-white" ? "white" : "black";
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
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
  }, { dependencies: [startAnimate, key], scope: container });

  return (
    <div
      ref={container}
      className={`pointer-events-none absolute inset-0 flex flex-col justify-start pt-6 md:pt-12 ${color}`}
      aria-hidden={color === "text-white"}
    >
      <div className="w-full px-4 md:px-8">
        <h1 className="m-0 flex w-full flex-col items-end p-0 text-[10vw] font-black uppercase leading-[0.8] tracking-[-0.05em] whitespace-nowrap">
          <span className={`hero-line-${key} block opacity-0`}>
            Built to
          </span>
          <span className={`hero-line-${key} block opacity-0 md:-mr-10`}>
            Run alone
          </span>
        </h1>
      </div>
    </div>
  );
};

const StatusWidget = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
      setDate(`${now.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()}, ${now.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      audio.play().catch(() => setIsPlaying(false));
    }
  };

  return (
    <div className="mt-6 w-full max-w-sm flex flex-col gap-3">
      {/* Player Box */}
      <div className="flex items-center justify-between rounded-xl bg-[#1C1C1C] px-6 py-4 shadow-lg">
        <div className="flex items-center gap-5">
          {/* Signal Bars */}
          <div className="flex items-end gap-[4px] h-[18px]">
            <div className={`w-[5px] bg-white transition-[height] duration-300 ${isPlaying ? 'h-full animate-pulse' : 'h-[6px]'}`}></div>
            <div className={`w-[5px] bg-white transition-[height] duration-300 ${isPlaying ? 'h-full animate-pulse delay-75' : 'h-[12px]'}`}></div>
            <div className={`w-[5px] bg-white transition-[height] duration-300 ${isPlaying ? 'h-full animate-pulse delay-150' : 'h-full'}`}></div>
          </div>
          
          <div className="flex flex-col">
            <h4 className="font-mono text-[13px] text-white leading-tight">
              POWER (Instrumental)
            </h4>
            <p className="font-mono text-[11px] text-zinc-400 leading-tight mt-0.5">
              KANYE WEST
            </p>
          </div>
        </div>
        
        <button 
          onClick={togglePlay}
          className="flex shrink-0 items-center justify-center text-white hover:text-zinc-300 transition-colors"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause size={22} fill="currentColor" strokeWidth={0} />
          ) : (
            <Play size={22} fill="currentColor" strokeWidth={0} />
          )}
        </button>
      </div>
      
      {/* Footer Info */}
      <div className="flex items-end gap-3 px-1 mt-1">
        <div className="h-5 w-5 border-b-[3px] border-l-[3px] border-zinc-900 shrink-0 mb-0.5"></div>
        <div className="flex flex-wrap items-center gap-4 pb-0.5">
          <span className="font-mono text-[11px] font-bold tracking-widest text-zinc-900">
            {time ? time : "LOADING..."}
          </span>
          <span className="font-mono text-[11px] font-bold tracking-widest text-zinc-900">
            {date}
          </span>
        </div>
      </div>
      
      <audio ref={audioRef} src="/audio/power_instrumental.mp3" loop preload="metadata" />
    </div>
  );
};

export default function HeroSection() {
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

      {/* Base layer: black headline, visible over the white right half */}
      <div className="absolute inset-0 z-0">
        <HeroText color="text-black" startAnimate={startAnimate} />
      </div>

      <div className="relative flex min-h-screen w-full flex-col md:flex-row">
        {/* Left: the machine */}
        <div className="relative h-[70vh] md:h-screen md:w-1/2 overflow-hidden z-10">
          <div className="absolute inset-0 z-0">
            <DedupLedger />
          </div>

          {/* White headline, clipped to this half so the type inverts at the seam */}
          <div className="absolute inset-0 w-screen pointer-events-none">
            <HeroText color="text-white" startAnimate={startAnimate} />
          </div>

          <nav
            aria-label="Primary"
            className="absolute bottom-6 right-4 md:bottom-12 md:right-12 z-50 flex flex-row md:flex-col items-end justify-end flex-wrap gap-x-4 gap-y-2 max-w-[90%]"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.label === "RESUME" ? "_blank" : undefined}
                rel={item.label === "RESUME" ? "noopener noreferrer" : undefined}
                className="text-right text-sm md:text-2xl font-bold uppercase text-white transition-opacity hover:opacity-70"
              >
                <ScrambledText text={item.label} />
              </a>
            ))}
          </nav>
        </div>

        {/* Right: who it belongs to */}
        <div className="relative h-[40vh] md:h-screen md:w-1/2 flex flex-col justify-start pt-[25vh] md:pt-[35vh] items-end pr-2 md:pr-4 pl-4 md:pl-0 z-20">
          <div className="max-w-md flex flex-col items-start gap-4">
            <div className="mt-3 md:mt-[3em]">
              <span className="w-2.5 h-2.5 rounded-full bg-signal shadow-[0_0_12px_rgba(255,77,0,0.8)] block animate-pulse-glow"></span>
            </div>
            <p className="text-zinc-500 text-lg leading-relaxed font-medium text-left">
              I'm {profile.name}, 22. <br />
              {intro}
            </p>
            <p className="font-mono text-[11px] leading-relaxed text-zinc-400 mt-2">
              {education.degree}, {education.institution} · {education.university}
            </p>
            
            <StatusWidget />
          </div>
        </div>
      </div>
    </>
  );
}
