"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Globe, ArrowUpRight } from "lucide-react";

import { projects } from "@/data/projects";
import PipelineDiagram from "@/components/PipelineDiagram";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".projects-heading span", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".projects-heading", start: "top 80%" },
      });

      gsap.from(".project-card-wrapper", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 70%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full overflow-hidden bg-paper px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="projects-heading mb-16 md:mb-24">
          <h2 className="text-[12vw] font-black uppercase leading-[0.8] tracking-tighter text-black md:text-[8vw]">
            <span className="block">Selected</span>
            <span className="block">Work</span>
          </h2>
          <div className="mt-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <p className="max-w-md text-lg font-medium text-muted md:text-xl">
              Six things I built and can still explain. Three have a screen; three are
              pipelines, so they show their stages instead.
            </p>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-400">
              <span className="h-px w-12 bg-rule" />
              {projects.length} projects
            </div>
          </div>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12"
        >
          {projects.map((project) => (
            <div key={project.id} className="project-card-wrapper group">
              <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100 md:aspect-[16/10]">
                <Link
                  href={`/projects/${project.slug}`}
                  data-cursor="project"
                  className="absolute inset-0 z-10 block"
                  aria-label={`${project.name} — read more`}
                >
                  {project.visual === "shot" && project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.name} interface`}
                      fill
                      className="object-cover object-top transition-all duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <PipelineDiagram
                      stages={project.stages ?? []}
                      label={project.name}
                    />
                  )}

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex scale-90 flex-col items-center gap-3 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-2xl">
                        <ArrowUpRight size={32} />
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="absolute left-6 top-6 z-20 flex gap-2">
                  <span className="rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-black backdrop-blur-md">
                    {project.year}
                  </span>
                </div>

                <div className="absolute right-6 top-6 z-20 flex gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-black shadow-sm backdrop-blur-md transition-all hover:bg-black hover:text-white"
                      aria-label={`${project.name} source on GitHub`}
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {project.websiteUrl && (
                    <a
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-black shadow-sm backdrop-blur-md transition-all hover:bg-black hover:text-white"
                      aria-label={`${project.name} live site`}
                    >
                      <Globe size={18} />
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="mb-2 text-2xl font-black uppercase tracking-tighter transition-colors group-hover:text-signal md:text-3xl">
                    <Link href={`/projects/${project.slug}`}>{project.name}</Link>
                  </h3>
                  <p className="max-w-sm text-sm font-medium leading-relaxed text-muted">
                    {project.description}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-zinc-100 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
