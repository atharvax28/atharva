export interface Project {
  id: string;
  name: string;
  slug: string;
  year: string;
  description: string;
  longDescription?: string;
  /** "shot" renders a screenshot; "diagram" renders a generated pipeline card. */
  visual: "shot" | "diagram";
  image?: string;
  /** Stage labels for the generated diagram card. */
  stages?: string[];
  websiteUrl?: string;
  githubUrl?: string;
  tags: string[];
  /** Renders an "ongoing" chip on the card. Omit for finished work. */
  status?: "ongoing";
  /** Key into ProjectCover's icon map, for projects with no usable screenshot. */
  coverIcon?: string;
  /** A graphic mark shown at half size on paper, in place of a screenshot. */
  coverMark?: string;
}

/**
 * Software work only. The MPPT solar controller, resonant wireless power transfer,
 * ML MPPT selector, and the MSEB substation internship are deliberately excluded.
 *
 * Links are restricted to CONTEXT["verified_links"] in generate_resume.py. Anything in
 * dead_links_never_use (msme-credit-platform, ai-lead-pipeline, mppt-solar-controller,
 * nlp-mppt-selector, wireless-power-transfer, axiomdesigns.vercel.app) must never appear.
 */
export const projects: Project[] = [
  {
    id: "10",
    name: "Bluero Bombay",
    slug: "bluero-bombay",
    year: "2026",
    status: "ongoing",
    description:
      "Storefront for Bombay's first Turkish kumpir bar — menu, build-your-own, and where the stall turns up next.",
    longDescription:
      "A storefront for a food brand that does not have a fixed address yet: the menu, a build-your-own cup flow, the pop-up schedule, and the brand story on one page.\n\nThe rollout is still in progress — pop-up stalls across Mumbai now, with a first permanent store opening in Bandra — so the site is built to keep changing rather than to be finished. React on Vite, deployed on Vercel.",
    visual: "shot",
    image: "/projects/bluero.webp",
    websiteUrl: "https://bluero-bombay.vercel.app",
    tags: ["React", "Vite", "Freelance"],
  },
  {
    id: "07",
    name: "Axiom Designs",
    slug: "axiom-designs",
    year: "2025",
    description: "Freelance web design and development studio.",
    longDescription: "A premium freelance web design studio focusing on high-performance, conversion-optimised websites for modern brands.\n\nNote: Password for all locked websites is ace08.",
    visual: "shot",
    image: "/projects/axiom.png",
    websiteUrl: "https://axiomdesignstudio.vercel.app",
    tags: ["Freelance", "React", "Next.js"],
  },
  {
    id: "01",
    name: "VRI CRED",
    slug: "vri-cred",
    year: "2026",
    description:
      "MSME credit scoring for NBFC underwriters, with an explanation attached to every score.",
    longDescription:
      "Underwriters will not act on a number they cannot defend, so this scores an MSME and then shows its working. An XGBoost model trained on GST filings, credit bureau data, and bank statements produces the score; SHAP values break down which inputs moved it and by how much; the Claude API turns that breakdown into the written credit report an underwriter actually files.\n\nIt runs on AWS EC2, RDS, and S3 with Redis in front of the read path, holding P99 response time under 200 ms. Built as a working demo rather than a product with paying customers.",
    visual: "shot",
    image: "/projects/vri-cred.png",
    websiteUrl: "https://vricred1.netlify.app",
    githubUrl: "https://github.com/atharvax28/vri.cred",
    tags: ["FastAPI", "XGBoost", "SHAP", "AWS"],
  },
  {
    id: "04",
    name: "REFERENCE HUB",
    slug: "developer-reference-hub",
    year: "2025",
    description:
      "500+ developer reference entries, searchable, related by a D3.js graph, and never manually updated.",
    longDescription:
      "A searchable hub of 500+ developer reference entries where the relationships between them are the point. D3.js renders those relationships as a navigable graph rather than a list, so you find the adjacent thing you did not know to search for.\n\nThe part worth keeping is that nobody maintains it. A Scrapy ETL job refreshes the entries on a schedule, which is what stops a reference site from rotting three months after launch.",
    visual: "shot",
    image: "/projects/reference-hub.png",
    websiteUrl: "https://ath-framework.vercel.app",
    githubUrl: "https://github.com/atharvax28/ath-framework",
    tags: ["React", "D3.js", "Scrapy", "PostgreSQL"],
  },
  {
    id: "08",
    name: "Aakanksha Tayade",
    slug: "aakanksha-tayade",
    year: "2025",
    description: "Personal portfolio and professional showcase.",
    longDescription: "A custom portfolio design with interactive elements and optimized performance.\n\nNote: Password for all locked websites is ace08.",
    visual: "shot",
    websiteUrl: "https://aakankshaxtayade.vercel.app/login",
    tags: ["Freelance", "React", "Design"],
    coverIcon: "user-round",
  },
  {
    id: "09",
    name: "Strokes Designs",
    slug: "strokes-designs",
    year: "2025",
    description: "Creative agency portfolio and services platform.",
    longDescription: "A creative platform designed to showcase digital art and design services.\n\nNote: Password for all locked websites is ace08.",
    visual: "shot",
    websiteUrl: "https://strokesdesigns.netlify.app",
    tags: ["Freelance", "UI/UX", "Next.js"],
    coverIcon: "pen-tool",
  },
  {
    id: "02",
    name: "JOB PIPELINE",
    slug: "job-aggregation-pipeline",
    year: "2026",
    description:
      "A distributed scraper across 50+ job portals that turns 1,000+ raw listings into 500-750+ deduplicated leads a day.",
    longDescription:
      "Fifty-odd company job portals, no two built the same way: static HTML, JavaScript-rendered SPAs, paginated JSON APIs. The crawler detects which it is dealing with and dispatches the right strategy, so adding a source does not mean writing a new scraper.\n\nVolume was never the hard part. Deduplication was. The same role gets posted to a company board, an aggregator, and a recruiter feed under three different titles, and counting it three times makes the output useless. A three-layer Redis dedupe collapses 1,000+ daily listings down to 500-750+ genuinely distinct leads, which PostgreSQL then tracks through their lifecycle. The Claude API scores each one for relevance and drafts the outreach. APScheduler runs the whole cycle unattended.",
    visual: "shot",
    coverMark: "/projects/marks/wave.webp",
    tags: ["Scrapy", "Playwright", "Claude API", "Redis"],
  },
  {
    id: "03",
    name: "SCRAPING ENGINE",
    slug: "adaptive-scraping-engine",
    year: "2025",
    description:
      "A site-adaptive crawler holding about a 95% success rate across mixed, hostile sources.",
    longDescription:
      "The extraction layer underneath the job pipeline, kept separate because the problem generalises. It fingerprints a target before crawling it and routes to the matching strategy: Scrapy for static HTML, Playwright or Selenium for JavaScript-rendered pages, direct endpoint reads for paginated APIs.\n\nProxy rotation, rate limiting, and exponential-backoff retries keep it alive against sources that would rather it were not. It holds about a 95% success rate across its targets, and a deduplicating ETL layer normalises everything into PostgreSQL.",
    visual: "shot",
    coverMark: "/projects/marks/asterisk.webp",
    tags: ["Scrapy", "Playwright", "PostgreSQL", "Docker"],
  },
  {
    id: "05",
    name: "OSINT AGGREGATOR",
    slug: "osint-aggregator",
    year: "2025",
    description:
      "DNS, WHOIS, and public-record aggregation with a PyTorch classifier labelling signals at 89% accuracy.",
    longDescription:
      "Open-source intelligence is scattered across DNS records, WHOIS registries, and public databases that share no format and no schema. A Scrapy spider network with custom middleware collects from all of them, handling the rate limiting and retries each source demands.\n\nA PyTorch classifier then labels the collected signals, reaching 89% accuracy on a held-out test set. Everything lands in PostgreSQL with features normalised for model input.",
    visual: "shot",
    coverMark: "/projects/marks/star.webp",
    githubUrl: "https://github.com/atharvax28/OSINT-Framework",
    tags: ["Scrapy", "PyTorch", "FastAPI", "React"],
  },
  {
    id: "06",
    name: "IPL PREDICTION",
    slug: "ipl-outcome-prediction",
    year: "2025",
    description:
      "A gradient boosting model on match data, built as a study in calibration rather than a chase for accuracy.",
    longDescription:
      "A gradient boosting model predicting IPL match outcomes from historical data, taken end to end: collection, cleaning, and feature engineering.\n\nThe interesting result was not the accuracy number. Sports data is noisy and low-signal, and a model that looks confident on it is usually wrong in a way that matters. So this became a study in calibration and in the limits of the data, comparing feature sets against each other rather than optimising for a headline figure.",
    visual: "shot",
    coverMark: "/projects/marks/flower.webp",
    tags: ["scikit-learn", "XGBoost", "pandas", "Python"],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
