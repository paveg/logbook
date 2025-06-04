module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: [
        'http://localhost/index.html',
        'http://localhost/blog/index.html',
        'http://localhost/blog/markdown-style-guide/index.html',
        'http://localhost/about/index.html',
      ],
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'categories:pwa': 'off', // PWA is not required for this blog
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
