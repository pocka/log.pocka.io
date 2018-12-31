const { posts } = require('./src/assets/posts.json')

module.exports = {
  css: ['bulma/css/bulma.css'],
  head: {
    titleTemplate: '%s | log.pocka.io',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1' },
      {
        name: 'google-site-verification',
        content: '9etIdwX8pmsXbjvdmEaiw8OOmApz7Wl6x67z9Xy90Bo'
      }
    ],
    link: [
      { rel: 'me', type: 'text/html', href: 'https://github.com/pocka' },
      { rel: 'me', type: 'text/html', href: 'https://twitter.com/pockaquel' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/earlyaccess/mplus1p.css'
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Cairo|Raleway|IBM+Plex+Sans'
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/monokai-sublime.min.css'
      }
    ]
  },
  generate: {
    dir: 'public',
    routes: [
      ...posts.map(post => `/posts/${post.name}`),
      ...[]
        .concat(...posts.map(p => p.tags || []))
        .filter((tag, i, tags) => tags.indexOf(tag) === i)
        .map(tag => `/tags/${tag}`)
    ]
  },
  modules: [
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-40502013-5',
        debug: {
          sendHitTask: process.env.NODE_ENV === 'production'
        }
      }
    ],
    '@nuxtjs/pwa'
  ],
  plugins: ['~plugins/filters/ymd.js'],
  render: {
    resourceHints: false
  },
  srcDir: 'src/',
  transition: {
    name: 'nuxt',
    mode: 'out-in'
  }
}
