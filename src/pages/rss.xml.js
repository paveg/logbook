import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION, SITE_AUTHOR } from '../consts';

export async function GET(context) {
  const posts = await getCollection('blog');

  // Sort posts by publication date (newest first)
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf(),
  );

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    language: 'ja',
    managingEditor: `noreply@paveg.dev (${SITE_AUTHOR})`,
    webMaster: `noreply@paveg.dev (${SITE_AUTHOR})`,
    copyright: `© ${new Date().getFullYear()} ${SITE_AUTHOR}`,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      author: `noreply@paveg.dev (${post.data.author || SITE_AUTHOR})`,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
      guid: `/blog/${post.id}/`,
      categories: post.data.keywords ? post.data.keywords.split(',').map((tag) => tag.trim()) : [],
      customData: post.data.heroImage
        ? `<enclosure url="${new URL(post.data.heroImage, context.site)}" type="image/jpeg" />`
        : '',
    })),
    customData: `
      <language>ja</language>
      <webMaster>noreply@paveg.dev (${SITE_AUTHOR})</webMaster>
      <managingEditor>noreply@paveg.dev (${SITE_AUTHOR})</managingEditor>
      <copyright>© ${new Date().getFullYear()} ${SITE_AUTHOR}</copyright>
      <generator>Astro v${process.env.npm_package_version || '5.8.1'}</generator>
      <docs>https://www.rssboard.org/rss-specification</docs>
      <ttl>60</ttl>
    `,
  });
}
