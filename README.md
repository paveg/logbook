# Logbook

A minimal and modern blog built with Astro, featuring dark mode, optimized performance, and SEO-friendly design.

## 🚀 Features

- **Static Site Generation** with Astro v5.8.1
- **Dark/Light Mode Toggle** with system preference detection
- **SEO Optimized** with structured data (JSON-LD) and meta tags
- **Performance Focused** with Core Web Vitals optimization
- **Responsive Design** with mobile-first approach
- **RSS Feed** support
- **Reading Time** calculation
- **Social Sharing** buttons (X, Hatena Bookmark)
- **Accessible** design following WCAG guidelines

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/)
- **Styling**: CSS with custom properties
- **Content**: Markdown/MDX with content collections
- **Deployment**: Cloudflare Pages
- **Performance**: Lighthouse CI integration

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/paveg/logbook.git
cd logbook

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## 🚀 Commands

| Command           | Action                                       |
| ----------------- | -------------------------------------------- |
| `pnpm dev`        | Start development server at `localhost:4321` |
| `pnpm build`      | Build production site to `./dist/`           |
| `pnpm preview`    | Preview production build locally             |
| `pnpm lint`       | Run ESLint                                   |
| `pnpm format`     | Format code with Prettier                    |
| `pnpm lighthouse` | Run Lighthouse CI tests                      |

## 📁 Project Structure

```
src/
├── components/          # Reusable Astro components
├── content/
│   └── blog/           # Blog posts (Markdown/MDX)
├── layouts/            # Page layouts
├── pages/              # File-based routing
│   ├── blog/           # Blog-related pages
│   ├── about.astro     # About page
│   ├── privacy.astro   # Privacy policy
│   └── rss.xml.js      # RSS feed generation
└── styles/             # Global styles
```

## ✍️ Writing Blog Posts

Create new blog posts in `src/content/blog/` using Markdown or MDX:

```markdown
---
title: 'Your Post Title'
description: 'Brief description of your post'
pubDate: 2024-01-01
heroImage: '/path/to/image.jpg'
tags: ['tag1', 'tag2']
---

Your content here...
```

## 🎨 Customization

- **Site Configuration**: Edit `src/consts.ts`
- **Styling**: Modify CSS custom properties in `src/styles/global.css`
- **Components**: Customize components in `src/components/`

## 📈 Performance

This blog is optimized for performance with:

- Static site generation
- Optimized images with WebP format
- Minimal JavaScript
- CSS custom properties for theming
- Lighthouse CI integration for monitoring

## 📄 License

This project uses a dual license structure:

- **Software/Code**: [MIT License](LICENSE) - Feel free to use, modify, and distribute the code
- **Blog Content**: All Rights Reserved - Blog posts and articles are protected by copyright

See the [LICENSE](LICENSE) file for full details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request for:

- Bug fixes
- Feature improvements
- Documentation updates
- Performance optimizations

Note: Contributions should focus on the software/technical aspects. Blog content remains under the author's copyright.

## 📞 Contact

- **Author**: funai
- **X (Twitter)**: [@paveg\_](https://twitter.com/paveg_)
- **GitHub**: [@paveg](https://github.com/paveg)
- **Website**: [Logbook](https://logbook-a9n.pages.dev)

---

Built with ❤️ using [Astro](https://astro.build/)
