import type { APIRoute } from 'astro';
import { getSiteSettings, urlFor } from '../utils/sanity';

export const GET: APIRoute = async ({ redirect }) => {
  const siteSettings = await getSiteSettings();
  const iconRef = siteSettings?.appleTouchIcon || siteSettings?.brandIcon || siteSettings?.favicon || siteSettings?.logo;

  if (iconRef) {
    try {
      const iconUrl = urlFor(iconRef).width(180).height(180).format('png').url();
      return redirect(iconUrl, 302);
    } catch (e) {
      console.error('Failed to resolve apple-touch-icon.png from Sanity:', e);
    }
  }

  return redirect('/favicon.ico', 302);
};
