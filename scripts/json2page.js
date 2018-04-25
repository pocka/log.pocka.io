/**
 * Converts post json to post page (Vue SFC)
 */

const readline = require('readline')

const cheerio = require('cheerio')

const { stdin, stdout } = process

const rl = readline.createInterface({
  input: stdin,
  output: stdout
})

rl.on('line', json => {
  const post = JSON.parse(json)

  const component = `
  <script>
  import PostPage from '~/components/PostPage'

  export default {
    components: { PostPage },
    data() {
      return {
        post: ${JSON.stringify(
          Object.assign({}, post, {
            __content: undefined
          })
        )}
      }
    }
  }
  </script>

  <template>
    <post-page :post="post">
      <article v-pre>${replaceAnchors(post.__content)}</article>
    </post-page>
  </template>
  `

  stdout.write(component)

  rl.close()
})

/**
 * Replace internal anchors with <router-link>
 * @param {string} html
 */
const replaceAnchors = html => {
  const $ = cheerio.load(html)

  $('a[data-vue-router-link]').each((_, el) => {
    el.tagName = 'router-link'

    const anchor = $(el)

    anchor.attr('to', anchor.attr('href'))
    anchor.removeAttr('href')
    anchor.removeAttr('data-vue-router-link')
  })

  $('img[src^="/images"]').each((_, el) => {
    const img = $(el)

    img.attr('src', img.attr('src').replace(/^\/images/, '~assets/images'))
  })

  return $('body').html()
}
