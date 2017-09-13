import Vue from 'vue'

import Top from './pages/Top'
import About from './pages/About'
import Contact from './pages/Contact'
import Posts from './pages/Posts'
import Post from './pages/Post'
import NotFound from './pages/NotFound'
import Tags from './pages/Tags'


export default [
    {path: '*', component: NotFound},
    {path: '/', component: Top},
    {path: '/about', component: About},
    {path: '/contact', component: Contact},
    {path: '/posts', component: Posts},
    {path: '/posts/:name+', component: Post, props: true},
    {path: '/tags/:tag', component: Tags, props: true},
]
