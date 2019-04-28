/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { CSSProperties, FC } from 'react'
import Link from 'next/link'

import { BaseProps } from '~/components/BaseProps'
import { up } from '~/misc/breakpoints'
import { Theme } from '~/theme'

import { Logo } from '~/components/atoms/Logo'
import { NavMenu } from '~/components/organisms/NavMenu'

const invisible: CSSProperties = {
  opacity: 0,
  pointerEvents: 'none'
}

interface Props extends BaseProps {
  title: string

  showLogo: boolean

  navMenuItems: JSX.Element
}

export const Template: FC<Props> = ({
  children,
  navMenuItems,
  showLogo = true,
  title,
  ...rest
}) => (
  <div css={$container} {...rest}>
    <div css={$topDim} aria-hidden="true" />
    <NavMenu css={$nav} title={title}>
      {navMenuItems}
    </NavMenu>
    <main css={$main}>
      <div css={$contents}>{children}</div>
    </main>
    <div css={$logoArea} style={!showLogo ? invisible : undefined}>
      <Link href="/" passHref>
        <a tabIndex={0} aria-label="Go to top page" css={$logoLink}>
          <Logo css={$logo} />
        </a>
      </Link>
    </div>
    <div css={$bottomDim} aria-hidden="true" />
  </div>
)

export default Template

const $container = (theme: Theme) => css`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  overflow-y: auto;
  background-color: ${theme.colors.bg};

  @media (${up(theme.breakpoints.md)}) {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
`

const $nav = (theme: Theme) => css`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;

  @media (${up(theme.breakpoints.md)}) {
    flex-grow: 1;
    flex-basis: 100%;
    padding: 3.2rem;
  }
`

const $main = (theme: Theme) => css`
  display: block;
  width: 100%;
  max-width: 72rem;
  margin: 0 auto;
  font-size: 1.6rem;

  color: ${theme.colors.fg};
  overflow-y: auto;
  padding: 0 1.6rem;

  @media (${up(theme.breakpoints.md)}) {
    flex-shrink: 0;
    flex-basis: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    margin: 0;
  }
`

const $contents = (theme: Theme) => css`
  padding-bottom: 4.8rem;

  @media (${up(theme.breakpoints.md)}) {
    padding-top: 4.8rem;
  }
`

const $dim = (theme: Theme) => css`
  position: fixed;
  left: 0;
  right: 0;
  height: 4rem;

  color: ${theme.colors.bg};
`

const $topDim = (theme: Theme) => css`
  ${$dim(theme)}
  top: 0;

  background-image: linear-gradient(
    to bottom,
    currentColor,
    currentColor 3%,
    transparent
  );
`

const $bottomDim = (theme: Theme) => css`
  ${$dim(theme)}
  bottom: 0;

  background-image: linear-gradient(
    to top,
    currentColor,
    currentColor 3%,
    transparent
  );
`

const $logoArea = (theme: Theme) => css`
  display: none;

  transition: opacity 0.2s ease;

  @media (${up(theme.breakpoints.md)}) {
    flex-grow: 1;
    flex-basis: 100%;
    position: sticky;
    top: 0;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 3.2rem;
    font-size: 9.6rem;
  }
`

const $logoLink = (theme: Theme) => css`
  display: flex;

  color: ${theme.colors.primary};

  &:hover > :first-of-type {
    border-color: ${theme.colors.fgLight};
  }

  &:focus {
    outline: 0;

    & > :first-of-type {
      border-color: ${theme.colors.primary};
    }
  }
`

const $logo = css`
  padding: 0.4rem;
  border: 0.2rem solid transparent;
  border-radius: 50%;

  transition: border-color 0.2s ease;
`
