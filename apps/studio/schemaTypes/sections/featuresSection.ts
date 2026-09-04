import { defineType, defineField } from 'sanity';

export const featuresSection = defineType({
  name: 'featuresSection',
  title: 'Features Grid Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'theme',
      title: 'Section Visual Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Light Canvas', value: 'light' },
          { title: 'Dark Slate', value: 'dark' },
        ],
      },
      initialValue: 'light',
    }),
    defineField({
      name: 'features',
      title: 'Feature Cards List',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'featureItem',
          title: 'Feature Card Item',
          fields: [
            defineField({
              name: 'title',
              title: 'Card Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Card Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'iconName',
              title: 'Lucide Icon Name',
              type: 'string',
              description: 'Exact name of a Lucide Icon (e.g. Sparkles, Shield, Cpu, Activity). See lucide.dev.',
              initialValue: 'Sparkles',
            }),
          ],
        },
      ],
    }),
  ],
});
