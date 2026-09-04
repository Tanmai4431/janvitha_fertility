import rss from '@astrojs/rss';
import { sanityClient } from '../utils/sanity';
import client from '../../../../client.json';

export async function GET(context: { site: URL }) {
  let posts: any[] = [];
  try {
    posts = await sanityClient.fetch(
      `*[_type == "post" && defined(slug.current) && !(seo.noindex == true)] | order(publishedAt desc) {
        title,
        excerpt,
        "slug": slug.current,
        publishedAt
      }`
    );
  } catch (e) {
    console.error('Failed to fetch posts for dynamic RSS XML feed generation:', e);
  }

  const siteUrl = context.site?.toString() || client.domain.production;

  return rss({
    title: `${client.business.name} Blog`,
    description: client.seo.defaultDescription,
    site: siteUrl,
    items: posts.map((post: any) => ({
      title: post.title,
      description: post.excerpt || `Read article ${post.title}`,
      pubDate: new Date(post.publishedAt),
      link: `/blog/${post.slug}`,
    })),
  });
}
