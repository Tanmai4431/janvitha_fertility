# 🏛️ Welcome WebWorks Monorepo Starter Kit

This is a premium, high-performance monorepo boilerplate designed for agencies to build, optimize, and deploy client websites dynamically using AI agents. It features a decoupled frontend architecture powered by Astro, a headless CMS powered by Sanity Studio, and a Serverless Edge Database backend via Cloudflare.

---

## 🏛️ Project Architecture

This workspace is managed as a **pnpm monorepo** and orchestrated by **Turborepo** for caching and concurrent execution:

*   **Frontend (`apps/web`):** Built with **Astro (v7)**, **React 19**, **Tailwind CSS**, and **Shadcn UI**. Configured for Server SSR on **Cloudflare Workers**.
*   **Headless CMS (`apps/studio`):** Built with **Sanity Studio (v6)** to manage pages, posts, and visual assets. Deploys as static assets to **Cloudflare Pages**.
*   **Edge Database (`apps/web/db`):** Serverless SQL storage using **Cloudflare D1** to log lead submissions at the edge.
*   **Shared Configurations (`packages/config-typescript`):** Houses shared TypeScript configurations inherited by both workspaces to ensure full type-safety.

---

## ⚙️ Industrial-Grade Features & Integrations

This starter kit has been pre-configured with the following modular setups:

1.  **📨 Form Ingestion & Resend Pipeline:**
    *   Serverless endpoint `/api/submit-contact` validates inputs using Zod schemas.
    *   Honeypot protection filters bot spam before contacting email servers.
    *   Sender, recipient, cc, and subject templates are fully manageable from the CMS, falling back to [client.json](file:///c:/Users/tarak/welcome-webworks/www-starterkit/client.json) values if empty.
2.  **🗄️ Cloudflare D1 Edge Logging:**
    *   Structured lead logging via [schema.sql](file:///c:/Users/tarak/welcome-webworks/www-starterkit/apps/web/db/schema.sql).
    *   Database writes execute before email dispatches to prevent lead capture failure.
3.  **🧩 Modular Page Builder:**
    *   Dynamic catch-all router [[...slug].astro](file:///c:/Users/tarak/welcome-webworks/www-starterkit/apps/web/src/pages/[...slug].astro) queries pages from Sanity.
    *   [SectionMapper.astro](file:///c:/Users/tarak/welcome-webworks/www-starterkit/apps/web/src/components/SectionMapper.astro) resolves blocks (`heroSection`, `featuresSection`, `ctaSection`) into premium, responsive layout sections.
    *   Missing routes gracefully redirect to a premium [404.astro](file:///c:/Users/tarak/welcome-webworks/www-starterkit/apps/web/src/pages/404.astro) page.
4.  **🖼️ Responsive Asset Optimization:**
    *   `<SanityImage />` Astro component auto-calculates dimensions and aspect ratios to prevent Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS) errors.
    *   Auto-negotiates modern format conversions (`.webp`/`.avif`) and outputs responsive width lists based on client browser resolutions.
    *   Integrates next-gen responsive image rendering inside inline `PortableText` blocks for rich-text blogs.

---

## ⚙️ Setup & Installation

### Prerequisites
*   Node.js (>= 22.13.0)
*   pnpm (>= 11.6.0)

### Getting Started

1.  Clone the repository and run the setup from the root workspace:
    ```bash
    pnpm install
    ```
2.  Follow the **onboarding guided flow** using the setup-project agent skill, or run the following step manually to initialize your local database:
    ```bash
    pnpm --filter web exec wrangler d1 execute <database-name> --local --file=db/schema.sql
    ```

---

## 🧞 Development Commands

All tasks must be run from the root workspace:

| Command | Action |
| :--- | :--- |
| `pnpm dev` | Starts both Astro and Sanity dev servers concurrently. |
| `pnpm build` | Compiles builds for all workspaces. |
| `pnpm lint` | Runs code quality checks (`eslint` and `astro check`). |
| `pnpm typegen` | Extracts Sanity schema structures and compiles TS typings into `apps/web/src/types/sanity.ts` using absolute path mappings. |
| `pnpm --filter web <cmd>` | Runs a command specific to the Astro frontend (e.g. `pnpm --filter web add <pkg>`). |
| `pnpm --filter studio <cmd>` | Runs a command specific to the Sanity Studio (e.g. `pnpm --filter studio dev`). |

*   Astro Frontend: <http://localhost:4321/>
*   Sanity Studio CMS: <http://localhost:3333/>

---

## 🌐 Cloudflare Deployment Configurations

### 1. D1 Database (Edge SQL Setup)
1.  Log in to the Cloudflare dashboard and go to **D1 Databases**.
2.  Click **Create database**, name it, and copy its ID.
3.  Add the binding to [wrangler.toml](file:///c:/Users/tarak/welcome-webworks/www-starterkit/apps/web/wrangler.toml) in `apps/web`:
    ```toml
    [[d1_databases]]
    binding = "DB"
    database_name = "YOUR_DATABASE_NAME"
    database_id = "YOUR_DATABASE_ID"
    ```
4.  Run production migrations:
    ```bash
    pnpm --filter web exec wrangler d1 execute <database-name> --remote --file=db/schema.sql
    ```

### 2. Astro Frontend (`apps/web`) — Workers Deployment
Deploy this project as a **Worker** using the Workers with Assets layout:
*   **Root Directory:** `apps/web`
*   **Build Command:** `pnpm run build`
*   **Deploy Command:** `pnpm --filter web exec wrangler deploy`
*   **Environment Variables (Required):**
    *   `NODE_VERSION`: `22`
    *   `PUBLIC_SANITY_PROJECT_ID`: `giapn04l`
    *   `PUBLIC_SANITY_DATASET`: `production`

### 3. Sanity Studio CMS (`apps/studio`) — Pages Deployment
Deploy Sanity Studio as a static **Pages** application:
*   **Root Directory:** `/`
*   **Build Command:** `pnpm --filter studio build`
*   **Build Output Directory:** `apps/studio/dist`
*   **Deploy Command:** `pnpm --filter studio exec wrangler pages deploy dist`

---

## 🤖 AI Agent-Driven Client Onboarding

This starter kit is optimized for AI agent-driven page and content generation using a single configuration pipeline:
1.  **Onboarding Profile (`CLIENT.md`):** Write the Q&A responses, services, target audience, and legal documents for the client into [CLIENT.md](file:///c:/Users/tarak/welcome-webworks/www-starterkit/CLIENT.md).
2.  **Configuration Variables (`client.json`):** Extract core credentials and defaults (brand name, emails, domains, phone numbers, default SEO tags) into [client.json](file:///c:/Users/tarak/welcome-webworks/www-starterkit/client.json).
3.  **Dynamic Rendering:** Both the Astro template layout and the CMS workspace dynamically consume these variables. AI agents will read this data to build hero sections, about stories, and legal disclaimers.
