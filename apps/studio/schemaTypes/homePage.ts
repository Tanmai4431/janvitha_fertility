import { defineType, defineField } from 'sanity';
import { HomeIcon } from '@sanity/icons/Home';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  preview: {
    prepare() {
      return {
        title: '🏠 Home Page Settings',
        subtitle: 'Hero Tech Stack Orbit & About Gallery',
      };
    },
  },
  groups: [
    { name: 'hero', title: '🚀 Hero Tech Stack Orbit' },
    { name: 'about', title: '📖 About Section Gallery' },
  ],
  fields: [
    // ==========================================
    // 🚀 HERO TECH STACK & PARTNER ORBIT NODES
    // ==========================================
    defineField({
      name: 'orbitItems',
      title: '🪐 Tech Stack & Partner Orbit Nodes',
      type: 'array',
      group: 'hero',
      description:
        'Configure dynamic brand logos, tech stack icons, and partner nodes rendered inside the Hero section Orbit graphic animation. The node assigned to "Center Core Hub" will be rendered in the center logo circle.',
      of: [
        {
          type: 'object',
          name: 'orbitItem',
          title: 'Orbit Node / Brand Logo',
          validation: (Rule) =>
            Rule.custom((parent: any) => {
              if (!parent) return true;
              const hasSvg = Boolean(parent.svgCode && parent.svgCode.trim().length > 0);
              const hasImage = Boolean(parent.icon && parent.icon.asset);
              if (hasSvg && hasImage) {
                return 'Mutual Exclusion Violation: You cannot have both SVG Code and an Image Asset uploaded simultaneously. Clear one format before switching.';
              }
              return true;
            }),
          preview: {
            select: {
              name: 'name',
              ring: 'ring',
              iconType: 'iconType',
              media: 'icon',
            },
            prepare({
              name,
              ring,
              iconType,
              media,
            }: {
              name?: string;
              ring?: string;
              iconType?: string;
              media?: any;
            }) {
              const ringLabel = ring ? ring.toUpperCase() : 'ORBIT RING';
              const formatLabel = iconType === 'image' ? 'Image File' : 'SVG Code';
              return {
                title: name || 'Unnamed Orbit Node',
                subtitle: `[ ${ringLabel} ] • Format: ${formatLabel}`,
                media: media,
              };
            },
          },
          fields: [
            defineField({
              name: 'name',
              title: 'Brand / Technology / Company Name',
              type: 'string',
              description:
                'Public brand name displayed in the modern hover tooltip overlay (e.g. "Welcome WebWorks", "React", "Node.js", "Astro").',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'ring',
              title: 'Orbit Ring Level / Position',
              type: 'string',
              description: 'Select where this node should be positioned in the orbit system.',
              validation: (Rule) => Rule.required(),
              initialValue: 'middle',
              options: {
                list: [
                  { title: '🎯 Center Core Hub (Middle Logo)', value: 'center' },
                  { title: '⭕ Inner Ring (Closest to Center)', value: 'inner' },
                  { title: '⭕ Middle Ring (Second Ring)', value: 'middle' },
                  { title: '⭕ Outer Ring (Furthest Ring)', value: 'outer' },
                ],
              },
            }),
            defineField({
              name: 'iconType',
              title: 'Icon Source / Format Mode',
              type: 'string',
              description:
                'Select icon format mode: Raw SVG Code or Custom Image File Upload. Note: Clear active format before switching modes.',
              initialValue: 'svg',
              options: {
                list: [
                  { title: '✒️ Raw SVG Code', value: 'svg' },
                  { title: '🖼️ Custom Image Upload', value: 'image' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'svgCode',
              title: 'Custom SVG Markup Code (Inline Raw SVG Text)',
              type: 'text',
              rows: 4,
              description:
                'Paste raw inline <svg>...</svg> code copied directly from icon libraries (e.g., Simple Icons, SVGRepo). To switch to Image Upload, clear this text field first.',
              hidden: ({ parent }) =>
                parent?.iconType === 'image' || Boolean(parent?.icon?.asset),
            }),
            defineField({
              name: 'icon',
              title: 'Custom Brand Icon / Logo (SVG or Transparent PNG File)',
              type: 'image',
              description:
                'Upload custom branded SVG or transparent PNG logo file. To switch to Raw SVG Code, remove the uploaded image asset first.',
              options: { hotspot: true },
              hidden: ({ parent }) =>
                parent?.iconType === 'svg' || Boolean(parent?.svgCode && parent?.svgCode.trim().length > 0),
            }),
            defineField({
              name: 'url',
              title: 'Target Link / Profile URL (Optional)',
              type: 'url',
              description: 'Optional URL opened when clicking this node.',
            }),
          ],
        },
      ],
    }),

    // ==========================================
    // 📖 ABOUT SECTION FEATURED MEDIA GALLERY (IMAGES & VIDEOS)
    // ==========================================
    defineField({
      name: 'aboutGallery',
      title: 'About Section Featured Media Gallery (Images & Videos)',
      type: 'array',
      group: 'about',
      description:
        'Add images or videos to create an automated 4-second cross-fade slideshow inside the clip-path frame in the About Section. You can mix image slides and video slides in any sequence.',
      of: [
        {
          type: 'object',
          name: 'aboutGalleryItem',
          title: 'Gallery Media Item',
          validation: (Rule) =>
            Rule.custom((parent: any) => {
              if (!parent) return true;
              const mediaType = parent.mediaType || 'image';

              if (mediaType === 'image') {
                const hasFile = Boolean(parent.image && parent.image.asset);
                const hasCdn = Boolean(parent.imageCdnUrl && parent.imageCdnUrl.trim().length > 0);
                if (hasFile && hasCdn) {
                  return 'Mutual Exclusion Violation: You cannot have both an Uploaded Image File and a CDN Image URL populated simultaneously. Clear one format before switching.';
                }
              }

              if (mediaType === 'video') {
                const hasFile = Boolean(parent.videoFile && parent.videoFile.asset);
                const hasCdn = Boolean(parent.videoCdnUrl && parent.videoCdnUrl.trim().length > 0);
                const hasYt = Boolean(parent.youtubeUrl && parent.youtubeUrl.trim().length > 0);

                const count = (hasFile ? 1 : 0) + (hasCdn ? 1 : 0) + (hasYt ? 1 : 0);
                if (count > 1) {
                  return 'Mutual Exclusion Violation: Only ONE video source (File Upload, CDN URL, or YouTube URL) can be active at a time. Clear other fields before switching format.';
                }
              }
              return true;
            }),
          preview: {
            select: {
              alt: 'alt',
              mediaType: 'mediaType',
              imageSourceType: 'imageSourceType',
              videoSourceType: 'videoSourceType',
              image: 'image',
              imageCdnUrl: 'imageCdnUrl',
              videoCdnUrl: 'videoCdnUrl',
              youtubeUrl: 'youtubeUrl',
            },
            prepare({ alt, mediaType = 'image', imageSourceType, videoSourceType, image, imageCdnUrl, videoCdnUrl, youtubeUrl }) {
              const isVideo = mediaType === 'video';
              const typeBadge = isVideo ? `🎬 Video (${videoSourceType || 'cdn'})` : `🖼️ Image (${imageSourceType || 'upload'})`;
              const detail = isVideo
                ? (videoSourceType === 'youtube' ? youtubeUrl : videoSourceType === 'cdn' ? videoCdnUrl : 'Uploaded Video')
                : (imageSourceType === 'cdn' ? imageCdnUrl : 'Uploaded Image');

              return {
                title: alt || detail || (isVideo ? 'Video Slide' : 'Image Slide'),
                subtitle: `Type: [ ${typeBadge} ]`,
                media: image,
              };
            },
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text / Description (Optional)',
              type: 'string',
              description: 'Optional descriptive caption or accessibility title for this slide.',
            }),
            defineField({
              name: 'mediaType',
              title: 'Media Category Type',
              type: 'string',
              description: 'Select whether this slide is an Image or a Video.',
              initialValue: 'image',
              options: {
                list: [
                  { title: '🖼️ Image Slide', value: 'image' },
                  { title: '🎬 Video Slide', value: 'video' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),

            // ══════════════════════════════════════════
            // 🖼️ IMAGE SLIDE OPTIONS (when mediaType === 'image')
            // ══════════════════════════════════════════
            defineField({
              name: 'imageSourceType',
              title: 'Image Source Mode',
              type: 'string',
              description: 'Choose whether to upload an image file directly or provide an external CDN image link.',
              initialValue: 'upload',
              options: {
                list: [
                  { title: '📁 Direct Image File Upload', value: 'upload' },
                  { title: '🌐 External Image CDN Link / URL', value: 'cdn' },
                ],
              },
              hidden: ({ parent }) => parent?.mediaType === 'video',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const p = context.parent as any;
                  if (p?.mediaType === 'image' && !value) {
                    return 'Image Source Mode is required when Media Category is Image.';
                  }
                  return true;
                }),
            }),
            defineField({
              name: 'image',
              title: 'Image File Upload',
              type: 'image',
              description: 'Upload image file directly (PNG, WebP, JPG, SVG).',
              options: { hotspot: true },
              hidden: ({ parent }) =>
                parent?.mediaType === 'video' ||
                parent?.imageSourceType === 'cdn' ||
                Boolean(parent?.imageCdnUrl && parent?.imageCdnUrl.trim().length > 0),
            }),
            defineField({
              name: 'imageCdnUrl',
              title: 'External Image CDN Link / URL',
              type: 'url',
              description: 'Direct web link to image asset hosted on a CDN (e.g. Unsplash, Cloudinary, Imgur, AWS S3).',
              hidden: ({ parent }) =>
                parent?.mediaType === 'video' ||
                parent?.imageSourceType === 'upload' ||
                Boolean(parent?.image?.asset),
            }),

            // ══════════════════════════════════════════
            // 🎬 VIDEO SLIDE OPTIONS (when mediaType === 'video')
            // ══════════════════════════════════════════
            defineField({
              name: 'videoSourceType',
              title: 'Video Source Mode',
              type: 'string',
              description: 'Choose between External Direct Video CDN URL (MP4/WebM), YouTube Video Link, or Direct Video File Upload.',
              initialValue: 'cdn',
              options: {
                list: [
                  { title: '🌐 External Video CDN Link (MP4 / WebM)', value: 'cdn' },
                  { title: '▶️ YouTube Video Link / Embed URL', value: 'youtube' },
                  { title: '📁 Direct Video File Upload', value: 'upload' },
                ],
              },
              hidden: ({ parent }) => parent?.mediaType !== 'video',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const p = context.parent as any;
                  if (p?.mediaType !== 'image' && p?.mediaType === 'video' && !value) {
                    return 'Video Source Mode is required when Media Category is Video.';
                  }
                  return true;
                }),
            }),
            defineField({
              name: 'videoCdnUrl',
              title: 'External Video CDN Link / Direct MP4 URL',
              type: 'url',
              description: 'Direct web link to MP4/WebM video asset hosted on a CDN (e.g. https://cdn.example.com/demo.mp4).',
              hidden: ({ parent }) =>
                parent?.mediaType !== 'video' ||
                parent?.videoSourceType !== 'cdn' ||
                Boolean(parent?.videoFile?.asset) ||
                Boolean(parent?.youtubeUrl && parent?.youtubeUrl.trim().length > 0),
            }),
            defineField({
              name: 'youtubeUrl',
              title: 'YouTube Video Link / Watch URL',
              type: 'url',
              description: 'Paste YouTube video link (e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ or https://youtu.be/dQw4w9WgXcQ).',
              hidden: ({ parent }) =>
                parent?.mediaType !== 'video' ||
                parent?.videoSourceType !== 'youtube' ||
                Boolean(parent?.videoFile?.asset) ||
                Boolean(parent?.videoCdnUrl && parent?.videoCdnUrl.trim().length > 0),
            }),
            defineField({
              name: 'videoFile',
              title: 'Direct Video File Upload',
              type: 'file',
              options: {
                accept: 'video/mp4,video/webm,video/ogg',
              },
              description: 'Upload video file directly (MP4 / WebM recommended).',
              hidden: ({ parent }) =>
                parent?.mediaType !== 'video' ||
                parent?.videoSourceType !== 'upload' ||
                Boolean(parent?.videoCdnUrl && parent?.videoCdnUrl.trim().length > 0) ||
                Boolean(parent?.youtubeUrl && parent?.youtubeUrl.trim().length > 0),
            }),
          ],
        },
      ],
    }),
  ],
});
