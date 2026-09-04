import { defineType, defineField } from 'sanity';

export const seo = defineType({
  name: 'seo',
  title: 'SEO Metadata',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Meta Title',
      type: 'string',
      description: 'Title for search engines. Recommended length: 50-60 characters.',
      validation: Rule => Rule.max(60).warning('Titles longer than 60 characters may be truncated by search engines.'),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Description for search engines. Recommended length: 150-160 characters.',
      validation: Rule => Rule.max(160).warning('Descriptions longer than 160 characters may be truncated.'),
    }),
    defineField({
      name: 'shareImage',
      title: 'Share Image (OpenGraph)',
      type: 'image',
      description: 'Image displayed when sharing pages on social networks. Recommended size: 1200x630px.',
    }),
    defineField({
      name: 'noindex',
      title: 'Hide from Search Engines (noindex)',
      type: 'boolean',
      description: 'Instruct search engine crawlers not to index this page.',
      initialValue: false,
    }),
  ],
});
