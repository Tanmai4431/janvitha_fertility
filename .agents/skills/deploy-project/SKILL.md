---
name: deploy-project
description: Trigger this skill to run the comprehensive, step-by-step production deployment setup guide for Cloudflare Workers, Cloudflare Pages, D1 Database, and Sanity Studio.
---

# Production Deployment Setup & Cloudflare CI/CD Guide

When the user runs the `deploy-project` command (or `/deploy-project`), the agent must guide them step-by-step through deploying their completed website to Cloudflare. Do not rush; guide the developer through each verification step and wait for their confirmation.

---

## 📊 Visual Progress Tracker
At the beginning of each step's response, display the visual progress indicator:
- **Step 1: Code Freeze & Git Repository Push** | `[██░░░░░░░░] 20%`
- **Step 2: Cloudflare D1 Edge Database Setup** | `[████░░░░░░] 40%`
- **Step 3: Frontend Deployment (Cloudflare Worker)** | `[██████░░░░] 60%`
- **Step 4: Sanity Studio Deployment (Cloudflare Pages)** | `[████████░░] 80%`
- **Step 5: CORS, Custom Domains & Live Launch Verification** | `[██████████] 100%`

---

## 🚶 Step-by-Step Deployment Instructions

### Step 1: Code Freeze & Git Repository Push
1. Output progress bar: `[██░░░░░░░░] 20%`
2. **Execute Final Local Quality & Build Checks**:
   - Run lint check:
     ```bash
     pnpm lint
     ```
   - Run Sanity type generation:
     ```bash
     pnpm typegen
     ```
   - Run production build test:
     ```bash
     pnpm build
     ```
3. **Commit & Push to Remote GitHub Repository**:
   - Instruct the developer to stage, commit, and push all local unstaged files:
     ```bash
     git add .
     git commit -m "feat: complete website build ready for production deployment"
     git push origin main
     ```
4. Confirm that the remote repository is up to date before moving to Step 2.

### Step 2: Cloudflare D1 Edge Database Setup & Binding
1. Output progress bar: `[████░░░░░░] 40%`
2. **Create D1 Database in Cloudflare Dashboard**:
   - Log into the [Cloudflare Dashboard](https://dash.cloudflare.com).
   - Navigate to **Workers & Pages > D1 SQL Database**.
   - Click **Create Database**.
   - Name the database (e.g. `www-starterkit-db` or `welcome-webworks-db`).
3. **Initialize Database Schema (Manual SQL Execution)**:
   - Open the newly created D1 database console.
   - Click on the **Console** or **Query** tab.
   - Open [schema.sql](file:///c:/Users/tarak/welcome-webworks/Welcome%20WebWorks/apps/web/db/schema.sql) from the repository, copy all SQL statements, paste them into the D1 Console, and click **Execute**.
   - Verify that the `leads` table and indexes are created successfully.
4. **D1 Variable Binding Note**:
   - Remind the developer that once the Frontend Worker is created in Step 3, they MUST bind this D1 database to the Worker under **Settings > Variables > D1 Database Bindings** using the variable name **`DB`**.

### Step 3: Frontend Deployment (Cloudflare Worker via GitHub CI/CD)
1. Output progress bar: `[██████░░░░] 60%`
2. **Connect GitHub Repository to Cloudflare Workers**:
   - In **Cloudflare Dashboard**, navigate to **Workers & Pages > Create > Connect to Git**.
   - Authorize GitHub access if needed and select the repository.
3. **Configure Build Settings (Field-by-Field Matrix)**:
   - **Project Name**: Name of your Worker project (e.g. `clientname-web` or `welcome-webworks-web`)
   - **Build Command**: `pnpm --filter web build`
   - **Deploy Command**: `npx wrangler deploy` *(Leave default)*
   - **Builds for non-production branches**: Checked *(Leave default)*
   - **Non-production branch deploy command**: `npx wrangler versions upload` *(Leave default)*
   - **Root Directory**: `/` *(Leave default as root)*
   - **API Token**: Select existing Cloudflare Workers API Token from the dropdown (or click "Create New Token" if first time)
4. **Configure Initial Environment Variables (CRITICAL for 100% First-Time Build Success)**:
   - **Add these variables BEFORE clicking "Save and Deploy"** under **Variables & Secrets**:
     - `NODE_VERSION`: `22.16.0` (Enforces modern Node 22 build runtime)
     - `PUBLIC_SANITY_PROJECT_ID`: Your client's new Sanity Project ID (e.g. `e894k7c2`)
     - `PUBLIC_SANITY_DATASET`: `production`
     - `PUBLIC_SANITY_USE_CDN`: `true` (Enables high-speed Sanity Edge CDN)
     - *(Note: `RESEND_API_KEY` is managed dynamically in Sanity Studio CMS under `siteSettings.resendApiKey` for zero-downtime key rotation, so manual environment variable entry is optional!)*
5. **Bind D1 Database (Cloudflare Bindings Tab)**:
   - Navigate to **Settings > Bindings** tab in your Worker project dashboard.
   - Click **Add binding** and select **D1 Database** from the external services list.
   - Set **Variable Name**: `DB`
   - Under **D1 Database**, select your database created in Step 2 (`welcome-webworks-db`) from the dropdown menu.
   - Click **Connect** (or **Save and deploy**).
6. Save and deploy. Cloudflare CI/CD will complete the initial build cleanly on the first try.

### Step 4: Sanity Studio Deployment (Cloudflare Pages SPA)
1. Output progress bar: `[████████░░] 80%`
2. **Connect GitHub Repository to Cloudflare Pages**:
   - In **Cloudflare Dashboard**, navigate to **Workers & Pages > Create > Pages > Connect to Git**.
   - Select your repository.
3. **Configure Build Settings**:
   - **Build Command**: `pnpm --filter studio build`
   - **Build Output Directory**: `apps/studio/dist`
   - **Root Directory**: `/` (Leave as root)
4. **Configure Environment Variables**:
   - Add the following variables under Page settings:
     - `SANITY_STUDIO_PROJECT_ID`: Your Sanity Project ID (e.g. `e894k7c2`)
     - `SANITY_STUDIO_DATASET`: `production`
5. Save and deploy.

### Step 5: CORS, Custom Domains & Live Launch Verification
1. Output progress bar: `[██████████] 100%`
2. **Configure Sanity Studio CORS Origins**:
   - Log into your Sanity Management Console at [sanity.io/manage](https://www.sanity.io/manage).
   - Select your project (`e894k7c2`).
   - Navigate to **API > CORS Origins**.
   - Click **Add CORS Origin**:
     - Origin: Enter your production Cloudflare Worker URL (e.g. `https://welcomewebworks.pages.dev` or `https://www.welcomewebworks.com`).
     - Check **Allow credentials**.
3. **Custom Domain Setup (Optional / Recommended)**:
   - For Frontend Worker: In Cloudflare Worker dashboard, go to **Settings > Domains & Routes**, click **Add > Custom Domain**, and attach your domain (e.g. `www.welcomewebworks.com`).
   - For CMS Studio Pages: In Cloudflare Pages dashboard, go to **Custom domains**, click **Set up a custom domain**, and attach `studio.welcomewebworks.com` or `cms.welcomewebworks.com`.
4. **Final Live Endpoints Checklist**:
   - Check Homepage: `https://<your-domain>.com`
   - Check Studio CMS: `https://<studio-domain>.com`
   - Check SEO endpoints: `/robots.txt`, `/sitemap.xml`, `/rss.xml`, `/api/og.png`, `/manifest.webmanifest`
   - Test Lead Form Submission: Submit test form on live site and verify entry in Cloudflare D1 Console.
