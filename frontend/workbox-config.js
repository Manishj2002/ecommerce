module.exports = {
    globDirectory: 'dist/',
    globPatterns: ['**/*.{html,js,css,png,jpg,jpeg,svg}'],
    swDest: 'dist/sw.js',
    runtimeCaching: [{
      urlPattern: ({ request }) => request.mode === 'navigate',
      handler: 'NetworkFirst',
    }, {
      urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: {
          maxEntries: 50,
        },
      },
    }],
  };