// Mutations
const SettingArticle = 'SETTING_ARTICLE'

// Actions
export const SetArticle = 'SET_ARTICLE'
export const LoadArticle = 'LOAD_ARTICLE'

export default {
    state: () => ({
        current: null,
        list: ['/test1.html', '/test2.html', '/test3.html'],
    }),
    mutations: {
        [SettingArticle](state, {article}) {
            state.current = article
        },
    },
    actions: {
        [SetArticle]({commit}, article) {
            commit(SettingArticle, {article})
        },
        [LoadArticle]({commit}, uri) {
            return fetch(uri).then(res => {
                if (res.status >= 400 || res.status < 200) {
                    return Promise.reject(`STATUS CODE ERROR: ${res.status}`)
                }

                return res.text()
            }).then(html => {
                commit(SettingArticle, {article: html})
            })
        }
    }
}