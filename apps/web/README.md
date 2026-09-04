# Astro Frontend Web Package (`apps/web`)

This is the user-facing frontend of your monorepo, powered by Astro v7, Tailwind CSS, React 19, and the modern `@astrojs/cloudflare` server-side rendering (SSR) adapter.

---

## 🚀 Local Development Commands

Always run these commands from the **root workspace** using pnpm filters:

| Command | Action |
| :--- | :--- |
| `pnpm --filter web dev` | Starts the Astro development server at `http://localhost:4321` |
| `pnpm --filter web build` | Compiles the Astro project into `apps/web/dist/` |
| `pnpm --filter web lint` | Runs `astro check` diagnostics and linting |

---

## 🌐 Cloudflare Deployment Configurations

Because this package uses modern SSR with Astro v7, the build output is generated in the **Workers with Assets** layout (`dist/client/` and `dist/server/entry.mjs`)

### 1. Astro Frontend (`apps/web`) — Deploying as a Cloudflare Worker
To deploy the frontend, you must select the **Workers** tab (not Pages) in your Cloudflare dashboard:

*   **Deployment Pipeline:** Cloudflare Workers (Git Integration)
*   **Path (Root Directory):** `apps/web`
*   **Build Command:** `pnpm run build`
*   **Deploy Command:** `npx wrangler deploy`
*   **Environment Variables (Required):**
*   `NODE_VERSION`: `22` *(Forces Cloudflare to compile with Node.js v22.13.0+ to satisfy pnpm v11 requirements)*
*   `PUBLIC_SANITY_PROJECT_ID`: `giapn04l` *(Your Sanity project ID)*
*   `PUBLIC_SANITY_DATASET`: `production`

---

### 2. Sanity Studio CMS (`apps/studio`) — Deploying as Cloudflare Pages
Because the Sanity Studio is a purely static React application (no SSR backend code), it should be deployed using the traditional **Pages** tab:

*   **Deployment Pipeline:** Cloudflare Pages (Git Integration)
*   **Root Directory:** `/`
*   **Build Command:** `pnpm --filter studio build`
*   **Build Output Directory:** `apps/studio/dist`
*   **Environment Variables:** None required *(runs statically on the edge)*
