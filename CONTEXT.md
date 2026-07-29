# CONTEXT — portfolio revamp handoff

State as of 2026-07-29. Written for a fresh agent session picking this up mid-flight.

## What this is

`github.com/atharvax28/atharva-portfolio`, deployed at **atharvax1.vercel.app**.

It was a Vite + React SPA (one 30KB `Portfolio.jsx` fed by `resume_data.json`, plus an
unrelated `AttendanceTracker.jsx` as a second view). It has been **fully replaced** with a
Next.js 16 app built on the `port.ard-main` template.

- Working dir: `C:\Users\athar\Downloads\Dev-Projects\atharva-portfolio`
- Branch: **`revamp`** (branched off `main`). Everything is staged, **nothing is committed yet**.
- Template source (read-only reference): `C:\Users\athar\Downloads\Dev-Projects\port.ard-main`

## Decisions the user made (do not relitigate)

1. **No electrical engineering anywhere.** No MPPT, no wireless power transfer, no ML MPPT
   selector, no MSEB substation internship, no hardware/control skills. Positioning is
   purely software / AI / data.
2. **Degree shown without the branch.** Renders as "Bachelor of Engineering (B.E.), Fr. C.
   Rodrigues Institute of Technology (FCRIT) · University of Mumbai · May 2026". Never name
   Electrical Engineering. (Nothing false is stated; the branch is simply not mentioned.)
3. **No portrait photo.** The template's split hero kept its structure, but the photo half
   became a generated panel (see Signature below).
4. **AttendanceTracker dropped entirely.**
5. **Git flow:** build on `revamp`, the **user pushes**. Do not push or deploy without asking.

## Honesty rules — NON-NEGOTIABLE

The single source of truth for every factual claim is `CONTEXT` in
`C:\Users\athar\Downloads\Job-Search\Resumes-Organized\generate_resume.py`.
Full rules live in `C:\Users\athar\Downloads\Job-Search\job-apply-helper\CLAUDE.md`.

- Never fabricate. No CS degree. No 3+ years professional experience. Java / Spring Boot /
  Kubernetes / Jenkins are never claimed as owned.
- Email is `atharvaa6918@gmail.com`. **Not** `athutayade@gmail.com` (the old site had this
  wrong; `generate_resume.py` actively deducts ATS points for it).
- LinkedIn is `linkedin.com/in/atharvaa6`. GitHub is `github.com/atharvax28`.
- Freelance link is `axiomdesignstudio.vercel.app`. **`axiomdesigns.vercel.app` is DEAD** and
  is on `dead_links_never_use`, along with `msme-credit-platform`, `ai-lead-pipeline`,
  `mppt-solar-controller`, `nlp-mppt-selector`, `wireless-power-transfer`.
- The job pipeline cites **"500-750+ deduplicated leads a day"** from 1,000+ raw listings.
  Do not present 1,000+ as the lead count.
- The hero ledger is a **dramatisation of a typical run**, labelled as such on screen. It must
  never be dressed up as live telemetry.

## Design direction

The template's bones stay: white page, Clash Grotesk display type, giant uppercase headlines,
pinned GSAP scroll sections, Lenis smooth scroll, custom cursor.

**Thesis:** an engineer whose output is *systems that run when nobody is watching*.

**Signature element — the dedup ledger** (`src/components/DedupLedger.tsx`). The hero's left
half is a near-black panel running a mono ledger of listing rows. Duplicates get struck through
in the signal colour and dim out while counters tick 1,043 listings → 612 leads. It renders one
real algorithm of his literally. The same machine-black language carries into the project grid
via `PipelineDiagram.tsx` for projects that have no UI to screenshot.

**Tokens** (defined in `@theme` at the top of `src/app/globals.css`):

| Token | Value | Use |
|---|---|---|
| `--color-paper` | `#FFFFFF` | page |
| `--color-ink` | `#0A0A0A` | type |
| `--color-machine` | `#111111` | ledger panel, diagram cards, footer |
| `--color-muted` | `#71717A` | labels, eyebrows |
| `--color-signal` | `#FF4D00` | dedupe strike, live dot, hover **only** |
| `--color-rule` | `#E4E4E7` | hairlines |

`--color-signal` deliberately replaced the template's generic `#dc2626` red. Spend boldness in
one place: the ledger. Keep everything around it quiet.

**Type:** Clash Grotesk Variable (display, local font in `public/fonts/`) · Geist (body) ·
Geist Mono (all data, labels, metadata). The template forced Clash onto every element with
`!important`; that block was narrowed so body and mono can exist.

