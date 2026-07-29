import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Github, Globe, ArrowLeft, ExternalLink } from "lucide-react";

import { projects, getProject } from "@/data/projects";
import PipelineDiagram from "@/components/PipelineDiagram";
import Footer from "@/components/Footer";
import { profile } from "@/data/profile";

/* Static at build time: six known slugs, no client-side lookup needed. */
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Not found" };
  return {
    title: `${project.name} — ${profile.name}`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const hasShot = project.visual === "shot" && project.image && project.websiteUrl;

  return (
    <div className="min-h-screen bg-paper text-ink">
      <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between px-6 py-8 mix-blend-difference">
        <Link
          href="/#work"
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-70"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
        <Link
          href="/"
          className="font-display text-xl font-black tracking-tighter text-white"
        >
          {profile.name}
        </Link>
      </nav>

      <header className="relative h-[62vh] w-full overflow-hidden bg-machine">
        {!hasShot && (
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        )}
        <div className="absolute inset-0">
          {hasShot ? (
            <Image
              src={project.image!}
              alt={`${project.name} interface`}
              fill
              className="object-cover object-top"
              priority
            />
          ) : project.visual === "diagram" ? (
            <div className="mx-auto flex h-full max-w-4xl items-center justify-center px-6 py-16">
              <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-machine shadow-2xl">
                <div className="absolute left-0 top-0 flex h-8 w-full items-center gap-2 border-b border-white/10 bg-white/5 px-4 z-10">
                  <div className="h-2.5 w-2.5 rounded-full bg-white/20"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-white/20"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-white/20"></div>
                </div>
                <div className="h-full w-full pt-8">
                  <PipelineDiagram stages={project.stages ?? []} label={project.name} />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-white">
              <span className="text-5xl font-black uppercase tracking-tighter text-black text-center px-6 md:text-7xl">
                {project.name}
              </span>
            </div>
          )}
        </div>

        {hasShot && (
          <div className="absolute inset-0 bg-gradient-to-t from-paper via-transparent to-transparent" />
        )}
      </header>

      <div className="mx-auto max-w-7xl px-6 pt-12">
        <span className="animate-reveal inline-block rounded-full border border-black/10 px-3 py-1 font-mono text-xs text-zinc-600">
          {project.year} · {project.id}
        </span>
        <h1 className="animate-reveal mt-4 text-[12vw] font-black uppercase leading-[0.85] tracking-tighter md:text-[8vw]">
          {project.name}
        </h1>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-8">
            <h2 className="mb-8 text-2xl font-medium leading-relaxed text-zinc-800 md:text-3xl">
              {project.description}
            </h2>

            <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-zinc-600">
              {project.longDescription?.split("\n\n").map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </div>

            {(project.websiteUrl || project.githubUrl) && (
              <div className="mt-12 flex flex-wrap gap-4">
                {project.websiteUrl && (
                  <a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-full bg-ink px-8 py-4 font-bold text-white transition-all hover:bg-zinc-800"
                  >
                    <Globe size={20} />
                    Visit site
                    <ExternalLink
                      size={16}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-full border-2 border-ink px-8 py-4 font-bold transition-all hover:bg-ink hover:text-white"
                  >
                    <Github size={20} />
                    View source
                  </a>
                )}
              </div>
            )}
          </div>

          <aside className="space-y-12 lg:col-span-4">
            <div>
              <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-zinc-400">
                Built with
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {project.stages && (
              <div>
                <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Stages
                </h3>
                <ol className="space-y-1 font-mono text-sm text-zinc-600">
                  {project.stages.map((s, i) => (
                    <li key={s}>
                      <span className="text-zinc-300">
                        {String(i + 1).padStart(2, "0")}
                      </span>{" "}
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div>
              <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-zinc-400">
                Role
              </h3>
              <p className="text-lg font-medium">Sole developer</p>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
