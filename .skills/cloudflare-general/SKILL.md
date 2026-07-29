---
name: cloudflare-general
description: Core concepts and infrastructure patterns for the Cloudflare Developer Ecosystem. Covers the differences between Pages and Workers, URL structures, subdomains, and custom domains.
---

# Cloudflare General Ecosystem Guide

This skill covers the foundational concepts of deploying and hosting applications on Cloudflare. It is essential for understanding how Cloudflare structures its URLs and products.

## 1. Cloudflare Pages vs. Cloudflare Workers

Cloudflare has two primary hosting products that overlap but serve different primary purposes:

*   **Cloudflare Pages**: Originally designed for static sites and Jamstack applications (React, Vue, plain HTML). It hooks directly into GitHub for CI/CD and supports edge rendering via "Pages Functions".
*   **Cloudflare Workers**: A serverless execution environment that runs across Cloudflare's global edge network. It is built for compute-heavy tasks, APIs, and modern SSR frameworks (like Next.js via OpenNext).

## 2. URL Structures & Subdomains

Depending on which product you deploy to, Cloudflare issues a different default free URL.

### Cloudflare Pages URLs
Pages projects get a clean, two-part URL:
`[project-name].pages.dev`
*(Example: `axiomdesignstudio.pages.dev`)*

### Cloudflare Workers URLs
Workers projects require a three-part URL to guarantee global uniqueness across all users:
`[worker-name].[account-subdomain].workers.dev`
*(Example: `atharvadev.athutayade.workers.dev`)*

## 3. Managing the Account Subdomain

For Worker URLs, the middle section (`[account-subdomain]`) is permanently attached to your Cloudflare account. 
*   **You cannot remove it** from a free `.workers.dev` URL.
*   **You CAN change it** to something cleaner (e.g., changing `athutayade` to `atharva`).
*   **How to change:** Go to the Cloudflare Dashboard -> **Workers & Pages** -> Look for "Your subdomain" on the right sidebar -> Click **Change**.
*   *Warning*: Changing the account subdomain changes the URL for *every* Worker attached to that Cloudflare account.

## 4. Custom Domains

The only way to remove the `.workers.dev` or `.pages.dev` suffix is to attach a custom domain (e.g., `atharva.dev`).
1.  You must purchase the domain from a registrar (Cloudflare, Namecheap, etc.).
2.  In the Cloudflare Dashboard, go to your project (Pages or Worker).
3.  Go to the **Custom Domains** tab.
4.  Click **Set up a custom domain** and follow the prompts. Cloudflare automatically handles the SSL certificate and DNS routing.

## 5. Wrangler CLI

`wrangler` is the official command-line tool for Cloudflare. 
*   `wrangler deploy` — Deploys a Cloudflare Worker (uses `wrangler.jsonc` or `wrangler.toml`).
*   `wrangler pages deploy` — Deploys a Cloudflare Pages project.
*   Always ensure your `wrangler` CLI is kept up to date to avoid deployment errors with newer frameworks.
