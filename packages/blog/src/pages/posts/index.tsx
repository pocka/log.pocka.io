/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Fragment } from 'react'
import { GetInitialProps, NextContext } from 'next'

import { isAfter } from 'date-fns'

import posts from '@log.pocka.io/posts'

import { PageProps } from '~/misc/PageProps'

import { PostTitle } from '~/components/organisms/PostTitle'

const sortedPosts = [...posts].sort((a, b) =>
  isAfter(a.updatedAt, b.updatedAt) ? -1 : 1
)

export const Posts = () => {
  return (
    <Fragment>
      {sortedPosts.map(post => (
        <PostTitle
          key={post.name}
          css={$post}
          title={post.title}
          updatedAt={post.updatedAt}
          tags={post.tags}
          url={`/posts/${post.name}/`}
        />
      ))}
    </Fragment>
  )
}

const getInitialProps: GetInitialProps<PageProps, NextContext> = ({}) => {
  return { title: 'Posts' }
}

Posts.getInitialProps = getInitialProps

export default Posts

const $post = css`
  &:not(:first-of-type) {
    margin-top: 4.8rem;
  }
`
