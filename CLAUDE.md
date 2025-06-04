# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based blog/logbook website using Astro v5.8.1. The site is configured for Japanese language (`lang="ja"`) and is set up for deployment to Cloudflare Pages.

## Commands

- **Development**: `pnpm dev` - Starts dev server at localhost:4321
- **Build**: `pnpm build` - Builds static site to ./dist/
- **Preview**: `pnpm preview` - Preview production build locally
- **Lint**: `pnpm lint` - Run ESLint to check code quality
- **Lint Fix**: `pnpm lint:fix` - Run ESLint and automatically fix issues
- **Format**: `pnpm format` - Format all files with Prettier
- **Format Check**: `pnpm format:check` - Check if files are formatted correctly
- **Deploy**: Uses Cloudflare Pages (wrangler available)

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

## Git Workflow

### Branch Strategy

1. **NEVER push directly to main branch** - main branch への直接pushは禁止
2. **Always create a feature branch** for any work:
   ```bash
   git checkout -b feature/description-of-work
   ```
3. **Commit frequently** with meaningful commit messages
4. **Before finishing work**, always:
   - Run `pnpm lint` and fix any issues
   - Run `pnpm format` to ensure consistent formatting
   - Commit these changes if any files were modified
5. **Push the feature branch**:
   ```bash
   git push -u origin feature/description-of-work
   ```

### Workflow Example

```bash
# 1. Create and checkout feature branch
git checkout -b feature/add-new-blog-post

# 2. Make changes and commit regularly
git add .
git commit -m "Add new blog post about TypeScript"

# 3. Before finishing, run lint and format
pnpm lint
pnpm format

# 4. Commit any formatting changes
git add .
git commit -m "Apply lint and format fixes"

# 5. Push feature branch
git push -u origin feature/add-new-blog-post
```

## Development Notes

When adding new blog posts:

1. Create `.md` or `.mdx` file in `src/content/blog/`
2. Include required frontmatter (title, description, pubDate)
3. The slug is derived from the filename

Site configuration that needs updating:

- `astro.config.mjs`: Update `site` URL from "https://example.com" to actual domain
