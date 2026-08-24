/**
 * Cover art for projects with no screenshot worth showing — a client site behind a
 * password gate, or one whose landing screen is nearly empty. The fallback this
 * replaces repeated the name, description, and tags that already sit directly under
 * the card, so those projects rendered their own text twice. This draws a quiet icon
 * plate in the same near-black language as PipelineDiagram, keeping the grid even.
 *
 * Server component. No motion, no state.
 */
import Image from "next/image";
import { Layers, PenTool, UserRound, type LucideIcon } from "lucide-react";

/** Keyed by Project["coverIcon"]. Add the entry here before using a new name. */
const icons: Record<string, LucideIcon> = {
  layers: Layers,
  "pen-tool": PenTool,
  "user-round": UserRound,
};

const ProjectCover = ({
  icon,
  mark,
  tags,
}: {
  icon?: string;
  mark?: string;
  tags: string[];
}) => {
  // A supplied graphic mark stands on its own: centred on paper at half the card,
  // no dot field and no icon plate competing with it.
  if (mark) {
    return (
      <div className="flex h-full w-full items-center justify-center overflow-hidden bg-zinc-50">
        <div className="relative h-1/2 w-1/2">
          <Image
            src={mark}
            alt=""
            fill
            aria-hidden
            className="object-contain"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
      </div>
    );
  }

  const Icon = (icon && icons[icon]) || Layers;

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-machine p-6 font-mono sm:p-8">
      {/* Wallpaper: a faint dot field plus one oversized ghost of the icon bled off
          the bottom-right corner. Both decorative — neither is announced. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <Icon
        aria-hidden
        strokeWidth={0.75}
        className="pointer-events-none absolute -bottom-10 -right-8 h-52 w-52 text-white/[0.05] sm:h-64 sm:w-64"
      />

      {/* Left clear at the top: the year and status chips are positioned over it. */}
      <div className="relative flex flex-1 items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-signal">
          <Icon size={20} strokeWidth={1.5} aria-hidden />
        </span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <div className="relative flex flex-wrap gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.22em] text-white/20">
        {tags.slice(0, 3).map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCover;
