import type { APIRoute } from 'astro';
import { getCollection, getEntry } from 'astro:content';
import { ImageResponse } from '@vercel/og';
import fs from 'fs';
import path from 'path';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => {
    // In production, exclude draft posts
    if (import.meta.env.PROD) {
      return data.draft !== true;
    }
    // In development, show all posts including drafts
    return true;
  });
  return posts.map((post) => {
    // Use the actual post.id which already includes the year folder if present
    return {
      params: { slug: post.id },
    };
  });
}

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug;

  if (!slug) {
    return new Response('Slug is required', { status: 400 });
  }

  // Get the post by slug (slug already matches post.id)
  let post;
  try {
    post = await getEntry('blog', slug);
  } catch (error) {
    console.error('Error getting blog entry:', error);
    return new Response('Error retrieving post', { status: 500 });
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
        fontFamily: '"Noto Sans JP", system-ui, -apple-system, "Segoe UI", "Roboto", sans-serif',
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

  // Load font files
  const fontRegular = fs.readFileSync(
    path.join(process.cwd(), 'public/fonts/noto-sans-jp-regular.ttf'),
  );
  const fontBold = fs.readFileSync(path.join(process.cwd(), 'public/fonts/noto-sans-jp-bold.ttf'));

  return new ImageResponse(html, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Noto Sans JP',
        data: fontRegular,
        style: 'normal',
        weight: 400,
      },
      {
        name: 'Noto Sans JP',
        data: fontBold,
        style: 'normal',
        weight: 700,
      },
    ],
  });
};
