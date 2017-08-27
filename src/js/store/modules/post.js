// Mutations
const SettingPosts = 'SETTING_POSTS'

// Actions
export const LoadPosts = 'LOAD_POSTS'

export default {
    state: () => ({
        list: [],
    }),
    mutations: {
      [SettingPosts](state, {posts}) {
        state.list = posts
      }
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
            posts
          })
        }).catch(err => {
          console.error(err)
        })
      }
    }
}
