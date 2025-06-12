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
        fontFamily: '"M PLUS Rounded 1c", "Roboto", "Helvetica Neue", Arial, sans-serif',
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
                    fontSize: 72,
                    fontWeight: '700',
                    textAlign: 'center',
                    margin: '0',
                    lineHeight: 1.3,
                    maxWidth: '90%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                  },
                  children: post.data.title,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    position: 'absolute',
                    bottom: '40px',
                    left: '0',
                    right: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    fontSize: 28,
                    opacity: 0.8,
                  },
                  children: [
                    {
                      type: 'span',
                      props: {
                        children: new Date(post.data.pubDate).toISOString().split('T')[0],
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

  // Load M PLUS Rounded 1c font for Japanese text support
  const fontPath = path.join(
    process.cwd(),
    'node_modules/@fontsource/m-plus-rounded-1c/files/m-plus-rounded-1c-japanese-400-normal.woff',
  );

  let fonts = [];
  try {
    if (fs.existsSync(fontPath)) {
      const fontData = fs.readFileSync(fontPath);
      fonts.push({
        name: 'M PLUS Rounded 1c',
        data: fontData,
        style: 'normal',
        weight: 400,
      });
    }
  } catch (error) {
    console.warn('Failed to load M PLUS Rounded 1c font:', error);
  }

  return new ImageResponse(html, {
    width: 1200,
    height: 630,
    fonts,
  });
};
