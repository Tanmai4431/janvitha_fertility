import { defineType, defineField } from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Treatments & Clinical Services',
  type: 'document',
  preview: {
    select: {
      title: 'title',
      badge: 'badge',
      media: 'image',
    },
    prepare({ title, badge, media }) {
      return {
        title: title || 'Untitled Service',
        subtitle: badge ? `[ ${badge} ]` : 'Clinical Service',
        media,
      };
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Service / Treatment Title',
      type: 'string',
      description: 'The primary name of the medical or clinical service (e.g. "In Vitro Fertilization (IVF)", "Intrauterine Insemination (IUI)").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Service URL Slug',
      type: 'slug',
      description: 'Web page URL slug (e.g. /services/ivf-treatment).',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Specialty Badge / Highlight Pill',
      type: 'string',
      description: 'Highlight pill label (e.g. "Advanced ART Protocol", "Highest Success Rates", "Gentle Stimulation").',
    }),
    defineField({
      name: 'order',
      title: 'Display Order Sequence',
      type: 'number',
      description: 'Order in which this service appears on the homepage and services explorer (e.g. 1, 2, 3...).',
      initialValue: 1,
    }),
    defineField({
      name: 'image',
      title: 'Service Featured Image / Treatment Photo',
      type: 'image',
      description: 'High-resolution photo or clinical illustration representing this treatment (JPG, PNG, WebP).',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name or Keyword',
      type: 'string',
      description: 'Icon identifier (e.g. "baby", "sparkles", "dna", "heart-pulse", "microscope", "shield-check").',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Summary / Card Description',
      type: 'text',
      rows: 2,
      description: 'Concise 1-2 sentence description displayed on service overview cards and navigation dropdowns.',
    }),
    defineField({
      name: 'description',
      title: 'Comprehensive Service Overview',
      type: 'text',
      rows: 4,
      description: 'Detailed clinical explanation of what this procedure entails, who it is suitable for, and what patients can expect.',
    }),
    defineField({
      name: 'subservices',
      title: 'Procedures, Protocols & Sub-Treatments',
      type: 'array',
      description: 'List of specific procedures or techniques included under this treatment category.',
      of: [
        {
          type: 'object',
          name: 'subservice',
          title: 'Sub-Treatment Procedure',
          fields: [
            defineField({
              name: 'title',
              title: 'Procedure Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'slug',
              title: 'Optional Sub-Slug',
              type: 'string',
              description: 'e.g. "blastocyst-culture" for /services/ivf/blastocyst-culture',
            }),
            defineField({
              name: 'description',
              title: 'Procedure Description',
              type: 'text',
              rows: 2,
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'benefits',
      title: 'Key Clinical Benefits & Advantages',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of key advantages (e.g. "Personalized ovarian stimulation protocols", "Day-5 blastocyst transfer").',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Metadata Overrides',
      type: 'seo',
    }),
  ],
});
