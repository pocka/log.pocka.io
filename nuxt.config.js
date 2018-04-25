module.exports = {
  build: {
    vendor: ['babel-polyfill']
  },
  css: ['bulma/css/bulma.css'],
  head: {
    titleTemplate: '%s | log.pocka.io',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1' }
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
    dir: 'public'
  },
  modules: ['@nuxtjs/pwa'],
  plugins: ['~plugins/filters/ymd.js'],
  srcDir: 'src/'
}
