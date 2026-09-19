import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import client from '../../../../client.json';

const rawProjectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || (client as any).sanity?.projectId || 'xwuayh4h';
const cleanProjectId = String(rawProjectId).replace(/["'\s]/g, '').trim() || 'xwuayh4h';

const rawDataset = import.meta.env.PUBLIC_SANITY_DATASET || (client as any).sanity?.dataset || 'production';
const cleanDataset = String(rawDataset).replace(/["'\s]/g, '').trim() || 'production';

const isDev = Boolean(import.meta.env.DEV);
const isCdnExplicitlyDisabled = import.meta.env.PUBLIC_SANITY_USE_CDN === 'false';
const useCdn = isDev ? false : !isCdnExplicitlyDisabled;

export const sanityClient = createClient({
  projectId: cleanProjectId,
  dataset: cleanDataset,
  apiVersion: '2024-03-11',
  useCdn,
});

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

let cachedSettings: any = null;
let lastCacheTime = 0;
const CACHE_TTL = isDev ? 0 : 15000; // 0 ms in development so Sanity updates immediately reflect; 15s in production

export async function getSiteSettings() {
  const now = Date.now();
  if (cachedSettings && (now - lastCacheTime < CACHE_TTL)) {
    return cachedSettings;
  }

  try {
    const settings = await sanityClient.fetch(
      `*[_type == "siteSettings"][0] {
        name,
        legalName,
        tagline,
        description,
        logo,
        invertedLogo,
        brandIcon,
        favicon,
        appleTouchIcon,
        primaryEmail,
        supportEmail,
        primaryPhone,
        secondaryPhone,
        addressStreet,
        addressCity,
        addressState,
        addressZip,
        addressCountry,
        socialLinks,
        title,
        seoDescription,
        shareImage,
        googleSiteVerificationId,
        googleAnalyticsId,
        googleTagManagerId,
        pwaOfflineTitle,
        pwaOfflineDescription,
        pwaShortcuts,
        emailFromName,
        emailFromAddress,
        emailTo,
        emailCc,
        enablePageAnimations,
        pwaAppIcon,
        enablePwaBanner,
        pwaLimitOncePerDay,
        pwaBannerDisplaySeconds,
        resendApiKey,
        enableWhatsAppWidget,
        whatsAppPhone,
        whatsAppMessage,
        whatsAppShowActiveStatus,
        whatsAppIconType,
        whatsAppCustomSvg,
        whatsAppCustomImage
      }`,
      {},
      { useCdn }
    );
    if (settings) {
      const result = {
        name: settings.name || null,
        legalName: settings.legalName || null,
        tagline: settings.tagline || null,
        description: settings.description || null,
        logo: settings.logo || null,
        invertedLogo: settings.invertedLogo || null,
        brandIcon: settings.brandIcon || null,
        favicon: settings.favicon || null,
        appleTouchIcon: settings.appleTouchIcon || null,
        primaryEmail: settings.primaryEmail || null,
        supportEmail: settings.supportEmail || null,
        primaryPhone: settings.primaryPhone || null,
        secondaryPhone: settings.secondaryPhone || null,
        addressStreet: settings.addressStreet || null,
        addressCity: settings.addressCity || null,
        addressState: settings.addressState || null,
        addressZip: settings.addressZip || null,
        addressCountry: settings.addressCountry || null,
        socialLinks: settings.socialLinks || null,
        title: settings.title || null,
        seoDescription: settings.seoDescription || null,
        shareImage: settings.shareImage || null,
        googleSiteVerificationId: settings.googleSiteVerificationId || null,
        googleAnalyticsId: settings.googleAnalyticsId || null,
        googleTagManagerId: settings.googleTagManagerId || null,
        pwaOfflineTitle: settings.pwaOfflineTitle || null,
        pwaOfflineDescription: settings.pwaOfflineDescription || null,
        pwaShortcuts: settings.pwaShortcuts || null,
        pwaAppIcon: settings.pwaAppIcon || null,
        resendApiKey: settings.resendApiKey || null,
        emailFromName: settings.emailFromName || null,
        emailFromAddress: settings.emailFromAddress || null,
        emailTo: settings.emailTo || null,
        emailCc: settings.emailCc || null,
        emailSubjectTemplate: settings.emailSubjectTemplate || null,
        enablePageAnimations: typeof settings.enablePageAnimations === 'boolean' ? settings.enablePageAnimations : null,
        enablePwaBanner: typeof settings.enablePwaBanner === 'boolean' ? settings.enablePwaBanner : null,
        pwaLimitOncePerDay: typeof settings.pwaLimitOncePerDay === 'boolean' ? settings.pwaLimitOncePerDay : true,
        pwaBannerDisplaySeconds: typeof settings.pwaBannerDisplaySeconds === 'number' ? settings.pwaBannerDisplaySeconds : 5,
        enableWhatsAppWidget: typeof settings.enableWhatsAppWidget === 'boolean' ? settings.enableWhatsAppWidget : true,
        whatsAppPhone: settings.whatsAppPhone || null,
        whatsAppMessage: settings.whatsAppMessage || null,
        whatsAppShowActiveStatus: typeof settings.whatsAppShowActiveStatus === 'boolean' ? settings.whatsAppShowActiveStatus : true,
        whatsAppIconType: settings.whatsAppIconType || 'default',
        whatsAppCustomSvg: settings.whatsAppCustomSvg || null,
        whatsAppCustomImage: settings.whatsAppCustomImage || null,
      };
      cachedSettings = result;
      lastCacheTime = now;
      return result;
    }
  } catch (e) {
    console.error('Failed to fetch site settings from Sanity:', e);
  }

  return null;
}

// ─────────────────────────────────────────────────────────────
// Home Page Singleton Fetcher
// ─────────────────────────────────────────────────────────────
let cachedHomePage: any = null;
let lastHomePageCacheTime = 0;

export async function getHomePage() {
  const now = Date.now();
  if (cachedHomePage && (now - lastHomePageCacheTime < CACHE_TTL)) {
    return cachedHomePage;
  }

  try {
    const data = await sanityClient.fetch(
      `*[_type == "homePage" && _id == "homePage"][0] {
        orbitItems[] {
          name,
          ring,
          iconType,
          svgCode,
          "iconUrl": icon.asset->url,
          url
        },
        aboutImages[] {
          alt,
          sourceType,
          "imageUrl": image.asset->url,
          cdnUrl
        },
        aboutGallery[] {
          alt,
          mediaType,
          imageSourceType,
          "imageUrl": image.asset->url,
          imageCdnUrl,
          videoSourceType,
          "videoFileUrl": videoFile.asset->url,
          videoCdnUrl,
          youtubeUrl
        }
      }`,
      {},
      { useCdn }
    );
    if (data) {
      const result = {
        orbitItems: data.orbitItems || null,
        aboutImages: data.aboutImages || null,
        aboutGallery: data.aboutGallery || null,
      };
      cachedHomePage = result;
      lastHomePageCacheTime = now;
      return result;
    }
  } catch (e) {
    console.error('Failed to fetch home page data from Sanity:', e);
  }

  return null;
}
