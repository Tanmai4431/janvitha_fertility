import type { StructureResolver } from 'sanity/structure';
import { CogIcon } from '@sanity/icons/Cog';
import { DocumentsIcon } from '@sanity/icons/Documents';
import { ComposeIcon } from '@sanity/icons/Compose';
import { HomeIcon } from '@sanity/icons/Home';

/**
 * Sanity Studio Desk Structure
 * ─────────────────────────────────────────────────────────────
 *
 * ARCHITECTURE: Pages → Sections → Components
 *
 * 📄 Pages                          ← All website pages live here
 *   ├── 🏠 Home Page                  Singleton: Hero + Orbit Items + SEO
 *   └── 📰 Blog                       Sub-folder: list of blog articles
 *
 *   [Future pages added here as the site grows dynamic:]
 *   ├── 📞 Contact Page
 *   ├── 🛠️ Services Page
 *   └── 💼 Our Works Page
 *
 * ─ divider ─
 *
 * ⚙️  Global Site Settings          ← System / rare-touch (branding, SEO, analytics, email, PWA)
 *
 * ─────────────────────────────────────────────────────────────
 */
export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Content Workspace')
    .items([

      // ══════════════════════════════════════════════
      // 📄 PAGES — All website pages live here
      // ══════════════════════════════════════════════
      S.listItem()
        .title('Pages')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Website Pages')
            .items([

              // ─────────────────────────────────────
              // 🏠 Home Page (Singleton)
              // Contains: Hero Section, Orbit Items, SEO
              // ─────────────────────────────────────
              S.listItem()
                .title('Home Page')
                .icon(HomeIcon)
                .id('homePage')
                .child(
                  S.document()
                    .schemaType('homePage')
                    .documentId('homePage')
                    .title('Home Page')
                ),

              // ─────────────────────────────────────
              // 📰 Blog
              // Sub-folder: contains list of blog article documents
              // ─────────────────────────────────────
              S.listItem()
                .title('Blog')
                .icon(ComposeIcon)
                .child(
                  S.documentTypeList('post')
                    .title('Blog Articles')
                ),

              // ─────────────────────────────────────
              // [Future Pages — Add here as pages become CMS-driven]
              // e.g.:
              //   S.listItem().title('Services Page').child(...)
              //   S.listItem().title('Contact Page').child(...)
              //   S.listItem().title('Our Works Page').child(...)
              // ─────────────────────────────────────
            ])
        ),

      // Visual separator — divides content from system configuration
      S.divider(),

      // ══════════════════════════════════════════════
      // ⚙️  GLOBAL SITE SETTINGS — System / Rare Touch
      // Branding, SEO, Analytics, Email, PWA, Social Links
      // ══════════════════════════════════════════════
      S.listItem()
        .title('Global Site Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Global Site Settings')
        ),

    ]);
