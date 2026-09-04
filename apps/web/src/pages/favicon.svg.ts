import type { APIRoute } from 'astro';
import { getSiteSettings, urlFor } from '../utils/sanity';

export const GET: APIRoute = async ({ redirect }) => {
  const siteSettings = await getSiteSettings();
  const iconRef = siteSettings?.favicon || siteSettings?.brandIcon || siteSettings?.logo;

  if (iconRef) {
    try {
      const iconUrl = urlFor(iconRef).url();
      return redirect(iconUrl, 302);
    } catch (e) {
      console.error('Failed to resolve favicon.svg from Sanity:', e);
    }
  }

  // Fallback to static SVG icon if no Sanity icon uploaded
  const defaultSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="#1A0B3C"/><text x="50" y="68" font-size="55" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="#FFFFFF">J</text></svg>`;
  return new Response(defaultSvg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
