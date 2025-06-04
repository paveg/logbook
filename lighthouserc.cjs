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
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.8 }],
        'categories:seo': ['warn', { minScore: 0.8 }],
        'categories:pwa': 'off', // PWA is not required for this blog
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
