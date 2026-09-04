import { defineType, defineField } from 'sanity';

export const page = defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'The internal and default public display title of this web page (e.g. "Home", "About Us", "Services").',
      validation: (Rule) => Rule.required().error('A page title is required to generate URL routes.'),
    }),
    defineField({
      name: 'slug',
      title: 'Page URL Route Slug',
      type: 'slug',
      description: 'The relative web URL path where this page is accessed. Use "home" or "/" for your homepage, or hyphenated names like "services-pricing" for subpages.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('A URL slug is required to render page routes.'),
    }),
    defineField({
      name: 'seo',
      title: 'Page SEO & Social Metadata Overrides',
      type: 'seo',
      description: 'Custom search engine titles, descriptions, and share graphics specific to this page (falls back to Global Site Settings if left unconfigured).',
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Modular Layout Sections (Page Builder)',
      type: 'array',
      description: 'Assemble and sequence custom section components to construct the visual layout of this page. Drag-and-drop to reorder sections.',
      of: [
        { type: 'heroSection', title: 'Hero Headline Banner' },
        { type: 'featuresSection', title: 'Feature Grid / Capabilities Section' },
        { type: 'ctaSection', title: 'Call To Action (CTA) Banner' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({ title, slug }) {
      return {
        title: title || 'Untitled Page',
        subtitle: slug ? `Path: /${slug === '/' ? '' : slug}` : 'No URL slug set',
      };
    },
  },
});
