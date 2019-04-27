import React, { SFC } from 'react'
import App, { Container } from 'next/app'

import { css, Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import { light } from '~/theme'

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Global
          styles={css`
            html {
              font-size: 62.5%;
            }

            body {
              margin: 0;
            }

            * {
              box-sizing: border-box;
            }
          `}
        />
        <ThemeProvider theme={light}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Container>
    )
  }
}
