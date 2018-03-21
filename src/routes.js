import Vue from 'vue'

const Contact = () => import('./pages/Contact')
const NotFound = () => import('./pages/NotFound')
const Tags = () => import('./pages/Tags')
const Posts = () => import('./pages/Posts')
const About = () => import('./pages/About')
const Top = () => import('./pages/Top')
const Post = () => import('./pages/Post')

export default [
  { path: '*', component: NotFound },
  { path: '/', component: Top },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/posts', component: Posts },
  { path: '/posts/:name+', component: Post, props: true },
  { path: '/tags/:tag', component: Tags, props: true }
]
