# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based blog/logbook website using Astro v5.8.1. The site is configured for Japanese language (`lang="ja"`) and is set up for deployment to Cloudflare Pages.

## Commands

### Development

- **`pnpm dev`** - Starts dev server at localhost:4321
- **`pnpm build`** - Builds static site to ./dist/
- **`pnpm preview`** - Preview production build locally

### Code Quality

- **`pnpm lint`** - Run ESLint to check code quality
- **`pnpm lint:fix`** - Run ESLint and automatically fix issues
- **`pnpm format`** - Format all files with Prettier
- **`pnpm format:check`** - Check if files are formatted correctly

### Performance Testing

- **`pnpm lighthouse`** - Run full Lighthouse CI test suite
- **`pnpm lighthouse:collect`** - Collect Lighthouse metrics only
- **`pnpm lighthouse:assert`** - Assert Lighthouse thresholds only

Performance thresholds configured:

- Accessibility: 90% (error)
- Performance: 80% (warning)
- Best Practices: 80% (warning)
- SEO: 80% (warning)

## Architecture

### Content Structure

- **Blog posts**: Located in `src/content/blog/` as Markdown/MDX files (supports nested directories like `2024/`)
- **Content Collections**: Type-safe frontmatter validation via `src/content.config.ts`
- **Blog post schema**:
  - Required fields:
    - `title` (string)
    - `description` (string)
    - `pubDate` (date)
  - Optional fields:
    - `updatedDate` (date)
    - `heroImage` (string)
    - `keywords` (string) - For SEO
    - `author` (string) - Defaults to site author
    - `tags` (string[]) - For categorization
    - `category` (string) - Post category
    - `draft` (boolean) - Draft posts
    - `readingTime` (number) - Auto-calculated by reading-time package

### Routing

- File-based routing via `src/pages/`
- Dynamic blog routes: `src/pages/blog/[...slug].astro`
- RSS feed: `src/pages/rss.xml.js`

### Key Components

- **`BaseHead.astro`**: SEO metadata, OpenGraph tags, favicon
- **`BlogPost.astro`**: Layout for individual blog posts with reading time
- **`ThemeToggle.astro`**: Dark mode toggle component with localStorage persistence
- **`ReadingTime.astro`**: Displays estimated reading time for posts

### Site Configuration

Site constants in `src/consts.ts`:

- `SITE_TITLE`: "Logbook"
- `SITE_DESCRIPTION`: Accessible blog about technology and programming
- `SITE_AUTHOR`: "funai"
- `SITE_KEYWORDS`: Blog SEO keywords
- `TWITTER_HANDLE`: "@paveg\_"
- `GITHUB_HANDLE`: "paveg"

### Deployment

- **Static site generation (SSG) mode** - Output to `./dist/`
- **Primary deployment**: Cloudflare Pages at https://logbook-a9n.pages.dev
- **Sitemap generation**: Enabled with weekly changefreq
- **RSS feed**: Available at `/rss.xml`
- Compatible with any static hosting provider

## Git Workflow

### Branch Strategy

1. **NEVER push directly to main branch** - main branch への直接pushは禁止
2. **Always start from latest main branch**:

   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/description-of-work
   ```

3. **Reuse existing feature branches** when changes are related to avoid creating too many branches
4. **Commit frequently** with meaningful commit messages
5. **Before finishing work**, always:
   - Run `pnpm lint` and fix any issues
   - Run `pnpm format` to ensure consistent formatting
   - Commit these changes if any files were modified
6. **Push the feature branch**:

   ```bash
   git push -u origin feature/description-of-work
   ```

### Workflow Example

```bash
# 1. Always start from latest main
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/add-new-blog-post
# OR continue on existing related branch
git checkout feature/existing-related-work

# 3. Make changes and commit regularly
git add .
git commit -m "Add new blog post about TypeScript"

# 4. Before finishing, run lint and format
pnpm lint
pnpm format

# 5. Commit any formatting changes
git add .
git commit -m "Apply lint and format fixes"

# 6. Push feature branch
git push -u origin feature/add-new-blog-post
```

## Development Notes

### Adding Blog Posts

1. Create `.md` or `.mdx` file in `src/content/blog/` (can use subdirectories like `2024/`)
2. Include required frontmatter:
   ```yaml
   ---
   title: 'Post Title'
   description: 'Post description'
   pubDate: 2024-01-01
   ---
   ```
3. The slug is derived from the file path (e.g., `2024/my-post.md` → `/blog/2024/my-post`)
4. Reading time is automatically calculated

### Code Style

- **TypeScript**: Strict mode enabled with null checks
- **ESLint**: Configured for TypeScript and Astro files
- **Prettier**: Configured with Astro plugin
- **Japanese content**: Site configured with `lang="ja"`

### Design Principles

- **Minimal & accessible**: WCAG AA compliant, high contrast
- **Dark mode**: System preference detection + manual toggle
- **Performance**: System fonts, minimal JavaScript
- **Typography**: Optimized for Japanese and English content
