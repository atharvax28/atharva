/**
 * Canonical facts. Mirrors CONTEXT["identity"] / ["education"] in
 * Resumes-Organized/generate_resume.py, which stays the single source of truth.
 * Do not add a claim here that does not exist there.
 */

export const profile = {
  name: "Atharva Tayade",
  role: "Software engineer",
  location: "Mumbai, India",
  email: "atharvaa6918@gmail.com",
  phone: "+91 8369197502",
  linkedin: "https://linkedin.com/in/atharvaa6",
  linkedinLabel: "linkedin.com/in/atharvaa6",
  github: "https://github.com/atharvax28",
  githubLabel: "github.com/atharvax28",
  site: "https://atharvax1.vercel.app",
  resume: "/Atharva_Tayade_Software_Engineer.pdf",
} as const;

export const education = {
  degree: "Bachelor of Engineering (B.E.)",
  institution: "Fr. C. Rodrigues Institute of Technology (FCRIT)",
  university: "University of Mumbai",
  graduation: "May 2026",
} as const;

/** Hero standfirst. Every number below is carried over from the resume context. */
export const intro =
  "I build systems that keep running when nobody is watching them. Pipelines, scrapers, and scoring models, plus the web platforms they sit behind.";

export const manifestoWords = ["AUTOMATE", "THE", "PART", "YOU", "KEEP", "DOING", "TWICE"];
