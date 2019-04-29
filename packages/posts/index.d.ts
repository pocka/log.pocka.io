interface Post {
  name: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
  tags: ReadonlyArray<string>
  author: string
}

declare module '@log.pocka.io/posts' {
  const posts: ReadonlyArray<Post>
  export default posts
}

declare module '@log.pocka.io/posts/posts/*' {
  const post: Post & {
    __content: string
  }
  export default post
}
