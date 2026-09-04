import type { APIRoute } from 'astro';
import { getSiteSettings, urlFor } from '../utils/sanity';

export const GET: APIRoute = async ({ redirect }) => {
  const siteSettings = await getSiteSettings();
  const iconRef = siteSettings?.favicon || siteSettings?.brandIcon || siteSettings?.logo;

  if (iconRef) {
    try {
      const iconUrl = urlFor(iconRef).width(64).height(64).format('png').url();
      return redirect(iconUrl, 302);
    } catch (e) {
      console.error('Failed to resolve favicon.ico from Sanity:', e);
    }
  }

  return redirect('/favicon.svg', 302);
};
