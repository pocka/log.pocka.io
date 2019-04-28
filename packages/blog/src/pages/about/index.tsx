/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Fragment } from 'react'
import { GetInitialProps, NextContext } from 'next'

import { PageProps } from '~/misc/PageProps'

import { Heading } from '~/components/atoms/Heading'
import { Paragraph } from '~/components/atoms/Paragraph'

export const About = () => {
  return (
    <Fragment>
      <Paragraph>This site is my blog!!!!!!</Paragraph>
      <Heading level="2">Purpose</Heading>
      <Paragraph>purposesssssss</Paragraph>
    </Fragment>
  )
}

const getInitialProps: GetInitialProps<PageProps, NextContext> = ({}) => {
  return { title: 'About' }
}

About.getInitialProps = getInitialProps

export default About
