/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { SFC } from 'react'

import { useToggle } from '~/hooks/useToggle'

import { BaseProps } from '~/components/BaseProps'
import { Theme } from '~/theme'

import { Hamburger } from '~/components/atoms/Hamburger'

import { OpenStateContext } from './OpenStateContext'

interface Props extends BaseProps {
  title: string
}

export const NavMenu: SFC<Props> = ({ children, title, ...rest }) => {
  const [isOpened, toggleOpen] = useToggle(false)

  return (
    <nav css={$container} {...rest}>
      <div css={$navbar}>
        <a
          css={$hamburger}
          role="button"
          aria-label="Toggle navigation menu on mobile view"
          tabIndex={0}
          onClick={toggleOpen}
        >
          <Hamburger expanded={isOpened} />
        </a>
        <h1 css={$title}>{title}</h1>
        <div css={$spacer} aria-hidden="true" />
      </div>
      <div css={$menu} aria-hidden={!isOpened}>
        <div css={$spacer} aria-hidden="true" />
        <ul css={$menuItems}>
          <hr css={$separator} aria-hidden="true" />
          <OpenStateContext.Provider value={isOpened}>
            {children}
          </OpenStateContext.Provider>
        </ul>
        <div css={$spacer} aria-hidden="true" />
      </div>
    </nav>
  )
}

export default NavMenu

const $container = css`
  position: relative;
  margin-bottom: 1.6rem;
`

const $navbar = (theme: Theme) => css`
  position: relative;
  display: flex;
  font-size: 2.4rem;
  padding: 1.6rem;
  padding-bottom: 0;

  background-color: ${theme.colors.bg};
  z-index: 1;
`

const $hamburger = (theme: Theme) => css`
  box-sizing: border-box;
  padding: calc(1.6rem - 0.1rem);
  border: 0.1rem dotted transparent;
  line-height: 1;

  border-radius: 0.4rem;
  color: ${theme.colors.fg};
  cursor: pointer;

  transition: border-color 0.2s ease;

  &:focus {
    outline: 0;

    border-color: ${theme.colors.primary};
  }
`

const $title = (theme: Theme) => css`
  flex-grow: 1;
  font-size: 1.6rem;
  padding: 1.6rem;
  margin: 0;
  line-height: 1.5;

  color: ${theme.colors.primary};
  font-weight: normal;
  text-align: center;
  user-select: none;
`

const $spacer = css`
  display: block;
  width: 5.6rem;
`

const MENU_TRANSLATE_DURATION = 0.15
const MENU_FADE_DURATION = 0.2

const $menu = (theme: Theme) => css`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;

  background-color: ${theme.colors.bg};
  z-index: 0;
  pointer-events: none;

  transition: transform ${MENU_TRANSLATE_DURATION}s ${MENU_FADE_DURATION}s ease;

  &[aria-hidden='false'] {
    pointer-events: all;

    transform: translateY(100%);
    transition: transform ${MENU_TRANSLATE_DURATION}s ease;

    & > ul {
      opacity: 1;
      transition: opacity ${MENU_FADE_DURATION}s ${MENU_TRANSLATE_DURATION}s
        ease;
    }
  }

  &::after {
    content: '';
    position: absolute;
    display: block;
    height: 1.6rem;
    left: 0;
    right: 0;
    bottom: -1.6rem;

    background-color: inherit;
    clip-path: polygon(0 0, 100% 0, 0 100%);
    pointer-events: all;
  }
`

const $menuItems = css`
  flex-grow: 1;
  padding: 1.6rem 2.4rem;
  margin: 0;
  font-size: 1.6rem;

  text-align: center;
  list-style: none;

  opacity: 0;
  transition: opacity ${MENU_FADE_DURATION}s ease;
`

const $separator = (theme: Theme) => css`
  margin: 0;
  margin-bottom: 1.6rem;

  border: 0 none;
  border-bottom: 0.1rem solid ${theme.colors.border};
`
