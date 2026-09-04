import { defineType, defineField } from 'sanity';

export const ctaSection = defineType({
  name: 'ctaSection',
  title: 'Call to Action Banner',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Headline Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description Text',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Button Label',
      type: 'string',
    }),
    defineField({
      name: 'buttonUrl',
      title: 'Button Link URL',
      type: 'string',
      description: 'Relative link (e.g. /contact) or absolute link.',
    }),
    defineField({
      name: 'theme',
      title: 'Section Visual Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Clean Glassmorphism Border', value: 'outline' },
          { title: 'Rich Indigo Radial Glow', value: 'indigo' },
        ],
      },
      initialValue: 'outline',
    }),
  ],
});
