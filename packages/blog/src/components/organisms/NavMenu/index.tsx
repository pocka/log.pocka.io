/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { SFC } from 'react'

import { useToggle } from '~/hooks/useToggle'

import { BaseProps } from '~/components/BaseProps'
import { Theme } from '~/theme'

import { Hamburger } from '~/components/atoms/Hamburger'

interface Props extends BaseProps {}

export const NavMenu: SFC<Props> = ({ ...rest }) => {
  const [isOpened, toggleOpen] = useToggle(false)

  return (
    <nav css={$container} {...rest}>
      <a
        css={$hamburger}
        role="button"
        aria-label="Toggle navigation menu on mobile view"
        tabIndex={0}
        onClick={toggleOpen}
      >
        <Hamburger expanded={isOpened} />
      </a>
    </nav>
  )
}

export default NavMenu

const $container = css`
  display: block;
  font-size: 2.4rem;
`

const $hamburger = (theme: Theme) => css`
  color: ${theme.colors.fg};
  cursor: pointer;

  transition: filter 0.15s ease;

  &:focus {
    outline: 0;

    filter: drop-shadow(0 0 2px ${theme.colors.primary});
  }
`
