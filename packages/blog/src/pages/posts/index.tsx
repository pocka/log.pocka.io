/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Fragment } from 'react'
import { GetInitialProps, NextContext } from 'next'

import { PageProps } from '~/misc/PageProps'

import { Heading } from '~/components/atoms/Heading'
import { Paragraph } from '~/components/atoms/Paragraph'

export const Posts = () => {
  return (
    <Fragment>
      <Heading>Posts</Heading>
    </Fragment>
  )
}

const getInitialProps: GetInitialProps<PageProps, NextContext> = ({}) => {
  return { title: 'Posts' }
}

Posts.getInitialProps = getInitialProps

export default Posts
