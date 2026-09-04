# 🏛️ Welcome WebWorks Monorepo Developer Guidelines & Rules

This document serves as the master engineering manual, onboarding guide, and behavioral constraint directory for developers and AI agents working in this repository.

---

## 📁 Repository Directory Structure

```text
www-starterkit/
├── apps/
│   ├── web/                     # Astro Frontend (Astro v7, React 19, Tailwind CSS, Shadcn UI)
│   └── studio/                  # Sanity Studio CMS (Sanity v6, React 19, Styled-Components)
├── packages/
│   └── config-typescript/       # Shared TypeScript configurations
├── client.json                  # Business variables (Unified source of truth)
├── CLIENT.md                    # Client onboarding brief and archetype questionnaire
├── pnpm-workspace.yaml          # pnpm workspace definition and binary allow-lists
├── turbo.json                   # Turborepo task pipeline configuration
└── AGENTS.md / CLAUDE.md        # Hardlinked developer rules and constraints
```

---

## 💻 Tech Stack & Environment Specifications

| Component | Technology | Version / Configuration | Detail |
| :--- | :--- | :--- | :--- |
| **Workspace Runtime** | Node.js | `>=22.13.0` | Enforces modern Node runtimes |
| **Package Manager** | pnpm | `11.6.0` | Monorepo package orchestrator |
| **Task Orchestration** | Turborepo | `^2.10.4` | Caches build/lint tasks |
| **Frontend Framework** | Astro | `^7.0.7` | Running in Server SSR mode |
| **UI Library** | React | `^19.2.7` | Frontend and CMS interactive runtime |
| **Styling** | Tailwind CSS | `^3.4.19` | Configured with CSS variables for Shadcn UI |
| **Headless CMS** | Sanity Studio | `^6.5.0` | Schema types: `post`, `seo`, `page`, `homePage`, `siteSettings` |

---

## 📖 Chapter 1: Quick-Start Bootstrapping Workflow

When launching a new project instance from a downloaded GitHub zip:
1. **Directory Anchor**: All workspace commands must be executed from the root directory (`www-starterkit/`).
2. **Windows Symlink & Permission Compatibility**:
   On Windows systems, `pnpm install` may fail due to symbolic link creation permissions (`ERR_PNPM_CREATING_SYMLINK`). To resolve this without requiring Developer Mode or Admin rights, ensure there is an `.npmrc` file in the workspace root containing:
   ```ini
   node-linker=hoisted
   ```
   This configuration forces `pnpm` to use a flat directory structure without symlinks, preventing installation errors.
3. **Clean Install**: Execute the package installer to link workspaces and resolve dependencies:
   ```bash
   pnpm install
   ```
   *If prompted to reinstall or delete cached folders, select `Y` (Yes).*
4. **Environment Setup**: Verify that environment files (`apps/web/.env` and `apps/studio/.env`) are present with appropriate Sanity keys matching the workspace configurations.
5. **Local Verification**: Start the parallel development servers via:
   ```bash
   pnpm dev
   ```
   Verify local accessibility at `http://localhost:4321` (Frontend) and `http://localhost:3333` (CMS Studio).

---

## 📖 Chapter 2: Automated AI Onboarding Pipeline