## File map

```
src/data/           profile.ts · projects.ts · experience.ts · stack.ts   <- all content lives here
src/app/layout.tsx  fonts, metadata, OG, Person JSON-LD
src/app/page.tsx    hero (HeroText + DedupLedger) then every section
src/app/projects/[slug]/page.tsx   server component, generateStaticParams over the 6 slugs
src/components/     DedupLedger · PipelineDiagram (both new)
                    AboutSection · ManifestoSection · ProjectsSection · ServicesSection
                    TechStackSection · ExperienceSection · ConnectSection · Footer
                    CustomCursor · SmoothScroll · ScrambledText · TextType (template, kept)
public/projects/    vri-cred.png · reference-hub.png (captured from the live sites)
public/resume.pdf   copied from "General Resumes/Atharva_Tayade_Software_Engineer.pdf"
```

Section order on the home page: hero → About(approach) → Projects → Services("What I build")
→ Manifesto → TechStack → Experience → Connect → TextType → Footer.

## Removed from the template (all belonged to its author, "ard.dev" / 0day-Ashish)

`src/app/leads/**`, `src/app/apply-manager/`, `src/app/api/**` (contact route needed a Google
service account; replaced with a `mailto:` composer in `ConnectSection`), the neko.js cat
script, his Person JSON-LD, the pacman contribution graph, the `count.getloli.com` counter in
`ManifestoSection`, the Buy-Me-A-Coffee CSS, `ui/focus-cards.tsx`, `lib/types.ts`, and the
`googleapis` / `@vercel/blob` / `radix-ui` / `shadcn` / `class-variance-authority` deps.

Also: `next.config.mjs` had `typescript.ignoreBuildErrors: true` — **removed**, so the build
actually type-checks. Do not put it back.

## Verified working

- `npm run build` clean with type checking on; 9 static pages, all 6 project routes prerender
- `npm run dev` → all routes return 200, **zero console errors, zero failed requests**
- `prefers-reduced-motion` honored: hero headline renders visible, ledger shows its settled
  end state, About skips the scrub, pinning is skipped
- `cursor: none` is now gated behind `(pointer: fine)` + a `.has-custom-cursor` class that
  `CustomCursor` toggles — touch and coarse-pointer users keep a real cursor

## Remaining work

1. **Strike-through width bug** (`DedupLedger.tsx`). The `[data-strike]` span is `w-full` of a
   `flex-1` container, so on a duplicate row it draws a rule across the whole column instead of
   just through the role text. Fix: make the role text an inline-block sized to its content and
   anchor the strike to that, not to the flex child.
2. **Excessive vertical whitespace.** The full page renders ~16,300px tall at 1440w. The pinned
   sections reserve a lot of scroll: `AboutSection` is a hard `300vh`, `ManifestoSection` is
   `WORDS.length * 30vh` (210vh), `ServicesSection` computes its own height in JS. There are
   large empty stretches, worst between the hero and Projects, and around "What I build".
   Tighten these before shipping.
3. **Project detail hero feels sparse** for the three `visual: "diagram"` projects — the
   diagram floats in a 62vh black field. Either shorten the header for that variant or give the
   diagram a bordered figure treatment so it reads as deliberate.
4. **Mobile pass not reviewed.** Screenshots were captured at 390×844 to the scratchpad but
   never inspected. Verify the hero split stacks correctly and the ledger stays legible.
5. **Freelance site screenshots** were never captured. Only the 2 `visual: "shot"` projects
   have images; the freelance builds appear as text links in `ExperienceSection`. Optional.
6. **Content audit not yet run.** Grep the built output for `athutayade`,
   `axiomdesigns.vercel.app`, `B.Tech`, `MPPT`, `solar`, `substation`, `MSEB`, `3+ years`,
   `Electrical` — all must return nothing.
7. **Nothing is committed.** Everything is `git add`-ed on `revamp`. Commit, then let the user
   push.

## Deploy gotcha

The Vercel project is currently configured to build a **Vite** app. After this merges, its
framework preset must be changed to **Next.js** in the Vercel dashboard or the deploy will
fail. That is a dashboard setting, not a repo change.

## Commands

```bash
cd C:/Users/athar/Downloads/Dev-Projects/atharva-portfolio
npm run dev     # localhost:3000
npm run build   # type-checks; must stay clean
```

Playwright is available for verification (Chrome extension was not connected):

```bash
cd C:/Users/athar/.claude/skills/playwright-skill/skills/playwright-skill
node run.js <absolute-path-to-script.js>
```
