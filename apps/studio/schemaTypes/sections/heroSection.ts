import { defineType, defineField } from 'sanity';

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Headline Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subheadline Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Button Label',
      type: 'string',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'CTA Button Link URL',
      type: 'string',
      description: 'Relative link (e.g. /contact) or absolute link (e.g. https://google.com).',
    }),
    defineField({
      name: 'theme',
      title: 'Section Visual Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Light Canvas', value: 'light' },
          { title: 'Dark Slate', value: 'dark' },
          { title: 'Brand Gradient Glow', value: 'brand' },
        ],
      },
      initialValue: 'light',
    }),
    defineField({
      name: 'bgImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
});
