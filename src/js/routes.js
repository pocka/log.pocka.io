import Vue from 'vue'

import Top from './pages/Top'
import Posts from './pages/Posts'
import Post from './pages/Post'
import NotFound from './pages/NotFound'


export default [
    {path: '*', component: NotFound},
    {path: '/', component: Top},
    {path: '/posts', component: Posts},
    {path: '/posts/:name+', component: Post, props: true},
]
