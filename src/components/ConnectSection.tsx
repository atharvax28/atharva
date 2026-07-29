"use client";

import { useState } from "react";
import { profile } from "@/data/profile";

/**
 * The template posted this to a Google Sheet via a service account. That needs secrets
 * held server-side for a form with two fields, so it now composes a mail draft instead:
 * no keys, no backend, and the sender can see exactly what they are sending.
 */

const topics = [
  { value: "a full-time role", label: "A full-time role" },
  { value: "a freelance project", label: "A freelance project" },
  { value: "a collaboration", label: "A collaboration" },
  { value: "something else", label: "Something else" },
];

const ConnectSection = () => {
  const [topic, setTopic] = useState("");
  const [error, setError] = useState<string | null>(null);

  const compose = () => {
    if (!topic) {
      setError("Pick what this is about first.");
      return;
    }
    setError(null);
    const subject = encodeURIComponent(`Re: ${topic}`);
    const body = encodeURIComponent(
      `Hi Atharva,\n\nI'd like to talk about ${topic}.\n\n`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="get-in-touch"
      className="relative z-10 flex w-full flex-col justify-start bg-paper py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-6 md:px-12">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Connect
            </p>
            <h2 className="mt-2 text-4xl font-black uppercase text-zinc-900 md:text-6xl">
              Let&apos;s talk about
            </h2>

            <div className="relative mt-4">
              <label htmlFor="topic" className="sr-only">
                What this is about
              </label>
              <select
                id="topic"
                value={topic}
                onChange={(e) => {
                  setTopic(e.target.value);
                  setError(null);
                }}
                className="w-full appearance-none border-0 border-b border-zinc-300 bg-transparent py-4 pr-8 text-lg font-medium text-zinc-900 focus:border-zinc-900 focus:outline-none md:text-xl"
              >
                <option value="" disabled>
                  Select...
                </option>
                {topics.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
              <span
                className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-zinc-400"
                aria-hidden
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>

            <button
              type="button"
              onClick={compose}
              className="mt-8 inline-flex w-fit items-center gap-3 border-b-2 border-zinc-900 pb-1 text-xl font-black uppercase text-zinc-900 transition-colors hover:border-signal hover:text-signal"
            >
              <span>Write the email</span>
              <span aria-hidden className="text-2xl leading-none">
                →
              </span>
            </button>

            <p role="status" className="mt-3 h-5 font-mono text-xs text-signal">
              {error}
            </p>
          </div>

          <div className="flex flex-col gap-8 md:pt-24">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">
                Email
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="text-xl font-bold text-zinc-900 underline decoration-zinc-200 underline-offset-8 transition-colors hover:text-signal hover:decoration-signal md:text-2xl"
              >
                {profile.email}
              </a>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">
                Elsewhere
              </p>
              <div className="mt-2 flex flex-col gap-1">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit text-lg font-bold text-zinc-900 transition-colors hover:text-signal"
                >
                  {profile.githubLabel}
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit text-lg font-bold text-zinc-900 transition-colors hover:text-signal"
                >
                  {profile.linkedinLabel}
                </a>
              </div>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">
                Based in
              </p>
              <p className="text-lg font-bold text-zinc-900">{profile.location}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
