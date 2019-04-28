/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Fragment } from 'react'
import { NextContext, GetInitialProps } from 'next'

import { PageProps } from '~/misc/PageProps'

import { Heading } from '~/components/atoms/Heading'

interface InnerProps {
  statusCode?: number
}

type Props = InnerProps

export const ErrorPage = ({ statusCode }: Props) => (
  <div css={$centered}>
    {statusCode === 404 ? (
      <Fragment>
        <Heading>404</Heading>
        <Heading level="2">Page not found</Heading>
      </Fragment>
    ) : (
      <Heading>Error</Heading>
    )}
  </div>
)

const getInitialProps: GetInitialProps<InnerProps & PageProps, NextContext> = ({
  res
}) => {
  const statusCode = res && res.statusCode

  return { statusCode, title: 'Error' }
}

ErrorPage.getInitialProps = getInitialProps

export default ErrorPage

const $centered = css`
  text-align: center;
`