This repository uses a structured process to automatically parse raw client profiles into active variables:
1. **Raw Ingestion**: When given raw client notes, Q&A responses, or interview transcripts:
   - Organize and populate the markdown file [CLIENT.md](file:///c:/Users/tarak/welcome-webworks/www-starterkit/CLIENT.md) following the archetype questionnaire structure.
   - Extract and populate key values (business details, contact details, socials, domains, and default SEO values) in [client.json](file:///c:/Users/tarak/welcome-webworks/www-starterkit/client.json).
2. **Unified Data Usage**: All page sections, header navigations, footer legal lines, forms, and metadata elements on the site **must** consume these details dynamically from [client.json](file:///c:/Users/tarak/welcome-webworks/www-starterkit/client.json). **Do not hardcode client strings in frontend markup.**

---

## 📖 Chapter 3: Design System & Styling Ingestion Manual

This starter kit is designed to ingest detailed consumer design specifications (e.g., brand guides, style keys, or documents like the Airbnb typography and color specs) and apply them globally using a unified structured format:

### 1. Standard Design System Template Format
When prompting the user for design specs or ingesting a visual design file during project setup, the agent **MUST** request and structure the input following this exact specification format:
```text
---
name: [Client / Project Name]
source: [brand direction / reference site / design brief]
extracted: [YYYY-MM-DD]
colors:
  background: "#FCFBFA"
  foreground: "#161616"
  primary: "#C60909"
  primary-foreground: "#FFFFFF"
  primary-hover: "#A80707"
  accent-gold: "#F6BE00"
  accent-gold-hover: "#D9A400"
  surface: "#FFFFFF"
  surface-wash: "#FCEDED"
  slate: "#5B5B60"
  slate-soft: "#8A8A90"
  border: "#ECE7E6"
  glass-border: "rgba(198,9,9,0.14)"
fonts:
  heading: "Cabinet Grotesk"
  body: "Inter"
  mono: "JetBrains Mono"
---

# Design System: [Project Name]
## 1. Visual Theme & Atmosphere
## 2. Color Palette & Roles
## 3. Typography Rules (Families, Hierarchy, Weights, Spacing)
## 4. Component Stylings (Buttons, Badges, Glassmorphic Cards, Navigation, Inputs)
## 5. Layout Principles (Grid, Whitespace, Alignment)
## 6. Design System Notes for Build/Generation
```

### 2. Ingesting Design Tokens
When a design system specification is provided:
- **Colors & Canvas**: Define HSL variables in [global.css](file:///c:/Users/tarak/welcome-webworks/Welcome%20WebWorks/apps/web/src/styles/global.css) corresponding to the new theme (e.g., `--primary` for Brand Red `#C60909`, `--accent` for Signature Gold `#F6BE00`, `--background` for Warm Canvas `#FCFBFA`, `--foreground` for Ink `#161616`).
- **Tailwind Mapping**: Map these CSS variables within [tailwind.config.mjs](file:///c:/Users/tarak/welcome-webworks/Welcome%20WebWorks/apps/web/tailwind.config.mjs) under colors, fonts (`heading`, `sans`, `mono`), shadows (`shadow-brand-glow`, `shadow-glass-glow`), and border radius presets (`sleek` 8px, `modern` 20px, `pill` 999px).
- **Borders & Radii**: Map custom radius values (such as `8px` for buttons, `14px` for property cards, or `32px` for headers) using HSL variables `--radius` or extended tailwind border-radius rules.
- **Shadows**: Configure elevation styles using standard shadow overrides in the Tailwind configuration or global stylesheet rules.

### 3. Component Refactoring
Apply styling tokens directly to the layout components inside `apps/web/src/`:
- **Header & Navigation**: Set fixed top-nav heights (e.g., `80px`), hair-line borders (`1px` borders), and style link segments (`product-tab-active` outlines or indicators).
- **Buttons & Inputs**: Apply shape rules (`button-primary`, `button-pill`, `button-secondary`) and focus states (e.g., border thickening on input focus without outline rings).
- **Layout Grids**: Arrange cards (property cards, columns) into dense responsive grids that adjust column counts per breakpoint (Mobile `< 744px`, Tablet `744–1128px`, Desktop `1128–1440px`, Wide `> 1440px`).
- **Typography & Scale**: Load specific font stacks (such as *Inter* or custom variable families) inside the layout header [Layout.astro](file:///c:/Users/tarak/welcome-webworks/www-starterkit/apps/web/src/layouts/Layout.astro) and enforce headline weight standards (e.g., modest display weights of 500-700).

---

## 📖 Chapter 4: Dynamic & Agentic SEO Integration Manual

To support dynamic metadata generation, schema structured data, and search engine discoverability:

### 1. Metadata Schema Fallbacks
When rendering pages or dynamic blog posts, resolved metadata elements must adhere to the following fallback order to guarantee a premium SEO presentation:
- **Meta Title**: Use Sanity custom `seo.title` field $\rightarrow$ Fallback to page `title` $\rightarrow$ Fallback to dynamic custom CMS `siteSettings.title` $\rightarrow$ Fallback to `client.seo.defaultTitle` from [client.json](file:///c:/Users/tarak/welcome-webworks/www-starterkit/client.json).
- **Meta Description**: Use Sanity custom `seo.description` field $\rightarrow$ Fallback to post `excerpt` $\rightarrow$ Fallback to dynamic custom CMS `siteSettings.description` $\rightarrow$ Fallback to `client.seo.defaultDescription`.
- **Share Image (OpenGraph/Twitter)**: Use Sanity custom `seo.shareImage` field $\rightarrow$ Fallback to post `mainImage` $\rightarrow$ Fallback to dynamic custom CMS `siteSettings.shareImage` $\rightarrow$ Fallback to dynamic edge card endpoint `/api/og.png` $\rightarrow$ Fallback to absolute resolved `client.seo.defaultShareImage`.

### 2. Structured JSON-LD Data
Inject structured schema scripts within the HTML `<head>` on all rendered pages:
- For standard business pages, output an industry-standard `LocalBusiness` schema with contact details dynamically resolved from `client.json` (such as address details, country, and telephone).
- For articles/posts, output a rich `BlogPosting` schema including publisher profile, author profile, date published, and modification timestamps.

### 3. Verification & Search Endpoints
Maintain the following endpoints dynamically in the Astro page scope:
- **Robots.txt**: Served at `/robots.txt` using the dynamic controller [robots.txt.ts](file:///c:/Users/tarak/welcome-webworks/www-starterkit/apps/web/src/pages/robots.txt.ts).
- **Sitemap.xml**: Served at `/sitemap.xml` using the dynamic query runner [sitemap.xml.ts](file:///c:/Users/tarak/welcome-webworks/www-starterkit/apps/web/src/pages/sitemap.xml.ts) to crawl and link all active posts dynamically, automatically excluding pages flagged with `seo.noindex: true`.
- **Dynamic OpenGraph API**: Served at `/api/og.png` using the controller [og.png.ts](file:///c:/Users/tarak/welcome-webworks/www-starterkit/apps/web/src/pages/api/og.png.ts) to dynamically render branded social sharing cards at the Cloudflare edge.
- **Dynamic Web Manifest**: Served at `/manifest.webmanifest` using the dynamic controller [manifest.webmanifest.ts](file:///c:/Users/tarak/welcome-webworks/www-starterkit/apps/web/src/pages/manifest.webmanifest.ts) to serve PWA configuration dynamically without hardcoded client metadata.

---

## 🧞 Local Development Command Reference

All tasks must be run from the root workspace to leverage Turborepo caching:

| Command | Action | Scope |
| :--- | :--- | :--- |
| `pnpm dev` | Start Astro Dev Server and Sanity Studio concurrently. | Workspace-wide |
| `pnpm build` | Compile builds for all workspaces. | Workspace-wide |
| `pnpm lint` | Run Astro checks and ESLint. | Workspace-wide |
| `pnpm --filter web <cmd>` | Execute command contextually in the Astro Frontend. | Sub-project only |
| `pnpm --filter studio <cmd>` | Execute command contextually in the Sanity Studio. | Sub-project only |

---

## 🌐 Cloudflare Deployment Specifications

Deployments are target-bound to Cloudflare and managed manually via the Cloudflare Dashboard linked to the GitHub repository (CI/CD):

### 1. Astro Frontend (`apps/web`)
- **Deployment Class**: Cloudflare Workers with Assets (Server SSR)
- **Deployment Method**: Cloudflare Worker connected to GitHub repository.
- **Build Configurations**:
  - **Build Command**: `pnpm --filter web build`
  - **Build Output Directory**: `apps/web/dist/client`
  - **Compatibility Date**: `2026-07-15` or later
  - **Compatibility Flags**: `nodejs_compat`
- **Required Environment Variables**:
  - `NODE_VERSION`: `22` (Enforces modern node compile rules)
  - `PUBLIC_SANITY_PROJECT_ID`
  - `PUBLIC_SANITY_DATASET`
  - `RESEND_API_KEY` *(Optional: Managed directly in Sanity Studio CMS under `siteSettings.resendApiKey` for zero-downtime key rotation and zero-break builds)*

### 2. Sanity Studio CMS (`apps/studio`)
- **Deployment Class**: Static SPA hosted on Cloudflare Pages
- **Deployment Method**: Cloudflare Pages connected to GitHub repository.
- **Build Configurations**:
  - **Build Command**: `pnpm --filter studio build`
  - **Build Output Directory**: `apps/studio/dist`
  - **Root Directory**: (Leave as root `/`)
- **Required Environment Variables**:
  - `SANITY_STUDIO_PROJECT_ID`
  - `SANITY_STUDIO_DATASET`

---

## 🤖 AI Agent Coding Rules (Mandatory Constraints)

AI agents and coding assistants working in this workspace **MUST** adhere to the following rules at all times:

### Rule 1: Always Search the Web for Current Dates & Dependencies
For any task involving configuration parameters that depend on current dates (such as Cloudflare Wrangler's `compatibility_date`), new package APIs, or version dependencies, you **must use the web search tool first** to retrieve the latest production-ready values (such as today's date or the latest stable package versions) before proposing or implementing configuration edits.

### Rule 2: Root-Level pnpm Workspace Commands
Do not run installs or builds locally inside specific package folders. Always execute tasks from the root workspace using workspace filter commands (e.g., `pnpm --filter web add <package>`).

### Rule 3: Git Control and Hygiene
Ensure that local temporary files, lockfile dumps, and all `node_modules` folders (recursively) are blocked using the root `.gitignore`. Never check in build folders (`dist/`, `.astro/`, `.turbo/`) or environment variable files (`.env`).

### Rule 4: Use Named Sanity Exports
When building image URLs or processing Sanity content on the frontend, always import the named export `{ createImageUrlBuilder }` from `@sanity/image-url` rather than the deprecated default export.
*Example:*
```typescript
import { createImageUrlBuilder } from '@sanity/image-url';
```

### Rule 5: Keep Compatibility Dates Updated
Wrangler configurations (`wrangler.toml`) must maintain a compatibility date that is equal to or close to the current calendar date (e.g., `"2026-07-15"` or later) to ensure full miniflare RPC support and avoid vite runner runtime crashes.

### Rule 6: Monorepo DRY (Don't Repeat Yourself) Rules
Place all general, shared configurations (such as TypeScript base setups, ESLint rules, Prettier configuration presets, or UI Tailwind extensions) inside the empty `packages/` or `tooling/` scopes, rather than duplicating configurations inside individual workspace applications.

### Rule 7: Relative Paths for Extended Configurations
When inheriting from local shared configuration files (like TypeScript base configurations or shared configurations) in monorepo apps, always extend them using relative paths (e.g., `../../packages/config-typescript/base.json`) rather than package scope resolutions. This ensures the IDE's TypeScript language server resolves them immediately without suffering from stale node_modules cache limits. If you still see stale warnings in your editor, restart the TS Server or reload the editor window.

### Rule 8: Agent-Driven Client Onboarding & Universal Data Fallback Architecture
When building, updating, or constructing pages and components for a client:
- Read their detailed business positioning, services, structure, and preferences from the onboarding brief in the root [CLIENT.md](file:///c:/Users/tarak/welcome-webworks/www-starterkit/CLIENT.md).
- Reference [client.json](file:///c:/Users/tarak/welcome-webworks/www-starterkit/client.json) in the workspace root as the unified source of truth for baseline variables.
- **Dynamic Field Creation**: If raw client brief notes contain custom/new data attributes (e.g. portfolio highlights, pricing tiers, certifications, school accreditation, specialized services) not currently present in `client.json` or `CLIENT.md`, the agent **MUST dynamically create new keys/fields** inside `client.json` and append them to `CLIENT.md`.
- **Strict Universal Fallback Rule (`Sanity CMS || client.json`)**: Every page, section, component, or layout (whether pre-existing or created in the future) **MUST enforce the strict CMS-first fallback pattern**:
  ```typescript
  const resolvedValue = sanityData?.field || clientData.field;
  ```
  - **Priority 1**: Always check if Sanity Studio CMS has a value populated for that field.
  - **Priority 2**: If the Sanity CMS field is empty, null, or unconfigured, automatically fall back to the corresponding field in `client.json`.
- All components, headers, footers, metadata tags, legal pages, and future page construction prompts MUST strictly consume data following this fallback pattern to prevent hardcoded strings.
- **Dynamic CMS Logo & Favicon Management**: All brand logos (primary, inverted), brand icons/emblems, web favicons (`/favicon.ico`, `/favicon.svg`), and Apple Touch icons (`/apple-touch-icon.png`) MUST be uploaded and managed via the dedicated **🎨 Logo & Brand Assets** tab in Sanity CMS (`siteSettings`). Do not hardcode static logo/favicon URLs in `client.json` or frontend templates; both the frontend site (`apps/web`) and CMS backend (`apps/studio`) must dynamically resolve and showcase the uploaded brand icon and favicon.
- Verify all dynamic SEO, syndication, and search endpoints (`/robots.txt`, `/sitemap.xml`, `/rss.xml`, `/api/og.png`, `/favicon.ico`, `/favicon.svg`, `/apple-touch-icon.png`, and `/manifest.webmanifest`) resolve correctly without using placeholders.

### Rule 9: No Unprompted Git Commits or Pushes
AI agents must **never** run `git commit` or `git push` command sequences to local or remote repositories unless explicitly and unambiguously requested by the user. All modifications should remain unstaged/uncommitted locally for the user's manual review.

### Rule 10: Verify Target Directory Paths
Always double-check user terminology regarding directories before editing files. Do not make assumptions about ambiguous terms (e.g., "web space" which could refer to the root workspace or the sub-project `apps/web` package folder). Verify file paths on disk or ask for clarification if unsure of the user's intended target location.

### Rule 11: TSConfig Extends Inheritance Order in Monorepos
In monorepo Astro sub-projects that inherit base TSConfigs, always place the Astro tsconfig `strict.json` *last* inside the `"extends"` array (e.g., `"extends": ["../../packages/config-typescript/base.json", "./node_modules/astro/tsconfigs/strict.json"]`). This ensures Astro's native HTML JSX validation types override the base React configurations, preventing incorrect `class` vs `className` attribute compile errors inside `.astro` templates.

### Rule 12: Client-side TypeScript scripts
Write client-side scripts inside Astro templates using standard processed `<script>` tags (without `is:inline` unless server-side variables interpolation is strictly necessary). This allows standard TypeScript type definitions and interfaces to be checked at build time, while Vite automatically compiles the code into standard, browser-safe JavaScript at production.

### Rule 13: Automated Schema Type Generation (TypeGen)
If you modify, add, or delete any Sanity schema files inside `apps/studio/schemaTypes/` or change schema types in any CMS documents, you **must** run `pnpm typegen` from the root workspace directory before starting work on frontend components in `apps/web/` to ensure typing autocomplete interfaces stay synchronized.

### Rule 14: Use `<SanityImage />` for all Sanity Images
When creating or updating Astro components or pages that render images stored in Sanity CMS, you **must** use the `<SanityImage />` component imported from `../components/SanityImage.astro` (or matching path) instead of standard `<img>` tags. Pass `src`, `alt`, and `maxWidth` props to ensure correct aspect ratios, next-gen WebP/AVIF conversions, and responsive size selection.

### Rule 15: Registering New Page Builder Blocks
If you add a new section block to the `pageBuilder` array inside the CMS schema (`apps/studio/schemaTypes/sections/`):
1. Define the schema object (e.g. `mySection.ts`).
2. Register it in `apps/studio/schemaTypes/index.ts`.
3. Create a matching Astro component `MySection.astro` inside `apps/web/src/components/sections/`.
4. Register the type mapping in `apps/web/src/components/SectionMapper.astro` so that it renders dynamically.
5. Run `pnpm typegen` to refresh static TS typings before editing frontend files.

### Rule 16: External UI Component Ingestion, Navigation Layout & Content Preservation
When integrating external UI component prompts, templates, navigation bars, or code snippets (e.g. from Shadcn UI, 21st.dev, MagicUI, Aceternity, etc.):
1. **Professional Directory Structure**: Always place component dependencies, helper hooks, icons, and UI primitives inside `apps/web/src/components/ui/` (or `apps/web/src/hooks/`) with clear, professional, and descriptive file names (e.g. `floating-header.tsx`, `menu-toggle-icon.tsx`, `use-scroll.ts`).
2. **Navigation Layout Standards**:
   - **Prominent Brand Logo**: Render brand logos at bold, clear, legible dimensions (`h-11 sm:h-12 md:h-14` with `max-w-[280px]`) so uploaded Sanity logos stand out without looking compressed.
   - **Centered Desktop Options**: Position desktop navigation links (`Home`, `Services`, `About`, `Blog`) horizontally centered within the header container (`absolute left-1/2 -translate-x-1/2`).
   - **Capsule Pill CTA Button**: Style the primary action button on the right as a full capsule pill (`rounded-full`) using the primary brand color (`bg-[#C60909]`).
   - **Mobile & Tablet Drawer**: Implement smooth full-height overlay drawers for mobile and tablet resolutions (`md:hidden`) with touch-friendly links and body scroll locking.
3. **NEVER Hardcode Dummy Content**: Never overwrite or hardcode generic dummy text, links, or placeholder logos from external prompts.
4. **ALWAYS Bind Project Data & CMS Variables**: Always bind the existing project content, dynamic Sanity CMS variables (`siteSettings`), and existing site navigation routes (`/`, `/#services`, `/#about`, `/blog`, `/contact`) into the template props and markup.

### Rule 17: No Read-Only Dummy Input Box Fields in CMS Schemas
Never create read-only string fields (`type: 'string', readOnly: true`) as category headers or guide notes inside Sanity schemas. Sanity renders read-only string fields as grey input text boxes, which look uneditable, awkward, and unpolished in an industrial-grade starter kit. Place guidelines directly inside field `description` parameters or document tooltips.

### Rule 18: Liquid Smooth Animation & Micro-Interaction Standards
All page load transitions, scroll reveals, and component hover states across the application MUST adhere to industrial-grade fluid motion standards:
- **Scroll Reveal Easing**: Use 0.95s GPU-accelerated transitions with Apple fluid cubic bezier curves (`cubic-bezier(0.22, 1, 0.36, 1)`) and modest 18px translation distances (`translateY(18px)`).
- **Hover Micro-Interactions**: Use 0.4s cubic bezier transitions (`cubic-bezier(0.16, 1, 0.3, 1)`) with `will-change: transform; backface-visibility: hidden;` for buttons, badges, and card containers to ensure silk-smooth 60fps/120fps motion.

### Rule 19: Automatic 1-by-1 Sequential Staggering System
All section containers and content grids MUST enforce a 1-by-1 sequential entrance reveal:
- **Automatic Indexing**: JavaScript automatically calculates `--stagger-index` (0, 1, 2, 3...) for all `[data-animate]` children inside section containers.
- **Rhythmic Delays**: CSS computes `transition-delay: calc(var(--stagger-index, 0) * 120ms)` to ensure elements reveal 1-after-1 in a clean, high-end 120ms rhythm.
- **Future Components**: All newly built pages or section components automatically inherit this sequential staggering without requiring hardcoded manual delay classes.

### Rule 20: Universal Page Badge System & Top Offset Lock
All page templates and section headers MUST incorporate the Universal Page Badge System:
- **Homepage (`/`)**: Displays the free-standing `<CompanyTaglineRoll />` component rendering small cursive handwritten `"we"` accent in black font alongside large brand red action words (**"Think,"** $\rightarrow$ **"Build,"** $\rightarrow$ **"Deliver."**) cycling every 2.8 seconds using `TextRoll` with zero background pill boxes or borders.
- **Inner Pages (`/blog`, `/blog/[slug]`, `/contact`, `/services`, `/pricing`, CMS Pages)**: Displays a top rose pill badge (`.badge-rose-pill`) showing the active page title (e.g. `"Blog & Insights"`, `"Article"`, `"Contact Us"`, `"Pricing"`) in the exact same top position above H1 headers.
- **Top Offset Lock**: All main page containers MUST use standard top padding `pt-8 pb-20 md:pt-8 md:pb-24 px-6` with the badge wrapper (`<div class="flex justify-center w-full" data-animate="zoom-in">`) positioned as the first element inside `<main>` so the badge height remains 100% identical across all page routes.
- **Component File Location**: Reusable 3D motion primitives are located in `apps/web/src/components/ui/text-roll.tsx` and `apps/web/src/components/ui/company-tagline-roll.tsx`.

### Rule 21: Strict Ban on Artificial Button & Card Glow Effects
Do NOT add artificial colored blur glows, neon aura shadows (such as `shadow-brand-glow`, `shadow-glass-glow`, blurred colored box-shadows, or heavy radial glow filters) to buttons, cards, or interactive UI elements across the application. Artificial neon glow effects create an unpolished, AI-generated template aesthetic. All buttons, badges, and card containers MUST use clean, solid, human-crafted agency styling (e.g. solid brand fills `#B31B1B`, crisp hairline borders `#ECE7E6`, clean subtle elevation shadows `shadow-sm` / `shadow-md`, and smooth transform hover scaling `hover:scale-[1.02]`).

### Rule 22: Strict Lock on Mobile Navigation Drawer & Component Protection
Do NOT modify, edit, re-arrange, refactor, or alter the Mobile Navigation Drawer (`mobile-nav-drawer`), its shape divider geometry (classic U-type curve `d="M0,0V10C0,95,250,150,600,150C950,150,1200,95,1200,10V0Z"`), its 1-by-1 sequential staggered entrance/exit animations, its timing parameters, layout spacing, or contents in `floating-header.tsx` (or child components) unless explicitly and unambiguously instructed by the user in a future prompt. All future tasks across the repository MUST treat the mobile navigation drawer as a locked, production-perfect component.

### Rule 23: Astro SPA Router (`<ClientRouter />`) State Persistence & Declarative UI System
When building interactive features, page animations, or component drawers in Astro SSR mode with `<ClientRouter />` SPA routing:
- **Architectural Root Cause of SPA State Loss**:
  - *Module Script Caching*: Swapping page HTML DOM trees (`<slot />`) does NOT re-execute JavaScript `<script type="module">` tags inside swapped `<astro-island>` elements. As a result, React islands in page bodies become inert DOM shells when returning to a page.
  - *CSS Layout Shift Misalignment*: Running JavaScript canvas overlays (`rough-notation`) during CSS entrance transitions (`data-animate="fade-up"`) measures coordinates mid-motion, leaving JS-drawn overlays misaligned when the CSS transition finishes.
- **Mandatory Engineering Architecture Solutions**:
  1. **Declarative HTML/CSS First for Text Highlights**: Use native declarative HTML elements (`<mark>`, SVG `<path>` strokes, CSS `clip-path` & `stroke-dashoffset` keyframe transitions) for text annotations and highlights. Bind entrance and viewport re-triggering to `IntersectionObserver` and `document.addEventListener('astro:page-load', ...)`.
  2. **`transition:persist` for Persistent Components**: Persistent UI components (such as `<FloatingHeader transition:persist="floating-header" />` in `Layout.astro`) MUST include `transition:persist` so Astro preserves the hydrated React root across all page redirects.
  3. **`100dvh` Dynamic Viewport Heights**: Always use dynamic viewport units (`height: 100dvh`) for mobile overlay containers to prevent dynamic mobile address bar toolbar shifts between short pages (`/contact`) and long pages (`/services`).

### Rule 24: Conditional Sanity Studio Verification & TypeGen Protocol
Whenever modifying Sanity schemas in `apps/studio/schemaTypes/` or CMS document definitions inside `apps/studio/`:
1. **Sanity TypeGen Execution**: Run `pnpm typegen` from the workspace root to update TypeScript auto-generated types.
2. **Conditional Studio Build Verification**: Execute `pnpm --filter studio build` **ONLY when files inside `apps/studio/` are modified**. If changes are strictly limited to the Astro frontend (`apps/web/`), do NOT run `pnpm --filter studio build` (run `pnpm --filter web lint` instead).

### Rule 25: Modular Component Directory Architecture
Keep `apps/web/src/components/` organized according to domain responsibility:
- `apps/web/src/components/sections/<page>/`: Section blocks (e.g. `sections/home/AboutSection.tsx`, `sections/home/TechStackOrbit.tsx`, `sections/our-works/OurWorksPaginatedGrid.tsx`).
- `apps/web/src/components/ui/`: Primitive UI design system elements (`interactive-work-card.tsx`, `Balatro.tsx`, `BlogCard.tsx`, `works-carousel.tsx`, `offer-carousel.tsx`, `typography/BlogHeadingRoll.tsx`, `navigation/Breadcrumbs.astro`, `navigation/MobileBottomNav.tsx`).
- `apps/web/src/components/`: System renderers (`SanityImage.astro`, `SEO.astro`, `PortableTextRenderer.tsx`, `SectionMapper.astro`, `BackToTop.astro`, `WhatsAppSticky.astro`, `Footer.astro`).

### Rule 26: Slideshow Controls & Media Frame Zero-Overlap Rule
Slideshow control bars, progress indicators, slide counters, or pagination dot containers MUST be rendered as standalone layout elements **outside image frames/containers**. Never overlay dark floating boxes over photos or clip-path shapes that obstruct visual media content on mobile or desktop viewports.

### Rule 27: Desktop Navigation CTA & Button Alignment
Desktop navigation CTA buttons must match the exact styling, geometry, and spring physics of the mobile menu CTA button (capsule rounded pill `rounded-full border-2 border-[#B31B1B] bg-white text-[#B31B1B] hover:bg-[#B31B1B] hover:text-white` with vector icon, `whileHover={{ scale: 1.04 }}` and `whileTap={{ scale: 0.96 }}`).

### Rule 28: Strict HTML/JSX Tag Balance Verification Protocol
Before completing any file edits or declaring features complete:
- **Mandatory Parent Tag Audit**: When wrapping layout blocks in new container `<div>` or `<section>` tags, verify every opening tag matches a closing tag line-by-line (`<div>` $\rightarrow$ `</div>`).
- **Compiler Validation**: Run `pnpm --filter web exec astro check` to catch any missing JSX/HTML closing tags (`Expected corresponding JSX closing tag for 'div'`) before presenting the solution.

### Rule 29: 0ms Flash Navigation Protocol & Instant Viewport Hydration
All client-side page transitions MUST maintain 0ms instant rendering performance:
- **In-Memory CMS Caching**: `getSiteSettings()` in `sanity.ts` MUST be cached in memory (`cachedSettings`) across all environments to prevent 200ms-400ms network fetch delays on page navigation.
- **Hover & Touch Pre-Loading**: All internal navigation links (`<a>`) MUST include `data-astro-prefetch="hover"`. `astro.config.mjs` MUST maintain `prefetch: { prefetchAll: true, defaultStrategy: 'hover' }`.
- **0.12s View Transition Cap**: `::view-transition-old(root)` and `::view-transition-new(root)` in `global.css` MUST be capped at 0.12s to eliminate artificial cross-fade delays.
- **Immediate Pre-Swap Hydration**: Maintain `astro:before-preparation` and `astro:after-swap` listeners in `Layout.astro` to immediately mark top-fold elements (`rect.top < window.innerHeight`) as `.is-visible` on the exact millisecond Astro swaps HTML into the DOM.

### Rule 30: Preserve Interactive Marker & Text Animations
Never remove or comment out interactive text animations (such as `<Highlighter />` marker strokes, `<BlurText />` title entrance, `<CompanyTaglineRoll />`, or `<BlogHeadingRoll />`) from hero sections or component templates unless explicitly requested by the user. Always maintain client hydration (`client:load`) on interactive text islands.

### Rule 31: Blog Heading Roll & Typography Animation Systems
Typography animation primitives (such as `BlogHeadingRoll.tsx` in `apps/web/src/components/ui/typography/BlogHeadingRoll.tsx`) cycle through core agency pillars (`Web Development`, `System Software`, `AI Automations`, `Digital Growth`) with vertical motion transitions, italicized brand red accents (`text-[#B31B1B]`), and dynamic heading typography styling. Ensure all typography animation components maintain responsive text sizing, client hydration, and accessible DOM structures.

---

## 📜 Agent Task & Bug Fix Log

### [2026-08-08] - Blog Heading Roll Typography Animation, Streamlined Home Page Schema & Dual-Source About Gallery
- **Feature Implemented (Blog Heading Roll Typography System)**: Created `BlogHeadingRoll.tsx` component in `apps/web/src/components/ui/typography/BlogHeadingRoll.tsx` using `motion/react` `AnimatePresence mode="popLayout"` to dynamically cycle through core agency service pillars (*Web Development*, *System Software*, *AI Automations*, *Digital Growth*) with smooth vertical slide transitions and italicized brand red accents (`text-[#B31B1B]`).
- **Feature Implemented (Streamlined Home Page Schema & Dual-Source Gallery)**: Simplified `homePage.ts` schema to include strictly `🚀 Hero Tech Stack Orbit` and `📖 About Section Gallery`. Added `sourceType` selector (`📁 Upload Image File` vs `🌐 External CDN Link / Image URL`) with dynamic field visibility and mutual exclusion check. Removed unused hero text overrides, single fallback image, and redundant per-page SEO fields.
- **Feature Implemented (Developer Guidelines & AGENTS.md / CLAUDE.md Harmonization)**: Cleaned up and harmonized rule numbering across `AGENTS.md` and `CLAUDE.md` into a strictly ordered sequence (Rules 1 to 31), removing duplicate rule headers, expanding component directory paths (`apps/web/src/components/ui/typography/`, `our-works/`), and ensuring complete synchronization across developer instruction files.

### [2026-08-06] - Paginated Showcase Grid, Interactive 3D Work Cards, Tech Orbit Animation, WebGL Shaders & D1 Lead Pipeline
- **Feature Implemented (6-Item Paginated Showcase Grid)**: Created `OurWorksPaginatedGrid.tsx` in `apps/web/src/components/sections/our-works/OurWorksPaginatedGrid.tsx` featuring dynamic 6-item pagination grid, project range indicator (`Showing 1–6 of 11 Projects`), double-digit page controls (`01`, `02`), smooth scroll header offset (`#portfolio-grid-top`), and a centered `Start Your Project` CTA button below the showcase grid.
- **Feature Implemented (Interactive 3D Agency Work Showcase Cards)**: Built `interactive-work-card.tsx` rendering high-end agency showcase cards with dynamic category badges, technology tags, live project links, and visual showcase modal dialogs.
- **Feature Implemented (Interactive Tech Stack Orbit System)**: Built `TechStackOrbit.tsx` in `apps/web/src/components/sections/home/TechStackOrbit.tsx` featuring a central spinning brand logo orbit, dual rotating rings, domain filter tabs (Frontend, Backend, Cloud & DevOps, Database & CMS), hover tech details, and active node highlight states.
- **Feature Implemented (Balatro WebGL Shader Canvas)**: Integrated `Balatro.tsx` & `Balatro.css` WebGL shader canvas powering `TestimonialsSection.tsx` with dynamic dark/brand red wave physics.
- **Feature Implemented (Contact API Pipeline & Cloudflare D1 Lead Logging)**: Built `/api/submit-contact.ts` endpoint handling contact form submissions with honeypot spam protection (`hp_field`), input sanitization, Resend API email dispatch, and Cloudflare D1 SQL database lead logging.

### [2026-08-04] - Left-Floated Breadcrumbs, Centered Header Badges, Dynamic Bottom Navigation Docks & Footer Refinements
- **Feature Implemented (Left-Floated Breadcrumb System)**: Created `Breadcrumbs.astro` in `apps/web/src/components/ui/navigation/Breadcrumbs.astro` featuring left-aligned (`justify-start`) hierarchy (`Home / Services / Service Title`), tight top navigation clearance (`pt-1 sm:pt-1.5` section padding, `pt-10 sm:pt-12` main top container offset), and JSON-LD `BreadcrumbList` schema output. Mounted across all inner pages (`/services`, `/services/[slug]`, `/our-works`, `/blog`, `/blog/[slug]`, `/contact`, dynamic CMS pages).
- **Feature Implemented (Centered Page Header Badges with Rotating Brand Star ✱)**: Standardized centered page title badges (`flex justify-center w-full`) across all inner page headers featuring an animated rotating brand star `<span class="text-[#B31B1B] animate-spin text-sm shrink-0">✱</span>` and uppercase page titles (`SERVICES`, `OUR WORKS`, `CONTACT US`, `BLOG & INSIGHTS`, `ARTICLE`, `{service.title.toUpperCase()}`).
- **Feature Implemented (Glassmorphic Full-Width Mobile Bottom Navigation Dock)**: Built `MobileBottomNav.tsx` in `apps/web/src/components/ui/navigation/MobileBottomNav.tsx` rendering a full-width edge-to-edge sticky dock (`fixed -bottom-[1px] left-0 right-0 z-[50] xl:hidden`) with glassmorphic top border (`border-t border-[#ECE7E6]`), bottom gap sealer extension (`after:h-20 after:bg-[#FCFBFA]`), slide-up entrance animation, native 48px height, vector icons, and 4 core action buttons: Call (`tel:`), WhatsApp (`wa.me`), Services (`/services`), and Share (`navigator.share` / copy URL fallback).
- **Feature Implemented (Desktop Sticky Floating WhatsApp Action Button)**: Created `WhatsAppSticky.astro` in `apps/web/src/components/WhatsAppSticky.astro` rendered exclusively on large screens (`hidden xl:flex fixed bottom-6 right-6 z-50`) as a brand green circular glassmorphic action button (`w-14 h-14 rounded-full bg-white border-2 border-[#ECE7E6] text-[#25D366] shadow-xl hover:scale-110`). Repositioned `<BackToTop />` button directly above it on desktop (`xl:bottom-22 xl:right-6`).
- **Feature Implemented (Footer Display & Copyright Bar Separation)**: Refactored `Footer.astro` to separate the bottom display block into two distinct containers:
  1. *Big Display Section ("WELCOME WEBWORKS" + Tagline)*: Pure white canvas (`bg-white text-[#161616]`) with primary brand red title (`text-[#B31B1B]`) and 2px negative top margin overlap (`-mt-[2px] relative z-30`) to eliminate subpixel white line gaps.
  2. *Bottom Copyright & System Links Bar*: Solid primary brand red background (`bg-[#B31B1B] text-white border-t border-white/20`) with pure white typography for `© 2026 Welcome WebWorks. All rights reserved.` and sitemap links, plus mobile clearance padding (`pt-6 pb-24 xl:pb-6`) ensuring 100% visibility above the mobile bottom nav dock.
- **Feature Implemented (Pre-Footer CTA Card Elevation & Mountain Arch Clearance)**: Restored deep 3D agency shadow (`shadow-2xl shadow-black/10 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)]`) to the pre-footer CTA card in `Footer.astro` while expanding container bottom padding (`pb-16 sm:pb-20`) to ensure 100% shadow clearance above the red `#B31B1B` mountain curve arch SVG without casting dark shadow lines over the curve.
- **Feature Implemented (Responsive Curved Marquee Loop Sizing)**: Updated `<CurvedLoop />` in `curved-loop.tsx` and `curved-loop.css` to maintain compact 75px height (`min-height: 75px`, `max-height: 110px`, `font-size: 3.6rem`, `viewBox="0 0 1440 110"`) on mobile screens (`< 768px`) while restoring full original desktop dimensions (`min-height: 170px`, `font-size: 5.8rem`, `viewBox="0 0 1440 180"`, `py-2 md:py-6` section padding) for screens `≥ 768px / 800px+`.
- **Feature Implemented (Active Route Navigation Highlighting & Mobile Drawer Rotating Star)**: Updated `floating-header.tsx` with dynamic pathname tracking (`currentPath` initialized with `typeof window !== 'undefined' ? window.location.pathname : ''`) and strict route matching `isLinkActive` to prevent dual active state hydration bugs between Home (`/`) and inner pages.
  - *Desktop*: Features a sleek, compact spring-animated background bubble (`layoutId="desktop-nav-active-pill"`, `py-1.5 px-4 rounded-full bg-rose-50/80 border border-[#B31B1B]/15 text-[#B31B1B]`) that defaults to the active route and glides smoothly on hover.
  - *Mobile Drawer*: Highlights active route in primary brand red (`text-[#B31B1B] font-black`) and renders an unconditionally spinning brand star `<span class="text-[#B31B1B] text-2xl sm:text-3xl inline-block animate-spin shrink-0">✱</span>` next to the active or hovered menu link.

### [2026-07-31] - 0ms Flash Navigation Engine, PWA Mobile/Tablet CMS Toggle Fix & Universal Badge Standardization
- **Feature Implemented (0ms Flash Navigation Engine)**: Implemented a 30-second TTL cache (`CACHE_TTL = 30000`) for `getSiteSettings()` in `sanity.ts` to eliminate 200ms–400ms server fetches on navigation. Configured `prefetch: { prefetchAll: true, defaultStrategy: 'hover' }` in `astro.config.mjs` and added `data-astro-prefetch="hover"` to all navigation links, buttons, and publication cards in `FloatingHeader.tsx`, `HeroSection.astro`, `CtaSection.astro`, `index.astro`, `blog/index.astro`, `blog/[slug].astro`, `contact.astro`, and `404.astro`.
- **Bug Fix (PWA Mobile & Tablet CMS Toggle Respect)**: Fixed an issue where the PWA install banner displayed on iOS mobile/tablet devices even when toggled off in Sanity CMS. Updated the iOS Safari detection script in `Layout.astro` to evaluate `data-pwa-banner !== 'false'` and wrapped the banner template container in Astro conditional logic (`{enablePwaBanner && (...)}`).
- **Feature Implemented (Universal Centered Page Badges & Top Offset Lock)**: Standardized main container top padding (`pt-8 pb-20 md:pt-8 md:pb-24 px-6`) and badge wrapper positioning (`<div class="flex justify-center w-full" data-animate="zoom-in">`) across all page routes (`/`, `/blog`, `/blog/[slug]`, `/contact`, CMS pages) so top page badges sit at the exact same top vertical offset below the floating header.
- **Feature Implemented (Liquid 3D Tagline Roll Exit & Entrance Motion)**: Upgraded `company-tagline-roll.tsx` using `AnimatePresence mode="popLayout"` from `motion/react`. The exiting word rolls UP & OUT into 3D perspective (`rotateX: 0deg` $\rightarrow$ `90deg`) as the entering word rolls UP & IN from below (`rotateX: -90deg` $\rightarrow$ `0deg`) with Apple fluid cubic bezier curves (`[0.16, 1, 0.3, 1]`) and 2.8s word rest intervals.

### [2026-07-31] - Universal Page Badge System & 21st.dev TextRoll Tagline Integration
- **Feature Implemented (21st.dev TextRoll Motion Primitive)**: Created `text-roll.tsx` component in `apps/web/src/components/ui/text-roll.tsx` using `motion/react` 3D letter rolling transitions.
- **Feature Implemented (Homepage Tagline Roll Pill)**: Created `company-tagline-roll.tsx` in `apps/web/src/components/ui/company-tagline-roll.tsx` rendering cursive handwritten `"we"` alongside rolling action words (`"Think,"` $\rightarrow$ `"Build,"` $\rightarrow$ `"Deliver."`) cycling every 2.5s.
- **Feature Implemented (Universal Page Badge System)**: Updated `HeroSection.astro`, `index.astro`, and `contact.astro` so the top badge pill position displays dynamic slogan rolling on Home or page name badges on inner pages.

### [2026-07-31] - Automatic 1-by-1 Sequential Staggering System
- **Feature Implemented (Automatic Container Indexing)**: Scanned section containers in `Layout.astro` and assigned `--stagger-index` (0, 1, 2, 3...) to `[data-animate]` child elements automatically.
- **Feature Implemented (Dynamic Calculated Delays)**: Configured `transition-delay: calc(var(--stagger-index, 0) * 120ms)` in `global.css` so elements inside any present or future section reveal in a 1-after-1 rhythm (0ms, 120ms, 240ms, 360ms...).

### [2026-07-31] - Liquid Smooth Animation & Hover Dynamics System
- **Feature Implemented (Liquid GPU Scroll Reveal Easing)**: Upgraded entrance and scroll reveal transitions in `global.css` to 0.95s GPU-accelerated transitions using Apple fluid cubic bezier curve `cubic-bezier(0.22, 1, 0.36, 1)` and 18px translation distance for a silk-smooth, floaty entrance.
- **Feature Implemented (Elevated Micro-Interactions)**: Upgraded hover transitions on buttons (`.btn-primary`, `.btn-secondary`, `.btn-outline`, `.btn-ghost-dark`) and cards (`.card-glass`) to 0.4s `cubic-bezier(0.16, 1, 0.3, 1)` with `will-change: transform; backface-visibility: hidden;`.
- **Feature Implemented (IntersectionObserver Tuning)**: Tuned `IntersectionObserver` parameters in `Layout.astro` (`threshold: 0.12`, `rootMargin: "0px 0px -40px 0px"`) for natural, fluid viewport triggering.

### [2026-07-30] - CMS-Controlled Feature Toggle System & Page Entrance Animations
- **Feature Implemented (Sanity Settings Feature Toggles Tab)**: Created extensible group tab `🎛️ Feature Toggles & UX Controls` in `siteSettings.ts` with developer guide notes and boolean toggle `enablePageAnimations`.
- **Feature Implemented (Universal Fallback Architecture)**: Added baseline `"settings": { "enablePageAnimations": true }` in `client.json` and GROQ query fetch mapping in `sanity.ts` with strict fallback (`siteSettings?.enablePageAnimations ?? client.settings?.enablePageAnimations ?? true`).
- **Feature Implemented (Page Entrance & Scroll Reveal Suite)**: Created CSS keyframe animations (`fade-up`, `fade-down`, `fade-left`, `fade-right`, `zoom-in`) and IntersectionObserver scroll reveal script in `Layout.astro`. Applied entrance animations across `HeroSection`, `FeaturesSection`, `CtaSection`, `index.astro`, and `contact.astro`.
- **Feature Implemented (Instant Global Animation Disable)**: Added `html[data-page-animations="false"]` CSS override rule in `global.css` that instantly turns off all page entrance transitions and scroll reveals globally when disabled in Sanity Studio, while preserving component micro-interactions (buttons, hover states, menu drawers).

### [2026-07-30] - Dynamic Brand Icon Endpoints, Studio Logo Polling & Floating Nav Integration
- **Feature Implemented (Dynamic Icon & Favicon Endpoints)**: Created server endpoints `/favicon.ico.ts`, `/favicon.svg.ts`, and `/apple-touch-icon.png.ts` in Astro to dynamically fetch brand icons/logos from Sanity CMS `siteSettings`, resize on-the-fly via Sanity image pipeline, and return 302 redirects to client browsers with dynamic fallback.
- **Feature Implemented (Sanity Studio Navbar Logo & Browser Tab Favicon Sync)**: Created custom `StudioLogo.tsx` header component in Sanity Studio that renders the brand logo/icon and polls `siteSettings` every 3 seconds to dynamically update the Sanity Studio header and browser tab favicon on live CMS uploads.
- **Feature Implemented (Floating Responsive Header Component)**: Ingested `floating-header.tsx`, `menu-toggle-icon.tsx`, and `use-scroll.ts` in `apps/web/src/components/ui/` with backdrop blur, capsule CTA buttons, mobile drawer body scroll locking, and `data-analytics-click` tracking attributes.
- **Feature Implemented (Welcome WebWorks Client Brief Alignment)**: Updated `CLIENT.md` and `client.json` with full client metadata (Founder M.T.G., GST `36DIBPG9527G1Z7`, 4 service pillars, 11 verified clients, vision, mission, pricing, and sister brand BYB).

### [2026-07-27] - Dedicated Production Deployment Agent Skill & IDE Tailwind Linting Fix
- **Feature Implemented (Dedicated Deployment Skill `/deploy-project`)**: Created new skill at `.agents/skills/deploy-project/SKILL.md` to handle production Cloudflare Workers, Cloudflare Pages SPA, D1 SQL Database manual setup, environment variables, CORS configuration, custom domain routing, and edge deployment verification.
- **Feature Implemented (Setup Handoff Optimization)**: Separated the deployment flow out of `.agents/skills/setup-project/SKILL.md`. Step 5 now completes local setup at 100% and hands off deployment to `/deploy-project`.
- **Bug Fix (IDE @tailwind & @apply Warnings)**: Added `"css.lint.unknownAtRules": "ignore"` and `"scss.lint.unknownAtRules": "ignore"` to `.vscode/settings.json` to eliminate editor warnings for Tailwind directives in `global.css`.

### [2026-07-22] - Windows Symlink Compatibility & Setup Skill Optimization
- **Feature Implemented (Windows Symlink Compatibility)**: Created root-level `.npmrc` with `node-linker=hoisted` to bypass symbolic link permissions errors on Windows.
- **Feature Implemented (Setup Skill Optimization)**: Optimized `.agents/skills/setup-project/SKILL.md` to automatically detect Windows environments and verify or configure `.npmrc` with flat hoisting before proceeding with package installation.
- **Feature Implemented (Manual Cloudflare & Clean Env setup)**: Updated the setup skill workflow and environment templates to align with manual Cloudflare Dashboard and GitHub integration deployment preferences (removing CLI-based deployments and local wrangler D1 commands), cleaned up GA4/GTM variables from `.env`, and added detailed instructions on credential gathering.
- **Feature Implemented (Industrial Agency Setup Architecture)**: Expanded the setup workflow to include structured Client Briefing Note ingestion (Gemini Chat transcript filtering), CMS feature toggle breakdowns in Sanity Studio (`siteSettings.ts`), central monorepo DRY design token rules (`global.css` & `tailwind.config.mjs`), and automated code quality checks (`pnpm lint`, `pnpm typegen`, `pnpm build`) prior to GitHub push and Cloudflare deployment.

### [2026-07-21] - Resend, D1 Database logs, Modular Page Builder & Responsive Asset Optimization
- **Feature Implemented (Resend Email Ingestion)**: Configured Resend email integration inside Astro routes with honeypot spam protection. Uses dynamic overrides pointing to `client.json` as fallbacks.
- **Feature Implemented (Cloudflare D1 Edge logging)**: Integrated Cloudflare D1 local/remote databases. Created lead submission table schemas inside `db/schema.sql` and updated database logging endpoints in Astro.
- **Feature Implemented (Sanity TypeGen Compiler Setup)**: Configured absolute schema maps inside `sanity.cli.ts` and set up standard `pnpm typegen` command wrappers in root `package.json`.
- **Feature Implemented (Modular Page Builder)**: Created layout block schemas (`heroSection`, `featuresSection`, `ctaSection`), catch-all routing paths `[...slug].astro`, custom `404.astro` dynamic templates, and `SectionMapper.astro` layout loaders.
- **Feature Implemented (Responsive Asset Optimization)**: Created image utility helpers `image.ts` and responsive `<SanityImage />` wrapper components to auto-negotiate formats (WebP/AVIF), calculate aspect-ratio boxes, and apply blur-up placeholders. Integrated responsive images in PortableText article renderers.

### [2026-07-20] - Dynamic Site Settings, GTM Integration, Performance Tracking & Dynamic PWA
- **Feature Implemented (Dynamic CMS Site Settings)**: Upgraded Sanity Studio `siteSettings` schema with grouped tabs (Business Info, Contact, Socials, SEO, Analytics, PWA Settings). Configured Astro layouts, headers, footers, and metadata to consume these parameters dynamically with automatic fallback to `client.json`.
- **Feature Implemented (Dynamic PWA & App Shortcuts)**: Migrated static webmanifest file to a dynamic Astro endpoint at `/manifest.webmanifest`. Added support for custom App Shortcuts configurable directly from Sanity Studio.
- **Feature Implemented (PWA Offline Fallback & Background Forms Sync)**: Created custom branded offline page at `/offline` with internet status check and retry buttons. Registered service worker `sw.js` for offline asset caching. Developed an IndexedDB-backed offline forms submission queue that automatically stores form inputs when offline and syncs them to the backend when connection is restored.
- **Feature Implemented (Premium Analytics & Core Web Vitals)**: Integrated Google Tag Manager container loaders, global Lead Form conversion listeners, and outbound link click trackings. Added browser-native `PerformanceObserver` logic to capture CLS, LCP, and FID metrics.
- **Bug Fix (PerformanceObserver TypeScript Warnings)**: Resolved typescript property checks on generic performance entries inside `Layout.astro` by extending `PerformanceEntry` globally inside `env.d.ts`.
- **Onboarding Guide**: Relocated the step-by-step DNS, verification, GTM setup, and Looker Studio mapping guide to `.agents/skills/setup-project/references/analytics-guide.md` for clean monorepo organization.

### [2026-07-20] - Industry-Grade Dynamic SEO, RSS, PWA, and CMS Singletons
- **Feature Implemented (Dynamic SEO)**: Developed a hierarchical fallback metadata engine, dynamic edge OG social card generator at `/api/og.png`, auto-discoverable XML sitemaps, dynamic robots.txt, auto-discoverable RSS syndication feeds at `/rss.xml`, and web manifest PWA setups.
- **Feature Implemented (CMS Settings Singleton)**: Configured custom structure resolver `deskStructure.ts` to restrict the settings schema as a singleton doc inside Sanity Studio.
- **Bug Fix (Editor Typings Clash)**: Resolved global React JSX type clashes inside `.astro` files by using raw `<Fragment set:html={...} />` strings for scripts and configuring isolated `types: []` inside `tsconfig.json`.
