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
    id: "02",
    name: "JOB PIPELINE",
    slug: "job-aggregation-pipeline",
    year: "2026",
    description:
      "A distributed scraper across 50+ job portals that turns 1,000+ raw listings into 500-750+ deduplicated leads a day.",
    longDescription:
      "Fifty-odd company job portals, no two built the same way: static HTML, JavaScript-rendered SPAs, paginated JSON APIs. The crawler detects which it is dealing with and dispatches the right strategy, so adding a source does not mean writing a new scraper.\n\nVolume was never the hard part. Deduplication was. The same role gets posted to a company board, an aggregator, and a recruiter feed under three different titles, and counting it three times makes the output useless. A three-layer Redis dedupe collapses 1,000+ daily listings down to 500-750+ genuinely distinct leads, which PostgreSQL then tracks through their lifecycle. The Claude API scores each one for relevance and drafts the outreach. APScheduler runs the whole cycle unattended.",
    visual: "diagram",
    stages: ["crawl", "extract", "dedupe", "classify", "queue"],
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
    visual: "diagram",
    stages: ["fingerprint", "route", "fetch", "retry", "normalise"],
    tags: ["Scrapy", "Playwright", "PostgreSQL", "Docker"],
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
    id: "05",
    name: "OSINT AGGREGATOR",
    slug: "osint-aggregator",
    year: "2025",
    description:
      "DNS, WHOIS, and public-record aggregation with a PyTorch classifier labelling signals at 89% accuracy.",
    longDescription:
      "Open-source intelligence is scattered across DNS records, WHOIS registries, and public databases that share no format and no schema. A Scrapy spider network with custom middleware collects from all of them, handling the rate limiting and retries each source demands.\n\nA PyTorch classifier then labels the collected signals, reaching 89% accuracy on a held-out test set. Everything lands in PostgreSQL with features normalised for model input.",
    visual: "diagram",
    stages: ["dns", "whois", "public db", "normalise", "classify"],
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
    visual: "diagram",
    stages: ["collect", "clean", "engineer", "train", "calibrate"],
    tags: ["scikit-learn", "XGBoost", "pandas", "Python"],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
