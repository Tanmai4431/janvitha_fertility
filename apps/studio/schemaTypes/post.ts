import { defineType, defineField } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Blog Articles & News',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Article Title',
      type: 'string',
      description: 'Main headline title for the article.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Article URL Slug',
      type: 'slug',
      description: 'Web URL slug automatically generated from article title.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Article Category',
      type: 'string',
      description: 'Primary topic or category for the article.',
      options: {
        list: [
          { title: 'Web Development', value: 'Web Development' },
          { title: 'UI/UX & Design', value: 'UI/UX & Design' },
          { title: 'Engineering & Architecture', value: 'Engineering & Architecture' },
          { title: 'Insights & Trends', value: 'Insights & Trends' },
          { title: 'Case Study', value: 'Case Study' },
          { title: 'Performance & Edge', value: 'Performance & Edge' },
        ],
      },
      initialValue: 'Insights & Trends',
    }),
    defineField({
      name: 'readTime',
      title: 'Estimated Reading Time',
      type: 'string',
      description: 'Estimated reading duration (e.g. "4 min read"). If blank, auto-calculated from article word count.',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Article Badge',
      type: 'boolean',
      description: 'Mark this article as featured to showcase a highlighted badge.',
      initialValue: false,
    }),
    defineField({
      name: 'videoUrl',
      title: 'Featured Video Preview URL',
      type: 'url',
      description: 'Direct MP4 video URL or video streaming link for card video previews (e.g., https://.../video.mp4).',
    }),
    defineField({
      name: 'videoFile',
      title: 'Featured Video File Asset',
      type: 'file',
      description: 'Direct MP4 or WebM video file uploaded to Sanity CMS.',
      options: {
        accept: 'video/*',
      },
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      description: 'Name of the author or publication team member.',
    }),
    defineField({
      name: 'authorRole',
      title: 'Author Role / Title',
      type: 'string',
      description: 'Professional title or role of the author (e.g. "Lead Systems Engineer").',
    }),
    defineField({
      name: 'authorAvatar',
      title: 'Author Profile Picture',
      type: 'image',
      description: 'Avatar picture of the article author.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'tags',
      title: 'Topic Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Tag keywords associated with this article (e.g. Astro, React, Sanity).',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Article Excerpt Summary',
      type: 'text',
      rows: 3,
      description: 'Short 2-3 sentence summary displayed on blog index cards, social share snippet cards, and RSS feeds.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publication Date & Time',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Featured Cover Image',
      type: 'image',
      description: 'Primary banner image rendered at the top of the article and on thumbnail cards.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'body',
      title: 'Article Content (Rich Text)',
      type: 'array',
      description: 'Main article content including formatted text, headers, quotes, embedded images, videos, and code snippets.',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
        {
          type: 'file',
          name: 'videoFile',
          title: 'Embedded Video File',
          options: { accept: 'video/*' },
        },
        {
          type: 'object',
          name: 'videoEmbed',
          title: 'Video Link Embed',
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'Video URL (MP4 / YouTube / Vimeo)',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Video Caption',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'Article SEO Overrides',
      type: 'seo',
      description: 'Custom search engine metadata for this article (defaults to article title and excerpt if blank).',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'mainImage',
      date: 'publishedAt',
    },
    prepare({ title, author, media, date }) {
      const formattedDate = date ? new Date(date).toLocaleDateString() : 'Draft';
      return {
        title: title || 'Untitled Article',
        subtitle: `By ${author || 'Editorial Team'} • ${formattedDate}`,
        media,
      };
    },
  },
});
