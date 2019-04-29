import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'

import { css, Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import { light } from '~/theme'

import { PageProps } from '~/misc/PageProps'

import { NavMenuItem } from '~/components/organisms/NavMenu'
import { Template } from '~/components/templates/Template'
import { PageTransition } from '~/components/misc/PageTransition'

export default class MyApp extends App {
  private static menuItems: ReadonlyArray<{ label: string; path: string }> = [
    { label: 'Top', path: '/' },
    { label: 'About', path: '/about/' },
    { label: 'Posts', path: '/posts/' },
    { label: 'Tags', path: '/tags/' }
  ]

  static getInitialProps: typeof App.getInitialProps = async ({
    Component,
    ctx
  }) => {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {}

    return { pageProps }
  }

  render() {
    const { Component, router } = this.props
    const pageProps: PageProps = this.props.pageProps

    return (
      <Container>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Global
          styles={css`
            html {
              font-size: 62.5%;
              font-family: Roboto, 'Noto Sans JP', sans-serif;
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
          <Template
            navMenuItems={this.getNavMenuItems()}
            showLogo={router.pathname !== '/'}
            title={pageProps.title || 'log'}
          >
            <PageTransition>
              <Component {...pageProps} />
            </PageTransition>
          </Template>
        </ThemeProvider>
      </Container>
    )
  }

  private getNavMenuItems = () => {
    const { router } = this.props

    return (
      <>
        {MyApp.menuItems.map(item => (
          <NavMenuItem
            key={item.path}
            href={item.path}
            active={router.pathname === item.path}
          >
            {item.label}
          </NavMenuItem>
        ))}
      </>
    )
  }
}
