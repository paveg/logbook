# Blog Post Template

Use this template when creating new blog posts to ensure proper SEO optimization.

## File Location

Place your markdown files in: `src/content/blog/your-post-slug.md`

## Frontmatter Template

```yaml
---
title: 'Your Post Title Here'
description: 'A compelling description of your post (150-160 characters for optimal SEO)'
pubDate: '2024-06-04' # Format: YYYY-MM-DD
updatedDate: '2024-06-04' # Optional: only if you update the post
heroImage: '/blog-placeholder-1.jpg' # Optional: path to hero image
keywords: 'keyword1, keyword2, keyword3' # Optional: SEO keywords
tags: ['tag1', 'tag2', 'tag3'] # Optional: categorization tags
category: 'technology' # Optional: main category
author: 'funai' # Optional: author name (defaults to site author)
readingTime: 5 # Optional: estimated reading time in minutes
draft: false # Optional: set to true to exclude from production
---
```

## SEO Best Practices

### Title

- Keep titles under 60 characters
- Include primary keyword near the beginning
- Make it compelling and descriptive

### Description

- Aim for 150-160 characters
- Include primary keyword naturally
- Write for humans, not just search engines
- End with a call to action if appropriate

### Keywords

- Use 3-5 relevant keywords
- Separate with commas
- Include primary keyword and variations
- Research competitor keywords

### Tags

- Use 3-7 relevant tags
- Keep tags consistent across posts
- Use lowercase for consistency
- Think about how users would search

### Hero Image

- Use high-quality images (1200x630px recommended)
- Optimize file size for web
- Use descriptive file names
- Provide alt text if needed

## Content Structure

### Headings

Use proper heading hierarchy:

- H1: Post title (automatic)
- H2: Main sections
- H3: Subsections
- H4+: Further subdivisions

### Internal Links

- Link to related posts when relevant
- Use descriptive anchor text
- Don't overdo it (2-3 internal links per post)

### External Links

- Link to authoritative sources
- Use `target="_blank"` for external links
- Consider using `rel="noopener noreferrer"`

## Publishing Checklist

- [ ] Title is under 60 characters
- [ ] Description is 150-160 characters
- [ ] Keywords are relevant and not stuffed
- [ ] Tags are consistent with site taxonomy
- [ ] Hero image is optimized
- [ ] Content uses proper heading structure
- [ ] Internal/external links are relevant
- [ ] Spelling and grammar checked
- [ ] Preview in development mode
- [ ] Test on mobile devices
