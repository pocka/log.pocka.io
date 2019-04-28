/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { GetInitialProps, NextContext } from 'next'

import { PageProps } from '~/misc/PageProps'

export const Home = () => {
  return 'Top'
}

const getInitialProps: GetInitialProps<PageProps, NextContext> = ({}) => {
  return { title: 'Top' }
}

Home.getInitialProps = getInitialProps

export default Home
