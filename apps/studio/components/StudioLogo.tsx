import React, { useEffect, useState, useCallback } from 'react';
import { useClient } from 'sanity';

interface SiteBranding {
  name?: string;
  logo?: { asset?: { _ref?: string; url?: string } };
  brandIcon?: { asset?: { _ref?: string; url?: string } };
  favicon?: { asset?: { _ref?: string; url?: string } };
}

function resolveSanityUrl(
  imageObj?: { asset?: { _ref?: string; url?: string } },
  projectId: string = 'e894k7c2',
  dataset: string = 'production'
): string | null {
  if (!imageObj) return null;
  if (imageObj.asset?.url) return imageObj.asset.url;

  const ref = imageObj.asset?._ref;
  if (!ref || typeof ref !== 'string') return null;

  const lastDash = ref.lastIndexOf('-');
  if (lastDash === -1) return null;
  const extension = ref.substring(lastDash + 1);
  const withoutExt = ref.substring(0, lastDash);

  const secondLastDash = withoutExt.lastIndexOf('-');
  if (secondLastDash === -1) return null;
  const dimensions = withoutExt.substring(secondLastDash + 1);
  const assetId = withoutExt.substring(6, secondLastDash);

  if (!assetId || !dimensions || !extension) return null;
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${assetId}-${dimensions}.${extension}`;
}

export function StudioLogo(props: { title?: string; renderDefault: (props: any) => React.ReactNode }) {
  const client = useClient({ apiVersion: '2024-03-11' });
  const [branding, setBranding] = useState<SiteBranding | null>(null);

  const fetchBranding = useCallback(() => {
    client
      .fetch(`*[_type == "siteSettings"][0]{ name, logo{ asset->{ url } }, brandIcon{ asset->{ url } }, favicon{ asset->{ url } } }`)
      .then((data) => {
        if (data) {
          setBranding(data);

          // Update Studio Browser Favicon in <head>
          const projectId = client.config().projectId || 'giapn04l';
          const dataset = client.config().dataset || 'production';
          const faviconUrl =
            resolveSanityUrl(data.favicon, projectId, dataset) ||
            resolveSanityUrl(data.brandIcon, projectId, dataset) ||
            resolveSanityUrl(data.logo, projectId, dataset);

          if (faviconUrl) {
            const links = document.querySelectorAll("link[rel*='icon']");
            if (links.length > 0) {
              links.forEach((link) => {
                (link as HTMLLinkElement).href = faviconUrl;
              });
            } else {
              const link = document.createElement('link');
              link.rel = 'shortcut icon';
              link.href = faviconUrl;
              document.getElementsByTagName('head')[0].appendChild(link);
            }
          }
        }
      })
      .catch((err) => console.error('StudioLogo: Failed to load siteSettings branding:', err));
  }, [client]);

  useEffect(() => {
    fetchBranding();

    // Poll every 3 seconds while in studio so live image uploads update navbar & favicon immediately
    const interval = setInterval(fetchBranding, 3000);
    return () => clearInterval(interval);
  }, [fetchBranding]);

  const projectId = client.config().projectId || 'giapn04l';
  const dataset = client.config().dataset || 'production';

  const brandIconUrl =
    resolveSanityUrl(branding?.brandIcon, projectId, dataset) ||
    resolveSanityUrl(branding?.logo, projectId, dataset);
  const siteName = branding?.name || props.title || 'Studio';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '4px' }}>
      {brandIconUrl ? (
        <img
          src={brandIconUrl}
          alt={siteName}
          style={{
            height: '28px',
            width: '28px',
            objectFit: 'contain',
            borderRadius: '6px',
            backgroundColor: 'transparent',
          }}
        />
      ) : (
        <div
          style={{
            height: '28px',
            width: '28px',
            borderRadius: '6px',
            backgroundColor: '#C60909',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '14px',
            fontFamily: 'monospace',
          }}
        >
          {siteName.charAt(0).toUpperCase()}
        </div>
      )}
      <span style={{ fontWeight: 700, fontSize: '15px', letterSpacing: '-0.02em', color: 'inherit' }}>
        {siteName}
      </span>
    </div>
  );
}
