import type { CollectionEntry } from 'astro:content';

export interface RelatedPost {
  slug: string;
  data: CollectionEntry<'blog'>['data'];
}

export function getRelatedPosts(
  currentPost: CollectionEntry<'blog'>,
  allPosts: CollectionEntry<'blog'>[],
  maxResults: number = 3,
): RelatedPost[] {
  const currentTags = currentPost.data.tags || [];
  const currentCategory = currentPost.data.category;

  if (currentTags.length === 0 && !currentCategory) {
    // If no tags or category, return most recent posts
    return allPosts
      .filter((post) => post.slug !== currentPost.slug)
      .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
      .slice(0, maxResults)
      .map((post) => ({ slug: post.slug, data: post.data }));
  }

  // Calculate relevance score for each post
  const postsWithScore = allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      let score = 0;
      const postTags = post.data.tags || [];
      const postCategory = post.data.category;

      // Category match gets highest score
      if (currentCategory && postCategory === currentCategory) {
        score += 10;
      }

      // Tag matches
      const commonTags = currentTags.filter((tag) => postTags.includes(tag));
      score += commonTags.length * 3;

      // Recency bonus (newer posts get slight preference)
      const daysDiff =
        Math.abs(currentPost.data.pubDate.getTime() - post.data.pubDate.getTime()) /
        (1000 * 60 * 60 * 24);

      if (daysDiff < 30) score += 1;
      else if (daysDiff < 90) score += 0.5;

      return {
        slug: post.slug,
        data: post.data,
        score,
      };
    })
    .filter((post) => post.score > 0)
    .sort((a, b) => b.score - a.score);

  // If we have enough scored posts, return them
  if (postsWithScore.length >= maxResults) {
    return postsWithScore.slice(0, maxResults).map(({ slug, data }) => ({ slug, data }));
  }

  // Otherwise, fill remaining slots with recent posts
  const relatedSlugs = new Set(postsWithScore.map((p) => p.slug));
  const recentPosts = allPosts
    .filter((post) => post.slug !== currentPost.slug && !relatedSlugs.has(post.slug))
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
    .slice(0, maxResults - postsWithScore.length)
    .map((post) => ({ slug: post.slug, data: post.data }));

  return [...postsWithScore.map(({ slug, data }) => ({ slug, data })), ...recentPosts];
}
