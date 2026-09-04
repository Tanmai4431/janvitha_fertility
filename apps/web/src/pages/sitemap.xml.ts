import { sanityClient } from '../utils/sanity';
import client from '../../../../client.json';

// Use Vite glob imports to dynamically discover static Astro page files at build/runtime
const pageFiles = import.meta.glob('/src/pages/**/*.astro');

export async function GET() {
  let posts: any[] = [];
  try {
    posts = await sanityClient.fetch(
      `*[_type == "post" && defined(slug.current) && !(seo.noindex == true)] {
        "slug": slug.current,
        "_updatedAt": _updatedAt
      }`
    );
  } catch (e) {
    console.error('Failed to fetch posts for dynamic sitemap generation:', e);
  }

  const siteUrl = client.domain.production;

  // Resolve static routes dynamically from files that actually exist in the project
  const staticUrls = Object.keys(pageFiles)
    .map((filePath) => {
      // "/src/pages/blog/index.astro" -> "/blog/"
      // "/src/pages/index.astro" -> "/"
      let route = filePath
        .replace(/^\/src\/pages/, '')
        .replace(/\.astro$/, '')
        .replace(/\/index$/, '');
      
      return route === '' ? '/' : route;
    })
    // Filter out dynamic routes (e.g. [slug].astro) and error pages (e.g. 404.astro)
    .filter((route) => !route.includes('[') && !route.includes(']') && route !== '/404')
    .map((route) => ({
      url: `${siteUrl}${route}`,
      changefreq: 'daily',
      priority: route === '/' ? '1.0' : '0.8',
      lastmod: new Date().toISOString()
    }));

  const postUrls = posts.map((post: any) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastmod: post._updatedAt,
    changefreq: 'weekly',
    priority: '0.7',
  }));

  const allUrls = [...staticUrls, ...postUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls
    .map(
      (item) => `
  <url>
    <loc>${item.url}</loc>
    ${item.lastmod ? `<lastmod>${new Date(item.lastmod).toISOString().split('T')[0]}</lastmod>` : ''}
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
    )
    .join('').trim()}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
