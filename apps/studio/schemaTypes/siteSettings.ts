import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Global Site Settings & System Config',
  type: 'document',
  preview: {
    select: {
      name: 'name',
      tagline: 'tagline',
    },
    prepare({ name, tagline }) {
      return {
        title: name ? `${name} — Global Site Settings` : 'Global Site Settings & System Config',
        subtitle: tagline || 'Unified Business, SEO, Analytics & Infrastructure Configuration',
      };
    },
  },
  groups: [
    { name: 'business', title: '🏢 Business Profile' },
    { name: 'specialist', title: '👨‍⚕️ Specialist / Doctor Profile' },
    { name: 'branding', title: '🎨 Logo & Brand Assets' },
    { name: 'contact', title: '📞 Contact & Address' },
    { name: 'socials', title: '🌐 Social Profiles' },
    { name: 'seo', title: '🔍 Global SEO & Sharing' },
    { name: 'analytics', title: '⚠️ Analytics & Tracking' },
    { name: 'emails', title: '📧 Lead Email Setup' },
    { name: 'pwa', title: '📱 Mobile PWA & Offline' },
    { name: 'toggles', title: '🎛️ Feature Toggles & UX Controls' },
  ],
  fields: [
    defineField({
      name: 'businessGuideNote',
      type: 'string',
      hidden: true,
      group: 'business',
    }),
    defineField({
      name: 'specialistGuideNote',
      type: 'string',
      hidden: true,
      group: 'specialist',
    }),
    defineField({
      name: 'brandingGuideNote',
      type: 'string',
      hidden: true,
      group: 'branding',
    }),
    defineField({
      name: 'contactGuideNote',
      type: 'string',
      hidden: true,
      group: 'contact',
    }),
    defineField({
      name: 'socialGuideNote',
      type: 'string',
      hidden: true,
      group: 'socials',
    }),
    defineField({
      name: 'pwaGuideNote',
      type: 'string',
      hidden: true,
      group: 'pwa',
    }),
    // ==========================================
    // 🏢 BUSINESS PROFILE & BRANDING
    // ==========================================
    defineField({
      name: 'name',
      title: 'Company Name',
      type: 'string',
      description: 'The primary public name of your business or organization as rendered across website headers, footers, and page metadata.',
      validation: (Rule) => Rule.required(),
      group: 'business',
    }),
    defineField({
      name: 'legalName',
      title: 'Legal Registered Entity Name',
      type: 'string',
      description: 'Registered legal entity name used on legal disclaimers, privacy policy footers, copyright notices, and formal invoices.',
      group: 'business',
    }),
    defineField({
      name: 'tagline',
      title: 'Company Tagline / Value Proposition',
      type: 'string',
      description: 'A succinct hero tagline describing your primary service offering or brand motto (e.g. "Next-Generation Digital Experiences").',
      group: 'business',
    }),
    defineField({
      name: 'description',
      title: 'Business Overview & Mission Statement',
      type: 'text',
      rows: 3,
      description: 'Comprehensive business overview used for brand listings, search engine structured snippet summaries, and about previews.',
      group: 'business',
    }),

    // ==========================================
    // 👨‍⚕️ SPECIALIST / DOCTOR PROFILE
    // ==========================================
    defineField({
      name: 'specialistName',
      title: 'Doctor / Specialist Full Name',
      type: 'string',
      description: 'Primary doctor or clinical specialist name (e.g. "Dr. P. Bharathi"). Displayed in about sections, hero cards, and blog articles.',
      group: 'specialist',
    }),
    defineField({
      name: 'specialistDesignation',
      title: 'Doctor Professional Title / Designation',
      type: 'string',
      description: 'Medical title or specialty designation (e.g. "Consultant Obstetrician & Gynaecologist").',
      group: 'specialist',
    }),
    defineField({
      name: 'specialistExperience',
      title: 'Experience Highlight / Subtitle',
      type: 'string',
      description: 'Key experience statement (e.g. "15+ Years in Reproductive Medicine & Fetal Diagnostics").',
      group: 'specialist',
    }),
    defineField({
      name: 'specialistBio',
      title: 'Doctor Biography / Clinical Overview',
      type: 'text',
      rows: 4,
      description: 'Detailed doctor biography and medical philosophy displayed on the homepage and about page.',
      group: 'specialist',
    }),
    defineField({
      name: 'specialistImage',
      title: 'Doctor / Specialist Portrait Photo',
      type: 'image',
      description: 'High-resolution portrait photo of the doctor (PNG, WebP, or JPG). Displayed in about cards and doctor profile sections.',
      options: { hotspot: true },
      group: 'specialist',
    }),
    defineField({
      name: 'specialistQualifications',
      title: 'Degrees, Fellowships & Accreditations',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of degrees and international fellowships (e.g. "Fellow in Fetal Medicine, FMF (UK)", "Recognised Fellowship in Reproductive Medicine").',
      group: 'specialist',
    }),

    // ==========================================
    // 🎨 LOGO & BRAND ASSETS (DYNAMIC CMS MANAGEMENT)
    // ==========================================
    defineField({
      name: 'logo',
      title: 'Primary Brand Logo (Detailed with Text)',
      type: 'image',
      description: 'Primary detailed brand logo with emblem and company text (SVG or transparent PNG recommended). Used in main site headers and JSON-LD schemas.',
      options: { hotspot: true },
      group: 'branding',
    }),
    defineField({
      name: 'invertedLogo',
      title: 'Inverted / Dark Theme Brand Logo',
      type: 'image',
      description: 'Alternative brand logo designed for dark background containers or dark mode footers (SVG or transparent PNG).',
      options: { hotspot: true },
      group: 'branding',
    }),
    defineField({
      name: 'brandIcon',
      title: 'Brand Icon / Emblem / Mark (Square)',
      type: 'image',
      description: 'Standalone square brand emblem or icon mark without company text. Used in mobile headers, browser favicons, Apple iOS bookmarks, web app shortcuts, and Sanity Studio navbar.',
      options: { hotspot: true },
      group: 'branding',
    }),

    // ==========================================
    // 📞 CONTACT & ADDRESS DETAILS
    // ==========================================
    defineField({
      name: 'primaryEmail',
      title: 'Primary Contact Email Address',
      type: 'string',
      description: 'Main public email address displayed on contact pages and header contact widgets (e.g. hello@welcomewebworks.com).',
      validation: (Rule) => Rule.email(),
      group: 'contact',
    }),
    defineField({
      name: 'supportEmail',
      title: 'Customer Support Email Address',
      type: 'string',
      description: 'Dedicated support or helpdesk email address (e.g. support@welcomewebworks.com).',
      validation: (Rule) => Rule.email(),
      group: 'contact',
    }),
    defineField({
      name: 'primaryPhone',
      title: 'Primary Business Phone Number',
      type: 'string',
      description: 'Formatted phone number for mobile tap-to-call links (e.g. +1 (555) 019-2834).',
      group: 'contact',
    }),
    defineField({
      name: 'secondaryPhone',
      title: 'Secondary / Direct Toll-Free Phone',
      type: 'string',
      description: 'Optional secondary contact line or direct office extension.',
      group: 'contact',
    }),
    defineField({
      name: 'addressStreet',
      title: 'Street Address',
      type: 'string',
      description: 'Physical headquarters street address (e.g. 100 Innovation Boulevard, Suite 400).',
      group: 'contact',
    }),
    defineField({
      name: 'addressCity',
      title: 'City',
      type: 'string',
      description: 'City or municipality name.',
      group: 'contact',
    }),
    defineField({
      name: 'addressState',
      title: 'State / Province / Region',
      type: 'string',
      description: 'State or region code (e.g. CA, NY, ON).',
      group: 'contact',
    }),
    defineField({
      name: 'addressZip',
      title: 'Zip / Postal Code',
      type: 'string',
      description: 'Postal routing code.',
      group: 'contact',
    }),
    defineField({
      name: 'addressCountry',
      title: 'Country',
      type: 'string',
      description: 'Country name (e.g. United States, Canada).',
      group: 'contact',
    }),

    // ==========================================
    // 🌐 DYNAMIC SOCIAL PROFILES & PLATFORM LOGOS
    // ==========================================
    defineField({
      name: 'socialLinks',
      title: 'Dynamic Social Media Profiles',
      type: 'array',
      description:
        'Configure social media platform links and custom branded icons displayed across mobile navigation drawers, footers, contact pages, and site metadata. Only items with a valid URL populated will be published and rendered on the website.',
      group: 'socials',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          title: 'Social Media Profile',
          validation: (Rule) =>
            Rule.custom((parent: any) => {
              if (!parent) return true;
              const hasSvg = Boolean(parent.svgCode && parent.svgCode.trim().length > 0);
              const hasImage = Boolean(parent.icon && parent.icon.asset);
              if (hasSvg && hasImage) {
                return 'Mutual Exclusion Violation: You cannot have both SVG Code and an Image Asset uploaded simultaneously. Clear one format to switch.';
              }
              return true;
            }),
          preview: {
            select: {
              platform: 'platform',
              customPlatformName: 'customPlatformName',
              url: 'url',
              media: 'icon',
            },
            prepare({ platform, customPlatformName, url, media }) {
              const displayTitle =
                platform === 'Other' && customPlatformName
                  ? customPlatformName
                  : platform || 'Social Profile';
              return {
                title: displayTitle,
                subtitle: url ? url : '🔴 Missing URL (Hidden on website)',
                media: media,
              };
            },
          },
          fields: [
            defineField({
              name: 'platform',
              title: 'Social Media Platform',
              type: 'string',
              description: 'Select the social media platform from the dropdown menu.',
              validation: (Rule) => Rule.required(),
              options: {
                list: [
                  { title: 'LinkedIn', value: 'LinkedIn' },
                  { title: 'Instagram', value: 'Instagram' },
                  { title: 'X (Twitter)', value: 'X (Twitter)' },
                  { title: 'Facebook', value: 'Facebook' },
                  { title: 'GitHub', value: 'GitHub' },
                  { title: 'YouTube', value: 'YouTube' },
                  { title: 'WhatsApp', value: 'WhatsApp' },
                  { title: 'TikTok', value: 'TikTok' },
                  { title: 'Pinterest', value: 'Pinterest' },
                  { title: 'Discord', value: 'Discord' },
                  { title: 'Other', value: 'Other' },
                ],
              },
            }),
            defineField({
              name: 'customPlatformName',
              title: 'Custom Platform Name (if Other)',
              type: 'string',
              description: 'Specify the name of the social platform if "Other" is selected above.',
              hidden: ({ parent }) => parent?.platform !== 'Other',
            }),
            defineField({
              name: 'url',
              title: 'Profile / Channel URL',
              type: 'url',
              description:
                'Full profile web link (e.g. https://instagram.com/welcomewebworks). Required to render this icon on the website.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'iconType',
              title: 'Icon Source / Format Mode',
              type: 'string',
              description:
                'Select format mode: Raw SVG Code or Image File Upload. Note: Clear the active format before switching modes.',
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
              title: 'Custom SVG Markup Code (Inline Raw SVG)',
              type: 'text',
              rows: 4,
              description:
                'Paste raw inline <svg>...</svg> code copied directly from icon libraries (e.g. Simple Icons, SVGRepo). To switch to Image Upload, clear this text field first.',
              hidden: ({ parent }) =>
                parent?.iconType === 'image' || Boolean(parent?.icon?.asset),
            }),
            defineField({
              name: 'icon',
              title: 'Custom Platform Icon / Logo (SVG or Transparent PNG File)',
              type: 'image',
              description:
                'Upload custom branded SVG or transparent PNG logo file. To switch to Raw SVG Code, remove the uploaded image asset first.',
              options: { hotspot: true },
              hidden: ({ parent }) =>
                parent?.iconType === 'svg' || Boolean(parent?.svgCode && parent?.svgCode.trim().length > 0),
            }),
          ],
        },
      ],
    }),

    // ==========================================
    // 🔍 GLOBAL SEO & SHARING
    // ==========================================
    defineField({
      name: 'title',
      title: 'Default Search Engine Meta Title',
      type: 'string',
      description: 'Fallback browser tab and search listing title (e.g. "Welcome WebWorks | Enterprise Digital Solutions"). Recommended length: 50-60 characters.',
      validation: (Rule) => Rule.max(60).warning('Titles longer than 60 characters may be truncated in search results.'),
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Default Search Engine Meta Description',
      type: 'text',
      rows: 3,
      description: 'Fallback description text displayed under search engine links. Recommended length: 140-160 characters.',
      validation: (Rule) => Rule.max(160).warning('Descriptions longer than 160 characters may be truncated.'),
      group: 'seo',
    }),
    defineField({
      name: 'shareImage',
      title: 'Default Social Share Image (OpenGraph)',
      type: 'image',
      description: 'Default preview graphic displayed when links are shared on social platforms (Recommended resolution: 1200x630px, JPG/PNG).',
      options: { hotspot: true },
      group: 'seo',
    }),

    // ==========================================
    // ⚠️ ANALYTICS & TRACKING (PROTECTED DEVELOPER ZONE)
    // ==========================================
    defineField({
      name: 'googleSiteVerificationId',
      title: 'Google Site Verification Token',
      type: 'string',
      description:
        '⚠️ DEVELOPER TRACKING INFRASTRUCTURE — CONSULT DEVELOPER BEFORE EDITING:\n' +
        '📌 PURPOSE: Verifies domain ownership in Google Search Console to monitor search queries, indexing coverage, site speed, and structured data errors.\n\n' +
        '📖 DEVELOPER SETUP GUIDE:\n' +
        '1️⃣ Sign into Google Search Console: https://search.google.com/search-console\n' +
        '2️⃣ Choose "URL Prefix" method and enter your site URL (e.g. https://welcomewebworks.com).\n' +
        '3️⃣ Under "HTML tag" verification method, copy the unique token inside content="..." (e.g. aBcDeFgHiJkLmNoPqRsTuVwXyZ123456).\n' +
        '4️⃣ Paste the token into this field and Publish.',
      group: 'analytics',
    }),
    defineField({
      name: 'googleAnalyticsId',
      title: 'Google Analytics 4 (GA4) Measurement ID',
      type: 'string',
      description:
        '⚠️ DEVELOPER TRACKING INFRASTRUCTURE — CONSULT DEVELOPER BEFORE EDITING:\n' +
        '📌 PURPOSE: Tracks real-time site traffic, visitor demographics, session duration, traffic sources, page views, and custom lead conversion events.\n\n' +
        '📖 DEVELOPER SETUP GUIDE:\n' +
        '1️⃣ Log into Google Analytics: https://analytics.google.com\n' +
        '2️⃣ Navigate to Admin ➔ Data streams ➔ Select Web Stream.\n' +
        '3️⃣ Copy the "Measurement ID" (Format MUST begin with "G-", e.g., G-X1Y2Z3A4B5).\n' +
        '4️⃣ Paste the Measurement ID into this field and Publish.',
      group: 'analytics',
    }),
    defineField({
      name: 'googleTagManagerId',
      title: 'Google Tag Manager (GTM) Container ID',
      type: 'string',
      description:
        '⚠️ DEVELOPER TRACKING INFRASTRUCTURE — CONSULT DEVELOPER BEFORE EDITING:\n' +
        '📌 PURPOSE: Centralized tag management container for deploying tracking scripts, custom conversion events, and analytics triggers without code redeployments.\n\n' +
        '📖 DEVELOPER SETUP GUIDE:\n' +
        '1️⃣ Log into Google Tag Manager: https://tagmanager.google.com\n' +
        '2️⃣ Locate Container ID in top navigation header (Format MUST begin with "GTM-", e.g., GTM-ABC1234).\n' +
        '3️⃣ Paste the Container ID into this field and Publish.',
      group: 'analytics',
    }),

    // ==========================================
    // 📧 LEAD EMAIL NOTIFICATIONS & RESEND API PIPELINE
    // ==========================================
    defineField({
      name: 'resendApiKey',
      title: 'Resend API Key',
      type: 'string',
      description:
        '⚠️ DEVELOPER EMAIL PIPELINE:\n' +
        'Paste your Resend API key (e.g., re_NeBG1Aqp_...). Configured directly in Sanity Studio CMS for zero-downtime key rotation. If unconfigured, falls back to process.env.RESEND_API_KEY.',
      group: 'emails',
    }),
    defineField({
      name: 'emailFromName',
      title: 'Sender Display Name',
      type: 'string',
      description:
        'Name displayed in customer inboxes when automated notifications are dispatched (e.g. "Welcome WebWorks Notifications").',
      group: 'emails',
    }),
    defineField({
      name: 'emailFromAddress',
      title: 'Sender Email Address (Must be Domain Verified)',
      type: 'string',
      description:
        '⚠️ SENDER DOMAIN VERIFICATION REQUIREMENT:\n' +
        'Verified sender email address (e.g. notifications@welcomewebworks.com). MUST match a domain pre-verified in your Resend account.',
      validation: (Rule) => Rule.email(),
      group: 'emails',
    }),
    defineField({
      name: 'emailTo',
      title: 'Recipient Lead Email Address(es)',
      type: 'string',
      description:
        'Email address(es) where contact form inquiries should be delivered. Supports multiple recipient emails separated by commas (e.g. leads@welcomewebworks.com, sales@welcomewebworks.com).',
      group: 'emails',
    }),
    defineField({
      name: 'emailCc',
      title: 'CC Recipient Email Address(es)',
      type: 'string',
      description:
        'Optional carbon copy (CC) email recipients for team monitoring. Supports multiple emails separated by commas (e.g. founder@welcomewebworks.com, team@welcomewebworks.com).',
      group: 'emails',
    }),
    defineField({
      name: 'emailSubjectTemplate',
      title: 'Inquiry Email Subject Template',
      type: 'string',
      description:
        'Subject line template for lead alert emails. Use {name} as a dynamic placeholder for the submitter (e.g. "New Website Inquiry from {name}").',
      group: 'emails',
    }),

    // ==========================================
    // 📱 MOBILE PWA & OFFLINE EXPERIENCE
    // ==========================================
    defineField({
      name: 'enablePwaBanner',
      title: 'Enable PWA Mobile App Install Banner',
      type: 'boolean',
      initialValue: true,
      description:
        'When ENABLED (default): Displays a floating PWA installation banner prompting mobile & desktop visitors to install the site as a native home-screen app. When DISABLED: Hides the installation prompt banner completely across all pages.',
      group: 'pwa',
    }),
    defineField({
      name: 'pwaLimitOncePerDay',
      title: 'Limit Install Banner to Once Per Day Per User',
      type: 'boolean',
      initialValue: true,
      description:
        'When ENABLED (default): Displays the PWA install toast strictly once per calendar day per user device. When DISABLED: Displays the toast on every page load whenever PWA installation is available.',
      group: 'pwa',
    }),
    defineField({
      name: 'pwaBannerDisplaySeconds',
      title: 'Banner Auto-Disappear Duration (Seconds)',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(60),
      description:
        'Duration in seconds before the PWA install toast automatically slides out and disappears. Default: 5 seconds.',
      group: 'pwa',
    }),
    defineField({
      name: 'pwaAppIcon',
      title: 'PWA Application Icon / Logo',
      type: 'image',
      description: 'Dedicated high-resolution application logo (512x512 PNG/SVG recommended) used when users install or add the website as a PWA app on mobile/desktop home screens. Falls back to Brand Icon or Favicon if unconfigured.',
      options: { hotspot: true },
      group: 'pwa',
    }),
    defineField({
      name: 'pwaOfflineTitle',
      title: 'PWA Offline Page Title',
      type: 'string',
      description: 'Headline title rendered on the branded offline fallback screen when a user loses network connection.',
      group: 'pwa',
    }),
    defineField({
      name: 'pwaOfflineDescription',
      title: 'PWA Offline Explanation Text',
      type: 'text',
      rows: 3,
      description: 'Explanatory message instructing offline users how to retry connection or view saved offline content.',
      group: 'pwa',
    }),
    defineField({
      name: 'pwaShortcuts',
      title: 'Mobile Home-Screen App Shortcuts',
      type: 'array',
      description: 'Custom quick-action shortcuts displayed when users long-press your app icon on mobile devices (iOS / Android).',
      group: 'pwa',
      of: [
        {
          type: 'object',
          name: 'shortcut',
          title: 'App Shortcut Action',
          fields: [
            defineField({ name: 'name', title: 'Shortcut Name', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'url', title: 'Target Relative URL', type: 'string', description: 'Relative path (e.g. /contact, /services)', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Action Subtitle', type: 'string' }),
          ],
        },
      ],
    }),

    // ==========================================
    // 🎛️ FEATURE TOGGLES & GLOBAL UX CONTROLS
    // ==========================================
    defineField({
      name: 'enablePageAnimations',
      title: 'Page Load & Scroll Entrance Animations',
      type: 'boolean',
      initialValue: true,
      description:
        'When ENABLED (default): Smooth entrance animations, scroll-triggered fade-ups, and staggered content reveal transitions run globally across page sections. When DISABLED: Page-level entrance transitions and scroll reveals are turned off globally for clients preferring instant static loading, while interactive micro-animations (buttons, hover states, menu drawers, floating header) remain active.',
      group: 'toggles',
    }),
    defineField({
      name: 'enableWhatsAppWidget',
      title: 'Desktop Sticky WhatsApp Widget',
      type: 'boolean',
      initialValue: true,
      description:
        'When ENABLED (default): Displays the right-side sticky WhatsApp chat widget on desktop screens. When DISABLED: Completely removes the desktop sticky WhatsApp widget from all pages.',
      group: 'toggles',
    }),
    defineField({
      name: 'whatsAppPhone',
      title: 'WhatsApp Target Phone Number',
      type: 'string',
      description: 'WhatsApp target phone number with country code (e.g., India: +919491309988, US/Canada: +14155552671, UK: +447911123456). Falls back to Primary Contact Phone if unconfigured.',
      hidden: ({ parent }) => !parent?.enableWhatsAppWidget,
      group: 'toggles',
    }),
    defineField({
      name: 'whatsAppMessage',
      title: 'WhatsApp Default Pre-filled Message',
      type: 'string',
      description: 'Pre-filled greeting message automatically entered into customer WhatsApp chats when opening the link.',
      hidden: ({ parent }) => !parent?.enableWhatsAppWidget,
      group: 'toggles',
    }),
    defineField({
      name: 'whatsAppShowActiveStatus',
      title: 'Show Live Online Active Status Dot',
      type: 'boolean',
      initialValue: true,
      description: 'When ENABLED (default): Displays a pulsing green status indicator dot on the WhatsApp button indicating active support availability.',
      hidden: ({ parent }) => !parent?.enableWhatsAppWidget,
      group: 'toggles',
    }),
    defineField({
      name: 'whatsAppIconType',
      title: 'WhatsApp Icon Format',
      type: 'string',
      initialValue: 'default',
      options: {
        list: [
          { title: 'Standard WhatsApp Brand Icon', value: 'default' },
          { title: 'Custom Inline SVG Code', value: 'customSvg' },
          { title: 'Custom Uploaded Image Asset', value: 'customImage' },
        ],
        layout: 'radio',
      },
      hidden: ({ parent }) => !parent?.enableWhatsAppWidget,
      group: 'toggles',
    }),
    defineField({
      name: 'whatsAppCustomSvg',
      title: 'Custom WhatsApp SVG Code',
      type: 'text',
      rows: 4,
      description: 'Raw SVG markup for custom branded icons.',
      hidden: ({ parent }) => !parent?.enableWhatsAppWidget || parent?.whatsAppIconType !== 'customSvg',
      group: 'toggles',
    }),
    defineField({
      name: 'whatsAppCustomImage',
      title: 'Custom WhatsApp Image Asset',
      type: 'image',
      options: { hotspot: true },
      description: 'Uploaded image file (PNG/SVG/WEBP) to use as the WhatsApp floating button icon.',
      hidden: ({ parent }) => !parent?.enableWhatsAppWidget || parent?.whatsAppIconType !== 'customImage',
      group: 'toggles',
    }),
  ],
});
