/**
 * Owned skills only, from CONTEXT["skills"] in generate_resume.py.
 * The hardware and control groups (ESP32, MOSFET, PWM, MPPT, KiCad, MATLAB/Simulink,
 * PI/PID) are deliberately excluded from this site.
 *
 * `where` names a project or role the tool was actually used on. No invented year counts.
 */

export interface Tech {
  name: string;
  kind: string;
  where: string;
}

export const stack: Tech[] = [
  { name: "Python", kind: "Language", where: "Pipelines, models" },
  { name: "TypeScript", kind: "Language", where: "Client platforms" },
  { name: "JavaScript", kind: "Language", where: "Client platforms" },
  { name: "SQL", kind: "Language", where: "Everywhere" },
  { name: "React", kind: "Frontend", where: "6 shipped platforms" },
  { name: "Next.js", kind: "Frontend", where: "Client platforms" },
  { name: "Tailwind CSS", kind: "Frontend", where: "Design systems" },
  { name: "D3.js", kind: "Frontend", where: "Reference hub" },
  { name: "FastAPI", kind: "Backend", where: "VRI Cred, OSINT" },
  { name: "Node.js", kind: "Backend", where: "Client backends" },
  { name: ".NET Core", kind: "Backend", where: "Sumati.io" },
  { name: "PostgreSQL", kind: "Database", where: "Every pipeline" },
  { name: "Redis", kind: "Database", where: "Dedupe, caching" },
  { name: "MongoDB", kind: "Database", where: "Client platforms" },
  { name: "Scrapy", kind: "Data", where: "Crawlers" },
  { name: "Playwright", kind: "Data", where: "JS-rendered sources" },
  { name: "pandas", kind: "Data", where: "Feature work" },
  { name: "XGBoost", kind: "ML", where: "VRI Cred, IPL" },
  { name: "PyTorch", kind: "ML", where: "OSINT classifier" },
  { name: "SHAP", kind: "ML", where: "Score explanations" },
  { name: "Claude API", kind: "ML", where: "Classification, drafting" },
  { name: "Docker", kind: "Infra", where: "Pipelines" },
  { name: "AWS", kind: "Infra", where: "EC2, RDS, S3" },
  { name: "Linux", kind: "Infra", where: "Everywhere" },
  { name: "Git", kind: "Infra", where: "Everywhere" },
  { name: "Vercel", kind: "Infra", where: "This site" },
];

/** Stacked titles in the "What I build" section. */
export const disciplines = [
  "WEB DEVELOPMENT",
  "UX/UI DESIGN",
  "APP DEVELOPMENT",
  "BRAND DESIGN",
];
