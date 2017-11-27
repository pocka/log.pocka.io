// Mutations
const SettingPosts = 'SETTING_POSTS'
const FetchPosts = 'FETCH_POSTS'

// Actions
export const LoadPosts = 'LOAD_POSTS'

export default {
    state: () => ({
        list: [],
        sort: 'createdAt',
        desc: true,
        isLoading: false
    }),
    mutations: {
      [SettingPosts](state, {posts}) {
        state.list = posts
        state.isLoading = false
      },
      [FetchPosts](state) {
        state.isLoading = true
      }
    },
    getters: {
      posts: state => [...state.list].sort((a, b) => (state.desc ? -1 : 1) * (a[state.sort] > b[state.sort] ? 1 : -1)),
      getSortedPosts: state => (attr, desc = true) => [...state.list].sort((a, b) => (desc ? -1 : 1) * (a[attr] > b[attr] ? 1 : -1)),
      getPostsByTag: (state, getters) => tag => getters.posts.filter(post => !!post.tags.find(t => t === tag)),
    },
    actions: {
      [LoadPosts]({commit, state}) {
        if (state.list.length > 0) {
          return Promise.resolve()
        }

        commit(FetchPosts)

        return fetch('/posts.json').then(res => {
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
          commit(SettingPosts, {
            posts: []
          })

          return Promise.reject(err)
        })
      }
    }
}
