import client from '../../../../client.json';
import { getSiteSettings, urlFor } from '../utils/sanity';

export async function GET() {
  const siteSettings = await getSiteSettings();

  const name = siteSettings?.name || client.business.name;
  const shortName = name.split(' ')[0] || name;
  const description = siteSettings?.seoDescription || client.seo.defaultDescription;

  // Format PWA shortcuts from Sanity CMS
  const shortcuts = siteSettings?.pwaShortcuts?.map((s: any) => ({
    name: s.name,
    url: s.url,
    description: s.description || undefined,
  })) || [];

  // Dynamic PWA Icons from Sanity CMS siteSettings (prioritizing dedicated pwaAppIcon)
  const iconRef = siteSettings?.pwaAppIcon || siteSettings?.brandIcon || siteSettings?.favicon || siteSettings?.logo;
  let pwaIcons: Array<Record<string, string>> = [
    {
      src: '/favicon.svg',
      sizes: 'any',
      type: 'image/svg+xml',
    },
    {
      src: '/favicon.ico',
      sizes: '64x64',
      type: 'image/png',
    },
  ];

  if (iconRef) {
    try {
      const icon192 = urlFor(iconRef).width(192).height(192).format('png').url();
      const icon512 = urlFor(iconRef).width(512).height(512).format('png').url();
      pwaIcons = [
        {
          src: icon192,
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable',
        },
        {
          src: icon512,
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
        ...pwaIcons,
      ];
    } catch (e) {
      console.error('Failed to format PWA icons from Sanity:', e);
    }
  }

  const manifest: Record<string, any> = {
    name,
    short_name: shortName,
    description,
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#10b981',
    icons: pwaIcons,
  };

  if (shortcuts.length > 0) {
    manifest.shortcuts = shortcuts;
  }

  return new Response(JSON.stringify(manifest), {
    headers: {
      'Content-Type': 'application/manifest+json',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
