import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    // SEO and social sharing
    keywords: z.string().optional(),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
    // For draft posts
    draft: z.boolean().optional(),
    // Reading time (calculated automatically if needed)
    readingTime: z.number().optional(),
  }),
});

export const collections = { blog };
