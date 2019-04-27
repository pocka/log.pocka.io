/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useContext, SFC } from 'react'
import Link from 'next/link'

import { BaseProps } from '~/components/BaseProps'
import { up } from '~/misc/breakpoints'
import { Theme } from '~/theme'

import { OpenStateContext } from './OpenStateContext'

interface Props extends BaseProps {
  active?: boolean

  href: string
}

export const NavMenuItem: SFC<Props> = ({
  active,
  children,
  href,
  ...rest
}) => {
  const [isOpened, toggleOpen] = useContext(OpenStateContext)

  return (
    <li css={$container} {...rest}>
      <Link href={href} passHref>
        <a
          css={$item}
          aria-disabled={active}
          tabIndex={isOpened ? 0 : -1}
          onClick={toggleOpen}
        >
          {children}
        </a>
      </Link>
    </li>
  )
}

export default NavMenuItem

const $container = css`
  padding: 0;
`

const $item = (theme: Theme) => css`
  display: block;
  line-height: 1.5;
  margin-top: 2.4rem;

  color: ${theme.colors.fgSub};
  text-decoration: none;

  transition: color 0.15s ease;

  &:hover {
    text-decoration: underline;
  }

  &:focus {
    outline: 0;
    text-decoration: underline;
  }

  &[aria-disabled='true'] {
    color: ${theme.colors.fgLight};
    text-decoration: none;
    pointer-events: none;
  }

  @media (${up(theme.breakpoints.md)}) {
    margin-top: 1.6rem;
  }
`
