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
        commit(SettingPosts, {
          posts: ['/posts/test1', '/posts/test2', '/posts/test3'],
        })
      }
    }
}
