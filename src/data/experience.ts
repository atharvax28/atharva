/**
 * Mirrors CONTEXT["experience"] in generate_resume.py, software track only.
 * The MSEB substation internship is deliberately excluded from this site.
 */

export interface Role {
  company: string;
  title: string;
  dates: string;
  location: string;
  bullets: string[];
}

export const experience: Role[] = [
  {
    company: "Freelance",
    title: "Full-Stack Developer",
    dates: "2023 — Present",
    location: "Mumbai",
    bullets: [
      "Built and shipped 6 web platforms (e-commerce, SaaS, client portals) on React/Next.js frontends with FastAPI and Node.js behind them",
      "Set up Stripe subscription billing, JWT authentication, and role-based access control across 3 client projects",
      "Integrated ML inference endpoints into 2 client products",
    ],
  },
  {
    company: "Sumati.io",
    title: "Software Engineering Intern",
    dates: "Jan — Mar 2024",
    location: "Remote",
    bullets: [
      "Rebuilt the policy module UI in React with component-level code splitting; page load time dropped 45%, measured in Lighthouse",
      "Added response caching to .NET Core API endpoints, cutting redundant backend calls about 60% on the highest-traffic policy routes",
      "Built a monitoring dashboard tracking request latency, error rates, and service health across 4 microservices",
    ],
  },
];

/** Live client sites, in the ranking order fixed in CONTEXT["freelance_links"]. */
export const freelance = [
  { label: "axiomdesignstudio.vercel.app", url: "https://axiomdesignstudio.vercel.app" },
  { label: "mitali-io.vercel.app", url: "https://mitali-io.vercel.app" },
  { label: "ath-framework.vercel.app", url: "https://ath-framework.vercel.app" },
  { label: "pustakalayxo.vercel.app", url: "https://pustakalayxo.vercel.app" },
  { label: "strokesdesigns.netlify.app", url: "https://strokesdesigns.netlify.app" },
  { label: "kofi-cart.vercel.app", url: "https://kofi-cart.vercel.app" },
  { label: "aakankshaxtayade.vercel.app", url: "https://aakankshaxtayade.vercel.app/login" },
];
