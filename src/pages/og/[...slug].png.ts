import type { APIRoute } from 'astro';
import { getCollection, getEntry } from 'astro:content';
import { ImageResponse } from '@vercel/og';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.flatMap((post) => {
    const paths = [];
    const year = post.data.pubDate.getFullYear();

    // Generate paths for both URL patterns
    if (year >= 2023) {
      // New format: YYYY/slug
      paths.push({
        params: { slug: `${year}/${post.id}` },
      });
    }

    // Old format: just slug
    paths.push({
      params: { slug: post.id },
    });

    return paths;
  });
}

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug;

  if (!slug) {
    return new Response('Slug is required', { status: 400 });
  }

  // Try to get the post by slug directly
  let post;
  try {
    // First try the slug as-is
    post = await getEntry('blog', slug);

    // If not found, try with year prefix removed
    if (!post && slug.includes('/')) {
      const parts = slug.split('/');
      const possibleSlug = parts[parts.length - 1];
      post = await getEntry('blog', possibleSlug);
    }
  } catch {
    // Handle error silently
  }

  if (!post) {
    return new Response('Post not found', { status: 404 });
  }

  const html = {
    type: 'div',
    props: {
      style: {
        background: 'linear-gradient(to bottom right, #1a1a2e, #16213e)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Roboto Mono", "SF Mono", Monaco, "Cascadia Code", monospace',
        color: 'white',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '90%',
              height: '90%',
            },
            children: [
              {
                type: 'h1',
                props: {
                  style: {
                    fontSize: 64,
                    fontWeight: '700',
                    textAlign: 'center',
                    margin: '0 0 20px 0',
                    lineHeight: 1.2,
                    maxWidth: '90%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  },
                  children: post.data.title,
                },
              },
              {
                type: 'p',
                props: {
                  style: {
                    fontSize: 24,
                    textAlign: 'center',
                    opacity: 0.8,
                    margin: '0 0 40px 0',
                    maxWidth: '80%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                  },
                  children: post.data.description,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    fontSize: 20,
                    opacity: 0.7,
                  },
                  children: [
                    {
                      type: 'span',
                      props: {
                        children: new Date(post.data.pubDate).toLocaleDateString('ja-JP', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }),
                      },
                    },
                    {
                      type: 'span',
                      props: {
                        children: '•',
                      },
                    },
                    {
                      type: 'span',
                      props: {
                        children: 'Logbook',
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };

  return new ImageResponse(html, {
    width: 1200,
    height: 630,
  });
};
