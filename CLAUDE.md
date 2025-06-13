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

- **`BaseHead.astro`**: SEO metadata, OpenGraph tags, favicon, post-LCP font preloading
- **`BlogPost.astro`**: Layout for individual blog posts with reading time and hero image optimization
- **`ThemeToggle.astro`**: Dark mode toggle component with localStorage persistence and bfcache support
- **`ReadingTime.astro`**: Displays estimated reading time for posts
- **`CopyButton.astro`**: Accessible copy-to-clipboard functionality for code blocks
- **`TableOfContents.astro`**: Automatic table of contents generation for blog posts

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

## Performance Optimizations

### Font Loading Strategy

- **Post-LCP font preloading**: Fonts are preloaded after Largest Contentful Paint to avoid blocking critical rendering
- **CSS bundle optimization**: Font bundles reduced from 450KB to 16KB (96% reduction) using targeted @font-face declarations
- **Japanese font support**: M PLUS Rounded 1c font with proper unicode-range for Japanese characters

### Build Optimizations

- **Terser minification**: JavaScript minified with Terser for smaller bundle sizes
- **Inline stylesheets**: Automatic inlining of critical CSS for better performance
- **Manual chunks disabled**: Prevents bundle splitting for optimal loading

### Syntax Highlighting

- **Themes**: Using `github-light` and `github-dark-high-contrast` for colorful, accessible code blocks
- **Dual-theme support**: CSS variables automatically switch themes based on user preference
- **Build-time processing**: Shiki generates syntax highlighting at build time (no runtime cost)
- **Copy button integration**: All code blocks include accessible copy functionality

## OGP Image Generation

### Dynamic OG Images

- **Route**: `/og/[...slug].png` generates OG images for all blog posts
- **Technology**: Uses Satori (@vercel/og) for HTML/CSS to image conversion
- **Font support**: M PLUS Rounded 1c font loaded for Japanese text in OG images
- **Size**: Standard 1200x630px for optimal social media compatibility
- **Generation**: Static generation at build time for all blog posts

### OG Image Architecture

```typescript
// src/pages/og/[...slug].png.ts
// - Fetches blog post data
// - Creates JSX-like HTML structure
// - Renders with Japanese font support
// - Returns PNG image response
```

## Accessibility & Performance Guidelines

### WCAG Compliance

- **Color contrast**: All text meets WCAG AA standards (minimum 4.5:1 ratio)
- **Focus management**: Proper focus indicators for keyboard navigation
- **Link accessibility**: Descriptive link text (avoid "Learn more", "Click here")
- **Theme switching**: Automatic theme detection with manual override capability

### LCP Optimization

- **Image priorities**: Hero images use `fetchpriority="high"` and `loading="eager"`
- **Font loading**: Post-LCP font preloading prevents render blocking
- **Critical request chains**: Minimized by async font loading and optimized resource hints

### bfcache Optimization

- **Page restoration**: `pageshow` event listeners restore state after back/forward navigation
- **Component reinitialization**: Theme toggle and copy buttons reinitialize on page restoration

## Important Development Reminders

### Performance Impact

When making changes, always run performance checks:

```bash
pnpm build && pnpm lighthouse
```

### Syntax Highlighting Themes

Current themes are `github-light` and `github-dark-high-contrast`. When changing:

1. Update `astro.config.mjs` themes
2. Update CSS fallback colors in `global.css`
3. Test both light and dark modes
4. Ensure color contrast meets accessibility standards
5. Be aware that theme changes may require merge conflict resolution if working on multiple branches

## Common Development Workflows

### Performance Optimization Process

When optimizing performance:

1. **Baseline measurement**: Run `pnpm lighthouse` to get current metrics
2. **Make targeted changes**: Focus on specific Lighthouse recommendations
3. **Test changes**: Build and run lighthouse again to verify improvements
4. **Commit incrementally**: Make small, focused commits for each optimization

### Merge Conflict Resolution

The `src/styles/global.css` file frequently has conflicts due to syntax highlighting updates:

1. **Identify conflict markers**: Look for `<<<<<<< HEAD`, `=======`, `>>>>>>> origin/main`
2. **Preserve intended changes**: Usually keep the GitHub themes configuration
3. **Test after resolution**: Always run `pnpm build` after resolving conflicts
4. **Verify theme functionality**: Check both light and dark modes work correctly

### Code Block Testing

When making changes to syntax highlighting:

1. **Test with real content**: Use existing blog posts that have code blocks
2. **Check theme switching**: Verify colors change properly between light/dark modes
3. **Accessibility validation**: Ensure text contrast meets WCAG AA standards
4. **Copy button functionality**: Verify the copy-to-clipboard feature works
