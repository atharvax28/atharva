---
name: cloudflare-opennext-nextjs
description: Expert deployment guide for Next.js applications on Cloudflare using OpenNext (@opennextjs/cloudflare). Covers resolving peer dependency conflicts, Wrangler configuration, and App Router compatibility.
---

# Cloudflare OpenNext Next.js Deployment Workflow

This skill outlines the modern, officially recommended pathway for deploying Next.js applications (especially Next.js 14 and 15 using the App Router) to Cloudflare. 

Historically, developers used `@cloudflare/next-on-pages` (which deployed to Cloudflare Pages and used `.pages.dev` URLs). However, that package struggles with advanced Next.js App Router features (SSR, Server Actions, Edge caching) and frequently causes terminal `ERESOLVE` dependency conflicts. 

The new standard is **OpenNext (`@opennextjs/cloudflare`)**, which builds Next.js into a Cloudflare Worker (using `.workers.dev` URLs).

## 1. Initial Setup & Fixing ERESOLVE Errors

When migrating to OpenNext, you may encounter severe peer dependency errors (e.g., `ERESOLVE unable to resolve dependency tree`) due to mismatched `wrangler` and Next.js versions.

**Resolution Steps:**
1. Clean the environment: Remove `@cloudflare/next-on-pages`.
2. Install the correct dependencies, forcing resolution if necessary:
   ```bash
   npm install @opennextjs/cloudflare wrangler@latest --save-dev --legacy-peer-deps
   ```
3. Update `package.json` scripts:
   ```json
   "scripts": {
     "dev": "next dev",
     "build": "next build",
     "deploy": "opennextjs-cloudflare build && wrangler deploy"
   }
   ```

## 2. Wrangler Configuration (`wrangler.jsonc`)

OpenNext requires a specific `wrangler.jsonc` configuration to map the compiled `.open-next` output to the Cloudflare Worker runtime.

Create or update `wrangler.jsonc` in the project root:

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "your-project-name", // Must match your desired worker name
  "main": ".open-next/worker.js", // Crucial: Points to the OpenNext build output
  "compatibility_date": "2024-09-23", // Use a recent date
  "compatibility_flags": [
    "nodejs_compat" // Required for Next.js Node APIs
  ],
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS"
  }
}
```

## 3. Build and Deployment Pipeline

The deployment requires a two-step process: standard Next.js build, followed by the OpenNext compiler.

1. **Standard Build**: Run `npm run build`. This generates the `.next` directory.
2. **OpenNext Compilation**: Run `npx opennextjs-cloudflare build`. This packages the `.next` directory into a `.open-next/worker.js` file optimized for Cloudflare's V8 isolates.
3. **Deploy**: Run `npx wrangler deploy` (or `npm run deploy` if configured above).

## 4. URL Structure & Client Expectations

It is critical to explain to clients that because OpenNext deploys to **Cloudflare Workers** (not Pages), their default URL will be formatted as:
`[project-name].[account-subdomain].workers.dev`

**Key Client Communication:**
* **.pages.dev is gone**: They will not get a `.pages.dev` URL unless they revert to the buggy, deprecated `next-on-pages` system.
* **Removing the Account Subdomain**: The middle `[account-subdomain]` section (e.g., `athutayade`) cannot be removed from the free URL. It is required for global uniqueness.
* **Changing the Subdomain**: Clients can *rename* their account subdomain in the Cloudflare Dashboard (`Workers & Pages` -> `Change subdomain`).
* **Custom Domains**: The only way to get a perfectly clean URL (e.g., `my-site.com`) is to purchase a custom domain and map it to the Worker in the Cloudflare Dashboard.

## 5. Next.js Config Limitations

When deploying to Cloudflare Workers, certain `next.config.ts` options may need adjusting:
* `output: "standalone"` is fully supported and recommended by OpenNext.
* Ensure you remove old Cloudflare Pages configurations (like the `setupDevPlatform` plugin from `@cloudflare/next-on-pages`).
