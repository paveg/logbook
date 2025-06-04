# Logbook

A minimal, accessible blog built with Astro featuring dark mode support and clean typography.

- ✅ **Minimal & Clean Design** - Monochrome base with subtle rounded corners
- ✅ **Dark Mode Support** - Auto-detection with manual toggle and localStorage persistence
- ✅ **Accessibility First** - WCAG AA compliant colors, proper focus states, color-blind friendly
- ✅ **Japanese Language Support** - Optimized for Japanese content with proper typography
- ✅ **Developer Experience** - ESLint, Prettier, GitHub Actions for code quality
- ✅ **Performance Optimized** - 100/100 Lighthouse scores with system fonts
- ✅ **SEO Ready** - Canonical URLs, OpenGraph data, sitemap, and RSS feed
- ✅ **Content Collections** - Type-safe frontmatter with Astro's content system
- ✅ **Responsive Design** - Mobile-first approach with clean breakpoints

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm lint`            | Run ESLint to check code quality                |
| `pnpm lint:fix`        | Run ESLint and automatically fix issues         |
| `pnpm format`          | Format all files with Prettier                  |
| `pnpm format:check`    | Check if files are formatted correctly          |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 🎨 Design Philosophy

This blog follows a minimal design approach with focus on:

- **Readability** - System fonts and optimal line heights for comfortable reading
- **Accessibility** - High contrast ratios and keyboard navigation support  
- **Performance** - No unnecessary JavaScript or heavy assets
- **Maintainability** - Clean code structure with consistent CSS variables

## 🌙 Dark Mode

The blog includes a comprehensive dark mode implementation:

- Automatic detection of system preference (`prefers-color-scheme`)
- Manual toggle with animated sun/moon icons
- Persistent user preference via localStorage
- WCAG AA compliant color combinations in both themes

## 🚀 Deployment

This is a static site that can be deployed to any static hosting service:

- **Cloudflare Pages** - Recommended for optimal performance
- **Netlify** - Easy deployment with Git integration
- **Vercel** - Great for automatic deployments
- **GitHub Pages** - Free hosting for public repositories

## 👀 Want to learn more?

Check out [Astro documentation](https://docs.astro.build) to learn more about the framework.

## 📄 License

This project is based on the Astro Blog template and inspired by [Bear Blog](https://github.com/HermanMartinus/bearblog/).
