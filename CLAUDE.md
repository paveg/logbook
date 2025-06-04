# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based blog/logbook website using Astro v5.8.1. The site is configured for Japanese language (`lang="ja"`) and is set up for deployment to Cloudflare Pages.

## Commands

- **Development**: `pnpm dev` - Starts dev server at localhost:4321
- **Build**: `pnpm build` - Builds static site to ./dist/
- **Preview**: `pnpm preview` - Preview production build locally
- **Deploy**: Uses Cloudflare Pages (wrangler available)

Note: No linting or test commands are currently configured.

## Architecture

### Content Structure

- **Blog posts**: Located in `src/content/blog/` as Markdown/MDX files
- **Content Collections**: Type-safe frontmatter validation via `src/content.config.ts`
- **Blog post schema** requires:
  - `title` (string)
  - `description` (string)
  - `pubDate` (date)
  - Optional: `updatedDate`, `heroImage`

### Routing

- File-based routing via `src/pages/`
- Dynamic blog routes: `src/pages/blog/[...slug].astro`
- RSS feed: `src/pages/rss.xml.js`

### Key Components

- `BaseHead.astro`: SEO metadata, OpenGraph tags
- `BlogPost.astro`: Layout for individual blog posts
- Site constants in `src/consts.ts` (SITE_TITLE, SITE_DESCRIPTION)

### Deployment

- Configured for Cloudflare Pages via `@astrojs/cloudflare` adapter
- Static output mode
- Sitemap and RSS generation enabled

## Development Notes

When adding new blog posts:

1. Create `.md` or `.mdx` file in `src/content/blog/`
2. Include required frontmatter (title, description, pubDate)
3. The slug is derived from the filename

Site configuration that needs updating:

- `astro.config.mjs`: Update `site` URL from "https://example.com" to actual domain
