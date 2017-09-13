// Mutations
const SettingPosts = 'SETTING_POSTS'

// Actions
export const LoadPosts = 'LOAD_POSTS'

export default {
    state: () => ({
        list: [],
        sort: 'createdAt',
        desc: true,
    }),
    mutations: {
      [SettingPosts](state, {posts}) {
        state.list = posts
      }
    },
    getters: {
      posts: state => state.list.sort((a, b) => state.desc ^ (a[state.sort] > b[state.sort])),
      getPostsByTag: (state, getters) => tag => getters.posts.filter(post => !!post.tags.find(tag)),
    },
    actions: {
      [LoadPosts]({commit}) {
        fetch('/posts.json').then(res => {
          if (res.status !== 200) {
            return Promise.reject(new Error(`Status code error: ${res.status} ${res.statusText}`))
          }

          return res.json()
        }).then(({posts, tags}) => {
          commit(SettingPosts, {
            posts: posts.map(post => Object.assign({}, post, {
              createdAt: new Date(post.createdAt),
              updatedAt: new Date(post.updatedAt),
            }))
          })
        }).catch(err => {
          console.error(err)
        })
      }
    }
}
