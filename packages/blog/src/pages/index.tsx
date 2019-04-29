/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { GetInitialProps, NextContext } from 'next'
import { ReactNode } from 'react'

import { useMedia } from 'use-media'

import { up } from '~/misc/breakpoints'
import { PageProps } from '~/misc/PageProps'
import { Theme } from '~/theme'

import { IconLink } from '~/components/atoms/IconLink'
import { Logo } from '~/components/atoms/Logo'
import { Galaxy } from '~/components/molecules/Galaxy'

import { FaReact, FaJsSquare, FaVrCardboard, FaVuejs } from 'react-icons/fa'

import { Nuxt } from '~/components/icons/Nuxt'
import { TypeScript } from '~/components/icons/TypeScript'
import { WebComponents } from '~/components/icons/WebComponents'
import { Webpack } from '~/components/icons/Webpack'

interface TopLink {
  url: string
  label: string
  icon: ReactNode
}

const topLinks: readonly TopLink[] = [
  { url: '/tags/typescript/', label: 'TypeScriptの記事', icon: <TypeScript/> },
  { url: '/tags/react/', label: 'React.jsの記事', icon: <FaReact/> },
  { url: '/tags/webpack/', label: 'Webpackの記事', icon: <Webpack/> },
  { url: '/tags/javascript/', label: 'JavaScriptの記事', icon: <FaJsSquare/> },
  { url: '/tags/webcomponents/', label: 'WebComponentsの記事', icon: <WebComponents/> },
  { url: '/tags/vue/', label: 'Vue.jsの記事', icon: <FaVuejs/> },
  { url: '/tags/nuxt/', label: 'Nuxt.jsの記事', icon: <Nuxt/> },
  { url: '/tags/vr/', label: 'VR関係の記事', icon: <FaVrCardboard/> },
]

export const Home = () => {
  const isNarrowScreen = useMedia('(max-width: 399.98px)')

  const centerItem = <div css={$logoContainer}>
    <Logo />
    <span css={$logoText}>pocka.io</span>
  </div>

  return (
    <div css={$container}>
      <Galaxy
        degree={280}
        radius={isNarrowScreen ? '12.4rem' : '16rem'}
        centerItem={centerItem}
      >
        {topLinks.map(link => (
          <IconLink key={link.url} href={link.url} label={link.label}>
          {link.icon}
          </IconLink>
        ))}
      </Galaxy>
    </div>
  )
}

const getInitialProps: GetInitialProps<PageProps, NextContext> = ({}) => {
  return { title: 'Top' }
}

Home.getInitialProps = getInitialProps

export default Home

const $container = (theme: Theme) => css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;

  color: ${theme.colors.primary};

  @media (${up(theme.breakpoints.md)}) {
    position: static;
  }
`

const $logoContainer = css`
  position: relative;
  display: flex;

  font-size: 8.8rem;
`

const $logoText = css`
  display: block;
  position: absolute;
  top: calc(100% + 1.6rem);
  left: 0;
  right: 0;
  font-size: 1.6rem;

  font-weight: 500;
  text-align: center;
`
