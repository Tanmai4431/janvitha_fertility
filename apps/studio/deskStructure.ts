import type { StructureResolver } from 'sanity/structure';
import { CogIcon } from '@sanity/icons/Cog';
import { ComposeIcon } from '@sanity/icons/Compose';
import { HomeIcon } from '@sanity/icons/Home';
import { UserIcon } from '@sanity/icons/User';
import { CaseIcon } from '@sanity/icons/Case';
import { DocumentsIcon } from '@sanity/icons/Documents';

/**
 * Sanity Studio Desk Structure
 * ─────────────────────────────────────────────────────────────
 *
 * 🏠 Home Page                    Singleton: Hero + Orbit Items + Hospital Photos
 * 👨‍⚕️ Doctor Profile               Singleton: Doctor Portrait, Name, Bio, Fellowships
 * 🔬 Treatments & Services        Collection: All clinical fertility treatments
 * 📰 Blog Articles                Collection: Medical articles & guides
 *
 * ─ divider ─
 *
 * ⚙️ Global Site Settings         Singleton: Branding, SEO, Contact, Analytics, PWA
 * 📄 Other Pages                  Static and custom page builders
 * ─────────────────────────────────────────────────────────────
 */
export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Content Workspace')
    .items([

      // ─────────────────────────────────────
      // 🏠 Home Page (Singleton)
      // Contains: Hero Section, Orbit Items, Hospital Facility Photos
      // ─────────────────────────────────────
      S.listItem()
        .title('🏠 Home Page')
        .icon(HomeIcon)
        .id('homePage')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
            .title('Home Page Settings')
        ),

      // ─────────────────────────────────────
      // 👨‍⚕️ Doctor & Specialist Profile (Singleton)
      // Contains: Doctor Portrait Photo, Bio, Qualifications, Title
      // ─────────────────────────────────────
      S.listItem()
        .title('👨‍⚕️ Doctor Profile')
        .icon(UserIcon)
        .id('doctorProfile')
        .child(
          S.document()
            .schemaType('doctorProfile')
            .documentId('doctorProfile')
            .title('Doctor & Specialist Profile')
        ),

      // ─────────────────────────────────────
      // 🔬 Treatments & Clinical Services (Collection)
      // Contains: IVF, IUI, ICSI, PICSI, Genetic Programs, etc.
      // ─────────────────────────────────────
      S.listItem()
        .title('🔬 Treatments & Services')
        .icon(CaseIcon)
        .child(
          S.documentTypeList('service')
            .title('Treatments & Clinical Services')
        ),

      // ─────────────────────────────────────
      // 📰 Blog Articles & News (Collection)
      // ─────────────────────────────────────
      S.listItem()
        .title('📰 Blog Articles')
        .icon(ComposeIcon)
        .child(
          S.documentTypeList('post')
            .title('Blog Articles & Clinical Guides')
        ),

      // Visual separator — divides content from system configuration
      S.divider(),

      // ─────────────────────────────────────
      // ⚙️ GLOBAL SITE SETTINGS (Singleton)
      // Branding, Logo, SEO, Analytics, Contact, WhatsApp
      // ─────────────────────────────────────
      S.listItem()
        .title('⚙️ Global Site Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Global Site Settings')
        ),

      // ─────────────────────────────────────
      // 📄 All Additional Pages
      // ─────────────────────────────────────
      S.listItem()
        .title('📄 Other Custom Pages')
        .icon(DocumentsIcon)
        .child(
          S.documentTypeList('page')
            .title('Custom Pages')
        ),

    ]);

