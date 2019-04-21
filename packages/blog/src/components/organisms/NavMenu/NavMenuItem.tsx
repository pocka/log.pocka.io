/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useContext, SFC } from 'react'
import Link from 'next/link'

import { BaseProps } from '~/components/BaseProps'
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
  const isOpened = useContext(OpenStateContext)

  return (
    <li css={$container} {...rest}>
      <Link href={href} passHref>
        <a css={$item} tabIndex={isOpened ? 0 : -1}>
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

  &:hover {
    text-decoration: underline;
  }

  &:focus {
    outline: 0;
    text-decoration: underline;
  }
`
