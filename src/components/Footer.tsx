"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

const MARQUEE_TEXT = `© ${profile.name} · 2026 · `;

const Footer = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    // Kolkata time, so a recruiter in another timezone can see whether it is a sane hour.
    const formatTime = () =>
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        })
      );
    formatTime();
    const id = setInterval(formatTime, 1000 * 30);
    return () => clearInterval(id);
  }, []);

  const links = [
    { label: "GitHub", href: profile.github },
    { label: "Email", href: `mailto:${profile.email}` },
    { label: "LinkedIn", href: profile.linkedin },
  ];

  return (
    <footer className="relative z-10 flex w-full flex-col bg-machine text-white">
      <div className="flex items-center justify-between px-8 py-3 font-mono text-xs uppercase tracking-[0.18em] text-white/50 md:px-16">
        <span>{profile.location}</span>
        {time && <span suppressHydrationWarning>{time} IST</span>}
      </div>

      <div className="flex flex-1 flex-wrap items-center justify-between gap-6 px-8 py-10 md:px-16 md:py-14">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="font-display text-xl font-black uppercase text-white transition-colors hover:text-signal md:text-3xl"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="shrink-0 overflow-hidden border-t border-white/10">
        <div className="marquee-track flex py-4">
          {[0, 1].map((dup) => (
            <span
              key={dup}
              aria-hidden={dup === 1}
              className="marquee-content flex shrink-0 items-center gap-8 whitespace-nowrap pr-8 font-display text-base font-black text-white/80 md:text-3xl lg:text-5xl"
            >
              {[...Array(8)].map((_, i) => (
                <span key={i}>{MARQUEE_TEXT}</span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
